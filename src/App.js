import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './LoginComponents/Login';
import StudentSignup from './LoginComponents/StudentSignup';
import PartnerSignup from './LoginComponents/PartnerSignup';

import UserDashboard from './UserComponents/UserDashboard';
import UserPractice from './UserComponents/UserPractice';
import UserProject from './UserComponents/UserProject';
import UserKnowledge from './UserComponents/UserKnowledge';
import UserProfile from './UserComponents/UserProfile';

import PartnerComponent from './PartnerComponents/Partner';
import ManagerComponent from './ManagerComponents/Manager';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/signup/partner" element={<PartnerSignup />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/practice" element={<UserPractice />} />
        <Route path="/user/project" element={<UserProject />} />
        <Route path="/user/knowledge" element={<UserKnowledge />} />
        <Route path="/user/profile" element={<UserProfile />} />



        <Route path="/partner" element={<PartnerComponent />} />



        <Route path="/manager" element={<ManagerComponent />} />
      </Routes>
    </>
  );
}