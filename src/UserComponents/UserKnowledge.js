import { useState, useRef, useEffect } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { showToast } from '../utill/utill';

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

    const fetchDocuments = async () => {
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
    }
    useEffect(() => {
        fetchDocuments();
    }, []);

    // 파일 업로드 함수
    const uploadFiles = async (files) => {
        if (!files || files.length === 0) return;
        if (uploadError) return; // 오류 상태일 때 업로드 차단

        // 파일 크기 검증 (50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes
        const invalidFiles = Array.from(files).filter(file => file.size > maxSize);

        if (invalidFiles.length > 0) {
            showToast('파일 크기는 50MB를 초과할 수 없습니다.', 'error');
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

    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="documents-layout">

                            <div className="folders-sidebar">
                                <div className="folders-header">
                                    <h2 className="folders-title"></h2>
                                    <button className="btn btn--sm btn--outline"
                                        onClick={() => alert("개발중입니다.")}
                                    >
                                        ➕
                                    </button>
                                </div>

                                <div className="folder-tree">
                                    <div className="folder-item folder-item--active" >
                                        <span>모든 문서</span>
                                        <span className="folder-count">24</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">🕒</span>
                                        <span>최근 문서</span>
                                        <span className="folder-count">8</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">⭐</span>
                                        <span> 즐겨찾기</span>
                                        <span className="folder-count">5</span>
                                    </div>

                                    <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-3) 0' }}></div>

                                    <div className="folder-item" >
                                        <span>Python 학습</span>
                                        <span className="folder-count">12</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span>마케팅 자료</span>
                                        <span className="folder-count">8</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span>데이터 분석</span>
                                        <span className="folder-count">4</span>
                                    </div>
                                </div>
                            </div>


                            <div className="documents-main">
                                <div className="documents-header">
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder=" 문서 검색..."
                                            id="searchInput"
                                        />
                                        <select className="sort-select" >
                                            <option value="recent">최근 수정순</option>
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
                                                    지원 형식: PDF, TXT, CSV(최대 50MB)
                                                </div>
                                            </>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="fileInput"
                                            style={{ display: 'none' }}
                                            multiple
                                            accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                                            onChange={handleFileInputChange}
                                            disabled={isUploading || uploadError}
                                        />
                                    </div>
                                )}

                                <div className="documents-content">

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

                                        {documents.map((document) => (
                                            <div className="document-card" key={document.knowledge_id}>
                                                <button className="document-card__menu" >
                                                    ⋮
                                                </button>
                                                <div className="document-card__header">
                                                    <div className="document-icon document-icon--pdf">📄</div>
                                                    <div className="document-info">
                                                        <div className="document-name">{document.name}</div>
                                                        <div className="document-meta">{document.updated_at.split('T')[0]}</div>
                                                    </div>
                                                </div>

                                                <div className="document-status">
                                                    <div className="status-bar">
                                                        <div className={`status-indicator ${document.status === 'active' ? 'status-indicator--ready' : 'status-indicator--processing'}`}></div>
                                                        <span style={{ color: `${document.status === 'active' ? 'var(--employee-primary)' : 'var(--employee-accent)'}`, fontWeight: 'var(--font-semibold)' }}>
                                                            {document.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="document-tags">
                                                    <span className="doc-tag">태그</span>
                                                    <span className="doc-tag">태그</span>
                                                    <span className="doc-tag">태그</span>
                                                </div>

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
                                        {documents.map((document) => (
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
                                                    <span className="session-badge session-badge--active" style={{ fontSize: 'var(--text-xs)' }}>
                                                        준비됨
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>





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