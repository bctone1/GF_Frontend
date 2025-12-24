import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './css/Login.css';
import './css/UserSignup2026.css';
import './css/UserPractice2026.css';
import './css/UserProject2026.css';
import './css/UserKnowledge2026.css';
import './css/UserSetting2026.css';



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