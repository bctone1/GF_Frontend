import UserSidebar2026 from './UserSidebar2026';
import { showToast2026, getSelectedClassId, getDisplayName, formatFileSize, formatDate_YY_MM_DD } from '../utill/utill';
import axios from 'axios';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

export default function UserKnowledge2026() {
    const accessToken = sessionStorage.getItem("access_token");
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());
    const [documents, setDocuments] = useState([]);

    const [viewType, setViewType] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('recent');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const filteredAndSortedDocuments = documents.filter((document) => {
        // 검색 필터
        if (searchQuery.trim() && !document.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // 상태 필터
        if (statusFilter !== 'all' && document.status !== statusFilter) {
            return false;
        }
        return true;
    }).sort((a, b) => {
        switch (sortOption) {
            case 'recent':
                return new Date(b.updated_at) - new Date(a.updated_at);
            case 'oldest':
                return new Date(a.updated_at) - new Date(b.updated_at);
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

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredAndSortedDocuments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageDocuments = filteredAndSortedDocuments.slice(startIndex, endIndex);



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
            // console.log('Documents:', response.data.items);
            setDocuments(response.data.items);
        } catch (error) {
            console.error('Failed to fetch documents:', error);
        }
    }, [accessToken]);

    const [Assistant, setAssistant] = useState([]);
    const fetchAssistant = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/models`);
        setAssistant(response.data.items);
    }

    const [allowedModelIds, setAllowedModelIds] = useState(() => {
        const stored = sessionStorage.getItem("allowed_model_ids");
        if (!stored) return [0];
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed;
            }
            if (typeof parsed === 'number') {
                return [parsed];
            }
            if (typeof parsed === 'string') {
                if (parsed.includes(',')) {
                    return parsed.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
                }
                const num = parseInt(parsed, 10);
                return isNaN(num) ? [1] : [num];
            }
            return [1];
        } catch {
            if (typeof stored === 'string' && stored.includes(',')) {
                return stored.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
            }
            const num = parseInt(stored, 10);
            return isNaN(num) ? [1] : [num];
        }
    });


    useEffect(() => {
        fetchAssistant();
        fetchDocuments();
    }, []);

    // status가 ready 또는 failed가 아닌 항목이 있으면 2초마다 자동 갱신
    const hasInProgress = useMemo(
        () => documents.some(
            doc => doc.status !== "ready" && doc.status !== "failed"
        ),
        [documents]
    );
    useEffect(() => {
        if (!hasInProgress) return;
        const intervalId = setInterval(fetchDocuments, 2000);
        return () => clearInterval(intervalId);
    }, [hasInProgress, fetchDocuments]);



    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleFileSelection = (knowledgeId) => {
        setSelectedDocuments((prev) =>
            prev.includes(knowledgeId)
                ? prev.filter((id) => id !== knowledgeId)
                : [...prev, knowledgeId]
        );
    };

    // 전체 선택/해제 함수
    const handleSelectAll = () => {
        const currentPageIds = currentPageDocuments.map(doc => doc.knowledge_id);
        const allSelected = currentPageIds.every(id => selectedDocuments.includes(id));

        if (allSelected) {
            // 현재 페이지의 모든 항목이 선택되어 있으면 해제
            setSelectedDocuments(prev => prev.filter(id => !currentPageIds.includes(id)));
        } else {
            // 현재 페이지의 모든 항목 선택
            setSelectedDocuments(prev => {
                const newSelection = [...prev];
                currentPageIds.forEach(id => {
                    if (!newSelection.includes(id)) {
                        newSelection.push(id);
                    }
                });
                return newSelection;
            });
        }
    };

    // 현재 페이지의 모든 항목이 선택되었는지 확인
    const isAllSelected = currentPageDocuments.length > 0 &&
        currentPageDocuments.every(doc => selectedDocuments.includes(doc.knowledge_id));

    const handleDeleteDocuments = () => {
        for (const knowledgeId of selectedDocuments) {
            handleDeleteDocument(knowledgeId);
        }
        setShowDeleteModal(false);
        setSelectedDocuments([]);
        fetchDocuments();
    };

    // 상태 필터 라벨 가져오기
    const getStatusFilterLabel = () => {
        const labels = {
            'all': '전체 상태',
            'ready': '처리 완료',
            'failed': '처리 실패'
        };
        return labels[statusFilter] || '전체 상태';
    };

    // 정렬 옵션 라벨 가져오기
    const getSortOptionLabel = () => {
        const labels = {
            'recent': '최근 업로드순',
            'oldest': '오래된순',
            'name': '이름순',
            'size': '크기순'
        };
        return labels[sortOption] || '최근 업로드순';
    };

    // 상태 필터 변경 핸들러
    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        setIsStatusDropdownOpen(false);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로
    };

    // 정렬 옵션 변경 핸들러
    const handleSortOptionChange = (value) => {
        setSortOption(value);
        setIsSortDropdownOpen(false);
        setCurrentPage(1); // 정렬 변경 시 첫 페이지로
    };



    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // 검색어 변경 시 첫 페이지로
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            const statusFilterEl = document.getElementById('statusFilter');
            const sortFilterEl = document.getElementById('sortFilter');

            if (statusFilterEl && !statusFilterEl.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
            if (sortFilterEl && !sortFilterEl.contains(event.target)) {
                setIsSortDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [pageStatus, setPageStatus] = useState('main');
    const [mainPageStatus, setMainPageStatus] = useState('modeSelection');
    const [currentStep, setCurrentStep] = useState(1); // Advanced mode 단계 관리 (1-4)
    const [advancedSelectedDocuments, setAdvancedSelectedDocuments] = useState([]); // Advanced mode에서 선택된 문서 ID 목록
    const [showAllAdvancedDocuments, setShowAllAdvancedDocuments] = useState(false); // Advanced mode 파일 목록 더보기 상태

    // 청킹 설정 state (백엔드 필드명 기준)
    const [chunkingConfig, setChunkingConfig] = useState({
        chunking_mode: 'general', // 'general' 또는 'parent_child'
        segment_separator: '#n#n',
        chunk_size: 800,
        chunk_overlap: 200,
        chunk_strategy: 'recursive',
        max_chunks: 100,
        replaceSpaces: true,
        removeUrls: false,
        embedding_model: 'text-embedding-3-small'
    });

    // 검색 설정 state (백엔드 필드명 기준)
    const [searchConfig, setSearchConfig] = useState({
        index_mode: 'high_quality',

        reranker_enabled: true,
        reranker_model: 'BAAI/bge-reranker-v2-m3',

        top_k: 5,
        top_n: 3,
        min_score: 0.7,

        economic_top_k: 5,
    });



    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);
    const dragCounterRef = useRef(0);


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

    const [uploadingFiles, setUploadingFiles] = useState([]);

    const uploadFiles = async (files) => {
        if (!files || files.length === 0) return;
        if (uploadError) return; // 오류 상태일 때 업로드 차단

        // 파일 크기 검증 (10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        const fileArray = Array.from(files);
        const invalidFiles = fileArray.filter(file => file.size > maxSize);
        if (invalidFiles.length > 0) {
            showToast2026('파일 크기는 10MB를 초과할 수 없습니다.', 'error');
            return;
        }

        setIsUploading(true);
        setUploadError(null); // 이전 오류 상태 초기화

        const uploadResults = {
            success: 0,
            failed: 0,
            errors: []
        };

        // 여러 파일을 순차적으로 업로드
        for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];

            try {
                const formData = new FormData();
                formData.append('file', file);

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

                uploadResults.success++;
                console.log(`File ${i + 1}/${fileArray.length} uploaded:`, response.data);
                setUploadingFiles(prev => [...prev, response.data.knowledge_id]);

            } catch (error) {
                console.error(`File ${i + 1}/${fileArray.length} upload error:`, error);
                uploadResults.failed++;

                const errorMessage = error.code === 'ECONNABORTED' || error.message?.includes('timeout')
                    ? `${file.name}: 업로드 시간 초과`
                    : `${file.name}: ${error.response?.data?.message || '업로드 실패'}`;

                uploadResults.errors.push(errorMessage);
            }
        }

        // 모든 파일 업로드 완료 후 결과 처리
        if (uploadResults.success > 0) {
            if (uploadResults.failed === 0) {
                showToast2026(
                    fileArray.length === 1
                        ? '파일이 성공적으로 업로드되었습니다.'
                        : `${uploadResults.success}개의 파일이 성공적으로 업로드되었습니다.`,
                    'success'
                );
            } else {
                showToast2026(
                    `${uploadResults.success}개 성공, ${uploadResults.failed}개 실패`,
                    'warning'
                );
            }
            fetchDocuments();
        }

        if (uploadResults.failed > 0 && uploadResults.success === 0) {
            // 모든 파일이 실패한 경우
            const errorMessage = uploadResults.errors[0] || '파일 업로드 중 오류가 발생했습니다.';
            setUploadError(errorMessage);
            showToast2026(errorMessage, 'error');
        } else if (uploadResults.errors.length > 0) {
            // 일부 파일만 실패한 경우
            console.error('Upload errors:', uploadResults.errors);
        }

        setIsUploading(false);
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

    const handleDropzoneClick = () => {
        if (fileInputRef.current && !isUploading && !uploadError) {
            fileInputRef.current.click();
        }
    };


    let documentsUploading = documents.filter(doc => doc.knowledge_id && uploadingFiles.includes(doc.knowledge_id));


    const handleDeleteDocument = async (knowledgeId) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/user/document/${knowledgeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            showToast2026('문서가 성공적으로 삭제되었습니다.', 'success');
            fetchDocuments(); // 목록 새로고침
        } catch (error) {
            console.error('Failed to delete document:', error);
            const errorMessage = error.response?.data?.message || '문서 삭제 중 오류가 발생했습니다.';
            showToast2026(errorMessage, 'error');
        }
    };

    const [previewResult, setPreviewResult] = useState([]);

    const preViewChunkResult = async () => {
        // console.log(chunkingConfig);
        let knowledgeId = advancedSelectedDocuments[0];
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/user/document/${knowledgeId}/chunks/preview`,
                {
                    "chunk_overlap": chunkingConfig.chunk_overlap,
                    "chunk_size": chunkingConfig.chunk_size,
                    "chunk_strategy": chunkingConfig.chunk_strategy,
                    "chunking_mode": chunkingConfig.chunking_mode,
                    "max_chunks": chunkingConfig.max_chunks,
                    "segment_separator": chunkingConfig.segment_separator
                },
                { headers: { Authorization: `Bearer ${accessToken}`, }, }
            ).then(response => {
                console.log(response.data);

                setPreviewResult(response.data.items);
                setSplitActive(true);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const [splitActive, setSplitActive] = useState(false);


    const fetchChnunkingSet = async () => {
        setSplitActive(false);
        let knowledgeId = advancedSelectedDocuments[0];
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/user/document/${knowledgeId}/settings/ingestion`,
                {
                    "embedding_model": chunkingConfig.embedding_model,
                    "chunk_overlap": chunkingConfig.chunk_overlap,
                    "chunk_size": chunkingConfig.chunk_size,
                    "chunk_strategy": chunkingConfig.chunk_strategy,
                    "chunking_mode": chunkingConfig.chunking_mode,
                    "max_chunks": chunkingConfig.max_chunks,
                    "segment_separator": chunkingConfig.segment_separator
                },
                { headers: { Authorization: `Bearer ${accessToken}`, }, }
            ).then(response => {
                showToast2026('청킹 설정이 성공적으로 적용되었습니다.', 'success');
            });
        } catch (error) {
            console.log(error);
        }
    };

    // 검색 설정 저장 함수
    const fetchSearchSet = async () => {
        let knowledgeId = advancedSelectedDocuments[0];
        try {
            const searchSettings = {};
            if (searchConfig.index_mode === 'economic') {
                searchSettings.top_k = searchConfig.economic_top_k;
                searchSettings.min_score = 0.2;
                searchSettings.score_type = 'cosine_similarity';
                searchSettings.reranker_enabled = false;
                searchSettings.reranker_model = '';
                searchSettings.reranker_top_n = searchConfig.economic_top_k;

            } else if (searchConfig.index_mode = 'high_quality') {
                searchSettings.top_k = searchConfig.top_k;
                searchSettings.min_score = searchConfig.min_score;
                searchSettings.score_type = 'cosine_similarity';
                searchSettings.reranker_enabled = searchConfig.reranker_enabled;
                searchSettings.reranker_model = searchConfig.reranker_model;
                searchSettings.reranker_top_n = searchConfig.top_n;
            }
            console.log('요청한 매개변수', searchSettings);

            await axios.patch(`${process.env.REACT_APP_API_URL}/user/document/${knowledgeId}/settings/search`,
                searchSettings,
                { headers: { Authorization: `Bearer ${accessToken}`, }, }
            ).then(response => {
                showToast2026('검색 설정이 성공적으로 적용되었습니다.', 'success');
            });
        } catch (error) {
            console.log(error);
            showToast2026('검색 설정 적용 중 오류가 발생했습니다.', 'error');
        }
    };

    const [selectedModel, setSelectedModel] = useState('');
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const modelDropdownRef = useRef(null);

    // 선택된 모델 정보 찾기
    const selectedModelInfo = useMemo(() => {
        if (!selectedModel || Assistant.length === 0) return null;
        return Assistant.find(model => model.model_name === selectedModel);
    }, [selectedModel, Assistant]);

    // 초기 모델 선택 (allowedModelIds에 포함된 첫 번째 모델)
    useEffect(() => {
        if (Assistant.length > 0 && !selectedModel) {
            const allowedModel = Assistant.find(model =>
                Array.isArray(allowedModelIds) && allowedModelIds.includes(model.id)
            );
            if (allowedModel) {
                setSelectedModel(allowedModel.model_name);
            } else if (Assistant.length > 0) {
                // allowedModelIds에 포함된 모델이 없으면 첫 번째 모델 선택
                setSelectedModel(Assistant[0].model_name);
            }
        }
    }, [Assistant, allowedModelIds, selectedModel]);

    // 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
                setIsModelDropdownOpen(false);
            }
        };

        if (isModelDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModelDropdownOpen]);



    const [pannelAStatus, setPannelAStatus] = useState('llm');
    const [docSelectedDocA, setDocSelectedDocA] = useState({
        status: false,
        name: '',
        chunk_count: 0,
        file_size_bytes: 0,
    });
    const [pannelAQuery, setPannelAQuery] = useState('');

    const filteredPannelADocuments = documents.filter((document) => {
        if (pannelAQuery.trim() && !document.name.toLowerCase().includes(pannelAQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    const [pannelAParams, setPannelAParams] = useState({
        top_k: 3,
        chunk_size: 500,
        threshold: 0.7,
    });

    const [pannelARequestStatus, setPannelARequestStatus] = useState('ready');

    const pannelARequest = () => {
        setPannelARequestStatus('running');

        setTimeout(() => {
            setPannelARequestStatus('done');
        }, 3000);
    }




    const [pannelBStatus, setPannelBStatus] = useState('doc');





    return (
        <>
            <div className="app">
                <UserSidebar2026 />
                <main className="main">

                    <header className="page-header">
                        <div className="page-header__left">
                            <h1 className="page-header__title">지식베이스</h1>
                        </div>
                    </header>

                    <div className="kb-content" style={{ display: pageStatus === 'main' ? 'block' : 'none' }}>
                        {/* Mode Selection  */}
                        <div className="mode-selection" id="modeSelection" style={{ display: mainPageStatus === 'modeSelection' ? 'block' : 'none' }}>
                            <div className="mode-selection__header">
                                <h2 className="mode-selection__title">지식베이스 생성 방식 선택</h2>
                                <p className="mode-selection__desc">목적에 맞는 방식을 선택해주세요</p>
                            </div>

                            <div className="mode-cards">
                                <div className="mode-card" id="simpleCard"
                                    onClick={() => setMainPageStatus('simple')}
                                >
                                    <div className="mode-card__check">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div className="mode-card__icon mode-card__icon--simple">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                    </div>
                                    <h3 className="mode-card__title">간편 업로드</h3>
                                    <p className="mode-card__desc">파일만 업로드하면 자동으로 최적화된 설정이 적용됩니다. 빠르고 간편하게 시작하세요.</p>
                                    <div className="mode-card__features">
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            자동 청킹 설정
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            최적화된 검색 파라미터
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            1분 내 설정 완료
                                        </div>
                                    </div>
                                </div>

                                <div className="mode-card" id="advancedCard"
                                    onClick={() => {
                                        setMainPageStatus('advanced');
                                        setCurrentStep(1);
                                        setAdvancedSelectedDocuments([]);
                                    }}
                                // onClick={() => showToast2026('고급 설정 모드는 현재 개발중입니다.')}
                                >
                                    <div className="mode-card__check">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div className="mode-card__icon mode-card__icon--advanced">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="3" />
                                            <path
                                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>
                                    </div>
                                    <h3 className="mode-card__title">고급 설정</h3>
                                    <p className="mode-card__desc">청킹 방식, 검색 파라미터를 직접 설정합니다. RAG 학습에 최적화된 모드입니다.</p>
                                    <div className="mode-card__features">
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            청킹 방식 선택
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            검색 파라미터 조정
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            미리보기 및 테스트
                                        </div>
                                    </div>
                                </div>

                                <div className="mode-card" id="compareCard"
                                    onClick={() => setPageStatus('compare')}
                                // onClick={() => showToast2026('비교 모드는 현재 개발중입니다.')}
                                >
                                    <div className="mode-card__check">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div className="mode-card__icon mode-card__icon--compare">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <rect x="3" y="3" width="7" height="7" />
                                            <rect x="14" y="3" width="7" height="7" />
                                            <rect x="14" y="14" width="7" height="7" />
                                            <rect x="3" y="14" width="7" height="7" />
                                        </svg>
                                    </div>
                                    <h3 className="mode-card__title">비교 모드</h3>
                                    <p className="mode-card__desc">서로 다른 RAG 설정의 결과를 나란히 비교하며 최적의 설정을 찾아보세요.</p>
                                    <div className="mode-card__features">
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            A/B 설정 비교
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            실시간 결과 비교
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            성능 지표 분석
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* File List Section */}
                            <div className="file-list-section" id="fileListSection">
                                <div className="file-list-header">
                                    <h3 className="file-list-title">업로드된 파일</h3>
                                    <span className="file-list-count" id="fileCount">3개 파일</span>
                                </div>

                                {/* Stats Summary Bar */}
                                <div className="stats-summary" id="statsSummary">
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--files">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsTotalFiles">{documents.length}</span>
                                            <span className="stats-summary__label">총 파일</span>
                                        </div>
                                    </div>
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--chunks">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <rect x="3" y="3" width="7" height="7" />
                                                <rect x="14" y="3" width="7" height="7" />
                                                <rect x="14" y="14" width="7" height="7" />
                                                <rect x="3" y="14" width="7" height="7" />
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsTotalChunks">{documents.reduce((acc, doc) => acc + doc.chunk_count, 0)}</span>
                                            <span className="stats-summary__label">총 청크</span>
                                        </div>
                                    </div>
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--ready">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsReadyFiles">{documents.filter((doc) => doc.status === 'ready').length}</span>
                                            <span className="stats-summary__label">준비됨</span>
                                        </div>
                                    </div>
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--failed">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                <line x1="9" y1="9" x2="15" y2="15" />
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsFailedFiles">{documents.filter((doc) => doc.status === 'failed').length}</span>
                                            <span className="stats-summary__label">실패</span>
                                        </div>
                                    </div>
                                </div>

                                {/* File List Toolbar */}
                                <div className="file-list-toolbar">
                                    <div className="file-search">
                                        <svg className="icon icon--sm file-search__icon" viewBox="0 0 24 24">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                        <input
                                            type="text"
                                            className="file-search__input"
                                            id="fileSearchInput"
                                            placeholder="파일명으로 검색..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="file-filter" id="statusFilter">
                                        <button
                                            className="file-filter__button"
                                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                        >
                                            <span id="statusFilterLabel">{getStatusFilterLabel()}</span>
                                            <svg className="icon icon--sm file-filter__arrow" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </button>
                                        <div className={`file-filter__dropdown ${isStatusDropdownOpen ? 'show' : ''}`} id="statusDropdown">
                                            <div
                                                className={`file-filter__item ${statusFilter === 'all' ? 'selected' : ''}`}
                                                onClick={() => handleStatusFilterChange('all')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                전체 상태
                                            </div>
                                            <div
                                                className={`file-filter__item ${statusFilter === 'ready' ? 'selected' : ''}`}
                                                onClick={() => handleStatusFilterChange('ready')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                처리 완료
                                            </div>
                                            <div
                                                className={`file-filter__item ${statusFilter === 'failed' ? 'selected' : ''}`}
                                                onClick={() => handleStatusFilterChange('failed')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                처리 실패
                                            </div>
                                        </div>
                                    </div>

                                    <div className="file-filter" id="sortFilter">
                                        <button
                                            className="file-filter__button"
                                            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                                        >
                                            <span id="sortFilterLabel">{getSortOptionLabel()}</span>
                                            <svg className="icon icon--sm file-filter__arrow" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </button>
                                        <div className={`file-filter__dropdown ${isSortDropdownOpen ? 'show' : ''}`} id="sortDropdown">
                                            <div
                                                className={`file-filter__item ${sortOption === 'recent' ? 'selected' : ''}`}
                                                onClick={() => handleSortOptionChange('recent')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                최근 업로드순
                                            </div>
                                            <div
                                                className={`file-filter__item ${sortOption === 'oldest' ? 'selected' : ''}`}
                                                onClick={() => handleSortOptionChange('oldest')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                오래된순
                                            </div>
                                            <div
                                                className={`file-filter__item ${sortOption === 'name' ? 'selected' : ''}`}
                                                onClick={() => handleSortOptionChange('name')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                이름순
                                            </div>
                                            <div
                                                className={`file-filter__item ${sortOption === 'size' ? 'selected' : ''}`}
                                                onClick={() => handleSortOptionChange('size')}
                                            >
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                크기순
                                            </div>
                                        </div>
                                    </div>

                                    <div className="file-view-toggle">
                                        <button
                                            className={`file-view-toggle__btn ${viewType === 'grid' ? 'active' : ''}`}
                                            id="gridViewBtn"
                                            onClick={() => setViewType('grid')}
                                            title="그리드 보기"
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <rect x="3" y="3" width="7" height="7" />
                                                <rect x="14" y="3" width="7" height="7" />
                                                <rect x="14" y="14" width="7" height="7" />
                                                <rect x="3" y="14" width="7" height="7" />
                                            </svg>
                                        </button>
                                        <button
                                            className={`file-view-toggle__btn ${viewType === 'list' ? 'active' : ''}`}
                                            id="listViewBtn"
                                            onClick={() => setViewType('list')}
                                            title="리스트 보기"
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <line x1="8" y1="6" x2="21" y2="6" />
                                                <line x1="8" y1="12" x2="21" y2="12" />
                                                <line x1="8" y1="18" x2="21" y2="18" />
                                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                                <line x1="3" y1="18" x2="3.01" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Selection Bar */}
                                <div className={`selection-bar ${selectedDocuments.length > 0 ? '' : 'hidden'}`} id="selectionBar">
                                    <label className="selection-bar__checkbox">
                                        <input
                                            type="checkbox"
                                            id="selectAllCheckbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                        />
                                        <span className="selection-bar__checkbox-label">전체 선택</span>
                                    </label>
                                    <span className="selection-bar__count" id="selectedCount">{selectedDocuments.length}개 선택됨</span>
                                    <div className="selection-bar__actions">
                                        <button className="selection-bar__btn selection-bar__btn--cancel"
                                            onClick={() => setSelectedDocuments([])}
                                        >
                                            선택 취소
                                        </button>
                                        <button className="selection-bar__btn selection-bar__btn--delete"
                                            onClick={() => setShowDeleteModal(true)}
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                            선택 삭제
                                        </button>
                                    </div>
                                </div>


                                <div className={`file-grid ${viewType === 'grid' ? '' : 'file-grid--list'}`} id="fileGrid">
                                    {currentPageDocuments.map((doc) => {

                                        return (
                                            <div
                                                className="file-card"
                                                key={doc.knowledge_id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="file-card__checkbox"
                                                    checked={selectedDocuments.includes(doc.knowledge_id)}
                                                    onChange={() => toggleFileSelection(doc.knowledge_id)}
                                                />

                                                <div className="file-card__header">
                                                    <div className="file-card__icon file-card__icon--pdf">
                                                        <svg className="icon" viewBox="0 0 24 24">
                                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                            <polyline points="14 2 14 8 20 8"></polyline>
                                                        </svg>
                                                    </div>
                                                    <div className="file-card__info">
                                                        <div className="file-card__name">{getDisplayName(doc.name)}</div>
                                                        <div className="file-card__meta">{formatFileSize(doc.file_size_bytes)} · {formatDate_YY_MM_DD(doc.uploaded_at)}</div>
                                                    </div>
                                                </div>

                                                <span className={`file-card__status file-card__status--${doc.status}`}>
                                                    {getStatusLabel(doc.status)}
                                                </span>

                                                <div className="file-card__footer">
                                                    {doc.status === 'failed' && doc.error_message ? (
                                                        <div style={{
                                                            fontSize: 'var(--text-xs)',
                                                            color: 'var(--error)',
                                                            marginTop: '4px'
                                                        }}>
                                                            {doc.error_message}
                                                        </div>
                                                    ) : (
                                                        <span className="file-card__chunks">{doc.chunk_count}개 청크</span>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>


                                {/* Pagination */}
                                {totalPages > 0 && (
                                    <div className="pagination" id="pagination">
                                        <button
                                            className="pagination__btn"
                                            id="prevPageBtn"
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                            이전
                                        </button>
                                        <div id="pageNumbers" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                // 페이지 번호 표시 로직: 현재 페이지 주변만 표시
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            className={`pagination__btn ${currentPage === page ? 'pagination__btn--active' : ''}`}
                                                            onClick={() => handlePageChange(page)}
                                                        // style={{
                                                        //     minWidth: '32px',
                                                        //     height: '32px',
                                                        //     padding: '0 8px',
                                                        //     border: '1px solid var(--border)',
                                                        //     borderRadius: '4px',
                                                        //     background: currentPage === page ? 'var(--employee-primary)' : 'transparent',
                                                        //     color: currentPage === page ? 'white' : 'var(--text-primary)',
                                                        //     cursor: 'pointer',
                                                        //     fontSize: '14px'
                                                        // }}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                } else if (
                                                    page === currentPage - 2 ||
                                                    page === currentPage + 2
                                                ) {
                                                    return <span key={page} style={{ padding: '0 4px' }}>...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>
                                        <button
                                            className="pagination__btn"
                                            id="nextPageBtn"
                                            disabled={currentPage === totalPages}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            다음
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>
                                        <span className="pagination__info" id="paginationInfo">
                                            {startIndex + 1}-{Math.min(endIndex, filteredAndSortedDocuments.length)} / {filteredAndSortedDocuments.length}개
                                        </span>
                                    </div>
                                )}



                                <div className="kb-empty-state" style={{ display: `${filteredAndSortedDocuments.length > 0 ? 'none' : 'block'}` }}>
                                    <div className="kb-empty-state__icon">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                    </div>
                                    <div className="kb-empty-state__title">파일이 없습니다</div>
                                    <div className="kb-empty-state__desc">파일을 업로드하여 지식베이스를 구축하세요</div>
                                </div>

                            </div>
                        </div>





                        {/* Simple Upload Mode */}
                        <div className={`simple-upload ${mainPageStatus === 'simple' ? 'simple-upload--active' : ''}`} id="simpleUpload">
                            <div className="simple-upload__back"
                                onClick={() => { setPageStatus('main'); setMainPageStatus('modeSelection') }}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <line x1="19" y1="12" x2="5" y2="12" />
                                    <polyline points="12 19 5 12 12 5" />
                                </svg>
                                모드 선택으로 돌아가기
                            </div>

                            <div className="step-card">
                                <div className="step-card__header">
                                    <h3 className="step-card__title">파일 업로드</h3>
                                    <p className="step-card__desc">AI 학습에 활용될 문서를 업로드하세요</p>
                                </div>

                                <div
                                    className={`upload-zone ${isDragging ? 'upload-zone--dragover' : ''} ${isUploading ? 'upload-dropzone--uploading' : ''}`}
                                    ref={dropzoneRef}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={handleDropzoneClick}
                                    style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        style={{ display: 'none' }}
                                        multiple
                                        accept=".pdf,.txt,.doc,.docx"
                                        onChange={handleFileInputChange}
                                        disabled={isUploading || uploadError}
                                    />

                                    <div className="upload-zone__icon">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                    </div>

                                    <div className="upload-zone__title">파일을 드래그하거나 클릭하여 업로드</div>
                                    <div className="upload-zone__desc">AI가 문서를 분석하여 대화에 활용할 수 있습니다</div>
                                    <div className="upload-zone__formats">지원 형식: PDF, TXT, DOCX, CSV (최대 10MB)</div>

                                </div>

                                <div className="upload-progress" id="simpleUploadProgress">

                                    {documentsUploading.map((doc) => {
                                        // console.log(doc);
                                        return (
                                            <div className="upload-progress__item" key={doc.knowledge_id}>
                                                <div className="upload-progress__icon">
                                                    <svg className="icon" viewBox="0 0 24 24">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                        <polyline points="14 2 14 8 20 8"></polyline>
                                                    </svg>
                                                </div>
                                                <div className="upload-progress__info">
                                                    <div className="upload-progress__name">{getDisplayName(doc.name)}</div>
                                                    <div className="upload-progress__bar">
                                                        <div className="upload-progress__fill" style={{ width: `${doc.progress}%` }}></div>
                                                    </div>
                                                </div>
                                                <span
                                                    className="upload-progress__status"

                                                    style={{ color: doc.status !== 'ready' && doc.status !== 'failed' ? 'var(--error)' : 'var(--success)' }}
                                                >
                                                    {doc.status !== 'ready' && doc.status !== 'failed' ? `${doc.progress}%` : '완료'}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Advanced Mode */}
                        <div className={`advanced-mode ${mainPageStatus === 'advanced' ? 'advanced-mode--active' : ''} ${splitActive ? 'advanced-mode--split' : ''}`} id="advancedMode">
                            <div className="advanced-mode__back"
                                onClick={() => {
                                    setPageStatus('main');
                                    setMainPageStatus('modeSelection');
                                    setCurrentStep(1);
                                    setAdvancedSelectedDocuments([]);
                                }}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <line x1="19" y1="12" x2="5" y2="12" />
                                    <polyline points="12 19 5 12 12 5" />
                                </svg>
                                모드 선택으로 돌아가기
                            </div>

                            {/* Stepper */}
                            <div className="stepper">
                                <div className="stepper__step">
                                    <div className={`stepper__circle ${currentStep > 1 ? 'stepper__circle--completed' : currentStep === 1 ? 'stepper__circle--active' : ''}`}>
                                        {currentStep > 1 ? (
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        ) : (
                                            '1'
                                        )}
                                    </div>
                                    <span className={`stepper__label ${currentStep >= 1 ? 'stepper__label--active' : ''}`}>데이터 소스</span>
                                </div>
                                <div className={`stepper__line ${currentStep > 1 ? 'stepper__line--active' : ''}`}></div>
                                <div className="stepper__step">
                                    <div className={`stepper__circle ${currentStep > 2 ? 'stepper__circle--completed' : currentStep === 2 ? 'stepper__circle--active' : ''}`}>
                                        {currentStep > 2 ? (
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        ) : (
                                            '2'
                                        )}
                                    </div>
                                    <span className={`stepper__label ${currentStep >= 2 ? 'stepper__label--active' : ''}`}>청킹 설정</span>
                                </div>
                                <div className={`stepper__line ${currentStep > 2 ? 'stepper__line--active' : ''}`}></div>
                                <div className="stepper__step">
                                    <div className={`stepper__circle ${currentStep > 3 ? 'stepper__circle--completed' : currentStep === 3 ? 'stepper__circle--active' : ''}`}>
                                        {currentStep > 3 ? (
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        ) : (
                                            '3'
                                        )}
                                    </div>
                                    <span className={`stepper__label ${currentStep >= 3 ? 'stepper__label--active' : ''}`}>검색 설정</span>
                                </div>
                                <div className={`stepper__line ${currentStep > 3 ? 'stepper__line--active' : ''}`}></div>
                                <div className="stepper__step">
                                    <div className={`stepper__circle ${currentStep === 4 ? 'stepper__circle--active' : ''}`}>
                                        4
                                    </div>
                                    <span className={`stepper__label ${currentStep >= 4 ? 'stepper__label--active' : ''}`}>미리보기</span>
                                </div>
                            </div>

                            {/* Step 1: Data Source */}
                            <div className={`step ${currentStep === 1 ? 'step--active' : ''}`} id="step1">
                                <div className="step-card">
                                    <div className="step-card__header">
                                        <h3 className="step-card__title">데이터 소스 선택</h3>
                                        <p className="step-card__desc">지식베이스에 추가할 파일을 선택해주세요</p>
                                    </div>

                                    {/* 파일 목록 */}
                                    <div style={{ marginTop: '20px' }}>
                                        {documents.length === 0 ? (
                                            <div style={{
                                                padding: '40px',
                                                textAlign: 'center',
                                                color: '#64748b',
                                                background: '#f8fafc',
                                                borderRadius: '12px',
                                                border: '1px dashed #e2e8f0'
                                            }}>
                                                <svg className="icon icon--lg" viewBox="0 0 24 24" style={{ marginBottom: '12px', opacity: 0.5 }}>
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                                <div style={{ fontSize: '14px' }}>업로드된 파일이 없습니다</div>
                                            </div>
                                        ) : (() => {
                                            const readyDocuments = documents.filter(doc => doc.status === 'ready');
                                            const displayDocuments = showAllAdvancedDocuments ? readyDocuments : readyDocuments.slice(0, 4);
                                            const hasMore = readyDocuments.length > 4;

                                            return (
                                                <div>
                                                    <div style={{
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '12px',
                                                        padding: '12px'
                                                    }}>
                                                        {displayDocuments.map((document) => {
                                                            const isSelected = advancedSelectedDocuments.includes(document.knowledge_id);
                                                            return (
                                                                <div
                                                                    key={`advanced-${document.knowledge_id}`}
                                                                    onClick={() => {
                                                                        if (isSelected) {
                                                                            // 선택 해제
                                                                            setAdvancedSelectedDocuments([]);
                                                                        } else {
                                                                            // 단일 선택: 기존 선택을 해제하고 새 항목만 선택
                                                                            setAdvancedSelectedDocuments([document.knowledge_id]);
                                                                        }
                                                                    }}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        padding: '12px',
                                                                        marginBottom: '8px',
                                                                        borderRadius: '8px',
                                                                        border: `2px solid ${isSelected ? '#9333ea' : '#e2e8f0'}`,
                                                                        background: isSelected ? '#faf5ff' : 'white',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                >
                                                                    <div style={{
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '50%',
                                                                        border: `2px solid ${isSelected ? '#9333ea' : '#cbd5e1'}`,
                                                                        background: isSelected ? '#9333ea' : 'white',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        marginRight: '12px',
                                                                        flexShrink: 0,
                                                                        position: 'relative'
                                                                    }}>
                                                                        {isSelected && (
                                                                            <div style={{
                                                                                width: '10px',
                                                                                height: '10px',
                                                                                borderRadius: '50%',
                                                                                background: 'white'
                                                                            }}></div>
                                                                        )}
                                                                    </div>
                                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                                        <div style={{
                                                                            fontSize: '14px',
                                                                            fontWeight: 600,
                                                                            color: '#1e293b',
                                                                            marginBottom: '4px',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            {getDisplayName(document.name)}
                                                                        </div>
                                                                        <div style={{
                                                                            fontSize: '12px',
                                                                            color: '#64748b',
                                                                            display: 'flex',
                                                                            gap: '12px'
                                                                        }}>
                                                                            <span>{formatFileSize(document.file_size_bytes)}</span>
                                                                            <span>•</span>
                                                                            <span>{formatDate_YY_MM_DD(document.updated_at)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {hasMore && !showAllAdvancedDocuments && (
                                                        <button
                                                            onClick={() => setShowAllAdvancedDocuments(true)}
                                                            style={{
                                                                width: '100%',
                                                                marginTop: '12px',
                                                                padding: '10px',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '8px',
                                                                background: 'white',
                                                                color: '#9333ea',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.background = '#faf5ff';
                                                                e.target.style.borderColor = '#9333ea';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.background = 'white';
                                                                e.target.style.borderColor = '#e2e8f0';
                                                            }}
                                                        >
                                                            더보기 ({readyDocuments.length - 4}개 더)
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: 'var(--primary-600)', padding: '10px', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
                                        onClick={() => {
                                            setMainPageStatus('simple');
                                        }}
                                    >
                                        파일 업로드
                                    </div>

                                    <div className="step-actions">
                                        <button className="btn btn--outline" onClick={() => {
                                            setPageStatus('main');
                                            setMainPageStatus('modeSelection');
                                            setCurrentStep(1);
                                            setAdvancedSelectedDocuments([]);
                                        }}>취소</button>
                                        <button
                                            className="btn btn--primary"
                                            onClick={() => setCurrentStep(2)}
                                            disabled={advancedSelectedDocuments.length === 0}
                                            style={{
                                                opacity: advancedSelectedDocuments.length === 0 ? 0.5 : 1,
                                                cursor: advancedSelectedDocuments.length === 0 ? 'not-allowed' : 'pointer'
                                            }}
                                        >다음 단계</button>
                                    </div>

                                </div>
                            </div>

                            {/* Step 2: Chunking */}
                            <div className={`step ${currentStep === 2 ? 'step--active' : ''}`} id="step2">
                                <div className={`step-card ${splitActive ? 'step-card--split' : ''}`} id="chunkingStepCard">
                                    {/* Settings Section (왼쪽) */}
                                    <div className="step-card__settings">
                                        <div className="step-card__header">
                                            <h3 className="step-card__title">청킹 설정</h3>
                                            <p className="step-card__desc">문서를 어떻게 나눌지 설정합니다</p>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">청킹 방식</label>
                                            <div className="option-cards">
                                                <div
                                                    className={`option-card ${chunkingConfig.chunking_mode === 'general' ? 'option-card--active' : ''}`}
                                                    onClick={() => setChunkingConfig({ ...chunkingConfig, chunking_mode: 'general' })}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="option-card__header">
                                                        <div className="option-card__icon option-card__icon--blue">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                                <line x1="3" y1="9" x2="21" y2="9" />
                                                                <line x1="3" y1="15" x2="21" y2="15" />
                                                            </svg>
                                                        </div>
                                                        <span className="option-card__title">일반</span>
                                                        <span className="option-card__badge">권장</span>
                                                    </div>
                                                    <p className="option-card__desc">텍스트 청크 모드에서는 검색된 청크와 회수된 청크가 동일합니다.</p>
                                                </div>
                                                <div
                                                    className={`option-card ${chunkingConfig.chunking_mode === 'parent_child' ? 'option-card--active' : ''}`}
                                                    onClick={() => setChunkingConfig({ ...chunkingConfig, chunking_mode: 'parent_child' })}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="option-card__header">
                                                        <div className="option-card__icon option-card__icon--purple">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                                <circle cx="12" cy="12" r="4" />
                                                                <circle cx="12" cy="12" r="9" />
                                                            </svg>
                                                        </div>
                                                        <span className="option-card__title">부모-자식</span>
                                                    </div>
                                                    <p className="option-card__desc">자식 청크는 검색에 사용되고 부모 청크는 컨텍스트로 회수됩니다.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">임베딩 모델</label>
                                            <select
                                                className="form-select"
                                                id="embeddingModel"
                                                value={chunkingConfig.embedding_model}
                                                onChange={(e) => setChunkingConfig({ ...chunkingConfig, embedding_model: e.target.value })}
                                            >
                                                <option value="text-embedding-3-small">text-embedding-3-small (권장)</option>
                                                <option value="text-embedding-3-large">text-embedding-3-large</option>
                                                <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                                            </select>
                                            <p className="form-hint">벡터 검색에 사용할 임베딩 모델을 선택합니다</p>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">세그먼트 식별자</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    id="segmentIdentifier"
                                                    value={chunkingConfig.segment_separator}
                                                    onChange={(e) => setChunkingConfig({ ...chunkingConfig, segment_separator: e.target.value })}
                                                    placeholder="예: ###, ---"
                                                />
                                                <p className="form-hint">마크다운 헤더나 구분선으로 문서 분할</p>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">최대 청크 길이 <span
                                                    className="form-label__hint">(자)</span></label>
                                                <input
                                                    type="number"
                                                    className="form-input"
                                                    id="maxChunkLength"
                                                    value={chunkingConfig.chunk_size}
                                                    onChange={(e) => setChunkingConfig({ ...chunkingConfig, chunk_size: parseInt(e.target.value) || 0 })}
                                                    min="128"
                                                    max="4096"
                                                />
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">청크 중첩 <span className="form-label__hint">(자)</span></label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                id="chunkOverlap"
                                                value={chunkingConfig.chunk_overlap}
                                                onChange={(e) => setChunkingConfig({ ...chunkingConfig, chunk_overlap: parseInt(e.target.value) || 0 })}
                                                min="0"
                                                max="200"
                                                style={{ maxWidth: '200px' }}
                                            />
                                            <p className="form-hint">청크 간 문맥 연결을 위한 중복 영역</p>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">텍스트 전처리 규칙</label>
                                            <div className="checkbox-group">
                                                <label className="checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        id="replaceSpaces"
                                                        checked={chunkingConfig.replaceSpaces}
                                                        onChange={(e) => setChunkingConfig({ ...chunkingConfig, replaceSpaces: e.target.checked })}
                                                    />
                                                    <span className="checkbox-item__label">연속된 공백, 줄바꿈, 탭을 대체합니다</span>
                                                </label>
                                                <label className="checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        id="removeUrls"
                                                        checked={chunkingConfig.removeUrls}
                                                        onChange={(e) => setChunkingConfig({ ...chunkingConfig, removeUrls: e.target.checked })}
                                                    />
                                                    <span className="checkbox-item__label">모든 URL과 이메일 주소를 제거합니다</span>
                                                </label>
                                            </div>
                                        </div>

                                        <button className="btn btn--outline btn--sm" id="previewChunkBtn"
                                            onClick={preViewChunkResult}
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                            <span id="previewBtnText">프리뷰 청크</span>
                                        </button>

                                        <div className="step-actions">
                                            <button className="btn btn--outline" onClick={() => setCurrentStep(1)}>이전</button>
                                            <button className="btn btn--primary"
                                                onClick={() => {
                                                    setCurrentStep(3);
                                                    fetchChnunkingSet();
                                                }}

                                            >다음 단계</button>
                                        </div>
                                    </div>

                                    {/* Preview Panel (오른쪽) - 토글로 표시 */}
                                    <div className="step-card__preview" id="chunkPreviewPanel" style={{ display: splitActive ? 'block' : 'none' }}>
                                        <div className="step-card__preview-header">
                                            <div className="step-card__preview-title">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="3" y1="9" x2="21" y2="9" />
                                                    <line x1="3" y1="15" x2="21" y2="15" />
                                                </svg>
                                                청크 미리보기
                                            </div>
                                            <button
                                                className="step-card__preview-close"
                                                title="미리보기 닫기"
                                                onClick={() => setSplitActive(!splitActive)}
                                            >
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="step-card__preview-body">
                                            {/* Stats */}
                                            <div className="step-card__preview-stats">
                                                <div className="preview-stat">
                                                    <div className="preview-stat__value" id="previewChunkCount">{previewResult.length}</div>
                                                    <div className="preview-stat__label">총 청크 수</div>
                                                </div>
                                                <div className="preview-stat">
                                                    <div className="preview-stat__value" id="previewAvgLength">
                                                        {previewResult.length > 0
                                                            ? Math.round(
                                                                previewResult.reduce(
                                                                    (acc, item) => acc + (Number(item.char_count) || 0),
                                                                    0
                                                                ) / previewResult.length
                                                            )
                                                            : 0}
                                                    </div>
                                                    <div className="preview-stat__label">평균 길이</div>
                                                </div>
                                            </div>

                                            {/* Chunk List */}
                                            <div className="step-card__preview-list" id="chunkPreviewList" style={{ display: chunkingConfig.chunking_mode === 'general' ? 'block' : 'none' }}>
                                                <div className="doc-preview">
                                                    {previewResult.map((item, index) => (
                                                        <div
                                                            key={'preview-chunk-' + item.chunk_index}
                                                            className="doc-preview__chunk"
                                                            data-label={`청크 #${item.chunk_index} · ${item.char_count}자`}
                                                        >
                                                            {item.text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div
                                                className="step-card__preview-list"
                                                id="chunkPreviewList"
                                                style={{ display: chunkingConfig.chunking_mode === 'parent_child' ? 'block' : 'none' }}
                                            >
                                                <div className="doc-preview">
                                                    {previewResult.map((item, index) => {
                                                        // 부모 청크
                                                        if (item.text.startsWith('[PARENT]')) {
                                                            const text = item.text.replace('[PARENT]', '').trim();

                                                            return (
                                                                <div
                                                                    key={`parent-${index}`}
                                                                    className="doc-preview__chunk doc-preview__parent"
                                                                    data-label={`P${index + 1} · ${item.char_count}자`}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            marginBottom: '12px',
                                                                            color: 'var(--text-secondary)',
                                                                        }}
                                                                    >
                                                                        {text}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }

                                                        // 자식 청크
                                                        if (item.text.startsWith('[CHILD]')) {
                                                            const text = item.text.replace('[CHILD]', '').trim();

                                                            return (
                                                                <div key={`child-${index}`} className="doc-preview__child-section">
                                                                    <div
                                                                        style={{
                                                                            fontSize: '11px',
                                                                            color: '#2563eb',
                                                                            fontWeight: '600',
                                                                            marginBottom: '8px',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '6px',
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            style={{ width: '14px', height: '14px' }}
                                                                        >
                                                                            <circle cx="11" cy="11" r="8" />
                                                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                                        </svg>
                                                                        자식 청크 (검색 단위)
                                                                    </div>

                                                                    <div className="doc-preview__child" data-label={`C${index + 1}`}>
                                                                        {text}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }

                                                        // 예외 케이스 (접두어 없음)
                                                        return null;
                                                    })}
                                                </div>
                                            </div>




                                        </div>
                                        <div className="step-card__preview-footer">
                                            <button className="preview-refresh-btn" id="refreshPreviewBtn"
                                            >
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                    <path d="M3 3v5h5" />
                                                </svg>
                                                미리보기 새로고침
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* Step 3: Search Settings */}
                            <div className={`step ${currentStep === 3 ? 'step--active' : ''}`} id="step3">
                                <div className="step-card">
                                    <div className="step-card__header">
                                        <h3 className="step-card__title">검색 설정</h3>
                                        <p className="step-card__desc">RAG 검색 방식과 파라미터를 설정합니다</p>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">인덱스 모드</label>
                                        <div className="option-cards">
                                            <div
                                                className={`option-card ${searchConfig.index_mode === 'high_quality' ? 'option-card--active' : ''}`}
                                                onClick={() => setSearchConfig({ ...searchConfig, index_mode: 'high_quality' })}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="option-card__header">
                                                    <div className="option-card__icon option-card__icon--blue">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path
                                                                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                        </svg>
                                                    </div>
                                                    <span className="option-card__title">고품질</span>
                                                    <span className="option-card__badge">권장</span>
                                                </div>
                                                <p className="option-card__desc">임베딩 모델을 호출하여 높은 정확도의 검색 결과를 제공합니다.</p>
                                            </div>
                                            <div
                                                className={`option-card ${searchConfig.index_mode === 'economic' ? 'option-card--active' : ''}`}
                                                onClick={() => setSearchConfig({ ...searchConfig, index_mode: 'economic' })}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="option-card__header">
                                                    <div className="option-card__icon option-card__icon--purple">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                                        </svg>
                                                    </div>
                                                    <span className="option-card__title">경제적</span>
                                                </div>
                                                <p className="option-card__desc">키워드 기반 검색으로 비용을 절감합니다.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 고품질 모드 설정 */}
                                    <div id="highQualitySettings" style={{ display: searchConfig.index_mode === 'high_quality' ? 'block' : 'none' }}>

                                        <div className="form-group">
                                            <div
                                                className={`option-card ${searchConfig.reranker_enabled ? 'option-card--active' : ''}`}
                                                id="rerankToggleCard"
                                                onClick={() => setSearchConfig({ ...searchConfig, reranker_enabled: !searchConfig.reranker_enabled })}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="option-card__header">
                                                    <div className="option-card__icon option-card__icon--green">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="3" />
                                                            <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
                                                        </svg>
                                                    </div>
                                                    <span className="option-card__title">리랭크 모델 활성화</span>
                                                    <span className="option-card__radio"></span>
                                                </div>
                                                <p className="option-card__desc">재랭크 모델은 사용자 쿼리와의 의미적 일치를 기반으로 후보 문서 목록을 재배열하여 의미적 순위를 향상시킵니다.</p>

                                                {searchConfig.reranker_enabled && (
                                                    <div className="form-group">
                                                        <select
                                                            className="form-select"
                                                            id="RerankModel"
                                                            value={setSearchConfig.reranker_model}
                                                            onClick={(e) => e.stopPropagation()}
                                                            onMouseDown={(e) => e.stopPropagation()}
                                                            onChange={(e) => setSearchConfig({ ...searchConfig, reranker_model: e.target.value })}
                                                        >
                                                            <option value="BAAI/bge-reranker-v2-m3">BAAI/bge-reranker-v2-m3 (권장)</option>
                                                        </select>
                                                        <p className="form-hint">링랭크 시 사용할 모델을 선택합니다.</p>
                                                    </div>
                                                )}

                                            </div>
                                        </div>


                                        <label className="form-label">백터 검색 매개변수</label>

                                        <div id="noRerankSettings">
                                            <div className="form-group">
                                                <label className="form-label">Top K</label>
                                                <p className="form-hint">검색 시 반환할 최대 청크 수</p>
                                                <div className="slider-group">
                                                    <input
                                                        type="range"
                                                        className="slider-input"
                                                        id="topK"
                                                        min="1"
                                                        max="20"
                                                        value={searchConfig.top_k}
                                                        onChange={(e) => {
                                                            const newTopK = parseInt(e.target.value);
                                                            setSearchConfig({
                                                                ...searchConfig,
                                                                top_k: newTopK,
                                                                top_n: Math.min(searchConfig.top_n, newTopK) // top_n이 top_k를 초과하지 않도록 조정
                                                            });
                                                        }}
                                                    />
                                                    <span className="slider-value" id="topKValue">{searchConfig.top_k}개</span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Top N</label>
                                                <p className="form-hint">검색 시 반환할 최대 청크 수</p>
                                                <div className="slider-group">
                                                    <input
                                                        type="range"
                                                        className="slider-input"
                                                        id="topN"
                                                        min="1"
                                                        max={searchConfig.top_k}
                                                        value={searchConfig.top_n}
                                                        onChange={(e) => {
                                                            const newTopN = parseInt(e.target.value);
                                                            // top_n이 top_k를 초과하지 않도록 제한
                                                            const limitedTopN = Math.min(newTopN, searchConfig.top_k);
                                                            setSearchConfig({ ...searchConfig, top_n: limitedTopN });
                                                        }}
                                                    />
                                                    <span className="slider-value" id="topNValue">{searchConfig.top_n}개</span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">유사도 임계값</label>
                                                <p className="form-hint">최소 유사도 점수 (0~1)</p>
                                                <div className="slider-group">
                                                    <input
                                                        type="range"
                                                        className="slider-input"
                                                        id="threshold"
                                                        min="0"
                                                        max="100"
                                                        value={searchConfig.min_score * 100}
                                                        onChange={(e) => setSearchConfig({ ...searchConfig, min_score: parseFloat(e.target.value) / 100 })}
                                                    />
                                                    <span className="slider-value" id="thresholdValue">{(searchConfig.min_score * 100).toFixed(0)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 경제적 모드 설정 */}
                                    <div id="economicSettings" style={{ display: searchConfig.index_mode === 'economic' ? 'block' : 'none' }}>
                                        <div className="form-group">
                                            <label className="form-label">Top K</label>
                                            <p className="form-hint">검색 시 반환할 최대 청크 수</p>
                                            <div className="slider-group">
                                                <input
                                                    type="range"
                                                    className="slider-input"
                                                    id="economicTopK"
                                                    min="1"
                                                    max="20"
                                                    value={searchConfig.economic_top_k}
                                                    onChange={(e) => setSearchConfig({ ...searchConfig, economic_top_k: parseInt(e.target.value) })}
                                                />
                                                <span className="slider-value" id="economicTopKValue">{searchConfig.economic_top_k}개</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="step-actions">
                                        <button className="btn btn--outline" onClick={() => setCurrentStep(2)}>이전</button>
                                        <button
                                            className="btn btn--primary"
                                            onClick={() => {
                                                fetchSearchSet();
                                                setCurrentStep(4);
                                            }}
                                        >다음 단계</button>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4: Preview */}
                            <div className={`step ${currentStep === 4 ? 'step--active' : ''}`} id="step4">
                                <div className="step-card">
                                    <div className="step-card__header">
                                        <h3 className="step-card__title">설정 확인</h3>
                                        <p className="step-card__desc">지식베이스 설정을 확인하고 생성을 완료하세요</p>
                                    </div>

                                    <div className="summary-card">
                                        <div className="summary-card__title">
                                            <svg className="icon icon--sm summary-card__title-icon" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                            데이터 소스
                                        </div>
                                        <div className="summary-list">
                                            <div className="summary-item">
                                                <span className="summary-item__label">업로드된 파일</span>
                                                <span className="summary-item__value">
                                                    {(() => {
                                                        const selectedDoc = advancedSelectedDocuments.length > 0
                                                            ? documents.find(doc => doc.knowledge_id === advancedSelectedDocuments[0])
                                                            : null;
                                                        return selectedDoc ? getDisplayName(selectedDoc.name) : '파일 없음';
                                                    })()}
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-item__label">총 크기</span>
                                                <span className="summary-item__value">
                                                    {(() => {
                                                        const selectedDoc = advancedSelectedDocuments.length > 0
                                                            ? documents.find(doc => doc.knowledge_id === advancedSelectedDocuments[0])
                                                            : null;
                                                        return selectedDoc ? formatFileSize(selectedDoc.file_size_bytes) : '파일 없음';
                                                    })()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="summary-card">
                                        <div className="summary-card__title">
                                            <svg className="icon icon--sm summary-card__title-icon" viewBox="0 0 24 24">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <line x1="3" y1="9" x2="21" y2="9" />
                                                <line x1="9" y1="21" x2="9" y2="9" />
                                            </svg>
                                            청킹 설정
                                        </div>
                                        <div className="summary-list">
                                            <div className="summary-item">
                                                <span className="summary-item__label">청킹 방식</span>
                                                <span className="summary-item__value">
                                                    {chunkingConfig.chunk_strategy}
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-item__label">최대 청크 길이</span>
                                                <span className="summary-item__value">
                                                    {chunkingConfig.chunk_size}자
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-item__label">청크 중첩</span>
                                                <span className="summary-item__value">
                                                    {chunkingConfig.chunk_overlap}자
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="summary-card">
                                        <div className="summary-card__title">
                                            <svg className="icon icon--sm summary-card__title-icon" viewBox="0 0 24 24">
                                                <circle cx="11" cy="11" r="8" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            </svg>
                                            검색 설정
                                        </div>
                                        <div className="summary-list">
                                            <div className="summary-item">
                                                <span className="summary-item__label">인덱스 모드</span>
                                                <span className="summary-item__value">
                                                    {searchConfig.index_mode}
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-item__label">재순위 모드</span>
                                                <span className="summary-item__value">
                                                    {searchConfig.reranker_enabled ? '재랭크 모델' : '재랭크 미사용'}
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-item__label">Top K</span>
                                                <span className="summary-item__value">
                                                    {searchConfig.top_k}개
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-item__label">유사도 임계값</span>
                                                <span className="summary-item__value">
                                                    {searchConfig.min_score * 100}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="step-actions">
                                        <button className="btn btn--outline" onClick={() => setCurrentStep(3)}>이전</button>
                                        <button className="btn btn--primary btn--lg" onClick={() => {
                                            setPageStatus('main');
                                            setMainPageStatus('modeSelection');
                                            showToast2026('지식베이스 생성이 완료되었습니다.', 'success');
                                        }}>지식베이스 생성</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>










                    {/* Compare Mode  */}
                    <div className={`compare-mode ${pageStatus === 'compare' ? 'active' : ''}`} id="compareMode">
                        <button className="compare-mode__back"
                            onClick={() => { setPageStatus('main'); setMainPageStatus('modeSelection') }}
                        >
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                            지식베이스로 돌아가기
                        </button>

                        {/* Header Section */}
                        <div className="compare-header">
                            <div className="compare-header__left">
                                <div className="compare-header__icon">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                                        <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="compare-header__title">지식베이스 비교 학습</div>
                                    <div className="compare-header__desc">각 패널에서 모드를 선택하여 다양한 조합으로 AI 응답을 비교해보세요</div>
                                </div>
                            </div>

                            {/* Model Selector */}
                            <div className="model-selector">
                                <span className="model-selector__label">사용 모델</span>
                                <div className="model-selector__dropdown" ref={modelDropdownRef}>
                                    <button
                                        className="model-selector__button"
                                        id="modelButton"
                                        onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                    >
                                        {selectedModelInfo ? (
                                            <>
                                                <span
                                                    className={`model-selector__dot model-selector__dot--${selectedModelInfo.provider === 'anthropic' ? 'claude' :
                                                        selectedModelInfo.provider === 'google' ? 'gemini' :
                                                            selectedModelInfo.provider === 'openai' ? 'gpt' : ''
                                                        }`}
                                                    id="selectedModelDot"
                                                ></span>
                                                <span className="model-selector__name" id="selectedModelName">
                                                    {selectedModelInfo.model_name}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="model-selector__dot model-selector__dot--gpt" id="selectedModelDot"></span>
                                                <span className="model-selector__name" id="selectedModelName">모델 선택</span>
                                            </>
                                        )}
                                        <svg className="icon icon--sm model-selector__arrow" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`model-dropdown ${isModelDropdownOpen ? 'show' : ''}`}
                                        id="modelDropdown"
                                    >
                                        {Assistant.map((model) => {
                                            const isAllowed = Array.isArray(allowedModelIds) && allowedModelIds.includes(model.id);
                                            const providerDatColor = model.provider === 'anthropic' ? 'claude' : model.provider === 'google' ? 'gemini' : model.provider === 'openai' ? 'gpt' : '';
                                            const isSelected = selectedModel === model.model_name;
                                            return (
                                                <div
                                                    key={model.id}
                                                    className={`model-dropdown__item ${isSelected ? 'selected' : ''} ${!isAllowed ? 'disabled' : ''}`}
                                                    onClick={() => {
                                                        if (isAllowed) {
                                                            setSelectedModel(model.model_name);
                                                            setIsModelDropdownOpen(false);
                                                        }
                                                    }}
                                                    style={{
                                                        cursor: isAllowed ? 'pointer' : 'not-allowed',
                                                        opacity: isAllowed ? 1 : 0.5
                                                    }}
                                                >
                                                    <span className={`model-selector__dot model-selector__dot--${providerDatColor}`}></span>
                                                    <span>{model.model_name}</span>
                                                    {!isAllowed && (
                                                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#999' }}>
                                                            (권한 없음)
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Compare Panels */}
                        <div className="compare-panels">
                            {/* Panel A */}
                            <div className="compare-panel" id="panelA">
                                <div className="compare-panel__header">
                                    <div className="compare-panel__title">
                                        <span className="compare-panel__badge compare-panel__badge--a">A</span>
                                        패널 A
                                    </div>
                                    <div className="compare-panel__actions">
                                        <button className="panel-reset-btn" title="패널 초기화">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                <path d="M3 3v5h5" />
                                            </svg>
                                        </button>
                                        <span className={`mode-status mode-status--${pannelAStatus}`}>{pannelAStatus === 'llm' ? '순수 LLM' : pannelAStatus === 'doc' ? '문서 참조' : 'RAG 설정'}</span>
                                    </div>
                                </div>
                                <div className="compare-panel__body">
                                    {/* Mode Selector */}
                                    <div className="mode-selector">


                                        <div className={`mode-selector__item ${pannelAStatus === 'llm' ? 'active' : ''}`} onClick={() => setPannelAStatus('llm')}>
                                            <div className="mode-selector__icon mode-selector__icon--llm">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                    <line x1="8" y1="21" x2="16" y2="21" />
                                                    <line x1="12" y1="17" x2="12" y2="21" />
                                                </svg>
                                            </div>
                                            <div className="mode-selector__label">순수 LLM</div>
                                            <div className="mode-selector__desc">파일 없이<br />기본 지식만</div>
                                        </div>


                                        <div className={`mode-selector__item ${pannelAStatus === 'doc' ? 'active' : ''}`} onClick={() => setPannelAStatus('doc')}>
                                            <div className="mode-selector__icon mode-selector__icon--doc">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </div>
                                            <div className="mode-selector__label">문서 참조</div>
                                            <div className="mode-selector__desc">기본 설정으로<br />문서 활용</div>
                                        </div>


                                        <div className={`mode-selector__item ${pannelAStatus === 'rag' ? 'active' : ''}`} onClick={() => setPannelAStatus('rag')}>
                                            <div className="mode-selector__icon mode-selector__icon--rag">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path
                                                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </div>
                                            <div className="mode-selector__label">RAG 설정</div>
                                            <div className="mode-selector__desc">세부 파라미터<br />직접 조절</div>
                                        </div>
                                    </div>





                                    {/* LLM Only Content */}
                                    <div className={`mode-content ${pannelAStatus === 'llm' ? 'show' : ''}`}>
                                        <div className="llm-state">
                                            <div className="llm-state__icon">
                                                <svg className="icon icon--lg" viewBox="0 0 24 24">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                    <line x1="8" y1="21" x2="16" y2="21" />
                                                    <line x1="12" y1="17" x2="12" y2="21" />
                                                </svg>
                                            </div>
                                            <div className="llm-state__title">순수 LLM 응답</div>
                                            <div className="llm-state__text">외부 문서 없이 AI 모델의<br />기본 학습 지식만으로 응답합니다</div>
                                        </div>
                                    </div>

                                    {/* Doc Reference Content */}
                                    <div className={`mode-content ${pannelAStatus === 'doc' ? 'show' : ''}`}>
                                        <div className="doc-selector">
                                            <div className="doc-selector__label">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                문서 선택
                                            </div>

                                            <div className="doc-selector__dropdown">
                                                <button className="doc-selector__button"
                                                    onClick={() => setDocSelectedDocA({ ...docSelectedDocA, status: !docSelectedDocA.status })}
                                                >
                                                    <div className="doc-selector__icon">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path
                                                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                        </svg>
                                                    </div>

                                                    <div className="doc-selector__info">
                                                        <span className="doc-selector__placeholder" style={{ display: docSelectedDocA.name ? 'none' : 'block' }}>문서를 선택하세요</span>

                                                        <div id="docSelectedDocA" style={{ display: docSelectedDocA.name ? 'block' : 'none' }}>
                                                            <div className="doc-selector__name">{getDisplayName(docSelectedDocA.name)}</div>
                                                            <div className="doc-selector__meta">{docSelectedDocA.chunk_count}개 청크 · {formatFileSize(docSelectedDocA.file_size_bytes)}</div>
                                                        </div>
                                                    </div>


                                                    <svg className="icon icon--sm doc-selector__arrow" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </button>

                                                <div className={`doc-dropdown ${docSelectedDocA.status ? 'show' : ''}`}>

                                                    <div className="doc-dropdown__search">
                                                        <input
                                                            type="text"
                                                            className="doc-dropdown__search-input"
                                                            placeholder="문서 검색..."
                                                            value={pannelAQuery}
                                                            onChange={(e) => setPannelAQuery(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="doc-dropdown__list">
                                                        {filteredPannelADocuments.map((doc) => (
                                                            <div
                                                                key={'pannelA-' + doc.knowledge_id}
                                                                className="doc-dropdown__item"
                                                                onClick={() => {
                                                                    setDocSelectedDocA({ ...docSelectedDocA, name: doc.name, chunk_count: doc.chunk_count, file_size_bytes: doc.file_size_bytes, status: false });
                                                                    showToast2026(`${getDisplayName(doc.name)} 문서가 선택되었습니다`, 'success');
                                                                }}
                                                            >
                                                                <div className="doc-dropdown__item-icon doc-dropdown__item-icon--pdf">
                                                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                                        <polyline points="14 2 14 8 20 8"></polyline>
                                                                    </svg>
                                                                </div>
                                                                <div className="doc-dropdown__item-info">
                                                                    <div className="doc-dropdown__item-name">{getDisplayName(doc.name)}</div>
                                                                    <div className="doc-dropdown__item-meta">{doc.chunk_count}개 청크 · {formatFileSize(doc.file_size_bytes)}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="default-settings" id="defaultSettingsDocA"
                                            style={{ display: docSelectedDocA.name ? 'block' : 'none' }}
                                        >
                                            <div className="default-settings__title">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="16" x2="12" y2="12" />
                                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                                </svg>
                                                기본 RAG 설정 적용
                                            </div>
                                            <div className="default-settings__grid">
                                                <div className="default-settings__item">
                                                    <div className="default-settings__label">Top-K</div>
                                                    <div className="default-settings__value">3개</div>
                                                </div>
                                                <div className="default-settings__item">
                                                    <div className="default-settings__label">Chunk</div>
                                                    <div className="default-settings__value">500자</div>
                                                </div>
                                                <div className="default-settings__item">
                                                    <div className="default-settings__label">유사도</div>
                                                    <div className="default-settings__value">0.7</div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>






                                    {/* RAG Settings Content */}
                                    <div className={`mode-content ${pannelAStatus === 'rag' ? 'show' : ''}`}>
                                        <div className="doc-selector">
                                            <div className="doc-selector__label">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                문서 선택
                                            </div>
                                            <div className="doc-selector__dropdown">
                                                <button className="doc-selector__button"
                                                    onClick={() => setDocSelectedDocA({ ...docSelectedDocA, status: !docSelectedDocA.status })}
                                                >
                                                    <div className="doc-selector__icon">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                        </svg>
                                                    </div>

                                                    <div className="doc-selector__info">
                                                        <span className="doc-selector__placeholder" style={{ display: docSelectedDocA.name ? 'none' : 'block' }}>문서를 선택하세요</span>

                                                        <div id="docSelectedDocA" style={{ display: docSelectedDocA.name ? 'block' : 'none' }}>
                                                            <div className="doc-selector__name">{getDisplayName(docSelectedDocA.name)}</div>
                                                            <div className="doc-selector__meta">{docSelectedDocA.chunk_count}개 청크 · {formatFileSize(docSelectedDocA.file_size_bytes)}</div>
                                                        </div>
                                                    </div>


                                                    <svg className="icon icon--sm doc-selector__arrow" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </button>

                                                <div className={`doc-dropdown ${docSelectedDocA.status ? 'show' : ''}`}>

                                                    <div className="doc-dropdown__search">
                                                        <input
                                                            type="text"
                                                            className="doc-dropdown__search-input"
                                                            placeholder="문서 검색..."
                                                            value={pannelAQuery}
                                                            onChange={(e) => setPannelAQuery(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="doc-dropdown__list">
                                                        {filteredPannelADocuments.map((doc) => (
                                                            <div
                                                                key={'pannelA-' + doc.knowledge_id}
                                                                className="doc-dropdown__item"
                                                                onClick={() => {
                                                                    setDocSelectedDocA({ ...docSelectedDocA, name: doc.name, chunk_count: doc.chunk_count, file_size_bytes: doc.file_size_bytes, status: false });
                                                                    showToast2026(`${getDisplayName(doc.name)} 문서가 선택되었습니다`, 'success');
                                                                }}
                                                            >
                                                                <div className="doc-dropdown__item-icon doc-dropdown__item-icon--pdf">
                                                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                                        <polyline points="14 2 14 8 20 8"></polyline>
                                                                    </svg>
                                                                </div>
                                                                <div className="doc-dropdown__item-info">
                                                                    <div className="doc-dropdown__item-name">{getDisplayName(doc.name)}</div>
                                                                    <div className="doc-dropdown__item-meta">{doc.chunk_count}개 청크 · {formatFileSize(doc.file_size_bytes)}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-section"
                                            style={{ display: docSelectedDocA.name ? 'block' : 'none' }}
                                        >
                                            <div className="settings-section__title">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path
                                                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                RAG 파라미터 설정
                                            </div>

                                            <div className="setting-row">
                                                <span className="setting-row__label">Top-K</span>
                                                <div className="setting-row__slider">
                                                    <input type="range" min="1" max="10" value={pannelAParams.top_k} onChange={(e) => setPannelAParams({ ...pannelAParams, top_k: parseInt(e.target.value) })} />
                                                    <span className="setting-row__value">{pannelAParams.top_k}개</span>
                                                </div>
                                            </div>

                                            <div className="setting-row">
                                                <span className="setting-row__label">Chunk Size</span>
                                                <div className="setting-row__slider">
                                                    <input type="range" min="200" max="1000" step="100" value={pannelAParams.chunk_size} onChange={(e) => setPannelAParams({ ...pannelAParams, chunk_size: parseInt(e.target.value) })} />
                                                    <span className="setting-row__value">{pannelAParams.chunk_size}자</span>
                                                </div>
                                            </div>

                                            <div className="setting-row">
                                                <span className="setting-row__label">유사도 임계값</span>
                                                <div className="setting-row__slider">
                                                    <input type="range" min="0.5" max="0.9" step="0.1" value={pannelAParams.threshold} onChange={(e) => setPannelAParams({ ...pannelAParams, threshold: parseFloat(e.target.value) })} />
                                                    <span className="setting-row__value">{pannelAParams.threshold}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="section-divider"></div>

                                    {/* Test Section */}
                                    <div className="test-section">

                                        <div className="test-section__label">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                            질문 입력
                                        </div>

                                        <textarea className="test-input" id="questionA" rows="2" placeholder="질문을 입력하세요..." />

                                        <div className="test-actions">

                                            <button
                                                style={{ display: pannelARequestStatus === 'running' ? 'none' : 'block' }}
                                                className="btn btn--primary"
                                                onClick={pannelARequest}
                                            >
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                                실행
                                            </button>

                                            <button
                                                style={{ display: pannelARequestStatus === 'running' ? 'block' : 'none' }}
                                                className="btn btn--primary"
                                                disabled={true}
                                            >
                                                <svg className="icon icon--sm" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                                                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                                </svg>
                                                분석 중...
                                            </button>

                                        </div>

                                    </div>

                                    {/* Result Box */}
                                    <div className={`result-box ${pannelARequestStatus === 'done' ? 'show' : ''}`}>
                                        <div className="result-card">
                                            <div className="result-card__header">
                                                <span className="result-card__label" id="resultLabelA">AI 응답</span>
                                                <span className="result-card__model result-card__model--gpt" id="resultModelA">
                                                    <span className="model-selector__dot model-selector__dot--gpt"></span>
                                                    GPT-4
                                                </span>
                                            </div>
                                            <div className="result-card__body">
                                                <div className="result-card__text">
                                                    (예시 응답입니다.) <br />
                                                    Python은 1991년 귀도 반 로섬이 개발한 고수준 프로그래밍 언어입니다. 간결하고 읽기 쉬운 문법이 특징이며, 웹 개발, 데이터
                                                    분석, 인공지능 등 다양한 분야에서 널리 사용됩니다.

                                                    주요 특징:
                                                    • 간결하고 읽기 쉬운 문법
                                                    • 동적 타이핑 지원
                                                    • 풍부한 라이브러리 생태계
                                                    • 크로스 플랫폼 지원
                                                    • 객체지향 및 함수형 프로그래밍 지원

                                                    Python은 초보자부터 전문가까지 폭넓게 사용되는 언어입니다.
                                                </div>
                                            </div>
                                            <div className="result-card__footer">
                                                <div className="result-card__stat">
                                                    <div className="result-card__stat-value" id="resultTimeA">1.2초</div>
                                                    <div className="result-card__stat-label">응답 시간</div>
                                                </div>
                                                <div className="result-card__stat">
                                                    <div className="result-card__stat-value" id="resultTokensA">127</div>
                                                    <div className="result-card__stat-label">토큰</div>
                                                </div>
                                                <div className="result-card__stat">
                                                    <div className="result-card__stat-value" id="resultChunksA">-</div>
                                                    <div className="result-card__stat-label">청크</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel B */}
                            <div className="compare-panel" id="panelB">
                                <div className="compare-panel__header">
                                    <div className="compare-panel__title">
                                        <span className="compare-panel__badge compare-panel__badge--b">B</span>
                                        패널 B
                                    </div>
                                    <div className="compare-panel__actions">
                                        <button className="panel-reset-btn" title="패널 초기화">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                <path d="M3 3v5h5" />
                                            </svg>
                                        </button>
                                        <span className="mode-status mode-status--doc" id="modeStatusB">문서 참조</span>
                                    </div>
                                </div>
                                <div className="compare-panel__body">
                                    {/* Mode Selector */}
                                    <div className="mode-selector">
                                        <div className="mode-selector__item" data-mode="llm" >
                                            <div className="mode-selector__icon mode-selector__icon--llm">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                    <line x1="8" y1="21" x2="16" y2="21" />
                                                    <line x1="12" y1="17" x2="12" y2="21" />
                                                </svg>
                                            </div>
                                            <div className="mode-selector__label">순수 LLM</div>
                                            <div className="mode-selector__desc">파일 없이<br />기본 지식만</div>
                                        </div>
                                        <div className="mode-selector__item active" data-mode="doc">
                                            <div className="mode-selector__icon mode-selector__icon--doc">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </div>
                                            <div className="mode-selector__label">문서 참조</div>
                                            <div className="mode-selector__desc">기본 설정으로<br />문서 활용</div>
                                        </div>
                                        <div className="mode-selector__item" data-mode="rag" >
                                            <div className="mode-selector__icon mode-selector__icon--rag">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path
                                                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </div>
                                            <div className="mode-selector__label">RAG 설정</div>
                                            <div className="mode-selector__desc">세부 파라미터<br />직접 조절</div>
                                        </div>
                                    </div>

                                    {/* LLM Only Content */}
                                    <div className="mode-content" id="llmContentB">
                                        <div className="llm-state">
                                            <div className="llm-state__icon">
                                                <svg className="icon icon--lg" viewBox="0 0 24 24">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                    <line x1="8" y1="21" x2="16" y2="21" />
                                                    <line x1="12" y1="17" x2="12" y2="21" />
                                                </svg>
                                            </div>
                                            <div className="llm-state__title">순수 LLM 응답</div>
                                            <div className="llm-state__text">외부 문서 없이 AI 모델의<br />기본 학습 지식만으로 응답합니다</div>
                                        </div>
                                    </div>

                                    {/* Doc Reference Content */}
                                    <div className="mode-content show" id="docContentB">
                                        <div className="doc-selector">
                                            <div className="doc-selector__label">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                문서 선택
                                            </div>
                                            <div className="doc-selector__dropdown">
                                                <button className="doc-selector__button" id="docButtonDocB">
                                                    <div className="doc-selector__icon">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path
                                                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                        </svg>
                                                    </div>
                                                    <div className="doc-selector__info">
                                                        <span className="doc-selector__placeholder" id="docPlaceholderDocB">문서를
                                                            선택하세요</span>
                                                        <div id="docSelectedDocB" style={{ display: 'none' }}>
                                                            <div className="doc-selector__name"></div>
                                                            <div className="doc-selector__meta"></div>
                                                        </div>
                                                    </div>
                                                    <svg className="icon icon--sm doc-selector__arrow" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </button>
                                                <div className="doc-dropdown" id="docDropdownDocB"></div>
                                            </div>
                                        </div>
                                        <div className="default-settings" id="defaultSettingsDocB" style={{ display: 'none' }}>
                                            <div className="default-settings__title">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="16" x2="12" y2="12" />
                                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                                </svg>
                                                기본 RAG 설정 적용
                                            </div>
                                            <div className="default-settings__grid">
                                                <div className="default-settings__item">
                                                    <div className="default-settings__label">Top-K</div>
                                                    <div className="default-settings__value">3개</div>
                                                </div>
                                                <div className="default-settings__item">
                                                    <div className="default-settings__label">Chunk</div>
                                                    <div className="default-settings__value">500자</div>
                                                </div>
                                                <div className="default-settings__item">
                                                    <div className="default-settings__label">유사도</div>
                                                    <div className="default-settings__value">0.7</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RAG Settings Content */}
                                    <div className="mode-content" id="ragContentB">
                                        <div className="doc-selector">
                                            <div className="doc-selector__label">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                문서 선택
                                            </div>
                                            <div className="doc-selector__dropdown">
                                                <button className="doc-selector__button" id="docButtonRagB">
                                                    <div className="doc-selector__icon">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path
                                                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                        </svg>
                                                    </div>
                                                    <div className="doc-selector__info">
                                                        <span className="doc-selector__placeholder" id="docPlaceholderRagB">문서를
                                                            선택하세요</span>
                                                        <div id="docSelectedRagB" style={{ display: 'none' }}>
                                                            <div className="doc-selector__name"></div>
                                                            <div className="doc-selector__meta"></div>
                                                        </div>
                                                    </div>
                                                    <svg className="icon icon--sm doc-selector__arrow" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </button>
                                                <div className="doc-dropdown" id="docDropdownRagB"></div>
                                            </div>
                                        </div>
                                        <div className="settings-section" id="settingsSectionRagB" style={{ display: 'none' }}>
                                            <div className="settings-section__title">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path
                                                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                RAG 파라미터 설정
                                            </div>
                                            <div className="setting-row">
                                                <span className="setting-row__label">Top-K</span>
                                                <div className="setting-row__slider">
                                                    <input type="range" min="1" max="10" id="topKB" />
                                                    <span className="setting-row__value" id="topKBValue">5개</span>
                                                </div>
                                            </div>
                                            <div className="setting-row">
                                                <span className="setting-row__label">Chunk Size</span>
                                                <div className="setting-row__slider">
                                                    <input type="range" min="200" max="1000" step="100" id="chunkSizeB" />
                                                    <span className="setting-row__value" id="chunkSizeBValue">500자</span>
                                                </div>
                                            </div>
                                            <div className="setting-row">
                                                <span className="setting-row__label">유사도 임계값</span>
                                                <div className="setting-row__slider">
                                                    <input type="range" min="0.5" max="0.9" step="0.1" id="thresholdB" />
                                                    <span className="setting-row__value" id="thresholdBValue">0.7</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="section-divider"></div>

                                    {/* Sync Notice */}
                                    <div className="sync-notice">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="23 4 23 10 17 10" />
                                            <polyline points="1 20 1 14 7 14" />
                                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                        </svg>
                                        A 패널과 동일한 질문이 자동 입력됩니다
                                    </div>

                                    {/* Test Section */}
                                    <div className="test-section">
                                        <div className="test-section__label">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                            질문 입력
                                        </div>
                                        <textarea className="test-input" id="questionB" rows="2"
                                            placeholder="질문을 입력하세요..."></textarea>
                                        <div className="test-actions">
                                            <button className="btn btn--primary" id="testBtnB" >
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                                실행
                                            </button>
                                        </div>
                                    </div>

                                    {/* Result Box */}
                                    <div className="result-box" id="resultBoxB">
                                        <div className="result-card">
                                            <div className="result-card__header">
                                                <span className="result-card__label" id="resultLabelB">AI 응답 (문서 참조)</span>
                                                <span className="result-card__model result-card__model--gpt" id="resultModelB">
                                                    <span className="model-selector__dot model-selector__dot--gpt"></span>
                                                    GPT-4
                                                </span>
                                            </div>
                                            <div className="result-card__body">
                                                <div className="result-card__text" id="resultContentB">
                                                    업로드하신 문서에 따르면, Python은 1991년 귀도 반 로섬이 개발한 프로그래밍 언어로, 귀사의 데이터 분석 프로젝트에서 주로
                                                    pandas와 numpy 라이브러리를 활용하고 있습니다.

                                                    문서에서 발견된 관련 내용:
                                                    • 데이터 전처리: pandas 라이브러리 사용
                                                    • 수치 계산: numpy 라이브러리 활용
                                                    • 시각화: matplotlib, seaborn 사용
                                                    • 머신러닝: scikit-learn 프레임워크 적용

                                                    귀사의 프로젝트에 최적화된 Python 버전은 3.9 이상입니다.
                                                </div>
                                            </div>
                                            <div className="result-card__footer">
                                                <div className="result-card__stat">
                                                    <div className="result-card__stat-value" id="resultTimeB">1.8초</div>
                                                    <div className="result-card__stat-label">응답 시간</div>
                                                </div>
                                                <div className="result-card__stat">
                                                    <div className="result-card__stat-value" id="resultTokensB">156</div>
                                                    <div className="result-card__stat-label">토큰</div>
                                                </div>
                                                <div className="result-card__stat">
                                                    <div className="result-card__stat-value" id="resultChunksB">3개</div>
                                                    <div className="result-card__stat-label">청크</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>


                </main >
            </div >

            <div
                className={`kb-modal-overlay ${showDeleteModal ? 'kb-modal-overlay--open' : ''}`}
                onClick={() => setShowDeleteModal(false)}
            >
                <div className="kb-modal modal--popup" onClick={event => event.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" id="modalTitle"></h3>
                        <button className="modal__close" onClick={() => setShowDeleteModal(false)}>
                            <svg className="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="modal__body" id="modalBody">
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                <svg style={{ width: '24px', height: '24px', color: 'var(--error)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>파일 삭제</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>선택한 <strong>{selectedDocuments.length}개</strong>의 파일을 삭제하시겠습니까?</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--gray-50)' }}>
                            <button className="modal__btn" style={{ flex: 1 }} onClick={() => setShowDeleteModal(false)}>취소</button>
                            <button className="modal__btn modal__btn--danger" style={{ flex: 1 }} onClick={handleDeleteDocuments}>삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const getStatusLabel = (status) => {
    const statusMap = {
        'uploading': '업로드 중',
        'embedding': '임베딩 중',
        'ready': '준비됨',
        'failed': '실패'
    };
    return statusMap[status] || status;
}

const getStatusColor = (status) => {
    const colorMap = {
        'uploading': 'var(--employee-accent)',
        'embedding': 'var(--employee-accent)',
        'ready': 'var(--employee-primary)',
        'failed': 'var(--error)'
    };
    return colorMap[status] || 'var(--text-secondary)';
}