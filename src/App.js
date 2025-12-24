import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './LoginComponents/Login';
import Login2026 from './LoginComponents/Login2026';

import UserSignup from './LoginComponents/UserSignup';
import UserSignup2026 from './LoginComponents/UserSignup2026';
import OrganizationSignup from './LoginComponents/OrganizationSignup';

import UserPractice2026 from './UserComponents/UserPractice2026';
import UserProject2026 from './UserComponents/UserProject2026';
import UserKnowledge2026 from './UserComponents/UserKnowledge2026';
import UserSetting2026 from './UserComponents/UserSetting2026';

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

        <Route path="/" element={<Login2026 />} />
        <Route path="/login" element={<Login2026 />} />
        <Route path="/signup/user" element={<UserSignup2026 />} />
        <Route path="/signup/organization" element={<OrganizationSignup />} />



        {/* 유저 리뉴얼 컴포넌트 */}
        <Route path="/user/practice" element={<UserPractice2026 />} />
        <Route path="/user/project" element={<UserProject2026 />} />
        <Route path="/user/knowledge" element={<UserKnowledge2026 />} />
        <Route path="/user/setting" element={<UserSetting2026 />} />


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