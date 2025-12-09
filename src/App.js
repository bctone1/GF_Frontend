import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './LoginComponents/Login';

import UserSignup from './LoginComponents/UserSignup';
import OrganizationSignup from './LoginComponents/OrganizationSignup';

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
import ManagerInstructor from './ManagerComponents/ManagerInstructor';
import ManagerUserManagement from './ManagerComponents/ManagerUserManagement';
import ManagerBilling from './ManagerComponents/ManagerBilling';
import ManagerSettings from './ManagerComponents/ManagerSettings';

import OrganizationDashboard from './OrganizationComponents/OrganizationDashboard';

export default function App() {
  return (
    <>
      <Routes>



        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/organization" element={<OrganizationSignup />} />

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

        {/* 조직(관리자) 컴포넌트 */}
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />


        {/* 매니저 컴포넌트 */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/instructor" element={<ManagerInstructor />} />
        <Route path="/manager/user-management" element={<ManagerUserManagement />} />
        <Route path="/manager/billing" element={<ManagerBilling />} />
        <Route path="/manager/settings" element={<ManagerSettings />} />
        



      </Routes>
    </>
  );
}