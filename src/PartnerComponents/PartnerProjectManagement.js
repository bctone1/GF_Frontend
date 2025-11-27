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
    const courseId = 1;

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

            // 다중 선택 값 가져오기 (LLM 체크박스)
            const selectedLLMs = formData.getAll('llm');

            // 유효성 검사
            if (!className) {
                throw new Error('강의명을 입력해주세요.');
            }
            if (!courseName) {
                throw new Error('과정명을 입력해주세요.');
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
                // LLM 정보도 함께 전송 (필요한 경우)
                llms: selectedLLMs
            };

            console.log('전송할 데이터:', requestData);

            // axios를 사용한 POST 요청
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/partner/${partnerId}/course/${courseId}/classes`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('응답 데이터:', response.data);
            setNewClass(response.data);

            // 성공 시 모달 표시
            setShowCourseCreatedModal(true);
            setShowModal(false);

            // 폼 초기화
            e.target.reset();
            setStartDate('');
            setEndDate('');

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

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    

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
                                <input type="text" id="generatedInviteCode" value={newClass?.invite_codes?.[0]?.code} readOnly style={{
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


                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
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
                        </div>
                    </div>

                    <div className="modal__footer">
                        {/* <button className="btn btn--outline">
                            📄 초대 정보 다운로드
                        </button> */}
                        <button className="btn btn--primary" type="button" onClick={() => setShowCourseCreatedModal(false)}>
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
                                <div className="form-group">
                                    <label htmlFor="courseName">과정명 <span className="required">*</span></label>
                                    <input type="text" id="courseName" name="courseName" placeholder="AI 기초과정" required />
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="form-section-title">사용할 LLM 모델</h3>
                                <div className="llm-selection">
                                    <label className="llm-checkbox">
                                        <input type="checkbox" name="llm" value="chatgpt" />
                                        <div className="llm-card">
                                            <div className="llm-icon">🟢</div>
                                            <div className="llm-info">
                                                <div className="llm-name">ChatGPT-4</div>
                                            </div>
                                            <div className="llm-checkmark">✓</div>
                                        </div>
                                    </label>
                                    <label className="llm-checkbox">
                                        <input type="checkbox" name="llm" value="claude" />
                                        <div className="llm-card">
                                            <div className="llm-icon">🟣</div>
                                            <div className="llm-info">
                                                <div className="llm-name">Claude 3.5</div>
                                            </div>
                                            <div className="llm-checkmark">✓</div>
                                        </div>
                                    </label>
                                    <label className="llm-checkbox">
                                        <input type="checkbox" name="llm" value="gemini" />
                                        <div className="llm-card">
                                            <div className="llm-icon">🔵</div>
                                            <div className="llm-info">
                                                <div className="llm-name">Gemini Pro</div>
                                            </div>
                                            <div className="llm-checkmark">✓</div>
                                        </div>
                                    </label>
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
                                setError(null);
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

                                <div className="project-card" data-project-id="proj-1" data-status="active">
                                    <div className="project-card__header">

                                        <div className="project-card__status project-card__status--active">
                                            <span className="status-dot"></span>
                                            진행 중
                                        </div>
                                    </div>

                                    <h3 className="project-card__title">2025 AI 기초과정</h3>

                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>💰</span>
                                            <span>20,000,000원</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>👥</span>
                                            <span>20명</span>
                                        </div>
                                    </div>
                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>📅</span>
                                            <span>2025-01-01 ~ 2025-02-28</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>⏰</span>
                                            <span>D-15 남음</span>
                                        </div>
                                    </div>

                                    <div className="project-settlement">
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
                                    </div>

                                    <div className="project-card__actions">
                                        <button className="project-action-btn project-action-btn--primary">
                                            코드확인
                                        </button>
                                        <button className="project-action-btn" >
                                            학생관리
                                        </button>
                                    </div>
                                </div>


                                <div className="project-card" data-project-id="proj-2" data-status="active">
                                    <div className="project-card__header">

                                        <div className="project-card__status project-card__status--active">
                                            <span className="status-dot"></span>
                                            진행 중
                                        </div>
                                    </div>

                                    <h3 className="project-card__title">2025 AI 심화과정</h3>

                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>💰</span>
                                            <span>15,000,000원</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>👥</span>
                                            <span>15명</span>
                                        </div>
                                    </div>
                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>📅</span>
                                            <span>2025-01-15 ~ 2025-03-15</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>⏰</span>
                                            <span>D-48 남음</span>
                                        </div>
                                    </div>

                                    <div className="project-settlement">
                                        <div className="settlement-row">
                                            <span className="settlement-label">

                                                플랫폼 사용료
                                            </span>
                                            <span className="settlement-value">75,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × 15명</p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row">
                                            <span className="settlement-label">
                                                API 사용료 (예상)
                                            </span>
                                            <span className="settlement-value">850,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × 60일 (70% 사용률 가정)
                                        </p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row settlement-row--total">
                                            <span className="settlement-label">

                                                총 예상 비용
                                            </span>
                                            <span className="settlement-value">925,000원</span>
                                        </div>
                                    </div>

                                    <div className="project-card__actions">
                                        <button className="project-action-btn project-action-btn--primary">
                                            코드확인
                                        </button>
                                        <button className="project-action-btn" >
                                            학생관리
                                        </button>
                                    </div>
                                </div>


                                <div className="project-card" data-project-id="proj-3" data-status="active">
                                    <div className="project-card__header">

                                        <div className="project-card__status project-card__status--active">
                                            <span className="status-dot"></span>
                                            진행 중
                                        </div>
                                    </div>

                                    <h3 className="project-card__title">프롬프트 엔지니어링</h3>

                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>💰</span>
                                            <span>25,000,000원</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>👥</span>
                                            <span>30명</span>
                                        </div>
                                    </div>
                                    <div className="project-card__meta">
                                        <div className="project-card__meta-item">
                                            <span>📅</span>
                                            <span>2025-02-01 ~ 2025-04-30</span>
                                        </div>
                                        <div className="project-card__meta-item">
                                            <span>⏰</span>
                                            <span>D-95 남음</span>
                                        </div>
                                    </div>

                                    <div className="project-settlement">
                                        <div className="settlement-row">
                                            <span className="settlement-label">

                                                플랫폼 사용료
                                            </span>
                                            <span className="settlement-value">150,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 5,000원 × 30명</p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row">
                                            <span className="settlement-label">

                                                API 사용료 (예상)
                                            </span>
                                            <span className="settlement-value">1,890,000원</span>
                                        </div>
                                        <p className="form-hint" style={{ margin: '4px 0 12px 30px' }}>학생당 일평균 100회 실습 × 89일 (70% 사용률 가정)
                                        </p>

                                        <div className="cost-divider"></div>

                                        <div className="settlement-row settlement-row--total">
                                            <span className="settlement-label">

                                                총 예상 비용
                                            </span>
                                            <span className="settlement-value">2,040,000원</span>
                                        </div>
                                    </div>

                                    <div className="project-card__actions">
                                        <button className="project-action-btn project-action-btn--primary">
                                            코드확인
                                        </button>
                                        <button className="project-action-btn" >
                                            학생관리
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>



                </div>
            </div>

        </>
    )
}