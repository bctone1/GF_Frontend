import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserSidebar() {
    const location = useLocation();
    const currentMenu = location.pathname.split('/')[2];

    const [myClasses, setMyClasses] = useState([]);
    const accessToken = sessionStorage.getItem("access_token");
    const fetchMyClasses = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/classes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            console.log(response.data.items);
            setMyClasses(response.data.items);
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchMyClasses();
    }, []);

    return (
        <>
            <aside className="sidebar sidebar--open">
                <div className="sidebar__user">
                    {/* <div className="sidebar__user-info">
                        <div className="sidebar__user-avatar"
                            style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>김</div>
                        <div className="sidebar__user-details">
                            <div className="sidebar__user-name">김직원</div>
                            <div className="sidebar__user-role">AI 실습생</div>
                        </div>
                    </div> */}


                    <div className="sidebar__class-selector">
                        <select id="classSelector" className="sidebar__class-select">
                            <option value="">📚 과목을 선택하세요</option>
                            {myClasses.map((myClass) => (
                                <option value={myClass.id} key={myClass.class_id}>{myClass.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <nav className="sidebar__nav">
                    <ul className="sidebar__menu">
                        {/* <li className="sidebar__menu-item">
                            <Link
                                to="/user/dashboard"
                                className={`sidebar__menu-link ${currentMenu === 'dashboard' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">🏠</span>
                                <span>대시보드</span>
                            </Link>
                        </li> */}


                        <li className="sidebar__menu-item">
                            <Link
                                to="/user/practice"
                                className={`sidebar__menu-link ${currentMenu === 'practice' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">💬</span>
                                <span>AI 실습</span>
                            </Link>
                        </li>

                        <li className="sidebar__menu-item">
                            <Link
                                to="/user/project"
                                className={`sidebar__menu-link ${currentMenu === 'project' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">📂</span>
                                <span>내 프로젝트</span>
                            </Link>
                        </li>

                        <li className="sidebar__menu-item">
                            <Link
                                to="/user/knowledge"
                                className={`sidebar__menu-link ${currentMenu === 'knowledge' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">📚</span>
                                <span>지식베이스</span>
                            </Link>
                        </li>



                        {/* <li className="sidebar__menu-item">
                            <Link
                                to="/user/agent"
                                className={`sidebar__menu-link ${currentMenu === 'agent' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">🤖</span>
                                <span>내 에이전트</span>
                            </Link>
                        </li>

                        <li className="sidebar__menu-item">
                            <Link
                                to="/user/workflow"
                                className={`sidebar__menu-link ${currentMenu === 'workflow' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">🔀</span>
                                <span>워크플로우</span>
                            </Link>
                        </li>

                        <li className="sidebar__menu-item">
                            <Link
                                to="/user/history"
                                className={`sidebar__menu-link ${currentMenu === 'history' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">📊</span>
                                <span>내 기록</span>
                            </Link>
                        </li> */}

                        <li className="sidebar__menu-item">
                            <Link
                                to="/user/profile"
                                className={`sidebar__menu-link ${currentMenu === 'profile' ? 'sidebar__menu-link--active' : ''}`}
                            >
                                <span className="sidebar__menu-icon">⚙️</span>
                                <span>설정</span>
                            </Link>
                        </li>

                    </ul>
                </nav>

                <div className="sidebar__footer">
                    <div
                        style={{ padding: "var(--space-3)", background: "var(--surface)", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)" }}>
                        <div style={{ color: "var(--text-secondary)", marginBottom: "var(--space-1)" }}>이번 주 실습</div>
                        <div style={{ fontWeight: "var(--font-bold)", color: "var(--employee-primary)" }}>3시간 24분</div>
                    </div>
                </div>
            </aside>
        </>
    )
}