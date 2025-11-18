import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

export default function UserWorkflow() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="main__header">
                            <div className="main__breadcrumb">
                            </div>
                            <h1 className="main__title"> A2A 워크플로우 vs 병렬 비교 데모</h1>
                        </div>

                        <div className="main__content">

                            <section className="card mb-6">
                                <div className="card__header">
                                    <h2 className="card__title">실행 모드 선택</h2>
                                </div>
                                <div className="card__body">
                                    <div className="mode-toggle">
                                        <button className="mode-btn active" >
                                            <h3>🔀 병렬 비교 모드</h3>
                                            <p>선택한 에이전트들이 동시에 독립적으로 응답합니다</p>
                                        </button>
                                        <button className="mode-btn" >
                                            <h3>➡️ A2A 워크플로우</h3>
                                            <p>에이전트들이 순차적으로 협업하여 작업을 완성합니다</p>
                                        </button>
                                    </div>
                                </div>
                            </section>


                            <section className="card mb-6">
                                <div className="card__header">
                                    <h2 className="card__title" id="section-title">에이전트 선택 (다중 선택)</h2>
                                </div>
                                <div className="card__body">
                                    <div className="agent-selector" id="agentSelector">
                                        <div className="agent-card" data-agent="researcher" >
                                            <div className="agent-order">1</div>
                                            <div className="agent-header">
                                                <span className="agent-icon">🔍</span>
                                                <div className="agent-info">
                                                    <div className="agent-name">리서처</div>
                                                    <div className="agent-role">주제를 조사하고 핵심 정보 수집</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="agent-card" data-agent="planner" >
                                            <div className="agent-order">2</div>
                                            <div className="agent-header">
                                                <span className="agent-icon">📋</span>
                                                <div className="agent-info">
                                                    <div className="agent-name">기획자</div>
                                                    <div className="agent-role">구조를 설계하고 전략 수립</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="agent-card" data-agent="writer" >
                                            <div className="agent-order">3</div>
                                            <div className="agent-header">
                                                <span className="agent-icon">✍️</span>
                                                <div className="agent-info">
                                                    <div className="agent-name">작가</div>
                                                    <div className="agent-role">내용을 작성하고 스토리 구성</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="agent-card" data-agent="editor" >
                                            <div className="agent-order">4</div>
                                            <div className="agent-header">
                                                <span className="agent-icon">✂️</span>
                                                <div className="agent-info">
                                                    <div className="agent-name">편집자</div>
                                                    <div className="agent-role">다듬고 최적화하여 완성</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <section className="card mb-6">
                                <div className="card__header">
                                    <h2 className="card__title">작업 요청</h2>
                                </div>
                                <div className="card__body">
                                    <div className="query-section">
                                        <textarea
                                            id="queryInput"
                                            className="query-input"
                                            placeholder="예: AI 교육 플랫폼 소개 블로그 글을 작성해줘">AI 교육 플랫폼 소개 블로그 글을 작성해줘</textarea>
                                        <div className="action-buttons">
                                            <button className="btn btn--primary btn--lg" id="executeBtn" disabled>
                                                <span id="executeText">실행하기</span>
                                            </button>
                                            <button className="btn btn--secondary btn--lg" >초기화</button>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <div className="info-box" id="infoBox">
                                <h3>💡 병렬 비교 모드란?</h3>
                                <p>선택한 모든 에이전트가 <strong>동시에 독립적으로</strong> 같은 질문에 응답합니다. 각 에이전트의 관점을 비교하여 학습할 수 있습니다.</p>
                            </div>


                            <section className="card">
                                <div className="card__header">
                                    <h2 className="card__title">실행 과정 및 결과</h2>
                                </div>
                                <div className="card__body">
                                    <div className="workflow-visualization" id="workflowViz">
                                        <div className="workflow-steps" id="workflowSteps"></div>
                                    </div>

                                    <div className="results-area" id="resultsArea"></div>
                                    <div className="comparison-mode" id="comparisonMode"></div>
                                </div>
                            </section>
                        </div>
                    </main>




                </div>
            </div>

        </>
    )
}