import { Link, useLocation } from 'react-router-dom';


export default function PartnerSidebar() {
    const location = useLocation();
    const currentMenu = location.pathname.split('/')[2];

    return (
        <>
            <aside className="sidebar sidebar--open">
                <div className="sidebar__user">
                    <div className="sidebar__user-info">
                        <div className="sidebar__user-avatar" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>박</div>
                        <div className="sidebar__user-details">
                            <div className="sidebar__user-name">박강사</div>
                            <div className="sidebar__user-role">교육 파트너</div>
                        </div>
                    </div>
                </div>

                <nav className="sidebar__nav">
                    <ul className="sidebar__menu">
                        <Link
                            to="/partner/dashboard"
                            className={`sidebar__menu-link ${currentMenu === 'dashboard' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">📊</span>
                            <span>대시보드</span>
                        </Link>

                        <Link
                            to="/partner/project-management"
                            className={`sidebar__menu-link ${currentMenu === 'project-management' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">📚</span>
                            <span>강의 관리</span>
                        </Link>

                        <Link
                            to="/partner/student-management"
                            className={`sidebar__menu-link ${currentMenu === 'student-management' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">👥</span>
                            <span>학생 관리</span>
                        </Link>

                        <Link
                            to="/partner/cost-analytics"
                            className={`sidebar__menu-link ${currentMenu === 'cost-analytics' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">💰</span>
                            <span>비용 및 사용량 통계</span>
                        </Link>

                        <Link
                            to="/partner/settings"
                            className={`sidebar__menu-link ${currentMenu === 'settings' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">⚙️</span>
                            <span>설정</span>
                        </Link>
                    </ul>
                </nav>

                <div className="sidebar__footer">
                    <div style={{ padding: 'var(--space-3)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1))', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>이번 달 수익 (75%)</div>
                        <div style={{ fontWeight: 'var(--font-bold)', color: 'var(--partner-primary)' }}>45,000,000원</div>
                        <div style={{ height: '4px', background: 'var(--gray-200)', borderRadius: '2px', marginTop: 'var(--space-2)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '75%', background: 'linear-gradient(to right, var(--partner-primary), var(--partner-secondary))' }}></div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}