import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import { useState, useEffect } from 'react';
import { getSelectedClassId } from '../utill/utill';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserProject() {
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("access_token");
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());
    const [projectList, setProjectList] = useState([]);

    const fetchProjects = async (classId) => {
        // 클래스가 선택되지 않으면 프로젝트를 표시하지 않음
        if (!classId) {
            setProjectList([]);
            return;
        }

        try {
            const url = `${process.env.REACT_APP_API_URL}/projects?class_id=${classId}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            console.log(response.data.items);
            // API가 클래스 필터링을 지원하지 않는 경우 클라이언트 측에서 필터링
            const projects = response.data.items || [];
            const filteredProjects = projects.filter(project => String(project.class_id) === String(classId));
            setProjectList(filteredProjects);
        } catch (error) {
            console.error('프로젝트 조회 실패:', error);
            setProjectList([]);
        }
    }

    useEffect(() => {
        const currentClassId = getSelectedClassId();
        setSavedClassId(currentClassId);
        fetchProjects(currentClassId);
    }, []);

    // 클래스 변경 핸들러
    const handleClassChange = (classId, allowedModelIds) => {
        setSavedClassId(classId);
        fetchProjects(classId);
    };


    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects`, {
                name: e.target.projectName.value,
                description: e.target.projectDescription.value,
                class_id: savedClassId
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            // 폼 초기화
            e.target.reset();
            fetchProjects(savedClassId);
            setModalStatus(false);
        } catch (error) {
            console.error('프로젝트 생성 실패:', error);
            // 에러 발생 시에도 사용자에게 알림을 줄 수 있습니다
        }
    }

    const [modalStatus, setModalStatus] = useState(false);
    const [sessionModalStatus, setSessionModalStatus] = useState(false);
    const [selectedProject, setSelectedProject] = useState([]);

    const [sessionList, setSessionList] = useState([]);

    const handleProjectClick = async (project) => {
        setSelectedProject(project);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${project.project_id}/sessions`,
            { headers: { Authorization: `Bearer ${accessToken}`, }, }
        );
        console.log(res.data);


        // session_id별로 그룹화하고 가공
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

        setSessionList(processedSessions);
        setSessionModalStatus(true);
    };

    const handleStartNewSession = () => {
        console.log('새 대화 시작:', selectedProject.project_id);
        navigate(`/user/practice?projectId=${selectedProject.project_id}`);
    };

    const handleSessionClick = (sessionId) => {
        console.log('세션 클릭:', sessionId);
        // UserPractice로 이동하면서 세션 ID를 쿼리 파라미터로 전달
        navigate(`/user/practice?sessionId=${sessionId}`);
    };



    return (
        <>
            <div id="createProjectModal" className={`modal-overlay ${modalStatus ? 'modal-overlay--active' : ''}`}>
                <div className="modal-container">
                    <div className="modal-header">
                        <h2 className="modal-title">새 프로젝트 만들기</h2>
                        <button className="modal-close" onClick={() => setModalStatus(false)}>✕</button>
                    </div>
                    <div className="modal-body">
                        <form id="createProjectForm" onSubmit={handleCreateProject}>

                            <div className="form-group">
                                <label className="form-label">
                                    프로젝트 이름 <span className="required">*</span>
                                </label>
                                <input type="text" name="projectName" className="form-input" placeholder="예: Python 기초 학습" required="" maxLength="50" />
                                <div className="form-hint">프로젝트를 대표하는 이름을 입력하세요 (최대 50자)</div>
                            </div>


                            <div className="form-group">
                                <label className="form-label">프로젝트 설명</label>
                                <textarea name="projectDescription" className="form-textarea" placeholder="이 프로젝트에 대해 간단히 설명해주세요..." rows="3" maxLength="200" />
                                <div className="form-hint">프로젝트의 목적과 내용을 설명하세요 (최대 200자)</div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn--secondary" onClick={() => setModalStatus(false)}>
                            취소
                        </button>
                        <button type="submit" form="createProjectForm" className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} >
                            프로젝트 생성
                        </button>
                    </div>
                </div>
            </div>

            {/* 세션 리스트 모달 */}
            <div id="sessionListModal" className={`modal-overlay ${sessionModalStatus ? 'modal-overlay--active' : ''}`} onClick={(e) => {
                if (e.target.id === 'sessionListModal') {
                    setSessionModalStatus(false);
                }
            }}>
                <div className="modal-container" style={{ maxWidth: '700px' }}>
                    <div className="modal-header">
                        <h2 className="modal-title">{selectedProject?.name || '프로젝트'}</h2>
                        <button className="modal-close" onClick={() => setSessionModalStatus(false)}>✕</button>
                    </div>
                    <div className="modal-body">
                        <button
                            type="button"
                            className="btn btn--primary"
                            style={{
                                background: 'var(--employee-primary)',
                                width: '100%',
                                marginBottom: 'var(--space-6)',
                                padding: 'var(--space-3) var(--space-4)'
                            }}
                            onClick={handleStartNewSession}
                        >
                            ➕ 새 대화 시작
                        </button>

                        <div className="session-list">
                            <h3 style={{
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-semibold)',
                                color: 'var(--text-secondary)',
                                marginBottom: 'var(--space-3)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                대화 목록
                            </h3>
                            {sessionList.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                    {sessionList.map((session) => (
                                        <div
                                            key={session.session_id}
                                            className="session-item"
                                            onClick={() => handleSessionClick(session.session_id)}
                                            style={{
                                                padding: 'var(--space-4)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                background: 'var(--background)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--employee-primary)';
                                                e.currentTarget.style.background = 'var(--surface)';
                                                e.currentTarget.style.transform = 'translateX(4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--border)';
                                                e.currentTarget.style.background = 'var(--background)';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-2)' }}>
                                                <h4 style={{
                                                    fontSize: 'var(--text-base)',
                                                    fontWeight: 'var(--font-semibold)',
                                                    color: 'var(--text-primary)',
                                                    margin: 0
                                                }}>
                                                    {session.title}
                                                </h4>
                                                <span style={{
                                                    padding: '2px 8px',
                                                    background: 'var(--surface)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    fontSize: 'var(--text-xs)',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    {session.primary_model_label}
                                                </span>
                                            </div>
                                            <p style={{
                                                fontSize: 'var(--text-sm)',
                                                color: 'var(--text-secondary)',
                                                margin: '0 0 var(--space-2) 0',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {session.last_message_preview}
                                            </p>
                                            <div style={{
                                                fontSize: 'var(--text-xs)',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {session.last_activity_at.split('T')[0].slice(5)} {session.last_activity_at.split('T')[1].slice(0, 5)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: 'var(--space-8)',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <p>아직 대화가 없습니다.</p>
                                    <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                                        "새 대화 시작" 버튼을 눌러 대화를 시작하세요.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar onClassChange={handleClassChange} />
                    <main className="main">
                        <div className="filter-bar">
                            <div className="user-project-filter-group">
                                <select className="filter-select" id="sortBy">
                                    <option value="recent">최근 수정순</option>
                                    <option value="name">이름순</option>
                                    <option value="created">생성일순</option>
                                    <option value="conversations">대화 많은 순</option>
                                </select>
                                <select className="filter-select" id="filterModel">
                                    <option value="all">모든 모델</option>
                                    <option value="gpt">GPT-4만</option>
                                    <option value="claude">Claude만</option>
                                    <option value="gemini">Gemini만</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="프로젝트 검색..."
                                id="searchInput"
                            />
                            <div className="view-switcher">
                                <button className="view-btn view-btn--active" title="그리드 뷰">
                                    ⊞
                                </button>
                                <button className="view-btn" title="리스트 뷰">
                                    ☰
                                </button>
                            </div>
                        </div>


                        <div id="projectsGrid" className="projects-grid">

                            <div className="project-card project-card--empty" onClick={() => setModalStatus(true)}>
                                <div className="project-card--empty__icon">➕</div>
                                <div className="project-card--empty__text">새 프로젝트 만들기</div>
                                <div className="project-card--empty__desc">AI 실습을 시작하세요</div>
                            </div>

                            {projectList.map((project) => {
                                return (
                                    <div className="project-card project-card--personal" onClick={() => handleProjectClick(project)} key={project.project_id}>
                                        <h3 className="project-card__title">{project.name}</h3>
                                        <p className="project-card__description">
                                            {project.description}
                                        </p>
                                        <div className="project-card__meta">
                                            <span className="project-meta-item">
                                                <span>💬</span>
                                                <span>대화방 8개</span>
                                            </span>
                                        </div>
                                        <div className="project-tags">
                                            <span className="project-tag">GPT-4</span>
                                            <span className="project-tag">Claude</span>
                                            <span className="project-tag">Gemini</span>
                                        </div>
                                        <div className="project-card__footer">
                                            <div className="project-card__date">{project.updated_at.split('T')[0]} {project.updated_at.split('T')[1].split('.')[0]}</div>
                                        </div>
                                    </div>
                                )
                            })}



                        </div>


                        <div id="projectsList" className="projects-list" style={{ display: 'none' }}>

                        </div>
                    </main>

                </div >
            </div >
        </>
    )
}