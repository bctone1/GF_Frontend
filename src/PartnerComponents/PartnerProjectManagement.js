import { useState } from 'react';

import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';

export default function PartnerProjectManagement() {

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div id="createProjectModal" className={`modal ${showModal ? 'modal--active' : ''}`}>
                <div className="modal__content modal__content--large">
                    <div className="modal__header">
                        <h2 className="modal__title">📁 신규 강의 생성</h2>
                        <button className="modal__close" onClick={() => setShowModal(false)}>✕</button>
                    </div>
                    <div className="modal__body">
                        <form id="createProjectForm">

                            <div className="form-section">
                                <h3 className="form-section-title">📋 기본 정보</h3>
                                <div className="form-group">
                                    <label for="projectName">강의명 <span className="required">*</span></label>
                                    <input type="text" id="projectName" placeholder="예: 2025 AI 기초과정" />
                                </div>
                            </div>


                            <div className="form-section">
                                <h3 className="form-section-title">🤖 사용할 LLM 모델</h3>
                                <div className="llm-selection">
                                    <label className="llm-checkbox">
                                        <input type="checkbox" name="llm" value="chatgpt" checked
                                            onchange="updateCostEstimate()" />
                                        <div className="llm-card">
                                            <div className="llm-icon">🟢</div>
                                            <div className="llm-info">
                                                <div className="llm-name">ChatGPT-4</div>
                                            </div>
                                            <div className="llm-checkmark">✓</div>
                                        </div>
                                    </label>
                                    <label className="llm-checkbox">
                                        <input type="checkbox" name="llm" value="claude" checked
                                            onchange="updateCostEstimate()" />
                                        <div className="llm-card">
                                            <div className="llm-icon">🟣</div>
                                            <div className="llm-info">
                                                <div className="llm-name">Claude 3.5</div>
                                            </div>
                                            <div className="llm-checkmark">✓</div>
                                        </div>
                                    </label>
                                    <label className="llm-checkbox">
                                        <input type="checkbox" name="llm" value="gemini" checked
                                            onchange="updateCostEstimate()" />
                                        <div className="llm-card">
                                            <div className="llm-icon">🔵</div>
                                            <div className="llm-info">
                                                <div className="llm-name">Gemini Pro</div>
                                            </div>
                                            <div className="llm-checkmark">✓</div>
                                        </div>
                                    </label>
                                </div>
                            </div>


                            <div className="form-section">
                                <h3 className="form-section-title">📅 교육 설정</h3>
                                <div className="form-group">
                                    <label for="studentCount">수강 학생 수 <span className="required">*</span></label>
                                    <input type="number" id="studentCount" placeholder="20" min="1" required
                                        oninput="updateCostEstimate()" />
                                </div>
                                <div className="form-group form-group--inline">
                                    <div>
                                        <label for="startDate">교육 시작일 <span className="required">*</span></label>
                                        <input type="date" id="startDate" required onchange="updateCostEstimate()" />
                                    </div>
                                    <div>
                                        <label for="endDate">교육 종료일 <span className="required">*</span></label>
                                        <input type="date" id="endDate" required onchange="updateCostEstimate()" />
                                    </div>
                                </div>
                                <div className="training-days-info" id="trainingDaysInfo" style={{ display: "none" }}>
                                    <span className="training-days-icon">📆</span>
                                    <span className="training-days-text">총 교육 기간: <strong id="trainingDays">0</strong>일</span>
                                </div>
                            </div>


                            <div className="form-section">
                                <h3 className="form-section-title">📝 강의 설명 (선택)</h3>
                                <div className="form-group">
                                    <textarea id="projectDescription" placeholder="강의에 대한 간단한 설명을 입력하세요..." rows="3"></textarea>
                                </div>
                            </div>


                            {/* <div className="cost-estimate-section">
                                <h3 className="cost-estimate-title">💰 예상 비용 계산</h3>
                                <div className="cost-breakdown">
                                    <div className="cost-row">
                                        <span className="cost-label">
                                            <span className="cost-icon">💳</span>
                                            플랫폼 사용료
                                        </span>
                                        <span className="cost-value" id="costPlatformFee">0원</span>
                                    </div>
                                    <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × <span
                                        id="platformFeeStudents">0</span>명</p>

                                    <div className="cost-divider"></div>

                                    <div className="cost-row">
                                        <span className="cost-label">
                                            <span className="cost-icon">🤖</span>
                                            API 사용료 (예상)
                                        </span>
                                        <span className="cost-value" id="costAPIFee">0원</span>
                                    </div>
                                    <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × <span
                                        id="apiFeeTrainingDays">0</span>일 (70% 사용률 가정)</p>

                                    <div className="cost-divider"></div>

                                    <div className="cost-row cost-row--total">
                                        <span className="cost-label">
                                            <span className="cost-icon">💰</span>
                                            총 예상 비용
                                        </span>
                                        <span className="cost-value cost-value--total" id="costTotalCost">0원</span>
                                    </div>
                                </div>

                                <div className="cost-details">
                                    <div className="cost-detail-item">
                                        <span className="cost-detail-label">선택된 LLM</span>
                                        <span className="cost-detail-value" id="selectedLLMCount">3개</span>
                                    </div>
                                    <div className="cost-detail-item">
                                        <span className="cost-detail-label">예상 토큰 사용량</span>
                                        <span className="cost-detail-value" id="estimatedTokens">0 tokens</span>
                                    </div>
                                    <div className="cost-detail-item">
                                        <span className="cost-detail-label">1인당 일평균 실습</span>
                                        <span className="cost-detail-value">100회</span>
                                    </div>
                                </div>

                                <div className="cost-warning">
                                    <span className="cost-warning-icon">⚠️</span>
                                    <span className="cost-warning-text">API 사용료는 실제 사용량에 따라 변동될 수 있습니다</span>
                                </div>
                            </div> */}
                        </form>
                    </div>
                    <div className="modal__footer">
                        <button className="btn btn--outline" >취소</button>
                        <button className="btn btn--primary" >
                            <span>✓</span> 강의 생성
                        </button>
                    </div>
                </div>
            </div>

            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />

                    <main className="main">
                        <div className="main__content">

                            {/* <div className="page-header">
                                <h1 className="page-title">📁 강의 관리</h1>
                                <p className="page-subtitle">교육 프로젝트 생성 및 관리</p>
                            </div> */}


                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
                                <button className="btn btn--primary" onClick={() => setShowModal(true)}>
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