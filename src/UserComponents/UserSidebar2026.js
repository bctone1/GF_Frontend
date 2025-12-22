import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { setSelectedClass, getSelectedClassId, showToast2026 } from '../utill/utill';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function UserSidebar2026({
    onClassChange,
    onClassesData,
    refreshTrigger,
    externalClassSelect,
    getProjecList,
    getSessionResponses,
    handleProfileData,
    handleAccountData,
    startNewChat,
    getSessionList,
    fetchProjectsRef,
    currentSession,
    setCurrentSession,
    fetchSessionRef,
    handleSessionClickRef,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentMenu = location.pathname.split('/')[2];
    const [myClasses, setMyClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const accessToken = sessionStorage.getItem("access_token");
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());
    const [classSelectorOpen, setClassSelectorOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchModalStatus, setSearchModalStatus] = useState(false);
    const [newProjectModalStatus, setNewProjectModalStatus] = useState(false);
    const [settingsModalStatus, setSettingsModalStatus] = useState(false);
    const [profileModalStatus, setProfileModalStatus] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [sessions, setSessions] = useState([]);
    const filteredSessions = sessions.filter(session => session.class_id === Number(selectedClassId));
    const [myprofile, setMyprofile] = useState(null);
    const [myaccount, setMyaccount] = useState(null);
    const [clickContextSessionId, setClickContextSessionId] = useState(null);

    const closeChatContextMenu = useCallback(() => {
        setContextMenuOpen(false);
    }, []);

    const showChatContextMenu = useCallback((event, sessionId) => {
        setClickContextSessionId(sessionId);
        event.stopPropagation();
        setContextMenuPosition({ left: event.clientX, top: event.clientY });
        setContextMenuOpen(true);
    }, []);

    const handleDeleteChat = useCallback(() => {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${clickContextSessionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            if (currentSession === clickContextSessionId) {
                startNewChat();
            }
            fetchSessions();
            closeChatContextMenu();
            showToast2026('세션이 삭제되었습니다.');
        }).catch(error => {
            console.error('세션 삭제 실패:', error);
        });
    }, [closeChatContextMenu, clickContextSessionId, accessToken]);

    const handleSessionClick = useCallback(async (sessionId) => {
        if (currentMenu !== 'practice') {
            navigate(`/user/practice?sessionId=${sessionId}`);
        }
        try {
            if (setCurrentSession) {
                setCurrentSession(sessionId);
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${sessionId}`,
                { headers: { Authorization: `Bearer ${accessToken}`, }, }
            );
            const sessionData = response.data;
            if (getSessionResponses) {
                getSessionResponses(sessionData);
            }
        } catch (error) {
            console.error('세션 조회 실패:', error);
        }
    }, [accessToken, currentMenu, navigate, setCurrentSession, getSessionResponses]);

    const handleRenameChat = useCallback(() => {
        closeChatContextMenu();
        showToast2026('구현예정입니다.');
    }, [closeChatContextMenu]);




    const fetchProjects = useCallback(async (classId) => {
        if (!classId) {
            setProjectList([]);
            return [];
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects?class_id=${classId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            const projects = response.data.items || [];
            const filteredProjects = projects.filter(project => String(project.class_id) === String(classId));
            if (getProjecList) { getProjecList(filteredProjects); }
            setProjectList(filteredProjects);
            return filteredProjects;
        } catch (error) {
            console.error('프로젝트 조회 실패:', error);
            setProjectList([]);
            return [];
        }
    }, [accessToken, getProjecList]);


    const fetchMyClasses = useCallback(() => {
        if (!accessToken) {
            if (onClassesData) {
                onClassesData([], false);
            }
            return;
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/classes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            const classes = response.data.items || [];
            setMyClasses(classes);

            // 부모 컴포넌트에 클래스 데이터 전달
            if (onClassesData) {
                onClassesData(classes, false);
            }
            const currentSavedClassId = getSelectedClassId();
            if (currentSavedClassId) {
                const isValid = classes.some(c => String(c.class_id) === String(currentSavedClassId));
                if (isValid) {
                    setSelectedClassId(currentSavedClassId);
                    const selectedClass = classes.find(c => String(c.class_id) === String(currentSavedClassId));
                    if (selectedClass) {
                        setSelectedClass(currentSavedClassId, selectedClass.class_title);
                    }
                } else {
                    setSelectedClass(null, null);
                    setSelectedClassId('');
                }
            }
        }).catch(error => {
            console.error('클래스 조회 실패:', error);
            if (onClassesData) {
                onClassesData([], false);
            }
        });
    }, [accessToken, onClassesData]);

    const fetchSessions = useCallback(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions`,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", } }
        );
        // console.log(response.data.items);
        setSessions(response.data.items);
        if (getSessionList) {
            getSessionList(response.data.items);
        }
    }, [accessToken, getSessionList]);

    const getMyAccount = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            sessionStorage.setItem("partner_id", response.data.partner_id);
            sessionStorage.setItem("user_id", response.data.user_id);
            sessionStorage.setItem("user_email", response.data.email);
            setMyaccount(response.data);
            if (handleAccountData) {
                handleAccountData(response.data);
            }
        }).catch(error => {
            console.error('계정 조회 실패:', error);
        });
    }, [accessToken, handleAccountData]);

    const getMyProfile = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/my/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            setMyprofile(response.data);
            if (handleProfileData) {
                handleProfileData(response.data);
            }
        }).catch(error => {
            console.error('프로필 조회 실패:', error);
        });
    }, [accessToken, handleProfileData]);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    }

    const changeClass = useCallback(async (classId) => {
        setClassSelectorOpen(false);
        if (Number(classId) === Number(selectedClassId)) return;
        if (setCurrentSession) { setCurrentSession(0); }
        setSelectedClassId(classId);
        if (classId) {
            const selectedClass = myClasses.find(c => String(c.class_id) === String(classId));
            const classTitle = selectedClass ? selectedClass.class_title : null;
            const allowed_model_ids = selectedClass ? selectedClass.allowed_model_ids : [1];
            sessionStorage.setItem("allowed_model_ids", allowed_model_ids);
            setSelectedClass(classId, classTitle);
            const updatedProjects = await fetchProjects(classId);
            if (onClassChange) {
                onClassChange(classId, allowed_model_ids, updatedProjects || []);
            }
        } else {
            setSelectedClass(null, null);
            if (onClassChange) {
                onClassChange(null, [1], []);
            }
        }
    }, [myClasses, selectedClassId, fetchProjects, onClassChange, setCurrentSession]);

    useEffect(() => {
        const sessionIdFromUrl = searchParams.get('sessionId');
        if (sessionIdFromUrl) {
            const sessionId = parseInt(sessionIdFromUrl, 10);
            console.log(sessionId);
            if (sessionId && !isNaN(sessionId)) {
                const timer = setTimeout(() => {
                    handleSessionClick(sessionId);
                    setSearchParams({});
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [searchParams, handleSessionClick, setSearchParams]);

    useEffect(() => {
        if (savedClassId) {
            setSelectedClassId(savedClassId);
        }
    }, [location.pathname, savedClassId]);


    useEffect(() => {
        fetchMyClasses();
        fetchSessions();
        getMyAccount();
        getMyProfile();
        if (savedClassId) {
            fetchProjects(savedClassId);
        }
    }, []);

    useEffect(() => {
        if (fetchProjectsRef) {
            const currentClassId = savedClassId || getSelectedClassId();
            fetchProjectsRef.current = () => fetchProjects(currentClassId);
        }
    }, [savedClassId, fetchProjects, fetchProjectsRef]);

    useEffect(() => {
        if (fetchSessionRef) {
            fetchSessionRef.current = fetchSessions;
        }
    }, [fetchSessions, fetchSessionRef]);

    useEffect(() => {
        if (handleSessionClickRef) {
            handleSessionClickRef.current = handleSessionClick;
        }
    }, [handleSessionClickRef, handleSessionClick]);

    useEffect(() => {
        if (refreshTrigger > 0) {
            fetchMyClasses();
        }
    }, [refreshTrigger, fetchMyClasses]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (classSelectorOpen && !e.target.closest('.class-selector') && !e.target.closest('.class-dropdown')) {
                setClassSelectorOpen(false);
            }
        };

        if (classSelectorOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [classSelectorOpen]);

    // externalClassSelect가 변경되면 클래스 선택
    useEffect(() => {
        if (externalClassSelect && myClasses.length > 0) {
            const isValid = myClasses.some(c => String(c.class_id) === String(externalClassSelect));
            if (isValid) {
                changeClass(externalClassSelect);
            }
        }

    }, [externalClassSelect, myClasses, changeClass]);

    // 외부 클릭 시 컨텍스트 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contextMenuOpen && !e.target.closest('.chat-item__menu') && !e.target.closest('.context-menu')) {
                closeChatContextMenu();
            }
        };

        if (contextMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [contextMenuOpen, closeChatContextMenu]);



    return (
        <>
            <div className={`modal-overlay ${searchModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setSearchModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" >대화 검색</h3>
                        <button className="modal__close" onClick={() => setSearchModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" >
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <svg className="icon icon--sm"
                                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" placeholder="대화 내용 검색..." style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} />
                            </div>
                        </div>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', textAlign: 'center', padding: '20px' }}>검색어를 입력하세요</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal-overlay ${newProjectModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setNewProjectModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" >새 프로젝트 생성</h3>
                        <button className="modal__close" onClick={() => setNewProjectModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body">
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>프로젝트 이름</label>
                                <input type="text" placeholder="프로젝트 이름을 입력하세요" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>설명 (선택)</label>
                                <textarea placeholder="프로젝트 설명을 입력하세요" rows="3" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', resize: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <button className="modal__btn" onClick={() => setNewProjectModalStatus(false)}>취소</button>
                                <button className="modal__btn modal__btn--primary" >생성하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal-overlay ${settingsModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setSettingsModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title">설정</h3>
                        <button className="modal__close" onClick={() => setSettingsModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" >
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}>
                                <div><div style={{ fontWeight: '500' }}>다크 모드</div><div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>어두운 테마 사용</div></div>
                                <div className="settings-dropdown__toggle"></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}>
                                <div><div style={{ fontWeight: '500' }}>알림</div><div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>푸시 알림 받기</div></div>
                                <div className="settings-dropdown__toggle settings-dropdown__toggle--active" ></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal__footer" style={{ display: 'flex' }}><button className="modal__btn modal__btn--primary" onClick={() => setSettingsModalStatus(false)}>확인</button></div>
                </div>
            </div>

            <div className={`modal-overlay ${profileModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setProfileModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" >내 프로필</h3>
                        <button className="modal__close" onClick={() => setProfileModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" >
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ width: '80px', height: '80px', margin: '0 auto 12px', background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: '600' }}>홍</div>
                            <h3>{myprofile?.full_name}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{myaccount?.email}</p>
                        </div>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}><span>가입일</span><span style={{ color: 'var(--text-secondary)' }}>{myaccount?.created_at.split('T')[0]}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}><span>총 대화 수</span><span style={{ color: 'var(--text-secondary)' }}>데이터 필요</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}><span>이번 달 사용량</span><span style={{ color: 'var(--text-secondary)' }}>데이터 필요</span></div>
                        </div>
                    </div>
                    <div className="modal__footer" style={{ display: 'flex' }}><button className="modal__btn modal__btn--primary" onClick={() => setProfileModalStatus(false)}>확인</button></div>
                </div>
            </div>



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
                        <button
                            className={`class-selector__button ${classSelectorOpen ? 'open' : ''}`}
                            onClick={() => setClassSelectorOpen(!classSelectorOpen)}
                        >
                            <div className="class-selector__icon">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                            </div>
                            <div className="class-selector__info">

                                {selectedClassId ? (
                                    <>
                                        <div className="class-selector__name" >{myClasses.find(c => String(c.class_id) === String(selectedClassId))?.class_title}</div>
                                        <div className="class-selector__meta">
                                            <span className="class-selector__status class-selector__status--active">
                                                <span className="class-selector__status-dot"></span>진행 중
                                            </span>
                                            <span className="class-selector__dday" >D-{Math.floor((new Date(myClasses.find(c => String(c.class_id) === String(selectedClassId))?.class_end_at) - new Date()) / (1000 * 60 * 60 * 24) + 1)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="class-selector__name" >강의를 선택해주세요</div>
                                )}

                            </div>
                            <svg className="icon icon--sm class-selector__arrow" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        <div className={`class-dropdown ${classSelectorOpen ? 'class-dropdown--open' : ''}`} >

                            <div className="class-dropdown__section">
                                <div className="class-dropdown__section-title">진행 중인 클래스</div>
                                {myClasses.map((myClass) => {
                                    const now = new Date();
                                    const startDate = new Date(myClass.class_start_at);
                                    const endDate = new Date(myClass.class_end_at);
                                    const daysUntilStart = Math.floor((startDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const daysLeft = Math.floor((endDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const isDisabled = daysUntilStart > 0 || daysLeft < 0;

                                    if (isDisabled) return null;
                                    return (
                                        <div
                                            className={`class-dropdown__item ${selectedClassId === myClass.class_id ? 'class-dropdown__item--active' : ''}`}
                                            onClick={() => changeClass(myClass.class_id)}
                                            key={myClass.class_id}
                                        >
                                            <div className="class-dropdown__item-info">
                                                <div className="class-dropdown__item-name">{myClass.class_title}</div>
                                                <div className="class-dropdown__item-period">{myClass.class_start_at.split('T')[0]} ~ {myClass.class_end_at.split('T')[0]}</div>
                                            </div>
                                            <span className="class-dropdown__item-badge class-dropdown__item-badge--active">D-{daysLeft}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="class-dropdown__divider"></div>


                            <div className="class-dropdown__section">
                                <div className="class-dropdown__section-title">종료/예정 클래스</div>
                                {myClasses.map((myClass) => {
                                    const now = new Date();
                                    const startDate = new Date(myClass.class_start_at);
                                    const endDate = new Date(myClass.class_end_at);
                                    const daysUntilStart = Math.floor((startDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const daysLeft = Math.floor((endDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const isDisabled = daysUntilStart > 0 || daysLeft < 0;
                                    const isEnded = daysLeft < 0;

                                    if (isDisabled) return null;
                                    return (
                                        <div className="class-dropdown__item class-dropdown__item--disabled" key={myClass.class_id}>
                                            <div className="class-dropdown__item-info">
                                                <div className="class-dropdown__item-name">{myClass.class_title}</div>
                                                <div className="class-dropdown__item-period">{myClass.class_start_at.split('T')[0]} ~ {myClass.class_end_at.split('T')[0]}</div>
                                            </div>
                                            <span className={`class-dropdown__item-badge class-dropdown__item-badge--${isEnded ? 'ended' : 'not-started'}`}>{isEnded ? '종료' : '예정'}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <button className="sidebar__new-chat" onClick={startNewChat}>
                        <svg className="icon" viewBox="0 0 24 24">
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>
                        <span>새 채팅</span>
                    </button>
                </div>

                <nav className="sidebar__nav">
                    {/* <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/dashboard"
                        className={`sidebar__nav-item ${currentMenu === 'dashboard' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg></span>
                        <span>대시보드</span>
                    </Link> */}

                    <Link
                        to="/user/practice"
                        className={`sidebar__nav-item ${currentMenu === 'practice' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg></span>
                        <span>AI 실습</span>
                    </Link>

                    <Link
                        to="/user/project"
                        className={`sidebar__nav-item ${currentMenu === 'project' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg></span>
                        <span>내 프로젝트</span>
                    </Link>

                    <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/knowledge"
                        className={`sidebar__nav-item ${currentMenu === 'knowledge' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg></span>
                        <span>지식베이스</span>
                    </Link>

                    <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/agent"
                        className={`sidebar__nav-item ${currentMenu === 'agent' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <rect x="3" y="11" width="18" height="10" rx="2" />
                            <circle cx="12" cy="5" r="3" />
                            <path d="M12 8v3" />
                            <circle cx="8" cy="16" r="1" />
                            <circle cx="16" cy="16" r="1" />
                        </svg></span>
                        <span>내 에이전트</span>
                    </Link>

                    <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/workflow"
                        className={`sidebar__nav-item ${currentMenu === 'workflow' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                            <line x1="4" y1="4" x2="9" y2="9" />
                        </svg></span>
                        <span>워크플로우</span>
                    </Link>

                    <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/history"
                        className={`sidebar__nav-item ${currentMenu === 'history' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="10" y1="9" x2="8" y2="9" />
                        </svg></span>
                        <span>내 기록</span>
                    </Link>
                </nav>

                <div className="sidebar__section-header">
                    <span className="sidebar__section-title">최근 대화</span>
                    <div className="sidebar__section-actions">
                        <button className="sidebar__section-btn" title="대화 검색" onClick={() => setSearchModalStatus(true)}>
                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        <button className="sidebar__section-btn" title="새 프로젝트" onClick={() => setNewProjectModalStatus(true)}>
                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                <line x1="12" y1="11" x2="12" y2="17" />
                                <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="sidebar__history">
                    {filteredSessions.map((session) => (
                        <div className={`chat-item ${currentSession === session.session_id ? 'chat-item--active' : ''}`}
                            onClick={() => handleSessionClick(session.session_id)}
                            key={session.session_id}
                        >
                            {currentSession === session.session_id && (
                                <div className="chat-item__pin-dot"></div>
                            )}

                            <div className="chat-item__icon">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </div>

                            <div className="chat-item__info">
                                <div className="chat-item__title">{session.title}</div>
                                <div className="chat-item__meta">
                                    <div className="chat-item__time">
                                        {session.created_at.split('T')[0].slice(5)}{' '}
                                        {session.created_at.split('T')[1].split(':').slice(0, 2).join(':')}
                                    </div>
                                    {session.project_id && (
                                        <span className="chat-item__project-badge">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            {projectList?.find(project => project.project_id === session.project_id)?.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                className="chat-item__menu"
                                onClick={(e) => showChatContextMenu(e, session.session_id)}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                        </div>
                    ))}
                </div>




                <div className="sidebar__footer">
                    <div className="sidebar__footer-item" onClick={() => setSettingsModalStatus(true)}>
                        <svg className="icon" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" />
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span>설정</span>
                    </div>

                    <div className="sidebar__user" onClick={() => setProfileModalStatus(true)}>
                        <div className="sidebar__user-avatar">{myprofile?.full_name?.charAt(0)}</div>
                        <span className="sidebar__user-name">{myprofile?.full_name}</span>
                        <svg className="icon icon--sm sidebar__user-logout" viewBox="0 0 24 24" onClick={handleLogout}>
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </div>

                </div>
            </aside>

            {/* 컨텍스트 메뉴 */}
            <div
                className={`context-menu ${contextMenuOpen ? 'context-menu--open' : ''}`}
                style={{
                    left: `${contextMenuPosition.left}px`,
                    top: `${contextMenuPosition.top}px`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="context-menu__item" onClick={handleRenameChat}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    이름 변경
                </div>
                {/* <div className="context-menu__item" onClick={handleDuplicateChat}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    복제
                </div> */}
                <div className="context-menu__item context-menu__item--danger" onClick={handleDeleteChat}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    삭제
                </div>
            </div>
        </>
    );
}