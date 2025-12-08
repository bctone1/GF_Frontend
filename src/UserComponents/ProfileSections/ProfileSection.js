import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { showToast } from '../../utill/utill';

export default function ProfileSection({ myprofile, myaccount, onProfileUpdate }) {
    const [profileData, setProfileData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // myprofile이 변경될 때 profileData 초기화
    useEffect(() => {
        if (myprofile) {
            setProfileData({
                full_name: myprofile.full_name || '',
                job_title: myprofile.job_title || '',
                bio: myprofile.bio || '',
                phone_number: myprofile.phone_number || '',
                department: myprofile.department || ''
            });
            setHasChanges(false);
        }
    }, [myprofile]);

    // 필드 값 변경 핸들러
    const handleFieldChange = useCallback((field, value) => {
        setProfileData(prev => {
            if (!prev) return prev;
            const updated = { ...prev, [field]: value };
            // 변경사항 확인
            const changed = myprofile && (
                updated.full_name !== (myprofile.full_name || '') ||
                updated.job_title !== (myprofile.job_title || '') ||
                updated.bio !== (myprofile.bio || '') ||
                updated.phone_number !== (myprofile.phone_number || '') ||
                updated.department !== (myprofile.department || '')
            );
            setHasChanges(changed);
            return updated;
        });
    }, [myprofile]);

    const UpdateProfile = async () => {
        if (!profileData || !hasChanges) {
            showToast('변경된 내용이 없습니다.', 'info');
            return;
        }

        if (isSubmitting) return;
        console.log(profileData);

        setIsSubmitting(true);
        const accessToken = sessionStorage.getItem("access_token");

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}/user/my/profile`,
                profileData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            showToast('프로필이 성공적으로 업데이트되었습니다.', 'success');
            setHasChanges(false);

            // 프로필 데이터 새로고침을 위해 콜백 호출
            if (onProfileUpdate) {
                onProfileUpdate(response.data);
            }
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            const errorMessage = error.response?.data?.message || '프로필 업데이트에 실패했습니다.';
            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        if (myprofile) {
            setProfileData({
                full_name: myprofile.full_name || '',
                job_title: myprofile.job_title || '',
                bio: myprofile.bio || '',
                phone_number: myprofile.phone_number || '',
                department: myprofile.department || ''
            });
            setHasChanges(false);
        }
    };

    return (
        <div id="profileSection" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">프로필 설정</h2>
            <p className="user-settings-section__desc">개인 정보를 관리하고 업데이트하세요</p>

            <div className="setting-group">
                <h3 className="setting-group__title">프로필 사진</h3>
                <div className="profile-avatar">
                    <div className="profile-avatar__image">{myprofile?.full_name?.charAt(0)}</div>
                    <div className="profile-avatar__actions">
                        <button className="btn btn--sm btn--outline" onClick={() => { alert("준비중입니다."); }}>
                            사진 변경
                        </button>
                        <button className="btn btn--sm btn--outline" onClick={() => { alert("준비중입니다."); }}>
                            사진 제거
                        </button>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">기본 정보</h3>
                <p className="setting-group__desc">기본적인 계정 정보를 관리합니다</p>

                <div className="form-group">
                    <label className="form-label">이름</label>
                    <input
                        type="text"
                        className="form-input"
                        id="userName"
                        value={profileData?.full_name || ''}
                        onChange={(e) => handleFieldChange('full_name', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">이메일</label>
                    <input type="email" className="form-input" id="userEmail" value={myaccount?.email || ''} disabled />
                    <div className="form-hint">이메일은 관리자만 변경할 수 있습니다</div>
                </div>

                <div className="form-group">
                    <label className="form-label">직급/직책</label>
                    <input
                        type="text"
                        className="form-input"
                        id="userRole"
                        value={profileData?.job_title || ''}
                        onChange={(e) => handleFieldChange('job_title', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">소개</label>
                    <textarea
                        className="form-textarea"
                        id="userBio"
                        placeholder="자기소개를 입력하세요"
                        value={profileData?.bio || ''}
                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">연락처 정보</h3>
                <p className="setting-group__desc">추가 연락 방법을 설정하세요</p>

                <div className="form-group">
                    <label className="form-label">전화번호</label>
                    <input
                        type="tel"
                        className="form-input"
                        id="userPhone"
                        value={profileData?.phone_number || ''}
                        onChange={(e) => handleFieldChange('phone_number', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">부서</label>
                    <input
                        type="text"
                        className="form-input"
                        id="userDepartment"
                        value={profileData?.department || ''}
                        onChange={(e) => handleFieldChange('department', e.target.value)}
                    />
                </div>
            </div>

            <div className="action-buttons">
                <button
                    className="btn btn--outline"
                    onClick={handleReset}
                    disabled={isSubmitting || !hasChanges}
                >
                    취소
                </button>
                <button
                    className="btn btn--primary"
                    style={{ background: 'var(--employee-primary)' }}
                    onClick={UpdateProfile}
                    disabled={isSubmitting || !hasChanges || !profileData}
                >
                    {isSubmitting ? '저장 중...' : '✓ 변경사항 저장'}
                </button>
            </div>
        </div>
    );
}

