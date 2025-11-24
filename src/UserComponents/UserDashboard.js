import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';


export default function UserDashboard() {
    const navigate = useNavigate();
    const [inviteStatus, setInviteStatus] = useState(true);
    const [partnerSignupStatus, setPartnerSignupStatus] = useState(false);
    const [myprofile, setMyprofile] = useState(null);
    const [myaccount, setMyaccount] = useState(null);

    // UserHeader에서 받아온 데이터를 처리하는 콜백 함수들
    const handleAccountData = (accountData) => {
        setMyaccount(accountData);
        console.log(accountData.is_partner);
    };

    const handleProfileData = (profileData) => {
        setMyprofile(profileData);
        console.log(profileData);
    };

    const handleSubmit = (e) => {
        alert("초대코드 등록");
    };

    const showPartnerSignupModal = () => {
        setInviteStatus(false);
        setPartnerSignupStatus(true);
    };

    const [formData, setFormData] = useState({
        name: myprofile?.full_name || '',
        email: myaccount?.email || '',
        organization: '',
        teachingField: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});


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

    const validateForm = () => {
        const newErrors = {};

        // if (!formData.name.trim()) {
        //     newErrors.name = '이름을 입력해주세요.';
        // }

        // if (!formData.email.trim()) {
        //     newErrors.email = '이메일을 입력해주세요.';
        // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        //     newErrors.email = '올바른 이메일 형식이 아닙니다.';
        // }

        if (!formData.organization.trim()) {
            newErrors.organization = '소속 기관명을 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const accessToken = sessionStorage.getItem("access_token");

    const handlePartnerSignupSubmit = (e) => {
        // alert(accessToken);
        e.preventDefault();
        if (validateForm()) {
            axios.post(
                `${process.env.REACT_APP_API_URL}/user/account/partner-promotion-requests`,
                {
                    name: myprofile.full_name,
                    email: myaccount.email,
                    org_name: formData.organization,
                    edu_category: formData.teachingField,
                    target_role: "partner_admin"
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then(response => {
                console.log(response.data);
                setPartnerSignupStatus(false);
            }).catch(error => {
                console.log(error);
            });
        }
    };

    return (
        <>
            <div className={`invite-overlay ${inviteStatus && !myaccount?.is_partner ? '' : 'invite-overlay--hidden'}`} id="inviteOverlay">
                <div className="invite-modal">
                    <div className="invite-modal__header">
                        <div className="invite-modal__icon">🎓</div>
                        <h2 className="invite-modal__title">클래스 초대코드 입력</h2>
                        <p className="invite-modal__subtitle">강사님께서 공유한 초대코드를 입력해주세요</p>
                    </div>
                    <div className="invite-modal__body">

                        <p className="invite-modal__description">GrowFit AI 실습을 시작하려면 클래스 초대코드가 필요합니다.<br />강사님이 공유한 <strong>6자리 코드</strong>를 입력해주세요.</p>
                        <form id="inviteCodeForm" onSubmit={handleSubmit}>
                            <div className="invite-code-input-group">
                                <label className="invite-code-label">초대코드 (6자리)</label>
                                <div className="invite-code-inputs" id="inviteCodeInputs">
                                    <input type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required autoComplete="off" />
                                    <input type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required autoComplete="off" />
                                    <input type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required autoComplete="off" />
                                    <input type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required autoComplete="off" />
                                    <input type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required autoComplete="off" />
                                    <input type="text" className="invite-code-input" maxLength="1" pattern="[A-Za-z0-9]" required autoComplete="off" />
                                </div>
                                <p className="invite-code-help">영문자와 숫자만 입력 가능합니다</p>

                                <div className="invite-code-error" id="inviteCodeError">
                                    <span>⚠️</span>
                                    <span id="inviteCodeErrorText">올바른 초대코드가 아닙니다</span>
                                </div>
                            </div>

                            <div className="invite-modal__actions">
                                <button type="button" className="btn-invite btn-invite--secondary" onClick={() => setInviteStatus(false)}>나중에</button>
                                <button type="submit" className="btn-invite btn-invite--primary" id="submitBtn">입장하기 →</button>
                            </div>

                            <div className="invite-modal__actions" style={{ marginTop: '10px' }}>
                                <button type="button" className="btn-invite btn-invite--secondary"
                                    onClick={() => showPartnerSignupModal()}
                                >
                                    강사 신청하기 →
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >


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
                            <input
                                type="email"
                                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                                id="email"
                                name="email"
                                // value={formData.email}
                                value={myaccount?.email || ""}
                                onChange={handleInputChange}
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


                        {/* <div className="checkbox-group">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                id="agreeTerms"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleInputChange}
                                required
                            />
                            <label className="checkbox-label" htmlFor="agreeTerms">
                                GrowFit 서비스 이용에 동의합니다 (필수)
                            </label>
                        </div>
                        {errors.agreeTerms && <span className="form-error active">{errors.agreeTerms}</span>} */}

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

            <div id="app">
                <UserHeader
                    onAccountData={handleAccountData}
                    onProfileData={handleProfileData}
                />
                <div className="container">
                    <UserSidebar />
                    <main className="main">
                        <div className="page-header">
                            {/* <h1 className="page-header__title">🏠 대시보드</h1>
                            <p className="page-header__subtitle">안녕하세요, 김직원님! 오늘도 좋은 하루 되세요 ☀️</p> */}
                        </div>


                        <div className="quick-actions">
                            <div className="quick-action">
                                <div className="quick-action__icon">💬</div>
                                <div className="quick-action__title">AI 실습 시작</div>
                                <div className="quick-action__desc">대화형 AI로 실습하기</div>
                            </div>

                            <div className="quick-action">
                                <div className="quick-action__icon">📂</div>
                                <div className="quick-action__title">새 프로젝트</div>
                                <div className="quick-action__desc">프로젝트 생성하기</div>
                            </div>

                            <div className="quick-action">
                                <div className="quick-action__icon">🤖</div>
                                <div className="quick-action__title">에이전트 만들기</div>
                                <div className="quick-action__desc">맞춤 AI 에이전트</div>
                            </div>

                            <div className="quick-action">
                                <div className="quick-action__icon">📚</div>
                                <div className="quick-action__title">문서 업로드</div>
                                <div className="quick-action__desc">학습 자료 추가</div>
                            </div>
                        </div>


                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-card__label">총 실습 시간</div>
                                <div className="stat-card__value">24.5시간</div>
                                <div className="stat-card__change">↑ 12% 지난주 대비</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__label">완료한 프로젝트</div>
                                <div className="stat-card__value">8개</div>
                                <div className="stat-card__change">↑ 2개 이번 달</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__label">생성한 에이전트</div>
                                <div className="stat-card__value">5개</div>
                                <div className="stat-card__change">↑ 1개 신규</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-card__label">업로드한 문서</div>
                                <div className="stat-card__value">23개</div>
                                <div className="stat-card__change">↑ 4개 이번 주</div>
                            </div>
                        </div>


                        <div className="recent-section">
                            <div className="recent-section__header">
                                <h2 className="recent-section__title">🕐 최근 활동</h2>
                                <div className="recent-section__link">전체 보기 →</div>
                            </div>

                            <div className="activity-list">
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <div className="activity-item__icon">💬</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">AI 실습</div>
                                            <div className="activity-item__time">5분 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">📂</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">프로젝트 생성</div>
                                            <div className="activity-item__time">1시간 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">🤖</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">에이전트 생성</div>
                                            <div className="activity-item__time">2시간 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">📚</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">문서 업로드</div>
                                            <div className="activity-item__time">3시간 전</div>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-item__icon">✏️</div>
                                        <div className="activity-item__content">
                                            <div className="activity-item__title">프로젝트 수정</div>
                                            <div className="activity-item__time">어제</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="recent-section">
                            <div className="recent-section__header">
                                <h2 className="recent-section__title">📂 진행 중인 프로젝트</h2>
                                <div className="recent-section__link" >전체 보기 →</div>
                            </div>
                            <div className="projects-grid">
                                <div className="project-card">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">📊</div>
                                    </div>
                                    <div className="project-card__title">마케팅 캠페인 기획</div>
                                    <div className="project-card__desc">소셜 미디어 마케팅 전략 수립</div>
                                </div>

                                <div className="project-card">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">💻</div>
                                    </div>
                                    <div className="project-card__title">Python 학습 프로젝트</div>
                                    <div className="project-card__desc">데이터 분석 기초 마스터하기</div>
                                </div>

                                <div className="project-card">
                                    <div className="project-card__header">
                                        <div className="project-card__icon">✍️</div>
                                    </div>
                                    <div className="project-card__title">블로그 콘텐츠 제작</div>
                                    <div className="project-card__desc">AI 활용 콘텐츠 시리즈</div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div >
            </div >





        </>
    )
}