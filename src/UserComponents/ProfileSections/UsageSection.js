import React from 'react';

export default function UsageSection() {
    return (
        <div id="usageSection" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">사용량 통계</h2>
            <p className="user-settings-section__desc">서비스 사용 현황을 확인하세요</p>

            <div className="stats-card">
                <div className="stats-card__title">📊 이번 달 사용량</div>
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-item__value">24.5시간</div>
                        <div className="stat-item__label">총 실습 시간</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-item__value">156회</div>
                        <div className="stat-item__label">AI 대화</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-item__value">8개</div>
                        <div className="stat-item__label">프로젝트</div>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">기능별 사용량</h3>
                <p className="setting-group__desc">각 기능의 사용 빈도를 확인하세요</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>AI 실습</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>156회</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: '85%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>프로젝트 관리</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>89회</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: '65%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>에이전트 생성</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>23회</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: '35%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>문서 업로드</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>45회</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">주간 활동</h3>
                <p className="setting-group__desc">최근 7일간의 활동 패턴입니다</p>

                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                        📈 주간 활동 차트 (개발 예정)
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                        <span style={{ color: 'var(--text-tertiary)' }}>차트 영역</span>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">저장 공간</h3>
                <p className="setting-group__desc">파일 및 데이터 저장 현황입니다</p>

                <div className="stats-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>사용 중</span>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>2.3GB / 10GB</span>
                    </div>
                    <div className="progress-bar" style={{ height: '8px' }}>
                        <div className="progress-bar__fill" style={{ width: '23%' }}></div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                    <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>📄 문서</div>
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--employee-primary)' }}>1.2GB</div>
                    </div>
                    <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>📂 프로젝트</div>
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--employee-primary)' }}>850MB</div>
                    </div>
                    <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>🤖 에이전트</div>
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--employee-primary)' }}>150MB</div>
                    </div>
                    <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>💬 대화 기록</div>
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--employee-primary)' }}>100MB</div>
                    </div>
                </div>

                <div style={{ marginTop: 'var(--space-4)' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        💾 저장 공간 관리
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">데이터 내보내기</h3>
                <p className="setting-group__desc">사용 데이터를 다운로드하세요</p>

                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        📊 사용량 리포트
                    </button>
                    <button className="btn btn--outline" onClick={() => { }}>
                        💬 대화 기록
                    </button>
                    <button className="btn btn--outline" onClick={() => { }}>
                        📂 프로젝트 데이터
                    </button>
                </div>
            </div>
        </div>
    );
}

