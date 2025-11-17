import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';
import './PartnerSettings.css';

export default function PartnerSettings() {
    return (
        <>
            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />

                    <main className="main">

                        <div className="page-header">
                            <div className="page-header__left">
                                <h1>⚙️ 설정</h1>
                                <p>파트너 프로필 및 시스템 설정을 관리하세요</p>
                            </div>
                        </div>


                        <div className="settings-layout">

                            <nav className="settings-nav">
                                <div className="settings-nav__title">설정 메뉴</div>
                                <ul className="settings-nav__list">
                                    <li className="settings-nav__item">
                                        <a className="settings-nav__link settings-nav__link--active" data-section="profile">
                                            <span className="settings-nav__icon">👤</span>
                                            <span>프로필</span>
                                        </a>
                                    </li>
                                    <li className="settings-nav__item">
                                        <a className="settings-nav__link" data-section="project">
                                            <span className="settings-nav__icon">📁</span>
                                            <span>프로젝트 설정</span>
                                        </a>
                                    </li>
                                    <li className="settings-nav__item">
                                        <a className="settings-nav__link" data-section="ai" >
                                            <span className="settings-nav__icon">🤖</span>
                                            <span>AI 설정</span>
                                        </a>
                                    </li>
                                    <li className="settings-nav__item">
                                        <a className="settings-nav__link" data-section="notification">
                                            <span className="settings-nav__icon">🔔</span>
                                            <span>알림</span>
                                        </a>
                                    </li>
                                    <li className="settings-nav__item">
                                        <a className="settings-nav__link" data-section="security">
                                            <span className="settings-nav__icon">🔐</span>
                                            <span>보안</span>
                                        </a>
                                    </li>
                                    <li className="settings-nav__item">
                                        <a className="settings-nav__link" data-section="billing">
                                            <span className="settings-nav__icon">💳</span>
                                            <span>정산 정보</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>


                            <div className="settings-content">

                                <section id="section-profile" className="settings-section settings-section--active">
                                    <div className="settings-section__header">
                                        <div>
                                            <h2 className="settings-section__title">👤 프로필</h2>
                                            <p className="settings-section__desc">파트너 프로필 정보를 관리하세요</p>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">프로필 이미지</h3>
                                        <div className="profile-image-section">
                                            <div className="profile-image-preview">박</div>
                                            <div className="profile-image-info">
                                                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)' }}>
                                                    프로필 이미지
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                                                    JPG, PNG 파일 (최대 2MB)
                                                </div>
                                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                                    <button className="btn btn--sm btn--outline" >
                                                        업로드
                                                    </button>
                                                    <button className="btn btn--sm btn--outline" >
                                                        제거
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">기본 정보</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">이름</div>
                                                <div className="settings-item__desc">강사 이름</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="text" className="settings-input" value="박강사" placeholder="이름 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">이메일</div>
                                                <div className="settings-item__desc">로그인 및 연락용 이메일</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="email" className="settings-input" value="park@example.com" placeholder="이메일 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">전화번호</div>
                                                <div className="settings-item__desc">연락 가능한 전화번호</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="tel" className="settings-input" value="010-1234-5678" placeholder="전화번호 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">소개</div>
                                                <div className="settings-item__desc">강사 소개 및 전문 분야</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '600px' }}>
                                                <textarea className="settings-textarea"
                                                    placeholder="소개 입력">10년 경력의 AI/ML 전문 강사입니다. 기업 교육을 전문으로 하며, 실무 중심의 교육 커리큘럼을 제공합니다.</textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">전문 분야</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">주요 전문 분야</div>
                                                <div className="settings-item__desc">교육 가능한 분야 (복수 선택)</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <select className="settings-select" multiple size="4">
                                                    <option selected>AI/ML 기초</option>
                                                    <option selected>프롬프트 엔지니어링</option>
                                                    <option>데이터 분석</option>
                                                    <option>챗봇 개발</option>
                                                    <option>AI 코딩</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
                                        <button className="btn btn--outline" >취소</button>
                                        <button className="btn btn--primary" style={{ background: 'var(--partner-primary)' }}>저장</button>
                                    </div>
                                </section>


                                <section id="section-project" className="settings-section">
                                    <div className="settings-section__header">
                                        <div>
                                            <h2 className="settings-section__title">📁 프로젝트 설정</h2>
                                            <p className="settings-section__desc">프로젝트 기본 설정을 관리하세요</p>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">기본 설정</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">프로젝트 자동 승인</div>
                                                <div className="settings-item__desc">신규 학생 등록 시 자동으로 승인</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">학생 자가 등록 허용</div>
                                                <div className="settings-item__desc">초대 링크로 학생이 직접 등록 가능</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">기본 프로젝트 기간</div>
                                                <div className="settings-item__desc">신규 프로젝트 생성 시 기본 기간</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <select className="settings-select" style={{ width: '200px' }}>
                                                    <option value="30">1개월</option>
                                                    <option value="60">2개월</option>
                                                    <option value="90" selected>3개월</option>
                                                    <option value="180">6개월</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">학생 관리</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">비활성 학생 자동 정리</div>
                                                <div className="settings-item__desc">일정 기간 활동 없는 학생 자동 비활성화</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch" ></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">비활성 기준 (일)</div>
                                                <div className="settings-item__desc">미접속 기간 기준</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <select className="settings-select" style={{ width: '150px' }}>
                                                    <option value="30">30일</option>
                                                    <option value="60" selected>60일</option>
                                                    <option value="90">90일</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
                                        <button className="btn btn--outline" >취소</button>
                                        <button className="btn btn--primary" style={{ background: 'var(--partner-primary)' }}>저장</button>
                                    </div>
                                </section>


                                <section id="section-ai" className="settings-section">
                                    <div className="settings-section__header">
                                        <div>
                                            <h2 className="settings-section__title">🤖 AI 설정</h2>
                                            <p className="settings-section__desc">AI 모델 및 사용 정책을 설정하세요</p>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">LLM 프로바이더</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">OpenAI (GPT-4)</div>
                                                <div className="settings-item__desc">GPT-4, GPT-3.5-turbo</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="api-key-display" style={{ margin: 'var(--space-3) 0' }}>
                                            <div className="api-key-value">sk-proj-••••••••••••••••••••••••1234</div>
                                            <div className="api-key-actions">
                                                <button className="btn btn--sm btn--outline" >
                                                    편집
                                                </button>
                                                <button className="btn btn--sm btn--outline" >
                                                    테스트
                                                </button>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">Anthropic (Claude)</div>
                                                <div className="settings-item__desc">Claude 3.7 Sonnet, Claude 3 Opus</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="api-key-display" style={{ margin: 'var(--space-3) 0' }}>
                                            <div className="api-key-value">sk-ant-••••••••••••••••••••••••5678</div>
                                            <div className="api-key-actions">
                                                <button className="btn btn--sm btn--outline" >
                                                    편집
                                                </button>
                                                <button className="btn btn--sm btn--outline" >
                                                    테스트
                                                </button>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">Google (Gemini)</div>
                                                <div className="settings-item__desc">Gemini Pro, Gemini Ultra</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="api-key-display" style={{ margin: 'var(--space-3) 0' }}>
                                            <div className="api-key-value">AIza••••••••••••••••••••••••9012</div>
                                            <div className="api-key-actions">
                                                <button className="btn btn--sm btn--outline" >
                                                    편집
                                                </button>
                                                <button className="btn btn--sm btn--outline" >
                                                    테스트
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">기본 모델 설정</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">기본 채팅 모델</div>
                                                <div className="settings-item__desc">일반 대화에 사용할 모델</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <select className="settings-select" style={{ width: '250px' }}>
                                                    <option value="gpt-4">GPT-4</option>
                                                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                                    <option value="claude-3-opus">Claude 3 Opus</option>
                                                    <option value="claude-3-sonnet" selected>Claude 3.7 Sonnet</option>
                                                    <option value="gemini-pro">Gemini Pro</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">병렬 비교 모드</div>
                                                <div className="settings-item__desc">학생이 여러 모델 동시 사용 허용</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">사용량 제한</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">학생당 일일 대화 제한</div>
                                                <div className="settings-item__desc">비용 관리를 위한 일일 사용량 제한</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <select className="settings-select" style={{ width: '150px' }}>
                                                    <option value="0">제한 없음</option>
                                                    <option value="50">50회</option>
                                                    <option value="100" selected>100회</option>
                                                    <option value="200">200회</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">토큰 제한 알림</div>
                                                <div className="settings-item__desc">일정 토큰 초과 시 알림</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
                                        <button className="btn btn--outline" >취소</button>
                                        <button className="btn btn--primary" style={{ background: 'var(--partner-primary)' }}>저장</button>
                                    </div>
                                </section>


                                <section id="section-notification" className="settings-section">
                                    <div className="settings-section__header">
                                        <div>
                                            <h2 className="settings-section__title">🔔 알림</h2>
                                            <p className="settings-section__desc">알림 설정을 관리하세요</p>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">이메일 알림</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">신규 학생 등록</div>
                                                <div className="settings-item__desc">새 학생이 등록되면 알림</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">프로젝트 마감 임박</div>
                                                <div className="settings-item__desc">프로젝트 종료 7일 전 알림</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">정산 완료</div>
                                                <div className="settings-item__desc">월별 정산 완료 시 알림</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">API 비용 경고</div>
                                                <div className="settings-item__desc">예산 대비 80% 이상 사용 시 알림</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">시스템 알림</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">공지사항</div>
                                                <div className="settings-item__desc">GrowFit 공지사항 및 업데이트</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">마케팅 정보</div>
                                                <div className="settings-item__desc">프로모션 및 이벤트 정보</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch" ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
                                        <button className="btn btn--outline" >취소</button>
                                        <button className="btn btn--primary" style={{ background: 'var(--partner-primary)' }}>저장</button>
                                    </div>
                                </section>


                                <section id="section-security" className="settings-section">
                                    <div className="settings-section__header">
                                        <div>
                                            <h2 className="settings-section__title">🔐 보안</h2>
                                            <p className="settings-section__desc">계정 보안 설정을 관리하세요</p>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">비밀번호</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">비밀번호 변경</div>
                                                <div className="settings-item__desc">정기적인 비밀번호 변경 권장</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <button className="btn btn--outline" >
                                                    변경하기
                                                </button>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">마지막 변경일</div>
                                                <div className="settings-item__desc">2024년 11월 15일</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">2단계 인증</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">2단계 인증 (2FA)</div>
                                                <div className="settings-item__desc">계정 보안 강화를 위한 2FA 활성화</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <div className="toggle-switch toggle-switch--active"
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">인증 방법</div>
                                                <div className="settings-item__desc">사용 중인 인증 수단</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <span
                                                    style={{ padding: '6px 12px', background: 'var(--surface)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>인증
                                                    앱 (Google Authenticator)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">활성 세션</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">로그인 기록</div>
                                                <div className="settings-item__desc">최근 로그인 정보 확인</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <button className="btn btn--outline" >
                                                    보기
                                                </button>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">모든 디바이스 로그아웃</div>
                                                <div className="settings-item__desc">현재 디바이스 제외 모두 로그아웃</div>
                                            </div>
                                            <div className="settings-item__control">
                                                <button className="btn btn--outline" >
                                                    로그아웃
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
                                        <button className="btn btn--outline" >취소</button>
                                        <button className="btn btn--primary" style={{ background: 'var(--partner-primary)' }}
                                        >저장</button>
                                    </div>
                                </section>


                                <section id="section-billing" className="settings-section">
                                    <div className="settings-section__header">
                                        <div>
                                            <h2 className="settings-section__title">💳 정산 정보</h2>
                                            <p className="settings-section__desc">정산 계좌 및 세금계산서 정보를 관리하세요</p>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">정산 계좌</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">은행</div>
                                                <div className="settings-item__desc">입금 받을 은행</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '300px' }}>
                                                <select className="settings-select">
                                                    <option value="kb">국민은행</option>
                                                    <option value="shinhan" selected>신한은행</option>
                                                    <option value="woori">우리은행</option>
                                                    <option value="hana">하나은행</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">계좌번호</div>
                                                <div className="settings-item__desc">입금 계좌</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="text" className="settings-input" value="110-123-456789" placeholder="계좌번호 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">예금주</div>
                                                <div className="settings-item__desc">계좌 소유자 이름</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="text" className="settings-input" value="박강사" placeholder="예금주 입력" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-group">
                                        <h3 className="settings-group__title">세금계산서 정보</h3>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">사업자 등록번호</div>
                                                <div className="settings-item__desc">사업자 등록증 번호</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="text" className="settings-input" value="123-45-67890" placeholder="사업자 등록번호 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">상호명</div>
                                                <div className="settings-item__desc">사업자 상호</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="text" className="settings-input" value="박강사 교육센터" placeholder="상호명 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">대표자명</div>
                                                <div className="settings-item__desc">사업자 대표 이름</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '400px' }}>
                                                <input type="text" className="settings-input" value="박강사" placeholder="대표자명 입력" />
                                            </div>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-item__info">
                                                <div className="settings-item__label">사업장 주소</div>
                                                <div className="settings-item__desc">세금계산서 발행 주소</div>
                                            </div>
                                            <div className="settings-item__control" style={{ flex: 1, maxWidth: '500px' }}>
                                                <input type="text" className="settings-input" value="서울시 강남구 테헤란로 123" placeholder="주소 입력" />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
                                        <button className="btn btn--outline" >취소</button>
                                        <button className="btn btn--primary" style={{ background: 'var(--partner-primary)' }}>저장</button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>



                </div>
            </div>
        </>
    )
}