import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';


export default function UserProject() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />


                    <main className="main">

                        <div className="page-header">
                            <div>
                                <h1 className="page-title">📁 내 프로젝트</h1>
                                <p className="page-subtitle">AI 실습을 프로젝트별로 조직화하고 관리하세요</p>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                <button className="btn btn--outline" >
                                    📥 가져오기
                                </button>
                                <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} >
                                    ➕ 새 프로젝트
                                </button>
                            </div>
                        </div>


                        <div className="project-tabs">
                            <button className="project-tab project-tab--active" data-tab="all" >
                                <span>전체 프로젝트</span>
                                <span className="project-tab__badge">8</span>
                            </button>
                            <button className="project-tab" data-tab="personal" >
                                <span>🙋 개인 프로젝트</span>
                                <span className="project-tab__badge">5</span>
                            </button>
                            <button className="project-tab" data-tab="team" >
                                <span>👥 팀 프로젝트</span>
                                <span className="project-tab__badge">3</span>
                            </button>
                            <button className="project-tab" data-tab="archived" >
                                <span>📦 보관됨</span>
                                <span className="project-tab__badge">2</span>
                            </button>
                        </div>


                        <div className="filter-bar">
                            <div className="filter-group">
                                <select className="filter-select" id="sortBy" onchange="sortProjects(this.value)">
                                    <option value="recent">최근 수정순</option>
                                    <option value="name">이름순</option>
                                    <option value="created">생성일순</option>
                                    <option value="conversations">대화 많은 순</option>
                                </select>
                                <select className="filter-select" id="filterModel" onchange="filterByModel(this.value)">
                                    <option value="all">모든 모델</option>
                                    <option value="gpt">GPT-4만</option>
                                    <option value="claude">Claude만</option>
                                    <option value="gemini">Gemini만</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="🔍 프로젝트 검색..."
                                id="searchInput"
                                onkeyup="searchProjects(this.value)"
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

                            <div className="project-card project-card--empty" >
                                <div className="project-card--empty__icon">➕</div>
                                <div className="project-card--empty__text">새 프로젝트 만들기</div>
                                <div className="project-card--empty__desc">AI 실습을 시작하세요</div>
                            </div>


                            <div className="project-card project-card--personal" >
                                <h3 className="project-card__title">Python 기초 학습</h3>
                                <p className="project-card__description">
                                    Python 프로그래밍의 기초부터 고급 개념까지 체계적으로 학습하는 프로젝트
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
                                    <div className="project-card__date">2시간 전</div>
                                </div>
                            </div>


                            <div className="project-card project-card--personal" >
                                <h3 className="project-card__title">데이터 분석 실습</h3>
                                <p className="project-card__description">
                                    Pandas와 NumPy를 활용한 데이터 분석 및 시각화 프로젝트
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 5개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Claude</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">어제</div>
                                </div>
                            </div>


                            <div className="project-card project-card--team" >
                                <h3 className="project-card__title">마케팅 콘텐츠 생성</h3>
                                <p className="project-card__description">
                                    AI를 활용한 소셜미디어 콘텐츠 및 마케팅 카피 작성 프로젝트
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 15개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Claude</span>
                                    <span className="project-tag">Gemini</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">1시간 전</div>
                                </div>
                            </div>


                            <div className="project-card project-card--personal" >
                                <h3 className="project-card__title">머신러닝 기초</h3>
                                <p className="project-card__description">
                                    머신러닝의 기본 개념과 알고리즘을 학습하는 프로젝트
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 6개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Claude</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">3일 전</div>
                                </div>
                            </div>


                            <div className="project-card project-card--team" >
                                <h3 className="project-card__title">코드 리뷰 자동화</h3>
                                <p className="project-card__description">
                                    AI를 활용한 코드 리뷰 및 개선 제안 시스템 구축
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 12개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Claude</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">5시간 전</div>
                                </div>
                            </div>


                            <div className="project-card project-card--personal" >
                                <h3 className="project-card__title">웹 스크래핑 실습</h3>
                                <p className="project-card__description">
                                    BeautifulSoup과 Selenium을 활용한 웹 데이터 수집
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 4개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Gemini</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">1주일 전</div>
                                </div>
                            </div>


                            <div className="project-card project-card--team" >
                                <h3 className="project-card__title">고객 분석 프로젝트</h3>
                                <p className="project-card__description">
                                    고객 리뷰 감성 분석 및 인사이트 도출 프로젝트
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 10개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Claude</span>
                                    <span className="project-tag">Gemini</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">2일 전</div>
                                </div>
                            </div>


                            <div className="project-card project-card--personal" >
                                <h3 className="project-card__title">업무 자동화</h3>
                                <p className="project-card__description">
                                    반복 업무 자동화를 위한 스크립트 개발 프로젝트
                                </p>
                                <div className="project-card__meta">
                                    <span className="project-meta-item">
                                        <span>💬</span>
                                        <span>대화방 3개</span>
                                    </span>
                                </div>
                                <div className="project-tags">
                                    <span className="project-tag">GPT-4</span>
                                    <span className="project-tag">Claude</span>
                                </div>
                                <div className="project-card__footer">
                                    <div className="project-card__date">5일 전</div>
                                </div>
                            </div>



                        </div>


                        <div id="projectsList" className="projects-list" style={{ display: 'none' }}>

                        </div>
                    </main>

                </div >
            </div >
        </>
    )
}