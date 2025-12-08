import React from 'react';

export default function PreferencesSection() {
    return (
        <div id="preferencesSection" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">환경설정</h2>
            <p className="user-settings-section__desc">작업 환경을 개인화하세요</p>

            <div className="setting-group">
                <h3 className="setting-group__title">테마</h3>
                <p className="setting-group__desc">화면 테마를 선택하세요</p>

                <div className="form-group">
                    <label className="form-label">테마 모드</label>
                    <select className="form-select" id="themeMode" defaultValue="light">
                        <option value="light">라이트 모드</option>
                        <option value="dark">다크 모드</option>
                        <option value="auto">시스템 설정 따르기</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">강조 색상</label>
                    <select className="form-select" id="accentColor" defaultValue="green">
                        <option value="green">그린 (기본)</option>
                        <option value="blue">블루</option>
                        <option value="purple">퍼플</option>
                        <option value="orange">오렌지</option>
                    </select>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">언어 및 지역</h3>
                <p className="setting-group__desc">언어 및 시간대를 설정하세요</p>

                <div className="form-group">
                    <label className="form-label">언어</label>
                    <select className="form-select" id="language" defaultValue="ko">
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">시간대</label>
                    <select className="form-select" id="timezone" defaultValue="Asia/Seoul">
                        <option value="Asia/Seoul">서울 (GMT+9)</option>
                        <option value="America/New_York">뉴욕 (GMT-5)</option>
                        <option value="Europe/London">런던 (GMT+0)</option>
                        <option value="Asia/Tokyo">도쿄 (GMT+9)</option>
                    </select>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">AI 응답 설정</h3>
                <p className="setting-group__desc">AI의 응답 스타일을 조정하세요</p>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">상세한 응답</div>
                        <div className="setting-item__desc">더 자세하고 설명적인 응답을 받습니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="detailedResponse" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">코드 예제 포함</div>
                        <div className="setting-item__desc">응답에 실행 가능한 코드 예제를 포함합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="includeCodeExamples" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">출처 표시</div>
                        <div className="setting-item__desc">응답에 정보의 출처를 표시합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="showSources" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">에디터 설정</h3>
                <p className="setting-group__desc">텍스트 편집 환경을 설정하세요</p>

                <div className="form-group">
                    <label className="form-label">폰트 크기</label>
                    <select className="form-select" id="fontSize" defaultValue="medium">
                        <option value="small">작게</option>
                        <option value="medium">보통</option>
                        <option value="large">크게</option>
                    </select>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">자동 저장</div>
                        <div className="setting-item__desc">작업 내용을 자동으로 저장합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="autoSave" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-item__info">
                        <div className="setting-item__label">맞춤법 검사</div>
                        <div className="setting-item__desc">입력 시 맞춤법을 자동으로 검사합니다</div>
                    </div>
                    <div className="setting-item__control">
                        <label className="toggle-switch">
                            <input type="checkbox" id="spellCheck" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn--outline" onClick={() => { }}>
                    기본값으로 초기화
                </button>
                <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} onClick={() => { }}>
                    ✓ 변경사항 저장
                </button>
            </div>
        </div>
    );
}

