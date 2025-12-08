import React from 'react';

export default function NotificationsSection() {
    return (
        <div id="notificationsSection" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">알림 설정</h2>
            <p className="user-settings-section__desc">알림을 받을 항목을 선택하세요</p>

            <div className="setting-group">
                <h3 className="setting-group__title">이메일 알림</h3>
                <p className="setting-group__desc">이메일로 받을 알림을 설정하세요</p>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">프로젝트 업데이트</div>
                        <div className="setting-item__desc">프로젝트에 변경사항이 있을 때 알림</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="emailProjectUpdates" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">AI 응답 완료</div>
                        <div className="setting-item__desc">AI의 작업이 완료되었을 때 알림</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="emailAIComplete" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">주간 리포트</div>
                        <div className="setting-item__desc">매주 활동 요약을 받습니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="emailWeeklyReport" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">새로운 기능</div>
                        <div className="setting-item__desc">신규 기능 안내를 받습니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="emailNewFeatures" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">푸시 알림</h3>
                <p className="setting-group__desc">브라우저 알림을 설정하세요</p>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">브라우저 알림 활성화</div>
                        <div className="setting-item__desc">브라우저에서 알림을 받습니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="pushNotifications" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">소리 알림</div>
                        <div className="setting-item__desc">알림 시 소리가 재생됩니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="notificationSound" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">방해 금지 모드</h3>
                <p className="setting-group__desc">특정 시간에 알림을 받지 않습니다</p>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">방해 금지 모드</div>
                        <div className="setting-item__desc">지정한 시간에 알림을 끕니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="doNotDisturb" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">시작 시간</label>
                    <input type="time" className="form-input" id="dndStartTime" defaultValue="22:00" />
                </div>

                <div className="form-group">
                    <label className="form-label">종료 시간</label>
                    <input type="time" className="form-input" id="dndEndTime" defaultValue="08:00" />
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn--outline" onClick={() => { }}>
                    알림 테스트
                </button>
                <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} onClick={() => { }}>
                    ✓ 변경사항 저장
                </button>
            </div>
        </div>
    );
}

