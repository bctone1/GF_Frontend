import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // 에러 초기화
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = '이름을 입력해주세요.';
        }

        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.';
        }

        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
        }

        if (!formData.passwordConfirm) {
            newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
        } else if (formData.password !== formData.passwordConfirm) {
            newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = '이용약관에 동의해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Signup attempt:', { ...formData, role: 'student' });
            // TODO: 실제 회원가입 API 호출
            // 회원가입 성공 후 로그인 페이지로 이동
            navigate('/login');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                {/* Header */}
                <div className="auth-header">
                    <div className="auth-logo">
                        <div className="auth-logo-icon">🎓</div>
                        <span>GrowFit</span>
                    </div>
                    <h1 className="auth-title">학생 회원가입</h1>
                    <p className="auth-subtitle">AI 실습 플랫폼에 가입하고 시작하세요</p>
                </div>

                {/* Body */}
                <div className="auth-body">
                    <form onSubmit={handleSubmit}>
                        {/* 이름 */}
                        <div className="form-group">
                            <label htmlFor="name" className="form-label form-label--required">이름</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                                placeholder="홍길동"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <span className="form-error">{errors.name}</span>}
                        </div>

                        {/* 이메일 */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label form-label--required">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                                placeholder="example@growfit.io"
                                required
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>

                        {/* 비밀번호 */}
                        <div className="form-group">
                            <label htmlFor="password" className="form-label form-label--required">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                                placeholder="8자 이상 입력해주세요"
                                required
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <span className="form-error">{errors.password}</span>}
                        </div>

                        {/* 비밀번호 확인 */}
                        <div className="form-group">
                            <label htmlFor="passwordConfirm" className="form-label form-label--required">비밀번호 확인</label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                className={`form-input ${errors.passwordConfirm ? 'form-input--error' : ''}`}
                                placeholder="비밀번호를 다시 입력해주세요"
                                required
                                autoComplete="new-password"
                                value={formData.passwordConfirm}
                                onChange={handleInputChange}
                            />
                            {errors.passwordConfirm && <span className="form-error">{errors.passwordConfirm}</span>}
                        </div>

                        {/* 이용약관 동의 */}
                        <div className="form-group">
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="agreeToTerms">
                                    <Link to="/terms" style={{ color: 'var(--primary-600)' }}>이용약관</Link> 및{' '}
                                    <Link to="/privacy" style={{ color: 'var(--primary-600)' }}>개인정보처리방침</Link>에 동의합니다
                                </label>
                            </div>
                            {errors.agreeToTerms && <span className="form-error">{errors.agreeToTerms}</span>}
                        </div>

                        {/* 회원가입 버튼 */}
                        <button type="submit" className="btn-auth btn-auth--primary" style={{ width: '100%' }}>
                            🎓 학생 회원가입
                        </button>

                        {/* 로그인 링크 */}
                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                이미 계정이 있으신가요?{' '}
                            </span>
                            <Link
                                to="/login"
                                style={{ color: 'var(--primary-600)', textDecoration: 'none', fontWeight: 'var(--font-medium)' }}
                            >
                                로그인
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="auth-footer">
                    © 2025 GrowFit. All rights reserved.
                </div>
            </div>
        </div>
    );
}

