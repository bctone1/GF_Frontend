import React from 'react';

export default function EnrolledClassesSection({ classArray, onInviteClick }) {
    return (
        <div id="enrolled-section" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">수강 중인 강의</h2>
            <p className="user-settings-section__desc">현재 수강 중인 강의 목록을 관리하세요</p>
            <div className="enrolled-classes-section">
                <div className="enrolled-classes-header">
                    <div className="enrolled-classes-title">내 강의 목록</div>
                    <button className="btn-add-class" onClick={onInviteClick}>
                        <span>+</span>
                        <span>새 강의 등록</span>
                    </button>
                </div>

                <div id="classList" className="class-list">
                    {classArray.map((classInfo) => {
                        const isActive = classInfo.enrollment_status === 'active';
                        const statusBadge = isActive ? (
                            <span className="class-card__badge class-card__badge--active">진행 중</span>
                        ) : (
                            <span className="class-card__badge class-card__badge--ended">종료됨</span>
                        );

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
                                    <button className="class-card__action-btn">
                                        실습하기
                                    </button>

                                    <button className="class-card__action-btn class-card__action-btn--danger">
                                        삭제
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

