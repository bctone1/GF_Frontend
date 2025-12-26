import UserSidebar2026 from './UserSidebar2026';
import { useState, useCallback } from 'react';
import { formatDate_YY_MM_DD, showToast2026, showConfirm } from '../utill/utill';
import { useRef } from 'react';
import axios from 'axios';



export default function UserSetting2026() {
    const accessToken = sessionStorage.getItem("access_token");
    const [classArray, setClassArray] = useState([]);

    const handleClassesData = useCallback((classes, isLoading) => {
        console.log(classes);
        if (!isLoading) {
            setClassArray(classes);
        }
    }, []);

    const [currentSection, setCurrentSection] = useState('enrolled');

    const [inviteStatus, setInviteStatus] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = inviteCodeRefs.current.map(ref => ref?.value || '').join('');

        if (code.length === 6) {
            axios.post(`${process.env.REACT_APP_API_URL}/user/class/invites/redeem`, {
                code: code
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }).then(response => {
                setInviteStatus(false);
                showToast2026(`강의가 등록되었습니다!`, 'info');
                resetInviteCodeInputs();
                setRefreshClassesTrigger(prev => prev + 1);
            }).catch(error => {
                const errorMessage = error.response?.data?.message || error.message || '초대코드 등록에 실패했습니다.';
                showToast2026(errorMessage, 'error');
            });
        }
    };

    const handleDeleteClass = async (enrollment_id) => {
        if (!window.confirm('수강을 취소하겠습니까?')) return;

        console.log(enrollment_id);
        axios.delete(`${process.env.REACT_APP_API_URL}/user/class/enrollments/${enrollment_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            console.log(response.data);
            showToast2026(`강의가 삭제되었습니다.`, 'success');
            setRefreshClassesTrigger(prev => prev + 1);
        }).catch(error => {
            console.log(error);
        });

        console.log(enrollment_id);
        axios.delete(`${process.env.REACT_APP_API_URL}/user/class/enrollments/${enrollment_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            console.log(response.data);
            showToast2026(`강의가 삭제되었습니다.`, 'success');
            setRefreshClassesTrigger(prev => prev + 1);
        }).catch(error => {
            console.log(error);
        });
    }





    const [refreshClassesTrigger, setRefreshClassesTrigger] = useState(0);
    const inviteCodeRefs = useRef([]);

    // 초대코드 입력 필드 초기화
    if (inviteCodeRefs.current.length !== 6) {
        inviteCodeRefs.current = Array(6).fill().map((_, i) => inviteCodeRefs.current[i] || null);
    }



    const handleInviteCodeChange = (index, value) => {
        // 영문자와 숫자만 허용
        const sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

        // 현재 필드에 값 설정
        if (inviteCodeRefs.current[index]) {
            inviteCodeRefs.current[index].value = sanitizedValue;
        }

        // 값이 입력되었고 다음 필드가 있으면 다음 필드로 이동
        if (sanitizedValue && index < 5) {
            inviteCodeRefs.current[index + 1]?.focus();
        }
    };

    const handleInviteCodeKeyDown = (index, e) => {
        // 백스페이스 키를 눌렀을 때
        if (e.key === 'Backspace' && !inviteCodeRefs.current[index].value && index > 0) {
            inviteCodeRefs.current[index - 1]?.focus();
        }
        // 화살표 키로 이동
        else if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            inviteCodeRefs.current[index - 1]?.focus();
        }
        else if (e.key === 'ArrowRight' && index < 5) {
            e.preventDefault();
            inviteCodeRefs.current[index + 1]?.focus();
        }
    };

    const handleInviteCodePaste = (e) => {
        e.preventDefault();
        const pastedData = (e.clipboardData || window.clipboardData).getData('text');
        const sanitizedData = pastedData.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6);

        // 각 필드에 값 설정
        sanitizedData.split('').forEach((char, i) => {
            if (i < 6 && inviteCodeRefs.current[i]) {
                inviteCodeRefs.current[i].value = char;
            }
        });

        // 마지막 입력된 필드 다음으로 포커스 이동
        const nextIndex = Math.min(sanitizedData.length, 5);
        inviteCodeRefs.current[nextIndex]?.focus();
    };

    // 초대코드 입력 필드 초기화 함수
    const resetInviteCodeInputs = () => {
        inviteCodeRefs.current.forEach(ref => {
            if (ref) {
                ref.value = '';
            }
        });
    };


    return (
        <>
            <div className="app">
                <UserSidebar2026
                    onClassesData={handleClassesData}
                    refreshTrigger={refreshClassesTrigger}
                />
                <main className="main">
                    <div className="page-header">
                        <div className="page-header__left">
                            <svg className="icon icon--lg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                            <h1 className="page-header__title">설정</h1>
                        </div>
                    </div>

                    <div className="settings-content">
                        <div className="settings-layout">
                            {/* Settings Sidebar */}
                            <div className="settings-sidebar">
                                <nav className="settings-nav">
                                    <button className={`settings-nav__item ${currentSection === 'enrolled' ? 'settings-nav__item--active' : ''}`} onClick={() => setCurrentSection('enrolled')}>
                                        <span className="settings-nav__icon"><svg className="icon" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" /></svg></span>
                                        <span>수강 강의</span>
                                    </button>
                                    <button className={`settings-nav__item ${currentSection === 'account' ? 'settings-nav__item--active' : ''}`} onClick={() => setCurrentSection('account')}>
                                        <span className="settings-nav__icon"><svg className="icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></span>
                                        <span>내 계정</span>
                                    </button>
                                    <button className={`settings-nav__item ${currentSection === 'preferences' ? 'settings-nav__item--active' : ''}`} onClick={() => setCurrentSection('preferences')}>
                                        <span className="settings-nav__icon"><svg className="icon" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg></span>
                                        <span>환경설정</span>
                                    </button>
                                    <button className={`settings-nav__item ${currentSection === 'help' ? 'settings-nav__item--active' : ''}`} onClick={() => setCurrentSection('help')}>
                                        <span className="settings-nav__icon"><svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></span>
                                        <span>도움말</span>
                                    </button>
                                </nav>
                            </div>

                            {/* Settings Panel */}
                            <div className="user-settings-panel">
                                {/* 수강 강의 섹션 */}
                                <div id="enrolled-section" className={`user-settings-section ${currentSection === 'enrolled' ? 'user-settings-section--active' : ''}`}>
                                    <div className="user-settings-section__header">
                                        <h2 className="user-settings-section__title">수강 강의</h2>
                                        <p className="user-settings-section__desc">현재 수강 중인 강의를 관리하고 새 강의를 등록하세요</p>
                                    </div>
                                    <div className="user-settings-section__body">



                                        <div className="class-list">
                                            {classArray.length === 0 && (
                                                <div className="no-classes">
                                                    <div className="no-classes__icon">
                                                        <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"></path></svg>
                                                    </div>
                                                    <h3 className="no-classes__title">등록된 강의가 없습니다</h3>
                                                    <p className="no-classes__desc">초대코드를 입력하여 새로운 강의를 등록하세요</p>
                                                </div>
                                            )}




                                            {classArray.map((classInfo) => {
                                                const now = new Date();
                                                const startDate = new Date(classInfo.class_start_at);
                                                const endDate = new Date(classInfo.class_end_at);
                                                const daysUntilStart = Math.floor((startDate - now) / (1000 * 60 * 60 * 24) + 1);
                                                const daysLeft = Math.floor((endDate - now) / (1000 * 60 * 60 * 24) + 1);
                                                let statusBadge;
                                                let isDisabled = false;

                                                if (daysUntilStart > 0) {
                                                    // 예정
                                                    statusBadge = "예정"
                                                    isDisabled = true;
                                                } else if (daysLeft < 0) {
                                                    // 종료됨
                                                    statusBadge = "종료됨"
                                                    isDisabled = true;
                                                } else {
                                                    // 진행 중
                                                    statusBadge = "진행 중"
                                                    isDisabled = false;
                                                }

                                                return (
                                                    <div className="class-card" key={classInfo.class_id}>
                                                        <div className="class-card__header">
                                                            <div className="class-card__icon">
                                                                <svg className="icon" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"></path></svg>
                                                            </div>
                                                            <span className={`class-card__badge ${isDisabled ? 'class-card__badge--ended' : 'class-card__badge--active'}`}>{statusBadge}</span>
                                                        </div>
                                                        <h3 className="class-card__title">{classInfo.class_title}</h3>
                                                        <div className="class-card__info">
                                                            <div className="class-card__info-item">
                                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                                <span>{classInfo.teacher_name}</span>
                                                            </div>
                                                            <div className="class-card__info-item">
                                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                                <span>{formatDate_YY_MM_DD(classInfo.class_start_at)} ~ {formatDate_YY_MM_DD(classInfo.class_end_at)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="class-card__actions">
                                                            <button className="class-card__action-btn"
                                                                disabled={isDisabled}
                                                            >실습하기</button>
                                                            <button className="class-card__action-btn class-card__action-btn--danger"
                                                                onClick={() => handleDeleteClass(classInfo.enrollment_id)}
                                                            >삭제</button>
                                                        </div>
                                                    </div>
                                                )
                                            })}


                                        </div>



                                        <button className="btn-add-class" style={{ marginTop: "16px" }}
                                            onClick={() => setInviteStatus(true)}
                                        >
                                            <svg className="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                            <span>새 강의 등록</span>
                                        </button>
                                    </div>
                                </div>

                                {/* 내 계정 섹션 */}
                                <div id="account-section" className={`user-settings-section ${currentSection === 'account' ? 'user-settings-section--active' : ''}`}>
                                    <div className="user-settings-section__header">
                                        <h2 className="user-settings-section__title">내 계정</h2>
                                        <p className="user-settings-section__desc">프로필 정보와 계정 보안을 관리하세요</p>
                                    </div>
                                    <div className="user-settings-section__body">
                                        {/* 프로필 */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">프로필 정보</h3>
                                            <p className="setting-group__desc">기본 프로필 정보를 수정하세요</p>

                                            <div className="profile-avatar">
                                                <div className="profile-avatar__image">홍</div>
                                                <div className="profile-avatar__actions">
                                                    <button className="btn btn--outline btn--sm" >사진 변경</button>
                                                    <button className="btn btn--outline btn--sm" >사진 제거</button>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">이름</label>
                                                <input type="text" className="form-input" id="userName" />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">이메일</label>
                                                <input type="email" className="form-input" id="userEmail" disabled />
                                                <div className="form-hint">이메일은 관리자만 변경할 수 있습니다</div>
                                            </div>
                                        </div>

                                        {/* 비밀번호 변경 */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">비밀번호 변경</h3>
                                            <p className="setting-group__desc">계정 보안을 위해 주기적으로 비밀번호를 변경하세요</p>

                                            <div className="form-group">
                                                <label className="form-label">현재 비밀번호</label>
                                                <input type="password" className="form-input" id="currentPassword" placeholder="현재 비밀번호 입력" />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">새 비밀번호</label>
                                                <input type="password" className="form-input" id="newPassword" placeholder="새 비밀번호 입력" />
                                                <div className="form-hint">8자 이상, 영문/숫자/특수문자 포함</div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">새 비밀번호 확인</label>
                                                <input type="password" className="form-input" id="confirmPassword" placeholder="새 비밀번호 다시 입력" />
                                            </div>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="btn btn--outline" >취소</button>
                                            <button className="btn btn--primary" >변경사항 저장</button>
                                        </div>
                                    </div>
                                </div>

                                {/* 환경설정 섹션 */}
                                <div id="preferences-section" className={`user-settings-section ${currentSection === 'preferences' ? 'user-settings-section--active' : ''}`}>
                                    <div className="user-settings-section__header">
                                        <h2 className="user-settings-section__title">환경설정</h2>
                                        <p className="user-settings-section__desc">앱 사용 환경을 맞춤 설정하세요</p>
                                    </div>
                                    <div className="user-settings-section__body">
                                        {/* 테마 */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">테마</h3>
                                            <p className="setting-group__desc">화면 테마를 선택하세요</p>

                                            <div className="form-group">
                                                <label className="form-label">테마 모드</label>
                                                <select className="form-select" id="themeMode">
                                                    <option value="light" >라이트 모드</option>
                                                    <option value="dark">다크 모드</option>
                                                    <option value="auto">시스템 설정 따르기</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 언어 */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">언어</h3>
                                            <p className="setting-group__desc">앱 표시 언어를 선택하세요</p>

                                            <div className="form-group">
                                                <label className="form-label">언어</label>
                                                <select className="form-select" id="language">
                                                    <option value="ko" >한국어</option>
                                                    <option value="en">English</option>
                                                    <option value="ja">日本語</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* 알림 */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">알림</h3>
                                            <p className="setting-group__desc">알림 설정을 관리하세요</p>

                                            <div className="setting-item">
                                                <div className="setting-item__info">
                                                    <div className="setting-item__label">이메일 알림</div>
                                                    <div className="setting-item__desc">중요한 업데이트를 이메일로 받습니다</div>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" id="emailNotification" />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>

                                            <div className="setting-item">
                                                <div className="setting-item__info">
                                                    <div className="setting-item__label">브라우저 알림</div>
                                                    <div className="setting-item__desc">새 메시지나 업데이트를 알려줍니다</div>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" id="browserNotification" />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="btn btn--outline" >초기화</button>
                                            <button className="btn btn--primary" >저장</button>
                                        </div>
                                    </div>
                                </div>

                                {/* 도움말 섹션 */}
                                <div id="help-section" className={`user-settings-section ${currentSection === 'help' ? 'user-settings-section--active' : ''}`}>
                                    <div className="user-settings-section__header">
                                        <h2 className="user-settings-section__title">도움말</h2>
                                        <p className="user-settings-section__desc">자주 묻는 질문과 문의 방법을 확인하세요</p>
                                    </div>
                                    <div className="user-settings-section__body">
                                        {/* FAQ */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">자주 묻는 질문</h3>

                                            <div className="faq-list">
                                                <div className="faq-item" >
                                                    <div className="faq-item__question">
                                                        <span>초대코드는 어디서 받나요?</span>
                                                        <svg className="icon icon--sm faq-item__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                                    </div>
                                                    <div className="faq-item__answer">
                                                        초대코드는 담당 강사님께 문의하시면 받으실 수 있습니다. 강의 시작 전 또는 첫 수업 시간에 안내받으실 수 있습니다.
                                                    </div>
                                                </div>

                                                <div className="faq-item" >
                                                    <div className="faq-item__question">
                                                        <span>AI 모델은 어떤 것들이 있나요?</span>
                                                        <svg className="icon icon--sm faq-item__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                                    </div>
                                                    <div className="faq-item__answer">
                                                        현재 GPT-4, Claude, Gemini, EXAONE 등 다양한 AI 모델을 지원합니다. 강의에 따라 사용 가능한 모델이 다를 수 있습니다.
                                                    </div>
                                                </div>

                                                <div className="faq-item" >
                                                    <div className="faq-item__question">
                                                        <span>대화 기록은 어디서 확인하나요?</span>
                                                        <svg className="icon icon--sm faq-item__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                                    </div>
                                                    <div className="faq-item__answer">
                                                        좌측 사이드바의 "내 기록" 메뉴에서 모든 대화 기록을 확인할 수 있습니다. 프로젝트별로 정리하여 관리할 수도 있습니다.
                                                    </div>
                                                </div>

                                                <div className="faq-item" >
                                                    <div className="faq-item__question">
                                                        <span>비밀번호를 잊어버렸어요</span>
                                                        <svg className="icon icon--sm faq-item__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                                    </div>
                                                    <div className="faq-item__answer">
                                                        로그인 페이지의 "비밀번호 찾기" 버튼을 클릭하여 등록된 이메일로 재설정 링크를 받으실 수 있습니다.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 문의하기  */}
                                        <div className="setting-group">
                                            <h3 className="setting-group__title">문의하기</h3>

                                            <div className="help-contact">
                                                <div className="help-contact__title">추가 도움이 필요하신가요?</div>
                                                <div className="help-contact__desc">담당 강사님께 문의하시거나 아래 버튼을 통해 문의해주세요</div>
                                                <button className="btn btn--primary" >
                                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                                    문의하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


            <div className={`modal-overlay ${inviteStatus ? 'modal-overlay--visible' : ''}`} id="inviteModal" onClick={() => {
                setInviteStatus(false);
                resetInviteCodeInputs();
            }}>
                <div className="invite-modal" onClick={e => e.stopPropagation()}>
                    <div className="invite-modal__header">
                        <div className="invite-modal__icon">
                            <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" /></svg>
                        </div>
                        <h2 className="invite-modal__title">새 강의 등록</h2>
                        <p className="invite-modal__subtitle">초대코드를 입력하세요</p>
                    </div>
                    <div className="invite-modal__body">
                        <p className="invite-modal__description">
                            강사님께 받은 6자리 초대코드를 입력하면<br />해당 강의에 등록됩니다.
                        </p>


                        <form id="inviteCodeForm" onSubmit={handleSubmit}>
                            <label className="invite-code-label">초대코드 입력</label>
                            <div className="invite-code-inputs">
                                <input ref={el => inviteCodeRefs.current[0] = el} type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required
                                    autoComplete="off"
                                    onChange={(e) => handleInviteCodeChange(0, e.target.value)}
                                    onKeyDown={(e) => handleInviteCodeKeyDown(0, e)}
                                    onPaste={handleInviteCodePaste}
                                />
                                <input ref={el => inviteCodeRefs.current[1] = el} type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required
                                    autoComplete="off"
                                    onChange={(e) => handleInviteCodeChange(1, e.target.value)}
                                    onKeyDown={(e) => handleInviteCodeKeyDown(1, e)}
                                    onPaste={handleInviteCodePaste}
                                />
                                <input ref={el => inviteCodeRefs.current[2] = el} type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required
                                    autoComplete="off"
                                    onChange={(e) => handleInviteCodeChange(2, e.target.value)}
                                    onKeyDown={(e) => handleInviteCodeKeyDown(2, e)}
                                    onPaste={handleInviteCodePaste}
                                />
                                <input ref={el => inviteCodeRefs.current[3] = el} type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required
                                    autoComplete="off"
                                    onChange={(e) => handleInviteCodeChange(3, e.target.value)}
                                    onKeyDown={(e) => handleInviteCodeKeyDown(3, e)}
                                    onPaste={handleInviteCodePaste}
                                />
                                <input ref={el => inviteCodeRefs.current[4] = el} type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required
                                    autoComplete="off"
                                    onChange={(e) => handleInviteCodeChange(4, e.target.value)}
                                    onKeyDown={(e) => handleInviteCodeKeyDown(4, e)}
                                    onPaste={handleInviteCodePaste}
                                />
                                <input ref={el => inviteCodeRefs.current[5] = el} type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required
                                    autoComplete="off"
                                    onChange={(e) => handleInviteCodeChange(5, e.target.value)}
                                    onKeyDown={(e) => handleInviteCodeKeyDown(5, e)}
                                    onPaste={handleInviteCodePaste}
                                />
                            </div>
                            <div className="invite-code-help">영문 대문자와 숫자 조합</div>

                            <div className="invite-code-error" id="inviteError">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                <span id="inviteErrorText">올바른 초대코드가 아닙니다</span>
                            </div>

                            <div className="invite-modal__actions">
                                <button className="btn btn--outline" onClick={() => {
                                    setInviteStatus(false);
                                    resetInviteCodeInputs();
                                }}>취소</button>
                                <button className="btn btn--primary" id="submitCodeBtn" type="submit" >등록하기</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>

        </>
    );
}