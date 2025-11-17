import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './LoginComponents/Login';
import StudentSignup from './LoginComponents/StudentSignup';
import PartnerSignup from './LoginComponents/PartnerSignup';

import UserDashboard from './UserComponents/UserDashboard';
import UserPractice from './UserComponents/UserPractice';
import UserProject from './UserComponents/UserProject';
import UserKnowledge from './UserComponents/UserKnowledge';
import UserAgent from './UserComponents/UserAgent';
import UserWorkflow from './UserComponents/UserWorkflow';
import UserHistory from './UserComponents/UserHistory';
import UserProfile from './UserComponents/UserProfile';


import PartnerDashboard from './PartnerComponents/PartnerDashboard';
import PartnerProjectManagement from './PartnerComponents/PartnerProjectManagement';
import PartnerStudentManagement from './PartnerComponents/PartnerStudentManagement';
import PartnerCostAnalytics from './PartnerComponents/PartnerCostAnalytics';
import PartnerSettings from './PartnerComponents/PartnerSettings';


import ManagerDashboard from './ManagerComponents/ManagerDashboard';

export default function App() {
  return (
    <>
      <Routes>



        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/signup/partner" element={<PartnerSignup />} />

        {/* 유저 컴포넌트 */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/practice" element={<UserPractice />} />
        <Route path="/user/project" element={<UserProject />} />
        <Route path="/user/knowledge" element={<UserKnowledge />} />
        <Route path="/user/agent" element={<UserAgent />} />
        <Route path="/user/workflow" element={<UserWorkflow />} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/user/profile" element={<UserProfile />} />


        {/* 파트너 컴포넌트 */}
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/partner/project-management" element={<PartnerProjectManagement />} />
        <Route path="/partner/student-management" element={<PartnerStudentManagement />} />
        <Route path="/partner/cost-analytics" element={<PartnerCostAnalytics />} />
        <Route path="/partner/settings" element={<PartnerSettings />} />


        {/* 매니저 컴포넌트 */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />



      </Routes>
    </>
  );
}