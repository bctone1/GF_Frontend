export default function PartnerHeader() {
    return (
        <>
            <header className="header">
                <div className="header__left">
                    <button id="menuToggle" className="header__icon-button hidden-desktop">
                        <span>☰</span>
                    </button>
                    <a href="/partner/dashboard" className="header__logo">
                        <span className="header__logo-icon">🌱</span>
                        <span>GrowFit Partner</span>
                    </a>
                </div>

                <div className="header__right">
                    <button id="notificationBtn" className="header__icon-button">
                        <span>🔔</span>
                        <span className="header__badge">3</span>
                    </button>

                    <div id="profileBtn" className="header__profile">
                        <div className="header__avatar"
                            style={{ background: "linear-gradient(135deg, #0ea5e9, #38bdf8)" }}>박</div>
                        <span className="hidden-mobile">박강사</span>
                        <span className="hidden-mobile">▼</span>
                    </div>
                </div>
            </header>
        </>
    )
}