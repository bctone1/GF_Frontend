import PartnerSidebar from './PartnerSidebar';


export default function PartnerDashboard() {
    return (
        <>
            <div className="app">
                <PartnerSidebar />
                <main className="main">
                    <header className="main-header">
                        <div className="main-header__left">
                            <div>
                                <h1 className="main-header__title">대시보드</h1>
                                <div className="main-header__subtitle">2025년 1월 10일 금요일</div>
                            </div>
                        </div>
                        <div className="main-header__right">
                            <button className="main-header__btn" title="새로고침"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button>

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
                        {/* Welcome Banner */}
                        <div className="welcome-banner">
                            <div className="welcome-banner__content">
                                <div className="welcome-banner__title">안녕하세요, 박강사님! 👋</div>
                                <div className="welcome-banner__desc">오늘도 AI 교육에 힘써주셔서 감사합니다. 현재 5개의 강의가 진행 중입니다.</div>
                            </div>
                            <div className="welcome-banner__stats">
                                <div className="welcome-banner__stat">
                                    <div className="welcome-banner__stat-value">127</div>
                                    <div className="welcome-banner__stat-label">총 학생</div>
                                </div>
                                <div className="welcome-banner__stat">
                                    <div className="welcome-banner__stat-value">15.8k</div>
                                    <div className="welcome-banner__stat-label">총 대화</div>
                                </div>
                                <div className="welcome-banner__stat">
                                    <div className="welcome-banner__stat-value">$406</div>
                                    <div className="welcome-banner__stat-label">사용 비용</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="stats-grid">
                            <div className="stat-card" >
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--primary"><svg className="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>
                                    <span className="stat-card__trend stat-card__trend--up"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>+2</span>
                                </div>
                                <div className="stat-card__label">진행 중인 강의</div>
                                <div className="stat-card__value">5개</div>
                                <div className="stat-card__sub">1개 강의 예정</div>
                            </div>
                            <div className="stat-card" >
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--success"><svg className="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                                    <span className="stat-card__trend stat-card__trend--up"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>+12</span>
                                </div>
                                <div className="stat-card__label">활성 학생</div>
                                <div className="stat-card__value">89명</div>
                                <div className="stat-card__sub">최근 7일 기준</div>
                            </div>
                            <div className="stat-card" >
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--warning"><svg className="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>
                                    <span className="stat-card__trend stat-card__trend--up"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>+1.8k</span>
                                </div>
                                <div className="stat-card__label">오늘의 대화</div>
                                <div className="stat-card__value">342</div>
                                <div className="stat-card__sub">어제 대비 +15%</div>
                            </div>
                            <div className="stat-card" >
                                <div className="stat-card__header">
                                    <div className="stat-card__icon stat-card__icon--purple"><svg className="icon" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
                                    <span className="stat-card__trend stat-card__trend--up"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>+$52</span>
                                </div>
                                <div className="stat-card__label">이번 주 비용</div>
                                <div className="stat-card__value">$52.30</div>
                                <div className="stat-card__sub">예산 내 정상 운영</div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid-2">
                            {/* Activity */}
                            <div className="card">
                                <div className="card__header">
                                    <h2 className="card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>최근 활동</h2>
                                    <span className="card__action">전체보기 <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                                </div>
                                <div className="card__body">
                                    <div className="activity-list">
                                        <div className="activity-item">
                                            <div className="activity-item__icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>김</div>
                                            <div className="activity-item__content">
                                                <div className="activity-item__text"><strong>김민수</strong>님이 <strong>AI 기초과정</strong>에서 GPT-4와 23회 대화했습니다</div>
                                                <div className="activity-item__time">5분 전</div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-item__icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>이</div>
                                            <div className="activity-item__content">
                                                <div className="activity-item__text"><strong>이지은</strong>님이 <strong>프롬프트 엔지니어링</strong> 강의에 새로 등록했습니다</div>
                                                <div className="activity-item__time">15분 전</div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-item__icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>⚠</div>
                                            <div className="activity-item__content">
                                                <div className="activity-item__text"><strong>프롬프트 엔지니어링</strong> 강의 예산이 80%에 도달했습니다</div>
                                                <div className="activity-item__time">1시간 전</div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-item__icon" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>정</div>
                                            <div className="activity-item__content">
                                                <div className="activity-item__text"><strong>정하나</strong>님이 Claude와 비교 모드로 45분간 학습했습니다</div>
                                                <div className="activity-item__time">2시간 전</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Students */}
                            <div className="card">
                                <div className="card__header">
                                    <h2 className="card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>활발한 학생 TOP 5</h2>
                                    <span className="card__action">전체보기 <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                                </div>
                                <div className="card__body">
                                    <div className="top-students">
                                        <div className="top-student-item">
                                            <div className="top-student-item__rank top-student-item__rank--1">1</div>
                                            <div className="top-student-item__avatar" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>정</div>
                                            <div className="top-student-item__info">
                                                <div className="top-student-item__name">정하나</div>
                                                <div className="top-student-item__course">프롬프트 엔지니어링</div>
                                            </div>
                                            <div className="top-student-item__count">342회</div>
                                        </div>
                                        <div className="top-student-item">
                                            <div className="top-student-item__rank top-student-item__rank--2">2</div>
                                            <div className="top-student-item__avatar" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>이</div>
                                            <div className="top-student-item__info">
                                                <div className="top-student-item__name">이지은</div>
                                                <div className="top-student-item__course">프롬프트 엔지니어링</div>
                                            </div>
                                            <div className="top-student-item__count">287회</div>
                                        </div>
                                        <div className="top-student-item">
                                            <div className="top-student-item__rank top-student-item__rank--3">3</div>
                                            <div className="top-student-item__avatar" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>김</div>
                                            <div className="top-student-item__info">
                                                <div className="top-student-item__name">김민수</div>
                                                <div className="top-student-item__course">AI 기초과정</div>
                                            </div>
                                            <div className="top-student-item__count">156회</div>
                                        </div>
                                        <div className="top-student-item">
                                            <div className="top-student-item__rank top-student-item__rank--other">4</div>
                                            <div className="top-student-item__avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>박</div>
                                            <div className="top-student-item__info">
                                                <div className="top-student-item__name">박서연</div>
                                                <div className="top-student-item__course">AI 기초과정</div>
                                            </div>
                                            <div className="top-student-item__count">89회</div>
                                        </div>
                                        <div className="top-student-item">
                                            <div className="top-student-item__rank top-student-item__rank--other">5</div>
                                            <div className="top-student-item__avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>최</div>
                                            <div className="top-student-item__info">
                                                <div className="top-student-item__name">최준호</div>
                                                <div className="top-student-item__course">AI 기초과정</div>
                                            </div>
                                            <div className="top-student-item__count">45회</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Progress  */}
                        <div className="card">
                            <div className="card__header">
                                <h2 className="card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>강의별 예산 현황</h2>
                                <span className="card__action" >상세보기 <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                            </div>
                            <div className="card__body">
                                <div className="course-progress">
                                    <div className="course-progress-item">
                                        <div className="course-progress-item__icon course-progress-item__icon--active"><svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                                        <div className="course-progress-item__info">
                                            <div className="course-progress-item__name">프롬프트 엔지니어링</div>
                                            <div className="course-progress-item__bar">
                                                <div className="course-progress-item__bar-fill course-progress-item__bar-fill--warning" style={{ width: '80%' }}></div>
                                            </div>
                                        </div>
                                        <div className="course-progress-item__stats">
                                            <div className="course-progress-item__percent" style={{ color: 'var(--warning)' }}>80%</div>
                                            <div className="course-progress-item__budget">$128 / $160</div>
                                        </div>
                                    </div>
                                    <div className="course-progress-item">
                                        <div className="course-progress-item__icon course-progress-item__icon--active"><svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                                        <div className="course-progress-item__info">
                                            <div className="course-progress-item__name">2025 AI 기초과정</div>
                                            <div className="course-progress-item__bar"><div className="course-progress-item__bar-fill" style={{ width: '45%' }}></div></div>
                                        </div>
                                        <div className="course-progress-item__stats">
                                            <div className="course-progress-item__percent">45%</div>
                                            <div className="course-progress-item__budget">$45 / $100</div>
                                        </div>
                                    </div>
                                    <div className="course-progress-item">
                                        <div className="course-progress-item__icon course-progress-item__icon--upcoming"><svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                                        <div className="course-progress-item__info">
                                            <div className="course-progress-item__name">2025 LLM 활용 실무 <span style={{ color: 'var(--warning)', fontSize: '11px', marginLeft: '8px' }}>D-5</span></div>
                                            <div className="course-progress-item__bar"><div className="course-progress-item__bar-fill" style={{ width: '0%' }}></div></div>
                                        </div>
                                        <div className="course-progress-item__stats">
                                            <div className="course-progress-item__percent">0%</div>
                                            <div className="course-progress-item__budget">$0 / $150</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}