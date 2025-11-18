import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        verifyCode: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [emailVerified, setEmailVerified] = useState(false);
    const [showVerifyCode, setShowVerifyCode] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ level: '', text: '', width: 0 });
    const [timer, setTimer] = useState(180); // 3분
    const [timerActive, setTimerActive] = useState(false);

    // 타이머 효과
    useEffect(() => {
        let interval = null;
        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else if (timer === 0) {
            setTimerActive(false);
            setShowVerifyCode(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timer]);

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
        // 성공 메시지 초기화
        if (success[name]) {
            setSuccess(prev => ({
                ...prev,
                [name]: false
            }));
        }

        // 비밀번호 강도 체크
        if (name === 'password') {
            checkPasswordStrength(value);
            // 비밀번호가 변경되면 비밀번호 확인도 다시 체크
            if (formData.passwordConfirm) {
                checkPasswordMatch(formData.passwordConfirm, value);
            }
        }

        // 비밀번호 확인 체크
        if (name === 'passwordConfirm') {
            checkPasswordMatch(value, formData.password);
        }
    };

    const checkPasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength({ level: '', text: '', width: 0 });
            return;
        }

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        let level = '';
        let text = '';
        let width = 0;

        if (strength <= 1) {
            level = 'weak';
            text = '약함';
            width = 33;
        } else if (strength === 2) {
            level = 'medium';
            text = '보통';
            width = 66;
        } else {
            level = 'strong';
            text = '강함';
            width = 100;
        }

        setPasswordStrength({ level, text, width });
    };

    const checkPasswordMatch = (passwordConfirm, password = formData.password) => {
        if (!passwordConfirm) {
            setSuccess(prev => ({ ...prev, passwordConfirm: false }));
            return;
        }

        if (password === passwordConfirm) {
            setSuccess(prev => ({ ...prev, passwordConfirm: true }));
            setErrors(prev => ({ ...prev, passwordConfirm: '' }));
        } else {
            setSuccess(prev => ({ ...prev, passwordConfirm: false }));
        }
    };

    const togglePassword = (field) => {
        if (field === 'password') {
            setPasswordVisible(!passwordVisible);
        } else if (field === 'passwordConfirm') {
            setPasswordConfirmVisible(!passwordConfirmVisible);
        }
    };

    const sendVerificationCode = () => {
        if (!formData.email.trim()) {
            setErrors(prev => ({ ...prev, email: '이메일을 입력해주세요.' }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
            return;
        }

        // 인증번호 발송 시뮬레이션
        console.log('인증번호 발송:', formData.email);
        setShowVerifyCode(true);
        setTimerActive(true);
        setTimer(180);
        setSuccess(prev => ({ ...prev, emailSend: true }));
        setErrors(prev => ({ ...prev, email: '' }));
    };

    const verifyCode = () => {
        if (!formData.verifyCode.trim()) {
            setErrors(prev => ({ ...prev, verifyCode: '인증번호를 입력해주세요.' }));
            return;
        }

        // 인증번호 확인 시뮬레이션 (실제로는 서버와 통신)
        if (formData.verifyCode.length === 6) {
            setEmailVerified(true);
            setTimerActive(false);
            setSuccess(prev => ({ ...prev, verify: true }));
            setErrors(prev => ({ ...prev, verifyCode: '' }));
        } else {
            setErrors(prev => ({ ...prev, verifyCode: '인증번호가 일치하지 않습니다.' }));
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
        } else if (!emailVerified) {
            newErrors.email = '이메일 인증을 완료해주세요.';
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
            navigate('/login');
        }
    };

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='signup-wrapper'>


            <div className="signup-container">
                <div className="signup-header">
                    <div className="signup-logo">GF</div>
                    <h1 className="signup-title">학생 회원가입</h1>
                    <p className="signup-subtitle">GrowFit에서 AI 실습을 시작하세요</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            이름 <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="홍길동"
                            required
                        />
                        {errors.name && <span className="form-error active">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            이메일 <span className="required">*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="email"
                                className={`form-input ${errors.email ? 'form-input--error' : emailVerified ? 'form-input--success' : ''}`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                required
                                style={{ flex: 1 }}
                                disabled={emailVerified}
                            />
                            <button
                                type="button"
                                className="btn-verify"
                                onClick={sendVerificationCode}
                                disabled={emailVerified}
                            >
                                인증번호 발송
                            </button>
                        </div>
                        <span className="form-hint">학교 또는 회사 이메일을 사용하세요</span>
                        {errors.email && <span className="form-error active">{errors.email}</span>}
                        {success.emailSend && !errors.email && (
                            <span className="form-success active">✓ 인증번호가 발송되었습니다</span>
                        )}
                    </div>

                    {showVerifyCode && (
                        <div className="form-group">
                            <label className="form-label" htmlFor="verifyCode">
                                인증번호 <span className="required">*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    className={`form-input ${errors.verifyCode ? 'form-input--error' : success.verify ? 'form-input--success' : ''}`}
                                    id="verifyCode"
                                    name="verifyCode"
                                    value={formData.verifyCode}
                                    onChange={handleInputChange}
                                    placeholder="6자리 인증번호 입력"
                                    maxLength="6"
                                    style={{ flex: 1 }}
                                    disabled={emailVerified}
                                />
                                <button
                                    type="button"
                                    className="btn-verify"
                                    onClick={verifyCode}
                                    disabled={emailVerified}
                                >
                                    인증확인
                                </button>
                            </div>
                            {timerActive && <span className="form-hint">⏱ 남은 시간: {formatTimer(timer)}</span>}
                            {errors.verifyCode && <span className="form-error active">{errors.verifyCode}</span>}
                            {success.verify && <span className="form-success active">✓ 이메일 인증이 완료되었습니다</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            비밀번호 <span className="required">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="8자 이상, 영문/숫자/특수문자 포함"
                                required
                            />
                            <span
                                className="input-icon password-toggle"
                                onClick={() => togglePassword('password')}
                                style={{ cursor: 'pointer' }}
                            >
                                {passwordVisible ? '🙈' : '👁️'}
                            </span>
                        </div>
                        {formData.password && (
                            <div className="password-strength">
                                <div className="password-strength__bar">
                                    <div
                                        className={`password-strength__fill ${passwordStrength.level ? `password-strength__fill--${passwordStrength.level}` : ''
                                            }`}
                                        style={{ width: `${passwordStrength.width}%` }}
                                    ></div>
                                </div>
                                {passwordStrength.text && (
                                    <div className="password-strength__text">비밀번호 강도: {passwordStrength.text}</div>
                                )}
                            </div>
                        )}
                        {errors.password && <span className="form-error active">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="passwordConfirm">
                            비밀번호 확인 <span className="required">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type={passwordConfirmVisible ? 'text' : 'password'}
                                className={`form-input ${errors.passwordConfirm ? 'form-input--error' : success.passwordConfirm ? 'form-input--success' : ''}`}
                                id="passwordConfirm"
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                onChange={handleInputChange}
                                placeholder="비밀번호를 다시 입력하세요"
                                required
                            />
                            <span
                                className="input-icon password-toggle"
                                onClick={() => togglePassword('passwordConfirm')}
                                style={{ cursor: 'pointer' }}
                            >
                                {passwordConfirmVisible ? '🙈' : '👁️'}
                            </span>
                        </div>
                        {errors.passwordConfirm && <span className="form-error active">{errors.passwordConfirm}</span>}
                        {success.passwordConfirm && formData.passwordConfirm && (
                            <span className="form-success active">✓ 비밀번호가 일치합니다</span>
                        )}
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                            id="termsAgree"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            required
                        />
                        <label className="checkbox-label" htmlFor="termsAgree">
                            GrowFit 서비스 이용에 동의합니다
                        </label>
                    </div>
                    {errors.agreeToTerms && <span className="form-error active">{errors.agreeToTerms}</span>}

                    <button type="submit" className="btn-submit">
                        회원가입하고 AI 실습 시작하기
                    </button>
                </form>

                <div className="signup-footer">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </div>
            </div>
        </div>
    );
}

