import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserHeader({ onAccountData, onProfileData }) {
    const accessToken = sessionStorage.getItem("access_token");
    const [myprofile, setMyprofile] = useState(null);
    const [myaccount, setMyaccount] = useState(null);

    const getMyAccount = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/account/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            sessionStorage.setItem("partner_id", response.data.partner_id);
            // console.log(response.data);
            setMyaccount(response.data);
            // 부모 컴포넌트로 데이터 전달
            if (onAccountData) {
                onAccountData(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const getMyProfile = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/account/my/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            // console.log(response.data);
            setMyprofile(response.data);
            // 부모 컴포넌트로 데이터 전달
            if (onProfileData) {
                onProfileData(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getMyAccount();
        getMyProfile();
    }, []);

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem("access_token");
        window.location.href = "/login";
    }

    return (
        <>
            <header className="header">
                <div className="header__left">
                    <button id="menuToggle" className="header__icon-button hidden-desktop">
                        <span>☰</span>
                    </button>
                    <a href="/user/dashboard" className="header__logo">
                        {/* <span className="header__logo-icon">🌱</span>
                        <span>GrowFit</span> */}
                        <img className="auth-logo-icon-header" src="/GrowFit.png" alt="GrowFit" />
                    </a>
                </div>

                <div className="header__right">

                    {myaccount?.partner_id && (
                        <div className="header__mode-toggle">
                            <button className="mode-toggle-btn mode-toggle-btn--active">
                                {/* <span className="mode-toggle-btn__icon">👨‍🎓</span> */}
                                <span className="mode-toggle-btn__text">수강생</span>
                            </button>
                            <button className="mode-toggle-btn" onClick={() => window.location.href = '/partner/dashboard'}>
                                {/* <span className="mode-toggle-btn__icon">👨‍🏫</span> */}
                                <span className="mode-toggle-btn__text">강사</span>
                            </button>
                        </div>
                    )}


                    <button id="notificationBtn" className="header__icon-button">
                        <span>🔔</span>
                        <span className="header__badge">3</span>
                    </button>

                    <div id="profileBtn" className="header__profile"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    >
                        <div className="header__avatar" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>{myprofile?.full_name?.charAt(0)}</div>
                        <span className="hidden-mobile">{myprofile?.full_name}</span>
                        <span className="hidden-mobile">▼</span>
                    </div>

                    <div id="profileDropdown" className={`dropdown dropdown--profile ${profileDropdownOpen ? 'dropdown--open' : ''}`}>
                        <div className="dropdown__body">
                            <a href="#" className="dropdown__item">
                                <span className="dropdown__item-icon">👤</span>
                                <span>내 프로필</span>
                            </a>
                            <a href="#" className="dropdown__item">
                                <span className="dropdown__item-icon">⚙️</span>
                                <span>설정</span>
                            </a>
                            <div className="divider"></div>
                            <a href="#" className="dropdown__item dropdown__item--danger" onClick={handleLogout}>
                                <span className="dropdown__item-icon">🚪</span>
                                <span>로그아웃</span>
                            </a>
                        </div>
                    </div>


                </div>
            </header>
        </>
    )
}