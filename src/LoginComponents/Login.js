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
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        email: '',
        password: ''
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
        // 입력 시 에러 메시지 초기화
        if (error) {
            setError(null);
        }
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const getErrorMessage = (error) => {
        // 네트워크 에러
        if (!error.response) {
            return '네트워크 연결을 확인해주세요. 인터넷 연결 상태를 확인하거나 잠시 후 다시 시도해주세요.';
        }

        const status = error.response.status;
        const data = error.response.data;

        // 상태 코드별 에러 메시지
        switch (status) {
            case 400:
                return data.detail || '입력한 정보를 확인해주세요.';
            case 401:
                return data.detail || '이메일 또는 비밀번호가 올바르지 않습니다.';
            case 403:
                return data.detail || '접근 권한이 없습니다. 관리자에게 문의해주세요.';
            case 404:
                return data.detail || '요청한 리소스를 찾을 수 없습니다.';
            case 422:
                // 유효성 검사 에러 처리
                if (data.detail && Array.isArray(data.detail)) {
                    const errors = {};
                    data.detail.forEach(err => {
                        if (err.loc && err.loc.length > 1) {
                            const field = err.loc[1];
                            errors[field] = err.msg;
                        }
                    });
                    setFieldErrors(prev => ({ ...prev, ...errors }));
                    return '입력한 정보를 확인해주세요.';
                }
                return data.detail || '입력한 정보가 올바르지 않습니다.';
            case 429:
                return '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.';
            case 500:
            case 502:
            case 503:
                return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
            default:
                return data.detail || data.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 에러 상태 초기화
        setError(null);
        setFieldErrors({ email: '', password: '' });
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
                email: formData.email,
                password: formData.password,
            });

            // 로그인 성공
            sessionStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);
            sessionStorage.setItem("token_type", response.data.token_type);
            sessionStorage.setItem("email", formData.email);

            if (selectedRole === 'student') {
                navigate('/user/profile');
            } else if (selectedRole === 'organization') {
                navigate('/organization/dashboard');
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
            
            // 401 에러인 경우 비밀번호 필드에 포커스
            if (error.response?.status === 401) {
                setTimeout(() => {
                    document.getElementById('password')?.focus();
                }, 100);
            }
        } finally {
            setIsLoading(false);
        }
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

                            {/* 에러 메시지 표시 */}
                            {error && (
                                <div className="auth-alert auth-alert--error" style={{ marginBottom: '20px' }}>
                                    <span className="auth-alert__icon">⚠️</span>
                                    <div className="auth-alert__content">
                                        <strong>로그인 실패</strong><br />
                                        {error}
                                    </div>
                                </div>
                            )}

                            {/* 이메일 */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label form-label--required">이메일</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
                                    placeholder="example@growfit.io"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                {fieldErrors.email && (
                                    <div className="form-error">
                                        <span>⚠️</span>
                                        <span>{fieldErrors.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* 비밀번호 */}
                            <div className="form-group">
                                <label htmlFor="password" className="form-label form-label--required">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`form-input ${fieldErrors.password ? 'form-input--error' : ''}`}
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                {fieldErrors.password && (
                                    <div className="form-error">
                                        <span>⚠️</span>
                                        <span>{fieldErrors.password}</span>
                                    </div>
                                )}
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
                            <button 
                                type="submit" 
                                className={`btn-auth btn-auth--primary ${isLoading ? 'btn-auth--loading' : ''}`}
                                disabled={isLoading}
                            >
                                <span>{isLoading ? '로그인 중...' : loginButtonText[selectedRole]}</span>
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