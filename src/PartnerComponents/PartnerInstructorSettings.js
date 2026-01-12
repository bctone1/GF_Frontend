import PartnerSidebar from './PartnerSidebar';

export default function PartnerSettings() {

    return (
        <>
            <div className="app">
                <PartnerSidebar />

                <main className="main">
                    <header className="main-header">
                        <h1 className="main-header__title">설정</h1>
                        <div className="main-header__right">
                            <div style={{ position: 'relative' }}>
                                <button className="main-header__btn" title="알림" >
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    <span className="main-header__badge">3</span>
                                </button>
                                <div className="notification-dropdown" id="notificationDropdown">
                                    <div className="notification-dropdown__header">
                                        <span className="notification-dropdown__title">알림</span>
                                        <span className="notification-dropdown__action" >모두 읽음</span>
                                    </div>
                                    <div className="notification-dropdown__list">
                                        <div className="notification-group">오늘</div>
                                        <div className="notification-item notification-item--unread">
                                            <div className="notification-item__text"><strong>김민수</strong>님이 프롬프트 엔지니어링 강의에 등록했습니다.</div>
                                            <div className="notification-item__time">10분 전</div>
                                        </div>
                                        <div className="notification-item notification-item--unread">
                                            <div className="notification-item__text">이번 달 API 사용량이 <strong>$200</strong>을 초과했습니다.</div>
                                            <div className="notification-item__time">2시간 전</div>
                                        </div>
                                        <div className="notification-group">어제</div>
                                        <div className="notification-item notification-item--unread">
                                            <div className="notification-item__text"><strong>이지은</strong>님이 2025 AI 기초과정 강의에 등록했습니다.</div>
                                            <div className="notification-item__time">어제 오후 3:24</div>
                                        </div>
                                        <div className="notification-group">이번 주</div>
                                        <div className="notification-item">
                                            <div className="notification-item__text">주간 사용량 리포트가 준비되었습니다.</div>
                                            <div className="notification-item__time">3일 전</div>
                                        </div>
                                        <div className="notification-item">
                                            <div className="notification-item__text"><strong>박서준</strong>님이 프롬프트 엔지니어링 강의에 등록했습니다.</div>
                                            <div className="notification-item__time">4일 전</div>
                                        </div>
                                    </div>
                                    <div className="notification-dropdown__footer">
                                        <a href="#">모든 알림 보기</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="main-content">
                        <div className="partner-settings-layout">
                            {/* Settings Nav */}
                            <nav className="settings-nav">
                                <div className="settings-nav__item settings-nav__item--active" >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    프로필
                                </div>
                                <div className="settings-nav__item" >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"></path><circle cx="12" cy="14" r="2"></circle></svg>
                                    AI 모델 설정
                                </div>
                                <div className="settings-nav__item" >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    알림
                                </div>
                                <div className="settings-nav__item" >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    요금 안내
                                </div>
                                <div className="settings-nav__item" >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    보안
                                </div>
                            </nav>

                            {/* Settings Content */}
                            <div className="partner-settings-content">
                                {/* Profile */}
                                <div className="settings-card" id="section-profile" style={{ display: 'block' }}>
                                    <div className="settings-card__header">
                                        <h2 className="settings-card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>프로필 설정</h2>
                                        <div className="settings-card__desc">계정 정보 및 프로필을 관리합니다</div>
                                    </div>
                                    <div className="settings-card__body">
                                        <div className="profile-section">
                                            <div className="profile-avatar">
                                                박
                                                <button className="profile-avatar__edit" title="사진 변경">
                                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                                </button>
                                            </div>
                                            <div className="profile-info">
                                                <div className="profile-name">박강사</div>
                                                <div className="profile-email">instructor.park@growfit.com</div>
                                                <span className="profile-role"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>강사 계정</span>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">이름 <span>*</span></label>
                                                <input type="text" className="form-input" value="박강사" readOnly />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">소속</label>
                                                <input type="text" className="form-input" value="AI 교육센터" placeholder="소속 기관" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">이메일</label>
                                            <input type="email" className="form-input form-input--readOnly" value="instructor.park@growfit.com" readOnly />
                                            <div className="form-hint">이메일은 변경할 수 없습니다</div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">전화번호</label>
                                            <input type="tel" className="form-input" value="010-1234-5678" placeholder="010-0000-0000" readOnly />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                            <button className="btn btn--primary" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>저장</button>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Models */}
                                <div className="settings-card" id="section-ai-models" >
                                    <div className="settings-card__header">
                                        <h2 className="settings-card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"></path><circle cx="12" cy="14" r="2"></circle></svg>AI 모델 설정</h2>
                                        <div className="settings-card__desc">강의에서 사용할 AI 모델과 사용량 제한을 설정합니다</div>
                                    </div>
                                    <div className="settings-card__body">
                                        <div className="ai-model-notice">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                            <span>학생당 일일 사용 제한을 설정하여 과도한 API 비용을 방지할 수 있습니다. 0은 무제한입니다.</span>
                                        </div>
                                        <div className="ai-model-list">
                                            {/* GPT-5-mini */}
                                            <div className="ai-model-item">
                                                <div className="ai-model-item__toggle">
                                                    <div className="toggle-switch toggle-switch--active" ></div>
                                                </div>
                                                <div className="ai-model-item__color" style={{ background: '#10a37f' }}></div>
                                                <div className="ai-model-item__info">
                                                    <div className="ai-model-item__name">GPT-5-mini</div>
                                                    <div className="ai-model-item__provider">OpenAI</div>
                                                </div>
                                                <div className="ai-model-item__cost">
                                                    <span className="ai-model-item__cost-badge ai-model-item__cost-badge--high">고비용</span>
                                                </div>
                                                <div className="ai-model-item__limit">
                                                    <input type="number" className="ai-model-item__input" value="20" min="0" readOnly />
                                                    <span className="ai-model-item__unit">회/일</span>
                                                </div>
                                            </div>
                                            {/* GPT-4o-mini */}
                                            <div className="ai-model-item">
                                                <div className="ai-model-item__toggle">
                                                    <div className="toggle-switch toggle-switch--active" ></div>
                                                </div>
                                                <div className="ai-model-item__color" style={{ background: '#10a37f' }}></div>
                                                <div className="ai-model-item__info">
                                                    <div className="ai-model-item__name">GPT-4o-mini</div>
                                                    <div className="ai-model-item__provider">OpenAI</div>
                                                </div>
                                                <div className="ai-model-item__cost">
                                                    <span className="ai-model-item__cost-badge ai-model-item__cost-badge--medium">중간</span>
                                                </div>
                                                <div className="ai-model-item__limit">
                                                    <input type="number" className="ai-model-item__input" value="50" min="0" readOnly />
                                                    <span className="ai-model-item__unit">회/일</span>
                                                </div>
                                            </div>
                                            {/* Claude-3-haiku */}
                                            <div className="ai-model-item">
                                                <div className="ai-model-item__toggle">
                                                    <div className="toggle-switch toggle-switch--active" ></div>
                                                </div>
                                                <div className="ai-model-item__color" style={{ background: '#d4a574' }}></div>
                                                <div className="ai-model-item__info">
                                                    <div className="ai-model-item__name">Claude-3-haiku</div>
                                                    <div className="ai-model-item__provider">Anthropic</div>
                                                </div>
                                                <div className="ai-model-item__cost">
                                                    <span className="ai-model-item__cost-badge ai-model-item__cost-badge--low">저비용</span>
                                                </div>
                                                <div className="ai-model-item__limit">
                                                    <input type="number" className="ai-model-item__input" value="100" min="0" readOnly />
                                                    <span className="ai-model-item__unit">회/일</span>
                                                </div>
                                            </div>
                                            {/* Gemini-2.5-flash */}
                                            <div className="ai-model-item">
                                                <div className="ai-model-item__toggle">
                                                    <div className="toggle-switch toggle-switch--active" ></div>
                                                </div>
                                                <div className="ai-model-item__color" style={{ background: '#4285f4' }}></div>
                                                <div className="ai-model-item__info">
                                                    <div className="ai-model-item__name">Gemini-2.5-flash</div>
                                                    <div className="ai-model-item__provider">Google</div>
                                                </div>
                                                <div className="ai-model-item__cost">
                                                    <span className="ai-model-item__cost-badge ai-model-item__cost-badge--low">저비용</span>
                                                </div>
                                                <div className="ai-model-item__limit">
                                                    <input type="number" className="ai-model-item__input" value="100" min="0" readOnly />
                                                    <span className="ai-model-item__unit">회/일</span>
                                                </div>
                                            </div>
                                            {/* GPT-3.5-turbo */}
                                            <div className="ai-model-item">
                                                <div className="ai-model-item__toggle">
                                                    <div className="toggle-switch toggle-switch--active" ></div>
                                                </div>
                                                <div className="ai-model-item__color" style={{ background: '#10a37f' }}></div>
                                                <div className="ai-model-item__info">
                                                    <div className="ai-model-item__name">GPT-3.5-turbo</div>
                                                    <div className="ai-model-item__provider">OpenAI</div>
                                                </div>
                                                <div className="ai-model-item__cost">
                                                    <span className="ai-model-item__cost-badge ai-model-item__cost-badge--low">저비용</span>
                                                </div>
                                                <div className="ai-model-item__limit">
                                                    <input type="number" className="ai-model-item__input" value="0" min="0" placeholder="무제한" readOnly />
                                                    <span className="ai-model-item__unit">회/일</span>
                                                </div>
                                            </div>
                                            {/* EXAONE */}
                                            <div className="ai-model-item">
                                                <div className="ai-model-item__toggle">
                                                    <div className="toggle-switch" ></div>
                                                </div>
                                                <div className="ai-model-item__color" style={{ background: '#a50034' }}></div>
                                                <div className="ai-model-item__info">
                                                    <div className="ai-model-item__name">EXAONE 3.5</div>
                                                    <div className="ai-model-item__provider">LG AI Research</div>
                                                </div>
                                                <div className="ai-model-item__cost">
                                                    <span className="ai-model-item__cost-badge ai-model-item__cost-badge--medium">중간</span>
                                                </div>
                                                <div className="ai-model-item__limit">
                                                    <input type="number" className="ai-model-item__input" value="50" min="0" disabled="" readOnly />
                                                    <span className="ai-model-item__unit">회/일</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                            <button className="btn btn--primary" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>저장</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div className="settings-card" id="section-notifications" >
                                    <div className="settings-card__header">
                                        <h2 className="settings-card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>알림 설정</h2>
                                        <div className="settings-card__desc">알림 수신 방법을 설정합니다</div>
                                    </div>
                                    <div className="settings-card__body">
                                        <div className="toggle-group">
                                            <div className="toggle-item">
                                                <div className="toggle-item__info">
                                                    <div className="toggle-item__label">이메일 알림</div>
                                                    <div className="toggle-item__desc">중요한 알림을 이메일로 받습니다</div>
                                                </div>
                                                <div className="toggle-switch toggle-switch--active" ></div>
                                            </div>
                                            <div className="toggle-item">
                                                <div className="toggle-item__info">
                                                    <div className="toggle-item__label">비용 알림</div>
                                                    <div className="toggle-item__desc">일정 금액 이상 사용 시 알림</div>
                                                </div>
                                                <div className="toggle-switch toggle-switch--active" ></div>
                                            </div>
                                            <div className="toggle-item">
                                                <div className="toggle-item__info">
                                                    <div className="toggle-item__label">학생 가입 알림</div>
                                                    <div className="toggle-item__desc">새 학생이 강의에 등록하면 알림</div>
                                                </div>
                                                <div className="toggle-switch toggle-switch--active" ></div>
                                            </div>
                                            <div className="toggle-item">
                                                <div className="toggle-item__info">
                                                    <div className="toggle-item__label">주간 리포트</div>
                                                    <div className="toggle-item__desc">매주 사용량 요약 리포트 수신</div>
                                                </div>
                                                <div className="toggle-switch" ></div>
                                            </div>
                                            <div className="toggle-item">
                                                <div className="toggle-item__info">
                                                    <div className="toggle-item__label">마케팅 알림</div>
                                                    <div className="toggle-item__desc">새로운 기능 및 업데이트 소식</div>
                                                </div>
                                                <div className="toggle-switch" ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="settings-card" id="section-pricing">
                                    <div className="settings-card__header">
                                        <h2 className="settings-card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>요금 안내</h2>
                                        <div className="settings-card__desc">GrowFit 이용 요금 정책을 안내합니다</div>
                                    </div>
                                    <div className="settings-card__body">
                                        {/* 요금 구조 안내 */}
                                        <div className="pricing-info">
                                            <div className="pricing-info__title">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                                요금 구조
                                            </div>
                                            <div className="pricing-info__content">
                                                GrowFit은 <strong>플랫폼 사용료</strong>와 <strong>API 사용료</strong>로 구성된 투명한 요금 체계를 제공합니다.
                                            </div>
                                        </div>

                                        {/* 요금 항목 */}
                                        <div className="pricing-items">
                                            <div className="pricing-item">
                                                <div className="pricing-item__icon pricing-item__icon--platform">
                                                    <svg className="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                                </div>
                                                <div className="pricing-item__info">
                                                    <div className="pricing-item__name">플랫폼 사용료</div>
                                                    <div className="pricing-item__desc">GrowFit 플랫폼 이용에 대한 기본 수수료</div>
                                                </div>
                                                <div className="pricing-item__rate">15%</div>
                                            </div>
                                            <div className="pricing-item">
                                                <div className="pricing-item__icon pricing-item__icon--api">
                                                    <svg className="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                </div>
                                                <div className="pricing-item__info">
                                                    <div className="pricing-item__name">API 사용료</div>
                                                    <div className="pricing-item__desc">각 AI 모델 API 사용량에 따른 실비 청구</div>
                                                </div>
                                                <div className="pricing-item__rate">실비</div>
                                            </div>
                                        </div>

                                        {/* 이번 달 사용 현황 */}
                                        <div className="pricing-summary">
                                            <div className="pricing-summary__title">이번 달 사용 현황</div>
                                            <div className="pricing-summary__period">2025년 1월 1일 ~ 1월 12일</div>
                                            <div className="pricing-summary__items">
                                                <div className="pricing-summary__item">
                                                    <span className="pricing-summary__label">API 사용료</span>
                                                    <span className="pricing-summary__value">$218.68</span>
                                                </div>
                                                <div className="pricing-summary__item">
                                                    <span className="pricing-summary__label">플랫폼 사용료</span>
                                                    <span className="pricing-summary__value">$29.82</span>
                                                </div>
                                                <div className="pricing-summary__item pricing-summary__item--total">
                                                    <span className="pricing-summary__label">총 청구 금액</span>
                                                    <span className="pricing-summary__value">$248.50</span>
                                                </div>
                                            </div>
                                            <a href="instructor-analytics.html" className="pricing-summary__link">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                                상세 사용량 보기
                                            </a>
                                        </div>

                                        {/* 안내 사항 */}
                                        <div className="pricing-notice">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                            <div className="pricing-notice__text">
                                                요금은 매월 말일에 정산되며, 등록된 결제 수단으로 자동 청구됩니다. 상세 내역은 사용량 통계에서 확인할 수 있습니다.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="settings-card" id="section-security">
                                    <div className="settings-card__header">
                                        <h2 className="settings-card__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>보안 설정</h2>
                                        <div className="settings-card__desc">비밀번호 및 보안 옵션을 관리합니다</div>
                                    </div>
                                    <div className="settings-card__body">
                                        <div className="form-group">
                                            <label className="form-label">현재 비밀번호</label>
                                            <input type="password" className="form-input" placeholder="현재 비밀번호 입력" readOnly />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">새 비밀번호</label>
                                                <input type="password" className="form-input" placeholder="새 비밀번호" readOnly />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">비밀번호 확인</label>
                                                <input type="password" className="form-input" placeholder="비밀번호 확인" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-hint" style={{ marginBottom: '20px' }}>비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다</div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button className="btn btn--primary" >비밀번호 변경</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone  */}
                                <div className="danger-zone" id="danger-zone">
                                    <div className="danger-zone__title"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>위험 영역</div>
                                    <div className="danger-zone__item">
                                        <div className="danger-zone__info">
                                            <div className="danger-zone__label">모든 데이터 내보내기</div>
                                            <div className="danger-zone__desc">계정의 모든 데이터를 다운로드합니다</div>
                                        </div>
                                        <button className="btn btn--secondary" >내보내기</button>
                                    </div>
                                    <div className="danger-zone__item">
                                        <div className="danger-zone__info">
                                            <div className="danger-zone__label">계정 삭제</div>
                                            <div className="danger-zone__desc">계정과 모든 데이터가 영구적으로 삭제됩니다</div>
                                        </div>
                                        <button className="btn btn--danger" >계정 삭제</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}