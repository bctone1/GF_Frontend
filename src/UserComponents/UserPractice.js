import { useState, useEffect, useRef, useMemo } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { showToast, getSelectedClassId, getSelectedClassTitle } from '../utill/utill';

const projects = [
    { id: 1, name: 'AI 실습 기초', icon: '📁', color: '#9333ea' },
    { id: 2, name: '마케팅 프로젝트', icon: '📊', color: '#10b981' },
    { id: 3, name: '코딩 실습', icon: '💻', color: '#3b82f6' },
    { id: 4, name: '데이터 분석', icon: '📈', color: '#f59e0b' }
];

const modelMap = {
    'gpt-4o-mini': { name: 'gpt-4o-mini', color: '#10a37f', bgColor: 'rgba(16, 163, 127, 0.1)' },
    'gemini-2.5-flash': { name: 'gemini-2.5-flash', color: '#4285f4', bgColor: 'rgba(66, 133, 244, 0.1)' },
    'exaone-4.0': { name: 'exaone-4.0', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' },
    'claude-3-haiku-20240307': { name: 'claude-3-haiku-20240307', color: '#000000', bgColor: 'rgba(0, 0, 0, 0.1)' }
};

// const exmpleConversations=[
//     {},
// ];

export default function UserPractice() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentMode, setCurrentMode] = useState('single');
    const [selectedModels, setSelectedModels] = useState(['gpt-4o-mini']);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentProject, setCurrentProject] = useState('AI 실습 기초');
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [plusMenuView, setPlusMenuView] = useState('main');
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [showEmptyState, setShowEmptyState] = useState(true);
    const [comparePanels, setComparePanels] = useState([]);
    const [compareMessages, setCompareMessages] = useState({}); // { model: [messages] }
    const [sessionModelIds, setSessionModelIds] = useState({}); // { model: session_model_id }
    const [documents, setDocuments] = useState([]);
    const [Assistant, setAssistant] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);

    const messageInputRef = useRef(null);
    const plusMenuRef = useRef(null);
    const plusBtnRef = useRef(null);
    const modelDropdownRef = useRef(null);
    const modelDisplayRef = useRef(null);
    const messagesEndRef = useRef(null);
    const compareMessagesRefs = useRef({});
    const accessToken = sessionStorage.getItem("access_token");
    const userId = sessionStorage.getItem("user_id");
    const userEmail = sessionStorage.getItem("user_email");

    const [sessions, setSessions] = useState([]);
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());

    const [allowedModelIds, setAllowedModelIds] = useState(() => {
        const stored = sessionStorage.getItem("allowed_model_ids");
        if (!stored) return [1]; // 기본값
        try {
            return JSON.parse(stored);
        } catch {
            if (typeof stored === 'string' && stored.includes(',')) {
                return stored.split(',').map(id => parseInt(id.trim(), 10));
            }
            return [parseInt(stored, 10)];
        }
    });

    const fetchSessions = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions`,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", } }
        );
        // console.log(response.data.items);
        setSessions(response.data.items);
    }

    // UserSidebar에서 클래스 변경 시 호출되는 콜백
    const handleClassChange = (classId, allowedModelIdsArray) => {
        // console.log(classId, allowedModelIdsArray);
        setSavedClassId(classId);
        setAllowedModelIds(allowedModelIdsArray || [1]);
        // console.log(Assistant.find(model => model.id === allowedModelIdsArray[0]).model_name);
        setSelectedModels([Assistant.find(model => model.id === allowedModelIdsArray[0]).model_name]);
    };




    const filteredSessions = useMemo(() => {
        if (!savedClassId) return [];
        return sessions.filter(
            session => session.class_id === Number(savedClassId)
        );
    }, [sessions, savedClassId]);

    const fetchDocuments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/document`,
            { headers: { Authorization: `Bearer ${accessToken}`, }, }
        );
        setDocuments(response.data.items);
    }

    const fetchAssistant = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/models`);
        console.log(response.data.items);
        setAssistant(response.data.items);
    }

    useEffect(() => {
        fetchAssistant();
        fetchDocuments();
        fetchSessions();
    }, []);


    const CreateSession = () => {
        axios.post(
            `${process.env.REACT_APP_API_URL}/user/practice/sessions`,
            {
                user_id: userId,
                class_id: savedClassId ? parseInt(savedClassId, 10) : null,
                title: "새 대화",
                notes: `${userEmail} 님이 생성`,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            }
        ).then(res => {
            setCurrentSession(res.data.session_id);
            // CreateSessionModels(res.data.session_id);
            fetchSessions();
        }).catch(err => {
            console.log(err);
        });
    };


    // 외부 클릭 처리
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showPlusMenu && plusMenuRef.current && plusBtnRef.current &&
                !plusBtnRef.current.contains(e.target) &&
                !plusMenuRef.current.contains(e.target)) {
                setShowPlusMenu(false);
            }

            if (showModelDropdown && modelDropdownRef.current && modelDisplayRef.current &&
                !modelDisplayRef.current.contains(e.target) &&
                !modelDropdownRef.current.contains(e.target)) {
                setShowModelDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showPlusMenu, showModelDropdown]);

    // 메시지 스크롤
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentMessages]);

    // 비교 패널 생성
    useEffect(() => {
        if (currentMode === 'parallel' && selectedModels.length >= 2) {
            setComparePanels(selectedModels);
            // 선택된 모델이 변경되면 해당 모델의 메시지 초기화
            const newCompareMessages = {};
            selectedModels.forEach(model => {
                if (compareMessages[model]) {
                    newCompareMessages[model] = compareMessages[model];
                }
            });
            setCompareMessages(newCompareMessages);
        } else {
            setComparePanels([]);
        }
    }, [currentMode, selectedModels]);

    // 비교 모드 메시지 스크롤
    useEffect(() => {
        if (currentMode === 'parallel') {
            comparePanels.forEach(model => {
                const ref = compareMessagesRefs.current[model];
                if (ref) {
                    ref.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }, [compareMessages, comparePanels, currentMode]);


    const getModelInfo = (model) => {
        return modelMap[model] || modelMap['gemini'];
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getSimulatedResponse = async (model, question) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/practice/sessions/${currentSession}/chat?class_id=${savedClassId}`,
                {
                    prompt_text: question,
                    session_model_ids: [defaltModels]
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            // console.log(res.data.results[0].response_text);
            return res.data.results[0].response_text;
        } catch (err) {
            console.log(err);
            return `서버와 통신중 오류가 발생했습니다. 다시 시도해주세요.`;
        }
    };

    // 비교 모드용 API 호출 (여러 모델 ID 지원)
    const getCompareResponse = async (question, sessionModelIdsArray) => {
        try {
            const documentIds = attachedFiles
                .filter(file => file.isDocument && file.knowledge_id)
                .map(file => file.knowledge_id);

            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/practice/sessions/${currentSession}/chat?class_id=${savedClassId}`,
                {
                    prompt_text: question,
                    session_model_ids: sessionModelIdsArray,
                    document_ids: documentIds.length > 0 ? documentIds : [0]
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const autoResize = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
        }
    };

    const toggleChatSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const togglePlusMenu = () => {
        if (showPlusMenu) {
            setShowPlusMenu(false);
        } else {
            setPlusMenuView('main');
            setShowPlusMenu(true);
        }
    };

    const showMainMenu = (e) => {
        e.stopPropagation();
        setPlusMenuView('main');
    };

    const showProjectMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('project');
    };

    const showAgentMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('agent');
    };

    const showKnowledgeMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('knowledge');
    };

    const showIntegrationMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('integration');
    };

    const selectProjectFromPlusMenu = (projectName) => {
        setCurrentProject(projectName);
        setShowPlusMenu(false);
        setPlusMenuView('main');
        // Toast 메시지는 추후 구현
        // console.log(`프로젝트 변경: ${projectName}`);
    };

    const toggleModelDropdown = () => {
        setShowModelDropdown(!showModelDropdown);
    };

    const startNewChat = () => {
        if (currentMessages.length > 0 || Object.keys(compareMessages).length > 0) {
            if (!window.confirm('현재 대화를 저장하고 새 대화를 시작하시겠습니까?')) return;
        }
        setCurrentMessages([]);
        setCompareMessages({});
        setShowEmptyState(true); // 단일모드로 전환
        CreateSession(); // 세션 생성


        showToast('새 대화가 시작되었습니다', 'success');
    };

    const [defaltModels, setDefaltModels] = useState(0);

    const applySuggestion = (text) => {
        setMessageInput(text);
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
    };

    const switchMode = (mode) => {
        setCurrentMode(mode);

        if (mode === 'single') {
            if (selectedModels.length > 1) {
                // setSelectedModels([selectedModels[0]]);
                setSelectedModels([Assistant.find(model => model.id === allowedModelIds[0]).model_name]);
            }
            console.log('단일 모델 모드로 전환');
        } else {
            if (selectedModels.length < 2) {
                // console.log('비교 모드는 최소 2개 모델을 선택해주세요');
                // setSelectedModels(['gemini-2.5-flash', 'gpt-4o-mini']);
                // console.log(allowedModelIds);
                if (allowedModelIds.length < 2) {
                    alert("사용가능한 모델이 2개 이상이 필요합니다. 파트너에게 문의해주세요");
                    setCurrentMode('single');
                    setSelectedModels([Assistant.find(model => model.id === allowedModelIds[0]).model_name]);
                } else {
                    setSelectedModels([Assistant.find(model => model.id === allowedModelIds[0]).model_name, Assistant.find(model => model.id === allowedModelIds[1]).model_name]);
                }
            }
            console.log('모델 비교 모드로 전환');
        }
    };

    const handleModelCheckboxChange = (modelValue, checked) => {
        console.log(modelValue, checked);
        if (checked) {
            if (currentMode === 'single') {
                setSelectedModels([modelValue]);
            } else {
                if (selectedModels.length >= 3) {
                    console.log('최대 3개 모델까지 비교 가능합니다');
                    return;
                }
                setSelectedModels([...selectedModels, modelValue]);
            }
        } else {
            const remainingModels = selectedModels.filter(m => m !== modelValue);
            setSelectedModels(remainingModels);

            // 비교 모드에서 모델이 1개만 남으면 알림 후 단일 모드로 전환
            if (currentMode === 'parallel' && remainingModels.length === 1) {
                alert('비교 모드에는 최소 2개 이상의 모델이 필요합니다. 단일 모드로 전환합니다.');
                setCurrentMode('single');
            }
        }
    };

    const updateSelectedDisplay = () => {
        if (selectedModels.length === 1) {
            const info = getModelInfo(selectedModels[0]);
            // console.log(info);
            return { text: info.name, icon: '🤖', bgColor: info.bgColor, color: info.color };
        } else if (selectedModels.length > 1) {
            return { text: `${selectedModels.length}개 모델 선택됨`, icon: '🤖', bgColor: 'var(--primary-100)', color: 'var(--primary-600)' };
        }
        return { text: 'gemini-1.5-flash', icon: '🤖', bgColor: 'rgba(66, 133, 244, 0.1)', color: '#4285f4' };
    };

    const sendMessage = async () => {
        if (!currentSession) {
            alert("새 대화를 눌러주세요");
            return;
        }
        const message = messageInput.trim();
        console.log(selectedModels);

        if (!message || isGenerating) return;
        if (selectedModels.length === 0) {
            console.log('모델을 선택해주세요');
            return;
        }

        setMessageInput('');
        if (messageInputRef.current) {
            autoResize(messageInputRef.current);
        }
        setIsGenerating(true);
        setShowEmptyState(false);

        if (currentMode === 'single') {
            // 사용자 메시지 추가
            setCurrentMessages(prev => [...prev,
            <div key={`user-${Date.now()}`} className={`chat-message chat-message--user`}>
                <div className="chat-message__avatar">김</div>
                <div className="chat-message__content">
                    <div className="chat-message__bubble">
                        <div className="chat-message__text">{message}</div>
                    </div>
                    <div className="chat-message__meta">
                        <span className="chat-message__time">
                            {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
            </div>
            ]);

            // 선택된 모델들에 대해 백엔드 통신
            for (const model of selectedModels) {
                const modelInfo = model ? getModelInfo(model) : null;
                try {
                    const response = await getSimulatedResponse(model, message);

                    setCurrentMessages(prev => [...prev,
                    <div key={`assistant-${Date.now()}-${model}`} className="chat-message chat-message--assistant">
                        <div className="chat-message__avatar">🤖</div>
                        <div className="chat-message__content">
                            <div className="chat-message__bubble">
                                <div className="chat-message__text">{response}</div>
                            </div>
                            <div className="chat-message__meta">
                                <span className="chat-message__time">
                                    {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {modelInfo && (
                                    <span className="chat-message__model" style={{ background: modelInfo.bgColor, color: modelInfo.color }}>
                                        {modelInfo.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    ]);
                } catch (err) {
                    console.error('응답 생성 중 오류:', err);
                }
            }

            setIsGenerating(false);
        } else {
            // 비교 모드
            const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

            // 각 패널에 사용자 메시지 추가
            selectedModels.forEach(model => {
                setCompareMessages(prev => ({
                    ...prev,
                    [model]: [
                        ...(prev[model] || []),
                        {
                            type: 'user',
                            content: message,
                            time: currentTime
                        }
                    ]
                }));
            });

            // 세션 모델 ID 배열 생성
            // 각 모델에 대한 세션 모델 ID가 있으면 사용하고, 없으면 기본 모델 ID 사용
            const modelIdsToSend = selectedModels.map(model => {
                return sessionModelIds[model] || defaltModels;
            });

            try {
                const responseData = await getCompareResponse(message, modelIdsToSend);

                if (responseData && responseData.results) {
                    // 각 결과를 해당 모델의 패널에 추가
                    responseData.results.forEach((result, index) => {
                        if (index < selectedModels.length) {
                            const model = selectedModels[index];
                            const modelInfo = getModelInfo(model);

                            setCompareMessages(prev => ({
                                ...prev,
                                [model]: [
                                    ...(prev[model] || []),
                                    {
                                        type: 'assistant',
                                        content: result.response_text,
                                        time: new Date(result.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                                        modelName: result.model_name,
                                        modelInfo: modelInfo,
                                        latency: result.latency_ms,
                                        tokenUsage: result.token_usage
                                    }
                                ]
                            }));
                        }
                    });
                }
            } catch (err) {
                console.error('응답 생성 중 오류:', err);
                // 오류 발생 시 각 패널에 오류 메시지 추가
                selectedModels.forEach(model => {
                    setCompareMessages(prev => ({
                        ...prev,
                        [model]: [
                            ...(prev[model] || []),
                            {
                                type: 'assistant',
                                content: '서버와 통신중 오류가 발생했습니다. 다시 시도해주세요.',
                                time: currentTime,
                                isError: true
                            }
                        ]
                    }));
                });
            }

            setIsGenerating(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const uploadFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,.pdf,.doc,.docx,.txt';
        input.multiple = true;
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) {
                    console.log(`${file.name}은 10MB 초과`);
                    return;
                }
                setAttachedFiles(prev => [...prev, file]);
                console.log(`${file.name} 첨부됨`);
            });
        };
        input.click();
    };

    const removeFile = (index) => {
        const file = attachedFiles[index];
        const fileName = file.name || (file.documentName || '파일');
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
        console.log(`${fileName} 제거됨`);
    };

    const addDocumentToAttached = (document) => {
        // 이미 첨부된 문서인지 확인
        const isAlreadyAttached = attachedFiles.some(
            file => file.knowledge_id === document.knowledge_id
        );

        if (isAlreadyAttached) {
            showToast('이미 첨부된 문서입니다.', 'info');
            return;
        }

        // 문서 정보를 File 객체처럼 만들어서 추가
        const documentFile = {
            knowledge_id: document.knowledge_id,
            name: document.name,
            size: document.file_size_bytes,
            documentName: document.name,
            isDocument: true,
            updated_at: document.updated_at,
            chunk_count: document.chunk_count
        };

        setAttachedFiles(prev => [...prev, documentFile]);
        setShowPlusMenu(false);
        setPlusMenuView('main');
        showToast(`${document.name}이(가) 첨부되었습니다.`, 'success');
    };

    const selectedDisplay = updateSelectedDisplay();

    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar onClassChange={handleClassChange} />

                    <main className="main">
                        <div className="practice-container">
                            {/* 좌측: 히스토리 사이드바 */}
                            <aside className={`chat-sidebar ${isSidebarCollapsed ? 'chat-sidebar--collapsed' : ''}`} id="chatSidebar">
                                <div className="chat-sidebar__header">
                                    <h2 className="chat-sidebar__title">최근 대화</h2>
                                    <button className="chat-sidebar__new-chat" onClick={startNewChat}>
                                        <span>새 대화</span>
                                    </button>
                                </div>

                                <div className="chat-sidebar__history" id="chatHistory">
                                    {filteredSessions.map((session) => (
                                        <div key={session.session_id} className={`chat-history-item ${currentSession === session.session_id ? 'chat-history-item--active' : ''}`} onClick={() => setCurrentSession(session.session_id)}>
                                            <div className="chat-history-item__project">{session.title ? session.title : '타이틀 없음'}</div>
                                            <div className="chat-history-item__title">session_id : {session.session_id}</div>
                                            <div className="chat-history-item__meta">
                                                <div className="chat-history-item__models">
                                                    <div className="chat-history-item__model-icon" style={{ background: 'rgba(16, 163, 127, 0.1)', color: '#10a37f' }}>G</div>
                                                    <div className="chat-history-item__model-icon" style={{ background: 'rgba(217, 119, 87, 0.1)', color: '#d97757' }}>C</div>
                                                    <div className="chat-history-item__model-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285f4' }}>G</div>
                                                </div>
                                                <span>
                                                    {session.started_at.split('T')[0].slice(5)}{" "}
                                                    {session.started_at.split('T')[1].slice(0, 5)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="chat-sidebar__files" id="attachedFiles">
                                    <h3 className="chat-sidebar__files-title">첨부된 파일 ({attachedFiles.length}개)</h3>
                                    {attachedFiles.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 'var(--space-3)', color: 'var(--text-tertiary)', fontSize: '11px' }}>
                                            📁<br />첨부된 파일이 없습니다
                                        </div>
                                    ) : (
                                        attachedFiles.map((file, index) => (
                                            <div key={index} className="attached-file">
                                                <div className="attached-file__icon">📄</div>
                                                <div className="attached-file__info">
                                                    <div className="attached-file__name">{file.name || file.documentName}</div>
                                                    <div className="attached-file__size">
                                                        {file.size ? formatFileSize(file.size) : (file.chunk_count ? `${file.chunk_count} 청크` : '')}
                                                        {file.isDocument && <span style={{ marginLeft: '4px', color: 'var(--primary-600)', fontSize: '10px' }}>지식베이스</span>}
                                                    </div>
                                                </div>
                                                <button className="attached-file__remove" onClick={() => removeFile(index)}>✕</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </aside>

                            {/* 중앙: 대화 영역 */}
                            <section className="chat-main" id="chatMain" style={{ position: 'relative' }}>
                                <button
                                    className={`sidebar-toggle-btn ${isSidebarCollapsed ? 'sidebar-toggle-btn--collapsed' : ''}`}
                                    id="sidebarToggleBtn"
                                    onClick={toggleChatSidebar}
                                >
                                    <span className="sidebar-toggle-btn__icon">{isSidebarCollapsed ? '▶' : '◀'}</span>
                                </button>

                                {/* 단일 모드 헤더 */}
                                {currentMode === 'single' && (
                                    <div className="chat-main__header" id="singleHeader">
                                        <div className="chat-main__title">
                                            <span>파일 첨부 확인</span>
                                            <span className="chat-main__badge">코딩 에이전트</span>
                                        </div>
                                        {/* <div className="chat-main__actions">
                                            <button className="btn-icon" title="설정">⚙️</button>
                                        </div> */}
                                    </div>
                                )}

                                {/* 단일 모드 대화창 */}
                                {currentMode === 'single' && (
                                    <div className="chat-messages" id="chatMessages">
                                        {showEmptyState && currentMessages.length === 0 ? (
                                            <div className="empty-state">
                                                <div className="empty-state__icon">💬</div>
                                                <h3 className="empty-state__title">새로운 대화를 시작하세요</h3>
                                                <p className="empty-state__desc">질문을 입력하거나 아래 제안 중 하나를 선택해보세요</p>
                                                <div className="empty-state__suggestions" style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                    <button className="suggestion-chip" onClick={() => applySuggestion('코드 리뷰 부탁해')}>코드 리뷰 부탁해</button>
                                                    <button className="suggestion-chip" onClick={() => applySuggestion('버그 찾아줘')}>버그 찾아줘</button>
                                                    <button className="suggestion-chip" onClick={() => applySuggestion('성능 최적화 방법')}>성능 최적화 방법</button>
                                                    <button className="suggestion-chip" onClick={() => applySuggestion('테스트 코드 작성')}>테스트 코드 작성</button>
                                                </div>
                                            </div>
                                        ) : (
                                            currentMessages.map((message) => message)
                                        )}


                                        {isGenerating && (
                                            <div className="chat-message chat-message--assistant chat-message--loading">
                                                <div className="chat-message__avatar">🤖</div>
                                                <div className="chat-message__content">
                                                    <div className="chat-message__bubble">
                                                        <div className="typing-indicator">
                                                            <div className="typing-indicator__dot"></div>
                                                            <div className="typing-indicator__dot"></div>
                                                            <div className="typing-indicator__dot"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}

                                {/* 비교 모드 컨테이너 */}
                                {currentMode === 'parallel' && (
                                    <div className="chat-main--compare" id="compareContainer">
                                        {comparePanels.map((model) => {
                                            const modelInfo = getModelInfo(model);
                                            const messages = compareMessages[model] || [];
                                            const hasMessages = messages.length > 0;

                                            return (
                                                <div key={model} className="compare-panel" data-model={model}>
                                                    <div className="compare-panel__header">
                                                        <div className="compare-panel__model">
                                                            <div className="compare-panel__model-icon" style={{ background: modelInfo.bgColor, color: modelInfo.color }}>
                                                                🤖
                                                            </div>
                                                            <div className="compare-panel__model-name">{modelInfo.name}</div>
                                                        </div>
                                                        {/* <div className="compare-panel__actions">
                                                            <button className="btn-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }} title="새로고침">🔄</button>
                                                        </div> */}
                                                    </div>
                                                    <div className="compare-panel__messages" id={`compareMessages-${model}`}>
                                                        {!hasMessages ? (
                                                            <div className="empty-state" style={{ padding: 'var(--space-6)' }}>
                                                                <div className="empty-state__icon" style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>💬</div>
                                                                <div className="empty-state__desc" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                                                    {modelInfo.name} 응답이 여기에 표시됩니다
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {messages.map((msg, index) => (
                                                                    <div key={index} className={`chat-message ${msg.type === 'user' ? 'chat-message--user' : 'chat-message--assistant'}`}>
                                                                        <div className="chat-message__avatar">
                                                                            {msg.type === 'user' ? '김' : '🤖'}
                                                                        </div>
                                                                        <div className="chat-message__content">
                                                                            <div className="chat-message__bubble">
                                                                                <div className="chat-message__text">{msg.content}</div>
                                                                            </div>
                                                                            <div className="chat-message__meta">
                                                                                <span className="chat-message__time">{msg.time}</span>
                                                                                {msg.type === 'assistant' && msg.modelInfo && (
                                                                                    <span className="chat-message__model" style={{ background: msg.modelInfo.bgColor, color: msg.modelInfo.color }}>
                                                                                        {msg.modelName || msg.modelInfo.name}
                                                                                    </span>
                                                                                )}
                                                                                {msg.type === 'assistant' && msg.latency && (
                                                                                    <span className="chat-message__latency" style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>
                                                                                        {msg.latency}ms
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {isGenerating && (
                                                                    <div className="chat-message chat-message--assistant chat-message--loading">
                                                                        <div className="chat-message__avatar">🤖</div>
                                                                        <div className="chat-message__content">
                                                                            <div className="chat-message__bubble">
                                                                                <div className="typing-indicator">
                                                                                    <div className="typing-indicator__dot"></div>
                                                                                    <div className="typing-indicator__dot"></div>
                                                                                    <div className="typing-indicator__dot"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div ref={el => compareMessagesRefs.current[model] = el} />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="chat-input-wrapper">
                                    <div className="chat-input" id="chatInput">
                                        <div className="chat-input__textarea-wrapper">
                                            <button
                                                className="chat-input__plus-btn"
                                                id="plusBtn"
                                                ref={plusBtnRef}
                                                onClick={togglePlusMenu}
                                            >
                                                <span>➕</span>
                                            </button>
                                            <textarea
                                                className="chat-input__textarea"
                                                id="messageInput"
                                                ref={messageInputRef}
                                                value={messageInput}
                                                onChange={(e) => {
                                                    setMessageInput(e.target.value);
                                                    autoResize(e.target);
                                                }}
                                                onKeyDown={handleKeyDown}
                                                placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                                rows="2"
                                            />
                                        </div>

                                        {/* Plus Menu Dropdown */}
                                        {showPlusMenu && (
                                            <div className="plus-menu" id="plusMenu" ref={plusMenuRef}>
                                                {plusMenuView === 'main' && (
                                                    <div id="mainMenu">
                                                        <button className="plus-menu__item" onClick={showProjectMenu}>
                                                            <span className="plus-menu__icon">📁</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">프로젝트 선택</div>
                                                                <div className="plus-menu__desc">작업할 프로젝트 변경</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>

                                                        <div className="plus-menu__divider"></div>

                                                        <button className="plus-menu__item" onClick={showAgentMenu}>
                                                            <span className="plus-menu__icon">👨‍💻</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">AI 에이전트</div>
                                                                <div className="plus-menu__desc">AI 에이전트 선택 및 관리</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>
                                                        <button className="plus-menu__item" onClick={showKnowledgeMenu}>
                                                            <span className="plus-menu__icon">📚</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">지식베이스</div>
                                                                <div className="plus-menu__desc">지식베이스에서 선택</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>
                                                        <button className="plus-menu__item" onClick={uploadFile}>
                                                            <span className="plus-menu__icon">📎</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">파일 첨부</div>
                                                                <div className="plus-menu__desc">현재 대화에 파일 첨부</div>
                                                            </div>
                                                        </button>
                                                        <button className="plus-menu__item" onClick={showIntegrationMenu}>
                                                            <span className="plus-menu__icon">🔗</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">외부 연동</div>
                                                                <div className="plus-menu__desc">외부 서비스 연결</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>
                                                    </div>
                                                )}

                                                {plusMenuView === 'project' && (
                                                    <div id="projectMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">프로젝트 선택</span>
                                                        </div>
                                                        <div id="plusMenuProjects">
                                                            {projects && projects.length > 0 ? (
                                                                projects.map(project => (
                                                                    <div
                                                                        key={project.id}
                                                                        className={`plus-menu__project-item ${project.name === currentProject ? 'plus-menu__project-item--active' : ''}`}
                                                                        onClick={() => selectProjectFromPlusMenu(project.name)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        <div className="plus-menu__project-icon" style={{ background: `${project.color}20`, color: project.color }}>
                                                                            {project.icon}
                                                                        </div>
                                                                        <div className="plus-menu__project-name">{project.name}</div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="plus-menu__empty">프로젝트가 없습니다</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {plusMenuView === 'agent' && (
                                                    <div id="agentMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">AI 에이전트</span>
                                                        </div>
                                                        <div className="plus-menu__empty">
                                                            Phase 2에서 구현 예정입니다
                                                        </div>
                                                    </div>
                                                )}

                                                {plusMenuView === 'knowledge' && (
                                                    <div id="knowledgeMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">지식베이스</span>
                                                        </div>
                                                        <div id="plusMenuKnowledge" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                            {documents && documents.length > 0 ? (
                                                                documents.map(document => (
                                                                    <div
                                                                        key={document.knowledge_id}
                                                                        className="plus-menu__item"
                                                                        onClick={() => addDocumentToAttached(document)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        <span className="plus-menu__icon">📄</span>
                                                                        <div className="plus-menu__text">
                                                                            <div className="plus-menu__title">{document.name}</div>
                                                                            <div className="plus-menu__desc">
                                                                                {formatFileSize(document.file_size_bytes)} · {document.chunk_count} 청크
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="plus-menu__empty">
                                                                    등록된 문서가 없습니다. 문서를 등록해주세요.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {plusMenuView === 'integration' && (
                                                    <div id="integrationMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">외부 연동</span>
                                                        </div>
                                                        <div className="plus-menu__empty">
                                                            Phase 2에서 구현 예정입니다
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="chat-input__footer">
                                            <div className="chat-input__info">
                                                <div className="chat-input__cost">
                                                    <span>예상:</span>
                                                    <span className="chat-input__cost-value">$0.02</span>
                                                </div>
                                                <span>~200 tokens</span>
                                            </div>
                                            <button
                                                className="chat-input__send"
                                                id="sendBtn"
                                                onClick={sendMessage}
                                                disabled={isGenerating}
                                            >
                                                <span>전송</span>
                                                <span>⏎</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="chat-input__shortcuts">
                                        💡 Cmd+K 입력 지우기 · Cmd+/ 명령어 · Cmd+M 모드 전환
                                    </div>
                                </div>
                            </section>

                            {/* 우측: 모델 선택 패널 */}
                            <aside className="model-panel" id="modelPanel">
                                <div className="model-panel__header">
                                    <h2 className="model-panel__title">LLM 모델</h2>

                                    <div className="mode-switcher">
                                        <div className="mode-tabs">
                                            <button
                                                className={`mode-tab ${currentMode === 'single' ? 'mode-tab--active' : ''}`}
                                                data-mode="single"
                                                onClick={() => switchMode('single')}
                                            >
                                                단일
                                            </button>
                                            <button
                                                className={`mode-tab ${currentMode === 'parallel' ? 'mode-tab--active' : ''}`}
                                                data-mode="parallel"
                                                onClick={() => switchMode('parallel')}
                                            >
                                                비교
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="model-panel__body">
                                    <div className="selected-model-display" id="selectedModelDisplay">
                                        <div className="selected-model-display__label">현재 선택</div>
                                        <button
                                            className={`selected-model-display__button ${showModelDropdown ? 'open' : ''}`}
                                            ref={modelDisplayRef}
                                            onClick={toggleModelDropdown}
                                        >
                                            <span
                                                className="selected-model-display__icon"
                                                style={{ background: selectedDisplay.bgColor, color: selectedDisplay.color }}
                                            >
                                                {selectedDisplay.icon}
                                            </span>
                                            <span className="selected-model-display__text">{selectedDisplay.text}</span>
                                            <span className="selected-model-display__arrow">▼</span>
                                        </button>
                                    </div>

                                    {showModelDropdown && (
                                        <div className="model-selector-dropdown" id="modelDropdown" ref={modelDropdownRef}>
                                            {Assistant.map((model) => (
                                                <label
                                                    key={model.id}
                                                    className={`model-selector-dropdown__item ${selectedModels.includes(model.id) ? 'model-selector-dropdown__item--selected' : ''
                                                        }`}
                                                    style={{ opacity: !allowedModelIds.includes(model.id) ? 0.5 : 1 }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="model-checkbox-input"
                                                        value={model.id}
                                                        checked={selectedModels.includes(model.model_name)}
                                                        onChange={(e) => handleModelCheckboxChange(model.model_name, e.target.checked)}
                                                        disabled={!allowedModelIds.includes(model.id)}
                                                    />
                                                    <div
                                                        className={`model-selector-dropdown__icon ${model.iconClass || ''}`}
                                                        style={model.iconStyle || {}}
                                                    >
                                                        🤖
                                                    </div>
                                                    <div className="model-selector-dropdown__info">
                                                        <div className="model-selector-dropdown__name">{model.model_name}</div>
                                                        <div className="model-selector-dropdown__desc">{model.provider}</div>
                                                    </div>
                                                    <span className="model-selector-dropdown__check">
                                                        {selectedModels.includes(model.id) ? '✓' : ''}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </aside>


                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
