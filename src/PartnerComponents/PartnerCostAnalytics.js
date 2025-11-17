import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';
import './PartnerCostAnalytics.css';

export default function PartnerCostAnalytics() {
    return (
        <>
            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />

                    <main className="main">
                        <div className="main__content">

                            <div className="page-header">
                                <h1 className="page-title">💰 비용 및 사용량 통계</h1>
                                <p className="page-subtitle" id="pageSubtitle">2025 AI 기초과정 - API 사용 비용 및 예산 관리</p>
                            </div>


                            <div className="class-selector-bar" style={{ background: 'var(--background)', border: '2px solid var(--primary-200)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-100)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                                    📚
                                </div>

                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }} htmlFor="classSelect">
                                        강의 선택:
                                    </label>

                                    <select id="classSelect" style={{ flex: 1, maxWidth: '500px', padding: 'var(--space-3) var(--space-4)', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--background)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all var(--transition-base)' }} onChange={(e) => {/* handleClassChange(e.target.value) */ }}>
                                        <optgroup label="진행 중인 강의">
                                            <option value="class001" defaultValue>2025 AI 기초과정 (3일, 20명)</option>
                                            <option value="class002">2025 AI 심화과정 (5일, 15명)</option>
                                            <option value="class003">프롬프트 엔지니어링 (16주, 30명)</option>
                                        </optgroup>
                                        <optgroup label="종료된 강의">
                                            <option value="class004">2024  AI 기초과정 (종료)</option>
                                            <option value="class005">2024 AI 심화과정 (종료)</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--space-4)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                        <span>👥</span>
                                        <span id="classStudentCount" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>20명</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                        <span>📅</span>
                                        <span id="classDuration" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>3일차</span>
                                    </div>
                                </div>
                            </div>


                            <div style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '2px solid #d8b4fe', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-600)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                        🧾
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            GrowFit 이번 달 청구 내역
                                        </h2>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                            플랫폼 사용료(고정) + API 사용료(변동)가 포함된 총 청구 금액입니다
                                        </p>
                                    </div>
                                </div>


                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>

                                    <div className="cost-card" style={{ background: 'white' }}>
                                        <div className="cost-card__header">
                                            <div>
                                                <div className="cost-card__label">플랫폼 사용료 ✅</div>
                                                <div className="cost-card__value" style={{ color: 'var(--primary-600)' }}>$150.00</div>
                                                <div className="cost-card__budget">20명 × 3일 × $2.50</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                                클래스 생성 시 확정
                                            </div>
                                        </div>
                                    </div>


                                    <div className="cost-card" style={{ background: 'white' }}>
                                        <div className="cost-card__header">
                                            <div>
                                                <div className="cost-card__label">API 사용료 📊</div>
                                                <div className="cost-card__value" style={{ color: '#3b82f6' }}>$172.48</div>
                                                <div className="cost-card__budget">실제 사용량 기준</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                                5,200회 사용 · 평균 $0.033/회
                                            </div>
                                        </div>
                                    </div>


                                    <div className="cost-card" style={{ background: 'var(--primary-600)', border: 'none' }}>
                                        <div className="cost-card__header">
                                            <div>
                                                <div className="cost-card__label" style={{ color: 'rgba(255,255,255,0.9)' }}>총 청구액</div>
                                                <div className="cost-card__value" style={{ color: 'white', fontSize: '2.5rem' }}>$322.48</div>
                                                <div className="cost-card__budget" style={{ color: 'rgba(255,255,255,0.8)' }}>플랫폼 + API 합계</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.8)' }}>
                                                교육 종료 후 청구서 발행
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
                                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
                                        📊 청구 금액 구성
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>

                                        <div style={{ padding: 'var(--space-4)', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                                                <span style={{ fontSize: '20px' }}>✅</span>
                                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: '#16a34a' }}>고정 비용 (확정)</span>
                                            </div>
                                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                                                $150.00
                                            </div>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                                • 학생 수: 20명<br />
                                                • 교육 기간: 3일<br />
                                                • 단가: $2.50/학생·일<br />
                                                • 클래스 생성 시 확정
                                            </div>
                                        </div>


                                        <div style={{ padding: 'var(--space-4)', background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: 'var(--radius-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                                                <span style={{ fontSize: '20px' }}>📊</span>
                                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: '#1e40af' }}>변동 비용 (실시간)</span>
                                            </div>
                                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                                                $172.48
                                            </div>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                                • 총 사용: 5,200회<br />
                                                • 평균 단가: $0.033/회<br />
                                                • GPT-4 + Claude + Gemini<br />
                                                • 실제 사용량 기준
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{ padding: 'var(--space-3)', background: '#f0f9ff', borderLeft: '4px solid #3b82f6', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                                            <span style={{ fontSize: '20px' }}>💡</span>
                                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                <strong style={{ color: 'var(--text-primary)' }}>청구 안내:</strong><br />
                                                • <strong>플랫폼 사용료</strong>: 학생 수 × 교육 일수 기준으로 클래스 생성 시 확정됩니다<br />
                                                • <strong>API 사용료</strong>: 실제 AI 사용량(GPT-4, Claude, Gemini) 기준으로 책정됩니다<br />
                                                • 일일 100회 제한으로 예산 초과를 방지합니다<br />
                                                • 청구서는 교육 종료 후 3일 이내 발행됩니다
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
                                📊 API 사용 상세 분석
                            </h3>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                                학생들의 실제 AI 사용 패턴과 비용을 확인하세요
                            </p>


                            <div className="stats-grid">

                                <div className="cost-card">
                                    <div className="cost-card__header">
                                        <div>
                                            <div className="cost-card__label">오늘 API 사용료</div>
                                            <div className="cost-card__value">$24.40</div>
                                            <div className="cost-card__budget">일일 예산: $50.00</div>
                                        </div>
                                    </div>
                                    <div className="cost-card__progress">
                                        <div className="progress">
                                            <div className="progress__bar" style={{ width: '49%' }}></div>
                                        </div>
                                        <small style={{ color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                                            49% 사용 중 (약 850회)
                                        </small>
                                    </div>
                                </div>


                                <div className="cost-card">
                                    <div className="cost-card__header">
                                        <div>
                                            <div className="cost-card__label">이번 주 API 사용료</div>
                                            <div className="cost-card__value">$89.80</div>
                                            <div className="cost-card__budget">주간 예산: $200.00</div>
                                        </div>
                                    </div>
                                    <div className="cost-card__progress">
                                        <div className="progress">
                                            <div className="progress__bar" style={{ width: '45%' }}></div>
                                        </div>
                                        <small style={{ color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                                            45% 사용 중
                                        </small>
                                    </div>
                                </div>


                                <div className="cost-card cost-card--warning">
                                    <div className="cost-card__header">
                                        <div>
                                            <div className="cost-card__label">전체 API 사용료</div>
                                            <div className="cost-card__value">$172.48</div>
                                            <div className="cost-card__budget">예산: $200.00</div>
                                        </div>
                                    </div>
                                    <div className="cost-card__progress">
                                        <div className="progress">
                                            <div className="progress__bar progress__bar--warning" style={{ width: '86%' }}></div>
                                        </div>
                                        <small style={{ color: '#92400e', marginTop: '4px', display: 'block' }}>
                                            ⚠️ 86% 사용 중
                                        </small>
                                    </div>
                                </div>


                                <div className="cost-card">
                                    <div className="cost-card__header">
                                        <div>
                                            <div className="cost-card__label">남은 API 예산</div>
                                            <div className="cost-card__value">$27.52</div>
                                            <div className="cost-card__budget">13.8% 잔여</div>
                                        </div>
                                    </div>
                                    <div className="cost-card__alert">
                                        <span>💡</span>
                                        <span>일일 100회 제한으로 예산 관리 중</span>
                                    </div>
                                </div>
                            </div>


                            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                                🤖 모델별 사용 분석
                            </h3>
                            <div className="model-cost-grid">

                                <div className="model-cost-card">
                                    <div className="model-cost-card__header">
                                        <div className="model-icon model-icon--gpt">⚡</div>
                                        <div className="model-info">
                                            <h3>GPT-4 Turbo</h3>
                                            <small>OpenAI</small>
                                        </div>
                                    </div>
                                    <div className="model-cost-card__cost">$73.92</div>
                                    <div className="model-cost-card__percentage">총 API 사용료의 42.8%</div>
                                    <div className="progress">
                                        <div className="progress__bar" style={{ width: '42.8%', background: '#10a37f' }}></div>
                                    </div>
                                    <div className="model-stats">
                                        <div className="model-stat">
                                            <span className="model-stat__label">호출 수</span>
                                            <span className="model-stat__value">1,314</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">평균 사용료</span>
                                            <span className="model-stat__value">$0.056</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">토큰</span>
                                            <span className="model-stat__value">1.1M</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">사용자</span>
                                            <span className="model-stat__value">16명</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="model-cost-card">
                                    <div className="model-cost-card__header">
                                        <div className="model-icon model-icon--claude">🧠</div>
                                        <div className="model-info">
                                            <h3>Claude 3.5 Sonnet</h3>
                                            <small>Anthropic</small>
                                        </div>
                                    </div>
                                    <div className="model-cost-card__cost">$72.38</div>
                                    <div className="model-cost-card__percentage">총 API 사용료의 41.9%</div>
                                    <div className="progress">
                                        <div className="progress__bar" style={{ width: '41.9%', background: '#d97757' }}></div>
                                    </div>
                                    <div className="model-stats">
                                        <div className="model-stat">
                                            <span className="model-stat__label">호출 수</span>
                                            <span className="model-stat__value">1,455</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">평균 사용료</span>
                                            <span className="model-stat__value">$0.050</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">토큰</span>
                                            <span className="model-stat__value">1.2M</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">사용자</span>
                                            <span className="model-stat__value">17명</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="model-cost-card">
                                    <div className="model-cost-card__header">
                                        <div className="model-icon model-icon--gemini">✨</div>
                                        <div className="model-info">
                                            <h3>Gemini Pro</h3>
                                            <small>Google</small>
                                        </div>
                                    </div>
                                    <div className="model-cost-card__cost">$26.18</div>
                                    <div className="model-cost-card__percentage">총 API 사용료의 15.2%</div>
                                    <div className="progress">
                                        <div className="progress__bar" style={{ width: '15.2%', background: '#4285f4' }}></div>
                                    </div>
                                    <div className="model-stats">
                                        <div className="model-stat">
                                            <span className="model-stat__label">호출 수</span>
                                            <span className="model-stat__value">693</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">평균 사용료</span>
                                            <span className="model-stat__value">$0.038</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">토큰</span>
                                            <span className="model-stat__value">528K</span>
                                        </div>
                                        <div className="model-stat">
                                            <span className="model-stat__label">사용자</span>
                                            <span className="model-stat__value">12명</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="charts-grid">

                                <div className="chart-container">
                                    <div className="chart-header">
                                        <h3 className="chart-title">⏰ 시간대별 API 호출</h3>
                                    </div>
                                    <div className="activity-chart">
                                        <div className="activity-bar" style={{ height: '15%' }}>
                                            <div className="activity-bar__label">09:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '35%' }}>
                                            <div className="activity-bar__label">10:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '65%' }}>
                                            <div className="activity-bar__label">11:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '40%' }}>
                                            <div className="activity-bar__label">12:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '30%' }}>
                                            <div className="activity-bar__label">13:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '95%' }}>
                                            <div className="activity-bar__label">14:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '100%' }}>
                                            <div className="activity-bar__label">15:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '90%' }}>
                                            <div className="activity-bar__label">16:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '60%' }}>
                                            <div className="activity-bar__label">17:00</div>
                                        </div>
                                        <div className="activity-bar" style={{ height: '25%' }}>
                                            <div className="activity-bar__label">18:00</div>
                                        </div>
                                    </div>
                                    <div className="info-box">
                                        <strong>피크 시간:</strong> 오후 2-4시 (전체 요청의 42%)
                                    </div>
                                </div>


                                <div className="chart-container">
                                    <div className="chart-header">
                                        <h3 className="chart-title">📈 일별 비용 추세</h3>
                                    </div>
                                    <table className="cost-trend-table">
                                        <thead>
                                            <tr>
                                                <th>날짜</th>
                                                <th>비용</th>
                                                <th>변화</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>11월 15일 (Day 1)</td>
                                                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>$42.60</td>
                                                <td><span className="trend-badge trend-badge--neutral">시작</span></td>
                                            </tr>
                                            <tr>
                                                <td>11월 16일 (Day 2)</td>
                                                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>$89.80</td>
                                                <td><span className="trend-badge trend-badge--up">↑ 111%</span></td>
                                            </tr>
                                            <tr>
                                                <td>11월 17일 (Day 3)</td>
                                                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>$24.40</td>
                                                <td><span className="trend-badge trend-badge--down">↓ 73%</span></td>
                                            </tr>
                                            <tr style={{ background: 'var(--gray-50)', fontWeight: 600 }}>
                                                <td>총계</td>
                                                <td style={{ fontFamily: 'var(--font-mono)' }}>$156.80</td>
                                                <td><span className="trend-badge trend-badge--neutral">평균 $52.27/일</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <div className="chart-container">
                                    <div className="chart-header">
                                        <h3 className="chart-title">🔄 모델 사용 비율 변화</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
                                                <span style={{ fontWeight: 600 }}>Claude 3.5</span>
                                                <span style={{ fontFamily: 'var(--font-mono)' }}>42% (+5%)</span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress__bar" style={{ width: '42%', background: '#d97757' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
                                                <span style={{ fontWeight: 600 }}>GPT-4</span>
                                                <span style={{ fontFamily: 'var(--font-mono)' }}>38% (-3%)</span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress__bar" style={{ width: '38%', background: '#10a37f' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
                                                <span style={{ fontWeight: 600 }}>Gemini Pro</span>
                                                <span style={{ fontFamily: 'var(--font-mono)' }}>20% (-2%)</span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress__bar" style={{ width: '20%', background: '#4285f4' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-box" style={{ background: '#e0e7ff' }}>
                                        <strong>트렌드:</strong> Claude 사용이 주간 150% 증가 중
                                    </div>
                                </div>


                                <div className="chart-container" style={{ background: 'linear-gradient(to bottom, var(--primary-50), var(--background))' }}>
                                    <div className="chart-header">
                                        <h3 className="chart-title">💡 비용 최적화 제안</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                        <div className="alert alert--info">
                                            <svg className="alert__icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <div className="alert__content">
                                                <div className="alert__title">Gemini Pro 사용 증가 권장</div>
                                                <div className="alert__message">동일 작업에서 Gemini Pro 사용 시 약 34% 비용 절감 가능</div>
                                            </div>
                                        </div>
                                        <div className="alert alert--warning">
                                            <svg className="alert__icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <div className="alert__content">
                                                <div className="alert__title">피크 시간 사용량 분산</div>
                                                <div className="alert__message">오후 2-4시 집중 사용 → 오전 시간대로 일부 이동 권장</div>
                                            </div>
                                        </div>
                                        <div className="alert alert--success">
                                            <svg className="alert__icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <div className="alert__content">
                                                <div className="alert__title">예상 절감액</div>
                                                <div className="alert__message">제안 사항 적용 시 월 $43.20 절감 가능 (약 27%)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                                    <div>
                                        <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                                            👥 학생별 LLM 사용 현황
                                        </h3>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                                            각 학생의 모델 사용 패턴과 비용을 확인하세요
                                        </p>
                                    </div>
                                    <button className="btn btn--outline" >
                                        전체 보기 →
                                    </button>
                                </div>


                                <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: 'var(--gray-50)', borderBottom: '2px solid var(--border)' }}>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>학생명</th>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>총 사용</th>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>GPT-4</th>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>Claude</th>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>Gemini</th>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>선호 모델</th>
                                                <th style={{ padding: 'var(--space-3)', textAlign: 'right', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-secondary)' }}>API 사용료</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--gray-50)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: 'var(--space-3)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: '#fbbf24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>정</div>
                                                        <div>
                                                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>정하늘</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="ff979e919a8a93bf9c90928f9e9186d19c9092">[email&#160;protected]</a></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>234회</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>102회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '44%', background: '#10a37f' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>87회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '37%', background: '#d97757' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>45회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '19%', background: '#4285f4' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span className="badge" style={{ background: '#10a37f20', color: '#10a37f' }}>GPT-4</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'right' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>$16.06</span>
                                                </td>
                                            </tr>

                                            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--gray-50)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: 'var(--space-3)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: '#d1d5db', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>김</div>
                                                        <div>
                                                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>김민수</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="c0ada9aeb3b580a3afadb0a1aeb9eea3afad">[email&#160;protected]</a></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>198회</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>56회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '28%', background: '#10a37f' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>108회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '55%', background: '#d97757' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>34회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '17%', background: '#4285f4' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span className="badge" style={{ background: '#d9775720', color: '#d97757' }}>Claude</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'right' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>$13.64</span>
                                                </td>
                                            </tr>

                                            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--gray-50)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: 'var(--space-3)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: '#f97316', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>이</div>
                                                        <div>
                                                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>이지은</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="573d3e3222391734383a2736392e7934383a">[email&#160;protected]</a></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>176회</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>78회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '44%', background: '#10a37f' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>62회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '35%', background: '#d97757' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>36회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '21%', background: '#4285f4' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span className="badge" style={{ background: '#10a37f20', color: '#10a37f' }}>GPT-4</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'right' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>$11.88</span>
                                                </td>
                                            </tr>

                                            <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--gray-50)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: 'var(--space-3)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--gray-400)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>박</div>
                                                        <div>
                                                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>박서준</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="2f5c4a40455a416f4c40425f4e4156014c4042">[email&#160;protected]</a></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>152회</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>48회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '32%', background: '#10a37f' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>76회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '50%', background: '#d97757' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>28회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '18%', background: '#4285f4' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span className="badge" style={{ background: '#d9775720', color: '#d97757' }}>Claude</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'right' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>$10.12</span>
                                                </td>
                                            </tr>

                                            <tr style={{ transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--gray-50)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: 'var(--space-3)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--gray-400)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>최</div>
                                                        <div>
                                                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>최윤아</div>
                                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6b121e050a2b0804061b0a051245080406">[email&#160;protected]</a></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>143회</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>42회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '29%', background: '#10a37f' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>38회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '27%', background: '#d97757' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>63회</div>
                                                    <div className="progress" style={{ height: '4px' }}>
                                                        <div className="progress__bar" style={{ width: '44%', background: '#4285f4' }}></div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <span className="badge" style={{ background: '#4285f420', color: '#4285f4' }}>Gemini</span>
                                                </td>
                                                <td style={{ padding: 'var(--space-3)', textAlign: 'right' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>$9.46</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <div style={{ marginTop: 'var(--space-4)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
                                    <div style={{ padding: 'var(--space-3)', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>평균 사용</div>
                                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>173회</div>
                                    </div>
                                    <div style={{ padding: 'var(--space-3)', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>최다 사용</div>
                                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>234회</div>
                                    </div>
                                    <div style={{ padding: 'var(--space-3)', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>최소 사용</div>
                                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>85회</div>
                                    </div>
                                    <div style={{ padding: 'var(--space-3)', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>활성 학생</div>
                                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>18/20</div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', padding: 'var(--space-6)', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
                                <button className="btn btn--outline" >
                                    📥 비용 리포트 다운로드
                                </button>
                                <button className="btn btn--outline" >
                                    ⚙️ 예산 설정
                                </button>
                                <button className="btn btn--primary" >
                                    👥 학생별 상세 보기
                                </button>
                            </div>
                        </div>
                    </main>




                </div>
            </div>


        </>
    )
}