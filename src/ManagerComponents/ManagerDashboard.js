import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

export default function ManagerDashboard() {
    return (
        <>
            <div id="app">
                <ManagerHeader />
                <div className="container">
                    <ManagerSidebar />


                    
                </div>
            </div>

        </>
    )
}