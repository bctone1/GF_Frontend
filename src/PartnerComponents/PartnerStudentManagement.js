import PartnerSidebar from './PartnerSidebar';
import { useState } from 'react';

export default function PartnerStudentManagement() {

    const [inviteStudentModalOpen, setInviteStudentModalOpen] = useState(false);
    const [modalCodeShown, setModalCodeShown] = useState(false);
    const [modalSelectedClass, setModalSelectedClass] = useState(null);

    const handleSelectClass = (e) => {
        if (e.target.value === '') {
            setModalCodeShown(false);
            setModalSelectedClass(null);
            return;
        }
        
        setModalSelectedClass(e.target.value);
        setModalCodeShown(true);
    }

    return (
        <>
            <div class={`PT-STManagement-modal-overlay ${inviteStudentModalOpen ? 'PT-STManagement-modal-overlay--open' : ''}`}
                onClick={() => setInviteStudentModalOpen(false)}
            >
                <div class="PT-STManagement-modal" onClick={(e) => e.stopPropagation()}>
                    <div class="PT-STManagement-modal__header">
                        <h2 class="PT-STManagement-modal__title">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            학생 초대
                        </h2>
                        <button class="PT-STManagement-modal__close" onClick={() => setInviteStudentModalOpen(false)}>
                            <svg class="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div class="PT-STManagement-modal__body">
                        <div class="form-group">
                            <label class="form-label">초대할 강의 선택</label>
                            <select class="form-input"
                                onChange={(e) => handleSelectClass(e)}
                            >
                                <option value="">강의를 선택하세요</option>
                                <option value="ai-basic" data-code="GF7X3K">2025 AI 기초과정</option>
                                <option value="prompt" data-code="GF2K4M">프롬프트 엔지니어링</option>
                                <option value="llm" data-code="GF5N8R">2025 LLM 활용 실무</option>
                            </select>
                        </div>

                        {/* 초대 정보 영역 (강의 선택 후 표시) */}
                        <div class="invite-info" style={{ display: modalCodeShown ? 'block' : 'none' }}>
                            {/* 초대 코드 */}
                            <div class="form-group">
                                <label class="form-label">초대 코드</label>
                                <div class="invite-code-box">
                                    <div class="invite-code-box__code" id="inviteCode">GF7X3K</div>
                                    <button class="invite-code-box__btn" title="코드 복사">
                                        <svg class="icon icon--sm" viewBox="0 0 24 24">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="form-hint">학생이 회원가입 시 입력하는 코드입니다</div>
                            </div>

                            {/* 초대 링크 */}
                            <div class="form-group">
                                <label class="form-label">초대 링크</label>
                                <div class="invite-link-box">
                                    <input type="text" class="invite-link-box__input" value="https://growfit.ai/join?code=GF7X3K" readOnly />
                                    <button class="invite-link-box__btn" title="링크 복사">
                                        <svg class="icon icon--sm" viewBox="0 0 24 24">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="form-hint">이 링크를 학생들에게 공유하세요</div>
                            </div>

                            {/* 공유 방법 안내 */}
                            <div class="invite-guide">
                                <div class="invite-guide__header">
                                    <svg class="icon icon--sm" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    <span>학생 초대 방법</span>
                                </div>
                                <ol class="invite-guide__list">
                                    <li>위의 <strong>초대 링크</strong> 또는 <strong>초대 코드</strong>를 복사합니다</li>
                                    <li>카카오톡, 이메일, 문자 등으로 학생들에게 공유합니다</li>
                                    <li>학생이 링크로 접속하거나 코드를 입력하면 강의에 등록됩니다</li>
                                </ol>
                            </div>

                            {/* 빠른 공유 버튼 */}
                            <div class="invite-share">
                                <label class="form-label">빠른 공유</label>
                                <div class="invite-share__buttons">
                                    <button class="invite-share__btn invite-share__btn--kakao">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.8 5.26 4.5 6.68-.16.56-.57 2.03-.66 2.35-.1.38.14.38.3.27.12-.08 1.92-1.3 2.72-1.84.7.1 1.42.16 2.14.16 5.52 0 10-3.58 10-8S17.52 3 12 3z"></path>
                                        </svg>
                                        카카오톡
                                    </button>
                                    <button class="invite-share__btn invite-share__btn--email">
                                        <svg class="icon icon--sm" viewBox="0 0 24 24">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        이메일
                                    </button>
                                    <button class="invite-share__btn invite-share__btn--copy">
                                        <svg class="icon icon--sm" viewBox="0 0 24 24">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                        전체 복사
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 강의 미선택 시 안내  */}
                        <div class="invite-placeholder" style={{ display: modalCodeShown ? 'none' : 'block' }}>
                            <div class="invite-placeholder__icon">
                                <svg class="icon icon--lg" viewBox="0 0 24 24">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                            </div>
                            <p>초대할 강의를 선택하면<br />초대 코드와 링크가 표시됩니다</p>
                        </div>
                    </div>
                    <div class="PT-STManagement-modal__footer">
                        <button class="btn btn--secondary" onClick={() => setInviteStudentModalOpen(false)}>닫기</button>
                    </div>
                </div>
            </div>

            <div className="app">
                <PartnerSidebar />

                <main className="main">
                    <header className="main-header">
                        <h1 className="main-header__title">학생 관리</h1>
                        <div className="main-header__right">
                            <button className="main-header__btn" title="내보내기">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </button>

                            <button className="btn partner-btn--primary"
                                onClick={() => setInviteStudentModalOpen(true)}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                                학생 초대
                            </button>

                            {/* 알림 버튼  */}
                            <div style={{ position: 'relative' }}>
                                <button className="main-header__btn" title="알림">
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    <span className="main-header__badge">3</span>
                                </button>
                                <div className="notification-dropdown">
                                    <div className="notification-dropdown__header">
                                        <span className="notification-dropdown__title">알림</span>
                                        <span className="notification-dropdown__action">모두 읽음</span>
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
                        {/* Stats */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-card__icon stat-card__icon--primary">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <div className="stat-card__label">전체 학생</div>
                                <div className="stat-card__value">127명</div>
                                <div className="stat-card__change">+12명 이번주</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__icon stat-card__icon--success">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <div className="stat-card__label">수강 중</div>
                                <div className="stat-card__value">89명</div>
                                <div className="stat-card__change">실습 가능</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__icon stat-card__icon--info">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div className="stat-card__label">수강 완료</div>
                                <div className="stat-card__value">38명</div>
                                <div className="stat-card__change">기록 열람만 가능</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__icon stat-card__icon--warning">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <div className="stat-card__label">총 대화</div>
                                <div className="stat-card__value">15.8k</div>
                                <div className="stat-card__change">학생당 평균 124건</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__icon stat-card__icon--purple">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                                <div className="stat-card__label">총 사용 비용</div>
                                <div className="stat-card__value">$406</div>
                                <div className="stat-card__change">학생당 평균 $3.2</div>
                            </div>
                        </div>

                        {/* Student List */}
                        <div className="card">
                            <div className="card__header">
                                <h2 className="card__title">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>학생 목록
                                </h2>
                                <div className="filters">
                                    <select className="filter-select" id="courseFilter">
                                        <option value="">전체 강의</option>
                                        <option value="ai-basic">AI 기초과정</option>
                                        <option value="prompt">프롬프트 엔지니어링</option>
                                        <option value="llm">LLM 활용 실무</option>
                                        <option value="ai-basic-2024">2024 AI 기초 (종료)</option>
                                    </select>
                                    <select className="filter-select" id="statusFilter">
                                        <option value="">전체 상태</option>
                                        <option value="active">수강 중</option>
                                        <option value="completed">수강 완료</option>
                                    </select>
                                    <div className="filter-search">
                                        <svg className="icon icon--sm filter-search__icon" viewBox="0 0 24 24">
                                            <circle cx="11" cy="11" r="8">
                                            </circle><line x1="21" y1="21" x2="16.65" y2="16.65">
                                            </line>
                                        </svg>
                                        <input type="text" className="filter-search__input" placeholder="이름 또는 이메일 검색..." id="searchInput" />
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="student-table">
                                    <thead>
                                        <tr>
                                            <th>학생</th>
                                            <th>등록 강의</th>
                                            <th>수업 기간</th>
                                            <th>마지막 접속</th>
                                            <th>대화 수</th>
                                            <th>사용 비용</th>
                                            <th>상태</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="studentTableBody">
                                        <tr data-name="김민수" data-course="ai-basic" data-status="active">
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-cell__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>김</div>
                                                    <div className="student-cell__info">
                                                        <div className="student-cell__name">김민수</div>
                                                        <div className="student-cell__email"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="92fffbfce1e7bcf9fbffd2f7fff3fbfebcf1fdff">[email&nbsp;protected]</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="course-badge">AI 기초과정</span></td>
                                            <td>01.08 ~ 02.28</td>
                                            <td>2025.01.15</td>
                                            <td>156</td>
                                            <td>$4.80</td>
                                            <td>
                                                <span className="status-badge status-badge--active">
                                                    <span className="status-badge__dot"></span>
                                                    수강 중
                                                </span>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="table-action" title="상세보기">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </button>
                                                    <button className="table-action" title="메시지"><svg className="icon icon--sm" viewBox="0 0 24 24">
                                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                                                        </path>
                                                    </svg>
                                                    </button>
                                                    <button className="table-action table-action--danger" title="제외">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="8.5" cy="7" r="4"></circle>
                                                            <line x1="18" y1="8" x2="23" y2="13"></line>
                                                            <line x1="23" y1="8" x2="18" y2="13"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-name="이지은" data-course="prompt" data-status="active">
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-cell__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>이</div>
                                                    <div className="student-cell__info">
                                                        <div className="student-cell__name">이지은</div>
                                                        <div className="student-cell__email">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="85efece0f0ebabe9e0e0c5e0e8e4ece9abe6eae8">[email&nbsp;protected]</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="course-badge">프롬프트 엔지니어링</span></td>
                                            <td>01.05 ~ 03.15</td>
                                            <td>2025.01.15</td>
                                            <td>234</td>
                                            <td>$7.20</td>
                                            <td><span className="status-badge status-badge--active"><span className="status-badge__dot"></span>수강 중</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="table-action" title="상세보기">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </button>

                                                    <button className="table-action" title="메시지">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                        </svg>
                                                    </button>

                                                    <button className="table-action table-action--danger" title="제외">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="8.5" cy="7" r="4"></circle>
                                                            <line x1="18" y1="8" x2="23" y2="13"></line>
                                                            <line x1="23" y1="8" x2="18" y2="13"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-name="박서연" data-course="ai-basic" data-status="active">
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-cell__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>박</div>
                                                    <div className="student-cell__info">
                                                        <div className="student-cell__name">박서연</div>
                                                        <div className="student-cell__email">
                                                            <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="4132242e38242e2f6f3120332a01242c20282d6f222e2c">[email&nbsp;protected]</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="course-badge">AI 기초과정</span></td>
                                            <td>01.08 ~ 02.28</td>
                                            <td>2025.01.14</td>
                                            <td>89</td>
                                            <td>$2.70</td>
                                            <td><span className="status-badge status-badge--active"><span className="status-badge__dot"></span>수강 중</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="table-action" title="상세보기">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle></svg>
                                                    </button>
                                                    <button className="table-action" title="메시지">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                    <button className="table-action table-action--danger" title="제외">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="8.5" cy="7" r="4"></circle>
                                                            <line x1="18" y1="8" x2="23" y2="13"></line>
                                                            <line x1="23" y1="8" x2="18" y2="13"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-name="최준호" data-course="ai-basic-2024" data-status="completed">
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-cell__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>최</div>
                                                    <div className="student-cell__info">
                                                        <div className="student-cell__name">최준호</div>
                                                        <div className="student-cell__email"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="402a352e282f6e23282f2900252d21292c6e232f2d">[email&nbsp;protected]</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="course-badge course-badge--ended">2024 AI 기초</span></td>
                                            <td>09.01 ~ 12.15</td>
                                            <td>2024.12.15</td>
                                            <td>145</td>
                                            <td>$4.40</td>
                                            <td><span className="status-badge status-badge--completed"><span className="status-badge__dot"></span>수강 완료</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="table-action" title="상세보기"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                                                    <button className="table-action" title="메시지"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-name="정하나" data-course="prompt" data-status="active">
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-cell__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>정</div>
                                                    <div className="student-cell__info">
                                                        <div className="student-cell__name">정하나</div>
                                                        <div className="student-cell__email"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="177f767976397d62797057727a767e7b3974787a">[email&nbsp;protected]</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="course-badge">프롬프트 엔지니어링</span><span className="course-badge">AI 기초과정</span></td>
                                            <td>01.05 ~ 03.15</td>
                                            <td>2025.01.15</td>
                                            <td>342</td>
                                            <td>$10.20</td>
                                            <td><span className="status-badge status-badge--active"><span className="status-badge__dot"></span>수강 중</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="table-action" title="상세보기"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                                                    <button className="table-action" title="메시지"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                                                    <button className="table-action table-action--danger" title="제외"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr data-name="한소영" data-course="ai-basic-2024" data-status="completed">
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-cell__avatar" style={{ background: 'linear-gradient(135deg, #c084fc, #9333ea)' }}>한</div>
                                                    <div className="student-cell__info">
                                                        <div className="student-cell__name">한소영</div>
                                                        <div className="student-cell__email"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="780b1701170d161f56101916381d15191114561b1715">[email&nbsp;protected]</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="course-badge course-badge--ended">2024 AI 기초</span></td>
                                            <td>09.01 ~ 12.15</td>
                                            <td>2024.12.14</td>
                                            <td>198</td>
                                            <td>$5.90</td>
                                            <td><span className="status-badge status-badge--completed"><span className="status-badge__dot"></span>수강 완료</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="table-action" title="상세보기"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                                                    <button className="table-action" title="메시지"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>



            </div>
        </>
    )
}