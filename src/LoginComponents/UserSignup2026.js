import axios from "axios";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast2026 } from "../utill/utill";

export default function UserSignup2026() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        verifyCode: '',
        agreeToTerms: false,
        referralSource: ''
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
    const [activeTab, setActiveTab] = useState('user');
    const [showOtherReason, setShowOtherReason] = useState(false);
    const [otherReferralSource, setOtherReferralSource] = useState('');
    const [sendingCode, setSendingCode] = useState(false);

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
    const [verificationToken, setVerificationToken] = useState('');

    const sendVerificationCode = () => {
        if (!formData.email.trim()) {
            setErrors(prev => ({ ...prev, email: '이메일을 입력해주세요.' }));
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
            return;
        }

        setSendingCode(true);
        setErrors(prev => ({ ...prev, email: '' }));
        setSuccess(prev => ({ ...prev, emailSend: false }));

        axios.post(`${process.env.REACT_APP_API_URL}/user/email/send-code`, {
            email: formData.email
        }).then(response => {
            const data = response.data;
            console.log(data);
            setVerificationToken(data.verification_token);
            setShowVerifyCode(true);
            setTimerActive(true);
            setTimer(180);
            setSuccess(prev => ({ ...prev, emailSend: true }));
            setErrors(prev => ({ ...prev, email: '' }));
            setSendingCode(false);
        }).catch(error => {
            console.log(error);
            setSendingCode(false);
            if (error.response) {
                const errorMessage = error.response.data?.message || error.response.data?.detail || '인증번호 발송에 실패했습니다.';
                setErrors(prev => ({ ...prev, email: errorMessage }));
            } else {
                setErrors(prev => ({ ...prev, email: '네트워크 오류가 발생했습니다.' }));
            }
        });
    };

    const verifyCode = () => {
        if (!formData.verifyCode.trim()) {
            setErrors(prev => ({ ...prev, verifyCode: '인증번호를 입력해주세요.' }));
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/user/email/verify-code`, {
            email: formData.email,
            code: formData.verifyCode,
            verification_token: verificationToken
        }).then(response => {
            const data = response.data;
            console.log(data);
            setEmailVerified(true);
            setTimerActive(false);
            setSuccess(prev => ({ ...prev, verify: true }));
            setErrors(prev => ({ ...prev, verifyCode: '' }));
        }).catch(error => {
            setErrors(prev => ({ ...prev, verifyCode: '인증번호가 일치하지 않습니다.' }));
            console.log(error);
        });
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
            // 이메일 인증 토큰 확인
            if (!verificationToken || verificationToken.trim() === '') {
                setErrors(prev => ({ ...prev, email: '이메일 인증을 완료해주세요.' }));
                return;
            }

            axios.post(`${process.env.REACT_APP_API_URL}/user/signup`,
                {
                    email: formData.email,
                    password: formData.password,
                    full_name: formData.name,
                    status: 'active',
                    default_role: "member",
                    // email_verified_token: verificationToken
                    referral_source: formData.referralSource
                }
            ).then(response => {
                console.log('회원가입 성공:', response.data);
                showToast2026('회원가입이 완료되었습니다.', 'success');
                navigate('/login');
            }
            ).catch(error => {
                console.error('회원가입 에러:', error);
                console.error('에러 응답:', error.response);
                if (error.response) {
                    console.error('에러 데이터:', error.response.data);
                    console.error('에러 상태:', error.response.status);
                    const errorMessage = error.response.data?.message || error.response.data?.detail || '회원가입에 실패했습니다.';
                    alert(errorMessage);
                } else {
                    alert('네트워크 오류가 발생했습니다.');
                }
            });
        }
    };

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleReferralSourceChange = (e) => {
        const value = e.target.value;
        if (value === 'other') {
            setShowOtherReason(true);
            // "기타"를 선택했을 때는 referralSource를 "other"로 설정하지 않고, 직접 입력 필드의 값을 사용
        } else {
            setShowOtherReason(false);
            setFormData(prev => ({ ...prev, referralSource: value }));
            setOtherReferralSource('');
        }
    };

    const handleOtherReferralSourceChange = (e) => {
        const value = e.target.value;
        setOtherReferralSource(value);
        setFormData(prev => ({ ...prev, referralSource: value }));
    };

    return (
        <>
            <div className="signup-body">
                <div className="signup-wrapper">
                    <div className="info-section">
                        <div className="brand">
                            <span className="brand-name">GrowFit</span>
                        </div>

                        <div className="hero-content">
                            <h1 className="hero-title">
                                AI 실습의 시작,<br />
                                GrowFit과 함께
                            </h1>

                            <p className="hero-description">
                                회원가입 후 다양한 AI 모델을 경험하고<br />
                                실무에 바로 적용할 수 있는 역량을 키워보세요.
                            </p>

                            <div className="benefits-list">
                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div className="benefit-content">
                                        <h3 className="benefit-title">즉시 시작 가능</h3>
                                        <p className="benefit-description">초대코드만 있으면 바로 AI 실습 환경에 접속할 수 있습니다</p>
                                    </div>
                                </div>

                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div className="benefit-content">
                                        <h3 className="benefit-title">다중 LLM 비교</h3>
                                        <p className="benefit-description">GPT-4, Claude, Gemini를 동시에 비교하며 학습하세요</p>
                                    </div>
                                </div>

                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div className="benefit-content">
                                        <h3 className="benefit-title">체계적인 학습 관리</h3>
                                        <p className="benefit-description">프로젝트별 대화 저장 및 지식베이스 활용</p>
                                    </div>
                                </div>

                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div className="benefit-content">
                                        <h3 className="benefit-title">강사 신청 가능</h3>
                                        <p className="benefit-description">승인 후 직접 강의를 개설하고 학생을 초대할 수 있습니다</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="signup-section">
                        <div className="signup-header">
                            <h2 className="signup-title">회원가입</h2>
                            <p className="signup-subtitle">GrowFit에서 AI 실습을 시작하세요</p>
                        </div>

                        <div className="tabs">
                            <button
                                type="button"
                                className={`tab ${activeTab === 'user' ? 'active' : ''}`}
                                onClick={() => handleTabChange('user')}
                            >
                                사용자
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === 'company' ? 'active' : ''}`}
                                // onClick={() => handleTabChange('company')}
                                onClick={() => showToast2026('기업 회원가입은 준비 중입니다.', 'info')}
                            >
                                기업
                            </button>
                        </div>


                        <div className="notice-box" id="noticeBox" style={{ background: 'linear-gradient(135deg, rgb(237, 233, 254) 0%, rgb(224, 231, 255) 100%)', borderLeftColor: 'rgb(124, 58, 237)' }}>
                            <div className="notice-title">
                                <svg className="notice-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span id="noticeTitle" style={{ color: 'rgb(91, 33, 182)' }}>사용자 회원가입</span>
                            </div>
                            <p className="notice-text" id="noticeText" style={{ color: 'rgb(109, 40, 217)' }}>강사와 학생 모두 사용자로 가입합니다. 로그인 후 초대코드로 강의에 참여하거나, 강사 신청을 통해 강의를 개설할 수 있습니다.</p>
                        </div>

                        <div className="form-container">

                            <form id="userForm" className={`signup-form ${activeTab !== 'user' ? 'hidden' : ''}`} onSubmit={handleSubmit}>
                                <div className="form-field">
                                    <label className="field-label">
                                        이름<span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="field-input"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="홍길동" required
                                    />
                                    {errors.name && <span className="form-error active">{errors.name}</span>}
                                </div>

                                <div className="form-field">
                                    <label className="field-label">
                                        이메일<span className="required">*</span>
                                    </label>
                                    <div className="email-field-group">
                                        <input
                                            type="email"
                                            className="field-input"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your.email@example.com"
                                            required
                                            disabled={emailVerified}
                                        />
                                        <button
                                            type="button"
                                            className="verify-button"
                                            onClick={sendVerificationCode}
                                            disabled={emailVerified || timerActive || sendingCode}
                                        >
                                            {sendingCode ? (
                                                <>
                                                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', marginRight: '6px', animation: 'spin 0.8s linear infinite' }}></span>
                                                    발송 중...
                                                </>
                                            ) : emailVerified ? '인증완료' : timerActive ? `재발송 (${formatTimer(timer)})` : '인증번호 발송'}
                                        </button>
                                    </div>
                                    {sendingCode && <span className="form-success active" style={{ color: '#666' }}>인증번호를 발송하고 있습니다...</span>}
                                    {errors.email && <span className="form-error active">{errors.email}</span>}
                                    {success.emailSend && !emailVerified && !sendingCode && <span className="form-success active">인증번호가 발송되었습니다.</span>}
                                    {emailVerified && <span className="form-success active">이메일 인증이 완료되었습니다.</span>}
                                    <p className="field-hint">학교 또는 회사 이메일을 사용하세요</p>
                                </div>

                                {(showVerifyCode || timerActive) && !emailVerified && (
                                    <div className="form-field">
                                        <label className="field-label">
                                            인증번호<span className="required">*</span>
                                        </label>
                                        <div className="email-field-group">
                                            <input
                                                type="text"
                                                className="field-input"
                                                name="verifyCode"
                                                value={formData.verifyCode}
                                                onChange={handleInputChange}
                                                placeholder="인증번호를 입력하세요"
                                                maxLength="6"
                                            />
                                            <button
                                                type="button"
                                                className="verify-button"
                                                onClick={verifyCode}
                                                disabled={!timerActive && timer === 0}
                                            >
                                                인증하기
                                            </button>
                                        </div>
                                        {timerActive && timer > 0 && (
                                            <p className="field-hint" style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                남은 시간: {formatTimer(timer)}
                                            </p>
                                        )}
                                        {errors.verifyCode && <span className="form-error active">{errors.verifyCode}</span>}
                                        {success.verify && <span className="form-success active">인증이 완료되었습니다.</span>}
                                    </div>
                                )}

                                <div className="form-field">
                                    <label className="field-label">
                                        비밀번호<span className="required">*</span>
                                    </label>
                                    <div className="password-field">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="field-input"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="8자 이상, 영문/숫자/특수문자 포함"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            aria-label="비밀번호 보기"
                                            onClick={() => togglePassword('password')}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                {passwordVisible ? (
                                                    <>
                                                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
                                                        <path d="M1 1l22 22"></path>
                                                    </>
                                                ) : (
                                                    <>
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    {passwordStrength.text && (
                                        <div className="password-strength">
                                            <div className="password-strength-bar">
                                                <div
                                                    className={`password-strength-fill ${passwordStrength.level}`}
                                                    style={{ width: `${passwordStrength.width}%` }}
                                                ></div>
                                            </div>
                                            <span className={`password-strength-text ${passwordStrength.level}`}>
                                                비밀번호 강도: {passwordStrength.text}
                                            </span>
                                        </div>
                                    )}
                                    {errors.password && <span className="form-error active">{errors.password}</span>}
                                </div>

                                <div className="form-field">
                                    <label className="field-label">
                                        비밀번호 확인<span className="required">*</span>
                                    </label>
                                    <div className="password-field">
                                        <input
                                            type={passwordConfirmVisible ? "text" : "password"}
                                            className="field-input"
                                            name="passwordConfirm"
                                            value={formData.passwordConfirm}
                                            onChange={handleInputChange}
                                            placeholder="비밀번호를 다시 입력하세요"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            aria-label="비밀번호 보기"
                                            onClick={() => togglePassword('passwordConfirm')}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                {passwordConfirmVisible ? (
                                                    <>
                                                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
                                                        <path d="M1 1l22 22"></path>
                                                    </>
                                                ) : (
                                                    <>
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    {success.passwordConfirm && formData.passwordConfirm && (
                                        <span className="form-success active">비밀번호가 일치합니다.</span>
                                    )}
                                    {errors.passwordConfirm && <span className="form-error active">{errors.passwordConfirm}</span>}
                                </div>

                                <div className="additional-section">
                                    <p className="additional-title">추가 정보 (선택)</p>
                                    <div className="form-field">
                                        <label className="field-label">GrowFit을 어떻게 알게 되셨나요?</label>
                                        <select
                                            className="field-select"
                                            name="referralSource"
                                            value={showOtherReason ? 'other' : formData.referralSource}
                                            onChange={handleReferralSourceChange}
                                        >
                                            <option value="">선택하세요</option>
                                            <option value="search">검색 (네이버, 구글 등)</option>
                                            <option value="sns">SNS (인스타그램, 페이스북 등)</option>
                                            <option value="recommend">지인 추천</option>
                                            <option value="education">교육기관 안내</option>
                                            <option value="company">회사/조직 안내</option>
                                            <option value="other">기타</option>
                                        </select>
                                    </div>
                                    {showOtherReason && (
                                        <div className="form-field">
                                            <label className="field-label">직접 입력</label>
                                            <input
                                                type="text"
                                                className="field-input"
                                                value={otherReferralSource}
                                                onChange={handleOtherReferralSourceChange}
                                                placeholder="알게 된 경로를 입력해 주세요"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="checkbox-group">
                                    <div className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            id="agreeTerms"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label htmlFor="agreeTerms">
                                            <a href="#">GrowFit 서비스 이용약관</a> 및 <a href="#">개인정보 처리방침</a>에 동의합니다 (필수)
                                        </label>
                                    </div>
                                    {errors.agreeToTerms && <span className="form-error active">{errors.agreeToTerms}</span>}
                                </div>

                                <button type="submit" className="submit-button">
                                    회원가입하고 AI 실습 시작하기
                                </button>
                            </form>


                            <form id="companyForm" className={`signup-form ${activeTab !== 'company' ? 'hidden' : ''}`}>
                                <div className="form-field">
                                    <label className="field-label">
                                        담당자 이름<span className="required">*</span>
                                    </label>
                                    <input type="text" className="field-input" placeholder="홍길동" required="" />
                                </div>

                                <div className="form-field">
                                    <label className="field-label">
                                        업무용 이메일<span className="required">*</span>
                                    </label>
                                    <div className="email-field-group">
                                        <input type="email" className="field-input" placeholder="admin@company.com" required="" />
                                        <button type="button" className="verify-button">인증번호 발송</button>
                                    </div>
                                    <p className="field-hint">기업 도메인 이메일을 사용해 주세요</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="field-label">
                                            비밀번호<span className="required">*</span>
                                        </label>
                                        <div className="password-field">
                                            <input type="password" className="field-input" placeholder="8자 이상" required="" />
                                            <button type="button" className="password-toggle" aria-label="비밀번호 보기">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label">
                                            비밀번호 확인<span className="required">*</span>
                                        </label>
                                        <div className="password-field">
                                            <input type="password" className="field-input" placeholder="비밀번호 확인" required="" />
                                            <button type="button" className="password-toggle" aria-label="비밀번호 보기">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="field-label">
                                        기업/기관명<span className="required">*</span>
                                    </label>
                                    <input type="text" className="field-input" placeholder="예: ABC 주식회사, 서울대학교" required="" />
                                </div>

                                <div className="form-field">
                                    <label className="field-label">
                                        담당자 연락처<span className="required">*</span>
                                    </label>
                                    <input type="tel" className="field-input" placeholder="010-0000-0000" required="" />
                                </div>

                                <div className="form-field">
                                    <label className="field-label">
                                        부서/직책
                                    </label>
                                    <input type="text" className="field-input" placeholder="예: 인사팀 과장, 교육기획부 담당자" />
                                </div>

                                <div className="checkbox-group">
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="agreeTermsCompany" required="" />
                                        <label htmlFor="agreeTermsCompany">
                                            <a href="#">GrowFit 서비스 이용약관</a> 및 <a href="#">개인정보 처리방침</a>에 동의합니다 (필수)
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="submit-button">
                                    기업 회원가입 신청하기
                                </button>
                            </form>
                        </div>

                        <div className="login-link-box">
                            <p className="login-link-text">
                                이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

