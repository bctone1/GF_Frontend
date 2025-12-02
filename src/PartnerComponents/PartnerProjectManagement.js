import { useState, useEffect } from 'react';
import axios from 'axios';
import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';

export default function PartnerProjectManagement() {
    const [showModal, setShowModal] = useState(false);
    const [showCourseCreatedModal, setShowCourseCreatedModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trainingDays, setTrainingDays] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newClass, setNewClass] = useState(null);
    const partnerId = sessionStorage.getItem("partner_id");
    const accessToken = sessionStorage.getItem("access_token");
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const handleCreateClass = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // FormData로 폼 데이터 가져오기
            const formData = new FormData(e.target);

            // 단일 값 가져오기
            const className = formData.get('ClassName')?.trim();
            const courseName = formData.get('courseName')?.trim();
            const studentCount = parseInt(formData.get('studentCount'), 10);
            const startDateValue = formData.get('startDate');
            const endDateValue = formData.get('endDate');
            const classDescription = formData.get('ClassDescription')?.trim() || '';

            // 다중 선택 값 가져오기 (LLM 체크박스) - 문자열 ID 배열
            const selectedLLMs = formData.getAll('llm');

            // 유효성 검사
            if (!className) {
                throw new Error('강의명을 입력해주세요.');
            }

            let courseIdToUse;

            // 과정명이 비어있는 경우
            if (!courseName) {
                const confirmNoCourse = window.confirm('무소속으로 진행하시겠습니까?');
                if (!confirmNoCourse) {
                    // "아니오"를 누른 경우 중단
                    setIsLoading(false);
                    return;
                }
                // "예"를 누른 경우 course_id를 1로 설정
                courseIdToUse = 1;
            } else {
                // 입력한 과정명이 courses에 존재하는지 확인
                const foundCourse = courses.find(course =>
                    course && course.title && course.title.trim() === courseName.trim()
                );

                if (!foundCourse) {
                    // 과정이 없으면 알림창 표시 및 input 비우기
                    alert('해당 과정이 존재하지 않습니다. 자동완성 목록에서 선택해주세요.');
                    setCourseNameInput('');
                    setSelectedCourseId(null);
                    const form = document.getElementById('createClassForm');
                    if (form) {
                        const courseNameInput = form.querySelector('[name="courseName"]');
                        if (courseNameInput) {
                            courseNameInput.value = '';
                        }
                    }
                    setIsLoading(false);
                    return;
                }

                // 선택된 course_id 사용 (없으면 찾은 과정의 id 사용)
                courseIdToUse = selectedCourseId || foundCourse.id;
            }

            if (!studentCount || studentCount < 1) {
                throw new Error('수강 학생 수를 올바르게 입력해주세요.');
            }
            if (!startDateValue || !endDateValue) {
                throw new Error('교육 시작일과 종료일을 모두 입력해주세요.');
            }
            if (selectedLLMs.length === 0) {
                throw new Error('최소 하나의 LLM 모델을 선택해주세요.');
            }

            // allowed_model_ids: 문자열 ID들을 숫자 배열로 변환 (예: ["1","2"] → [1,2])
            const allowedModelIds = selectedLLMs
                .map(v => parseInt(v, 10))
                .filter(v => !Number.isNaN(v));

            // 백엔드로 전송할 데이터 구성
            const requestData = {
                name: className,
                description: classDescription,
                status: "planned",
                start_at: startDateValue,
                end_at: endDateValue,
                capacity: studentCount,
                timezone: "UTC",
                location: "string",
                online_url: "string",
                invite_only: false,
                allowed_model_ids: allowedModelIds,
                course_id: courseIdToUse
            };

            console.log('모델 결과', selectedLLMs, allowedModelIds);
            console.log('전송할 데이터:', requestData);
            console.log("선택한 코스 아이디", courseIdToUse);

            // axios를 사용한 POST 요청
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/partner/${partnerId}/classes?course_id=${courseIdToUse}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('응답 데이터:', response.data);

            if (response.data.invite_codes[0].code) {
                axios.post(`${process.env.REACT_APP_API_URL}/user/class/invites/redeem`, {
                    code: response.data.invite_codes[0].code
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }).then(response => {
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                });
            }

            setNewClass(response.data);

            // 성공 시 모달 표시
            setShowCourseCreatedModal(true);
            setShowModal(false);

            // 폼 초기화
            e.target.reset();
            setStartDate('');
            setEndDate('');
            setCourseNameInput('');
            setShowSuggestions(false);
            setSelectedCourseId(null);

        } catch (error) {
            console.error('에러 발생:', error);

            // 에러 메시지 설정
            if (error.response) {
                // 서버에서 응답이 온 경우
                const errorMessage = error.response.data?.message || error.response.data?.error || '서버 오류가 발생했습니다.';
                setError(errorMessage);
            } else if (error.request) {
                // 요청은 보냈지만 응답을 받지 못한 경우
                setError('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
            } else {
                // 에러 메시지가 있는 경우
                setError(error.message || '알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    // 교육 기간 계산 함수
    const calculateTrainingDays = (start, end) => {
        if (!start || !end) {
            return 0;
        }

        const startDateObj = new Date(start);
        const endDateObj = new Date(end);

        // 종료일이 시작일보다 이전이면 0 반환
        if (endDateObj < startDateObj) {
            return 0;
        }

        // 날짜 차이 계산 (밀리초를 일로 변환)
        const diffTime = endDateObj - startDateObj;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // 시작일 포함

        return diffDays;
    };

    useEffect(() => {
        const days = calculateTrainingDays(startDate, endDate);
        setTrainingDays(days);
    }, [startDate, endDate]);

    const fetchCourse = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/course`);
        // console.log(response.data.items);
        setCourses(response.data.items);
    }
    const [courses, setCourses] = useState([]);
    const [filteredCourse, setFilteredCourse] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [courseNameInput, setCourseNameInput] = useState('');

    const getInitialConsonant = (char) => {
        // char가 유효하지 않은 경우 빈 문자열 반환
        if (!char || typeof char !== 'string' || char.length === 0) {
            return '';
        }
        const code = char.charCodeAt(0);
        if (code >= 0xAC00 && code <= 0xD7A3) {
            const initial = (code - 0xAC00) / 28 / 21;
            const initials = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
            return initials[Math.floor(initial)];
        }
        return char;
    };

    const getInitials = (str) => {
        if (!str || typeof str !== 'string') {
            return '';
        }
        return str.split('').map(char => getInitialConsonant(char)).join('');
    };

    const matchesSearch = (text, searchTerm) => {
        // 입력값이 유효하지 않은 경우 false 반환
        if (!text || typeof text !== 'string' || !searchTerm || typeof searchTerm !== 'string') {
            return false;
        }

        const lowerText = text.toLowerCase();
        const lowerSearch = searchTerm.toLowerCase();

        // 1) 일반 문자열 검색(가장 정확)
        if (lowerText.includes(lowerSearch)) {
            return true;
        }

        // 2) 검색어가 "초성만"으로 이루어진 경우만 초성 검색 허용
        const isSearchInitialsOnly = /^[ㄱ-ㅎ]+$/.test(searchTerm);

        if (isSearchInitialsOnly) {
            const textInitials = getInitials(text);

            // 2-1) 전체 초성 매칭
            if (textInitials.includes(searchTerm)) {
                return true;
            }

            // 2-2) 첫 글자 초성만 매칭
            if (text.length > 0) {
                const firstInitial = getInitialConsonant(text[0]);
                if (firstInitial === searchTerm[0]) {
                    return true;
                }
            }
        }
        return false;
    };

    const [myClasses, setMyClasses] = useState([]);
    const fetchMyClasses = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/partner/${partnerId}/classes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(response => {
            console.log(response.data.items);
            setMyClasses(response.data.items);
        }).catch(error => {
            console.log(error);
        });
    }
    const fetchAssistant = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/models`, {
        }).then(response => {
            console.log(response.data.items);
            setAssistant(response.data.items);
        }).catch(error => {
            console.log(error);
        });
    }


    useEffect(() => {
        fetchMyClasses();
        fetchCourse();
        fetchAssistant();
    }, []);

    // 과정명 자동완성 필터링
    useEffect(() => {
        if (!courseNameInput || courseNameInput.trim() === '') {
            setFilteredCourse([]);
            setShowSuggestions(false);
            return;
        }

        if (!courses || courses.length === 0) {
            setFilteredCourse([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = courses.filter(course => {
            if (!course || !course.title) return false;
            return matchesSearch(course.title, courseNameInput);
        });
        setFilteredCourse(filtered);
        setShowSuggestions(filtered.length > 0);
        setSelectedIndex(-1);
    }, [courseNameInput, courses]);

    const handleCourseNameChange = (e) => {
        const value = e.target.value;
        setCourseNameInput(value);
        // 입력값이 변경되면 선택된 course_id 초기화
        setSelectedCourseId(null);
    };

    const handleCourseNameSelect = (course) => {
        const courseName = course.title || course;
        setCourseNameInput(courseName);
        // course 객체인 경우 id 저장
        if (course && course.id) {
            setSelectedCourseId(course.id);
        }
        setShowSuggestions(false);
        setSelectedIndex(-1);

        // 폼의 courseName 필드도 업데이트
        const form = document.getElementById('createClassForm');
        if (form) {
            const courseNameInput = form.querySelector('[name="courseName"]');
            if (courseNameInput) {
                courseNameInput.value = courseName;
            }
        }
    };

    const handleCourseNameKeyDown = (e) => {
        if (!showSuggestions || filteredCourse.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredCourse.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredCourse.length) {
                    handleCourseNameSelect(filteredCourse[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };



    const [Assistant, setAssistant] = useState([
        { id: 1, provider: "openai", modality: "chat", model_name: "gpt-4o-mini" },
        { id: 2, provider: "google", modality: "chat", model_name: "gemini-2.5-flash" },
        { id: 3, provider: "lg", modality: "chat", model_name: "exaone-4.0" },
        { id: 4, provider: "anthropic", modality: "chat", model_name: "claude-3-haiku" },
    ]);



    return (
        <>
            <div className={`modal ${showCourseCreatedModal ? 'modal--active' : ''}`} id="courseCreatedModal">
                <div className="modal__content" style={{ maxWidth: '600px' }}>
                    <div className="modal__header">
                        <h2 className="modal__title">🎉 강의가 성공적으로 생성되었습니다!</h2>
                        <button className="modal__close" onClick={() => setShowCourseCreatedModal(false)}>✕</button>
                    </div>

                    <div className="modal__body">
                        <div className="alert alert--success" style={{ marginBottom: '24px' }}>
                            <div className="alert__content">
                                <div className="alert__title">학생 초대 준비 완료</div>
                                <div className="alert__message">아래 정보를 학생들에게 공유해주세요</div>
                            </div>
                        </div>


                        <div
                            style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '20px' }}>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                생성된 강의
                            </div>
                            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: '12px' }}
                                id="createdCourseName">
                                {newClass?.name}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: 'var(--text-sm)' }}>
                                <div>
                                    <span style={{ color: 'var(--text-secondary)' }}>📅 교육 기간:</span>
                                    <span style={{ fontWeight: 'var(--font-semibold)', marginLeft: '4px' }}
                                        id="createdCourseDates">{trainingDays}일</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-secondary)' }}>👥 예상 학생:</span>
                                    <span style={{ fontWeight: 'var(--font-semibold)', marginLeft: '4px' }}
                                        id="createdStudentCount">{newClass?.capacity}명</span>
                                </div>
                            </div>
                        </div>


                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>
                                📋 초대 코드
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="text" id="generatedInviteCode" value={newClass?.invite_codes?.[0]?.code ?? ""} readOnly style={{
                                    flex: 1, padding: '12px 16px', border: '2px solid var(--primary-300)',
                                    borderRadius: 'var(--radius-md)', fontSize: '18px', fontWeight: 'bold',
                                    textAlign: 'center', background: 'var(--primary-50)', color: 'var(--primary-700)',
                                    fontFamily: 'var(--font-mono)', letterSpacing: '2px'
                                }} />
                                <button className="btn btn--primary" style={{ minWidth: '80px' }}>
                                    복사
                                </button>
                            </div>
                        </div>


                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>
                                🔗 초대 링크
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="text" id="generatedInviteUrl" value="https://growfit.com/join?code=GF2K4M" readOnly
                                    style={{
                                        flex: 1, padding: '12px 16px', border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)',
                                        background: 'var(--gray-50)'
                                    }} />
                                <button className="btn btn--outline" style={{ minWidth: '80px' }}>
                                    복사
                                </button>
                            </div>
                        </div>


                        {/* <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: '12px' }}>
                                💰 예상 비용 정보
                            </div>
                            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>플랫폼 사용료</span>
                                    <span style={{ fontWeight: 'var(--font-semibold)' }} id="createdPlatformFee">100,000원</span>
                                </div>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>API 사용료 (예상)</span>
                                    <span style={{ fontWeight: 'var(--font-semibold)' }} id="createdAPIFee">213,200원</span>
                                </div>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-base)', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                                    <span style={{ fontWeight: 'var(--font-bold)' }}>총 예상 비용</span>
                                    <span
                                        style={{ fontWeight: 'var(--font-bold)', color: 'var(--primary-600)', fontSize: 'var(--text-lg)' }}
                                        id="createdTotalCost">313,200원</span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="modal__footer">
                        {/* <button className="btn btn--outline">
                            📄 초대 정보 다운로드
                        </button> */}
                        <button className="btn btn--primary" type="button" onClick={() => {
                            setShowCourseCreatedModal(false);
                            fetchMyClasses();
                            setStartDate('');
                            setEndDate('');
                            setTrainingDays(0);
                            setCourseNameInput('');
                            setShowSuggestions(false);
                            setError(null);
                            setSelectedCourseId(null);
                        }}>
                            확인
                        </button>
                    </div>
                </div>
            </div>

            <div id="createProjectModal" className={`modal ${showModal ? 'modal--active' : ''}`}>
                <div className="modal__content modal__content--large">
                    <div className="modal__header">
                        <h2 className="modal__title">신규강의 정보</h2>
                        <button className="modal__close" onClick={() => {
                            setShowModal(false);
                            setStartDate('');
                            setEndDate('');
                            setTrainingDays(0);
                            setCourseNameInput('');
                            setShowSuggestions(false);
                            setError(null);
                            setSelectedCourseId(null);
                        }}>✕</button>
                    </div>
                    <div className="modal__body">
                        <form id="createClassForm" onSubmit={handleCreateClass}>
                            <div className="form-section">
                                <h3 className="form-section-title">기본 정보</h3>
                                <div className="form-group">
                                    <label htmlFor="ClassName">강의명 <span className="required">*</span></label>
                                    <input type="text" id="ClassName" name="ClassName" placeholder="Rag 구축" required />
                                </div>
                                <div className="form-group" style={{ position: 'relative' }}>
                                    <label htmlFor="courseName">과정명 <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="courseName"
                                        name="courseName"
                                        placeholder="AI 기초과정 (선택사항)"
                                        value={courseNameInput}
                                        onChange={handleCourseNameChange}
                                        onKeyDown={handleCourseNameKeyDown}
                                        onFocus={() => {
                                            if (filteredCourse.length > 0) {
                                                setShowSuggestions(true);
                                            }
                                        }}
                                        onBlur={() => {
                                            setTimeout(() => {
                                                setShowSuggestions(false);
                                            }, 200);
                                        }}
                                    />
                                    {showSuggestions && filteredCourse.length > 0 && (
                                        <div className="autocomplete-dropdown">
                                            {filteredCourse.map((course, index) => (
                                                <div
                                                    key={course.id || index}
                                                    className={`autocomplete-item ${index === selectedIndex ? 'autocomplete-item--selected' : ''}`}
                                                    onClick={() => handleCourseNameSelect(course)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                >
                                                    {course.title}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="form-section-title">사용할 LLM 모델</h3>
                                <div className="llm-selection">
                                    {Assistant?.map((assistant) => (
                                        <label className="llm-checkbox" key={assistant.id}>
                                            <input type="checkbox" name="llm" value={assistant.id} />
                                            <div className="llm-card">
                                                {/* <div className="llm-icon">🟢</div> */}
                                                {/* <div className="llm-icon">{assistant.provider}</div> */}
                                                <div className="llm-info">
                                                    <div className="llm-name">{assistant.model_name}</div>
                                                </div>
                                                <div className="llm-checkmark">✓</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            <div className="form-section">
                                <h3 className="form-section-title">교육 설정</h3>
                                <div className="form-group">
                                    <label htmlFor="studentCount">수강 학생 수 <span className="required">*</span></label>
                                    <input type="number" id="studentCount" name="studentCount" placeholder="20" min="1" required />
                                </div>
                                <div className="form-group form-group--inline">
                                    <div>
                                        <label htmlFor="startDate">교육 시작일 <span className="required">*</span></label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="endDate">교육 종료일 <span className="required">*</span></label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            min={startDate || ''}
                                            required
                                        />
                                    </div>
                                </div>
                                {trainingDays > 0 && (
                                    <div className="training-days-info" id="trainingDaysInfo">
                                        <span className="training-days-text">총 교육 기간: <strong id="trainingDays">{trainingDays}</strong>일</span>
                                    </div>
                                )}
                            </div>


                            <div className="form-section">
                                <h3 className="form-section-title"> 강의 설명 (선택)</h3>
                                <div className="form-group">
                                    <textarea id="ClassDescription" name="ClassDescription" placeholder="강의에 대한 간단한 설명을 입력하세요..." rows="3"></textarea>
                                </div>
                            </div>

                            {/* 에러 메시지 표시 */}
                            {error && (
                                <div className="alert alert--error" style={{ marginTop: '16px' }}>
                                    <div className="alert__content">
                                        <div className="alert__title">오류</div>
                                        <div className="alert__message">{error}</div>
                                    </div>
                                </div>
                            )}


                            {/* <div className="cost-estimate-section">
                                <h3 className="cost-estimate-title">💰 예상 비용 계산</h3>
                                <div className="cost-breakdown">
                                    <div className="cost-row">
                                        <span className="cost-label">
                                            <span className="cost-icon">💳</span>
                                            플랫폼 사용료
                                        </span>
                                        <span className="cost-value" id="costPlatformFee">0원</span>
                                    </div>
                                    <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × <span
                                        id="platformFeeStudents">0</span>명</p>

                                    <div className="cost-divider"></div>

                                    <div className="cost-row">
                                        <span className="cost-label">
                                            <span className="cost-icon">🤖</span>
                                            API 사용료 (예상)
                                        </span>
                                        <span className="cost-value" id="costAPIFee">0원</span>
                                    </div>
                                    <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × <span
                                        id="apiFeeTrainingDays">0</span>일 (70% 사용률 가정)</p>

                                    <div className="cost-divider"></div>

                                    <div className="cost-row cost-row--total">
                                        <span className="cost-label">
                                            <span className="cost-icon">💰</span>
                                            총 예상 비용
                                        </span>
                                        <span className="cost-value cost-value--total" id="costTotalCost">0원</span>
                                    </div>
                                </div>

                                <div className="cost-details">
                                    <div className="cost-detail-item">
                                        <span className="cost-detail-label">선택된 LLM</span>
                                        <span className="cost-detail-value" id="selectedLLMCount">3개</span>
                                    </div>
                                    <div className="cost-detail-item">
                                        <span className="cost-detail-label">예상 토큰 사용량</span>
                                        <span className="cost-detail-value" id="estimatedTokens">0 tokens</span>
                                    </div>
                                    <div className="cost-detail-item">
                                        <span className="cost-detail-label">1인당 일평균 실습</span>
                                        <span className="cost-detail-value">100회</span>
                                    </div>
                                </div>

                                <div className="cost-warning">
                                    <span className="cost-warning-icon">⚠️</span>
                                    <span className="cost-warning-text">API 사용료는 실제 사용량에 따라 변동될 수 있습니다</span>
                                </div>
                            </div> */}
                        </form>
                    </div>
                    <div className="modal__footer">
                        <button
                            className="btn btn--outline"
                            onClick={() => {
                                setShowModal(false);
                                setStartDate('');
                                setEndDate('');
                                setTrainingDays(0);
                                setCourseNameInput('');
                                setShowSuggestions(false);
                                setError(null);
                                setSelectedCourseId(null);
                            }}
                            disabled={isLoading}
                        >
                            취소
                        </button>
                        <button
                            className="btn btn--primary"
                            type="submit"
                            form="createClassForm"
                            disabled={isLoading}
                        >
                            {isLoading ? '생성 중...' : '강의 생성'}
                        </button>
                    </div>
                </div>
            </div>

            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />

                    <main className="main">
                        <div className="main__content">

                            {/* <div className="page-header">
                                <h1 className="page-title">📁 강의 관리</h1>
                                <p className="page-subtitle">교육 프로젝트 생성 및 관리</p>
                            </div> */}


                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
                                <button className="btn btn--primary" onClick={() => setShowModal(true)}>
                                    <span>신규 강의 생성</span>
                                </button>
                            </div>


                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--primary">📁</div>
                                    </div>
                                    <div className="stat-card__label">전체 강의</div>
                                    <div className="stat-card__value">3개</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--success">🚀</div>
                                    </div>
                                    <div className="stat-card__label">진행 중</div>
                                    <div className="stat-card__value">3개</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--secondary">✅</div>
                                    </div>
                                    <div className="stat-card__label">종료됨</div>
                                    <div className="stat-card__value">0개</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--warning">👥</div>
                                    </div>
                                    <div className="stat-card__label">총 학생 수</div>
                                    <div className="stat-card__value">127명</div>
                                </div>
                            </div>


                            <div className="projects-grid">

                                {myClasses.map((myclass) => (
                                    <div className="project-card" data-project-id="proj-1" data-status="active" key={myclass.id}>
                                        <div className="project-card__header">

                                            <div className="project-card__status project-card__status--active">
                                                <span className="status-dot"></span>
                                                {myclass.status}
                                            </div>
                                        </div>

                                        <h3 className="project-card__title">{myclass.name}</h3>

                                        <div className="project-card__meta">
                                            <div className="project-card__meta-item">
                                                <span>💰</span>
                                                <span>20,000,000원</span>
                                            </div>
                                            <div className="project-card__meta-item">
                                                <span>👥</span>
                                                <span>{myclass.capacity}명</span>
                                            </div>
                                        </div>
                                        <div className="project-card__meta">
                                            <div className="project-card__meta-item">
                                                <span>📅</span>
                                                <span>{myclass.start_at.split('T')[0]} ~ {myclass.end_at.split('T')[0]}</span>
                                            </div>
                                            <div className="project-card__meta-item">
                                                <span>⏰</span>
                                                <span>
                                                    {(() => {
                                                        const daysLeft = Math.floor((new Date(myclass.end_at) - new Date()) / (1000 * 60 * 60 * 24));
                                                        return daysLeft < 0 ? '종료' : `D-${daysLeft} 남음`;
                                                    })()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* <div className="project-settlement">
                                            <div className="settlement-row">
                                                <span className="settlement-label">

                                                    플랫폼 사용료
                                                </span>
                                                <span className="settlement-value">100,000원</span>
                                            </div>
                                            <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × 20명</p>

                                            <div className="cost-divider"></div>

                                            <div className="settlement-row">
                                                <span className="settlement-label">

                                                    API 사용료 (예상)
                                                </span>
                                                <span className="settlement-value">1,200,000원</span>
                                            </div>
                                            <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × 59일 (70% 사용률 가정)
                                            </p>

                                            <div className="cost-divider"></div>

                                            <div className="settlement-row settlement-row--total">
                                                <span className="settlement-label">

                                                    총 예상 비용
                                                </span>
                                                <span className="settlement-value">1,300,000원</span>
                                            </div>
                                        </div> */}

                                        <div className="project-card__actions">
                                            <button className="project-action-btn project-action-btn--primary"
                                                onClick={() => alert(myclass.invite_codes[0].code)}
                                            >
                                                코드확인
                                            </button>
                                            <button className="project-action-btn"
                                                // onClick={() => navigate(`/partner/project-management/${myclass.id}`)}
                                                onClick={() => alert('학생관리')}
                                            >
                                                학생관리
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </main>



                </div>
            </div>

        </>
    )
}