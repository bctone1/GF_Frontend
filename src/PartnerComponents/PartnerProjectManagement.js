import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';



export default function PartnerProjectManagement() {
    return (
        <>
            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />

                    <main className="main">
                        <div className="main__content">

                            <div className="page-header">
                                <h1 className="page-title">📁 강의 관리</h1>
                                <p className="page-subtitle">교육 프로젝트 생성 및 관리</p>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
                                <button className="btn btn--primary" >
                                    <span>➕</span>
                                    <span>신규 강의 생성</span>
                                </button>
                            </div>


                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--primary">📁</div>
                                    </div>
                                    <div className="stat-card__label">전체 강의</div>
                                    <div className="stat-card__value">3개</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--success">🚀</div>
                                    </div>
                                    <div className="stat-card__label">진행 중</div>
                                    <div className="stat-card__value">3개</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--secondary">✅</div>
                                    </div>
                                    <div className="stat-card__label">종료됨</div>
                                    <div className="stat-card__value">0개</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--warning">👥</div>
                                    </div>
                                    <div className="stat-card__label">총 학생 수</div>
                                    <div className="stat-card__value">127명</div>
                                </div>
                            </div>


                            <div className="projects-grid">

                                <div className="project-card" data-project-id="proj-1" data-status="active">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">🏢</div>
                                        <div className="project-card__status project-card__status--active">
                                            <span className="status-dot"></span>
                                            진행 중
                                        </div>
                                    </div>

                                    <h3 className="project-card__title">2025 AI 기초과정</h3>

                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>💰</span>
                                            <span>20,000,000원</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>👥</span>
                                            <span>20명</span>
                                        </div>
                                    </div>
                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>📅</span>
                                            <span>2025-01-01 ~ 2025-02-28</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>⏰</span>
                                            <span>D-15 남음</span>
                                        </div>
                                    </div>

                                    <div className="project-settlement">
                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                <span className="cost-icon">💳</span>
                                                플랫폼 사용료
                                            </span>
                                            <span className="settlement-value">100,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × 20명</p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                <span className="cost-icon">🤖</span>
                                                API 사용료 (예상)
                                            </span>
                                            <span className="settlement-value">1,200,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × 59일 (70% 사용률 가정)
                                        </p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row settlement-row--total">
                                            <span className="settlement-label">
                                                <span className="cost-icon">💰</span>
                                                총 예상 비용
                                            </span>
                                            <span className="settlement-value">1,300,000원</span>
                                        </div>
                                    </div>

                                    <div className="project-card__actions">
                                        <button className="project-action-btn project-action-btn--primary">
                                            📊 상세보기
                                        </button>
                                        <button className="project-action-btn" >
                                            👥 학생관리
                                        </button>
                                    </div>
                                </div>


                                <div className="project-card" data-project-id="proj-2" data-status="active">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">🏢</div>
                                        <div className="project-card__status project-card__status--active">
                                            <span className="status-dot"></span>
                                            진행 중
                                        </div>
                                    </div>

                                    <h3 className="project-card__title">2025 AI 심화과정</h3>

                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>💰</span>
                                            <span>15,000,000원</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>👥</span>
                                            <span>15명</span>
                                        </div>
                                    </div>
                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>📅</span>
                                            <span>2025-01-15 ~ 2025-03-15</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>⏰</span>
                                            <span>D-48 남음</span>
                                        </div>
                                    </div>

                                    <div className="project-settlement">
                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                <span className="cost-icon">💳</span>
                                                플랫폼 사용료
                                            </span>
                                            <span className="settlement-value">75,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × 15명</p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                <span className="cost-icon">🤖</span>
                                                API 사용료 (예상)
                                            </span>
                                            <span className="settlement-value">850,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × 60일 (70% 사용률 가정)
                                        </p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row settlement-row--total">
                                            <span className="settlement-label">
                                                <span className="cost-icon">💰</span>
                                                총 예상 비용
                                            </span>
                                            <span className="settlement-value">925,000원</span>
                                        </div>
                                    </div>

                                    <div className="project-card__actions">
                                        <button className="project-action-btn project-action-btn--primary">
                                            📊 상세보기
                                        </button>
                                        <button className="project-action-btn" >
                                            👥 학생관리
                                        </button>
                                    </div>
                                </div>


                                <div className="project-card" data-project-id="proj-3" data-status="active">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">🏢</div>
                                        <div className="project-card__status project-card__status--active">
                                            <span className="status-dot"></span>
                                            진행 중
                                        </div>
                                    </div>

                                    <h3 className="project-card__title">프롬프트 엔지니어링</h3>

                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>💰</span>
                                            <span>25,000,000원</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>👥</span>
                                            <span>30명</span>
                                        </div>
                                    </div>
                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>📅</span>
                                            <span>2025-02-01 ~ 2025-04-30</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>⏰</span>
                                            <span>D-95 남음</span>
                                        </div>
                                    </div>

                                    <div className="project-settlement">
                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                <span className="cost-icon">💳</span>
                                                플랫폼 사용료
                                            </span>
                                            <span className="settlement-value">150,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × 30명</p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                <span className="cost-icon">🤖</span>
                                                API 사용료 (예상)
                                            </span>
                                            <span className="settlement-value">1,890,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × 89일 (70% 사용률 가정)
                                        </p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row settlement-row--total">
                                            <span className="settlement-label">
                                                <span className="cost-icon">💰</span>
                                                총 예상 비용
                                            </span>
                                            <span className="settlement-value">2,040,000원</span>
                                        </div>
                                    </div>

                                    <div className="project-card__actions">
                                        <button className="project-action-btn project-action-btn--primary">
                                            📊 상세보기
                                        </button>
                                        <button className="project-action-btn" >
                                            👥 학생관리
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>



                </div>
            </div>

        </>
    )
}