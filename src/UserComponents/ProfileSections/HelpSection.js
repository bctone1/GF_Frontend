import React, { useState } from 'react';

export default function HelpSection() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqItems = [
        {
            question: 'AI 에이전트는 어떻게 만드나요?',
            answer: '"내 에이전트" 메뉴에서 새 에이전트를 만들 수 있습니다. 시스템 프롬프트를 작성하고 예제를 추가하면 나만의 AI 에이전트가 완성됩니다.'
        },
        {
            question: '대화 기록은 어디서 볼 수 있나요?',
            answer: '"내 기록" 메뉴에서 모든 AI 대화 기록을 확인할 수 있습니다. 날짜별, 에이전트별로 필터링도 가능합니다.'
        },
        {
            question: '파일 업로드 용량 제한이 있나요?',
            answer: '파일당 최대 50MB까지 업로드 가능하며, 총 저장 공간은 10GB입니다. 필요시 관리자에게 용량 증설을 요청할 수 있습니다.'
        },
        {
            question: '프로젝트를 팀원과 공유할 수 있나요?',
            answer: '네, 프로젝트 상세 페이지에서 "공유" 버튼을 클릭하여 팀원을 초대할 수 있습니다. 읽기 전용 또는 편집 권한을 부여할 수 있습니다.'
        }
    ];

    return (
        <div id="helpSection" className="user-settings-section user-settings-section--active">
            <h2 className="user-settings-section__title">도움말 및 지원</h2>
            <p className="user-settings-section__desc">필요한 도움을 받으세요</p>

            <div className="setting-group">
                <h3 className="setting-group__title">빠른 시작 가이드</h3>
                <p className="setting-group__desc">GrowFit을 시작하는 방법을 배우세요</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                    <div 
                        style={{ 
                            background: 'var(--surface)', 
                            padding: 'var(--space-4)', 
                            borderRadius: 'var(--radius-lg)', 
                            cursor: 'pointer', 
                            transition: 'all 0.2s' 
                        }} 
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--border)'; }} 
                        onMouseOut={(e) => { e.currentTarget.style.background = 'var(--surface)'; }} 
                        onClick={() => {}}
                    >
                        <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🚀</div>
                        <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>시작하기</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>기본 기능 사용법</div>
                    </div>

                    <div 
                        style={{ 
                            background: 'var(--surface)', 
                            padding: 'var(--space-4)', 
                            borderRadius: 'var(--radius-lg)', 
                            cursor: 'pointer', 
                            transition: 'all 0.2s' 
                        }} 
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--border)'; }} 
                        onMouseOut={(e) => { e.currentTarget.style.background = 'var(--surface)'; }} 
                        onClick={() => {}}
                    >
                        <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>💬</div>
                        <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>AI 실습</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>효과적인 AI 활용법</div>
                    </div>

                    <div 
                        style={{ 
                            background: 'var(--surface)', 
                            padding: 'var(--space-4)', 
                            borderRadius: 'var(--radius-lg)', 
                            cursor: 'pointer', 
                            transition: 'all 0.2s' 
                        }} 
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--border)'; }} 
                        onMouseOut={(e) => { e.currentTarget.style.background = 'var(--surface)'; }} 
                        onClick={() => {}}
                    >
                        <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🤖</div>
                        <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>에이전트 만들기</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>맞춤 AI 생성 가이드</div>
                    </div>

                    <div 
                        style={{ 
                            background: 'var(--surface)', 
                            padding: 'var(--space-4)', 
                            borderRadius: 'var(--radius-lg)', 
                            cursor: 'pointer', 
                            transition: 'all 0.2s' 
                        }} 
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--border)'; }} 
                        onMouseOut={(e) => { e.currentTarget.style.background = 'var(--surface)'; }} 
                        onClick={() => {}}
                    >
                        <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>📂</div>
                        <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>프로젝트 관리</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>효율적인 작업 관리</div>
                    </div>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">자주 묻는 질문</h3>
                <p className="setting-group__desc">일반적인 질문과 답변입니다</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {faqItems.map((item, index) => (
                        <div key={index}>
                            <div 
                                className="setting-item" 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="setting-item__info">
                                    <div className="setting-item__label">{item.question}</div>
                                </div>
                                <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>
                                    {openFAQ === index ? '▲' : '▼'}
                                </div>
                            </div>
                            {openFAQ === index && (
                                <div style={{ 
                                    padding: 'var(--space-3)', 
                                    background: 'var(--surface)', 
                                    borderRadius: 'var(--radius-md)', 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'var(--text-secondary)', 
                                    lineHeight: 1.6,
                                    marginTop: 'var(--space-2)'
                                }}>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 'var(--space-4)' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        전체 FAQ 보기 →
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">지원 요청</h3>
                <p className="setting-group__desc">문제가 해결되지 않으면 문의하세요</p>

                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} onClick={() => { }}>
                        💬 채팅 지원
                    </button>
                    <button className="btn btn--outline" onClick={() => { }}>
                        ✉️ 이메일 문의
                    </button>
                    <button className="btn btn--outline" onClick={() => { }}>
                        🐛 버그 신고
                    </button>
                    <button className="btn btn--outline" onClick={() => { }}>
                        💡 기능 제안
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3 className="setting-group__title">시스템 정보</h3>

                <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                        <div>버전</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-semibold)' }}>v1.2.5</div>

                        <div>브라우저</div>
                        <div style={{ color: 'var(--text-primary)' }}>Chrome 120.0.0</div>

                        <div>운영체제</div>
                        <div style={{ color: 'var(--text-primary)' }}>Windows 11</div>

                        <div>마지막 업데이트</div>
                        <div style={{ color: 'var(--text-primary)' }}>2025년 1월 8일</div>
                    </div>
                </div>

                <div style={{ marginTop: 'var(--space-3)' }}>
                    <button className="btn btn--outline" onClick={() => { }}>
                        🔄 업데이트 확인
                    </button>
                </div>
            </div>
        </div>
    );
}

