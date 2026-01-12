import { Link, useLocation } from 'react-router-dom';


export default function PartnerSidebar() {
    const location = useLocation();
    const currentMenu = location.pathname.split('/')[2];

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__logo">
                        <div className="partner-sidebar__logo-icon">
                            <svg className="icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        </div>
                        <span className="sidebar__logo-text">GrowFit</span>
                        <span className="partner-sidebar__logo-badge">강사</span>
                    </div>
                    <div className="role-selector">
                        <button className="role-selector__button">
                            <div className="role-selector__icon">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <div className="role-selector__info">
                                <div className="role-selector__name">박강사</div>
                                <div className="role-selector__meta">
                                    <span className="role-selector__status"><span className="role-selector__status-dot"></span>강사 계정</span>
                                    <span className="role-selector__badge">5개 강의</span>
                                </div>
                            </div>
                        </button>
                    </div>
                    <button className="sidebar__new-btn">
                        <svg className="icon" viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                        <span>새 강의 등록</span>
                    </button>
                </div>
                <nav className="sidebar__nav">
                    <Link
                        to="/partner/dashboard"
                        className={`partner-sidebar__nav-item ${currentMenu === 'dashboard' ? 'partner-sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span>
                        <span>대시보드</span>
                    </Link>

                    <Link
                        to="/partner/project-management"
                        className={`partner-sidebar__nav-item ${currentMenu === 'project-management' ? 'partner-sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></span>
                        <span>강의 등록</span>
                        <span className="sidebar__nav-badge">5</span>
                    </Link>

                    <Link
                        to="/partner/student-management"
                        className={`partner-sidebar__nav-item ${currentMenu === 'student-management' ? 'partner-sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                        <span>학생 관리</span>
                        <span className="sidebar__nav-badge">127</span>
                    </Link>


                    <Link
                        to="/partner/instructor-materials"
                        className={`partner-sidebar__nav-item ${currentMenu === 'instructor-materials' ? 'partner-sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></span>
                        <span>학습 자료</span>
                    </Link>

                    <Link
                        to="/partner/instructor-analytics"
                        className={`partner-sidebar__nav-item ${currentMenu === 'instructor-analytics' ? 'partner-sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span>
                        <span>사용량 통계</span>
                    </Link>

                    <Link
                        to="/partner/instructor-settings"
                        className={`partner-sidebar__nav-item ${currentMenu === 'instructor-settings' ? 'partner-sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span>
                        <span>설정</span>
                    </Link>
                </nav>




                <div className="sidebar__section-header">
                    <span className="sidebar__section-title">내 강의</span>
                    <button className="sidebar__section-btn"><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
                </div>

                <div className="sidebar__list">
                    <div className="course-item-sidebar course-item-sidebar--active">
                        <div className="course-item-sidebar__icon"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                        <div className="course-item-sidebar__info">
                            <div className="course-item-sidebar__title">2025 AI 기초과정</div>
                            <div className="course-item-sidebar__meta"><span className="course-item-sidebar__count">20명</span><span className="course-item-sidebar__status course-item-sidebar__status--active">진행중</span></div>
                        </div>
                    </div>
                    <div className="course-item-sidebar">
                        <div className="course-item-sidebar__icon"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                        <div className="course-item-sidebar__info">
                            <div className="course-item-sidebar__title">프롬프트 엔지니어링</div>
                            <div className="course-item-sidebar__meta"><span className="course-item-sidebar__count">30명</span><span className="course-item-sidebar__status course-item-sidebar__status--active">진행중</span></div>
                        </div>
                    </div>
                    <div className="course-item-sidebar">
                        <div className="course-item-sidebar__icon"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                        <div className="course-item-sidebar__info">
                            <div className="course-item-sidebar__title">2025 LLM 활용 실무</div>
                            <div className="course-item-sidebar__meta"><span className="course-item-sidebar__count">0명</span><span className="course-item-sidebar__status course-item-sidebar__status--upcoming">D-5</span></div>
                        </div>
                    </div>
                    <div className="course-item-sidebar" style={{ opacity: 0.6 }}>
                        <div className="course-item-sidebar__icon"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                        <div className="course-item-sidebar__info">
                            <div className="course-item-sidebar__title">2024 AI 기초과정</div>
                            <div className="course-item-sidebar__meta"><span className="course-item-sidebar__count">25명</span><span className="course-item-sidebar__status course-item-sidebar__status--ended">종료</span></div>
                        </div>
                    </div>
                </div>


                <div className="sidebar__list">
                    <div className="student-item-sidebar student-item-sidebar--active">
                        <div className="student-item-sidebar__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>김</div>
                        <div className="student-item-sidebar__info">
                            <div className="student-item-sidebar__name">김민수</div>
                            <div className="student-item-sidebar__course">AI 기초과정</div>
                        </div>
                    </div>
                    <div className="student-item-sidebar">
                        <div className="student-item-sidebar__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>이</div>
                        <div className="student-item-sidebar__info">
                            <div className="student-item-sidebar__name">이지은</div>
                            <div className="student-item-sidebar__course">프롬프트 엔지니어링</div>
                        </div>
                    </div>
                    <div className="student-item-sidebar">
                        <div className="student-item-sidebar__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>박</div>
                        <div className="student-item-sidebar__info">
                            <div className="student-item-sidebar__name">박서연</div>
                            <div className="student-item-sidebar__course">AI 기초과정</div>
                        </div>
                    </div>
                    <div className="student-item-sidebar">
                        <div className="student-item-sidebar__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>최</div>
                        <div className="student-item-sidebar__info">
                            <div className="student-item-sidebar__name">최준호</div>
                            <div className="student-item-sidebar__course">2024 AI 기초 (수강완료)</div>
                        </div>
                    </div>
                </div>




                <div className="sidebar__footer">
                    <Link to="/user/practice" className="sidebar__footer-item">
                        <svg className="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <span>학생 화면 보기</span>
                    </Link>
                    <div className="sidebar__user">
                        <div className="partner-sidebar__user-avatar">박</div>
                        <span className="sidebar__user-name">박강사</span>
                        <svg className="icon icon--sm sidebar__user-logout" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </div>
                </div>
            </aside>
        </>
    )
}