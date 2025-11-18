import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

export default function UserDashboard() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />
                    <main className="main">
                        <div className="page-header">
                            <h1 className="page-header__title">🏠 대시보드</h1>
                            <p className="page-header__subtitle">안녕하세요, 김직원님! 오늘도 좋은 하루 되세요 ☀️</p>
                        </div>


                        <div className="quick-actions">
                            <div className="quick-action">
                                <div className="quick-action__icon">💬</div>
                                <div className="quick-action__title">AI 실습 시작</div>
                                <div className="quick-action__desc">대화형 AI로 실습하기</div>
                            </div>

                            <div className="quick-action">
                                <div className="quick-action__icon">📂</div>
                                <div className="quick-action__title">새 프로젝트</div>
                                <div className="quick-action__desc">프로젝트 생성하기</div>
                            </div>

                            <div className="quick-action">
                                <div className="quick-action__icon">🤖</div>
                                <div className="quick-action__title">에이전트 만들기</div>
                                <div className="quick-action__desc">맞춤 AI 에이전트</div>
                            </div>

                            <div className="quick-action">
                                <div className="quick-action__icon">📚</div>
                                <div className="quick-action__title">문서 업로드</div>
                                <div className="quick-action__desc">학습 자료 추가</div>
                            </div>
                        </div>


                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-card__label">총 실습 시간</div>
                                <div className="stat-card__value">24.5시간</div>
                                <div className="stat-card__change">↑ 12% 지난주 대비</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__label">완료한 프로젝트</div>
                                <div className="stat-card__value">8개</div>
                                <div className="stat-card__change">↑ 2개 이번 달</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__label">생성한 에이전트</div>
                                <div className="stat-card__value">5개</div>
                                <div className="stat-card__change">↑ 1개 신규</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__label">업로드한 문서</div>
                                <div className="stat-card__value">23개</div>
                                <div className="stat-card__change">↑ 4개 이번 주</div>
                            </div>
                        </div>


                        <div className="recent-section">
                            <div className="recent-section__header">
                                <h2 className="recent-section__title">🕐 최근 활동</h2>
                                <div className="recent-section__link">전체 보기 →</div>
                            </div>

                            <div className="activity-list">
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <div className="activity-item__icon">💬</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">AI 실습</div>
                                            <div className="activity-item__time">5분 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">📂</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">프로젝트 생성</div>
                                            <div className="activity-item__time">1시간 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">🤖</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">에이전트 생성</div>
                                            <div className="activity-item__time">2시간 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">📚</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">문서 업로드</div>
                                            <div className="activity-item__time">3시간 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">✏️</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">프로젝트 수정</div>
                                            <div className="activity-item__time">어제</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="recent-section">
                            <div className="recent-section__header">
                                <h2 className="recent-section__title">📂 진행 중인 프로젝트</h2>
                                <div className="recent-section__link" >전체 보기 →</div>
                            </div>
                            <div className="projects-grid">
                                <div className="project-card">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">📊</div>
                                    </div>
                                    <div className="project-card__title">마케팅 캠페인 기획</div>
                                    <div className="project-card__desc">소셜 미디어 마케팅 전략 수립</div>
                                </div>

                                <div className="project-card">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">💻</div>
                                    </div>
                                    <div className="project-card__title">Python 학습 프로젝트</div>
                                    <div className="project-card__desc">데이터 분석 기초 마스터하기</div>
                                </div>

                                <div className="project-card">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">✍️</div>
                                    </div>
                                    <div className="project-card__title">블로그 콘텐츠 제작</div>
                                    <div className="project-card__desc">AI 활용 콘텐츠 시리즈</div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div >
            </div >





        </>
    )
}