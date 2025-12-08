import React from 'react';

export default function PrivacySection() {
    return (
        <div id="privacySection" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">개인정보 및 보안</h2>
            <p className="user-settings-section__desc">계정 보안 및 개인정보를 관리하세요</p>

            <div className="setting-group">
                <h3 className="setting-group__title">비밀번호 변경</h3>
                <p className="setting-group__desc">정기적으로 비밀번호를 변경하세요</p>

                <div className="form-group">
                    <label className="form-label">현재 비밀번호</label>
                    <input type="password" className="form-input" id="currentPassword" placeholder="현재 비밀번호 입력" />
                </div>

                <div className="form-group">
                    <label className="form-label">새 비밀번호</label>
                    <input type="password" className="form-input" id="newPassword" placeholder="새 비밀번호 입력" />
                    <div className="form-hint">최소 8자 이상, 영문, 숫자, 특수문자 포함</div>
                </div>

                <div className="form-group">
                    <label className="form-label">새 비밀번호 확인</label>
                    <input type="password" className="form-input" id="confirmPassword" placeholder="새 비밀번호 다시 입력" />
                </div>

                <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} onClick={() => { }}>
                    🔒 비밀번호 변경
                </button>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">2단계 인증</h3>
                <p className="setting-group__desc">계정 보안을 강화하세요</p>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">2단계 인증 활성화</div>
                        <div className="setting-item__desc">로그인 시 추가 인증 단계를 거칩니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="twoFactorAuth" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div style={{ marginTop: 'var(--space-3)' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        📱 2단계 인증 설정
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">최근 로그인 기록</h3>
                <p className="setting-group__desc">최근 계정 접속 내역을 확인하세요</p>

                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-item__icon">💻</div>
                        <div className="activity-item__content">
                            <div className="activity-item__title">Chrome on Windows</div>
                            <div className="activity-item__desc">서울, 대한민국 • 112.220.xxx.xxx</div>
                            <div className="activity-item__time">현재 세션</div>
                        </div>
                    </div>

                    <div className="activity-item">
                        <div className="activity-item__icon">📱</div>
                        <div className="activity-item__content">
                            <div className="activity-item__title">Safari on iPhone</div>
                            <div className="activity-item__desc">서울, 대한민국 • 211.xxx.xxx.xxx</div>
                            <div className="activity-item__time">2시간 전</div>
                        </div>
                    </div>

                    <div className="activity-item">
                        <div className="activity-item__icon">💻</div>
                        <div className="activity-item__content">
                            <div className="activity-item__title">Chrome on Mac</div>
                            <div className="activity-item__desc">서울, 대한민국 • 175.xxx.xxx.xxx</div>
                            <div className="activity-item__time">어제</div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 'var(--space-3)' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        전체 기록 보기
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">데이터 프라이버시</h3>
                <p className="setting-group__desc">개인 데이터 사용 및 저장을 관리하세요</p>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">대화 기록 저장</div>
                        <div className="setting-item__desc">AI와의 대화 내용을 저장합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="saveChatHistory" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">사용 데이터 수집</div>
                        <div className="setting-item__desc">서비스 개선을 위해 사용 데이터를 수집합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="collectUsageData" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">개인화 추천</div>
                        <div className="setting-item__desc">사용 패턴을 분석하여 개인화된 추천을 제공합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="personalizedRecommendations" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        📥 내 데이터 다운로드
                    </button>
                    <button className="btn btn--outline" onClick={() => { }}>
                        개인정보 처리방침
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">위험 영역</h3>

                <div className="danger-box">
                    <div className="danger-box__title">⚠️ 계정 삭제</div>
                    <div className="danger-box__desc">
                        계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                    </div>
                    <button className="btn" style={{ background: 'var(--danger)', color: 'white' }} onClick={() => { }}>
                        계정 삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

