import PartnerSidebar from './PartnerSidebar';


export default function PartnerInstructorMaterials() {
    return (
        <>
            <div className="app">
                <PartnerSidebar />
                <main className="main">
                    <header className="main-header">
                        <div className="main-header__left">
                            <h1 className="main-header__title">학습 자료 관리</h1>
                        </div>
                        <div className="main-header__right">
                            <button className="btn btn--primary" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                새로 만들기
                            </button>
                            {/* 알림 버튼  */}
                            <div style={{ position: "relative;" }}>
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
                        {/* Tabs */}
                        <div className="partner-tabs">
                            <button className="tab tab--active" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="3"></circle><path d="M12 8v3"></path></svg>
                                공유 에이전트
                                <span className="tab__badge">4</span>
                            </button>
                            <button className="tab" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                                프롬프트 템플릿
                                <span className="tab__badge">6</span>
                            </button>
                            <button className="tab" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8"></path><path d="M8 13h6"></path></svg>
                                Few-shot 예시
                                <span className="tab__badge">3</span>
                            </button>
                        </div>

                        {/* Tab: Agents */}
                        <div className="tab-content tab-content--active" id="tab-agents">
                            <div className="stats-row">
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--blue"><svg className="icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="3"></circle></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">4</div><div className="stat-mini__label">전체 에이전트</div></div>
                                </div>
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--green"><svg className="icon" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">156회</div><div className="stat-mini__label">학생 사용 횟수</div></div>
                                </div>
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--purple"><svg className="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">89명</div><div className="stat-mini__label">사용 학생</div></div>
                                </div>
                            </div>
                            <div className="items-grid">
                                <div className="agent-card agent-card--purple">
                                    <div className="partner-dropdown">
                                        <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div className="dropdown__menu">
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                            <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                            <div className="dropdown__divider"></div>
                                            <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                        </div>
                                    </div>
                                    <div className="agent-card__header">
                                        <div className="agent-card__name">AI 학습 도우미 <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span></div>
                                        <div className="agent-card__desc">AI 기초 개념을 친절하게 설명하고 학습을 도와주는 에이전트입니다.</div>
                                    </div>
                                    <div className="agent-card__meta">
                                        <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                        <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>45명 사용</span>
                                    </div>
                                </div>
                                <div className="agent-card agent-card--blue">
                                    <div className="partner-dropdown">
                                        <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div className="dropdown__menu">
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                            <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                            <div className="dropdown__divider"></div>
                                            <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                        </div>
                                    </div>
                                    <div className="agent-card__header">
                                        <div className="agent-card__name">코드 리뷰어 <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span></div>
                                        <div className="agent-card__desc">학생이 작성한 코드를 분석하고 개선점을 제안하는 에이전트입니다.</div>
                                    </div>
                                    <div className="agent-card__meta">
                                        <span className="agent-card__tag agent-card__tag--course">프롬프트 엔지니어링</span>
                                        <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>62명 사용</span>
                                    </div>
                                </div>
                                <div className="agent-card agent-card--green">
                                    <div className="partner-dropdown">
                                        <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div className="dropdown__menu">
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                            <button className="dropdown__item dropdown__item--primary" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>공유하기</button>
                                            <div className="dropdown__divider"></div>
                                            <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                        </div>
                                    </div>
                                    <div className="agent-card__header">
                                        <div className="agent-card__name">Q&amp;A 봇 <span className="status-badge status-badge--draft"><span className="status-badge__dot"></span>비공개</span></div>
                                        <div className="agent-card__desc">강의 내용에 대한 질문에 답변하는 FAQ 스타일 에이전트입니다.</div>
                                    </div>
                                    <div className="agent-card__meta">
                                        <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                        <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>0명 사용</span>
                                    </div>
                                </div>
                                <div className="agent-card agent-card--orange">
                                    <div className="partner-dropdown">
                                        <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div className="dropdown__menu">
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                            <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                            <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                            <div className="dropdown__divider"></div>
                                            <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                        </div>
                                    </div>
                                    <div className="agent-card__header">
                                        <div className="agent-card__name">글쓰기 코치 <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span></div>
                                        <div className="agent-card__desc">프롬프트 작성법을 가르치고 피드백을 제공하는 에이전트입니다.</div>
                                    </div>
                                    <div className="agent-card__meta">
                                        <span className="agent-card__tag agent-card__tag--course">프롬프트 엔지니어링</span>
                                        <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>49명 사용</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab: Templates */}
                        <div className="tab-content" id="tab-templates">
                            <div className="stats-row">
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--blue"><svg className="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">6</div><div className="stat-mini__label">전체 템플릿</div></div>
                                </div>
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--green"><svg className="icon" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">324회</div><div className="stat-mini__label">총 사용 횟수</div></div>
                                </div>
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--purple"><svg className="icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">4.8</div><div className="stat-mini__label">평균 평점</div></div>
                                </div>
                            </div>
                            <div className="items-grid">
                                <div className="template-card">
                                    <div
                                        className="template-card__color"
                                        style={{
                                            background: 'linear-gradient(90deg, #a855f7, #7c3aed)'
                                        }}
                                    ></div>

                                    <div className="template-card__body">
                                        <div className="template-card__header">
                                            <div><div className="template-card__title">역할 기반 프롬프트</div><div className="template-card__category">기본 템플릿</div></div>
                                            <div className="partner-dropdown">
                                                <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                                <div className="dropdown__menu">
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                    <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                                    <div className="dropdown__divider"></div>
                                                    <button className="dropdown__item dropdown__item--danger"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="template-card__preview">당신은 [역할]입니다. [배경/맥락]을 고려하여 [목표/요청사항]에 대해 답변해주세요...</div>
                                        <div className="template-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                            <span className="agent-card__tag agent-card__tag--course">프롬프트 엔지니어링</span>
                                            <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span>
                                        </div>
                                        <div className="template-card__footer">
                                            <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>89회 사용</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="template-card">
                                    <div
                                        className="template-card__color"
                                        style={{
                                            background: 'linear-gradient(90deg, #3b82f6, #2563eb)'
                                        }}
                                    ></div>

                                    <div className="template-card__body">
                                        <div className="template-card__header">
                                            <div><div className="template-card__title">단계별 분석 요청</div><div className="template-card__category">분석 템플릿</div></div>
                                            <div className="partner-dropdown">
                                                <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                                <div className="dropdown__menu">
                                                    <button className="dropdown__item"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                    <button className="dropdown__item dropdown__item--primary"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>공유하기</button>
                                                    <div className="dropdown__divider"></div>
                                                    <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="template-card__preview">다음 내용을 단계별로 분석해주세요:
                                            1. 핵심 요점 파악
                                            2. 장단점 분석...</div>
                                        <div className="template-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">프롬프트 엔지니어링</span>
                                            <span className="status-badge status-badge--draft"><span className="status-badge__dot"></span>비공개</span>
                                        </div>
                                        <div className="template-card__footer">
                                            <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>67회 사용</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="template-card">
                                    <div
                                        className="template-card__color"
                                        style={{
                                            background: 'linear-gradient(90deg, #10b981, #059669)'
                                        }}
                                    ></div>

                                    <div className="template-card__body">
                                        <div className="template-card__header">
                                            <div><div className="template-card__title">코드 설명 요청</div><div className="template-card__category">코딩 템플릿</div></div>
                                            <div className="partner-dropdown">
                                                <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                                <div className="dropdown__menu">
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                    <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                                    <div className="dropdown__divider"></div>
                                                    <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="template-card__preview">다음 코드를 분석하고 설명해주세요:
                                            - 코드의 목적
                                            - 주요 함수/변수 설명...</div>
                                        <div className="template-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                            <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span>
                                        </div>
                                        <div className="template-card__footer">
                                            <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>54회 사용</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="template-card">
                                    <div
                                        className="template-card__color"
                                        style={{
                                            background: 'linear-gradient(90deg, #f59e0b, #d97706)'
                                        }}
                                    ></div>
                                    <div className="template-card__body">
                                        <div className="template-card__header">
                                            <div><div className="template-card__title">요약 및 정리</div><div className="template-card__category">정리 템플릿</div></div>
                                            <div className="partner-dropdown">
                                                <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                                <div className="dropdown__menu">
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                    <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                    <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                                    <div className="dropdown__divider"></div>
                                                    <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="template-card__preview">다음 내용을 요약해주세요:
                                            - 핵심 내용 3줄 요약
                                            - 주요 키워드 추출...</div>
                                        <div className="template-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                            <span className="agent-card__tag agent-card__tag--course">프롬프트 엔지니어링</span>
                                            <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span>
                                        </div>
                                        <div className="template-card__footer">
                                            <span className="agent-card__stat"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>72회 사용</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab: Few-shots */}
                        <div className="tab-content" id="tab-fewshots">
                            <div className="stats-row">
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--blue"><svg className="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">3</div><div className="stat-mini__label">전체 예시 세트</div></div>
                                </div>
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--green"><svg className="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">12</div><div className="stat-mini__label">총 예시 개수</div></div>
                                </div>
                                <div className="stat-mini">
                                    <div className="stat-mini__icon stat-mini__icon--purple"><svg className="icon" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                                    <div className="stat-mini__info"><div className="stat-mini__value">78회</div><div className="stat-mini__label">적용 횟수</div></div>
                                </div>
                            </div>
                            <div className="items-grid">
                                <div className="fewshot-card">
                                    <div className="fewshot-card__header">
                                        <div><div className="fewshot-card__title">감정 분석 예시</div><div className="fewshot-card__count">4개의 입출력 예시</div></div>
                                        <div className="partner-dropdown">
                                            <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                            <div className="dropdown__menu">
                                                <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                                <div className="dropdown__divider"></div>
                                                <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fewshot-card__body">
                                        <div className="fewshot-card__example"><div className="fewshot-card__label fewshot-card__label--input"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline></svg>입력</div><div className="fewshot-card__text">"이 제품 정말 최고예요! 다음에 또 구매할게요."</div></div>
                                        <div className="fewshot-card__example"><div className="fewshot-card__label fewshot-card__label--output"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline></svg>출력</div><div className="fewshot-card__text">감정: 긍정적 (95%)
                                            키워드: 만족, 재구매 의사</div></div>
                                    </div>
                                    <div className="fewshot-card__footer">
                                        <div className="fewshot-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                            <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fewshot-card">
                                    <div className="fewshot-card__header">
                                        <div><div className="fewshot-card__title">코드 리팩토링 예시</div><div className="fewshot-card__count">3개의 입출력 예시</div></div>
                                        <div className="partner-dropdown">
                                            <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                            <div className="dropdown__menu">
                                                <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                <button className="dropdown__item dropdown__item--primary" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>공유하기</button>
                                                <div className="dropdown__divider"></div>
                                                <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fewshot-card__body">
                                        <div className="fewshot-card__example"><div className="fewshot-card__label fewshot-card__label--input"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline></svg>입력</div><div className="fewshot-card__text">for i in range(len(arr)):
                                            print(arr[i])</div></div>
                                        <div className="fewshot-card__example"><div className="fewshot-card__label fewshot-card__label--output"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline></svg>출력</div><div className="fewshot-card__text">for item in arr:
                                            print(item)</div></div>
                                    </div>
                                    <div className="fewshot-card__footer">
                                        <div className="fewshot-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">프롬프트 엔지니어링</span>
                                            <span className="status-badge status-badge--draft"><span className="status-badge__dot"></span>비공개</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fewshot-card">
                                    <div className="fewshot-card__header">
                                        <div><div className="fewshot-card__title">요약 스타일 예시</div><div className="fewshot-card__count">5개의 입출력 예시</div></div>
                                        <div className="partner-dropdown">
                                            <button className="agent-card__menu" ><svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                            <div className="dropdown__menu">
                                                <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>수정</button>
                                                <button className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>복제</button>
                                                <button className="dropdown__item dropdown__item--warning" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>공유 중지</button>
                                                <div className="dropdown__divider"></div>
                                                <button className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>삭제</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fewshot-card__body">
                                        <div className="fewshot-card__example"><div className="fewshot-card__label fewshot-card__label--input"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline></svg>입력</div><div className="fewshot-card__text">"인공지능(AI)은 인간의 학습능력, 추론능력을..."</div></div>
                                        <div className="fewshot-card__example"><div className="fewshot-card__label fewshot-card__label--output"><svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline></svg>출력</div><div className="fewshot-card__text">AI = 인간 지능을 모방한 컴퓨터 프로그램</div></div>
                                    </div>
                                    <div className="fewshot-card__footer">
                                        <div className="fewshot-card__meta">
                                            <span className="agent-card__tag agent-card__tag--course">AI 기초과정</span>
                                            <span className="status-badge status-badge--active"><span className="status-badge__dot"></span>공유 중</span>
                                        </div>
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