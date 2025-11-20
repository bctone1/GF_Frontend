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
            console.log(response.data);
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
            console.log(response.data);
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

                    {myaccount?.default_role !== "member" && (
                        <div className="header__mode-toggle">
                            <button className="mode-toggle-btn mode-toggle-btn--active">
                                <span className="mode-toggle-btn__icon">👨‍🎓</span>
                                <span className="mode-toggle-btn__text">수강생 모드</span>
                            </button>
                            <button className="mode-toggle-btn" onClick={() => window.location.href = '/partner/dashboard'}>
                                <span className="mode-toggle-btn__icon">👨‍🏫</span>
                                <span className="mode-toggle-btn__text">강사 모드</span>
                            </button>
                        </div>
                    )}


                    <button id="notificationBtn" className="header__icon-button">
                        <span>🔔</span>
                        <span className="header__badge">3</span>
                    </button>

                    <div id="profileBtn" className="header__profile">
                        <div className="header__avatar" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>{myprofile?.full_name?.charAt(0)}</div>
                        <span className="hidden-mobile">{myprofile?.full_name}</span>
                        <span className="hidden-mobile">▼</span>
                    </div>
                </div>
            </header>
        </>
    )
}