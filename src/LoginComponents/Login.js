import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('student');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
            email: formData.email,
            password: formData.password,
        }).then(response => {
            console.log(response.data);
            sessionStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);
            sessionStorage.setItem("token_type", response.data.token_type);
            sessionStorage.setItem("email", formData.email);

            if (selectedRole === 'student') {
                // navigate('/user/dashboard');
                navigate('/user/profile');
            } else if (selectedRole === 'organization') {
                navigate('/organization/dashboard');
            }
        }).catch(error => {
            alert(error.response.data.detail);
            // console.log(error.response.data.detail);
        });
    };

    const roleDescriptions = {
        student: {
            title: '🎓 사용자 로그인',
            description: '자유롭게 회원가입이 가능합니다. 로그인 후 강사의 초대코드를 입력하면 실습 플랫폼을 사용할 수 있습니다.',
            showSignup: true,
            alertType: 'info',
            alertTitle: '사용자 계정이 없으신가요?',
            alertContent: '자유롭게 회원가입하세요! 로그인 후 강사의 초대코드를 입력하면 클래스에 참여할 수 있습니다.',
            signupLink: '/signup/user',
            signupText: '사용자 회원가입',
        },
        organization: {
            title: '🏢 기업 로그인',
            description: '회원가입 후 플랫폼 관리자의 승인을 받아야 교육과정을 개설할 수 있습니다.',
            showSignup: true,
            alertType: 'info',
            alertTitle: '기업 계정이 필요하신가요?',
            alertContent: '회원가입 후 관리자 승인을 받으면 교육과정을 개설할 수 있습니다.',
            signupLink: '/signup/organization',
            signupText: '기업 회원가입',
        },
    };
    const currentRoleInfo = roleDescriptions[selectedRole];
    const loginButtonText = {
        student: '사용자 로그인',
        organization: '기업 로그인'
    };

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-container">
                    {/* Header */}
                    <div className="auth-header">
                        <div className="auth-logo">
                            {/* <div className="auth-logo-icon">🎓</div>
                            <span>GrowFit</span> */}
                            <img className="auth-logo-icon-login" src="/GrowFit.png" alt="GrowFit" />

                        </div>
                        <p className="auth-subtitle">AI 실습 플랫폼에 오신 것을 환영합니다</p>
                    </div>

                    {/* Body */}
                    <div className="auth-body">
                        {/* 역할 선택 탭 */}
                        <div className="role-tabs">
                            <button
                                type="button"
                                className={`role-tab ${selectedRole === 'student' ? 'role-tab--active' : ''}`}
                                onClick={() => handleRoleSelect('student')}
                            >
                                <span className="role-tab__icon">🎓</span>
                                <span>사용자</span>
                            </button>

                            <button
                                type="button"
                                className={`role-tab ${selectedRole === 'organization' ? 'role-tab--active' : ''}`}
                                onClick={() => alert("준비중입니다.")}
                            >
                                <span className="role-tab__icon">⚙️</span>
                                <span>기업</span>
                            </button>
                        </div>

                        {/* 역할별 설명 */}
                        <div className="role-descriptions">
                            {Object.entries(roleDescriptions).map(([role, info]) => (
                                <div
                                    key={role}
                                    className={`role-description ${selectedRole === role ? 'role-description--active' : ''}`}
                                    style={{ display: selectedRole === role ? 'block' : 'none' }}
                                >
                                    <strong>{info.title}</strong><br />
                                    {info.description}
                                </div>
                            ))}
                        </div>

                        {/* 로그인 폼 */}
                        <form onSubmit={handleSubmit}>
                            {/* 숨겨진 역할 필드 */}
                            <input type="hidden" name="role" value={selectedRole} />

                            {/* 이메일 */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label form-label--required">이메일</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="example@growfit.io"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* 비밀번호 */}
                            <div className="form-group">
                                <label htmlFor="password" className="form-label form-label--required">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* 로그인 유지 & 비밀번호 찾기 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div className="form-checkbox">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="rememberMe">로그인 상태 유지</label>
                                </div>
                                <Link
                                    // to="/forgot-password"
                                    style={{ fontSize: '14px', color: 'var(--primary-600)', textDecoration: 'none' }}
                                    onClick={() => alert("관리자에게 문의해주세요")}
                                >
                                    비밀번호 찾기
                                </Link>
                            </div>

                            {/* 로그인 버튼 */}
                            <button type="submit" className="btn-auth btn-auth--primary">
                                <span>{loginButtonText[selectedRole]}</span>
                            </button>

                            {/* 계정 안내 (역할별 동적 표시) */}
                            <div className="signup-info">
                                <div
                                    className={`auth-alert auth-alert--${currentRoleInfo.alertType}`}
                                    style={{ marginTop: '16px', marginBottom: currentRoleInfo.showSignup ? '0' : '16px' }}
                                >
                                    <span className="auth-alert__icon">
                                        {currentRoleInfo.alertType === 'warning' ? '⚠️' : '💡'}
                                    </span>
                                    <div className="auth-alert__content">
                                        <strong>{currentRoleInfo.alertTitle}</strong><br />
                                        {currentRoleInfo.alertContent}
                                    </div>
                                </div>
                                {currentRoleInfo.showSignup && (
                                    <Link
                                        to={currentRoleInfo.signupLink}
                                        className="btn-auth btn-auth--outline"
                                        style={{ marginTop: '12px', textDecoration: 'none', display: 'block', textAlign: 'center' }}
                                    >
                                        {currentRoleInfo.signupText}
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="auth-footer">
                        © 2025 GrowFit. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
}