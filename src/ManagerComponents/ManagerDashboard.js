import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

export default function ManagerDashboard() {
    return (
        <>
            <div id="app">
                <ManagerHeader />
                <div className="container">
                    <ManagerSidebar />

                    <main className="main">
                        <div className="main__content">
                            준비중..
                        </div>
                    </main>


                </div>
            </div>

        </>
    )
}