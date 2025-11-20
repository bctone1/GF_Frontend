export default function ManagerHeader() {
    return (
        <>
            <header className="header">
                <div className="header__left">
                    <button className="header__icon-button" id="menuToggle">☰</button>
                    <a href="/manager/dashboard" className="header__logo">
                        {/* <span className="header__logo-icon">🎓</span>
                        <span>GrowFit Admin</span> */}
                        <img className="auth-logo-icon-header" src="/GrowFit.png" alt="GrowFit" />
                    </a>
                </div>
                <div className="header__right">
                    <button className="header__icon-button" id="notificationBtn">
                        🔔
                        <span className="header__badge">3</span>
                    </button>
                    <div className="header__profile" id="profileBtn">
                        <div className="header__avatar">관</div>
                    </div>
                </div>
            </header>
        </>
    )
}