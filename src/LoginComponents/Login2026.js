import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast2026 } from '../utill/utill';

export default function Login() {
    const accessToken = sessionStorage.getItem("access_token");

    const navigate = useNavigate();

    // accessToken이 있으면 자동으로 /user/practice로 리다이렉트
    useEffect(() => {
        if (accessToken) {
            navigate('/user/practice');
        }
    }, [accessToken, navigate]);
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

            console.log(response.data);

            if (selectedRole === 'student') {
                navigate('/user/practice');
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
            title: '사용자 로그인',
            description: '강사와 학생 모두 가능합니다. 로그인 후 강사의 초대코드로 강의를 등록할 수 있습니다.',
            showSignup: true,
            alertType: 'info',
            alertTitle: '아직 GrowFit 계정이 없으신가요?',
            alertContent: '강사의 초대코드로 즉시 이용 가능합니다',
            signupLink: '/signup/user',
            signupText: '사용자 회원가입',
        },
        organization: {
            title: '기업 로그인',
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
        <div className="Login_body">
            <div className="login-wrapper">
                {/* 좌측 설명 영역 */}
                <div className="info-section">
                    <div className="brand">
                        <span className="brand-name">GrowFit</span>
                    </div>

                    <div className="hero-content">
                        <h1 className="hero-title">
                            AI 교육의 새로운<br />
                            표준을 만듭니다
                        </h1>

                        <p className="hero-description">
                            여러 AI 모델을 한 곳에서 비교하고 학습하세요.<br />
                            교육기관과 기업을 위한 통합 AI 실습 플랫폼입니다.
                        </p>

                        <div className="features-grid">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 12h6m-6 4h6" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">다중 LLM 비교</h3>
                                <p className="feature-description">GPT-4, Claude, Gemini 동시 비교 학습</p>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">AI 에이전트</h3>
                                <p className="feature-description">프롬프트 기반 맞춤형 에이전트 생성</p>
                            </div>



                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">RAG 지식베이스</h3>
                                <p className="feature-description">강의자료 기반 맞춤형 AI 답변</p>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">멀티모달 AI</h3>
                                <p className="feature-description">이미지, 영상 생성 및 분석 지원</p>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">MCP 연동</h3>
                                <p className="feature-description">외부 도구 및 데이터 연결 확장</p>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">학습 관리</h3>
                                <p className="feature-description">강사-학생 통합 관리 시스템</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 우측 로그인 영역 */}
                <div className="login-section">
                    <div className="login-header">
                        <h2 className="login-title">로그인</h2>
                        <p className="login-subtitle">GrowFit 계정으로 시작하세요</p>
                    </div>

                    {/* 역할 선택 탭 */}
                    <div className="tabs">
                        <button
                            type="button"
                            className={`tab ${selectedRole === 'student' ? 'active' : ''}`}
                            onClick={() => handleRoleSelect('student')}
                        >
                            사용자
                        </button>
                        <button
                            type="button"
                            className={`tab ${selectedRole === 'organization' ? 'active' : ''}`}
                            // onClick={() => handleRoleSelect('organization')}
                            onClick={() => showToast2026("기업계정은 준비중입니다.")}
                        >
                            기업
                        </button>
                    </div>

                    {/* 역할별 설명 */}
                    <div className="notice-box" style={{
                        background: selectedRole === 'student'
                            ? 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)'
                            : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        borderLeftColor: selectedRole === 'student' ? '#7c3aed' : '#f59e0b'
                    }}>
                        <div className="notice-title" style={{
                            color: selectedRole === 'student' ? '#5b21b6' : '#92400e'
                        }}>
                            <svg className="notice-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    stroke={selectedRole === 'student' ? '#7c3aed' : '#f59e0b'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            <span>{currentRoleInfo.title}</span>
                        </div>
                        <p className="notice-text" style={{
                            color: selectedRole === 'student' ? '#6d28d9' : '#78350f'
                        }}>
                            {currentRoleInfo.description}
                        </p>
                    </div>

                    {/* 로그인 폼 */}
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="role" value={selectedRole} />

                        {/* 에러 메시지 표시 */}
                        {error && (
                            <div className="error-alert" style={{ marginBottom: '20px' }}>
                                <div className="error-alert-content">
                                    <strong>로그인 실패</strong><br />
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* 이메일 */}
                        <div className="form-field">
                            <label htmlFor="email" className="field-label">
                                이메일 주소<span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`field-input ${fieldErrors.email ? 'error' : ''}`}
                                placeholder="example@growfit.io"
                                required
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {fieldErrors.email && (
                                <div className="field-error">
                                    <span>⚠️</span>
                                    <span>{fieldErrors.email}</span>
                                </div>
                            )}
                        </div>

                        {/* 비밀번호 */}
                        <div className="form-field">
                            <label htmlFor="password" className="field-label">
                                비밀번호<span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`field-input ${fieldErrors.password ? 'error' : ''}`}
                                placeholder="비밀번호를 입력하세요"
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {fieldErrors.password && (
                                <div className="field-error">
                                    <span>⚠️</span>
                                    <span>{fieldErrors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* 로그인 유지 & 비밀번호 찾기 */}
                        <div className="form-actions">
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <label htmlFor="rememberMe">로그인 상태 유지</label>
                            </div>
                            <a
                                href="#"
                                className="forgot-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // alert("관리자에게 문의해주세요");
                                    showToast2026("비밀번호 찾기는 준비중입니다.")
                                }}
                            >
                                비밀번호 찾기
                            </a>
                        </div>

                        {/* 로그인 버튼 */}
                        <button
                            type="submit"
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? '로그인 중...' : loginButtonText[selectedRole]}
                        </button>
                    </form>

                    <div className="divider">
                        <div className="divider-line"></div>
                        <span className="divider-text">또는</span>
                        <div className="divider-line"></div>
                    </div>

                    {/* 계정 안내 (역할별 동적 표시) */}
                    {currentRoleInfo.showSignup && (
                        <div className="signup-box">
                            <p className="signup-text">{currentRoleInfo.alertTitle}</p>
                            <Link to={currentRoleInfo.signupLink} className="signup-link">
                                {currentRoleInfo.signupText}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <div className="signup-info">
                                <svg className="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{currentRoleInfo.alertContent}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}