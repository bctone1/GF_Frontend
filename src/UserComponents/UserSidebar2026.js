import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { setSelectedClass, getSelectedClassId, showToast2026, formatDate_MM_DD_HH_MM, formatDate_YY_MM_DD } from '../utill/utill';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function UserSidebar2026({
    onClassChange,
    onClassesData,
    refreshTrigger,
    externalClassSelect,
    getProjecList,
    getSessionResponses,
    handleProfileData,
    handleAccountData,
    startNewChat,
    getSessionList,
    fetchProjectsRef,
    currentSession,
    setCurrentSession,
    fetchSessionRef,

}) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentMenu = location.pathname.split('/')[2];
    const [myClasses, setMyClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const accessToken = sessionStorage.getItem("access_token");
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());
    const [classSelectorOpen, setClassSelectorOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchModalStatus, setSearchModalStatus] = useState(false);
    const [newProjectModalStatus, setNewProjectModalStatus] = useState(false);
    const [settingsModalStatus, setSettingsModalStatus] = useState(false);
    const [profileModalStatus, setProfileModalStatus] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [sessions, setSessions] = useState([]);
    const filteredSessions = sessions.filter(session => session.class_id === Number(selectedClassId));
    const [myprofile, setMyprofile] = useState(null);
    const [myaccount, setMyaccount] = useState(null);
    const [clickContextSessionId, setClickContextSessionId] = useState(null);

    const closeChatContextMenu = useCallback(() => {
        setContextMenuOpen(false);
    }, []);

    const showChatContextMenu = useCallback((event, sessionId) => {
        setClickContextSessionId(sessionId);
        event.stopPropagation();
        setContextMenuPosition({ left: event.clientX, top: event.clientY });
        setContextMenuOpen(true);
    }, []);

    const handleDeleteChat = useCallback(() => {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${clickContextSessionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            if (currentSession === clickContextSessionId) {
                startNewChat();
            }
            fetchSessions();
            closeChatContextMenu();
            showToast2026('세션이 삭제되었습니다.');
        }).catch(error => {
            console.error('세션 삭제 실패:', error);
        });
    }, [closeChatContextMenu, clickContextSessionId, accessToken]);

    const handleSessionClick = useCallback(async (sessionId) => {
        // 세팅 데이터 저장
        // getSessionSet(sessionId)
        // alert(sessionId);
        if (currentMenu !== 'practice') {
            navigate(`/user/practice?sessionId=${sessionId}`);
        }
        try {
            if (setCurrentSession) {
                setCurrentSession(sessionId);
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${sessionId}`,
                { headers: { Authorization: `Bearer ${accessToken}`, }, }
            );
            const sessionData = response.data;
            if (getSessionResponses) {
                getSessionResponses(sessionData);
            }
        } catch (error) {
            console.error('세션 조회 실패:', error);
        }
    }, [accessToken, currentMenu, navigate, setCurrentSession, getSessionResponses]);

    const handleRenameChat = useCallback(() => {
        closeChatContextMenu();
        showToast2026('구현예정입니다.');
    }, [closeChatContextMenu]);




    const fetchProjects = useCallback(async (classId) => {
        if (!classId) {
            setProjectList([]);
            return [];
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects?class_id=${classId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            const projects = response.data.items || [];
            const filteredProjects = projects.filter(project => String(project.class_id) === String(classId));
            if (getProjecList) { getProjecList(filteredProjects); }
            setProjectList(filteredProjects);
            return filteredProjects;
        } catch (error) {
            console.error('프로젝트 조회 실패:', error);
            setProjectList([]);
            return [];
        }
    }, [accessToken, getProjecList]);


    const fetchMyClasses = useCallback(() => {
        if (!accessToken) {
            if (onClassesData) {
                onClassesData([], false);
            }
            return;
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/classes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            const classes = response.data.items || [];
            if (classes.length === 0) {
                setTimeout(() => {
                    setRoleModalOpen(true);
                }, 500);
            }
            setMyClasses(classes);

            // 부모 컴포넌트에 클래스 데이터 전달
            if (onClassesData) {
                onClassesData(classes, false);
            }
            const currentSavedClassId = getSelectedClassId();
            if (currentSavedClassId) {
                const isValid = classes.some(c => String(c.class_id) === String(currentSavedClassId));
                if (isValid) {
                    setSelectedClassId(currentSavedClassId);
                    const selectedClass = classes.find(c => String(c.class_id) === String(currentSavedClassId));
                    if (selectedClass) {
                        setSelectedClass(currentSavedClassId, selectedClass.class_title);
                    }
                } else {
                    setSelectedClass(null, null);
                    setSelectedClassId('');
                }
            }
        }).catch(error => {
            console.error('클래스 조회 실패:', error);
            if (onClassesData) {
                onClassesData([], false);
            }
        });
    }, [accessToken, onClassesData]);

    const fetchSessions = useCallback(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions`,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", } }
        );
        // console.log(response.data.items);
        setSessions(response.data.items);
        if (getSessionList) {
            getSessionList(response.data.items);
        }
    }, [accessToken, getSessionList]);

    const getMyAccount = useCallback(() => {
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
            getPartnerList(response.data);
            if (handleAccountData) {
                handleAccountData(response.data);
            }
        }).catch(error => {
            console.error('계정 조회 실패:', error);
        });
    }, [accessToken, handleAccountData]);



    const getMyProfile = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/my/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            setMyprofile(response.data);
            if (handleProfileData) {
                handleProfileData(response.data);
            }
        }).catch(error => {
            console.error('프로필 조회 실패:', error);
        });
    }, [accessToken, handleProfileData]);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    }

    const changeClass = useCallback(async (classId) => {
        setClassSelectorOpen(false);
        if (Number(classId) === Number(selectedClassId)) return;
        if (setCurrentSession) { setCurrentSession(0); }
        setSelectedClassId(classId);
        if (classId) {
            const selectedClass = myClasses.find(c => String(c.class_id) === String(classId));
            const classTitle = selectedClass ? selectedClass.class_title : null;
            const allowed_model_ids = selectedClass ? selectedClass.allowed_model_ids : [1];
            sessionStorage.setItem("allowed_model_ids", allowed_model_ids);
            setSelectedClass(classId, classTitle);
            const updatedProjects = await fetchProjects(classId);
            if (onClassChange) {
                onClassChange(classId, allowed_model_ids, updatedProjects || []);
            }
        } else {
            setSelectedClass(null, null);
            if (onClassChange) {
                onClassChange(null, [1], []);
            }
        }
    }, [myClasses, selectedClassId, fetchProjects, onClassChange, setCurrentSession]);

    useEffect(() => {
        const sessionIdFromUrl = searchParams.get('sessionId');
        if (sessionIdFromUrl) {
            const sessionId = parseInt(sessionIdFromUrl, 10);
            // console.log(sessionId);
            if (sessionId && !isNaN(sessionId)) {
                const timer = setTimeout(() => {
                    handleSessionClick(sessionId);
                    setSearchParams({});
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [searchParams, handleSessionClick, setSearchParams]);

    useEffect(() => {
        if (savedClassId) {
            setSelectedClassId(savedClassId);
        }
    }, [location.pathname, savedClassId]);


    useEffect(() => {
        fetchMyClasses();
        fetchSessions();
        getMyAccount();
        getMyProfile();

        if (savedClassId) {
            fetchProjects(savedClassId);
        }
    }, []);

    useEffect(() => {
        if (fetchProjectsRef) {
            const currentClassId = savedClassId || getSelectedClassId();
            fetchProjectsRef.current = () => fetchProjects(currentClassId);
        }
    }, [savedClassId, fetchProjects, fetchProjectsRef]);

    useEffect(() => {
        if (fetchSessionRef) {
            fetchSessionRef.current = fetchSessions;
        }
    }, [fetchSessions, fetchSessionRef]);

    useEffect(() => {
        if (refreshTrigger > 0) {
            fetchMyClasses();
        }
    }, [refreshTrigger, fetchMyClasses]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (classSelectorOpen && !e.target.closest('.class-selector') && !e.target.closest('.class-dropdown')) {
                setClassSelectorOpen(false);
            }
        };

        if (classSelectorOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [classSelectorOpen]);

    // externalClassSelect가 변경되면 클래스 선택
    useEffect(() => {
        if (externalClassSelect && myClasses.length > 0) {
            const isValid = myClasses.some(c => String(c.class_id) === String(externalClassSelect));
            if (isValid) {
                changeClass(externalClassSelect);
            }
        }

    }, [externalClassSelect, myClasses, changeClass]);

    // 외부 클릭 시 컨텍스트 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contextMenuOpen && !e.target.closest('.chat-item__menu') && !e.target.closest('.context-menu')) {
                closeChatContextMenu();
            }
        };

        if (contextMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [contextMenuOpen, closeChatContextMenu]);



    // 신청 유무 확인
    const [partnerRequestStatus, setPartnerRequestStatus] = useState(false);
    const getPartnerList = (myAccount) => {
        // console.log(myAccount);

        if (myAccount.default_role === 'partner') {
            setPartnerRequestStatus(true);
            return;
        }

        axios.get(`${process.env.REACT_APP_API_URL}/supervisor/core/promotions/partner-requests?status=pending`)
            .then(response => {
                // console.log(response.data);
                if (response.data.find(item => item.user_id === myAccount.user_id)) {
                    // console.log("신청 유무 확인: true");
                    setPartnerRequestStatus(true);
                } else {
                    // console.log("신청 유무 확인: false");
                    setPartnerRequestStatus(false);
                }
            }).catch(error => {
                console.log(error);
            });
    }



















    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const [partnerSignUpModalOpen, setPartnerSignUpModalOpen] = useState(false);
    const [partnerSignUpStep, setPartnerSignUpStep] = useState(0);

    // 파트너 회원가입 폼 상태
    const [partnerFormData, setPartnerFormData] = useState({
        password: '',
        passwordConfirm: '',
        phone: '',
        organization: '',
        teachingField: '',
        otherField: '',
        verifyCode: '',
        agreeTerms: false,
        agreeMarketing: false
    });
    const [partnerErrors, setPartnerErrors] = useState({});
    const [partnerSuccess, setPartnerSuccess] = useState({});
    const [emailVerified, setEmailVerified] = useState(false);
    const [showVerifyCode, setShowVerifyCode] = useState(false);
    const [verificationToken, setVerificationToken] = useState('');
    const [timer, setTimer] = useState(180);
    const [timerActive, setTimerActive] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [showOtherField, setShowOtherField] = useState(false);

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

    const handlePartnerSignUpBack = () => {
        switch (partnerSignUpStep) {
            case 1:
                setRoleModalOpen(true);
                setPartnerSignUpModalOpen(false);
                setPartnerSignUpStep(0);
                break;
            case 2:
                setPartnerSignUpStep(1);
                break;
        }
    }

    const handlePartnerFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPartnerFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // 에러 초기화
        if (partnerErrors[name]) {
            setPartnerErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // 성공 메시지 초기화
        if (partnerSuccess[name]) {
            setPartnerSuccess(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };


    const formatPhoneNumber = (input) => {
        let value = input.value.replace(/[^\d]/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length <= 3) {
            input.value = value;
        } else if (value.length <= 7) {
            input.value = `${value.slice(0, 3)}-${value.slice(3)}`;
        } else {
            input.value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
        }

        setPartnerFormData(prev => ({ ...prev, phone: input.value }));
    };

    const handleFieldChange = (e) => {
        const value = e.target.value;
        setPartnerFormData(prev => ({ ...prev, teachingField: value }));
        setShowOtherField(value === 'other');
        if (value !== 'other') {
            setPartnerFormData(prev => ({ ...prev, otherField: '' }));
        }
    };

    const handleSendVerification = () => {
        const email = myaccount?.email || '';
        if (!email.trim()) {
            setPartnerErrors(prev => ({ ...prev, email: '이메일을 입력해주세요.' }));
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setPartnerErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
            return;
        }

        setSendingCode(true);
        setPartnerErrors(prev => ({ ...prev, email: '' }));

        axios.post(`${process.env.REACT_APP_API_URL}/user/email/send-code`, {
            email: email
        }).then(response => {
            const data = response.data;
            setVerificationToken(data.verification_token);
            setShowVerifyCode(true);
            setTimerActive(true);
            setTimer(180);
            setPartnerSuccess(prev => ({ ...prev, emailSend: true }));
            setPartnerErrors(prev => ({ ...prev, email: '' }));
            setSendingCode(false);
            // 인증번호 입력 필드 표시
            const verifyGroup = document.querySelector('#formStep1 .form-group[style*="display: none"]');
            if (verifyGroup) verifyGroup.style.display = 'block';
        }).catch(error => {
            setSendingCode(false);
            if (error.response) {
                const errorMessage = error.response.data?.message || error.response.data?.detail || '인증번호 발송에 실패했습니다.';
                setPartnerErrors(prev => ({ ...prev, email: errorMessage }));
            } else {
                setPartnerErrors(prev => ({ ...prev, email: '네트워크 오류가 발생했습니다.' }));
            }
        });
    };

    const checkVerification = () => {
        const verifyCode = partnerFormData.verifyCode || '';
        if (!verifyCode.trim()) {
            setPartnerErrors(prev => ({ ...prev, verifyCode: '인증번호를 입력해주세요.' }));
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/user/email/verify-code`, {
            email: myaccount?.email || '',
            code: verifyCode,
            verification_token: verificationToken
        }).then(response => {
            setEmailVerified(true);
            setTimerActive(false);
            setPartnerSuccess(prev => ({ ...prev, verify: true }));
            setPartnerErrors(prev => ({ ...prev, verifyCode: '' }));
            setPartnerSignUpStep(2);
        }).catch(error => {
            setPartnerErrors(prev => ({ ...prev, verifyCode: '인증번호가 일치하지 않습니다.' }));
            setPartnerSuccess(prev => ({ ...prev, verify: false }));
        });
    };

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!myprofile?.full_name || myprofile.full_name.length < 2) {
            newErrors.name = '이름을 2자 이상 입력해주세요';
        }
        if (!myaccount?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(myaccount.email)) {
            newErrors.email = '올바른 이메일을 입력해주세요';
        } else if (!emailVerified) {
            newErrors.email = '이메일 인증을 완료해주세요';
        }
        setPartnerErrors(prev => ({ ...prev, ...newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        if (!partnerFormData.phone || !phoneRegex.test(partnerFormData.phone)) {
            newErrors.phone = '올바른 연락처를 입력해주세요';
        }
        if (!partnerFormData.organization.trim()) {
            newErrors.organization = '소속 기관을 입력해주세요';
        }
        if (!partnerFormData.teachingField) {
            newErrors.teachingField = '교육 분야를 선택해주세요';
        } else if (partnerFormData.teachingField === 'other' && !partnerFormData.otherField.trim()) {
            newErrors.otherField = '교육 분야를 입력해주세요';
        }
        if (!partnerFormData.agreeTerms) {
            newErrors.agreeTerms = '이용약관에 동의해주세요';
        }
        setPartnerErrors(prev => ({ ...prev, ...newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const handlePartnerSignUpNext = () => {
        if (partnerSignUpStep === 1) {
            if (validateStep1()) {
                setPartnerSignUpStep(2);
            }
        } else if (partnerSignUpStep === 2) {
            if (validateStep2()) {
                handlePartnerSignupSubmit();
            }
        }
    };

    const handlePartnerSignupSubmit = (e) => {
        // alert("신청폼 제출");
        if (e) e.preventDefault();
        if (!validateStep2()) {
            return;
        }

        const teachingField = partnerFormData.teachingField === 'other'
            ? partnerFormData.otherField
            : partnerFormData.teachingField;

        axios.post(
            `${process.env.REACT_APP_API_URL}/user/partner-promotion-requests`,
            {
                name: myprofile?.full_name || '',
                email: myaccount?.email || '',
                // phone: partnerFormData.phone,
                org_name: partnerFormData.organization,
                edu_category: teachingField,
                target_role: "partner",
                // agree_marketing: partnerFormData.agreeMarketing
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        ).then(response => {
            // console.log(response.data);
            showToast2026('강사 신청이 완료되었습니다. 관리자 승인 후 사용 가능합니다.');
            setPartnerSignUpModalOpen(false);
            setPartnerSignUpStep(0);
            // 폼 초기화
            setPartnerFormData({
                password: '',
                passwordConfirm: '',
                phone: '',
                organization: '',
                teachingField: '',
                otherField: '',
                agreeTerms: false,
                agreeMarketing: false
            });
            setEmailVerified(false);
            setShowVerifyCode(false);
            setPartnerErrors({});
            setPartnerSuccess({});
            setVerificationToken('');
            setTimer(180);
            setTimerActive(false);
            setShowOtherField(false);
        }).catch(error => {
            const errorMessage = error.response?.data?.message || error.message || '강사 신청에 실패했습니다.';
            showToast2026(errorMessage);
        });
    };


    return (
        <>
            <div className={`modal-overlay ${searchModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setSearchModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" >대화 검색</h3>
                        <button className="modal__close" onClick={() => setSearchModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" >
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <svg className="icon icon--sm"
                                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" placeholder="대화 내용 검색..." style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} />
                            </div>
                        </div>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', textAlign: 'center', padding: '20px' }}>검색어를 입력하세요</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal-overlay ${newProjectModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setNewProjectModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" >새 프로젝트 생성</h3>
                        <button className="modal__close" onClick={() => setNewProjectModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body">
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>프로젝트 이름</label>
                                <input type="text" placeholder="프로젝트 이름을 입력하세요" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>설명 (선택)</label>
                                <textarea placeholder="프로젝트 설명을 입력하세요" rows="3" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', resize: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <button className="modal__btn" onClick={() => setNewProjectModalStatus(false)}>취소</button>
                                <button className="modal__btn modal__btn--primary" >생성하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal-overlay ${settingsModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setSettingsModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title">설정</h3>
                        <button className="modal__close" onClick={() => setSettingsModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" >
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}>
                                <div><div style={{ fontWeight: '500' }}>다크 모드</div><div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>어두운 테마 사용</div></div>
                                <div className="settings-dropdown__toggle"></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}>
                                <div><div style={{ fontWeight: '500' }}>알림</div><div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>푸시 알림 받기</div></div>
                                <div className="settings-dropdown__toggle settings-dropdown__toggle--active" ></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal__footer" style={{ display: 'flex' }}><button className="modal__btn modal__btn--primary" onClick={() => setSettingsModalStatus(false)}>확인</button></div>
                </div>
            </div>

            <div className={`modal-overlay ${profileModalStatus ? 'modal-overlay--open' : ''}`} onClick={() => setProfileModalStatus(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" >프로필</h3>
                        <button className="modal__close" onClick={() => setProfileModalStatus(false)}>
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body" >
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ width: '80px', height: '80px', margin: '0 auto 12px', background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: '600' }}>홍</div>
                            <h3>{myprofile?.full_name}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{myaccount?.email}</p>
                        </div>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}><span>가입일</span><span style={{ color: 'var(--text-secondary)' }}>
                                {formatDate_YY_MM_DD(myaccount?.created_at)}
                            </span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}><span>총 대화 수</span><span style={{ color: 'var(--text-secondary)' }}>데이터 필요</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', borderRadius: '8px' }}><span>이번 달 사용량</span><span style={{ color: 'var(--text-secondary)' }}>데이터 필요</span></div>
                        </div>
                    </div>
                    <div className="modal__footer" style={{ display: 'flex' }}><button className="modal__btn modal__btn--primary" onClick={() => setProfileModalStatus(false)}>확인</button></div>
                </div>
            </div>



            <aside className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__logo">
                        <div className="sidebar__logo-icon">
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="sidebar__logo-text">GrowFit</span>
                        <span className="sidebar__logo-badge">AI</span>
                    </div>

                    <div className="class-selector">
                        <button
                            className={`class-selector__button ${classSelectorOpen ? 'open' : ''}`}
                            onClick={() => setClassSelectorOpen(!classSelectorOpen)}
                        >
                            <div className="class-selector__icon">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                            </div>
                            <div className="class-selector__info">

                                {selectedClassId ? (
                                    <>
                                        <div className="class-selector__name" >{myClasses.find(c => String(c.class_id) === String(selectedClassId))?.class_title}</div>
                                        <div className="class-selector__meta">
                                            <span className="class-selector__status class-selector__status--active">
                                                <span className="class-selector__status-dot"></span>진행 중
                                            </span>
                                            <span className="class-selector__dday" >D-{Math.floor((new Date(myClasses.find(c => String(c.class_id) === String(selectedClassId))?.class_end_at) - new Date()) / (1000 * 60 * 60 * 24) + 1)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="class-selector__name" >강의를 선택해주세요</div>
                                )}

                            </div>
                            <svg className="icon icon--sm class-selector__arrow" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        <div className={`class-dropdown ${classSelectorOpen ? 'class-dropdown--open' : ''}`} >

                            <div className="class-dropdown__section">
                                <div className="class-dropdown__section-title">진행 중인 클래스</div>
                                {myClasses.map((myClass) => {
                                    const now = new Date();
                                    const startDate = new Date(myClass.class_start_at);
                                    const endDate = new Date(myClass.class_end_at);
                                    const daysUntilStart = Math.floor((startDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const daysLeft = Math.floor((endDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const isDisabled = daysUntilStart > 0 || daysLeft < 0;

                                    if (isDisabled) return null;
                                    return (
                                        <div
                                            className={`class-dropdown__item ${selectedClassId === myClass.class_id ? 'class-dropdown__item--active' : ''}`}
                                            onClick={() => changeClass(myClass.class_id)}
                                            key={myClass.class_id}
                                        >
                                            <div className="class-dropdown__item-info">
                                                <div className="class-dropdown__item-name">{myClass.class_title}</div>
                                                <div className="class-dropdown__item-period">
                                                    {formatDate_YY_MM_DD(myClass.class_start_at)} ~ {formatDate_YY_MM_DD(myClass.class_end_at)}
                                                </div>
                                            </div>
                                            <span className="class-dropdown__item-badge class-dropdown__item-badge--active">{daysLeft === 0 ? '오늘' : `D-` + daysLeft}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="class-dropdown__divider"></div>


                            <div className="class-dropdown__section">
                                <div className="class-dropdown__section-title">종료/예정 클래스</div>
                                {myClasses.map((myClass) => {
                                    const now = new Date();
                                    const startDate = new Date(myClass.class_start_at);
                                    const endDate = new Date(myClass.class_end_at);
                                    const daysUntilStart = Math.floor((startDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const daysLeft = Math.floor((endDate - now) / (1000 * 60 * 60 * 24) + 1);
                                    const isDisabled = daysUntilStart > 0 || daysLeft < 0;

                                    if (!isDisabled) return null;


                                    return (
                                        <div className="class-dropdown__item class-dropdown__item--disabled" key={myClass.class_id}>
                                            <div className="class-dropdown__item-info">
                                                <div className="class-dropdown__item-name">{myClass.class_title}</div>
                                                <div className="class-dropdown__item-period">
                                                    {formatDate_YY_MM_DD(myClass.class_start_at)} ~ {formatDate_YY_MM_DD(myClass.class_end_at)}
                                                </div>
                                            </div>
                                            <span className={`class-dropdown__item-badge class-dropdown__item-badge--${daysLeft < 0 ? 'ended' : 'not-started'}`}>
                                                {daysLeft < 0 ? '종료' : '예정'}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <button className="sidebar__new-chat"
                        onClick={() => { if (startNewChat) { startNewChat() } else { navigate("/user/practice") } }}
                    >
                        <svg className="icon" viewBox="0 0 24 24">
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>
                        <span>새 채팅</span>
                    </button>
                </div>

                <nav className="sidebar__nav">
                    {/* <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/dashboard"
                        className={`sidebar__nav-item ${currentMenu === 'dashboard' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg></span>
                        <span>대시보드</span>
                    </Link> */}

                    <Link
                        to="/user/practice"
                        className={`sidebar__nav-item ${currentMenu === 'practice' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg></span>
                        <span>AI 실습</span>
                    </Link>

                    <Link
                        to="/user/project"
                        className={`sidebar__nav-item ${currentMenu === 'project' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg></span>
                        <span>프로젝트</span>
                    </Link>

                    <Link
                        to="/user/knowledge"
                        className={`sidebar__nav-item ${currentMenu === 'knowledge' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg></span>
                        <span>지식베이스</span>
                    </Link>

                    <Link
                        to="/user/agent"
                        className={`sidebar__nav-item ${currentMenu === 'agent' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <rect x="3" y="11" width="18" height="10" rx="2" />
                            <circle cx="12" cy="5" r="3" />
                            <path d="M12 8v3" />
                            <circle cx="8" cy="16" r="1" />
                            <circle cx="16" cy="16" r="1" />
                        </svg></span>
                        <span>에이전트</span>
                    </Link>

                    {/* <Link
                        onClick={() => showToast2026("준비중입니다.")}
                        // to="/user/workflow"
                        className={`sidebar__nav-item ${currentMenu === 'workflow' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                            <line x1="4" y1="4" x2="9" y2="9" />
                        </svg></span>
                        <span>워크플로우</span>
                    </Link> */}

                    <Link
                        // onClick={() => showToast2026("준비중입니다.")}
                        to="/user/history"
                        className={`sidebar__nav-item ${currentMenu === 'history' ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="sidebar__nav-icon"><svg className="icon" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="10" y1="9" x2="8" y2="9" />
                        </svg></span>
                        <span>기록</span>
                    </Link>
                </nav>

                <div className="sidebar__section-header">
                    <span className="sidebar__section-title">최근 대화</span>
                    <div className="sidebar__section-actions">
                        <button className="sidebar__section-btn" title="대화 검색" onClick={() => setSearchModalStatus(true)}>
                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        <button className="sidebar__section-btn" title="새 프로젝트" onClick={() => setNewProjectModalStatus(true)}>
                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                <line x1="12" y1="11" x2="12" y2="17" />
                                <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="sidebar__history">
                    {filteredSessions.map((session) => (
                        <div className={`chat-item ${currentSession === session.session_id ? 'chat-item--active' : ''}`}
                            onClick={() => handleSessionClick(session.session_id)}
                            key={session.session_id}
                        >
                            {currentSession === session.session_id && (
                                <div className="chat-item__pin-dot"></div>
                            )}

                            <div className="chat-item__icon">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </div>

                            <div className="chat-item__info">
                                <div className="chat-item__title">{session.title}</div>
                                <div className="chat-item__meta">
                                    <div className="chat-item__time">
                                        {formatDate_MM_DD_HH_MM(session.created_at)}
                                    </div>
                                    {session.project_id && (
                                        <span className="chat-item__project-badge">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            {projectList?.find(project => project.project_id === session.project_id)?.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                className="chat-item__menu"
                                onClick={(e) => showChatContextMenu(e, session.session_id)}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                        </div>
                    ))}
                </div>




                <div className="sidebar__footer">
                    <div className="sidebar__footer-item"
                        //  onClick={() => setSettingsModalStatus(true)}
                        onClick={() => window.location.href = "/user/setting"}
                    >
                        <svg className="icon" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" />
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span>설정</span>
                    </div>

                    <div className="sidebar__user" onClick={() => setProfileModalStatus(true)}>
                        <div className="sidebar__user-avatar">{myprofile?.full_name?.charAt(0)}</div>
                        <span className="sidebar__user-name">{myprofile?.full_name}</span>
                        <svg className="icon icon--sm sidebar__user-logout" viewBox="0 0 24 24" onClick={handleLogout}>
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </div>

                </div>
            </aside >

            {/* 컨텍스트 메뉴 */}
            < div
                className={`context-menu ${contextMenuOpen ? 'context-menu--open' : ''}`
                }
                style={{
                    left: `${contextMenuPosition.left}px`,
                    top: `${contextMenuPosition.top}px`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="context-menu__item" onClick={handleRenameChat}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    이름 변경
                </div>
                {/* <div className="context-menu__item" onClick={handleDuplicateChat}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    복제
                </div> */}
                <div className="context-menu__item context-menu__item--danger" onClick={handleDeleteChat}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    삭제
                </div>
            </div >





            <div className="blur-overlay" style={{ display: !partnerRequestStatus && roleModalOpen && currentMenu !== "setting" || partnerSignUpModalOpen ? 'block' : 'none' }}></div>

            <div className={`modal-overlay ${partnerSignUpModalOpen ? "modal-overlay--open" : ""}`}>
                <div className="partner-signup-modal">

                    <div className="partner-signup-modal__header" style={{ position: 'relative' }}>
                        <button
                            className="partner-signup-modal__back"
                            onClick={handlePartnerSignUpBack}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"></path>
                            </svg>
                            뒤로
                        </button>

                        <div className="partner-signup-modal__logo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h1 className="partner-signup-modal__title">강사 회원가입</h1>
                        <p className="partner-signup-modal__subtitle">
                            강의를 생성하고 학생들을 관리하세요
                        </p>
                    </div>

                    <div className="partner-signup-modal__body">
                        <div className="step-indicator">
                            <div className={`step-dot ${partnerSignUpStep === 1 ? 'active' : 'completed'}`} id="step1"></div>
                            <div className={`step-dot ${partnerSignUpStep === 2 ? 'active' : ''}`} id="step2"></div>
                        </div>



                        <form id="signupForm" onSubmit={handlePartnerSignupSubmit}>



                            <div id="formStep1" style={{ display: partnerSignUpStep === 1 ? 'block' : 'none' }}>
                                <div className="info-box">
                                    <div className="info-box__icon">💡</div>
                                    <div className="info-box__content">
                                        <strong>강사 신청 안내</strong>
                                        관리자 승인 후 강의 생성이 가능합니다. (1~2 영업일 소요)
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">이름 <span className="required">*</span></label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="form-input"
                                        id="name"
                                        placeholder="실명을 입력해주세요"
                                        value={myprofile?.full_name || ""}
                                        readOnly
                                        required
                                    />
                                    <div className="form-error" id="nameError">이름을 2자 이상 입력해주세요</div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">이메일 <span className="required">*</span></label>
                                    <div className="input-group">
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-input"
                                            id="email"
                                            value={myaccount?.email || ""}
                                            readOnly
                                            placeholder="growfit@gmail.com"
                                            required
                                        />
                                        {timerActive && timer > 0 && (
                                            <span className="verify-timer">{formatTimer(timer)}</span>
                                        )}
                                        <button
                                            type="button"
                                            className="input-action"
                                            onClick={handleSendVerification}
                                            disabled={emailVerified || timerActive || sendingCode}
                                        >
                                            {sendingCode ? '발송 중...' : emailVerified ? '인증완료' : timerActive ? `재발송` : '인증요청'}
                                        </button>
                                    </div>
                                    <div className="form-error" id="emailError" style={{ display: partnerErrors.email ? 'block' : 'none' }}>
                                        {partnerErrors.email || '올바른 이메일을 입력해주세요'}
                                    </div>
                                    {partnerSuccess.emailSend && !emailVerified && !sendingCode && (
                                        <div className="form-success">인증번호가 발송되었습니다.</div>
                                    )}
                                    {emailVerified && (
                                        <div className="form-success">이메일 인증이 완료되었습니다.</div>
                                    )}
                                </div>

                                <div className="form-group" style={{ display: showVerifyCode && !emailVerified ? 'block' : 'none' }}>
                                    <label className="form-label">인증번호 <span className="required">*</span></label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-input"
                                            id="verifyCode"
                                            placeholder="6자리 인증번호"
                                            maxLength="6"
                                            value={partnerFormData.verifyCode || ''}
                                            onChange={(e) => {
                                                setPartnerFormData(prev => ({ ...prev, verifyCode: e.target.value }));
                                                if (partnerErrors.verifyCode) {
                                                    setPartnerErrors(prev => ({ ...prev, verifyCode: '' }));
                                                }
                                            }}
                                        />
                                        <button type="button" className="input-action" onClick={checkVerification}>확인</button>
                                    </div>

                                    <div className="form-error" id="verifyError" style={{ display: partnerErrors.verifyCode ? 'block' : 'none' }}>
                                        {partnerErrors.verifyCode || '인증번호가 일치하지 않습니다'}
                                    </div>
                                    <div className="form-success" id="verifySuccess" style={{ display: partnerSuccess.verify ? 'block' : 'none' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                        이메일 인증이 완료되었습니다
                                    </div>
                                </div>
                            </div>


                            <div id="formStep2" style={{ display: partnerSignUpStep === 2 ? 'block' : 'none' }}>
                                <div className="form-group">
                                    <label className="form-label">연락처 <span className="required">*</span></label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        id="phone"
                                        name="phone"
                                        placeholder="010-0000-0000"
                                        value={partnerFormData.phone}
                                        onChange={(e) => {
                                            formatPhoneNumber(e.target);
                                        }}
                                        required
                                    />
                                    <div className="form-error" id="phoneError" style={{ display: partnerErrors.phone ? 'block' : 'none' }}>
                                        {partnerErrors.phone || '올바른 연락처를 입력해주세요'}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">소속 기관 <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            id="organization"
                                            name="organization"
                                            placeholder="회사/학교명"
                                            value={partnerFormData.organization}
                                            onChange={handlePartnerFormChange}
                                        />
                                        <div className="form-error" id="organizationError" style={{ display: partnerErrors.organization ? 'block' : 'none' }}>
                                            {partnerErrors.organization || '소속 기관을 입력해주세요'}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">교육 분야</label>
                                        <select
                                            className="form-select"
                                            id="teachingField"
                                            name="teachingField"
                                            value={partnerFormData.teachingField}
                                            onChange={handleFieldChange}
                                        >
                                            <option value="">선택해주세요</option>
                                            <option value="it">IT/개발</option>
                                            <option value="business">비즈니스</option>
                                            <option value="design">디자인</option>
                                            <option value="marketing">마케팅</option>
                                            <option value="language">외국어</option>
                                            <option value="academic">학술/연구</option>
                                            <option value="other">기타</option>
                                        </select>
                                        {partnerErrors.teachingField && (
                                            <div className="form-error">{partnerErrors.teachingField}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group" id="otherFieldGroup" style={{ display: showOtherField ? 'block' : 'none' }}>
                                    <label className="form-label">교육 분야 직접 입력 <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="otherField"
                                        name="otherField"
                                        placeholder="교육 분야를 입력해주세요"
                                        value={partnerFormData.otherField}
                                        onChange={handlePartnerFormChange}
                                    />
                                    <div className="form-hint">예: 음악, 요리, 헬스케어 등</div>
                                    <div className="form-error" id="otherFieldError" style={{ display: partnerErrors.otherField ? 'block' : 'none' }}>
                                        {partnerErrors.otherField || '교육 분야를 입력해주세요'}
                                    </div>
                                </div>

                                <div className="section-divider">약관 동의</div>

                                <div className="partner-signup-checkbox-group">
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        id="agreeTerms"
                                        name="agreeTerms"
                                        checked={partnerFormData.agreeTerms}
                                        onChange={handlePartnerFormChange}
                                        required
                                    />
                                    <label className="checkbox-label" htmlFor="agreeTerms">
                                        <span className="required">[필수]</span> <a href="#">서비스 이용약관</a> 및 <a href="#">개인정보 처리방침</a>에 동의합니다
                                    </label>
                                    {partnerErrors.agreeTerms && (
                                        <div className="form-error">{partnerErrors.agreeTerms}</div>
                                    )}
                                </div>

                                <div className="partner-signup-checkbox-group">
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        id="agreeMarketing"
                                        name="agreeMarketing"
                                        checked={partnerFormData.agreeMarketing}
                                        onChange={handlePartnerFormChange}
                                    />
                                    <label className="checkbox-label" htmlFor="agreeMarketing">
                                        [선택] 마케팅 정보 수신에 동의합니다
                                    </label>
                                </div>
                            </div>
                        </form>




                    </div>

                    <div className="partner-signup-modal__footer">
                        <button type="button" className="submit-btn" onClick={handlePartnerSignUpNext}>
                            {partnerSignUpStep === 2 ? '신청하기' : '다음'}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>

                        <p className="modal__note">
                            이미 계정이 있으신가요? <a href="/login">로그인</a>
                        </p>
                    </div>
                </div>
            </div>




            <div className={`modal-overlay ${!partnerRequestStatus && roleModalOpen && currentMenu !== "setting" ? 'modal-overlay--open' : ''}`}>
                <div className="role-modal">
                    <div className="role-modal__header">
                        <div className="role-modal__logo">
                            GF
                        </div>
                        <h1 className="role-modal__title">GrowFit에 오신 것을 환영합니다!</h1>
                        <p className="role-modal__subtitle">
                            AI 교육을 시작하기 위해<br />역할을 선택해주세요
                        </p>
                    </div>

                    <div className="role-modal__body">
                        <div className="role-selection">

                            <div className="role-card role-card--student" onClick={() => navigate('/user/setting')}>
                                <div className="role-card__header">
                                    <div className="role-card__icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px', color: 'white' }}>
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="role-card__title">수강생</div>
                                        <span className="role-card__badge">학습자</span>
                                    </div>
                                </div>
                                <p className="role-card__description">
                                    강의를 수강하고 AI 모델을 실습하며 학습합니다.
                                </p>
                                <div className="role-card__features">
                                    <div className="role-card__feature">
                                        <svg className="role-card__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>초대코드로 강의 등록</span>
                                    </div>
                                    <div className="role-card__feature">
                                        <svg className="role-card__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>단일/다중 LLM 실습 환경</span>
                                    </div>
                                    <div className="role-card__feature">
                                        <svg className="role-card__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>지식베이스 및 RAG 활용</span>
                                    </div>
                                </div>
                            </div>


                            <div className="role-card role-card--instructor"
                                onClick={() => {
                                    setPartnerSignUpModalOpen(true);
                                    setRoleModalOpen(false);
                                    setPartnerSignUpStep(1);
                                }}
                            >
                                <div className="role-card__header">
                                    <div className="role-card__icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px', color: 'white' }}>
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="role-card__title">강사</div>
                                        <span className="role-card__badge">교육자</span>
                                    </div>
                                </div>
                                <p className="role-card__description">
                                    강의를 생성하고 학생들을 관리하며 교육을 진행합니다.
                                </p>
                                <div className="role-card__features">
                                    <div className="role-card__feature">
                                        <svg className="role-card__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>강의 생성 및 관리</span>
                                    </div>
                                    <div className="role-card__feature">
                                        <svg className="role-card__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>학생 초대 및 관리</span>
                                    </div>
                                    <div className="role-card__feature">
                                        <svg className="role-card__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>학습 현황 모니터링</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="role-modal__footer">
                        <div className="modal__note">
                            <strong>💡 참고:</strong> 강사 신청 시 관리자 승인 후 강의 생성이 가능합니다. (1~2 영업일 소요)
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}