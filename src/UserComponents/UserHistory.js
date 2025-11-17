import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import './UserHistory.css';


export default function UserHistory() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />


                    <main class="main">

                        <div class="page-header">
                            <div class="page-header__left">
                                <h1>📊 내 기록</h1>
                                <p>AI 실습 활동 내역과 성장 과정을 확인하세요</p>
                            </div>
                            <div class="page-header__actions">
                                <button class="btn btn--outline">
                                    📥 내보내기
                                </button>
                                <button class="btn btn--outline" >
                                    📄 보고서 생성
                                </button>
                            </div>
                        </div>


                        <div class="stats-overview">
                            <div class="stat-card">
                                <div class="stat-card__header">
                                    <div class="stat-icon stat-icon--primary">💬</div>
                                    <div class="stat-trend stat-trend--up">
                                        <span>↑</span>
                                        <span>15%</span>
                                    </div>
                                </div>
                                <div class="stat-card__label">총 대화 수</div>
                                <div class="stat-card__value">847</div>
                                <div class="stat-card__detail">이번 주 +89개 (전주 대비)</div>
                            </div>

                            <div class="stat-card">
                                <div class="stat-card__header">
                                    <div class="stat-icon stat-icon--secondary">⏱️</div>
                                    <div class="stat-trend stat-trend--up">
                                        <span>↑</span>
                                        <span>8%</span>
                                    </div>
                                </div>
                                <div class="stat-card__label">총 실습 시간</div>
                                <div class="stat-card__value">127.5h</div>
                                <div class="stat-card__detail">이번 주 12.4시간</div>
                            </div>

                            <div class="stat-card">
                                <div class="stat-card__header">
                                    <div class="stat-icon stat-icon--accent">🎯</div>
                                    <div class="stat-trend stat-trend--up">
                                        <span>↑</span>
                                        <span>23%</span>
                                    </div>
                                </div>
                                <div class="stat-card__label">병렬 비교 사용</div>
                                <div class="stat-card__value">578</div>
                                <div class="stat-card__detail">전체의 68% 활용</div>
                            </div>

                            <div class="stat-card">
                                <div class="stat-card__header">
                                    <div class="stat-icon stat-icon--purple">🤖</div>
                                    <div class="stat-trend stat-trend--up">
                                        <span>↑</span>
                                        <span>12%</span>
                                    </div>
                                </div>
                                <div class="stat-card__label">에이전트 활용</div>
                                <div class="stat-card__value">234</div>
                                <div class="stat-card__detail">5개 에이전트 사용 중</div>
                            </div>
                        </div>


                        <div class="chart-container">
                            <div class="chart-header">
                                <h2 class="chart-title">📈 주간 활동 추이</h2>
                                <div class="chart-period">
                                    <button class="period-btn" >주간</button>
                                    <button class="period-btn period-btn--active" >월간</button>
                                    <button class="period-btn" >분기</button>
                                </div>
                            </div>
                            <div class="chart-canvas" id="activityChart">
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '45%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">월</div>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '78%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">화</div>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '92%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">수</div>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '65%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">목</div>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '88%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">금</div>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '15%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">토</div>
                                </div>
                                <div class="chart-bar">
                                    <div class="bar-fill" style={{ height: '8%', background: 'linear-gradient(to top, #10b981, #34d399)' }}></div>
                                    <div class="bar-label">일</div>
                                </div>
                            </div>
                        </div>


                        <div class="history-tabs">
                            <button class="history-tab history-tab--active" data-tab="timeline" >
                                <span>📅</span>
                                <span>타임라인</span>
                            </button>
                            <button class="history-tab" data-tab="conversations" >
                                <span>💬</span>
                                <span>대화 기록</span>
                            </button>
                            <button class="history-tab" data-tab="models" >
                                <span>🤖</span>
                                <span>모델별 통계</span>
                            </button>
                        </div>


                        <div id="timelineTab" class="tab-content">
                            <div class="timeline-container">
                                <div class="timeline-header">
                                    <h2 class="timeline-title">📅 활동 타임라인</h2>
                                    <div class="timeline-filters">
                                        <button class="filter-btn filter-btn--active" >전체</button>
                                        <button class="filter-btn" >대화</button>
                                        <button class="filter-btn" >문서</button>
                                        <button class="filter-btn" >에이전트</button>
                                        <button class="filter-btn" >프로젝트</button>
                                    </div>
                                </div>

                                <div class="timeline">

                                    <div class="timeline-item" data-type="conversation">
                                        <div class="timeline-marker timeline-marker--conversation">💬</div>
                                        <div class="timeline-content">
                                            <div class="timeline-content__header">
                                                <div>
                                                    <div class="timeline-content__title">병렬 비교로 Python 리스트 정렬 학습</div>
                                                    <div class="timeline-content__time">2시간 전 • Python 학습 프로젝트</div>
                                                </div>
                                                <span class="timeline-content__badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--employee-primary)' }}>
                                                    완료
                                                </span>
                                            </div>
                                            <div class="timeline-content__body">
                                                GPT-4, Claude, Gemini를 병렬 비교하며 Python 리스트 정렬 방법을 학습했습니다.
                                                sort()와 sorted()의 차이점을 명확히 이해하게 되었습니다.
                                            </div>
                                            <div class="timeline-content__meta">
                                                <span>🤖 3개 모델 사용</span>
                                                <span>💬 12개 대화</span>
                                                <span>⏱️ 23분 소요</span>
                                            </div>
                                            <div class="timeline-content__actions">
                                                <button class="btn btn--sm btn--outline" >
                                                    대화 보기
                                                </button>
                                                <button class="btn btn--sm btn--outline" >
                                                    이어하기
                                                </button>
                                                <button class="btn btn--sm btn--outline" >
                                                    공유
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="timeline-item" data-type="document">
                                        <div class="timeline-marker timeline-marker--document">📄</div>
                                        <div class="timeline-content">
                                            <div class="timeline-content__header">
                                                <div>
                                                    <div class="timeline-content__title">Python 기초 가이드.pdf 업로드</div>
                                                    <div class="timeline-content__time">5시간 전 • Python 학습 프로젝트</div>
                                                </div>
                                                <span class="timeline-content__badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                                    RAG 준비
                                                </span>
                                            </div>
                                            <div class="timeline-content__body">
                                                2.3MB PDF 문서를 업로드하고 RAG 처리를 완료했습니다.
                                                156개 청크로 분할되어 AI 대화에서 활용할 수 있습니다.
                                            </div>
                                            <div class="timeline-content__meta">
                                                <span>📄 2.3 MB</span>
                                                <span>🧩 156 청크</span>
                                            </div>
                                            <div class="timeline-content__actions">
                                                <button class="btn btn--sm btn--outline" >
                                                    문서 보기
                                                </button>
                                                <button class="btn btn--sm btn--outline" >
                                                    AI와 대화
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="timeline-item" data-type="agent">
                                        <div class="timeline-marker timeline-marker--agent">🤖</div>
                                        <div class="timeline-content">
                                            <div class="timeline-content__header">
                                                <div>
                                                    <div class="timeline-content__title">코딩 튜터 에이전트 생성</div>
                                                    <div class="timeline-content__time">어제 • 내 에이전트</div>
                                                </div>
                                                <span class="timeline-content__badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                                                    활성
                                                </span>
                                            </div>
                                            <div class="timeline-content__body">
                                                시니어 개발자 역할의 코딩 튜터 에이전트를 생성했습니다.
                                                친절한 톤과 단계별 설명으로 프로그래밍 학습을 지원합니다.
                                            </div>
                                            <div class="timeline-content__meta">
                                                <span>💬 23회 사용</span>
                                                <span>🎯 Python 특화</span>
                                            </div>
                                            <div class="timeline-content__actions">
                                                <button class="btn btn--sm btn--outline" >
                                                    에이전트 보기
                                                </button>
                                                <button class="btn btn--sm btn--outline" >
                                                    사용하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="timeline-item" data-type="project">
                                        <div class="timeline-marker timeline-marker--project">📁</div>
                                        <div class="timeline-content">
                                            <div class="timeline-content__header">
                                                <div>
                                                    <div class="timeline-content__title">Python 학습 프로젝트 생성</div>
                                                    <div class="timeline-content__time">3일 전 • 내 프로젝트</div>
                                                </div>
                                                <span class="timeline-content__badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                                    진행 중
                                                </span>
                                            </div>
                                            <div class="timeline-content__body">
                                                Python 프로그래밍 학습을 위한 프로젝트를 시작했습니다.
                                                기초부터 고급 개념까지 체계적으로 학습할 계획입니다.
                                            </div>
                                            <div class="timeline-content__meta">
                                                <span>💬 45개 대화</span>
                                                <span>⏱️ 12.5시간</span>
                                            </div>
                                            <div class="timeline-content__actions">
                                                <button class="btn btn--sm btn--outline" >
                                                    프로젝트 보기
                                                </button>
                                                <button class="btn btn--sm btn--outline" >
                                                    계속하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="timeline-item" data-type="conversation">
                                        <div class="timeline-marker timeline-marker--conversation">💬</div>
                                        <div class="timeline-content">
                                            <div class="timeline-content__header">
                                                <div>
                                                    <div class="timeline-content__title">데이터 분석 실습 - Pandas 활용</div>
                                                    <div class="timeline-content__time">5일 전 • 데이터 분석 프로젝트</div>
                                                </div>
                                                <span class="timeline-content__badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--employee-primary)' }}>
                                                    완료
                                                </span>
                                            </div>
                                            <div class="timeline-content__body">
                                                Claude를 활용하여 Pandas 데이터프레임 조작 방법을 학습했습니다.
                                                실제 CSV 데이터를 분석하며 실습했습니다.
                                            </div>
                                            <div class="timeline-content__meta">
                                                <span>🤖 Claude</span>
                                                <span>💬 8개 대화</span>
                                                <span>⏱️ 35분 소요</span>
                                            </div>
                                            <div class="timeline-content__actions">
                                                <button class="btn btn--sm btn--outline" >
                                                    대화 보기
                                                </button>
                                                <button class="btn btn--sm btn--outline" >
                                                    이어하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="conversationsTab" class="tab-content" style={{ display: 'none' }}>
                            <div class="timeline-container">
                                <div class="timeline-header">
                                    <h2 class="timeline-title">💬 전체 대화 기록 (847개)</h2>
                                    <div class="timeline-filters">
                                        <input type="text" placeholder="🔍 대화 검색..." style={{ padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }} />
                                        <select class="filter-btn" style={{ padding: 'var(--space-2) var(--space-3)' }}>
                                            <option>모든 프로젝트</option>
                                            <option>Python 학습</option>
                                            <option>데이터 분석</option>
                                            <option>마케팅</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
                                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>💬</div>
                                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)' }}>
                                        대화 기록이 여기에 표시됩니다
                                    </div>
                                    <div>총 847개의 대화 기록을 보관 중입니다</div>
                                </div>
                            </div>
                        </div>


                        <div id="modelsTab" class="tab-content" style={{ display: 'none' }}>
                            <div class="timeline-container">
                                <div class="timeline-header">
                                    <h2 class="timeline-title">🤖 모델별 사용 통계</h2>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', padding: 'var(--space-4)' }}>
                                    <div style={{ padding: 'var(--space-4)', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🟢</div>
                                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>GPT-4 Turbo</div>
                                        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: '#10a37f', marginBottom: 'var(--space-2)' }}>342</div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>사용 횟수 (40%)</div>
                                        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>평균 응답</span>
                                                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>2.3초</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: 'var(--space-4)', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🟠</div>
                                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>Claude 3.7 Sonnet</div>
                                        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: '#d97757', marginBottom: 'var(--space-2)' }}>389</div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>사용 횟수 (46%)</div>
                                        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>평균 응답</span>
                                                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>1.8초</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: 'var(--space-4)', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🔵</div>
                                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>Gemini Pro</div>
                                        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: '#4285f4', marginBottom: 'var(--space-2)' }}>116</div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>사용 횟수 (14%)</div>
                                        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>평균 응답</span>
                                                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>3.1초</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="achievementsTab" class="tab-content" style={{ display: 'none' }}>
                            <div class="timeline-container">
                                <div class="timeline-header">
                                    <h2 class="timeline-title">🏆 성취 기록 및 배지</h2>
                                </div>
                                <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
                                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🏆</div>
                                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)' }}>
                                        성취 시스템 준비 중
                                    </div>
                                    <div>열심히 학습하고 배지를 획득하세요!</div>
                                </div>
                            </div>
                        </div>
                    </main>




                </div>
            </div>

        </>
    )
}