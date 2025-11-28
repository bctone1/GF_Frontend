import { useState, useRef } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { showToast } from '../utill/utill';

export default function UserDashboard() {
    const [activeSection, setActiveSection] = useState('enrolled');

    const showSection = (section) => {
        setActiveSection(section);
    };

    const classes = {
        'class-1': {
            id: 'class-1',
            name: '2025 AI 심화과정',
            status: 'active',
            startDate: '2025-11-01',
            endDate: '2025-12-31',
            instructor: '김강사'
        },
        'class-2': {
            id: 'class-2',
            name: '프롬프트엔지니어링',
            status: 'active',
            startDate: '2025-11-01',
            endDate: '2025-12-15',
            instructor: '이강사'
        },
        'class-3': {
            id: 'class-3',
            name: '2024 AI 기초과정',
            status: 'ended',
            startDate: '2024-09-01',
            endDate: '2024-10-31',
            instructor: '박강사'
        }
    };
    const classArray = Object.values(classes);

    const [inviteStatus, setInviteStatus] = useState(false);
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
    const accessToken = sessionStorage.getItem("access_token");

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
                console.log(response.data);
                setInviteStatus(false);
                showToast(`강의가 등록되었습니다!`, 'success');
            }).catch(error => {
                console.log(error);
            });
        }
    };


    return (
        <>
            <div className={`invite-overlay ${inviteStatus ? '' : 'invite-overlay--hidden'}`} id="inviteOverlay">
                <div className="invite-modal">
                    <div className="invite-modal__header">
                        <div className="invite-modal__icon">🎓</div>
                        <h2 className="invite-modal__title">클래스 초대코드 입력</h2>
                        <p className="invite-modal__subtitle">강사님께서 공유한 초대코드를 입력해주세요</p>
                    </div>
                    <div className="invite-modal__body">

                        <p className="invite-modal__description">GrowFit AI 실습을 시작하려면 클래스 초대코드가 필요합니다.<br />강사님이 공유한 <strong>6자리 코드</strong>를 입력해주세요.</p>
                        <form id="inviteCodeForm" onSubmit={handleSubmit}>
                            <div className="invite-code-input-group">
                                <label className="invite-code-label">초대코드 (6자리)</label>
                                <div className="invite-code-inputs" id="inviteCodeInputs">
                                    <input
                                        ref={el => inviteCodeRefs.current[0] = el}
                                        type="text"
                                        className="invite-code-input"
                                        maxLength="1"
                                        pattern="[A-Za-z0-9]"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => handleInviteCodeChange(0, e.target.value)}
                                        onKeyDown={(e) => handleInviteCodeKeyDown(0, e)}
                                        onPaste={handleInviteCodePaste}
                                    />
                                    <input
                                        ref={el => inviteCodeRefs.current[1] = el}
                                        type="text"
                                        className="invite-code-input"
                                        maxLength="1"
                                        pattern="[A-Za-z0-9]"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => handleInviteCodeChange(1, e.target.value)}
                                        onKeyDown={(e) => handleInviteCodeKeyDown(1, e)}
                                        onPaste={handleInviteCodePaste}
                                    />
                                    <input
                                        ref={el => inviteCodeRefs.current[2] = el}
                                        type="text"
                                        className="invite-code-input"
                                        maxLength="1"
                                        pattern="[A-Za-z0-9]"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => handleInviteCodeChange(2, e.target.value)}
                                        onKeyDown={(e) => handleInviteCodeKeyDown(2, e)}
                                        onPaste={handleInviteCodePaste}
                                    />
                                    <input
                                        ref={el => inviteCodeRefs.current[3] = el}
                                        type="text"
                                        className="invite-code-input"
                                        maxLength="1"
                                        pattern="[A-Za-z0-9]"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => handleInviteCodeChange(3, e.target.value)}
                                        onKeyDown={(e) => handleInviteCodeKeyDown(3, e)}
                                        onPaste={handleInviteCodePaste}
                                    />
                                    <input
                                        ref={el => inviteCodeRefs.current[4] = el}
                                        type="text"
                                        className="invite-code-input"
                                        maxLength="1"
                                        pattern="[A-Za-z0-9]"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => handleInviteCodeChange(4, e.target.value)}
                                        onKeyDown={(e) => handleInviteCodeKeyDown(4, e)}
                                        onPaste={handleInviteCodePaste}
                                    />
                                    <input
                                        ref={el => inviteCodeRefs.current[5] = el}
                                        type="text"
                                        className="invite-code-input"
                                        maxLength="1"
                                        pattern="[A-Za-z0-9]"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => handleInviteCodeChange(5, e.target.value)}
                                        onKeyDown={(e) => handleInviteCodeKeyDown(5, e)}
                                        onPaste={handleInviteCodePaste}
                                    />
                                </div>
                                <p className="invite-code-help">영문자와 숫자만 입력 가능합니다</p>

                                <div className="invite-code-error" id="inviteCodeError">
                                    <span>⚠️</span>
                                    <span id="inviteCodeErrorText">올바른 초대코드가 아닙니다</span>
                                </div>
                            </div>

                            <div className="invite-modal__actions">
                                <button type="button" className="btn-invite btn-invite--secondary" onClick={() => setInviteStatus(false)}>나중에</button>
                                <button type="submit" className="btn-invite btn-invite--primary" id="submitBtn">등록하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="page-header">
                            <h1 className="page-header__title">⚙️ 설정</h1>
                            <p className="page-header__subtitle">계정 정보 및 환경 설정을 관리하세요</p>
                        </div>


                        <div className="settings-layout">

                            <div className="settings-sidebar">
                                <nav className="settings-nav">
                                    <div
                                        className={`settings-nav__item ${activeSection === 'enrolled' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('enrolled')}
                                    >
                                        <span className="settings-nav__icon">📚</span>
                                        <span>수강 강의</span>
                                    </div>

                                    <div
                                        className={`settings-nav__item ${activeSection === 'profile' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('profile')}
                                    >
                                        <span className="settings-nav__icon">👤</span>
                                        <span>프로필</span>
                                    </div>
                                    <div
                                        className={`settings-nav__item ${activeSection === 'preferences' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('preferences')}
                                    >
                                        <span className="settings-nav__icon">🎨</span>
                                        <span>환경설정</span>
                                    </div>
                                    <div
                                        className={`settings-nav__item ${activeSection === 'notifications' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('notifications')}
                                    >
                                        <span className="settings-nav__icon">🔔</span>
                                        <span>알림</span>
                                    </div>
                                    <div
                                        className={`settings-nav__item ${activeSection === 'privacy' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('privacy')}
                                    >
                                        <span className="settings-nav__icon">🔒</span>
                                        <span>개인정보</span>
                                    </div>
                                    <div
                                        className={`settings-nav__item ${activeSection === 'usage' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('usage')}
                                    >
                                        <span className="settings-nav__icon">📊</span>
                                        <span>사용량</span>
                                    </div>
                                    <div
                                        className={`settings-nav__item ${activeSection === 'help' ? 'settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('help')}
                                    >
                                        <span className="settings-nav__icon">❓</span>
                                        <span>도움말</span>
                                    </div>
                                </nav>
                            </div>


                            <div className="settings-content">

                                <div id="enrolled-section" className={`settings-section ${activeSection === 'enrolled' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">수강 중인 강의</h2>
                                    <p className="settings-section__desc">현재 수강 중인 강의 목록을 관리하세요</p>
                                    <div className="enrolled-classes-section">
                                        <div className="enrolled-classes-header">
                                            <div className="enrolled-classes-title">내 강의 목록</div>
                                            <button className="btn-add-class"
                                                onClick={() => setInviteStatus(!inviteStatus)}
                                            >
                                                <span>+</span>
                                                <span>새 강의 등록</span>
                                            </button>
                                        </div>

                                        <div id="classList" className="class-list">

                                            {classArray.map((classInfo) => {
                                                const isActive = classInfo.status === 'active';
                                                const statusBadge = isActive ? (
                                                    <span className="class-card__badge class-card__badge--active">진행 중</span>
                                                ) : (
                                                    <span className="class-card__badge class-card__badge--ended">종료됨</span>
                                                );

                                                return (
                                                    <div className="class-card" key={classInfo.id}>
                                                        <div className="class-card__header">
                                                            <div className="class-card__icon">📚</div>
                                                            {statusBadge}
                                                        </div>

                                                        <h3 className="class-card__title">{classInfo.name}</h3>

                                                        <div className="class-card__info">
                                                            <div className="class-card__info-item">
                                                                <span className="class-card__info-icon">👨‍🏫</span>
                                                                <span>{classInfo.instructor}</span>
                                                            </div>

                                                            <div className="class-card__info-item">
                                                                <span className="class-card__info-icon">📅</span>
                                                                <span>{classInfo.startDate} ~ {classInfo.endDate}</span>
                                                            </div>
                                                        </div>

                                                        <div className="class-card__actions">
                                                            <button className="class-card__action-btn">
                                                                실습하기
                                                            </button>

                                                            <button className="class-card__action-btn class-card__action-btn--danger">
                                                                삭제
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>


                                <div id="profileSection" className={`settings-section ${activeSection === 'profile' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">프로필 설정</h2>
                                    <p className="settings-section__desc">개인 정보를 관리하고 업데이트하세요</p>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">프로필 사진</h3>
                                        <div className="profile-avatar">
                                            <div className="profile-avatar__image">김</div>
                                            <div className="profile-avatar__actions">
                                                <button className="btn btn--sm btn--outline" onClick={() => { }}>
                                                    사진 변경
                                                </button>
                                                <button className="btn btn--sm btn--outline" onClick={() => { }}>
                                                    사진 제거
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">기본 정보</h3>
                                        <p className="setting-group__desc">기본적인 계정 정보를 관리합니다</p>

                                        <div className="form-group">
                                            <label className="form-label">이름</label>
                                            <input type="text" className="form-input" id="userName" defaultValue="김직원" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">이메일</label>
                                            <input type="email" className="form-input" id="userEmail" defaultValue="kim@example.com" disabled />
                                            <div className="form-hint">이메일은 관리자만 변경할 수 있습니다</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">직급/직책</label>
                                            <input type="text" className="form-input" id="userRole" defaultValue="AI 실습생" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">소개</label>
                                            <textarea className="form-textarea" id="userBio" placeholder="자기소개를 입력하세요" defaultValue="AI와 데이터 분석에 관심이 많은 실습생입니다. 새로운 기술을 배우고 실습하는 것을 좋아합니다."></textarea>
                                        </div>
                                    </div>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">연락처 정보</h3>
                                        <p className="setting-group__desc">추가 연락 방법을 설정하세요</p>

                                        <div className="form-group">
                                            <label className="form-label">전화번호</label>
                                            <input type="tel" className="form-input" id="userPhone" defaultValue="010-1234-5678" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">부서</label>
                                            <input type="text" className="form-input" id="userDepartment" defaultValue="마케팅팀" />
                                        </div>
                                    </div>


                                    <div className="action-buttons">
                                        <button className="btn btn--outline" onClick={() => { }}>
                                            취소
                                        </button>
                                        <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} onClick={() => { }}>
                                            ✓ 변경사항 저장
                                        </button>
                                    </div>
                                </div>


                                <div id="preferencesSection" className={`settings-section ${activeSection === 'preferences' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">환경설정</h2>
                                    <p className="settings-section__desc">작업 환경을 개인화하세요</p>


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


                                <div id="notificationsSection" className={`settings-section ${activeSection === 'notifications' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">알림 설정</h2>
                                    <p className="settings-section__desc">알림을 받을 항목을 선택하세요</p>


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


                                <div id="privacySection" className={`settings-section ${activeSection === 'privacy' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">개인정보 및 보안</h2>
                                    <p className="settings-section__desc">계정 보안 및 개인정보를 관리하세요</p>


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


                                <div id="usageSection" className={`settings-section ${activeSection === 'usage' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">사용량 통계</h2>
                                    <p className="settings-section__desc">서비스 사용 현황을 확인하세요</p>


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


                                <div id="helpSection" className={`settings-section ${activeSection === 'help' ? 'settings-section--active' : ''}`}>
                                    <h2 className="settings-section__title">도움말 및 지원</h2>
                                    <p className="settings-section__desc">필요한 도움을 받으세요</p>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">빠른 시작 가이드</h3>
                                        <p className="setting-group__desc">GrowFit을 시작하는 방법을 배우세요</p>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                                            <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = 'var(--border)'; }} onMouseOut={(e) => { e.target.style.background = 'var(--surface)'; }} onClick={() => { }}>
                                                <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🚀</div>
                                                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>시작하기</div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>기본 기능 사용법</div>
                                            </div>

                                            <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = 'var(--border)'; }} onMouseOut={(e) => { e.target.style.background = 'var(--surface)'; }} onClick={() => { }}>
                                                <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>💬</div>
                                                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>AI 실습</div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>효과적인 AI 활용법</div>
                                            </div>

                                            <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = 'var(--border)'; }} onMouseOut={(e) => { e.target.style.background = 'var(--surface)'; }} onClick={() => { }}>
                                                <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🤖</div>
                                                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>에이전트 만들기</div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>맞춤 AI 생성 가이드</div>
                                            </div>

                                            <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = 'var(--border)'; }} onMouseOut={(e) => { e.target.style.background = 'var(--surface)'; }} onClick={() => { }}>
                                                <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>📂</div>
                                                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>프로젝트 관리</div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>효율적인 작업 관리</div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">자주 묻는 질문</h3>
                                        <p className="setting-group__desc">일반적인 질문과 답변입니다</p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                            <div className="setting-item" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                                <div className="setting-item__info">
                                                    <div className="setting-item__label">AI 에이전트는 어떻게 만드나요?</div>
                                                </div>
                                                <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>▼</div>
                                            </div>
                                            <div style={{ display: 'none', padding: 'var(--space-3)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                "내 에이전트" 메뉴에서 새 에이전트를 만들 수 있습니다. 시스템 프롬프트를 작성하고 예제를 추가하면 나만의 AI 에이전트가 완성됩니다.
                                            </div>

                                            <div className="setting-item" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                                <div className="setting-item__info">
                                                    <div className="setting-item__label">대화 기록은 어디서 볼 수 있나요?</div>
                                                </div>
                                                <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>▼</div>
                                            </div>
                                            <div style={{ display: 'none', padding: 'var(--space-3)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                "내 기록" 메뉴에서 모든 AI 대화 기록을 확인할 수 있습니다. 날짜별, 에이전트별로 필터링도 가능합니다.
                                            </div>

                                            <div className="setting-item" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                                <div className="setting-item__info">
                                                    <div className="setting-item__label">파일 업로드 용량 제한이 있나요?</div>
                                                </div>
                                                <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>▼</div>
                                            </div>
                                            <div style={{ display: 'none', padding: 'var(--space-3)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                파일당 최대 50MB까지 업로드 가능하며, 총 저장 공간은 10GB입니다. 필요시 관리자에게 용량 증설을 요청할 수 있습니다.
                                            </div>

                                            <div className="setting-item" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                                <div className="setting-item__info">
                                                    <div className="setting-item__label">프로젝트를 팀원과 공유할 수 있나요?</div>
                                                </div>
                                                <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>▼</div>
                                            </div>
                                            <div style={{ display: 'none', padding: 'var(--space-3)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                네, 프로젝트 상세 페이지에서 "공유" 버튼을 클릭하여 팀원을 초대할 수 있습니다. 읽기 전용 또는 편집 권한을 부여할 수 있습니다.
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 'var(--space-4)' }}>
                                            <button className="btn btn--outline" onClick={() => { }}>
                                                전체 FAQ 보기 →
                                            </button>
                                        </div>
                                    </div>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">지원 요청</h3>
                                        <p className="setting-group__desc">문제가 해결되지 않으면 문의하세요</p>

                                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                            <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} onClick={() => { }}>
                                                💬 채팅 지원
                                            </button>
                                            <button className="btn btn--outline" onClick={() => { }}>
                                                ✉️ 이메일 문의
                                            </button>
                                            <button className="btn btn--outline" onClick={() => { }}>
                                                🐛 버그 신고
                                            </button>
                                            <button className="btn btn--outline" onClick={() => { }}>
                                                💡 기능 제안
                                            </button>
                                        </div>
                                    </div>


                                    <div className="setting-group">
                                        <h3 className="setting-group__title">시스템 정보</h3>

                                        <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                                                <div>버전</div>
                                                <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-semibold)' }}>v1.2.5</div>

                                                <div>브라우저</div>
                                                <div style={{ color: 'var(--text-primary)' }}>Chrome 120.0.0</div>

                                                <div>운영체제</div>
                                                <div style={{ color: 'var(--text-primary)' }}>Windows 11</div>

                                                <div>마지막 업데이트</div>
                                                <div style={{ color: 'var(--text-primary)' }}>2025년 1월 8일</div>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 'var(--space-3)' }}>
                                            <button className="btn btn--outline" onClick={() => { }}>
                                                🔄 업데이트 확인
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >





        </>
    )
}