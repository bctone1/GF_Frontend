import PartnerSidebar from './PartnerSidebar';

export default function PartnerInstructorAnalytics() {
    return (
        <>
            <div className="app">
                <PartnerSidebar />

                <main className="main">
                    <header className="main-header">
                        <div className="main-header__left">
                            <h1 className="main-header__title">사용량 통계</h1>
                            <div className="period-selector">
                                <button className="period-btn" >일간</button>
                                <button className="period-btn period-btn--active" >주간</button>
                                <button className="period-btn" >월간</button>
                                <button className="period-btn" >전체</button>
                            </div>
                        </div>
                        <div className="main-header__right">
                            {/* Course Filter */}
                            <div className="course-filter" id="courseFilter">
                                <button className="course-filter__button" >
                                    <svg className="course-filter__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    <span className="course-filter__text" id="selectedCourseName">전체 강의</span>
                                    <svg className="course-filter__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6,9 12,15 18,9"></polyline>
                                    </svg>
                                </button>
                                <div className="course-filter__dropdown" id="courseDropdown">
                                    <div className="course-filter__option course-filter__option--active" data-course="all" >
                                        <div className="course-filter__option-icon course-filter__option-icon--all">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                        </div>
                                        <div className="course-filter__option-info">
                                            <div className="course-filter__option-name">전체 강의</div>
                                            <div className="course-filter__option-meta">3개 강의 · 75명</div>
                                        </div>
                                        <svg className="course-filter__option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20,6 9,17 4,12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="course-filter__option" data-course="prompt" >
                                        <div className="course-filter__option-icon course-filter__option-icon--course">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                        </div>
                                        <div className="course-filter__option-info">
                                            <div className="course-filter__option-name">프롬프트 엔지니어링</div>
                                            <div className="course-filter__option-meta">30명 · 8,742 대화</div>
                                        </div>
                                        <svg className="course-filter__option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20,6 9,17 4,12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="course-filter__option" data-course="ai2025" >
                                        <div className="course-filter__option-icon course-filter__option-icon--course">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                        </div>
                                        <div className="course-filter__option-info">
                                            <div className="course-filter__option-name">2025 AI 기초과정</div>
                                            <div className="course-filter__option-meta">20명 · 1,245 대화</div>
                                        </div>
                                        <svg className="course-filter__option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20,6 9,17 4,12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="course-filter__option" data-course="ai2024" >
                                        <div className="course-filter__option-icon course-filter__option-icon--ended">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                        </div>
                                        <div className="course-filter__option-info">
                                            <div className="course-filter__option-name">2024 AI 기초과정</div>
                                            <div className="course-filter__option-meta">25명 · 종료됨</div>
                                        </div>
                                        <svg className="course-filter__option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20,6 9,17 4,12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <button className="main-header__btn" title="새로고침">
                                <svg className="icon" viewBox="0 0 24 24"><polyline points="23,4 23,10 17,10"></polyline><polyline points="1,20 1,14 7,14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                            </button>
                            <button className="btn btn--secondary" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7,10 12,15 17,10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                내보내기
                            </button>
                            {/* 알림 버튼 */}
                            <div style={{ position: 'relative' }}>
                                <button className="main-header__btn" title="알림" >
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    <span className="main-header__badge">3</span>
                                </button>
                                <div className="notification-dropdown" id="notificationDropdown">
                                    <div className="notification-dropdown__header">
                                        <span className="notification-dropdown__title">알림</span>
                                        <span className="notification-dropdown__action" >모두 읽음</span>
                                    </div>
                                    <div className="notification-dropdown__list">
                                        <div className="notification-group">오늘</div>
                                        <div className="notification-item notification-item--unread">
                                            <div className="notification-item__text"><strong>김민수</strong>님이 프롬프트 엔지니어링 강의에 등록했습니다.</div>
                                            <div className="notification-item__time">10분 전</div>
                                        </div>
                                        <div className="notification-item notification-item--unread">
                                            <div className="notification-item__text">이번 달 API 사용량이 <strong>$200</strong>을 초과했습니다.</div>
                                            <div className="notification-item__time">2시간 전</div>
                                        </div>
                                        <div className="notification-group">어제</div>
                                        <div className="notification-item notification-item--unread">
                                            <div className="notification-item__text"><strong>이지은</strong>님이 2025 AI 기초과정 강의에 등록했습니다.</div>
                                            <div className="notification-item__time">어제 오후 3:24</div>
                                        </div>
                                        <div className="notification-group">이번 주</div>
                                        <div className="notification-item">
                                            <div className="notification-item__text">주간 사용량 리포트가 준비되었습니다.</div>
                                            <div className="notification-item__time">3일 전</div>
                                        </div>
                                        <div className="notification-item">
                                            <div className="notification-item__text"><strong>박서준</strong>님이 프롬프트 엔지니어링 강의에 등록했습니다.</div>
                                            <div className="notification-item__time">4일 전</div>
                                        </div>
                                    </div>
                                    <div className="notification-dropdown__footer">
                                        <a href="#">모든 알림 보기</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="main-content">
                        {/* Breadcrumb */}
                        <div className="breadcrumb" id="breadcrumb">
                            <span className="breadcrumb__item breadcrumb__item--active">전체 강의</span>
                        </div>

                        {/* Stats Grid */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--primary">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <span className="stat-card__trend stat-card__trend--up">+12%</span>
                                </div>
                                <div className="stat-card__label">총 대화</div>
                                <div className="stat-card__value" id="statConversations">13,232</div>
                                <div className="stat-card__sub" id="statConversationsSub">전체 강의 합계</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--success">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </div>
                                </div>
                                <div className="stat-card__label">학생 수</div>
                                <div className="stat-card__value" id="statStudents">75명</div>
                                <div className="stat-card__sub" id="statStudentsSub">3개 강의</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--warning">
                                        <svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>
                                    </div>
                                </div>
                                <div className="stat-card__label">활성 학생</div>
                                <div className="stat-card__value" id="statActiveStudents">62명</div>
                                <div className="stat-card__sub" id="statActiveStudentsSub">오늘 활동</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--purple">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
                                    </div>
                                </div>
                                <div className="stat-card__label">학생당 평균</div>
                                <div className="stat-card__value" id="statAverage">176</div>
                                <div className="stat-card__sub" id="statAverageSub">대화/학생</div>
                            </div>
                        </div>

                        {/* Cost Section */}
                        <div className="cost-grid">
                            {/* 총 사용 비용 */}
                            <div className="cost-card cost-card--highlight">
                                <div className="cost-card__header">
                                    <h3 className="cost-card__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                        이번 달 사용 비용
                                    </h3>
                                </div>
                                <div className="cost-card__total">
                                    <div className="cost-card__amount">$248.50</div>
                                    <div className="cost-card__amount-sub">2025년 1월 1일 ~ 1월 12일</div>
                                </div>
                                <div className="cost-card__breakdown">
                                    <div className="cost-card__breakdown-item">
                                        <span className="cost-card__breakdown-label">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            API 사용료
                                        </span>
                                        <span className="cost-card__breakdown-value">$218.68</span>
                                    </div>
                                    <div className="cost-card__breakdown-item">
                                        <span className="cost-card__breakdown-label">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                            플랫폼 사용료
                                        </span>
                                        <span className="cost-card__breakdown-value">$29.82</span>
                                    </div>
                                    <div className="cost-card__breakdown-item" style={{ borderTop: '2px solid var(--primary-200)', paddingTop: '12px', marginTop: '4px' }}>
                                        <span className="cost-card__breakdown-label" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                                            총 청구 금액
                                        </span>
                                        <span className="cost-card__breakdown-value" style={{ color: 'var(--primary-600)', fontSize: '15px' }}>$248.50</span>
                                    </div>
                                </div>
                            </div>

                            {/* AI 모델별 비용 */}
                            <div className="cost-card">
                                <div className="cost-card__header">
                                    <h3 className="cost-card__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                                        AI 모델별 비용
                                    </h3>
                                </div>
                                <div className="cost-model-list">
                                    <div className="cost-model-item">
                                        <div className="cost-model-item__dot" style={{ background: 'var(--gpt5-color)' }}></div>
                                        <div className="cost-model-item__info">
                                            <div className="cost-model-item__name">GPT-5-mini</div>
                                            <div className="cost-model-item__meta">1,458회 사용</div>
                                        </div>
                                        <div className="cost-model-item__cost">
                                            <div className="cost-model-item__cost-value">$89.20</div>
                                            <div className="cost-model-item__cost-percent">35.9%</div>
                                        </div>
                                    </div>
                                    <div className="cost-model-item">
                                        <div className="cost-model-item__dot" style={{ background: 'var(--gpt4o-color)' }}></div>
                                        <div className="cost-model-item__info">
                                            <div className="cost-model-item__name">GPT-4o-mini</div>
                                            <div className="cost-model-item__meta">2,381회 사용</div>
                                        </div>
                                        <div className="cost-model-item__cost">
                                            <div className="cost-model-item__cost-value">$62.40</div>
                                            <div className="cost-model-item__cost-percent">25.1%</div>
                                        </div>
                                    </div>
                                    <div className="cost-model-item">
                                        <div className="cost-model-item__dot" style={{ background: 'var(--claude-color)' }}></div>
                                        <div className="cost-model-item__info">
                                            <div className="cost-model-item__name">Claude-3-haiku</div>
                                            <div className="cost-model-item__meta">3,836회 사용</div>
                                        </div>
                                        <div className="cost-model-item__cost">
                                            <div className="cost-model-item__cost-value">$45.80</div>
                                            <div className="cost-model-item__cost-percent">18.4%</div>
                                        </div>
                                    </div>
                                    <div className="cost-model-item">
                                        <div className="cost-model-item__dot" style={{ background: 'var(--gemini-color)' }}></div>
                                        <div className="cost-model-item__info">
                                            <div className="cost-model-item__name">Gemini-2.5-flash</div>
                                            <div className="cost-model-item__meta">2,911회 사용</div>
                                        </div>
                                        <div className="cost-model-item__cost">
                                            <div className="cost-model-item__cost-value">$32.50</div>
                                            <div className="cost-model-item__cost-percent">13.1%</div>
                                        </div>
                                    </div>
                                    <div className="cost-model-item">
                                        <div className="cost-model-item__dot" style={{ background: 'var(--gpt35-color)' }}></div>
                                        <div className="cost-model-item__info">
                                            <div className="cost-model-item__name">GPT-3.5-turbo</div>
                                            <div className="cost-model-item__meta">2,646회 사용</div>
                                        </div>
                                        <div className="cost-model-item__cost">
                                            <div className="cost-model-item__cost-value">$18.60</div>
                                            <div className="cost-model-item__cost-percent">7.5%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 강의별 비용 */}
                            <div className="cost-card">
                                <div className="cost-card__header">
                                    <h3 className="cost-card__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                        강의별 비용
                                    </h3>
                                </div>
                                <div className="cost-course-list">
                                    <div className="cost-course-item">
                                        <div className="cost-course-item__header">
                                            <span className="cost-course-item__name">프롬프트 엔지니어링</span>
                                            <span className="cost-course-item__cost">$128.40</span>
                                        </div>
                                        <div className="cost-course-item__meta">
                                            <span>30명 · 8,742 대화</span>
                                            <span>51.7%</span>
                                        </div>
                                    </div>
                                    <div className="cost-course-item">
                                        <div className="cost-course-item__header">
                                            <span className="cost-course-item__name">2025 AI 기초과정</span>
                                            <span className="cost-course-item__cost">$45.10</span>
                                        </div>
                                        <div className="cost-course-item__meta">
                                            <span>20명 · 1,245 대화</span>
                                            <span>18.1%</span>
                                        </div>
                                    </div>
                                    <div className="cost-course-item">
                                        <div className="cost-course-item__header">
                                            <span className="cost-course-item__name">2024 AI 기초과정</span>
                                            <span className="cost-course-item__cost">$75.00</span>
                                        </div>
                                        <div className="cost-course-item__meta">
                                            <span>25명 · 3,245 대화</span>
                                            <span style={{ color: 'var(--text-tertiary)' }}>종료됨</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="charts-grid">
                            <div className="card">
                                <div className="card__header">
                                    <h2 className="card__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
                                        일별 대화량
                                    </h2>
                                </div>
                                <div className="card__body">
                                    <div className="chart-placeholder" id="dailyChart">
                                        <div className="chart-bar" style={{ height: '45%' }} data-value="1,245"></div>
                                        <div className="chart-bar" style={{ height: '62%' }} data-value="1,721"></div>
                                        <div className="chart-bar" style={{ height: '58%' }} data-value="1,608"></div>
                                        <div className="chart-bar" style={{ height: '78%' }} data-value="2,163"></div>
                                        <div className="chart-bar" style={{ height: '85%' }} data-value="2,357"></div>
                                        <div className="chart-bar" style={{ height: '72%' }} data-value="1,997"></div>
                                        <div className="chart-bar" style={{ height: '92%' }} data-value="2,141"></div>
                                    </div>
                                    <div className="chart-labels">
                                        <span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card__header">
                                    <h2 className="card__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                                        AI 모델별 사용
                                    </h2>
                                </div>
                                <div className="card__body">
                                    <div className="model-list" id="modelList">
                                        <div className="model-item">
                                            <div className="model-item__dot model-item__dot--claude"></div>
                                            <div className="model-item__info">
                                                <div className="model-item__name">claude-3-haiku</div>
                                            </div>
                                            <div className="model-item__count">3,836회</div>
                                        </div>
                                        <div className="model-item__bar"><div className="model-item__bar-fill model-item__bar-fill--claude" style={{ width: '29%' }}></div></div>

                                        <div className="model-item" style={{ marginTop: '8px' }}>
                                            <div className="model-item__dot model-item__dot--gemini"></div>
                                            <div className="model-item__info">
                                                <div className="model-item__name">gemini-2.5-flash</div>
                                            </div>
                                            <div className="model-item__count">2,911회</div>
                                        </div>
                                        <div className="model-item__bar"><div className="model-item__bar-fill model-item__bar-fill--gemini" style={{ width: '22%' }}></div></div>

                                        <div className="model-item" style={{ marginTop: '8px' }}>
                                            <div className="model-item__dot model-item__dot--gpt35"></div>
                                            <div className="model-item__info">
                                                <div className="model-item__name">gpt-3.5-turbo</div>
                                            </div>
                                            <div className="model-item__count">2,646회</div>
                                        </div>
                                        <div className="model-item__bar"><div className="model-item__bar-fill model-item__bar-fill--gpt35" style={{ width: '20%' }}></div></div>

                                        <div className="model-item" style={{ marginTop: '8px' }}>
                                            <div className="model-item__dot model-item__dot--gpt4o"></div>
                                            <div className="model-item__info">
                                                <div className="model-item__name">gpt-4o-mini</div>
                                            </div>
                                            <div className="model-item__count">2,381회</div>
                                        </div>
                                        <div className="model-item__bar"><div className="model-item__bar-fill model-item__bar-fill--gpt4o" style={{ width: '18%' }}></div></div>

                                        <div className="model-item" style={{ marginTop: '8px' }}>
                                            <div className="model-item__dot model-item__dot--gpt5"></div>
                                            <div className="model-item__info">
                                                <div className="model-item__name">gpt-5-mini</div>
                                            </div>
                                            <div className="model-item__count">1,458회</div>
                                        </div>
                                        <div className="model-item__bar"><div className="model-item__bar-fill model-item__bar-fill--gpt5" style={{ width: '11%' }}></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Usage Section */}
                        <div className="feature-usage" id="featureUsage">
                            <div className="feature-usage__header">
                                <h3 className="feature-usage__title">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                                    기능별 사용 현황
                                </h3>
                            </div>
                            <div className="feature-usage__grid">
                                <div className="feature-card">
                                    <div className="feature-card__icon feature-card__icon--compare">
                                        <svg className="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                    </div>
                                    <div className="feature-card__content">
                                        <div className="feature-card__label">비교 모드</div>
                                        <div className="feature-card__stats">
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureCompareStudents">52명</span>
                                                <span className="feature-card__stat-label">/ 75명</span>
                                            </div>
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureCompareCount">3,892회</span>
                                                <span className="feature-card__stat-label">사용</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-card__icon feature-card__icon--knowledge">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="12" y1="6" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                    </div>
                                    <div className="feature-card__content">
                                        <div className="feature-card__label">지식베이스 활용</div>
                                        <div className="feature-card__stats">
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureKnowledgeStudents">38명</span>
                                                <span className="feature-card__stat-label">/ 75명</span>
                                            </div>
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureKnowledgeCount">1,245건</span>
                                                <span className="feature-card__stat-label">질문</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-card__icon feature-card__icon--agent">
                                        <svg className="icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    </div>
                                    <div className="feature-card__content">
                                        <div className="feature-card__label">에이전트 생성</div>
                                        <div className="feature-card__stats">
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureAgentStudents">18명</span>
                                                <span className="feature-card__stat-label">/ 75명</span>
                                            </div>
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureAgentCount">32개</span>
                                                <span className="feature-card__stat-label">생성</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-card__icon feature-card__icon--project">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <div className="feature-card__content">
                                        <div className="feature-card__label">프로젝트 활용</div>
                                        <div className="feature-card__stats">
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureProjectStudents">61명</span>
                                                <span className="feature-card__stat-label">/ 75명</span>
                                            </div>
                                            <div className="feature-card__stat">
                                                <span className="feature-card__stat-value" id="featureProjectCount">142개</span>
                                                <span className="feature-card__stat-label">생성</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Table (Course or Student based on selection) */}
                        <div className="card">
                            <div className="card__header">
                                <h2 className="card__title" id="tableTitle">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                    강의별 사용량
                                </h2>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                {/* Course Table (shown when "전체" selected) */}
                                <table className="data-table" id="courseTable">
                                    <thead>
                                        <tr>
                                            <th>강의</th>
                                            <th>학생 수</th>
                                            <th>총 대화</th>
                                            <th>학생당 평균</th>
                                            <th>모델 비율</th>
                                            <th>상태</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>
                                                <div className="course-cell">
                                                    <div className="course-cell__icon course-cell__icon--active"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                                                    <span className="course-cell__name">프롬프트 엔지니어링</span>
                                                </div>
                                            </td>
                                            <td>30명</td>
                                            <td>8,742</td>
                                            <td>291회</td>
                                            <td>
                                                <div className="model-mini-bar">
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--claude" style={{ width: '30%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gemini" style={{ width: '20%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt35" style={{ width: '20%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt4o" style={{ width: '18%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt5" style={{ width: '12%' }}></div>
                                                </div>
                                            </td>
                                            <td><span style={{ color: 'var(--success)', fontWeight: '500' }}>진행 중</span></td>
                                            <td><button className="view-btn">상세 보기</button></td>
                                        </tr>
                                        <tr >
                                            <td>
                                                <div className="course-cell">
                                                    <div className="course-cell__icon course-cell__icon--active"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                                                    <span className="course-cell__name">2025 AI 기초과정</span>
                                                </div>
                                            </td>
                                            <td>20명</td>
                                            <td>1,245</td>
                                            <td>62회</td>
                                            <td>
                                                <div className="model-mini-bar">
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--claude" style={{ width: '29%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gemini" style={{ width: '22%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt35" style={{ width: '20%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt4o" style={{ width: '18%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt5" style={{ width: '11%' }}></div>
                                                </div>
                                            </td>
                                            <td><span style={{ color: 'var(--success)', fontWeight: '500' }}>진행 중</span></td>
                                            <td><button className="view-btn">상세 보기</button></td>
                                        </tr>
                                        <tr >
                                            <td>
                                                <div className="course-cell">
                                                    <div className="course-cell__icon course-cell__icon--ended"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                                                    <span className="course-cell__name">2024 AI 기초과정</span>
                                                </div>
                                            </td>
                                            <td>25명</td>
                                            <td>3,245</td>
                                            <td>130회</td>
                                            <td>
                                                <div className="model-mini-bar">
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gemini" style={{ width: '27%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--claude" style={{ width: '26%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt35" style={{ width: '20%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt4o" style={{ width: '18%' }}></div>
                                                    <div className="model-mini-bar__segment model-mini-bar__segment--gpt5" style={{ width: '9%' }}></div>
                                                </div>
                                            </td>
                                            <td><span style={{ color: 'var(--gray-500)', fontWeight: '500' }}>종료</span></td>
                                            <td><button className="view-btn">상세 보기</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Student Table (shown when specific course selected)  */}
                                <table className="data-table" id="studentTable">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '50px' }}>순위</th>
                                            <th>학생</th>
                                            <th>총 대화</th>
                                            <th>모델 비율</th>
                                            <th>마지막 활동</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="studentTableBody">
                                        {/* Populated by JavaScript */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}