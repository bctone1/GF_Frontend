import { Link, useLocation } from 'react-router-dom';

export default function ManagerSidebar() {
    const location = useLocation();
    const currentMenu = location.pathname.split('/')[2];

    return (
        <>
            <aside className="sidebar sidebar--open">
                <div className="sidebar__user">
                    <div className="sidebar__user-info">
                        <div className="sidebar__user-avatar">관</div>
                        <div className="sidebar__user-details">
                            <div className="sidebar__user-name">플랫폼 관리자</div>
                            <div className="sidebar__user-role">Platform Admin</div>
                        </div>
                    </div>
                </div>

                <nav className="sidebar__nav">
                    <ul className="sidebar__menu">

                        <Link
                            to="/manager/dashboard"
                            className={`sidebar__menu-link ${currentMenu === 'dashboard' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">📊</span>
                            <span>대시보드</span>
                        </Link>

                        <Link
                            to="/manager/instructor"
                            className={`sidebar__menu-link ${currentMenu === 'instructor' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">👨‍🏫</span>
                            <span>교육 파트너 관리</span>
                        </Link>

                        <Link
                            to="/manager/user-management"
                            className={`sidebar__menu-link ${currentMenu === 'user-management' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">👥</span>
                            <span>전체 사용자</span>
                        </Link>

                        <Link
                            to="/manager/billing"
                            className={`sidebar__menu-link ${currentMenu === 'billing' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">💳</span>
                            <span>정산 관리</span>
                        </Link>

                        <Link
                            to="/manager/settings"
                            className={`sidebar__menu-link ${currentMenu === 'settings' ? 'sidebar__menu-link--active' : ''}`}
                        >
                            <span className="sidebar__menu-icon">⚙️</span>
                            <span>설정</span>
                        </Link>

                    </ul>
                </nav>
            </aside>
        </>
    )
}