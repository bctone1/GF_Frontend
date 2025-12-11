import React from 'react';
import { showToast } from '../../utill/utill';
import { useNavigate } from 'react-router-dom';

export default function EnrolledClassesSection({ classArray, onInviteClick, onClassSelect, onDeleteClass }) {
    const navigate = useNavigate();

    const handlePracticeClick = (daysUntilStart, daysLeft, classInfo) => {
        console.log(classInfo);
        if (daysUntilStart > 0) {
            showToast(`강의가 아직 시작하지 않았습니다.`, 'error');
        } else if (daysLeft < 0) {
            showToast(`강의가 종료되었습니다.`, 'error');
        } else {
            // 클래스 선택 핸들러 호출
            if (onClassSelect) {
                onClassSelect(classInfo.class_id);
            }
            navigate(`/user/practice/`);
        }
    }



    return (
        <div id="enrolled-section" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">수강 중인 강의</h2>
            <p className="user-settings-section__desc">현재 수강 중인 강의 목록을 관리하세요</p>
            <div className="enrolled-classes-section">
                <div className="enrolled-classes-header">
                    <div className="enrolled-classes-title"></div>
                    <button className="btn-add-class" onClick={onInviteClick}>
                        <span>+</span>
                        <span>새 강의 등록</span>
                    </button>
                </div>

                {classArray.length === 0 ? (
                    <div className="enrollment-guide">
                        <div className="enrollment-guide__header">
                            <div className="enrollment-guide__icon">📚</div>
                            <h3 className="enrollment-guide__title">등록된 강의가 없습니다</h3>
                            <p className="enrollment-guide__subtitle">아래 단계를 따라 강의를 등록해보세요</p>
                        </div>

                        <div className="enrollment-steps">
                            <div className="enrollment-step enrollment-step--highlight">
                                <div className="enrollment-step__number">1</div>
                                <div className="enrollment-step__content">
                                    <div className="enrollment-step__title">새 강의 등록 버튼 클릭</div>
                                    <div className="enrollment-step__desc">오른쪽 상단의 "새 강의 등록" 버튼을 클릭하세요</div>
                                </div>
                                <div className="enrollment-step__arrow">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="enrollment-step">
                                <div className="enrollment-step__number">2</div>
                                <div className="enrollment-step__content">
                                    <div className="enrollment-step__title">초대 코드 입력</div>
                                    <div className="enrollment-step__desc">강사로부터 받은 초대 코드를 입력하세요</div>
                                </div>
                                <div className="enrollment-step__arrow">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="enrollment-step">
                                <div className="enrollment-step__number">3</div>
                                <div className="enrollment-step__content">
                                    <div className="enrollment-step__title">강의 등록 완료</div>
                                    <div className="enrollment-step__desc">등록된 강의에서 실습을 시작할 수 있습니다</div>
                                </div>
                            </div>
                        </div>

                        <div className="enrollment-guide__button-wrapper">
                            <button className="btn-add-class btn-add-class--guide" onClick={onInviteClick}>
                                <span>+</span>
                                <span>새 강의 등록</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div id="classList" className="class-list">
                        {classArray.map((classInfo) => {
                            const now = new Date();
                            const startDate = new Date(classInfo.class_start_at);
                            const endDate = new Date(classInfo.class_end_at);

                            const daysUntilStart = Math.floor(
                                (startDate - now) / (1000 * 60 * 60 * 24) + 1
                            );
                            const daysLeft = Math.floor(
                                (endDate - now) / (1000 * 60 * 60 * 24) + 1
                            );

                            let statusBadge;
                            let isDisabled = false;

                            if (daysUntilStart > 0) {
                                // 예정
                                statusBadge = <span className="class-card__badge class-card__badge--scheduled">예정</span>;
                                isDisabled = true;
                            } else if (daysLeft < 0) {
                                // 종료됨
                                statusBadge = <span className="class-card__badge class-card__badge--ended">종료됨</span>;
                                isDisabled = true;
                            } else {
                                // 진행 중
                                statusBadge = <span className="class-card__badge class-card__badge--active">진행 중</span>;
                                isDisabled = false;
                            }

                            return (
                                <div className="class-card" key={classInfo.class_id}>
                                    <div className="class-card__header">
                                        {classInfo.course_title}
                                        {statusBadge}
                                    </div>

                                    <h3 className="class-card__title">{classInfo.class_title}</h3>

                                    <div className="class-card__info">
                                        <div className="class-card__info-item">
                                            <span className="class-card__info-icon">👨‍🏫</span>
                                            <span>{classInfo.teacher_name}</span>
                                        </div>

                                        <div className="class-card__info-item">
                                            <span className="class-card__info-icon">📅</span>
                                            <span>{classInfo.class_start_at.split('T')[0]} ~ {classInfo.class_end_at.split('T')[0]}</span>
                                        </div>
                                    </div>

                                    <div className="class-card__actions">
                                        <button
                                            className={`class-card__action-btn ${isDisabled ? 'class-card__action-btn--ended' : ''}`}
                                            onClick={() => handlePracticeClick(daysUntilStart, daysLeft, classInfo)}
                                            disabled={isDisabled}
                                        >
                                            실습하기
                                        </button>

                                        <button className="class-card__action-btn class-card__action-btn--danger"

                                            onClick={() => onDeleteClass(classInfo.enrollment_id)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

