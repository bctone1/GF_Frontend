import UserSidebar2026 from './UserSidebar2026';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { getSelectedClassId, showToast2026 } from '../utill/utill';
import { useNavigate } from 'react-router-dom';


export default function UserProject2026() {
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("access_token");
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());

    const [projectList, setProjectList] = useState([]);
    const [sessionList, setSessionList] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [newProjectModalStatus, setNewProjectModalStatus] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    const [prjStatus, setPrjStatus] = useState('all');
    const fetchProjectsRef = useRef(null);

    const getProjecList = (projectList) => {
        console.log(projectList);
        setProjectList(projectList);
    }
    const fetchProjectsTrigger = () => {
        if (fetchProjectsRef.current) {
            fetchProjectsRef.current();
        }
    }
    const getSessionList = (List) => {
        setSessionList(List);
    }

    const handleClassChange = (classId, allowedModelIdsArray, projectList) => {
        setSavedClassId(classId);
    }

    // 필터링 및 정렬된 프로젝트 리스트
    const filteredAndSortedProjects = useMemo(() => {
        let filtered = [...projectList];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(query) ||
                (project.description && project.description.toLowerCase().includes(query))
            );
        }

        switch (sortBy) {
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'created':
                filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'conversations':
                // 대화 많은 순은 세션 수를 기준으로 정렬
                filtered.sort((a, b) => (b.sessionCount || 0) - (a.sessionCount || 0));
                break;
            case 'recent':
            default:
                filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                break;
        }

        if (prjStatus !== 'all') {
            filtered = filtered.filter(project => project.status === prjStatus);
        }

        return filtered;
    }, [projectList, searchQuery, sortBy, prjStatus]);


    const [editProjectModalStatus, setEditProjectModalStatus] = useState(false);


    const [detailModal, setDetailModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState({
        class_id: 0,
        name: "",
        description: "",
        project_type: "",
        status: "",
        progress_percent: 0,
        practice_hours: 0,
        conversation_count: 0,
        last_activity_at: "",
    });
    const [editProjectInfo, setEditProjectInfo] = useState({
        name: "",
        description: "",
    });


    const [selectedSessionList, setSelectedSessionList] = useState([]);

    const handleProjectClick = async (project) => {
        setSelectedProject(project);
        setEditProjectInfo(project);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${project.project_id}/sessions`,
            { headers: { Authorization: `Bearer ${accessToken}`, }, }
        );
        console.log(res.data);

        const sessionMap = new Map();

        res.data.forEach(session => {
            const sessionId = session.session_id;

            if (!sessionMap.has(sessionId)) {
                sessionMap.set(sessionId, {
                    sessions: [],
                    modelNames: []
                });
            }

            const group = sessionMap.get(sessionId);
            group.sessions.push(session);
            if (!group.modelNames.includes(session.primary_model_name)) {
                group.modelNames.push(session.primary_model_name);
            }
        });

        // 각 session_id 그룹에서 마지막 항목을 선택하고 primary_model_name 배열 추가
        const processedSessions = Array.from(sessionMap.values()).map(group => {
            const lastSession = group.sessions[group.sessions.length - 1];
            return {
                ...lastSession,
                primary_model_name: group.modelNames,
                primary_model_label: group.modelNames.join(', ') // 표시용
            };
        });

        setSelectedSessionList(processedSessions);
        setDetailModal(true);
    }

    const handleCreateProject = async (e) => {
        console.log(savedClassId);
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects`, {
                name: e.target.newProjectName.value,
                description: e.target.newProjectDesc.value,
                class_id: savedClassId
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            setNewProjectModalStatus(false);
            fetchProjectsTrigger();
            showToast2026(`"${e.target.newProjectName.value}" 프로젝트가 생성되었습니다.`, 'success');
            e.target.reset();
        } catch (error) {
            console.error('프로젝트 생성 실패:', error);
            // 에러 발생 시에도 사용자에게 알림을 줄 수 있습니다
        }
    }

    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [contextMenuSessionId, setContextMenuSessionId] = useState(null);

    const showChatContextMenu = useCallback((event, sessionId) => {
        console.log("showChatContextMenu : ", sessionId);
        event.stopPropagation();
        setContextMenuPosition({ left: event.clientX, top: event.clientY });
        setContextMenuSessionId(sessionId);
        setContextMenuOpen(true);
    }, []);

    const closeChatContextMenu = useCallback(() => {
        setContextMenuOpen(false);
        setContextMenuSessionId(null);
    }, []);

    // 외부 클릭 시 컨텍스트 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contextMenuOpen && !e.target.closest('.conversation-card__menu') && !e.target.closest('.context-menu')) {
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

    // 모달이 닫힐 때 컨텍스트 메뉴도 닫기
    useEffect(() => {
        if (!detailModal && contextMenuOpen) {
            closeChatContextMenu();
        }
    }, [detailModal, contextMenuOpen, closeChatContextMenu]);

    const fetchSessionRef = useRef(null);
    const fetchSessionsTrigger = () => {
        if (fetchSessionRef.current) {
            fetchSessionRef.current();
        }
    }

    const handleDeleteChat = useCallback(() => {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${contextMenuSessionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            setSelectedSessionList(prev => prev.filter(session => session.session_id !== contextMenuSessionId));
            fetchSessionsTrigger();
            closeChatContextMenu();
            showToast2026('세션이 삭제되었습니다.');
        }).catch(error => {
            console.error('세션 삭제 실패:', error);
        });
    }, [closeChatContextMenu, contextMenuSessionId, accessToken]);


    const handlePatchProjectStatus = useCallback((project, status) => {
        console.log(project);
        axios.patch(`${process.env.REACT_APP_API_URL}/projects/${project.project_id}`, {
            "class_id": project.class_id,
            "name": project.name,
            "description": project.description,
            "project_type": project.project_type,
            "status": status,
            "progress_percent": project.progress_percent,
            "practice_hours": project.practice_hours,
            "conversation_count": project.conversation_count,
            "last_activity_at": project.last_activity_at,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            if (project.status === 'active') {
                showToast2026(`"${project.name}" 프로젝트가 비활성화되었습니다.`);
            } else {
                showToast2026(`"${project.name}" 프로젝트가 활성화되었습니다.`, 'success');
            }
            fetchProjectsTrigger();
        }).catch(error => {
            console.error('프로젝트 수정 실패:', error);
        });
    })

    const handleEditProject = useCallback(() => {
        console.log(editProjectInfo);
        axios.patch(`${process.env.REACT_APP_API_URL}/projects/${selectedProject.project_id}`, {
            "class_id": editProjectInfo.class_id,
            "name": editProjectInfo.name,
            "description": editProjectInfo.description,
            "project_type": editProjectInfo.project_type,
            "status": editProjectInfo.status,
            "progress_percent": editProjectInfo.progress_percent,
            "practice_hours": editProjectInfo.practice_hours,
            "conversation_count": editProjectInfo.conversation_count,
            "last_activity_at": editProjectInfo.last_activity_at,
        }, {
            headers: { Authorization: `Bearer ${accessToken}`, },
        }).then(response => {
            showToast2026('프로젝트가 수정되었습니다.', 'success');
            fetchProjectsTrigger();
            setEditProjectModalStatus(false);
            setSelectedProject(editProjectInfo);
        }).catch(error => {
            console.error('프로젝트 수정 실패:', error);
        });
    });





    return (
        <>
            <div className="app">
                <UserSidebar2026
                    getProjecList={getProjecList}
                    getSessionList={getSessionList}
                    fetchProjectsRef={fetchProjectsRef}
                    onClassChange={handleClassChange}
                    fetchSessionRef={fetchSessionRef}
                />

                <main className="main">

                    <header className="page-header">
                        <div className="page-header__left">
                            <h1 className="page-header__title">프로젝트 관리</h1>
                        </div>
                    </header>


                    <div className="projects-content">
                        <div className="projects-header">
                            <h2 className="projects-header__title">AI 프로젝트를 생성하고 대화 히스토리를 관리하세요</h2>


                            <div className="search-action-row">
                                <div className="search-box">
                                    <svg className="icon search-box__icon" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="search-box__input"
                                        id="searchInput"
                                        placeholder="프로젝트 이름, 설명으로 검색..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn btn--primary"
                                    onClick={() => { if (savedClassId) { setNewProjectModalStatus(true) } else { showToast2026("강의 선택해주세요.") } }}
                                // onClick={() => alert(`savedClassId : ${savedClassId}`)}
                                >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    새 프로젝트
                                </button>
                            </div>


                            <div className="filter-tabs">
                                <label className="filter-tab">
                                    <input type="radio" name="filter" value="all" checked={prjStatus === 'all'} onChange={(e) => setPrjStatus(e.target.value)} />
                                    <span className="filter-tab__radio"></span>
                                    <span className="filter-tab__text">전체</span>
                                </label>
                                <label className="filter-tab">
                                    <input type="radio" name="filter" value="active" checked={prjStatus === 'active'} onChange={(e) => setPrjStatus(e.target.value)} />
                                    <span className="filter-tab__radio"></span>
                                    <span className="filter-tab__text">활성 프로젝트</span>
                                </label>
                                <label className="filter-tab">
                                    <input type="radio" name="filter" value="inactive" checked={prjStatus === 'inactive'} onChange={(e) => setPrjStatus(e.target.value)} />
                                    <span className="filter-tab__radio"></span>
                                    <span className="filter-tab__text">비활성 프로젝트</span>
                                </label>
                            </div>
                        </div>


                        <div className="toolbar">


                            <select
                                className="toolbar__select"
                                id="sortSelect"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recent">최근 수정순</option>
                                <option value="name">이름순</option>
                                <option value="created">생성일순</option>
                                <option value="chats">대화 수</option>
                            </select>



                            <div className="view-toggle">
                                <button className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`} id="gridViewBtn" title="그리드 보기" onClick={() => setViewMode('grid')}>
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </button>
                                <button className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`} id="listViewBtn" title="목록 보기" onClick={() => setViewMode('list')}>
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                        <line x1="8" y1="12" x2="21" y2="12" />
                                        <line x1="8" y1="18" x2="21" y2="18" />
                                        <line x1="3" y1="6" x2="3.01" y2="6" />
                                        <line x1="3" y1="12" x2="3.01" y2="12" />
                                        <line x1="3" y1="18" x2="3.01" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div className="projects-grid" id="projectsGrid" style={{ display: viewMode === 'grid' ? 'grid' : 'none' }}>

                            {filteredAndSortedProjects.map((project) => (
                                <div className="project-card " key={`grid-${project.project_id}`} onClick={() => handleProjectClick(project)}>
                                    <div className="project-card__header">
                                        <div className="project-card__title-area">
                                            <div className="project-card__title">{project.name}</div>
                                        </div>
                                        <div className="project-card__toggle" >
                                            <button
                                                className={`project-card__toggle-btn ${project.status === 'active' ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePatchProjectStatus(project, project.status === 'active' ? 'inactive' : 'active');
                                                }}
                                            ></button>
                                        </div>
                                    </div>
                                    <div className="project-card__desc">{project.description}</div>
                                    <div className="project-card__footer">
                                        <div className="project-card__stat">
                                            대화 <span className="project-card__stat-value">{sessionList.filter(session => session.project_id === project.project_id).length}개</span>
                                        </div>
                                        <div className="project-card__stat">
                                            총 비용 : <span className="project-card__stat-value">측정 불가</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="projects-list" id="projectsList" style={{ display: viewMode === 'list' ? 'flex' : 'none' }}>

                            {filteredAndSortedProjects.map((project) => (
                                <div className="project-list-item " key={`list-${project.project_id}`} onClick={() => handleProjectClick(project)}>
                                    <div className="project-list-item__icon">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <div className="project-list-item__content">
                                        <div className="project-list-item__title">{project.name}</div>
                                        <div className="project-list-item__meta">
                                            <span className="project-list-item__chat-count">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                {sessionList.filter(session => session.project_id === project.project_id).length}개
                                            </span>
                                            <div className="project-list-item__models">
                                                <span className="project-list-item__model-dot project-list-item__model-dot--gpt"></span><span className="project-list-item__model-dot project-list-item__model-dot--claude"></span><span className="project-list-item__model-dot project-list-item__model-dot--gemini"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="project-list-item__date">{project.created_at}</span>
                                    <span className={`project-list-item__status project-list-item__status--${project.status}`}>
                                        {project.status === 'active' ? '활성화' : '비활성화'}
                                    </span>
                                    <div >
                                        <button className={`project-card__toggle-btn ${project.status === 'active' ? 'active' : ''}`} ></button>
                                    </div>
                                    <div className="project-card__actions" >
                                        <button className="project-card__action" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        <button className="project-card__action project-card__action--danger" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <div className={`modal-overlay ${newProjectModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setNewProjectModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" id="modalTitle">새 프로젝트 만들기</h3>
                        <button className="modal__close" onClick={() => setNewProjectModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" id="modalBody">
                        <form id="createProjectForm" onSubmit={handleCreateProject} style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                                    프로젝트 이름 <span style={{ color: 'var(--error)' }}>*</span>
                                </label>
                                <input type="text" id="newProjectName" placeholder="예: Python 기초 학습" maxLength="50" style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} />
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px' }}>프로젝트를 대표하는 이름 (최대 50자)</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>프로젝트 설명</label>
                                <textarea id="newProjectDesc" placeholder="이 프로젝트에 대해 간단히 설명해주세요..." maxLength="200" rows="3" style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', resize: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <button className="modal__btn" onClick={() => setNewProjectModalStatus(false)}>취소</button>
                                <button
                                    className="modal__btn modal__btn--primary"
                                    form="createProjectForm"
                                    type="submit"
                                >
                                    프로젝트 생성
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            {/* 프로젝트 디테일 모달 */}
            <div className={`modal-overlay ${detailModal ? 'modal-overlay--open' : ''}`}
                onClick={() => {
                    setDetailModal(false);
                    closeChatContextMenu();
                }}
            >
                <div className="modal modal--detail" onClick={(e) => {
                    e.stopPropagation();
                    // 모달 내부 클릭 시 컨텍스트 메뉴 닫기 (메뉴 버튼이나 컨텍스트 메뉴 자체를 클릭한 경우 제외)
                    if (contextMenuOpen && !e.target.closest('.conversation-card__menu') && !e.target.closest('.context-menu')) {
                        closeChatContextMenu();
                    }
                }}>
                    <div className="project-main">
                        <a className="back-link" onClick={() => setDetailModal(false)}>
                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            프로젝트 목록
                        </a>

                        <div className="project-header">
                            <div className="project-header__top">
                                <div className="project-header__info">
                                    <h2 className="project-header__title" id="projectTitle">{selectedProject.name}</h2>
                                    <p className="project-header__desc" id="projectDesc">{selectedProject.description}</p>
                                </div>
                                <div className="project-header__actions">
                                    <button className="btn btn--primary"
                                        onClick={() => showToast2026("준비중입니다.")}
                                    >
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        새 대화
                                    </button>


                                    <button className="project-header__action" title="수정"
                                        onClick={() => setEditProjectModalStatus(true)}
                                    >
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>


                                    <button className="project-header__action project-header__action--active" id="projectPin" title="고정"
                                        onClick={() => showToast2026("준비중입니다.")}
                                    >
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <path d="M12 17v5"></path>
                                            <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.76z"></path>
                                        </svg>
                                    </button>
                                    <button className={`project-header__toggle ${selectedProject.status === 'active' ? 'active' : ''}`} id="projectToggle" ></button>
                                </div>
                            </div>
                        </div>

                        <div className="conversation-list" id="conversationList">
                            {selectedSessionList.length > 0 ? (
                                selectedSessionList.map((session) => (
                                    <div className="conversation-card " key={session.session_id}
                                        onClick={() => {
                                            // SessionClickTrigger();
                                            // if (SessionClickRef.current) {
                                            //     SessionClickRef.current(session.session_id);
                                            // }
                                            navigate(`/user/practice?sessionId=${session.session_id}`);
                                        }}
                                    >
                                        <div className="conversation-card__content">
                                            <div className="conversation-card__header">
                                                <span className="conversation-card__title">{session.title}</span>
                                            </div>
                                            <div className="conversation-card__desc">{session.last_message_preview}</div>
                                        </div>
                                        <div className="conversation-card__right">
                                            <div className="conversation-card__date">{session.last_activity_at.split('T')[0].slice(5)} {session.last_activity_at.split('T')[1].slice(0, 5)}</div>
                                            <button
                                                className="conversation-card__menu"
                                                onClick={(e) => showChatContextMenu(e, session.session_id)}
                                            >
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="12" cy="5" r="1"></circle>
                                                    <circle cx="12" cy="19" r="1"></circle>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-state__icon">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="empty-state__title">대화가 없습니다</div>
                                    <div className="empty-state__desc">새 대화를 시작하여 AI와 대화해보세요</div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>








                {/* 대화 컨텍스트 메뉴 */}
                <div
                    className={`context-menu ${contextMenuOpen ? 'context-menu--open' : ''}`}
                    style={{
                        left: `${contextMenuPosition.left}px`,
                        top: `${contextMenuPosition.top}px`
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="context-menu__item" >
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        이름 변경
                    </div>
                    {/* <div className="context-menu__item" >
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M12 17v5"></path><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.76z"></path></svg>
                        고정 해제
                    </div> */}

                    <div className="context-menu__divider"></div>

                    <div className="context-menu__item context-menu__item--danger"
                        onClick={handleDeleteChat}
                    >
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        삭제
                    </div>
                </div>
            </div>

            <div className={`modal-overlay ${editProjectModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setEditProjectModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" id="modalTitle">프로젝트 수정</h3>
                        <button className="modal__close" onClick={() => setEditProjectModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" id="modalBody">
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                                    프로젝트 이름 <span style={{ color: 'var(--error)' }}>*</span>
                                </label>
                                <input
                                    type="text" id="editProjectName"
                                    value={editProjectInfo.name}
                                    maxLength="50" style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }}
                                    onChange={(e) => setEditProjectInfo({ ...editProjectInfo, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>프로젝트 설명</label>
                                <textarea
                                    id="editProjectDesc"
                                    maxLength="200"
                                    rows="3"
                                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', resize: 'none' }}
                                    value={editProjectInfo.description}
                                    onChange={(e) => setEditProjectInfo({ ...editProjectInfo, description: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <button className="modal__btn" onClick={() => { setEditProjectModalStatus(false); setEditProjectInfo(selectedProject); }}>취소</button>
                                <button className="modal__btn modal__btn--primary" onClick={handleEditProject}>저장</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}