import UserSidebar2026 from './UserSidebar2026';
import { useState } from 'react';

export default function UserProject2026() {
    const [projectList, setProjectList] = useState([]);
    const getProjecList = (projectList) => {
        console.log('header에서 받아온 프로젝트 목록 : ', projectList);
        setProjectList(projectList);
    }

    return (
        <>
            <div className="app">
                <UserSidebar2026
                    getProjecList={getProjecList}
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
                                    <input type="text" className="search-box__input" id="searchInput"
                                        placeholder="프로젝트 이름, 설명으로 검색..." />
                                </div>
                                <button className="btn btn--primary" >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    새 프로젝트
                                </button>
                            </div>


                            <div className="filter-tabs">
                                <label className="filter-tab">
                                    <input type="radio" name="filter" value="all" />
                                    <span className="filter-tab__radio"></span>
                                    <span className="filter-tab__text">전체</span>
                                </label>
                                <label className="filter-tab">
                                    <input type="radio" name="filter" value="active" />
                                    <span className="filter-tab__radio"></span>
                                    <span className="filter-tab__text">활성 프로젝트</span>
                                </label>
                                <label className="filter-tab">
                                    <input type="radio" name="filter" value="inactive" />
                                    <span className="filter-tab__radio"></span>
                                    <span className="filter-tab__text">비활성 프로젝트</span>
                                </label>
                            </div>
                        </div>


                        <div className="toolbar">
                            <select className="toolbar__select" id="sortSelect" >
                                <option value="recent">최근 수정순</option>
                                <option value="name">이름순</option>
                                <option value="created">생성일순</option>
                                <option value="chats">대화 수</option>
                            </select>
                            <div className="view-toggle">
                                <button className="view-toggle__btn view-toggle__btn--active" id="gridViewBtn" title="그리드 보기">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </button>
                                <button className="view-toggle__btn" id="listViewBtn" title="목록 보기">
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


                        <div className="projects-grid" id="projectsGrid">

                            {projectList.map((project) => (
                                <div className="project-card " key={project.project_id}>
                                    <div className="project-card__header">
                                        <div className="project-card__title-area">
                                            <div className="project-card__title">{project.name}</div>
                                        </div>
                                        <div className="project-card__toggle" >
                                            <button className="project-card__toggle-btn active"></button>
                                        </div>
                                    </div>
                                    <div className="project-card__desc">{project.description}</div>
                                    <div className="project-card__footer">
                                        <div className="project-card__stat">
                                            대화 <span className="project-card__stat-value">3개</span>
                                        </div>
                                        <div className="project-card__stat">
                                            총 비용 : <span className="project-card__stat-value">000</span>
                                        </div>
                                    </div>
                                </div>
                            ))}


                            <div className="project-card project-card--inactive" >
                                <div className="project-card__header">
                                    <div className="project-card__title-area">
                                        <div className="project-card__title">비활성 프로젝트</div>
                                    </div>
                                    <div className="project-card__toggle" >
                                        <button className="project-card__toggle-btn " ></button>
                                    </div>
                                </div>
                                <div className="project-card__desc">양파는 초점을 흩은 공식적의 합니다. 경우를 묻고 중요하고 보복을 보다.</div>
                                <div className="project-card__footer">
                                    <div className="project-card__stat">
                                        대화 <span className="project-card__stat-value">3개</span>
                                    </div>
                                    <div className="project-card__stat">
                                        총 비용 : <span className="project-card__stat-value">000</span>
                                    </div>
                                </div>
                            </div>


                        </div>


                        <div className="projects-list" id="projectsList" style={{ display: 'none' }}>
                            <div className="project-list-item " >
                                <div className="project-list-item__icon">
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                                <div className="project-list-item__content">
                                    <div className="project-list-item__title">Python 학습</div>
                                    <div className="project-list-item__meta">
                                        <span className="project-list-item__chat-count">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            3개
                                        </span>
                                        <div className="project-list-item__models">
                                            <span className="project-list-item__model-dot project-list-item__model-dot--gpt"></span><span className="project-list-item__model-dot project-list-item__model-dot--claude"></span><span className="project-list-item__model-dot project-list-item__model-dot--gemini"></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="project-list-item__date">2025년 12월 11일</span>
                                <span className="project-list-item__status project-list-item__status--active">
                                    활성화
                                </span>
                                <div >
                                    <button className="project-card__toggle-btn active" ></button>
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

                            <div className="project-list-item " >
                                <div className="project-list-item__icon">
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                                <div className="project-list-item__content">
                                    <div className="project-list-item__title">마케팅 콘텐츠</div>
                                    <div className="project-list-item__meta">
                                        <span className="project-list-item__chat-count">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            3개
                                        </span>
                                        <div className="project-list-item__models">
                                            <span className="project-list-item__model-dot project-list-item__model-dot--gpt"></span><span className="project-list-item__model-dot project-list-item__model-dot--claude"></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="project-list-item__date">2025년 12월 11일</span>
                                <span className="project-list-item__status project-list-item__status--active">
                                    활성화
                                </span>
                                <div >
                                    <button className="project-card__toggle-btn active" ></button>
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

                            <div className="project-list-item " >
                                <div className="project-list-item__icon">
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                                <div className="project-list-item__content">
                                    <div className="project-list-item__title">영어 회화 연습</div>
                                    <div className="project-list-item__meta">
                                        <span className="project-list-item__chat-count">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            3개
                                        </span>
                                        <div className="project-list-item__models">
                                            <span className="project-list-item__model-dot project-list-item__model-dot--gpt"></span><span className="project-list-item__model-dot project-list-item__model-dot--gemini"></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="project-list-item__date">2025년 12월 9일</span>
                                <span className="project-list-item__status project-list-item__status--active">
                                    활성화
                                </span>
                                <div >
                                    <button className="project-card__toggle-btn active" ></button>
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

                            <div className="project-list-item project-list-item--inactive" >
                                <div className="project-list-item__icon">
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                                <div className="project-list-item__content">
                                    <div className="project-list-item__title">비활성 프로젝트</div>
                                    <div className="project-list-item__meta">
                                        <span className="project-list-item__chat-count">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            3개
                                        </span>
                                        <div className="project-list-item__models">
                                            <span className="project-list-item__model-dot project-list-item__model-dot--exaone"></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="project-list-item__date">2025년 12월 6일</span>
                                <span className="project-list-item__status project-list-item__status--inactive">
                                    비활성화
                                </span>
                                <div >
                                    <button className="project-card__toggle-btn " ></button>
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
                        </div>
                    </div>
                </main>


            </div>

        </>
    );
}