import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import { useState } from 'react';

export default function UserAgent() {
    const agents = [
        {
            id: 1,
            name: '코딩 튜터',
            role: '시니어 개발자',
            usage: 23,
            lastUsed: null,
            isActive: true,
            description: 'Python, JavaScript 등 프로그래밍 언어를 가르치는 친절한 튜터입니다.',
            systemPrompt: '[역할 (Role)] 당신의 역할은 프로그래밍을 배우는 학생들에게 개념을 명확하고 이해하기 쉽게 설명하는 것입니다. [전문성 (Expertise)] - Python, JavaScript, Java 등 주요 프로그래밍 언어 - 알고리즘과 자료구조 - 코드 디버깅 및 최적화 - 베스트 프랙티스 및 설계 패턴 [톤 & 스타일 (Tone)] - 친근하고 격려하는 톤 - 복잡한 개념을 단순하게 설명 - 비유와 예시를 적극 활용 - 학생의 이해도를 확인하며 진행 [제약 조건 (Constraints)] - 코드 예제는 항목 주석과 함께 제공 - 단계별로 설명하여 이해를 돕기 - 학생이 스스로 생각할 수 있도록 힌트 제공 - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내',
        },
        {
            id: 2,
            name: '콘텐츠 작가',
            role: '카피라이터',
            usage: 45,
            lastUsed: '2시간 전',
            isActive: false,
            description: '콘텐츠 제작을 도와주는 에이전트입니다.',
            systemPrompt: '[역할 (Role)] 당신의 역할은 콘텐츠 작가입니다. [전문성 (Expertise)] - 카피라이터 - 콘텐츠 작가 [톤 & 스타일 (Tone)] - 친근하고 격려하는 톤 - 복잡한 개념을 단순하게 설명 - 비유와 예시를 적극 활용 - 학생의 이해도를 확인하며 진행 [제약 조건 (Constraints)] - 코드 예제는 항목 주석과 함께 제공 - 단계별로 설명하여 이해를 돕기 - 학생이 스스로 생각할 수 있도록 힌트 제공 - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내',
        },
        {
            id: 3,
            name: '데이터 분석가',
            role: '데이터 사이언티스트',
            usage: 12,
            lastUsed: '어제',
            isActive: false,
            description: '데이터 분석을 도와주는 에이전트입니다.',
            systemPrompt: '[역할 (Role)] 당신의 역할은 데이터 분석가입니다. [전문성 (Expertise)] - 데이터 사이언티스트 - 데이터 분석가 [톤 & 스타일 (Tone)] - 친근하고 격려하는 톤 - 복잡한 개념을 단순하게 설명 - 비유와 예시를 적극 활용 - 학생의 이해도를 확인하며 진행 [제약 조건 (Constraints)] - 코드 예제는 항목 주석과 함께 제공 - 단계별로 설명하여 이해를 돕기 - 학생이 스스로 생각할 수 있도록 힌트 제공 - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내',
        },
        {
            id: 4,
            name: '전문 번역가',
            role: '다국어 전문가',
            usage: 8,
            lastUsed: '3일 전',
            isActive: false,
            description: '전문 번역을 도와주는 에이전트입니다.',
            systemPrompt: '[역할 (Role)] 당신의 역할은 전문 번역가입니다. [전문성 (Expertise)] - 다국어 전문가 - 전문 번역가 [톤 & 스타일 (Tone)] - 친근하고 격려하는 톤 - 복잡한 개념을 단순하게 설명 - 비유와 예시를 적극 활용 - 학생의 이해도를 확인하며 진행 [제약 조건 (Constraints)] - 코드 예제는 항목 주석과 함께 제공 - 단계별로 설명하여 이해를 돕기 - 학생이 스스로 생각할 수 있도록 힌트 제공 - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내',
        },
        {
            id: 5,
            name: '회의록 작성자',
            role: '비즈니스 어시스턴트',
            usage: 31,
            lastUsed: '1시간 전',
            isActive: false,
            description: '회의록 작성을 도와주는 에이전트입니다.',
            systemPrompt: '[역할 (Role)] 당신의 역할은 회의록 작성자입니다. [전문성 (Expertise)] - 비즈니스 어시스턴트 - 회의록 작성자 [톤 & 스타일 (Tone)] - 친근하고 격려하는 톤 - 복잡한 개념을 단순하게 설명 - 비유와 예시를 적극 활용 - 학생의 이해도를 확인하며 진행 [제약 조건 (Constraints)] - 코드 예제는 항목 주석과 함께 제공 - 단계별로 설명하여 이해를 돕기 - 학생이 스스로 생각할 수 있도록 힌트 제공 - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내',
        }
    ];

    const [selectedAgent, setSelectedAgent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
    }

    // 검색어에 따라 에이전트 필터링
    const filteredAgents = agents.filter((agent) => {
        const query = searchQuery.toLowerCase();
        return (
            agent.name.toLowerCase().includes(query) ||
            agent.role.toLowerCase().includes(query) ||
            (agent.description && agent.description.toLowerCase().includes(query))
        );
    });

    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="agents-layout">

                            <div className="agents-sidebar">

                                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="agentSearch"
                                        placeholder="에이전트 검색..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ padding: 'var(--space-2) var(--space-3)' }}
                                    />
                                </div>


                                <div id="myAgentsList" className="agents-list">
                                    {filteredAgents.length > 0 ? (
                                        filteredAgents.map((agent) => (
                                            <div
                                                key={agent.id}
                                                className={`agent-item ${selectedAgent?.id === agent.id ? 'agent-item--active' : ''}`}
                                                onClick={() => handleAgentClick(agent)}
                                            >
                                                <div className="agent-item__header">
                                                    <div className="agent-item__info">
                                                        <div className="agent-item__name">{agent.name}</div>
                                                        <div className="agent-item__role">{agent.role}</div>
                                                    </div>
                                                </div>
                                                <div className="agent-item__meta">
                                                    <span>사용 {agent.usage}회</span>
                                                    {agent.isActive ? (
                                                        <span className="user-agent-badge">활성</span>
                                                    ) : (
                                                        <span>{agent.lastUsed}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ padding: 'var(--space-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            검색 결과가 없습니다.
                                        </div>
                                    )}
                                </div>

                            </div>


                            <div className="agent-builder">
                                <div className="builder-content">

                                    <div className="builder-section">
                                        <h3 className="builder-section__title">1️⃣ 기본 정보</h3>
                                        <p className="builder-section__description">에이전트의 이름과 역할을 설정하세요</p>

                                        <div className="form-group">
                                            <label className="form-label">
                                                에이전트 이름
                                                <span className="form-label__required">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                id="agentName"
                                                placeholder="예: 코딩 튜터, 마케팅 전문가, 데이터 분석가"
                                                value={selectedAgent?.name}
                                                onChange={(e) => setSelectedAgent({ ...selectedAgent, name: e.target.value })}
                                            />
                                            <div className="form-hint">명확하고 직관적인 이름을 사용하세요</div>
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">간단한 설명 (선택사항)</label>
                                            <textarea
                                                className="form-input form-textarea--auto"
                                                id="agentDescription"
                                                placeholder="이 에이전트가 어떤 일을 하는지 간단히 설명하세요"
                                                rows="2"
                                                style={{ minHeight: '60px', resize: 'none' }}
                                                value={selectedAgent?.description}
                                                onChange={(e) => setSelectedAgent({ ...selectedAgent, description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>


                                    <div className="builder-section">
                                        <h3 className="builder-section__title">2️⃣ 시스템 프롬프트 (System Prompt)</h3>
                                        <p className="builder-section__description">에이전트의 역할, 전문성, 톤&매너를 정의하세요</p>


                                        <div className="form-group">
                                            <label className="form-label">
                                                시스템 프롬프트
                                                <span className="form-label__required">*</span>
                                            </label>
                                            <div className="prompt-editor">
                                                <textarea
                                                    id="systemPrompt"
                                                    placeholder="시스템 프롬프트를 입력하세요..."
                                                    value={selectedAgent?.systemPrompt}
                                                    onChange={(e) => setSelectedAgent({ ...selectedAgent, systemPrompt: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-hint">
                                                💡 팁: 구체적이고 명확하게 작성할수록 에이전트가 더 일관성 있게 동작합니다
                                            </div>
                                        </div>
                                    </div>


                                    <div className="test-section">
                                        <div className="test-header">
                                            <h3 className="test-title">3️⃣ 테스트해보기</h3>
                                            <button className="btn btn--sm btn--outline" >
                                                초기화
                                            </button>
                                        </div>

                                        <p className="builder-section__description">작성한 프롬프트가 잘 작동하는지 간단히 테스트해보세요</p>
                                        <div className="test-input-group">
                                            <input
                                                type="text"
                                                className="form-input"
                                                id="testInput"
                                                placeholder="테스트 질문을 입력하세요..."
                                                style={{ flex: 1 }}
                                            />
                                            <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} >
                                                테스트 실행
                                            </button>
                                        </div>

                                        <div id="testOutput" className="test-output">
                                            <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                                                테스트 질문을 입력하고 "테스트 실행"을 클릭하세요
                                            </div>
                                        </div>
                                    </div>


                                </div>


                                <div className="builder-footer">
                                    <div className="builder-status">
                                        <span id="saveStatus" style={{ color: 'var(--text-secondary)' }}>
                                            마지막 저장: 2분 전
                                        </span>
                                    </div>
                                    <div className="builder-actions">
                                        <button className="btn btn--outline" >
                                            취소
                                        </button>
                                        <button className="btn btn--outline" >
                                            💾 임시저장
                                        </button>
                                        <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} >
                                            ✓ 저장 및 활성화
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