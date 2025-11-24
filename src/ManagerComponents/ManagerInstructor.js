import axios from 'axios';
import { useState, useEffect } from 'react';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';
import { showToast } from '../utill/utill';

export default function ManagerInstructor() {
    const [activeTab, setActiveTab] = useState('courses');

    const handleTabClick = (tab) => {
        showToast('교육과정 관리 탭이 클릭되었습니다', 'info');
        setActiveTab(tab);
    };
    const [partnerList, setPartnerList] = useState([]);

    const getPartnerList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/supervisor/core/promotions/partner-requests?status=pending`)
            .then(response => {
                console.log(response.data);
                setPartnerList(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getPartnerList();
    }, []);

    const handleApprove = (request_id) => {
        axios.post(`${process.env.REACT_APP_API_URL}/supervisor/core/promotions/partner-requests/${request_id}/approve`, {
            target_role: 'partner'
        })
            .then(response => {
                console.log(response.data);
                showToast('승인되었습니다', 'success');
                getPartnerList();
            }).catch(error => {
                console.log(error);
                showToast('승인에 실패했습니다', 'error');
            });
    }

    return (
        <>
            <div id="app">
                <ManagerHeader />
                <div className="container">
                    <ManagerSidebar />


                    <main className="main">
                        <div className="main__content">

                            <div className="page-header">
                                <div className="page-header__left">
                                    <h1>교육 파트너 관리</h1>
                                    <p>교육 파트너의 과정과 회원 가입 승인을 관리합니다</p>
                                </div>
                                <div className="page-header__actions">
                                    <button className="btn btn--outline" >
                                        🔄 새로고침
                                    </button>
                                </div>
                            </div>


                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-card__label">
                                        <span className="stat-card__icon">👨‍🏫</span>
                                        <span>전체 파트너</span>
                                    </div>
                                    <div className="stat-card__value">28명</div>
                                    <span className="stat-card__change stat-card__change--up">▲ 3명 증가</span>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__label">
                                        <span className="stat-card__icon">📚</span>
                                        <span>진행 중 과정</span>
                                    </div>
                                    <div className="stat-card__value">45개</div>
                                    <span className="stat-card__change stat-card__change--up">▲ 5개 증가</span>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__label">
                                        <span className="stat-card__icon">⏳</span>
                                        <span>승인 대기</span>
                                    </div>
                                    <div className="stat-card__value">7명</div>
                                    <span className="stat-card__change stat-card__change--down">▼ 2명 감소</span>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__label">
                                        <span className="stat-card__icon">👥</span>
                                        <span>전체 학습자</span>
                                    </div>
                                    <div className="stat-card__value">1,247명</div>
                                    <span className="stat-card__change stat-card__change--up">▲ 89명 증가</span>
                                </div>
                            </div>


                            <div className="tabs">
                                <button
                                    className={`tab ${activeTab === 'courses' ? 'tab--active' : ''}`}
                                    onClick={() => handleTabClick('courses')}
                                >
                                    교육과정 관리
                                    <span className="tab__badge">45</span>
                                </button>
                                <button
                                    className={`tab ${activeTab === 'approvals' ? 'tab--active' : ''}`}
                                    onClick={() => handleTabClick('approvals')}
                                >
                                    승인 대기
                                    <span className="tab__badge">7</span>
                                </button>
                            </div>


                            <div id="courses-tab" className={`tab-content ${activeTab === 'courses' ? 'tab-content--active' : ''}`}>
                                <div className="course-list">

                                    <div className="course-item">
                                        <div className="course-item__header">
                                            <h3 className="course-item__title">2025 AI 기초과정</h3>
                                            <span className="course-item__badge course-item__badge--active">진행 중</span>
                                        </div>
                                        <div className="course-item__info">
                                            <div className="course-item__meta">
                                                <strong>담당 강사:</strong> 김철수
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>수강 인원:</strong> 24명
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>기간:</strong> 2025.10.01 ~ 2025.12.31
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>소속:</strong> 삼성전자
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-item">
                                        <div className="course-item__header">
                                            <h3 className="course-item__title">2025 AI 기초과정</h3>
                                            <span className="course-item__badge course-item__badge--active">진행 중</span>
                                        </div>
                                        <div className="course-item__info">
                                            <div className="course-item__meta">
                                                <strong>담당 강사:</strong> 이영희
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>수강 인원:</strong> 18명
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>기간:</strong> 2025.10.05 ~ 2025.12.20
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>소속:</strong> 삼성전자
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-item">
                                        <div className="course-item__header">
                                            <h3 className="course-item__title">2025 AI 심화과정</h3>
                                            <span className="course-item__badge course-item__badge--active">진행 중</span>
                                        </div>
                                        <div className="course-item__info">
                                            <div className="course-item__meta">
                                                <strong>담당 강사:</strong> 박민수
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>수강 인원:</strong> 15명
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>기간:</strong> 2025.09.28 ~ 2025.11.30
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>소속:</strong> LG전자
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-item">
                                        <div className="course-item__header">
                                            <h3 className="course-item__title">2025 AI 기초과정</h3>
                                            <span className="course-item__badge course-item__badge--active">진행 중</span>
                                        </div>
                                        <div className="course-item__info">
                                            <div className="course-item__meta">
                                                <strong>담당 강사:</strong> 최지훈
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>수강 인원:</strong> 22명
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>기간:</strong> 2025.10.03 ~ 2025.12.15
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>소속:</strong> 삼성전자
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-item">
                                        <div className="course-item__header">
                                            <h3 className="course-item__title">프롬프트 엔지니어링</h3>
                                            <span className="course-item__badge course-item__badge--active">진행 중</span>
                                        </div>
                                        <div className="course-item__info">
                                            <div className="course-item__meta">
                                                <strong>담당 강사:</strong> 정수민
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>수강 인원:</strong> 30명
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>기간:</strong> 2025.10.07 ~ 2025.12.28
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>소속:</strong> 현대자동차
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-item">
                                        <div className="course-item__header">
                                            <h3 className="course-item__title">2025 AI 기초과정</h3>
                                            <span className="course-item__badge course-item__badge--inactive">종료</span>
                                        </div>
                                        <div className="course-item__info">
                                            <div className="course-item__meta">
                                                <strong>담당 강사:</strong> 강유학
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>수강 인원:</strong> 20명
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>기간:</strong> 2025.08.01 ~ 2025.10.05
                                            </div>
                                            <div className="course-item__meta">
                                                <strong>소속:</strong> 삼성전자
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div id="approvals-tab" className={`tab-content ${activeTab === 'approvals' ? 'tab-content--active' : ''}`}>
                                <div className="approval-list" style={{ minHeight: '500px' }}>

                                    {partnerList.map((partner) => (
                                        <div className="approval-item">
                                            <div className="approval-item__left">
                                                <div className="approval-item__avatar">{partner.name.charAt(0)}</div>
                                                <div className="approval-item__info">
                                                    <div className="approval-item__name">{partner.name}</div>
                                                    <div className="approval-item__email">{partner.email}</div>
                                                    <div className="approval-item__org">신청 조직: {partner.org_name} | 신청일: {partner.requested_at.split('T')[0]}</div>
                                                </div>
                                            </div>
                                            <div className="approval-item__actions">
                                                <button className="btn btn--success"
                                                    onClick={() => handleApprove(partner.request_id)}
                                                >
                                                    ✓ 승인
                                                </button>
                                                <button className="btn btn--danger" >
                                                    ✗ 거절
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </main>




                </div>
            </div>

        </>
    )
}