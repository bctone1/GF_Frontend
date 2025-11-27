import { useState, useEffect, useRef } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

const projects = [
    { id: 1, name: 'AI 실습 기초', icon: '📁', color: '#9333ea' },
    { id: 2, name: '마케팅 프로젝트', icon: '📊', color: '#10b981' },
    { id: 3, name: '코딩 실습', icon: '💻', color: '#3b82f6' },
    { id: 4, name: '데이터 분석', icon: '📈', color: '#f59e0b' }
];

const modelMap = {
    'gpt-4': { name: 'GPT-4', color: '#10a37f', bgColor: 'rgba(16, 163, 127, 0.1)' },
    'claude': { name: 'Claude', color: '#d97757', bgColor: 'rgba(217, 119, 87, 0.1)' },
    'gemini': { name: 'Gemini', color: '#4285f4', bgColor: 'rgba(66, 133, 244, 0.1)' },
    'exaone': { name: 'EXAONE', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' }
};

export default function UserPractice() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentMode, setCurrentMode] = useState('single');
    const [selectedModels, setSelectedModels] = useState(['gemini']);
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

    const messageInputRef = useRef(null);
    const plusMenuRef = useRef(null);
    const plusBtnRef = useRef(null);
    const modelDropdownRef = useRef(null);
    const modelDisplayRef = useRef(null);
    const messagesEndRef = useRef(null);
    const compareMessagesRefs = useRef({});

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
        } else {
            setComparePanels([]);
        }
    }, [currentMode, selectedModels]);

    const getModelInfo = (model) => {
        return modelMap[model] || modelMap['gemini'];
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getSimulatedResponse = (model, question) => {
        return `안녕하세요! "${question}"에 대한 ${getModelInfo(model).name}의 답변입니다.\n\n이 기능은 개발 중이며, 실제 API 연동 후 정확한 답변을 제공할 예정입니다.`;
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
        console.log(`프로젝트 변경: ${projectName}`);
    };

    const toggleModelDropdown = () => {
        setShowModelDropdown(!showModelDropdown);
    };

    const startNewChat = () => {
        if (currentMessages.length > 0) {
            if (!window.confirm('현재 대화를 저장하고 새 대화를 시작하시겠습니까?')) return;
        }

        setCurrentMessages([]);
        setShowEmptyState(true);
        // Toast 메시지는 추후 구현
        console.log('새 대화가 시작되었습니다');
    };

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
                setSelectedModels([selectedModels[0]]);
            }
            console.log('단일 모델 모드로 전환');
        } else {
            if (selectedModels.length < 2) {
                console.log('비교 모드는 최소 2개 모델을 선택해주세요');
                setSelectedModels(['gemini', 'gpt-4']);
            }
            console.log('모델 비교 모드로 전환');
        }
    };

    const handleModelCheckboxChange = (modelValue, checked) => {
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
            setSelectedModels(selectedModels.filter(m => m !== modelValue));
        }
    };

    const updateSelectedDisplay = () => {
        if (selectedModels.length === 1) {
            const info = getModelInfo(selectedModels[0]);
            return { text: info.name, icon: '🤖', bgColor: info.bgColor, color: info.color };
        } else if (selectedModels.length > 1) {
            return { text: `${selectedModels.length}개 모델 선택됨`, icon: '🤖', bgColor: 'var(--primary-100)', color: 'var(--primary-600)' };
        }
        return { text: 'gemini-1.5-flash', icon: '🤖', bgColor: 'rgba(66, 133, 244, 0.1)', color: '#4285f4' };
    };

    const sendMessage = () => {
        const message = messageInput.trim();

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

            setCurrentMessages(prev => [...prev,
            <div className={`chat-message chat-message--user`}>
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

            selectedModels.forEach(model => {
                const modelInfo = model ? getModelInfo(model) : null;
                setTimeout(() => {
                    const response = getSimulatedResponse(model, message);

                    setCurrentMessages(prev => [...prev,
                    <div className="chat-message chat-message--assistant">
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

                    setIsGenerating(false);
                }, 2000);
            });
        } else {
            // 비교 모드
            selectedModels.forEach(model => {
                setTimeout(() => {
                    const response = getSimulatedResponse(model, message);
                    // 비교 모드 메시지는 별도로 관리 (추후 구현)
                    setIsGenerating(false);
                }, 2000);
            });
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
        const fileName = attachedFiles[index].name;
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
        console.log(`${fileName} 제거됨`);
    };

    const selectedDisplay = updateSelectedDisplay();

    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

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
                                    <div className="chat-history-item chat-history-item--active">
                                        <div className="chat-history-item__project">📁 AI 실습 기초</div>
                                        <div className="chat-history-item__title">파일 첨부 확인</div>
                                        <div className="chat-history-item__meta">
                                            <div className="chat-history-item__models">
                                                <div className="chat-history-item__model-icon"
                                                    style={{ background: 'rgba(16, 163, 127, 0.1)', color: '#10a37f' }}>G</div>
                                            </div>
                                            <span>10. 30. 15:19</span>
                                        </div>
                                    </div>

                                    <div className="chat-history-item">
                                        <div className="chat-history-item__project">📁 마케팅 프로젝트</div>
                                        <div className="chat-history-item__title">경주 행사 문의</div>
                                        <div className="chat-history-item__meta">
                                            <div className="chat-history-item__models">
                                                <div className="chat-history-item__model-icon"
                                                    style={{ background: 'rgba(217, 119, 87, 0.1)', color: '#d97757' }}>C</div>
                                            </div>
                                            <span>10. 29. 14:32</span>
                                        </div>
                                    </div>

                                    <div className="chat-history-item">
                                        <div className="chat-history-item__project">📁 코딩 실습</div>
                                        <div className="chat-history-item__title">React DOM 제어</div>
                                        <div className="chat-history-item__meta">
                                            <div className="chat-history-item__models">
                                                <div className="chat-history-item__model-icon"
                                                    style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285f4' }}>G</div>
                                            </div>
                                            <span>10. 28. 09:15</span>
                                        </div>
                                    </div>

                                    <div className="chat-history-item">
                                        <div className="chat-history-item__title">자기소개 요청</div>
                                        <div className="chat-history-item__meta">
                                            <div className="chat-history-item__models">
                                                <div className="chat-history-item__model-icon"
                                                    style={{ background: 'rgba(16, 163, 127, 0.1)', color: '#10a37f' }}>G</div>
                                                <div className="chat-history-item__model-icon"
                                                    style={{ background: 'rgba(217, 119, 87, 0.1)', color: '#d97757' }}>C</div>
                                                <div className="chat-history-item__model-icon"
                                                    style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285f4' }}>G</div>
                                            </div>
                                            <span>10. 27. 16:48</span>
                                        </div>
                                    </div>
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
                                                    <div className="attached-file__name">{file.name}</div>
                                                    <div className="attached-file__size">{formatFileSize(file.size)}</div>
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
                                        <div className="chat-main__actions">
                                            <button className="btn-icon" title="설정">⚙️</button>
                                        </div>
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
                                            return (
                                                <div key={model} className="compare-panel" data-model={model}>
                                                    <div className="compare-panel__header">
                                                        <div className="compare-panel__model">
                                                            <div className="compare-panel__model-icon" style={{ background: modelInfo.bgColor, color: modelInfo.color }}>
                                                                🤖
                                                            </div>
                                                            <div className="compare-panel__model-name">{modelInfo.name}</div>
                                                        </div>
                                                        <div className="compare-panel__actions">
                                                            <button className="btn-icon" style={{ width: '28px', height: '28px', fontSize: '14px' }} title="새로고침">🔄</button>
                                                        </div>
                                                    </div>
                                                    <div className="compare-panel__messages" id={`compareMessages-${model}`}>
                                                        <div className="empty-state" style={{ padding: 'var(--space-6)' }}>
                                                            <div className="empty-state__icon" style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>💬</div>
                                                            <div className="empty-state__desc" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                                                {modelInfo.name} 응답이 여기에 표시됩니다
                                                            </div>
                                                        </div>
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
                                                        <div className="plus-menu__empty">
                                                            Phase 2에서 구현 예정입니다
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
                                            <label className={`model-selector-dropdown__item ${selectedModels.includes('exaone') ? 'model-selector-dropdown__item--selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    className="model-checkbox-input"
                                                    value="exaone"
                                                    checked={selectedModels.includes('exaone')}
                                                    onChange={(e) => handleModelCheckboxChange('exaone', e.target.checked)}
                                                />
                                                <div className="model-selector-dropdown__icon"
                                                    style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>🤖</div>
                                                <div className="model-selector-dropdown__info">
                                                    <div className="model-selector-dropdown__name">exaone-3.5</div>
                                                    <div className="model-selector-dropdown__desc">LG AI Research의 최신 멀티모달 모델</div>
                                                </div>
                                                <span className="model-selector-dropdown__check">
                                                    {selectedModels.includes('exaone') ? '✓' : ''}
                                                </span>
                                            </label>

                                            <label className={`model-selector-dropdown__item ${selectedModels.includes('claude') ? 'model-selector-dropdown__item--selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    className="model-checkbox-input"
                                                    value="claude"
                                                    checked={selectedModels.includes('claude')}
                                                    onChange={(e) => handleModelCheckboxChange('claude', e.target.checked)}
                                                />
                                                <div className="model-selector-dropdown__icon model-checkbox__icon--claude">🤖</div>
                                                <div className="model-selector-dropdown__info">
                                                    <div className="model-selector-dropdown__name">claude-3-sonnet</div>
                                                    <div className="model-selector-dropdown__desc">Anthropic의 고능력 대화 모델</div>
                                                </div>
                                                <span className="model-selector-dropdown__check">
                                                    {selectedModels.includes('claude') ? '✓' : ''}
                                                </span>
                                            </label>

                                            <label className={`model-selector-dropdown__item ${selectedModels.includes('gpt-4') ? 'model-selector-dropdown__item--selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    className="model-checkbox-input"
                                                    value="gpt-4"
                                                    checked={selectedModels.includes('gpt-4')}
                                                    onChange={(e) => handleModelCheckboxChange('gpt-4', e.target.checked)}
                                                />
                                                <div className="model-selector-dropdown__icon model-checkbox__icon--gpt">🤖</div>
                                                <div className="model-selector-dropdown__info">
                                                    <div className="model-selector-dropdown__name">gpt-4o</div>
                                                    <div className="model-selector-dropdown__desc">OpenAI 최신 플래그쉽 모델</div>
                                                </div>
                                                <span className="model-selector-dropdown__check">
                                                    {selectedModels.includes('gpt-4') ? '✓' : ''}
                                                </span>
                                            </label>

                                            <label className={`model-selector-dropdown__item ${selectedModels.includes('gemini') ? 'model-selector-dropdown__item--selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    className="model-checkbox-input"
                                                    value="gemini"
                                                    checked={selectedModels.includes('gemini')}
                                                    onChange={(e) => handleModelCheckboxChange('gemini', e.target.checked)}
                                                />
                                                <div className="model-selector-dropdown__icon model-checkbox__icon--gemini">🤖</div>
                                                <div className="model-selector-dropdown__info">
                                                    <div className="model-selector-dropdown__name">gemini-1.5-flash</div>
                                                    <div className="model-selector-dropdown__desc">Google의 자체적 AI 모델</div>
                                                </div>
                                                <span className="model-selector-dropdown__check">
                                                    {selectedModels.includes('gemini') ? '✓' : ''}
                                                </span>
                                            </label>
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
