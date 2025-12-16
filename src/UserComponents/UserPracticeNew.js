export default function UserPracticeNew() {


    
    return (
        <>
            <div className="app">
                <aside className="sidebar">
                    <div className="sidebar__header">
                        <div className="sidebar__logo">
                            <div className="sidebar__logo-icon">
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="sidebar__logo-text">GrowFit</span>
                            <span className="sidebar__logo-badge">AI</span>
                        </div>

                        <div className="class-selector">
                            <button className="class-selector__button" id="classButton" onclick="toggleClassDropdown()">
                                <div className="class-selector__icon">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                </div>
                                <div className="class-selector__info">
                                    <div className="class-selector__name" id="selectedClassName">AI 기초 실습</div>
                                    <div className="class-selector__meta">
                                        <span className="class-selector__status class-selector__status--active">
                                            <span className="class-selector__status-dot"></span>진행 중
                                        </span>
                                        <span className="class-selector__dday" id="selectedClassDday">D-15</span>
                                    </div>
                                </div>
                                <svg className="icon icon--sm class-selector__arrow" viewBox="0 0 24 24">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>

                            <div className="class-dropdown" id="classDropdown">
                                <div className="class-dropdown__section">
                                    <div className="class-dropdown__section-title">진행 중인 클래스</div>
                                    <div className="class-dropdown__item class-dropdown__item--active" data-class-id="class-1"
                                        onclick="selectClass('class-1', 'AI 기초 실습', 'active', 15)">
                                        <div className="class-dropdown__item-icon class-dropdown__item-icon--active"><svg
                                            className="icon" viewBox="0 0 24 24">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg></div>
                                        <div className="class-dropdown__item-info">
                                            <div className="class-dropdown__item-name">AI 기초 실습</div>
                                            <div className="class-dropdown__item-period">2025.11.01 ~ 2025.12.01</div>
                                        </div>
                                        <span className="class-dropdown__item-badge class-dropdown__item-badge--active">D-15</span>
                                    </div>
                                    <div className="class-dropdown__item" data-class-id="class-2"
                                        onclick="selectClass('class-2', '프롬프트 엔지니어링', 'active', 30)">
                                        <div className="class-dropdown__item-icon class-dropdown__item-icon--active"><svg
                                            className="icon" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg></div>
                                        <div className="class-dropdown__item-info">
                                            <div className="class-dropdown__item-name">프롬프트 엔지니어링</div>
                                            <div className="class-dropdown__item-period">2025.11.15 ~ 2025.12.15</div>
                                        </div>
                                        <span className="class-dropdown__item-badge class-dropdown__item-badge--active">D-30</span>
                                    </div>
                                </div>
                                <div className="class-dropdown__divider"></div>
                                <div className="class-dropdown__section">
                                    <div className="class-dropdown__section-title">종료된 클래스</div>
                                    <div className="class-dropdown__item class-dropdown__item--disabled"
                                        onclick="selectClass('class-ended', '2024 AI 기초과정', 'ended', 0)">
                                        <div className="class-dropdown__item-icon class-dropdown__item-icon--ended"><svg
                                            className="icon" viewBox="0 0 24 24">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg></div>
                                        <div className="class-dropdown__item-info">
                                            <div className="class-dropdown__item-name">2024 AI 기초과정</div>
                                            <div className="class-dropdown__item-period">2024.09.01 ~ 2024.10.31</div>
                                        </div>
                                        <span className="class-dropdown__item-badge class-dropdown__item-badge--ended">종료</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="sidebar__new-chat" onclick="createNewChat()">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M12 5v14" />
                                <path d="M5 12h14" />
                            </svg>
                            <span>새 대화</span>
                        </button>
                    </div>

                    <nav className="sidebar__nav">
                        <a className="sidebar__nav-item" data-page="dashboard" onclick="navigateTo('dashboard')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg></span>
                            <span>대시보드</span>
                        </a>
                        <a className="sidebar__nav-item sidebar__nav-item--active" data-page="chat" onclick="navigateTo('chat')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg></span>
                            <span>AI 실습</span>
                        </a>
                        <a className="sidebar__nav-item" data-page="projects" onclick="navigateTo('projects')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            </svg></span>
                            <span>내 프로젝트</span>
                        </a>
                        <a className="sidebar__nav-item" data-page="knowledge" onclick="navigateTo('knowledge')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg></span>
                            <span>지식베이스</span>
                        </a>
                        <a className="sidebar__nav-item" data-page="agents" onclick="navigateTo('agents')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="10" rx="2" />
                                <circle cx="12" cy="5" r="3" />
                                <path d="M12 8v3" />
                                <circle cx="8" cy="16" r="1" />
                                <circle cx="16" cy="16" r="1" />
                            </svg></span>
                            <span>내 에이전트</span>
                        </a>
                        <a className="sidebar__nav-item" data-page="workflow" onclick="navigateTo('workflow')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <polyline points="16 3 21 3 21 8" />
                                <line x1="4" y1="20" x2="21" y2="3" />
                                <polyline points="21 16 21 21 16 21" />
                                <line x1="15" y1="15" x2="21" y2="21" />
                                <line x1="4" y1="4" x2="9" y2="9" />
                            </svg></span>
                            <span>워크플로우</span>
                        </a>
                        <a className="sidebar__nav-item" data-page="history" onclick="navigateTo('history')">
                            <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <line x1="10" y1="9" x2="8" y2="9" />
                            </svg></span>
                            <span>내 기록</span>
                        </a>
                    </nav>

                    <div className="sidebar__section-header">
                        <span className="sidebar__section-title">최근 대화</span>
                        <div className="sidebar__section-actions">
                            <button className="sidebar__section-btn" title="대화 검색" onclick="openSearchModal()">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                            <button className="sidebar__section-btn" title="새 프로젝트" onclick="handleCreateProject()">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                    <line x1="12" y1="11" x2="12" y2="17" />
                                    <line x1="9" y1="14" x2="15" y2="14" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="sidebar__history" id="chatHistory"></div>

                    <div className="sidebar__footer">
                        <div className="sidebar__footer-item" onclick="openSettingsModal()">
                            <svg className="icon" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="3" />
                                <path
                                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            <span>설정</span>
                        </div>
                        <div className="sidebar__user" onclick="openProfileModal()">
                            <div className="sidebar__user-avatar">홍</div>
                            <span className="sidebar__user-name">홍길동</span>
                            <svg className="icon icon--sm sidebar__user-logout" viewBox="0 0 24 24" onclick="handleLogout(event)">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </div>
                    </div>
                </aside>


                <main className="main">
                    <header className="chat-header">
                        <div className="chat-header__left">
                            <span className="chat-header__title" id="chatTitle" contenteditable="false" onclick="editTitle()">새로운
                                대화</span>
                            <svg className="icon icon--sm chat-header__edit" viewBox="0 0 24 24" onclick="editTitle()">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </div>
                        <div className="chat-header__right">

                            <div className="mode-indicator mode-indicator--single" id="modeIndicator">
                                <span className="mode-indicator__dot"></span>
                                <span className="mode-indicator__text" id="modeText">단일 모드</span>
                            </div>
                            <div className="chat-header__participants" id="activeModelsDisplay" onclick="openParticipantsModal()">
                                <div className="participant-avatar participant-avatar--gemini" title="Gemini">G</div>
                            </div>
                            <button className="chat-header__btn" title="참여자 초대" onclick="openInviteModal()">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                            </button>
                            <button className="chat-header__btn" id="moreBtn" title="더보기" onclick="toggleMoreMenu()">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                </svg>
                            </button>
                            <div className="dropdown" id="moreMenu" style={{ right: '0', top: 'auto' }}>
                                <div className="dropdown__item" onclick="shareChat()"><svg className="icon icon--sm"
                                    viewBox="0 0 24 24">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                    <polyline points="16 6 12 2 8 6" />
                                    <line x1="12" y1="2" x2="12" y2="15" />
                                </svg>공유하기</div>
                                <div className="dropdown__item" onclick="exportChat()"><svg className="icon icon--sm"
                                    viewBox="0 0 24 24">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>내보내기</div>
                                <div className="dropdown__divider"></div>
                                <div className="dropdown__item dropdown__item--danger" onclick="clearChat()"><svg
                                    className="icon icon--sm" viewBox="0 0 24 24">
                                    <path d="M3 6h18" />
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>대화 삭제</div>
                            </div>
                        </div>
                    </header>

                    <div className="chat-content">
                        <div className="chat-area" id="chatAreaSingle">
                            <div className="messages" id="messagesContainer"></div>
                        </div>
                        <div className="chat-area chat-area--compare" id="chatAreaCompare"></div>

                        <div className="input-area">
                            <div className="input-container">
                                <div className="input-preview" id="inputPreview">
                                    <svg className="icon icon--sm input-preview__icon" viewBox="0 0 24 24">
                                        <path
                                            d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                    <span className="input-preview__text" id="previewText"></span>
                                    <button className="input-preview__close" onclick="closePreview()">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="input-box">
                                    <textarea className="input-box__textarea" id="chatInput" placeholder="메시지를 입력하세요..." rows="1"
                                        onkeydown="handleKeyDown(event)" oninput="autoResize(this)"></textarea>
                                    <div className="input-box__footer">
                                        <div className="input-box__left">
                                            <button className="input-btn" id="plusBtn" onclick="togglePlusMenu()">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <line x1="12" y1="5" x2="12" y2="19" />
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                </svg>
                                            </button>
                                            <div style={{ position: 'relative' }}>
                                                <button className="input-btn" id="inputSettingsBtn" onclick="toggleInputSettings()"
                                                    title="빠른 설정">
                                                    <svg className="icon" viewBox="0 0 24 24">
                                                        <line x1="4" y1="21" x2="4" y2="14" />
                                                        <line x1="4" y1="10" x2="4" y2="3" />
                                                        <line x1="12" y1="21" x2="12" y2="12" />
                                                        <line x1="12" y1="8" x2="12" y2="3" />
                                                        <line x1="20" y1="21" x2="20" y2="16" />
                                                        <line x1="20" y1="12" x2="20" y2="3" />
                                                        <line x1="1" y1="14" x2="7" y2="14" />
                                                        <line x1="9" y1="8" x2="15" y2="8" />
                                                        <line x1="17" y1="16" x2="23" y2="16" />
                                                    </svg>
                                                    <span className="input-btn__badge" id="settingsBadge">3</span>
                                                </button>
                                                <div className="dropdown settings-dropdown" id="inputSettingsDropdown">
                                                    <div className="settings-dropdown__item">
                                                        <span className="settings-dropdown__label">스트리밍 응답</span>
                                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active"
                                                            onclick="toggleSetting(this, 'streaming')"></div>
                                                    </div>
                                                    <div className="settings-dropdown__item">
                                                        <span className="settings-dropdown__label">자동 저장</span>
                                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active"
                                                            onclick="toggleSetting(this, 'autosave')"></div>
                                                    </div>
                                                    <div className="settings-dropdown__item">
                                                        <span className="settings-dropdown__label">맞춤법 검사</span>
                                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active"
                                                            onclick="toggleSetting(this, 'spellcheck')"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-box__right">

                                            <div className="model-listbox" id="modelListbox">
                                                <button className="model-listbox__trigger" id="modelListboxTrigger"
                                                    onclick="toggleModelListbox()">
                                                    <span className="model-listbox__label">LLM 모델</span>
                                                    <span className="model-listbox__selected" id="modelSelectedText">Gemini</span>
                                                    <span className="model-listbox__count" id="modelSelectedCount">1개 선택</span>
                                                    <svg className="icon icon--sm model-listbox__arrow" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </button>
                                                <div className="model-listbox__dropdown" id="modelListboxDropdown">
                                                    <div className="model-listbox__header">
                                                        <span>모델 선택</span>
                                                        <span className="model-listbox__hint">최대 3개 선택 가능</span>
                                                    </div>
                                                    <div className="model-listbox__options">
                                                        <label className="model-listbox__option model-listbox__option--selected"
                                                            data-model="gemini">
                                                            <input type="checkbox" checked
                                                                onchange="handleModelCheckbox(this, 'gemini')" />
                                                            <span className="model-listbox__checkbox"></span>
                                                            <span className="model-listbox__dot model-listbox__dot--gemini"></span>
                                                            <span className="model-listbox__info">
                                                                <span className="model-listbox__name">Gemini 1.5 Flash</span>
                                                                <span className="model-listbox__provider">Google</span>
                                                            </span>
                                                        </label>
                                                        <label className="model-listbox__option" data-model="gpt">
                                                            <input type="checkbox" onchange="handleModelCheckbox(this, 'gpt')" />
                                                            <span className="model-listbox__checkbox"></span>
                                                            <span className="model-listbox__dot model-listbox__dot--gpt"></span>
                                                            <span className="model-listbox__info">
                                                                <span className="model-listbox__name">GPT-4 Turbo</span>
                                                                <span className="model-listbox__provider">OpenAI</span>
                                                            </span>
                                                        </label>
                                                        <label className="model-listbox__option" data-model="claude">
                                                            <input type="checkbox"
                                                                onchange="handleModelCheckbox(this, 'claude')" />
                                                            <span className="model-listbox__checkbox"></span>
                                                            <span className="model-listbox__dot model-listbox__dot--claude"></span>
                                                            <span className="model-listbox__info">
                                                                <span className="model-listbox__name">Claude 3.5 Sonnet</span>
                                                                <span className="model-listbox__provider">Anthropic</span>
                                                            </span>
                                                        </label>
                                                        <label className="model-listbox__option" data-model="exaone">
                                                            <input type="checkbox"
                                                                onchange="handleModelCheckbox(this, 'exaone')" />
                                                            <span className="model-listbox__checkbox"></span>
                                                            <span className="model-listbox__dot model-listbox__dot--exaone"></span>
                                                            <span className="model-listbox__info">
                                                                <span className="model-listbox__name">EXAONE 3.5</span>
                                                                <span className="model-listbox__provider">LG AI Research</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="input-btn" id="micBtn" title="음성 입력" onclick="toggleVoiceInput()">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                    <line x1="12" y1="19" x2="12" y2="23" />
                                                    <line x1="8" y1="23" x2="16" y2="23" />
                                                </svg>
                                            </button>
                                            <button className="input-btn input-btn--primary" id="sendBtn" onclick="sendMessage()"
                                                title="전송">
                                                <svg className="icon" viewBox="0 0 24 24" style={{ color: 'white' }}>
                                                    <line x1="22" y1="2" x2="11" y2="13" />
                                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
}