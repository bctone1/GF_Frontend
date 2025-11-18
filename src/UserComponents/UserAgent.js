import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

export default function UserAgent() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="agents-layout">

                            <div className="agents-sidebar">
                                <div className="agents-sidebar__header">
                                    <h2 className="agents-sidebar__title">🤖 내 에이전트</h2>
                                </div>


                                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="agentSearch"
                                        placeholder="에이전트 검색..."
                                        oninput="filterAgents(this.value)"
                                        style={{ padding: 'var(--space-2) var(--space-3)' }}
                                    />
                                </div>


                                <div id="myAgentsList" className="agents-list">
                                    <div className="agent-item agent-item--active" >
                                        <div className="agent-item__header">
                                            <div className="agent-item__info">
                                                <div className="agent-item__name">코딩 튜터</div>
                                                <div className="agent-item__role">시니어 개발자</div>
                                            </div>
                                        </div>
                                        <div className="agent-item__meta">
                                            <span>사용 23회</span>
                                            <span className="agent-badge">활성</span>
                                        </div>
                                    </div>

                                    <div className="agent-item" >
                                        <div className="agent-item__header">
                                            <div className="agent-item__info">
                                                <div className="agent-item__name">콘텐츠 작가</div>
                                                <div className="agent-item__role">카피라이터</div>
                                            </div>
                                        </div>
                                        <div className="agent-item__meta">
                                            <span>사용 45회</span>
                                            <span>2시간 전</span>
                                        </div>
                                    </div>

                                    <div className="agent-item" >
                                        <div className="agent-item__header">
                                            <div className="agent-item__info">
                                                <div className="agent-item__name">데이터 분석가</div>
                                                <div className="agent-item__role">데이터 사이언티스트</div>
                                            </div>
                                        </div>
                                        <div className="agent-item__meta">
                                            <span>사용 12회</span>
                                            <span>어제</span>
                                        </div>
                                    </div>

                                    <div className="agent-item" >
                                        <div className="agent-item__header">
                                            <div className="agent-item__info">
                                                <div className="agent-item__name">전문 번역가</div>
                                                <div className="agent-item__role">다국어 전문가</div>
                                            </div>
                                        </div>
                                        <div className="agent-item__meta">
                                            <span>사용 8회</span>
                                            <span>3일 전</span>
                                        </div>
                                    </div>

                                    <div className="agent-item" >
                                        <div className="agent-item__header">
                                            <div className="agent-item__info">
                                                <div className="agent-item__name">회의록 작성자</div>
                                                <div className="agent-item__role">비즈니스 어시스턴트</div>
                                            </div>
                                        </div>
                                        <div className="agent-item__meta">
                                            <span>사용 31회</span>
                                            <span>1시간 전</span>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="agent-builder">
                                <div className="builder-header">
                                    <h1 className="builder-title">🤖 AI 에이전트 빌더</h1>
                                    <p className="builder-subtitle">시스템 프롬프트를 설계하여 업무 자동화 AI를 만들어보세요</p>
                                </div>

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
                                                value="코딩 튜터"
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
                                                oninput="autoResize(this)"
                                            >Python, JavaScript 등 프로그래밍 언어를 가르치는 친절한 튜터입니다.</textarea>
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
                                                <textarea id="systemPrompt" placeholder="시스템 프롬프트를 입력하세요...">[역할 (Role)]
                                                    당신의 역할은 프로그래밍을 배우는 학생들에게 개념을 명확하고 이해하기 쉽게 설명하는 것입니다.

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
                                                    - 코드 예제는 항목 주석과 함께 제공
                                                    - 단계별로 설명하여 이해를 돕기
                                                    - 학생이 스스로 생각할 수 있도록 힌트 제공
                                                    - 오류가 있을 때는 직접 답을 주기보다 디버깅 방법 안내</textarea>
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