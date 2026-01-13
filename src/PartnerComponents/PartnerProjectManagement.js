import PartnerSidebar from './PartnerSidebar';
import { useState, useEffect, useRef } from 'react';
import { showToast2026 } from '../utill/utill';

export default function PartnerProjectManagement() {
    const [showModal, setShowModal] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // 열린 dropdown의 course 이름
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);

    // 외부 클릭 시 dropdown 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            // dropdown 내부나 "더보기" 버튼이 아닌 곳을 클릭하면 닫기
            const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
            const isMoreButton = event.target.closest('.course-item__action[title="더보기"]');

            if (!isInsideDropdown && !isMoreButton) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            // 약간의 지연을 두어 현재 클릭 이벤트가 처리된 후에 리스너 추가
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    // "더보기" 버튼 클릭 핸들러
    const handleMoreClick = (event, courseName) => {
        event.stopPropagation();
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        // dropdown의 예상 너비 (CSS에서 min-width: 180px)
        const dropdownWidth = 180;
        const dropdownHeight = 200; // 대략적인 높이

        let left = rect.left;
        let top = rect.bottom + 4; // 버튼 아래 4px

        // 화면 오른쪽으로 넘어가지 않도록 조정
        if (left + dropdownWidth > window.innerWidth) {
            left = window.innerWidth - dropdownWidth - 8; // 오른쪽 여백 8px
        }

        // 화면 아래로 넘어가지 않으면 위에 표시
        if (top + dropdownHeight > window.innerHeight) {
            top = rect.top - dropdownHeight - 4; // 버튼 위에 표시
        }

        setDropdownPosition({ top, left });

        // 같은 버튼을 다시 클릭하면 닫기, 다른 버튼이면 열기
        setOpenDropdown(openDropdown === courseName ? null : courseName);
    };

    return (
        <>
            <div className={`partner-modal-overlay ${showModal ? 'partner-modal-overlay--open' : ''}`}
                onClick={() => setShowModal(false)}
            >
                <div className="partner-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="partner-modal__header">
                        <h2 className="partner-modal__title">
                            <svg className="icon" viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                            새 강의 등록
                        </h2>
                        <button className="partner-modal__close"
                            onClick={() => setShowModal(false)}
                        >
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="partner-modal__body">
                        <form id="createCourseForm">
                            <div className="form-group">
                                <label className="form-label">강의명 <span>*</span></label>
                                <input type="text" className="form-input" id="courseName" placeholder="예: 2025 AI 기초과정" required="" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">시작일 <span>*</span></label>
                                    <input type="date" className="form-input" id="startDate" required="" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">종료일 <span>*</span></label>
                                    <input type="date" className="form-input" id="endDate" required="" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">예상 학생 수</label>
                                <input type="number" className="form-input" id="studentCount" placeholder="예: 20" min="1" max="100" value="20" readOnly />
                                <div className="form-hint">학생 수에 따라 예상 비용이 계산됩니다</div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">사용할 AI 모델 <span>*</span></label>
                                <div className="llm-grid">
                                    <div className="llm-option llm-option--selected">
                                        <div className="llm-option__checkbox">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <div className="llm-option__icon llm-option__icon--gpt">G</div>
                                        <div>
                                            <div className="llm-option__name">GPT-4</div>
                                            <div className="llm-option__desc">OpenAI</div>
                                        </div>
                                    </div>

                                    <div className="llm-option llm-option--selected">
                                        <div className="llm-option__checkbox">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <div className="llm-option__icon llm-option__icon--claude">C</div>
                                        <div>
                                            <div className="llm-option__name">Claude</div>
                                            <div className="llm-option__desc">Anthropic</div>
                                        </div>
                                    </div>

                                    <div className="llm-option">
                                        <div className="llm-option__checkbox"></div>
                                        <div className="llm-option__icon llm-option__icon--gemini">G</div>
                                        <div>
                                            <div className="llm-option__name">Gemini</div>
                                            <div className="llm-option__desc">Google</div>
                                        </div>
                                    </div>

                                    <div className="llm-option">
                                        <div className="llm-option__checkbox"></div>
                                        <div className="llm-option__icon llm-option__icon--exaone">E</div>
                                        <div><div className="llm-option__name">EXAONE</div>
                                            <div className="llm-option__desc">LG AI</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cost-estimate">
                                <div className="cost-estimate__title">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>예상 비용
                                </div>
                                <div className="cost-estimate__row">
                                    <span className="cost-estimate__label">플랫폼 사용료</span>
                                    <span className="cost-estimate__value" id="platformFee">₩100,000</span>
                                </div>
                                <div className="cost-estimate__row">
                                    <span className="cost-estimate__label">예상 API 사용료</span>
                                    <span className="cost-estimate__value" id="apiFee">~₩85,000</span>
                                </div>
                                <div className="cost-estimate__row cost-estimate__row--total">
                                    <span className="cost-estimate__label">총 예상 비용</span>
                                    <span className="cost-estimate__value" id="totalCost">₩185,000</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="partner-modal__footer">
                        <button className="btn btn--secondary" onClick={() => setShowModal(false)}>취소</button>
                        <button className="btn btn--primary"
                            onClick={() => {
                                setShowModal(false);
                                showToast2026('강의 생성 완료', 'success');
                            }}
                        >
                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            강의 생성
                        </button>
                    </div>
                </div>
            </div >

            {/* Dropdown Menu */}
            {openDropdown && (
                <div
                    ref={dropdownRef}
                    className={`dropdown-menu dropdown-menu--open`}
                    style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
                >
                    <div className="dropdown-menu__item">
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                        학생 목록 보기
                    </div>
                    <div className="dropdown-menu__item">
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        사용량 통계
                    </div>
                    <div className="dropdown-menu__item">
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        강의 복제
                    </div>
                    <div className="dropdown-menu__divider"></div>
                    <div className="dropdown-menu__item dropdown-menu__item--danger">
                        <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                        강의 종료
                    </div>
                </div>
            )}




            <div className="app">
                <PartnerSidebar />
                <main className="main">
                    <header className="main-header">
                        <h1 className="main-header__title">강의 등록</h1>
                        <div className="main-header__right">
                            <button className="main-header__btn" title="새로고침">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                            </button>
                            <button className="btn partner-btn--primary"
                                onClick={() => setShowModal(true)}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>새 강의 등록
                            </button>

                            {/* 알림 버튼  */}
                            <div style={{ position: 'relative' }}>
                                <button className="main-header__btn" title="알림" >
                                    <svg className="icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    <span className="main-header__badge">3</span>
                                </button>
                                <div className="notification-dropdown" >
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
                        <div className="stats-grid">
                            <div className="stat-card"><div className="stat-card__icon stat-card__icon--primary"><svg className="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div><div className="stat-card__label">전체 강의</div><div className="stat-card__value">7개</div><div className="stat-card__change">+2개 이번달</div></div>
                            <div className="stat-card"><div className="stat-card__icon stat-card__icon--success"><svg className="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div className="stat-card__label">진행 중</div><div className="stat-card__value">5개</div><div className="stat-card__change">127명 학생 참여</div></div>
                            <div className="stat-card"><div className="stat-card__icon stat-card__icon--warning"><svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div><div className="stat-card__label">예정</div><div className="stat-card__value">1개</div><div className="stat-card__change">1/15 시작</div></div>
                            <div className="stat-card"><div className="stat-card__icon stat-card__icon--purple"><svg className="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div className="stat-card__label">종료</div><div className="stat-card__value">2개</div><div className="stat-card__change">총 43명 수료</div></div>
                        </div>
                        <div className="card">
                            <div className="card__header">
                                <h2 className="card__title">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    강의 목록
                                </h2>
                                <div className="filters">
                                    <select className="filter-select" id="statusFilter" >
                                        <option value="">전체 상태</option>
                                        <option value="active">진행중</option>
                                        <option value="upcoming">예정</option>
                                        <option value="ended">종료</option>
                                    </select>
                                    <div className="filter-search">
                                        <svg className="icon icon--sm filter-search__icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        <input type="text" className="filter-search__input" placeholder="강의 검색..." id="searchInput" />
                                    </div>
                                </div>
                            </div>
                            <div className="course-list" id="courseList">

                                <div className="course-item" data-status="active" data-name="2025 AI 기초과정">
                                    <div className="course-item__icon course-item__icon--active">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                    </div>

                                    <div className="course-item__info">
                                        <div className="course-item__name">2025 AI 기초과정</div>
                                        <div className="course-item__meta">
                                            <span className="course-item__meta-item">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                2025.01.08 ~ 01.10
                                            </span>
                                            <span className="course-item__code">GF7X3K</span>
                                        </div>
                                    </div>

                                    <div className="course-item__stats">
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">20</div>
                                            <div className="course-item__stat-label">학생</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">1.2k</div>
                                            <div className="course-item__stat-label">대화</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">$45</div>
                                            <div className="course-item__stat-label">비용</div>
                                        </div>
                                    </div>

                                    <span className="course-item__status course-item__status--active"><span className="course-item__status-dot"></span>진행중</span>

                                    <div className="course-item__actions">
                                        <button className="course-item__action" title="초대코드 복사">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button><button className="course-item__action" title="강의 수정"><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        <button
                                            className="course-item__action"
                                            title="더보기"
                                            onClick={(e) => handleMoreClick(e, '2025 AI 기초과정')}
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="course-item" data-status="active" data-name="프롬프트 엔지니어링">
                                    <div className="course-item__icon course-item__icon--active">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                    </div>
                                    <div className="course-item__info">
                                        <div className="course-item__name">프롬프트 엔지니어링</div>
                                        <div className="course-item__meta">
                                            <span className="course-item__meta-item"><svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                2024.09.01 ~ 2025.01.15
                                            </span>
                                            <span className="course-item__code">GF2K4M</span>
                                        </div>
                                    </div>

                                    <div className="course-item__stats">
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">30</div>
                                            <div className="course-item__stat-label">학생</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">8.7k</div>
                                            <div className="course-item__stat-label">대화</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">$128</div>
                                            <div className="course-item__stat-label">비용</div>
                                        </div>
                                    </div>
                                    <span className="course-item__status course-item__status--active"><span className="course-item__status-dot"></span>진행중</span>
                                    <div className="course-item__actions">
                                        <button className="course-item__action"
                                            title="초대코드 복사">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                        </button>
                                        <button className="course-item__action" title="강의 수정">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            className="course-item__action"
                                            title="더보기"
                                            onClick={(e) => handleMoreClick(e, '프롬프트 엔지니어링')}
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="1"></circle>
                                                <circle cx="19" cy="12" r="1"></circle>
                                                <circle cx="5" cy="12" r="1"></circle>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="course-item" data-status="upcoming" data-name="2025 LLM 활용 실무">
                                    <div className="course-item__icon course-item__icon--upcoming">
                                        <svg className="icon" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>

                                    <div className="course-item__info">
                                        <div className="course-item__name">2025 LLM 활용 실무</div>
                                        <div className="course-item__meta"><span className="course-item__meta-item">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                            2025.01.15 ~ 01.20
                                        </span>
                                            <span className="course-item__code">GF5N8R</span>
                                        </div>
                                    </div>

                                    <div className="course-item__stats">
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">0</div>
                                            <div className="course-item__stat-label">학생</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">-</div>
                                            <div className="course-item__stat-label">대화</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">-</div>
                                            <div className="course-item__stat-label">비용</div>
                                        </div>
                                    </div>

                                    <span className="course-item__status course-item__status--upcoming">D-5</span>
                                    <div className="course-item__actions">
                                        <button className="course-item__action" title="초대코드 복사">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        </button>

                                        <button className="course-item__action" title="강의 수정">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>

                                        <button
                                            className="course-item__action"
                                            title="더보기"
                                            onClick={(e) => handleMoreClick(e, '2025 LLM 활용 실무')}
                                        >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="course-item" data-status="ended" data-name="2024 AI 기초과정" style={{ opacity: 0.7 }}>
                                    <div className="course-item__icon course-item__icon--ended">
                                        <svg className="icon" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    </div>
                                    <div className="course-item__info">
                                        <div className="course-item__name">2024 AI 기초과정</div>
                                        <div className="course-item__meta">
                                            <span className="course-item__meta-item">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>2024.10.15 ~ 10.18</span>
                                        </div>
                                    </div>

                                    <div className="course-item__stats">
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">25</div>
                                            <div className="course-item__stat-label">학생</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">3.2k</div>
                                            <div className="course-item__stat-label">대화</div>
                                        </div>
                                        <div className="course-item__stat">
                                            <div className="course-item__stat-value">$89</div>
                                            <div className="course-item__stat-label">비용</div>
                                        </div>
                                    </div>

                                    <span className="course-item__status course-item__status--ended">종료</span>

                                    <div className="course-item__actions">
                                        <button className="course-item__action" title="통계 보기">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                                <line x1="6" y1="20" x2="6" y2="14"></line>
                                            </svg>
                                        </button>
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