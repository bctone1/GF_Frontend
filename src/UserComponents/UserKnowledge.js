import { useState, useRef, useEffect, useCallback } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { showToast, showConfirm } from '../utill/utill';

export default function UserKnowledge() {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);
    const dragCounterRef = useRef(0);
    const [documents, setDocuments] = useState([]);
    const accessToken = sessionStorage.getItem("access_token");

    const [viewType, setViewType] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('recent');

    const fetchDocuments = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user/document`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('Documents:', response.data.items);
            setDocuments(response.data.items);
        } catch (error) {
            console.error('Failed to fetch documents:', error);
        }
    }, [accessToken]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    // progress가 100이 아닌 항목이 있으면 5초마다 자동 갱신
    useEffect(() => {
        const hasInProgress = documents.some(doc => doc.progress < 100);

        if (!hasInProgress) return;

        const intervalId = setInterval(() => {
            fetchDocuments();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [documents, fetchDocuments]);

    // 파일 업로드 함수
    const uploadFiles = async (files) => {
        if (!files || files.length === 0) return;
        if (uploadError) return; // 오류 상태일 때 업로드 차단

        // 파일 크기 검증 (10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        const invalidFiles = Array.from(files).filter(file => file.size > maxSize);

        if (invalidFiles.length > 0) {
            showToast('파일 크기는 10MB를 초과할 수 없습니다.', 'error');
            return;
        }

        setIsUploading(true);
        setUploadError(null); // 이전 오류 상태 초기화

        try {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('file', file);
            });

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 300000,
                }
            );

            showToast('파일이 성공적으로 업로드되었습니다.', 'success');
            console.log('Upload response:', response.data);
            fetchDocuments();

        } catch (error) {
            console.error('File upload error:', error);

            // timeout 오류 감지
            if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
                const timeoutMessage = '파일 업로드 시간이 초과되었습니다. 네트워크 연결을 확인하고 다시 시도해주세요.';
                setUploadError(timeoutMessage);
                showToast(timeoutMessage, 'error');
            } else {
                const errorMessage = error.response?.data?.message || '파일 업로드 중 오류가 발생했습니다.';
                setUploadError(errorMessage);
                showToast(errorMessage, 'error');
            }
        } finally {
            setIsUploading(false);
        }
    };

    // 드래그 앤 드롭 이벤트 핸들러
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dragCounterRef.current += 1;
        if (e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dragCounterRef.current -= 1;
        if (dragCounterRef.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
            e.dataTransfer.dropEffect = 'copy';
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dragCounterRef.current = 0;
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0 && !uploadError) {
            uploadFiles(files);
        }
    };

    // 파일 입력 변경 핸들러
    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            uploadFiles(files);
        }
        // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 드롭존 클릭 핸들러
    const handleDropzoneClick = () => {
        if (fileInputRef.current && !isUploading && !uploadError) {
            fileInputRef.current.click();
        }
    };

    // 오류 상태 초기화 핸들러
    const handleRetry = () => {
        setUploadError(null);
    };

    // 문서 삭제 함수
    const handleDeleteDocument = async (knowledgeId, documentName) => {
        const confirmed = await showConfirm(`"${getDisplayName(documentName)}" 문서를 삭제하시겠습니까?`);
        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/user/document/${knowledgeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            showToast('문서가 성공적으로 삭제되었습니다.', 'success');
            fetchDocuments(); // 목록 새로고침
        } catch (error) {
            console.error('Failed to delete document:', error);
            const errorMessage = error.response?.data?.message || '문서 삭제 중 오류가 발생했습니다.';
            showToast(errorMessage, 'error');
        }
    };

    // 검색 및 정렬된 문서 목록 계산
    const filteredAndSortedDocuments = documents
        .filter((document) => {
            if (!searchQuery.trim()) return true;
            return document.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            switch (sortOption) {
                case 'recent':
                    return new Date(b.updated_at) - new Date(a.updated_at);
                case 'name':
                    return a.name.localeCompare(b.name, 'ko');
                case 'size':
                    return (b.file_size_bytes || 0) - (a.file_size_bytes || 0);
                case 'type':
                    const getFileExtension = (filename) => {
                        const parts = filename.split('.');
                        return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
                    };
                    return getFileExtension(a.name).localeCompare(getFileExtension(b.name));
                default:
                    return 0;
            }
        });

    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="documents-layout">
                            <div className="documents-main">
                                <div className="documents-header">
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder=" 문서 검색..."
                                            id="searchInput"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <select
                                            className="sort-select"
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        >
                                            <option value="recent">업로드순</option>
                                            <option value="name">이름순</option>
                                            <option value="size">크기순</option>
                                            <option value="type">유형순</option>
                                        </select>
                                    </div>
                                </div>


                                {uploadError ? (
                                    <div
                                        className="upload-dropzone upload-dropzone--error"
                                        style={{
                                            cursor: 'default',
                                            borderColor: 'var(--error)',
                                            backgroundColor: 'var(--error-50, #fef2f2)'
                                        }}
                                    >
                                        <div className="upload-icon" style={{ fontSize: '48px' }}>⚠️</div>
                                        <div className="upload-text" style={{
                                            color: 'var(--error)',
                                            fontWeight: 'var(--font-semibold)',
                                            marginBottom: 'var(--space-2)'
                                        }}>
                                            업로드 오류 발생
                                        </div>
                                        <div className="upload-hint" style={{
                                            color: 'var(--text-secondary)',
                                            marginBottom: 'var(--space-4)'
                                        }}>
                                            {uploadError}
                                        </div>
                                        <button
                                            className="btn btn--sm"
                                            onClick={handleRetry}
                                            style={{
                                                marginTop: 'var(--space-2)',
                                                backgroundColor: 'var(--error)',
                                                color: 'white',
                                                border: 'none'
                                            }}
                                        >
                                            다시 시도
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        id="uploadDropzone"
                                        ref={dropzoneRef}
                                        className={`upload-dropzone ${isDragging ? 'upload-dropzone--dragging' : ''} ${isUploading ? 'upload-dropzone--uploading' : ''}`}
                                        onDragEnter={handleDragEnter}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={handleDropzoneClick}
                                        style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
                                    >
                                        {isUploading ? (
                                            <>
                                                <div className="upload-icon" style={{
                                                    animation: 'spin 1s linear infinite',
                                                    fontSize: '48px'
                                                }}>⏳</div>
                                                <div className="upload-text" style={{
                                                    fontWeight: 'var(--font-semibold)',
                                                    color: 'var(--primary-600)'
                                                }}>
                                                    파일 업로드 중...
                                                </div>
                                                <div className="upload-hint" style={{
                                                    color: 'var(--text-secondary)',
                                                    marginTop: 'var(--space-2)'
                                                }}>
                                                    잠시만 기다려주세요
                                                </div>
                                                <div style={{
                                                    width: '200px',
                                                    height: '4px',
                                                    backgroundColor: 'var(--gray-200)',
                                                    borderRadius: 'var(--radius-full)',
                                                    marginTop: 'var(--space-4)',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundColor: 'var(--primary-600)',
                                                        animation: 'pulse 1.5s ease-in-out infinite',
                                                        borderRadius: 'var(--radius-full)'
                                                    }}></div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="upload-icon">📄</div>
                                                <div className="upload-text">
                                                    파일을 드래그하거나 클릭하여 업로드
                                                </div>
                                                <div className="upload-hint">AI가 문서를 분석하여 대화에 활용할 수 있습니다</div>
                                                <div className="upload-formats">
                                                    지원 형식: PDF, TXT, DOCS(최대 10MB)
                                                </div>
                                            </>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="fileInput"
                                            style={{ display: 'none' }}
                                            multiple
                                            accept=".pdf,.txt,.doc,.docx"
                                            onChange={handleFileInputChange}
                                            disabled={isUploading || uploadError}
                                        />
                                    </div>
                                )}

                                <div className="documents-content">
                                    {documents.length === 0 ? (
                                        <div className="document-guide">
                                            <div className="document-guide__header">
                                                <div className="document-guide__icon">📚</div>
                                                <h3 className="document-guide__title">등록된 문서가 없습니다</h3>
                                                <p className="document-guide__subtitle">아래 단계를 따라 문서를 업로드해보세요</p>
                                            </div>

                                            <div className="document-guide-steps">
                                                <div className="document-guide-step document-guide-step--highlight">
                                                    <div className="document-guide-step__number">1</div>
                                                    <div className="document-guide-step__content">
                                                        <div className="document-guide-step__title">파일 드래그 또는 클릭</div>
                                                        <div className="document-guide-step__desc">위의 업로드 영역에 파일을 드래그하거나 클릭하여 업로드하세요</div>
                                                    </div>
                                                    <div className="document-guide-step__arrow">
                                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="document-guide-step">
                                                    <div className="document-guide-step__number">2</div>
                                                    <div className="document-guide-step__content">
                                                        <div className="document-guide-step__title">지원 형식 확인</div>
                                                        <div className="document-guide-step__desc">
                                                            <div className="document-guide-step__format-list">
                                                                <span className="format-badge">PDF</span>
                                                                <span className="format-badge">TXT</span>
                                                                <span className="format-badge">DOCS</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="document-guide-step__arrow">
                                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="document-guide-step">
                                                    <div className="document-guide-step__number">3</div>
                                                    <div className="document-guide-step__content">
                                                        <div className="document-guide-step__title">최대 용량 확인</div>
                                                        <div className="document-guide-step__desc">파일 크기는 최대 10MB까지 업로드 가능합니다</div>
                                                    </div>
                                                    <div className="document-guide-step__arrow">
                                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="document-guide-step">
                                                    <div className="document-guide-step__number">4</div>
                                                    <div className="document-guide-step__content">
                                                        <div className="document-guide-step__title">AI 분석 완료</div>
                                                        <div className="document-guide-step__desc">업로드된 문서는 AI가 분석하여 대화에 활용할 수 있습니다</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="view-controls">
                                                <div className="view-tabs">
                                                    <button className={`view-tab ${viewType === 'grid' ? 'view-tab--active' : ''}`} onClick={() => setViewType('grid')}>
                                                        ⊞ 그리드
                                                    </button>
                                                    <button className={`view-tab ${viewType === 'list' ? 'view-tab--active' : ''}`} onClick={() => setViewType('list')}>
                                                        ☰ 리스트
                                                    </button>
                                                </div>
                                            </div>

                                            <div id="documentsGrid" className="documents-grid" style={{ display: viewType === 'grid' ? '' : 'none' }}>
                                                {filteredAndSortedDocuments.map((document) => (
                                                    <div className="document-card" key={document.knowledge_id}>
                                                        <div className="document-card__header">
                                                            <div className="document-icon document-icon--pdf">📄</div>
                                                            <div className="document-info">
                                                                <div className="document-name">{getDisplayName(document.name)}</div>
                                                                <div className="document-meta">{document.updated_at.split('T')[0]}</div>
                                                            </div>
                                                            <button
                                                                className="btn btn--sm btn--outline"
                                                                onClick={() => handleDeleteDocument(document.knowledge_id, document.name)}
                                                                style={{
                                                                    marginLeft: 'auto',
                                                                    padding: '4px 8px',
                                                                    fontSize: 'var(--text-xs)',
                                                                    color: 'var(--error)',
                                                                    borderColor: 'var(--error)'
                                                                }}
                                                                title="문서 삭제"
                                                            >
                                                                삭제
                                                            </button>
                                                        </div>

                                                        <div className="document-status">
                                                            <div className="status-bar">
                                                                <div
                                                                    className={`status-indicator ${document.status === 'ready' ? 'status-indicator--ready' : 'status-indicator--processing'}`}
                                                                    style={document.status !== 'ready' ? {
                                                                        animation: 'pulse 1.5s ease-in-out infinite'
                                                                    } : {}}
                                                                ></div>
                                                                <span style={{
                                                                    color: getStatusColor(document.status),
                                                                    fontWeight: 'var(--font-semibold)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}>
                                                                    {getStatusLabel(document.status)}
                                                                    {document.status !== 'ready' && document.status !== 'failed' && (
                                                                        <span style={{
                                                                            fontSize: '0.75em',
                                                                            animation: 'pulse 1.5s ease-in-out infinite'
                                                                        }}>⋯</span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            {document.status !== 'ready' && document.status !== 'failed' && (
                                                                <div style={{
                                                                    width: '100%',
                                                                    height: '4px',
                                                                    backgroundColor: 'var(--gray-200)',
                                                                    borderRadius: 'var(--radius-full)',
                                                                    marginTop: '8px',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    <div style={{
                                                                        width: `${document.progress || 0}%`,
                                                                        height: '100%',
                                                                        backgroundColor: getStatusColor(document.status),
                                                                        borderRadius: 'var(--radius-full)',
                                                                        transition: 'width 0.3s ease',
                                                                        animation: document.progress < 100 ? 'pulse 1.5s ease-in-out infinite' : 'none'
                                                                    }}></div>
                                                                </div>
                                                            )}
                                                            {document.status === 'failed' && document.error_message && (
                                                                <div style={{
                                                                    fontSize: 'var(--text-xs)',
                                                                    color: 'var(--error)',
                                                                    marginTop: '4px'
                                                                }}>
                                                                    {document.error_message}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* <div className="document-tags">
                                                    <span className="doc-tag">태그</span>
                                                    <span className="doc-tag">태그</span>
                                                    <span className="doc-tag">태그</span>
                                                </div> */}

                                                        <div className="document-stats">
                                                            <div className="stat-item">
                                                                <div className="stat-value">{document.chunk_count}</div>
                                                                <div className="stat-label">청크</div>
                                                            </div>
                                                            <div className="stat-item">
                                                                <div className="stat-value">{formatFileSize(document.file_size_bytes)}</div>
                                                                <div className="stat-label">크기</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div id="documentsList" className="documents-list" style={{ display: viewType === 'list' ? '' : 'none' }}>
                                                {filteredAndSortedDocuments.map((document) => (
                                                    <div className="document-list-item" key={document.knowledge_id}>
                                                        <div className="document-icon document-icon--pdf" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                                                            📄
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 'var(--font-semibold)', marginBottom: '4px' }}>{document.name}</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                                                {document.updated_at.split('T')[0]}
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <div style={{ fontWeight: 'var(--font-bold)', color: 'var(--employee-primary)' }}>{document.chunk_count}</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>청크</div>
                                                        </div>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <div style={{ fontWeight: 'var(--font-bold)', color: 'var(--employee-primary)' }}>{formatFileSize(document.file_size_bytes)}</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>크기</div>
                                                        </div>
                                                        <div>
                                                            <span
                                                                className={`session-badge ${document.status === 'ready' ? 'session-badge--active' : ''}`}
                                                                style={{
                                                                    fontSize: 'var(--text-xs)',
                                                                    backgroundColor: document.status === 'ready' ? undefined : getStatusColor(document.status),
                                                                    color: document.status === 'ready' ? undefined : 'white',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                            >
                                                                {getStatusLabel(document.status)}
                                                                {document.status !== 'ready' && document.status !== 'failed' && (
                                                                    <span style={{
                                                                        animation: 'pulse 1.5s ease-in-out infinite'
                                                                    }}>⋯</span>
                                                                )}
                                                            </span>
                                                            {document.status !== 'ready' && document.status !== 'failed' && (
                                                                <div style={{
                                                                    width: '100px',
                                                                    height: '3px',
                                                                    backgroundColor: 'var(--gray-200)',
                                                                    borderRadius: 'var(--radius-full)',
                                                                    marginTop: '4px',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    <div style={{
                                                                        width: `${document.progress || 0}%`,
                                                                        height: '100%',
                                                                        backgroundColor: getStatusColor(document.status),
                                                                        borderRadius: 'var(--radius-full)',
                                                                        transition: 'width 0.3s ease'
                                                                    }}></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn--sm btn--outline"
                                                                onClick={() => handleDeleteDocument(document.knowledge_id, document.name)}
                                                                style={{
                                                                    padding: '4px 8px',
                                                                    fontSize: 'var(--text-xs)',
                                                                    color: 'var(--error)',
                                                                    borderColor: 'var(--error)'
                                                                }}
                                                                title="문서 삭제"
                                                            >
                                                                삭제
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}





                                </div>
                            </div>
                        </div>
                    </main>


                </div>
            </div>

        </>
    )
}

function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
function getDisplayName(originName) {
    const parts = originName.split("_");
    return parts.slice(2).join("_");
}

function getStatusLabel(status) {
    const statusMap = {
        'uploading': '업로드 중',
        'embedding': '임베딩 중',
        'ready': '준비됨',
        'failed': '실패'
    };
    return statusMap[status] || status;
}

function getStatusColor(status) {
    const colorMap = {
        'uploading': 'var(--employee-accent)',
        'embedding': 'var(--employee-accent)',
        'ready': 'var(--employee-primary)',
        'failed': 'var(--error)'
    };
    return colorMap[status] || 'var(--text-secondary)';
}