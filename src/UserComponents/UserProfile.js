import { useState, useRef, Suspense, lazy } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { showToast } from '../utill/utill';

// Lazy load 섹션 컴포넌트들
const EnrolledClassesSection = lazy(() => import('./ProfileSections/EnrolledClassesSection'));
const ProfileSection = lazy(() => import('./ProfileSections/ProfileSection'));
const PreferencesSection = lazy(() => import('./ProfileSections/PreferencesSection'));
const NotificationsSection = lazy(() => import('./ProfileSections/NotificationsSection'));
const PrivacySection = lazy(() => import('./ProfileSections/PrivacySection'));
const UsageSection = lazy(() => import('./ProfileSections/UsageSection'));
const HelpSection = lazy(() => import('./ProfileSections/HelpSection'));

export default function UserDashboard() {
    const [activeSection, setActiveSection] = useState('enrolled');

    const showSection = (section) => {
        setActiveSection(section);
    };

    const [classArray, setClassArray] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [inviteStatus, setInviteStatus] = useState(false);
    const inviteCodeRefs = useRef([]);
    const [myprofile, setMyprofile] = useState(null);
    const [myaccount, setMyaccount] = useState(null);

    const handleAccountData = (accountData) => {
        console.log(accountData);
        setMyaccount(accountData);
    };

    const handleProfileData = (profileData) => {
        console.log(profileData);
        setMyprofile(profileData);
    };


    // 초대코드 입력 필드 초기화
    if (inviteCodeRefs.current.length !== 6) {
        inviteCodeRefs.current = Array(6).fill().map((_, i) => inviteCodeRefs.current[i] || null);
    }

    const handleInviteCodeChange = (index, value) => {
        const sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (inviteCodeRefs.current[index]) {
            inviteCodeRefs.current[index].value = sanitizedValue;
        }
        if (sanitizedValue && index < 5) {
            inviteCodeRefs.current[index + 1]?.focus();
        }
    };

    const handleInviteCodeKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !inviteCodeRefs.current[index].value && index > 0) {
            inviteCodeRefs.current[index - 1]?.focus();
        }
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
        sanitizedData.split('').forEach((char, i) => {
            if (i < 6 && inviteCodeRefs.current[i]) {
                inviteCodeRefs.current[i].value = char;
            }
        });
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
                setInviteStatus(false);
                showToast(`강의가 등록되었습니다!`, 'success');
                setRefreshTrigger(prev => prev + 1);
            }).catch(error => {
                showToast(`초대코드가 올바르지 않습니다.`, 'error');
            });
        }
    };

    // UserSidebar에서 클래스 데이터를 받아오는 콜백
    const handleClassesData = (classes, isLoading) => {
        if (!isLoading) {
            setClassArray(classes);
        }
    };

    // 프로필 업데이트 후 콜백
    const handleProfileUpdate = (updatedProfile) => {
        setMyprofile(updatedProfile);
        if (handleProfileData) {
            handleProfileData(updatedProfile);
        }
    };

    // 현재 활성 섹션에 맞는 컴포넌트 렌더링
    const renderActiveSection = () => {
        const loadingFallback = <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>로딩 중...</div>;

        switch (activeSection) {
            case 'enrolled':
                return (
                    <Suspense fallback={loadingFallback}>
                        <EnrolledClassesSection
                            classArray={classArray}
                            onInviteClick={() => setInviteStatus(!inviteStatus)}
                        />
                    </Suspense>
                );
            case 'profile':
                return (
                    <Suspense fallback={loadingFallback}>
                        <ProfileSection
                            myprofile={myprofile}
                            myaccount={myaccount}
                            onProfileUpdate={handleProfileUpdate}
                        />
                    </Suspense>
                );
            case 'preferences':
                return (
                    <Suspense fallback={loadingFallback}>
                        <PreferencesSection />
                    </Suspense>
                );
            case 'notifications':
                return (
                    <Suspense fallback={loadingFallback}>
                        <NotificationsSection />
                    </Suspense>
                );
            case 'privacy':
                return (
                    <Suspense fallback={loadingFallback}>
                        <PrivacySection />
                    </Suspense>
                );
            case 'usage':
                return (
                    <Suspense fallback={loadingFallback}>
                        <UsageSection />
                    </Suspense>
                );
            case 'help':
                return (
                    <Suspense fallback={loadingFallback}>
                        <HelpSection />
                    </Suspense>
                );
            default:
                return null;
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
                <UserHeader
                    onAccountData={handleAccountData}
                    onProfileData={handleProfileData}
                />
                <div className="container">
                    <UserSidebar onClassesData={handleClassesData} refreshTrigger={refreshTrigger} />

                    <main className="main">
                        <div className="settings-layout">

                            <div className="settings-sidebar">
                                <nav className="user-settings-nav">
                                    <div
                                        className={`user-settings-nav__item ${activeSection === 'enrolled' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('enrolled')}
                                    >
                                        <span className="user-settings-nav__icon">📚</span>
                                        <span>수강 강의</span>
                                    </div>

                                    <div
                                        className={`user-settings-nav__item ${activeSection === 'profile' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('profile')}
                                    >
                                        <span className="user-settings-nav__icon">👤</span>
                                        <span>프로필</span>
                                    </div>
                                    {/* <div
                                        className={`user-settings-nav__item ${activeSection === 'preferences' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('preferences')}
                                    >
                                        <span className="user-settings-nav__icon">🎨</span>
                                        <span>환경설정</span>
                                    </div>
                                    <div
                                        className={`user-settings-nav__item ${activeSection === 'notifications' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('notifications')}
                                    >
                                        <span className="user-settings-nav__icon">🔔</span>
                                        <span>알림</span>
                                    </div>
                                    <div
                                        className={`user-settings-nav__item ${activeSection === 'privacy' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('privacy')}
                                    >
                                        <span className="user-settings-nav__icon">🔒</span>
                                        <span>개인정보</span>
                                    </div>
                                    <div
                                        className={`user-settings-nav__item ${activeSection === 'usage' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('usage')}
                                    >
                                        <span className="user-settings-nav__icon">📊</span>
                                        <span>사용량</span>
                                    </div> */}
                                    <div
                                        className={`user-settings-nav__item ${activeSection === 'help' ? 'user-settings-nav__item--active' : ''}`}
                                        onClick={() => showSection('help')}
                                    >
                                        <span className="user-settings-nav__icon">❓</span>
                                        <span>도움말</span>
                                    </div>
                                </nav>
                            </div>


                            <div className="settings-content">
                                {renderActiveSection()}
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </>
    )
}
