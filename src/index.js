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