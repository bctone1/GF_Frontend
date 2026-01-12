import UserSidebar2026 from './UserSidebar2026';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { getSelectedClassId } from '../utill/utill';

export default function UserAgent() {
    const accessToken = sessionStorage.getItem("access_token");
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());
    const [showMyTemplate, setShowMyTemplate] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [showDetailView, setShowDetailView] = useState(false);
    const [templates, setTemplates] = useState([]);

    const fetchTemplates = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/prompts/shared?class_id=${savedClassId}&active_only=true`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('Templates:', response.data);
            setTemplates(response.data);

        } catch (error) {
            console.log(error);
        }
    }, [accessToken]);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const [currentTemplate, setCurrentTemplate] = useState({
        name: '',
        card_color: '',
        role_description: '',
        system_prompt: '',
    });
    const TemplateClick = (template) => {
        setShowDetailView(true);
        setCurrentTemplate(template);
        // console.log(template);
    }

    const platformTemplate = [
        {
            name: '코딩 튜터',
            card_color: 'agent-card--blue',
            role_description: 'Python, JavaScript 등 프로그래밍 언어를 친절하게 가르치는 튜터 에이전트입니다.',
            system_prompt: `[역할 (Role)]
        당신은 10년 경력의 시니어 개발자이자 프로그래밍 교육 전문가입니다.
        학생들에게 프로그래밍 개념을 명확하고 이해하기 쉽게 설명하는 것이 당신의 역할입니다.
        
        [전문성 (Expertise)]
        - Python, JavaScript, Java 등 주요 프로그래밍 언어
        - 알고리즘과 자료구조
        - 코드 디버깅 및 최적화
        - 베스트 프랙티스 및 설계 패턴
        
        [톤 & 스타일 (Tone)]
        - 친근하고 격려하는 톤
        - 복잡한 개념을 단순하게 설명
        - 비유와 예시를 적극 활용
        - 학생의 이해도를 확인하며 진행
        
        [제약 조건 (Constraints)]
        - 코드 예제는 항상 주석과 함께 제공
        - 단계별로 설명하여 이해를 돕기
        - 학생이 스스로 생각할 수 있도록 힌트 제공
        - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내`
        }
        ,
        {
            name: '콘텐츠 작가',
            card_color: 'agent-card--pink',
            role_description: '블로그, 마케팅 문구 등 다양한 콘텐츠를 작성하는 전문 작가 에이전트입니다.',
            system_prompt: `[역할 (Role)]
당신은 10년 경력의 전문 카피라이터이자 콘텐츠 마케터입니다.
다양한 형식의 매력적인 콘텐츠를 작성하는 것이 당신의 역할입니다.

[전문성 (Expertise)]
- 블로그 포스트 및 아티클 작성
- SNS 콘텐츠 및 광고 카피
- 이메일 마케팅 문구
- SEO 최적화 콘텐츠

[톤 & 스타일 (Tone)]
- 독자의 관심을 끄는 후킹 문구 사용
- 브랜드 톤에 맞는 일관된 스타일
- 간결하면서도 설득력 있는 문체
- 타겟 독자층에 맞춤화된 언어

[제약 조건 (Constraints)]
- 과장된 표현이나 허위 정보 금지
- 저작권 침해 콘텐츠 생성 금지
- 요청된 형식과 길이 준수
- 명확한 CTA(Call to Action) 포함`,
        },
        {
            name: '전문 번역가',
            card_color: 'agent-card--green',
            role_description: '영어, 일본어, 중국어 등 다국어 번역을 전문으로 하는 번역가 에이전트입니다.',
            system_prompt: `[역할 (Role)]
당신은 다국어 전문 번역가입니다.
원문의 의미와 뉘앙스를 정확하게 전달하면서 자연스러운 번역을 제공합니다.

[전문성 (Expertise)]
- 영어 ↔ 한국어 번역
- 일본어 ↔ 한국어 번역
- 중국어 ↔ 한국어 번역
- 비즈니스, 기술, 마케팅 문서 전문

[톤 & 스타일 (Tone)]
- 원문의 톤과 스타일 유지
- 문화적 맥락을 고려한 자연스러운 표현
- 전문 용어의 정확한 번역
- 가독성 높은 문장 구조

[제약 조건 (Constraints)]
- 원문의 의미 왜곡 금지
- 불확실한 번역은 대안 제시
- 고유명사는 원어 병기
- 문화적으로 부적절한 표현 수정 제안`
        }
    ]



    return (
        <>
            <div className={`agent-modal-overlay ${showTemplateModal ? 'agent-modal-overlay--open' : ''}`}>
                <div className="agent-modal">
                    <div className="modal__header">
                        <h2 className="modal__title">템플릿 생성</h2>
                        <button className="modal__close"
                            onClick={() => setShowTemplateModal(false)}
                        >
                            <svg className="icon" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__body">
                        {/* Guide Box  */}
                        <div className="guide-box">
                            <div className="guide-box__title">
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                프롬프트 작성 가이드
                            </div>
                            <div className="guide-box__list">
                                <div className="guide-box__item">
                                    <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>[역할]</strong> AI가 어떤 전문가인지 정의하세요</span>
                                </div>
                                <div className="guide-box__item">
                                    <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>[전문성]</strong> 담당 영역과 능력을 나열하세요</span>
                                </div>
                                <div className="guide-box__item">
                                    <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>[톤 & 스타일]</strong> 응답 방식과 말투를 지정하세요</span>
                                </div>
                                <div className="guide-box__item">
                                    <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>[제약 조건]</strong> 하지 말아야 할 것들을 명시하세요</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group form-group--color">
                                <label className="form-label">색상</label>
                                <div className="color-picker">
                                    <button type="button" className="color-picker__item color-picker__item--active" data-color="purple" style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="blue" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="teal" style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="green" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="orange" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="pink" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="red" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}></button>
                                    <button type="button" className="color-picker__item" data-color="indigo" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}></button>
                                </div>
                            </div>
                            <div className="form-group form-group--name">
                                <label className="form-label">템플릿 이름<span className="form-label__required">*</span></label>
                                <input type="text" className="form-input" placeholder="예: 코딩 튜터, 마케팅 전문가" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">간단한 설명</label>
                            <input type="text" className="form-input" placeholder="템플릿이 어떤 일을 하는지 간단히 설명하세요" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                시스템 프롬프트
                                <span className="form-label__required">*</span>
                            </label>
                            <textarea
                                className="form-input form-textarea form-textarea--code"
                                placeholder={`[역할 (Role)]
당신은 ...

[전문성 (Expertise)]
- ...

[톤 & 스타일 (Tone)]
- ...

[제약 조건 (Constraints)]
- ...`}
                            />

                            <div className="form-hint">구체적이고 명확하게 작성할수록 모델이 더 일관성 있게 동작합니다</div>
                        </div>
                    </div>
                    <div className="modal__footer">
                        <button className="btn btn--outline" onClick={() => setShowTemplateModal(false)}>취소</button>
                        <button className="btn btn--primary">
                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            저장
                        </button>
                    </div>
                </div>
            </div>

            <div className="app">
                <UserSidebar2026 />
                <main className="main">
                    <div className="agent-content">


                        {/* Main View  */}
                        <div id="mainView" style={{ display: showDetailView ? 'none' : 'block' }}>
                            {/* Tabs */}
                            <div className="agent-tabs-wrapper">
                                <div className="agent-tabs">
                                    <button className={`agent-tab ${showMyTemplate ? '' : 'agent-tab--active'}`}
                                        onClick={() => setShowMyTemplate(false)}
                                    >
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        </svg>
                                        학습 템플릿
                                        <span className="agent-tab__count">5</span>
                                    </button>
                                    <button className={`agent-tab ${showMyTemplate ? 'agent-tab--active' : ''}`}
                                        onClick={() => setShowMyTemplate(true)}
                                    >
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                                            <circle cx="12" cy="5" r="3"></circle>
                                        </svg>
                                        내 템플릿
                                        <span className="agent-tab__count">2</span>
                                    </button>
                                </div>

                                <button className="btn btn--primary"
                                    onClick={() => setShowTemplateModal(true)}
                                    style={{ display: showMyTemplate ? 'block' : 'none' }}
                                >
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    템플릿 생성
                                </button>
                            </div>

                            {/* Stats Bar */}
                            <div className="stats-bar" style={{ display: showMyTemplate ? 'flex' : 'none' }}>
                                <div className="stats-bar__item">
                                    <div className="stats-bar__icon stats-bar__icon--total">
                                        <svg className="icon" viewBox="0 0 24 24">
                                            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                                            <circle cx="12" cy="5" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div className="stats-bar__info">
                                        <span className="stats-bar__value" id="statTotal">2</span>
                                        <span className="stats-bar__label">전체 템플릿</span>
                                    </div>
                                </div>
                                <div className="stats-bar__item">
                                    <div className="stats-bar__icon stats-bar__icon--active">
                                        <svg className="icon" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                    </div>
                                    <div className="stats-bar__info">
                                        <span className="stats-bar__value">1</span>
                                        <span className="stats-bar__label">활성</span>
                                    </div>
                                </div>
                                <div className="stats-bar__item">
                                    <div className="stats-bar__icon" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>
                                        <svg className="icon" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                                        </svg>
                                    </div>
                                    <div className="stats-bar__info">
                                        <span className="stats-bar__value">1</span>
                                        <span className="stats-bar__label">비활성</span>
                                    </div>
                                </div>
                            </div>

                            {/* Toolbar */}
                            <div className="template-toolbar">
                                <div className="template-search-box">
                                    <svg className="icon icon--sm template-search-box__icon" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    <input type="text" className="template-search-box__input" placeholder="템플릿 검색..." />
                                </div>

                                <div className="filter-dropdown" id="statusFilter" >
                                    <button className="filter-dropdown__btn" >
                                        <span id="statusLabel">전체 상태</span>
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </button>
                                    <div className="filter-dropdown__menu" id="statusMenu">
                                        <div className="filter-dropdown__item selected" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            전체 상태
                                        </div>
                                        <div className="filter-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            활성
                                        </div>
                                        <div className="filter-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            비활성
                                        </div>
                                    </div>
                                </div>

                                <div className="filter-dropdown" id="sortFilter">
                                    <button className="filter-dropdown__btn" >
                                        <span id="sortLabel">최근 생성순</span>
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </button>
                                    <div className="filter-dropdown__menu" id="sortMenu">
                                        <div className="filter-dropdown__item selected" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            최근 생성순
                                        </div>
                                        <div className="filter-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            오래된순
                                        </div>
                                        <div className="filter-dropdown__item" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            이름순
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Template Grid */}
                            <div id="templateGrid"
                                style={{ display: showMyTemplate ? 'none' : 'block' }}
                            >
                                {/* 플랫폼 템플릿 섹션 */}
                                <div className="template-section">
                                    <div className="section-header">
                                        <h3 className="section-header__title">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                            </svg>
                                            플랫폼 템플릿
                                        </h3>
                                    </div>
                                    <div className="agent-grid">

                                        {platformTemplate.map((template, index) => {
                                            return (
                                                <div key={index} className={`agent-card agent-card--template ${template.card_color}`}
                                                    onClick={() => TemplateClick(template)}
                                                >
                                                    <div className="agent-card__header">
                                                        <div className="agent-card__name">
                                                            {template.name}
                                                            <span className="agent-card__badge agent-card__badge--template">템플릿</span>
                                                        </div>
                                                        <div className="agent-card__desc">{template.role_description}</div>
                                                    </div>
                                                    <div className="agent-card__footer-hint">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        클릭하여 프롬프트 구조 분석하기
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* 강사 공유 템플릿 섹션 */}
                                <div className="template-section template-section--instructor">
                                    <div className="section-header">
                                        <h3 className="section-header__title">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="9" cy="7" r="4"></circle>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                            강사 공유 템플릿
                                        </h3>
                                    </div>
                                    <div className="agent-grid">

                                        {templates.map((template) => {
                                            // console.log(template);
                                            return (
                                                <div className="agent-card agent-card--template agent-card--orange" key={template.agent_id}
                                                    onClick={() => TemplateClick(template)}
                                                >
                                                    <div className="agent-card__header">
                                                        <div className="agent-card__name">
                                                            {template.name}
                                                            <span className="agent-card__badge agent-card__badge--instructor">강사</span>
                                                        </div>
                                                        <div className="agent-card__desc">{template.role_description}</div>
                                                    </div>
                                                    <div className="agent-card__footer-hint">
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                        클릭하여 프롬프트 구조 분석하기
                                                    </div>
                                                </div>
                                            )
                                        })}


                                        {/* <div className="agent-card agent-card--template agent-card--orange" >
                                            <div className="agent-card__header">
                                                <div className="agent-card__name">
                                                    마케팅 분석가
                                                    <span className="agent-card__badge agent-card__badge--instructor">강사</span>
                                                </div>
                                                <div className="agent-card__desc">마케팅 데이터를 분석하고 캠페인 전략을 제안하는 분석 전문 템플릿입니다.</div>
                                            </div>
                                            <div className="agent-card__footer-hint">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                클릭하여 프롬프트 구조 분석하기
                                            </div>
                                        </div>

                                        <div className="agent-card agent-card--template agent-card--indigo" >
                                            <div className="agent-card__header">
                                                <div className="agent-card__name">
                                                    고객 응대 봇
                                                    <span className="agent-card__badge agent-card__badge--instructor">강사</span>
                                                </div>
                                                <div className="agent-card__desc">친절하고 전문적으로 고객 문의에 응대하는 CS 전문 템플릿입니다.</div>
                                            </div>
                                            <div className="agent-card__footer-hint">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                클릭하여 프롬프트 구조 분석하기
                                            </div>
                                        </div> */}


                                    </div>
                                </div>
                            </div>

                            {/* My Agent Grid (Hidden by default) */}
                            <div className="agent-grid"
                                style={{ display: showMyTemplate ? 'grid' : 'none' }}
                            >
                                <div className="agent-card agent-card--purple">
                                    <div className="agent-card__toggle">
                                        <label className="toggle-switch">
                                            <input type="checkbox" />
                                            <span className="toggle-switch__slider"></span>
                                        </label>
                                    </div>
                                    <div className="agent-card__header">
                                        <div className="agent-card__name">
                                            나만의 코딩 도우미
                                            <span className="agent-card__badge agent-card__badge--active">활성</span>
                                        </div>
                                        <div className="agent-card__desc">코딩 튜터를 기반으로 커스터마이징한 나만의 프로그래밍 학습 도우미입니다.</div>
                                    </div>
                                    <div className="agent-card__meta">
                                        <div className="agent-card__stat">
                                            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                            2025.01.15 생성
                                        </div>
                                    </div>
                                    <div className="agent-card__actions">
                                        <button className="agent-card__btn agent-card__btn--outline" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                            수정
                                        </button>
                                        <button className="agent-card__btn agent-card__btn--danger" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            삭제
                                        </button>
                                    </div>
                                </div>

                                <div className="agent-card agent-card--teal agent-card--inactive">
                                    <div className="agent-card__toggle">
                                        <label className="toggle-switch">
                                            <input type="checkbox" />
                                            <span className="toggle-switch__slider"></span>
                                        </label>
                                    </div>
                                    <div className="agent-card__header">
                                        <div className="agent-card__name">
                                            이메일 작성 도우미
                                            <span className="agent-card__badge agent-card__badge--inactive">비활성</span>
                                        </div>
                                        <div className="agent-card__desc">비즈니스 이메일을 전문적이고 정중하게 작성해주는 도우미입니다.</div>
                                    </div>
                                    <div className="agent-card__meta">
                                        <div className="agent-card__stat">
                                            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                            2025.01.10 생성
                                        </div>
                                    </div>
                                    <div className="agent-card__actions">
                                        <button className="agent-card__btn agent-card__btn--outline" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                            수정
                                        </button>
                                        <button className="agent-card__btn agent-card__btn--danger" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="pagination" id="pagination" >
                                <button className="pagination__btn" disabled="">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    이전
                                </button>
                                <div className="pagination__pages">
                                    <button className="pagination__page pagination__page--active">1</button>
                                    <button className="pagination__page">2</button>
                                    <button className="pagination__page">3</button>
                                </div>
                                <button className="pagination__btn">
                                    다음
                                    <svg className="icon icon--sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>

                        {/* Template Detail View */}
                        <div className={`template-detail ${showDetailView ? 'template-detail--active' : ''}`}>
                            <div className="detail-back"
                                onClick={() => setShowDetailView(false)}
                            >
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                목록으로 돌아가기
                            </div>

                            <div className="detail-card">
                                <div className="detail-header">
                                    <div className="detail-info">
                                        <h2 className="detail-title">
                                            {currentTemplate.name}
                                            <span className="agent-card__badge agent-card__badge--template">템플릿</span>
                                        </h2>
                                        <p className="detail-desc">{currentTemplate.role_description}</p>
                                    </div>
                                    <div className="detail-actions">
                                        <button className="btn btn--primary" >
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            이 템플릿으로 내 템플릿 만들기
                                        </button>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h3 className="detail-section__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                        시스템 프롬프트 분석
                                    </h3>
                                    <div className="detail-section__content">
                                        {currentTemplate.system_prompt}
                                    </div>

                                </div>

                                <div className="detail-section">
                                    <h3 className="detail-section__title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                        학습 포인트
                                    </h3>
                                    <div className="guide-box" style={{ margin: '0' }}>
                                        <div className="guide-box__list">
                                            <div className="guide-box__item">
                                                <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                <span><strong>역할 명시:</strong> AI가 어떤 전문가인지 구체적으로 정의합니다</span>
                                            </div>
                                            <div className="guide-box__item">
                                                <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                <span><strong>전문성 나열:</strong> 담당할 수 있는 영역을 명확히 합니다</span>
                                            </div>
                                            <div className="guide-box__item">
                                                <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                <span><strong>톤 지정:</strong> 응답의 분위기와 말투를 설정합니다</span>
                                            </div>
                                            <div className="guide-box__item">
                                                <svg className="icon icon--sm guide-box__item-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                <span><strong>제약 조건:</strong> 하지 말아야 할 것들을 명시합니다</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}