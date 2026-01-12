import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './css/variables.css';
import './css/common.css';
import './css/Login.css';
import './css/UserSignup2026.css';
import './css/UserPractice2026.css';
import './css/UserProject2026.css';
import './css/UserKnowledge2026.css';
import './css/UserSetting2026.css';
import './css/roleSelect.css';
import './css/UserTemplate.css';
import './css/UserHistory.css';


import './css/PartnerDashboard.css';
import './css/PartnerProjectManagement.css';
import './css/PartnerStudentManagement.css';
import './css/PartnerInstructorMaterials.css';
import './css/PartnerInstructorAnalytics.css';
import './css/PartnerInstructorSettings.css';


import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();