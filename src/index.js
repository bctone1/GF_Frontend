import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/variables.css';
import './css/layout.css';
import './css/components.css';
import './css/auth.css';
import './css/login.css';

import './css/UserSignup.css';
import './css/PartnerSignup.css';

import './css/ManagerInstructor.css';


import './css/PartnerCostAnalytics.css';
import './css/PartnerSettings.css';
import './css/PartnerProjectManagement.css';
import './css/PartnerStudentManagement.css';
import './css/PartnerDashboard.css';

import './css/UserAgent.css';
import './css/UserDashboard.css';
import './css/UserHistory.css';
import './css/UserKnowledge.css';
import './css/UserPractice.css';
import './css/UserProfile.css';
import './css/UserProject.css';
import './css/UserWorkflow.css';



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