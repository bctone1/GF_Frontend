import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';


export default function UserPractice() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="practice-container">

                            <aside className="chat-sidebar" id="chatSidebar">
                                <div className="chat-sidebar__header">
                                    <h2 className="chat-sidebar__title">최근 대화</h2>
                                    <button className="chat-sidebar__new-chat" >
                                        <span>➕</span>
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
                                    <h3 className="chat-sidebar__files-title">첨부된 파일 (0개)</h3>
                                    <div style={{ textAlign: 'center', padding: 'var(--space-3)', color: 'var(--text-tertiary)', fontSize: '11px' }}>
                                        📁<br />첨부된 파일이 없습니다
                                    </div>
                                </div>
                            </aside>


                            <section className="chat-main" id="chatMain" style={{ position: 'relative' }}>

                                <button className="sidebar-toggle-btn" id="sidebarToggleBtn" >
                                    <span className="sidebar-toggle-btn__icon">◀</span>
                                </button>


                                <div className="chat-main__header" id="singleHeader">
                                    <div className="chat-main__title">
                                        <span>파일 첨부 확인</span>
                                        <span className="chat-main__badge">코딩 에이전트</span>
                                    </div>
                                    <div className="chat-main__actions">
                                        <button className="btn-icon" title="설정">⚙️</button>
                                    </div>
                                </div>


                                <div className="chat-messages" id="chatMessages">

                                    <div className="empty-state">
                                        <div className="empty-state__icon">💬</div>
                                        <h3 className="empty-state__title">새로운 대화를 시작하세요</h3>

                                    </div>
                                </div>


                                <div className="chat-main--compare" id="compareContainer" style={{ display: 'none' }}>

                                </div>

                                <div className="chat-input-wrapper">
                                    <div className="chat-input" id="chatInput">
                                        <div className="chat-input__textarea-wrapper">
                                            <button className="chat-input__plus-btn" id="plusBtn" >
                                                <span>➕</span>
                                            </button>
                                            <textarea className="chat-input__textarea" id="messageInput"
                                                placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)" rows="2"
                                                oninput="autoResize(this)"></textarea>
                                        </div>


                                        <div className="plus-menu" id="plusMenu" style={{ display: 'none' }}>

                                            <div id="mainMenu">
                                                <button className="plus-menu__item" >
                                                    <span className="plus-menu__icon">📁</span>
                                                    <div className="plus-menu__text">
                                                        <div className="plus-menu__title">프로젝트 선택</div>
                                                        <div className="plus-menu__desc">작업할 프로젝트 변경</div>
                                                    </div>
                                                    <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                </button>

                                                <div className="plus-menu__divider"></div>

                                                <button className="plus-menu__item" >
                                                    <span className="plus-menu__icon">👨‍💻</span>
                                                    <div className="plus-menu__text">
                                                        <div className="plus-menu__title">AI 에이전트</div>
                                                        <div className="plus-menu__desc">AI 에이전트 선택 및 관리</div>
                                                    </div>
                                                    <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                </button>
                                                <button className="plus-menu__item" >
                                                    <span className="plus-menu__icon">📚</span>
                                                    <div className="plus-menu__text">
                                                        <div className="plus-menu__title">지식베이스</div>
                                                        <div className="plus-menu__desc">지식베이스에서 선택</div>
                                                    </div>
                                                    <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                </button>
                                                <button className="plus-menu__item" >
                                                    <span className="plus-menu__icon">📎</span>
                                                    <div className="plus-menu__text">
                                                        <div className="plus-menu__title">파일 첨부</div>
                                                        <div className="plus-menu__desc">현재 대화에 파일 첨부</div>
                                                    </div>
                                                </button>
                                                <button className="plus-menu__item" >
                                                    <span className="plus-menu__icon">🔗</span>
                                                    <div className="plus-menu__text">
                                                        <div className="plus-menu__title">외부 연동</div>
                                                        <div className="plus-menu__desc">외부 서비스 연결</div>
                                                    </div>
                                                    <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                </button>
                                            </div>


                                            <div id="projectMenu" style={{ display: 'none' }}>
                                                <div className="plus-menu__header">
                                                    <button className="plus-menu__back" >
                                                        <span>‹</span>
                                                    </button>
                                                    <span className="plus-menu__header-title">프로젝트 선택</span>
                                                </div>
                                                <div id="plusMenuProjects">

                                                </div>
                                            </div>


                                            <div id="agentMenu" style={{ display: 'none' }}>
                                                <div className="plus-menu__header">
                                                    <button className="plus-menu__back" >
                                                        <span>‹</span>
                                                    </button>
                                                    <span className="plus-menu__header-title">AI 에이전트</span>
                                                </div>
                                                <div className="plus-menu__empty">
                                                    Phase 2에서 구현 예정입니다
                                                </div>
                                            </div>


                                            <div id="knowledgeMenu" style={{ display: 'none' }}>
                                                <div className="plus-menu__header">
                                                    <button className="plus-menu__back" >
                                                        <span>‹</span>
                                                    </button>
                                                    <span className="plus-menu__header-title">지식베이스</span>
                                                </div>
                                                <div className="plus-menu__empty">
                                                    Phase 2에서 구현 예정입니다
                                                </div>
                                            </div>


                                            <div id="integrationMenu" style={{ display: 'none' }}>
                                                <div className="plus-menu__header">
                                                    <button className="plus-menu__back" >
                                                        <span>‹</span>
                                                    </button>
                                                    <span className="plus-menu__header-title">외부 연동</span>
                                                </div>
                                                <div className="plus-menu__empty">
                                                    Phase 2에서 구현 예정입니다
                                                </div>
                                            </div>
                                        </div>

                                        <div className="chat-input__footer">
                                            <div className="chat-input__info">
                                                <div className="chat-input__cost">
                                                    <span>예상:</span>
                                                    <span className="chat-input__cost-value">$0.02</span>
                                                </div>
                                                <span>~200 tokens</span>
                                            </div>
                                            <button className="chat-input__send" id="sendBtn">
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


                            <aside className="model-panel" id="modelPanel">
                                <div className="model-panel__header">
                                    <h2 className="model-panel__title">LLM 모델</h2>


                                    <div className="mode-switcher">
                                        <div className="mode-tabs">
                                            <button className="mode-tab mode-tab--active" data-mode="single">
                                                단일
                                            </button>
                                            <button className="mode-tab" data-mode="parallel" >
                                                비교
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="model-panel__body">

                                    <div className="selected-model-display" id="selectedModelDisplay">
                                        <div className="selected-model-display__label">현재 선택</div>
                                        <button className="selected-model-display__button" >
                                            <span className="selected-model-display__icon">🤖</span>
                                            <span className="selected-model-display__text">gemini-1.5-flash</span>
                                            <span className="selected-model-display__arrow">▼</span>
                                        </button>
                                    </div>


                                    <div className="model-selector-dropdown" id="modelDropdown" style={{ display: 'none' }}>
                                        <label className="model-selector-dropdown__item">
                                            <input type="checkbox" className="model-checkbox-input" value="exaone" onchange="updateModelSelection()" />
                                            <div className="model-selector-dropdown__icon"
                                                style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>🤖</div>
                                            <div className="model-selector-dropdown__info">
                                                <div className="model-selector-dropdown__name">exaone-3.5</div>
                                                <div className="model-selector-dropdown__desc">LG AI Research의 최신 멀티모달 모델</div>
                                            </div>
                                            <span className="model-selector-dropdown__check"></span>
                                        </label>

                                        <label className="model-selector-dropdown__item">
                                            <input type="checkbox" className="model-checkbox-input" value="claude" onchange="updateModelSelection()" />
                                            <div className="model-selector-dropdown__icon model-checkbox__icon--claude">🤖</div>
                                            <div className="model-selector-dropdown__info">
                                                <div className="model-selector-dropdown__name">claude-3-sonnet</div>
                                                <div className="model-selector-dropdown__desc">Anthropic의 고능력 대화 모델</div>
                                            </div>
                                            <span className="model-selector-dropdown__check"></span>
                                        </label>

                                        <label className="model-selector-dropdown__item">
                                            <input type="checkbox" className="model-checkbox-input" value="gpt-4" onchange="updateModelSelection()" />
                                            <div className="model-selector-dropdown__icon model-checkbox__icon--gpt">🤖</div>
                                            <div className="model-selector-dropdown__info">
                                                <div className="model-selector-dropdown__name">gpt-4o</div>
                                                <div className="model-selector-dropdown__desc">OpenAI 최신 플래그쉽 모델</div>
                                            </div>
                                            <span className="model-selector-dropdown__check"></span>
                                        </label>

                                        <label className="model-selector-dropdown__item model-selector-dropdown__item--selected">
                                            <input type="checkbox" className="model-checkbox-input" value="gemini" checked onchange="updateModelSelection()" />
                                            <div className="model-selector-dropdown__icon model-checkbox__icon--gemini">🤖</div>
                                            <div className="model-selector-dropdown__info">
                                                <div className="model-selector-dropdown__name">gemini-1.5-flash</div>
                                                <div className="model-selector-dropdown__desc">Google의 자체적 AI 모델</div>
                                            </div>
                                            <span className="model-selector-dropdown__check">✓</span>
                                        </label>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </main>
                </div>
            </div >
        </>
    )
}