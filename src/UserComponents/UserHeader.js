export default function UserHeader() {
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


                    <button id="notificationBtn" className="header__icon-button">
                        <span>🔔</span>
                        <span className="header__badge">3</span>
                    </button>

                    <div id="profileBtn" className="header__profile">
                        <div className="header__avatar" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>김</div>
                        <span className="hidden-mobile">김직원</span>
                        <span className="hidden-mobile">▼</span>
                    </div>
                </div>
            </header>
        </>
    )
}