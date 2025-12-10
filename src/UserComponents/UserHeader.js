import { useState, useEffect } from 'react';
import axios from 'axios';
import { createNotificationDropdown } from '../utill/utill';
import { showToast } from '../utill/utill';


export default function UserHeader({ onAccountData, onProfileData }) {
    const accessToken = sessionStorage.getItem("access_token");
    const [myprofile, setMyprofile] = useState(null);
    const [myaccount, setMyaccount] = useState(null);

    const getMyAccount = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            sessionStorage.setItem("partner_id", response.data.partner_id);
            sessionStorage.setItem("user_id", response.data.user_id);
            sessionStorage.setItem("user_email", response.data.email);
            // console.log(response.data);
            setMyaccount(response.data);
            // 부모 컴포넌트로 데이터 전달
            if (onAccountData) {
                onAccountData(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const getMyProfile = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/my/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            // console.log(response.data);
            setMyprofile(response.data);
            // 부모 컴포넌트로 데이터 전달
            if (onProfileData) {
                onProfileData(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getMyAccount();
        getMyProfile();
    }, []);

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        // sessionStorage.removeItem("access_token");
        // sessionStorage.removeItem("user_id");
        // sessionStorage.removeItem("partner_id");
        // sessionStorage.removeItem("user_email");
        window.location.href = "/login";
    }

    // 강사 신청관련
    const [partnerSignupStatus, setPartnerSignupStatus] = useState(false);

    const [formData, setFormData] = useState({
        name: myprofile?.full_name || '',
        email: myaccount?.email || '',
        organization: '',
        teachingField: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});


    const validateForm = () => {
        const newErrors = {};
        if (!formData.organization.trim()) {
            newErrors.organization = '소속 기관명을 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePartnerSignupSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post(
                `${process.env.REACT_APP_API_URL}/user/partner-promotion-requests`,
                {
                    name: myprofile?.full_name || '',
                    email: myaccount?.email || '',
                    org_name: formData.organization,
                    edu_category: formData.teachingField,
                    target_role: "partner"
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then(response => {
                console.log(response.data);
                showToast('강사 신청이 완료되었습니다. 관리자 승인 후 사용 가능합니다.', 'success');
                setPartnerSignupStatus(false);
            }).catch(error => {
                const errorMessage = error.response?.data?.message || error.message || '강사 신청에 실패했습니다.';
                showToast(errorMessage, 'error');
            });
        }
    };

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
    };



    return (
        <>
            <header className="header">
                <div className="header__left">
                    <button id="menuToggle" className="header__icon-button hidden-desktop">
                        <span>☰</span>
                    </button>
                    <a href="/user/profile" className="header__logo">
                        {/* <span className="header__logo-icon">🌱</span>
                        <span>GrowFit</span> */}
                        <img className="auth-logo-icon-header" src="/GrowFit.png" alt="GrowFit" />
                    </a>
                </div>

                <div className="header__right">

                    {myaccount?.partner_id && (
                        <div className="header__mode-toggle">
                            <button className="mode-toggle-btn mode-toggle-btn--active">
                                {/* <span className="mode-toggle-btn__icon">👨‍🎓</span> */}
                                <span className="mode-toggle-btn__text">수강생</span>
                            </button>
                            <button className="mode-toggle-btn" onClick={() => window.location.href = '/partner/project-management'}>
                                {/* <span className="mode-toggle-btn__icon">👨‍🏫</span> */}
                                <span className="mode-toggle-btn__text">강사</span>
                            </button>
                        </div>
                    )}


                    <button id="notificationBtn" className="header__icon-button" onClick={createNotificationDropdown}>
                        <span>🔔</span>
                        {/* <span className="header__badge">3</span> */}
                    </button>

                    <div id="profileBtn" className="header__profile"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    >
                        <div className="header__avatar" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>{myprofile?.full_name?.charAt(0)}</div>
                        <span className="hidden-mobile">{myprofile?.full_name}</span>
                        <span className="hidden-mobile">▼</span>
                    </div>

                    <div id="profileDropdown" className={`dropdown dropdown--profile ${profileDropdownOpen ? 'dropdown--open' : ''}`}>
                        <div className="dropdown__body">
                            <a href="/user/profile?tab=profile" className="dropdown__item">
                                <span className="dropdown__item-icon">👤</span>
                                <span>내 프로필</span>
                            </a>
                            <a href="/user/profile?tab=enrolled" className="dropdown__item">
                                <span className="dropdown__item-icon">📚</span>
                                <span>수강 강의</span>
                            </a>
                            {!myaccount?.partner_id && (
                                <a href="#" className="dropdown__item" onClick={() => setPartnerSignupStatus(true)}>
                                    <span className="dropdown__item-icon">👨‍🏫</span>
                                    <span>강사 신청</span>
                                </a>
                            )}
                            <div className="divider"></div>
                            <a href="#" className="dropdown__item dropdown__item--danger" onClick={handleLogout}>
                                <span className="dropdown__item-icon">🚪</span>
                                <span>로그아웃</span>
                            </a>
                        </div>
                    </div>


                </div>
            </header>

            <div className={`invite-overlay ${partnerSignupStatus ? '' : 'invite-overlay--hidden'}`}>
                <div className="signup-container">
                    <div className="signup-header">
                        <div className="signup-logo">GF</div>
                        <h1 className="signup-title">강사 신청하기</h1>
                    </div>

                    <div className="info-box">
                        <span className="info-box__icon">📝</span>
                        <div>
                            <strong>관리자 승인 후 사용 가능합니다</strong>
                            회원가입 후 플랫폼 관리자의 검토를 거쳐 승인됩니다 (보통 1~2영업일 소요)
                        </div>
                    </div>

                    <form onSubmit={handlePartnerSignupSubmit}>

                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                이름 <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                                id="name"
                                name="name"
                                // value={formData.name}
                                value={myprofile?.full_name || ""}
                                readOnly
                                placeholder="홍길동"
                                required
                            />
                            {errors.name && <span className="form-error active">{errors.name}</span>}
                        </div>


                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                이메일 <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                                id="email"
                                name="email"
                                // value={formData.email}
                                value={myaccount?.email || ""}
                                readOnly
                                placeholder="growfit@gmail.com"
                                required
                            />
                            {errors.email && <span className="form-error active">{errors.email}</span>}
                        </div>


                        <div className="form-group">
                            <label className="form-label" htmlFor="organization">
                                소속 기관명 <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.organization ? 'form-input--error' : ''}`}
                                id="organization"
                                name="organization"
                                value={formData.organization}
                                onChange={handleInputChange}
                                placeholder="예: 서울대학교, ABC 기업교육센터"
                                required
                                minLength="2"
                                maxLength="200"
                                autoComplete="off"
                            />
                            {errors.organization && <span className="form-error active">{errors.organization}</span>}
                        </div>

                        <div className="section-divider">추가 정보 (선택)</div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="teachingField">
                                교육 분야
                            </label>
                            <select
                                className="form-select"
                                id="teachingField"
                                name="teachingField"
                                value={formData.teachingField}
                                onChange={handleInputChange}
                            >
                                <option value="">선택하세요</option>
                                <option value="programming">프로그래밍</option>
                                <option value="data-science">데이터 사이언스</option>
                                <option value="ai-ml">AI/머신러닝</option>
                                <option value="design">디자인</option>
                                <option value="marketing">마케팅</option>
                                <option value="business">비즈니스</option>
                                <option value="other">기타</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-submit">
                            가입신청
                        </button>

                        <button type="button" className="btn-cancel" onClick={() => setPartnerSignupStatus(false)} >
                            가입취소
                        </button>

                        <div className="partner-warning-box">
                            <span className="partner-warning-box__icon">⏱</span>
                            <div>
                                관리자 검토 후 승인까지 <strong>1~2영업일</strong> 소요될 수 있습니다
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}