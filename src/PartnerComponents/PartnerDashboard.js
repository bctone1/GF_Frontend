import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';
import './PartnerDashboard.css';

export default function PartnerDashboard() {
    return (
        <>
            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />

                    <main className="main">
                        <div className="dashboard-header">
                            <h1>🏠 대시보드</h1>
                            <p>전체 프로젝트 및 교육 현황을 한눈에 확인하세요</p>
                        </div>


                        <div className="alert-banner">
                            <div className="alert-banner__content">
                                <div className="alert-item">
                                    <div>
                                        <span style={{ fontWeight: 'var(--font-semibold)' }}>💰 정산 완료</span>
                                        <span style={{ color: 'var(--text-secondary)', marginLeft: 'var(--space-2)' }}>
                                            지난 달 39,000,000원이 입금되었습니다
                                        </span>
                                    </div>
                                    <button className="btn btn--sm btn--outline" onClick={() => window.location.href = 'revenue-settlement.html'}>
                                        확인
                                    </button>
                                </div>
                                <div className="alert-item">
                                    <div>
                                        <span style={{ fontWeight: 'var(--font-semibold)' }}>📊 신규 학생 등록</span>
                                        <span style={{ color: 'var(--text-secondary)', marginLeft: 'var(--space-2)' }}>
                                            현대자동차 프로젝트 학생 25명 추가
                                        </span>
                                    </div>
                                    <button className="btn btn--sm btn--outline" onClick={() => window.location.href = 'student-management.html'}>
                                        확인
                                    </button>
                                </div>
                                <div className="alert-item">
                                    <div>
                                        <span style={{ fontWeight: 'var(--font-semibold)' }}>⚠️ API 비용 증가</span>
                                        <span style={{ color: 'var(--text-secondary)', marginLeft: 'var(--space-2)' }}>
                                            학생당 평균 비용이 지난 달 대비 12% 증가
                                        </span>
                                    </div>
                                    <button className="btn btn--sm btn--outline" onClick={() => window.location.href = 'ai-practice-management.html'}>
                                        최적화
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="kpi-grid">

                            <div className="kpi-card">
                                <div className="kpi-card__header">
                                    <div className="kpi-icon kpi-icon--primary">📁</div>
                                    <div className="kpi-trend kpi-trend--up">
                                        <span>↑</span>
                                        <span>50%</span>
                                    </div>
                                </div>
                                <div className="kpi-card__body">
                                    <div className="kpi-label">진행 중 프로젝트</div>
                                    <div className="kpi-value">3</div>
                                    <div className="kpi-detail">
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">총 계약금</span>
                                            <span className="kpi-detail__value">64,100,000원</span>
                                        </div>
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">파트너 수익</span>
                                            <span className="kpi-detail__value">48,075,000원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="kpi-card">
                                <div className="kpi-card__header">
                                    <div className="kpi-icon kpi-icon--secondary">👥</div>
                                    <div className="kpi-trend kpi-trend--up">
                                        <span>↑</span>
                                        <span>24%</span>
                                    </div>
                                </div>
                                <div className="kpi-card__body">
                                    <div className="kpi-label">총 학생 수</div>
                                    <div className="kpi-value">127</div>
                                    <div className="kpi-detail">
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">활성 학생</span>
                                            <span className="kpi-detail__value">123</span>
                                        </div>
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">이번 달 신규</span>
                                            <span className="kpi-detail__value">+25</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="kpi-card">
                                <div className="kpi-card__header">
                                    <div className="kpi-icon kpi-icon--success">💬</div>
                                    <div className="kpi-trend kpi-trend--up">
                                        <span>↑</span>
                                        <span>18%</span>
                                    </div>
                                </div>
                                <div className="kpi-card__body">
                                    <div className="kpi-label">총 대화 수</div>
                                    <div className="kpi-value">31,234</div>
                                    <div className="kpi-detail">
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">학생당 평균</span>
                                            <span className="kpi-detail__value">246</span>
                                        </div>
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">일 평균</span>
                                            <span className="kpi-detail__value">1,038</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="kpi-card">
                                <div className="kpi-card__header">
                                    <div className="kpi-icon kpi-icon--warning">💰</div>
                                    <div className="kpi-trend kpi-trend--up">
                                        <span>↑</span>
                                        <span>24%</span>
                                    </div>
                                </div>
                                <div className="kpi-card__body">
                                    <div className="kpi-label">이번 달 예상 수익</div>
                                    <div className="kpi-value">45.0M</div>
                                    <div className="kpi-detail">
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">파트너 수익률</span>
                                            <span className="kpi-detail__value">75%</span>
                                        </div>
                                        <div className="kpi-detail__item">
                                            <span className="kpi-detail__label">GrowFit 수수료</span>
                                            <span className="kpi-detail__value">25%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="charts-section">

                            <div className="chart-card">
                                <div className="chart-card__header">
                                    <div>
                                        <h2 className="chart-card__title">📊 주간 활동 추이</h2>
                                        <p className="chart-card__subtitle">일별 대화 수 및 사용 시간</p>
                                    </div>
                                    <div className="chart-controls">
                                        <button className="chart-control-btn chart-control-btn--active">주간</button>
                                        <button className="chart-control-btn">월간</button>
                                    </div>
                                </div>
                                <div className="chart-canvas">
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '82%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '75%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">월</div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '88%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '82%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">화</div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '95%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '90%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">수</div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '78%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '72%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">목</div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '92%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '85%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">금</div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '25%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '20%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">토</div>
                                    </div>
                                    <div className="chart-bar-group">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '15%', background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }}></div>
                                            <div className="chart-bar" style={{ height: '10%', background: 'linear-gradient(to top, #8b5cf6, #a78bfa)' }}></div>
                                        </div>
                                        <div className="chart-bar-label">일</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <div style={{ width: '16px', height: '16px', background: 'linear-gradient(to right, #0ea5e9, #38bdf8)', borderRadius: '4px' }}></div>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>대화 수</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <div style={{ width: '16px', height: '16px', background: 'linear-gradient(to right, #8b5cf6, #a78bfa)', borderRadius: '4px' }}></div>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>사용 시간</span>
                                    </div>
                                </div>
                            </div>


                            <div className="chart-card">
                                <div className="chart-card__header">
                                    <div>
                                        <h2 className="chart-card__title">🤖 모델별 사용 분포</h2>
                                        <p className="chart-card__subtitle">전체 대화 중 비율</p>
                                    </div>
                                </div>
                                <div className="donut-chart">
                                    <svg className="donut-svg" viewBox="0 0 200 200">

                                        <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="40" />


                                        <circle cx="100" cy="100" r="80" fill="none"
                                            stroke="#10a37f" strokeWidth="40"
                                            strokeDasharray="201 502"
                                            strokeDashoffset="0"
                                            transform="rotate(-90 100 100)" />


                                        <circle cx="100" cy="100" r="80" fill="none"
                                            stroke="#d97757" strokeWidth="40"
                                            strokeDasharray="226 502"
                                            strokeDashoffset="-201"
                                            transform="rotate(-90 100 100)" />


                                        <circle cx="100" cy="100" r="80" fill="none"
                                            stroke="#4285f4" strokeWidth="40"
                                            strokeDasharray="75 502"
                                            strokeDashoffset="-427"
                                            transform="rotate(-90 100 100)" />


                                        <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1f2937">
                                            31,234
                                        </text>
                                        <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#6b7280">
                                            총 대화
                                        </text>
                                    </svg>

                                    <div className="donut-legend">
                                        <div className="donut-legend-item">
                                            <div className="donut-legend-item__left">
                                                <div className="donut-legend-color" style={{ background: '#d97757' }}></div>
                                                <span className="donut-legend-label">Claude</span>
                                            </div>
                                            <span className="donut-legend-value">45% (14,055)</span>
                                        </div>
                                        <div className="donut-legend-item">
                                            <div className="donut-legend-item__left">
                                                <div className="donut-legend-color" style={{ background: '#10a37f' }}></div>
                                                <span className="donut-legend-label">GPT-4</span>
                                            </div>
                                            <span className="donut-legend-value">40% (12,494)</span>
                                        </div>
                                        <div className="donut-legend-item">
                                            <div className="donut-legend-item__left">
                                                <div className="donut-legend-color" style={{ background: '#4285f4' }}></div>
                                                <span className="donut-legend-label">Gemini</span>
                                            </div>
                                            <span className="donut-legend-value">15% (4,685)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05))', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-4)' }}>
                                <div>
                                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                                        💎 수익 구조 (투명성)
                                    </h2>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                        하이브리드 25% 모델 - API 비용 포함, 추가 비용 없음
                                    </p>
                                </div>
                                <div style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: 'var(--radius-md)', color: 'white', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>
                                    파트너 75%
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-5)' }}>

                                <div>
                                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>총 계약금</span>
                                            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>60,000,000원</span>
                                        </div>

                                        <div style={{ height: '2px', background: 'var(--border)', margin: 'var(--space-3) 0' }}></div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                <div style={{ width: '12px', height: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%' }}></div>
                                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>파트너 수익 (75%)</span>
                                            </div>
                                            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#10b981' }}>45,000,000원</span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                <div style={{ width: '12px', height: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%' }}></div>
                                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>GrowFit 수수료 (25%)</span>
                                            </div>
                                            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#6366f1' }}>15,000,000원</span>
                                        </div>


                                        <div style={{ height: '24px', background: 'var(--surface)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', overflow: 'hidden', display: 'flex' }}>
                                            <div style={{ width: '75%', background: 'linear-gradient(90deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>
                                                75%
                                            </div>
                                            <div style={{ width: '25%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>
                                                25%
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
                                            📊 GrowFit 수수료 구성 (참고)
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>• API 비용 (예상)</span>
                                                <span style={{ fontWeight: 'var(--font-semibold)' }}>6,000,000원</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>• 플랫폼 운영</span>
                                                <span style={{ fontWeight: 'var(--font-semibold)' }}>5,000,000원</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>• 순이익</span>
                                                <span style={{ fontWeight: 'var(--font-semibold)' }}>4,000,000원</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', color: 'white', height: '100%' }}>
                                        <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>✨</div>
                                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)' }}>
                                            간단하고 명확한 수익 구조
                                        </div>
                                        <div style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-4)', opacity: 0.95 }}>
                                            프로젝트 수익의 75%를 가져가세요. API 비용, 시스템 비용 모두 포함. 추가 비용 전혀 없습니다.
                                        </div>

                                        <div style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, marginBottom: 'var(--space-1)' }}>✓ API 무제한 사용</div>
                                            <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, marginBottom: 'var(--space-1)' }}>✓ 예측 가능한 수익</div>
                                            <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9 }}>✓ 비용 걱정 없음</div>
                                        </div>

                                        <div style={{ background: 'rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-1)' }}>
                                                💡 향후 개선 예정
                                            </div>
                                            <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, lineHeight: 1.5 }}>
                                                API 비용 최적화 성공 시 파트너 수익률을 80%로 상향 조정 예정입니다!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                                📁 진행 중 프로젝트
                            </h2>
                        </div>

                        <div className="projects-grid">

                            <div className="project-card">
                                <div className="project-card__header">
                                    <div className="project-status project-status--active">진행 중</div>
                                </div>
                                <div className="project-name">Samsung 마케팅팀 AI 교육</div>
                                <div className="project-client">삼성전자</div>
                                <div className="project-stats">
                                    <div className="project-stat">
                                        <span className="project-stat__label">계약금</span>
                                        <span className="project-stat__value">21.0M</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">파트너 수익</span>
                                        <span className="project-stat__value">15.8M</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">학생 수</span>
                                        <span className="project-stat__value">42명</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">진행률</span>
                                        <span className="project-stat__value">45%</span>
                                    </div>
                                </div>
                            </div>


                            <div className="project-card">
                                <div className="project-card__header">
                                    <div className="project-status project-status--active">진행 중</div>
                                </div>
                                <div className="project-name">LG 개발팀 AI 코딩 실습</div>
                                <div className="project-client">LG전자</div>
                                <div className="project-stats">
                                    <div className="project-stat">
                                        <span className="project-stat__label">계약금</span>
                                        <span className="project-stat__value">15.8M</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">파트너 수익</span>
                                        <span className="project-stat__value">11.9M</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">학생 수</span>
                                        <span className="project-stat__value">35명</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">진행률</span>
                                        <span className="project-stat__value">30%</span>
                                    </div>
                                </div>
                            </div>


                            <div className="project-card">
                                <div className="project-card__header">
                                    <div className="project-status project-status--active">진행 중</div>
                                </div>
                                <div className="project-name">현대자동차 AI 활용 교육</div>
                                <div className="project-client">현대자동차</div>
                                <div className="project-stats">
                                    <div className="project-stat">
                                        <span className="project-stat__label">계약금</span>
                                        <span className="project-stat__value">27.3M</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">파트너 수익</span>
                                        <span className="project-stat__value">20.5M</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">학생 수</span>
                                        <span className="project-stat__value">50명</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat__label">진행률</span>
                                        <span className="project-stat__value">15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="activity-section">

                            <div className="activity-card">
                                <div className="activity-card__header">
                                    <h2 className="activity-card__title">🔔 최근 활동</h2>
                                    <button className="btn btn--sm btn--outline" onClick={() => window.viewAllActivities?.()}>
                                        전체 보기
                                    </button>
                                </div>
                                <div className="activity-card__content">
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--success">✓</div>
                                        <div className="activity-info">
                                            <div className="activity-title">신규 학생 등록</div>
                                            <div className="activity-description">현대자동차 프로젝트에 25명 추가</div>
                                        </div>
                                        <div className="activity-time">2시간 전</div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--primary">💰</div>
                                        <div className="activity-info">
                                            <div className="activity-title">정산 완료</div>
                                            <div className="activity-description">지난 달 39,000,000원 입금</div>
                                        </div>
                                        <div className="activity-time">1일 전</div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--success">📊</div>
                                        <div className="activity-info">
                                            <div className="activity-title">프로젝트 진행률 업데이트</div>
                                            <div className="activity-description">Samsung 프로젝트 45% 완료</div>
                                        </div>
                                        <div className="activity-time">2일 전</div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--warning">⚠️</div>
                                        <div className="activity-info">
                                            <div className="activity-title">API 사용량 증가</div>
                                            <div className="activity-description">평균 비용 12% 상승</div>
                                        </div>
                                        <div className="activity-time">3일 전</div>
                                    </div>
                                </div>
                            </div>


                            <div className="activity-card">
                                <div className="activity-card__header">
                                    <h2 className="activity-card__title">🏆 활동 Top 5 학생</h2>
                                    <button className="btn btn--sm btn--outline" onClick={() => window.location.href = 'student-management.html'}>
                                        전체 보기
                                    </button>
                                </div>
                                <div className="activity-card__content">
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--success">1</div>
                                        <div className="activity-info">
                                            <div className="activity-title">박개발 (LG)</div>
                                            <div className="activity-description">412대화 · 31.7시간</div>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--success">2</div>
                                        <div className="activity-info">
                                            <div className="activity-title">정코더 (LG)</div>
                                            <div className="activity-description">378대화 · 29.4시간</div>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--success">3</div>
                                        <div className="activity-info">
                                            <div className="activity-title">김학생 (Samsung)</div>
                                            <div className="activity-description">347대화 · 28.5시간</div>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--primary">4</div>
                                        <div className="activity-info">
                                            <div className="activity-title">이사원 (Samsung)</div>
                                            <div className="activity-description">289대화 · 23.2시간</div>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon activity-icon--primary">5</div>
                                        <div className="activity-info">
                                            <div className="activity-title">최직원 (현대)</div>
                                            <div className="activity-description">156대화 · 12.8시간</div>
                                        </div>
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