import UserSidebar2026 from './UserSidebar2026';


export default function UserHistory() {
    return (
        <>
            <div className="app">
                <UserSidebar2026 />
                <main className="main">
                    <header className="page-header">
                        <div className="page-header__left">
                            <h1 className="page-header__title">내 학습 기록</h1>
                        </div>
                    </header>

                    <div className="history-content">
                        {/* Course Info Banner  */}
                        <div className="course-banner">
                            <div className="course-banner__left">
                                <div className="course-banner__title" id="courseBannerTitle">AI 기초 실습</div>
                                <div className="course-banner__period" id="courseBannerPeriod">2025.11.01 ~ 2025.12.01 (31일간)</div>
                            </div>
                            <div className="course-banner__right">
                                <div className="course-banner__stat">
                                    <div className="course-banner__stat-value" id="courseTotalChats">247</div>
                                    <div className="course-banner__stat-label">총 대화</div>
                                </div>
                                <div className="course-banner__stat">
                                    <div className="course-banner__stat-value" id="courseLearningTime">42.5h</div>
                                    <div className="course-banner__stat-label">학습 시간</div>
                                </div>
                                <div className="course-banner__stat">
                                    <div className="course-banner__stat-value" id="courseLearningDays">14</div>
                                    <div className="course-banner__stat-label">학습일</div>
                                </div>
                                <div className="course-banner__badge" id="courseBannerBadge">D-15 진행중</div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="history-tabs">
                            <button className="history-tab history-tab--active" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                학습 성과
                            </button>
                            <button className="history-tab" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                대화 기록
                            </button>
                        </div>

                        {/* Tab 1: 학습 성과 */}
                        <div id="tab-learning" className="tab-content tab-content--active">
                            <div className="learning-sections">

                                {/* AI 실습 학습 섹션 */}
                                <div className="learning-section">
                                    <div className="learning-section__header">
                                        <div className="learning-section__title">
                                            <div className="learning-section__icon learning-section__icon--practice">
                                                <svg className="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            </div>
                                            <div>
                                                <div className="learning-section__name">AI 실습 학습</div>
                                                <div className="learning-section__total">총 247회 대화 진행</div>
                                            </div>
                                        </div>
                                        <span className="learning-section__badge learning-section__badge--completed">활발히 학습중</span>
                                    </div>
                                    <div className="learning-section__body">
                                        <div className="stats-grid stats-grid--2col">
                                            {/* 모델별 사용량 */}
                                            <div className="stat-card">
                                                <div className="stat-card__header">
                                                    <span className="stat-card__title">모델별 사용량</span>
                                                </div>
                                                <div className="model-stats">
                                                    <div className="model-stat">
                                                        <span className="model-stat__dot model-stat__dot--gpt"></span>
                                                        <span className="model-stat__name">gpt-4o-mini</span>
                                                        <div className="model-stat__bar"><div className="model-stat__fill model-stat__fill--gpt" style={{ width: '45%' }}></div></div>
                                                        <span className="model-stat__count">112회</span>
                                                    </div>
                                                    <div className="model-stat">
                                                        <span className="model-stat__dot model-stat__dot--claude"></span>
                                                        <span className="model-stat__name">claude-3-haiku</span>
                                                        <div className="model-stat__bar"><div className="model-stat__fill model-stat__fill--claude" style={{ width: '30%' }}></div></div>
                                                        <span className="model-stat__count">74회</span>
                                                    </div>
                                                    <div className="model-stat">
                                                        <span className="model-stat__dot model-stat__dot--gemini"></span>
                                                        <span className="model-stat__name">gemini-2.5-flash</span>
                                                        <div className="model-stat__bar"><div className="model-stat__fill model-stat__fill--gemini" style={{ width: '18%' }}></div></div>
                                                        <span className="model-stat__count">45회</span>
                                                    </div>
                                                    <div className="model-stat">
                                                        <span className="model-stat__dot model-stat__dot--gpt"></span>
                                                        <span className="model-stat__name">gpt-3.5-turbo</span>
                                                        <div className="model-stat__bar"><div className="model-stat__fill model-stat__fill--gpt" style={{ width: '6%' }}></div></div>
                                                        <span className="model-stat__count">16회</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 대화 모드 */}
                                            <div className="stat-card">
                                                <div className="stat-card__header">
                                                    <span className="stat-card__title">대화 모드</span>
                                                </div>
                                                <div className="mode-stats">
                                                    <div className="mode-stat">
                                                        <div className="mode-stat__value">180</div>
                                                        <div className="mode-stat__label">단일 모드</div>
                                                    </div>
                                                    <div className="mode-stat">
                                                        <div className="mode-stat__value">67</div>
                                                        <div className="mode-stat__label">비교 모드</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 상세 설정 활용 */}
                                        <div style={{ marginTop: '20px' }}>
                                            <div className="stat-card__title" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>상세 설정 활용</div>
                                            <div className="feature-list">
                                                <div className="feature-item">
                                                    <div className="feature-item__left">
                                                        <div className="feature-item__icon">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line></svg>
                                                        </div>
                                                        <span className="feature-item__name">파라미터 조절</span>
                                                    </div>
                                                    <span className="feature-item__value">34회</span>
                                                </div>
                                                <div className="feature-item">
                                                    <div className="feature-item__left">
                                                        <div className="feature-item__icon">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                                        </div>
                                                        <span className="feature-item__name">Few-shot 학습</span>
                                                    </div>
                                                    <span className="feature-item__value">18회</span>
                                                </div>
                                                <div className="feature-item">
                                                    <div className="feature-item__left">
                                                        <div className="feature-item__icon">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                                        </div>
                                                        <span className="feature-item__name">파일 첨부</span>
                                                    </div>
                                                    <span className="feature-item__value">42회</span>
                                                </div>
                                                <div className="feature-item">
                                                    <div className="feature-item__left">
                                                        <div className="feature-item__icon">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                                        </div>
                                                        <span className="feature-item__name">지식베이스 연결</span>
                                                    </div>
                                                    <span className="feature-item__value">28회</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 지식베이스 학습 섹션 */}
                                <div className="learning-section">
                                    <div className="learning-section__header">
                                        <div className="learning-section__title">
                                            <div className="learning-section__icon learning-section__icon--kb">
                                                <svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                            </div>
                                            <div>
                                                <div className="learning-section__name">지식베이스 학습</div>
                                                <div className="learning-section__total">RAG 파이프라인 실습</div>
                                            </div>
                                        </div>
                                        <span className="learning-section__badge learning-section__badge--progress">2/3 모드 학습</span>
                                    </div>
                                    <div className="learning-section__body">
                                        <div className="stats-grid" style={{ marginBottom: '20px' }}>
                                            <div className="stat-card" style={{ background: 'var(--info-light)', borderColor: 'transparent' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--info)' }}>
                                                        <svg className="icon icon--lg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--info)' }}>12개</div>
                                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>문서 업로드</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stat-card">
                                                <div style={{ display: 'flex', alignItems: "center", gap: '12px' }}>
                                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)' }}>
                                                        <svg className="icon icon--lg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-600)' }}>1,248</div>
                                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>생성된 청크</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="stat-card__title" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>RAG 학습 모드별 실습</div>
                                        <div className="rag-cards">
                                            <div className="rag-card">
                                                <div className="rag-card__icon rag-card__icon--simple">
                                                    <svg className="icon icon--lg" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                </div>
                                                <div className="rag-card__title">간단 RAG</div>
                                                <div className="rag-card__desc">파일 업로드 &amp; 바로 질문</div>
                                                <div className="rag-card__value">8회</div>
                                                <div className="rag-card__label">실습 완료</div>
                                            </div>
                                            <div className="rag-card">
                                                <div className="rag-card__icon rag-card__icon--advanced">
                                                    <svg className="icon icon--lg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                                </div>
                                                <div className="rag-card__title">고급 RAG</div>
                                                <div className="rag-card__desc">청킹 &amp; 검색 설정 커스텀</div>
                                                <div className="rag-card__value">5회</div>
                                                <div className="rag-card__label">실습 완료</div>
                                            </div>
                                            <div className="rag-card rag-card--inactive">
                                                <div className="rag-card__icon rag-card__icon--compare">
                                                    <svg className="icon icon--lg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                                </div>
                                                <div className="rag-card__title">비교 분석</div>
                                                <div className="rag-card__desc">설정별 결과 비교</div>
                                                <div className="rag-card__value">0회</div>
                                                <div className="rag-card__label">아직 미실습</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 에이전트 학습 섹션 */}
                                <div className="learning-section">
                                    <div className="learning-section__header">
                                        <div className="learning-section__title">
                                            <div className="learning-section__icon learning-section__icon--agent">
                                                <svg className="icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="3"></circle><path d="M12 8v3"></path></svg>
                                            </div>
                                            <div>
                                                <div className="learning-section__name">에이전트 학습</div>
                                                <div className="learning-section__total">나만의 AI 에이전트 만들기</div>
                                            </div>
                                        </div>
                                        <span className="learning-section__badge learning-section__badge--completed">3개 생성</span>
                                    </div>
                                    <div className="learning-section__body">
                                        <div className="agent-summary">
                                            <div className="agent-stat-box">
                                                <div className="agent-stat-box__value">3</div>
                                                <div className="agent-stat-box__label">직접 생성</div>
                                            </div>
                                            <div className="agent-stat-box">
                                                <div className="agent-stat-box__value">2</div>
                                                <div className="agent-stat-box__label">템플릿 활용</div>
                                            </div>
                                            <div className="agent-stat-box">
                                                <div className="agent-stat-box__value">45</div>
                                                <div className="agent-stat-box__label">에이전트 대화</div>
                                            </div>
                                        </div>

                                        <div
                                            className="stat-card__title"
                                            style={{
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: 'var(--text-secondary)',
                                                marginBottom: '12px',
                                            }}
                                        >
                                            생성한 에이전트
                                        </div>

                                        <div className="agent-list">
                                            <div className="agent-item agent-item--blue">
                                                <div className="agent-item__info">
                                                    <div className="agent-item__name">코드 리뷰어</div>
                                                    <div className="agent-item__meta">Python 코드 검토 전문</div>
                                                </div>
                                                <span className="agent-item__badge agent-item__badge--created">직접 생성</span>
                                                <span className="agent-item__count">18회 대화</span>
                                            </div>
                                            <div className="agent-item agent-item--orange">
                                                <div className="agent-item__info">
                                                    <div className="agent-item__name">마케팅 카피라이터</div>
                                                    <div className="agent-item__meta">광고 문구 생성</div>
                                                </div>
                                                <span className="agent-item__badge agent-item__badge--created">직접 생성</span>
                                                <span className="agent-item__count">15회 대화</span>
                                            </div>
                                            <div className="agent-item agent-item--teal">
                                                <div className="agent-item__info">
                                                    <div className="agent-item__name">데이터 분석가</div>
                                                    <div className="agent-item__meta">템플릿에서 커스텀</div>
                                                </div>
                                                <span className="agent-item__badge agent-item__badge--template">템플릿</span>
                                                <span className="agent-item__count">12회 대화</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Tab 2: 대화 기록 */}
                        <div id="tab-conversations" className="tab-content">
                            <div className="toolbar">
                                <div className="search-box">
                                    <svg className="icon icon--sm search-box__icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    <input type="text" className="search-box__input" placeholder="대화 검색..." />
                                </div>
                                <div className="sort-selector">
                                    <button className="sort-selector__button" id="sortButton" >
                                        <span id="sortLabel">최근 순</span>
                                        <svg className="icon icon--sm sort-selector__arrow" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </button>
                                    <div className="sort-dropdown" id="sortDropdown">
                                        <div className="sort-dropdown__item sort-dropdown__item--active" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            최근 순
                                        </div>
                                        <div className="sort-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            오래된 순
                                        </div>
                                        <div className="sort-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            이름순
                                        </div>
                                        <div className="sort-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            턴 수순
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="conversation-list">
                                <div className="conversation-item" >
                                    <div className="conversation-item__model conversation-item__model--gpt">GPT</div>
                                    <div className="conversation-item__content">
                                        <div className="conversation-item__title">Python 함수 작성법과 베스트 프랙티스</div>
                                        <div className="conversation-item__preview">함수를 작성할 때 고려해야 할 베스트 프랙티스에 대해...</div>
                                    </div>
                                    <div className="conversation-item__tags">
                                        <span className="conversation-item__tag conversation-item__tag--kb">지식베이스</span>
                                    </div>
                                    <div className="conversation-item__meta">
                                        <span className="conversation-item__time">2시간 전</span>
                                        <span className="conversation-item__turns">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            12턴
                                        </span>
                                    </div>
                                </div>

                                <div className="conversation-item" >
                                    <div className="conversation-item__model conversation-item__model--claude">CL</div>
                                    <div className="conversation-item__content">
                                        <div className="conversation-item__title">마케팅 이메일 캠페인 작성</div>
                                        <div className="conversation-item__preview">신규 고객 유치를 위한 이메일 캠페인 시리즈를...</div>
                                    </div>
                                    <div className="conversation-item__tags">
                                        <span className="conversation-item__tag conversation-item__tag--agent">에이전트</span>
                                    </div>
                                    <div className="conversation-item__meta">
                                        <span className="conversation-item__time">어제</span>
                                        <span className="conversation-item__turns">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            8턴
                                        </span>
                                    </div>
                                </div>

                                <div className="conversation-item" >
                                    <div className="conversation-item__model conversation-item__model--compare">VS</div>
                                    <div className="conversation-item__content">
                                        <div className="conversation-item__title">GPT vs Claude: 데이터 분석 비교</div>
                                        <div className="conversation-item__preview">두 모델의 데이터 분석 능력을 비교해보았습니다...</div>
                                    </div>
                                    <div className="conversation-item__tags">
                                    </div>
                                    <div className="conversation-item__meta">
                                        <span className="conversation-item__time">2일 전</span>
                                        <span className="conversation-item__turns">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            15턴
                                        </span>
                                    </div>
                                </div>

                                <div className="conversation-item" >
                                    <div className="conversation-item__model conversation-item__model--gemini">Ge</div>
                                    <div className="conversation-item__content">
                                        <div className="conversation-item__title">UI 디자인 원칙과 색상 조합</div>
                                        <div className="conversation-item__preview">사용자 친화적인 UI를 만들기 위한 디자인 원칙...</div>
                                    </div>
                                    <div className="conversation-item__tags"></div>
                                    <div className="conversation-item__meta">
                                        <span className="conversation-item__time">3일 전</span>
                                        <span className="conversation-item__turns">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            6턴
                                        </span>
                                    </div>
                                </div>

                                <div className="conversation-item" >
                                    <div className="conversation-item__model conversation-item__model--gpt">GPT</div>
                                    <div className="conversation-item__content">
                                        <div className="conversation-item__title">비즈니스 보고서 작성</div>
                                        <div className="conversation-item__preview">분기별 실적 보고서를 전문적으로...</div>
                                    </div>
                                    <div className="conversation-item__tags">
                                        <span className="conversation-item__tag conversation-item__tag--kb">지식베이스</span>
                                    </div>
                                    <div className="conversation-item__meta">
                                        <span className="conversation-item__time">5일 전</span>
                                        <span className="conversation-item__turns">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            10턴
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pagination">
                                <button className="pagination__btn" disabled="">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    이전
                                </button>
                                <span className="pagination__info">1 - 20 / 247개</span>
                                <button className="pagination__btn">
                                    다음
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}