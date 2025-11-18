import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';


export default function PartnerStudentManagement() {
    return (
        <>
            <div id="app">
                <PartnerHeader />
                <div className="container">
                    <PartnerSidebar />


                    <main className="main">
                        <div className="main__content">

                            <div className="page-header">
                                <h1 className="page-title">학생 관리</h1>
                                <p className="page-subtitle">전체 교육과정의 학생들을 관리하고 출결을 확인하세요</p>
                            </div>


                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--primary">
                                            👥
                                        </div>
                                        <span className="stat-badge stat-badge--success">+2</span>
                                    </div>
                                    <div className="stat-card__label">총 학생 수</div>
                                    <div className="stat-card__value">127</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--success">
                                            ✅
                                        </div>
                                    </div>
                                    <div className="stat-card__label">활성 학생</div>
                                    <div className="stat-card__value">98</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--warning">
                                            ⏸️
                                        </div>
                                    </div>
                                    <div className="stat-card__label">비활성 학생</div>
                                    <div className="stat-card__value">29</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-card__header">
                                        <div className="stat-icon stat-icon--secondary">
                                            🕒
                                        </div>
                                    </div>
                                    <div className="stat-card__label">오늘 로그인</div>
                                    <div className="stat-card__value">18</div>
                                </div>
                            </div>


                            <div className="tabs">
                                <button className="tab tab--active" data-tab="all" onclick="switchTab('all')">
                                    전체 학생 <span style={{ opacity: 0.7 }}>(127)</span>
                                </button>
                                <button className="tab" data-tab="active" onclick="switchTab('active')">
                                    활성 <span style={{ opacity: 0.7 }}>(98)</span>
                                </button>
                                <button className="tab" data-tab="inactive" onclick="switchTab('inactive')">
                                    비활성 <span style={{ opacity: 0.7 }}>(29)</span>
                                </button>
                            </div>


                            <div className="filter-section">
                                <div className="filter-section__header">
                                    <h3 className="filter-section__title">🔍 필터</h3>
                                    <div className="action-buttons">
                                        <button className="btn btn--sm btn--outline" onclick="resetFilters()">초기화</button>
                                        <button className="btn btn--sm btn--primary" onclick="applyFilters()">적용</button>
                                    </div>
                                </div>

                                <div className="filter-controls">
                                    <div className="filter-control">
                                        <label>교육과정명</label>
                                        <select id="courseFilter">
                                            <option value="">전체</option>
                                            <option value="ai-basic">2025 AI 기초과정</option>
                                            <option value="ai-advanced">2025 AI 심화과정</option>
                                            <option value="prompt-eng">프롬프트 엔지니어링</option>
                                        </select>
                                    </div>

                                    <div className="filter-control">
                                        <label>초대 코드</label>
                                        <select id="inviteCodeFilter">
                                            <option value="">전체</option>
                                            <option value="GF2K4M">GF2K4M</option>
                                            <option value="GF3M5P">GF3M5P</option>
                                        </select>
                                    </div>

                                    <div className="filter-control">
                                        <label>활동 수준</label>
                                        <select id="activityFilter">
                                            <option value="">전체</option>
                                            <option value="high">높음 (100회 이상)</option>
                                            <option value="medium">보통 (50-99회)</option>
                                            <option value="low">낮음 (1-49회)</option>
                                            <option value="none">없음 (0회)</option>
                                        </select>
                                    </div>

                                    <div className="filter-control">
                                        <label>상태</label>
                                        <select id="statusFilter">
                                            <option value="">전체</option>
                                            <option value="active">활성</option>
                                            <option value="inactive">비활성</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className="table-actions">
                                <div className="search-box">
                                    <input type="text" id="searchInput" placeholder="학생 이름 또는 이메일 검색..." />
                                </div>
                                <div className="action-buttons">
                                    <button className="btn btn--outline" onclick="importStudents()">
                                        📥 CSV 일괄 등록
                                    </button>
                                    <button className="btn btn--primary" onclick="addNewStudent()">
                                        ➕ 학생 추가
                                    </button>
                                </div>
                            </div>


                            <div className="students-table-container">
                                <table className="students-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40px' }}>
                                                <input type="checkbox" />
                                            </th>
                                            <th>학생 정보</th>
                                            <th>초대 코드</th>
                                            <th>교육과정명</th>
                                            <th>상태</th>
                                            <th>대화 수</th>
                                            <th>사용 시간</th>
                                            <th>가입일</th>
                                            <th>마지막 접속</th>
                                            <th>작업</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr data-student-id="std-1" className="student-row" data-course="ai-basic"
                                            data-status="active" data-invite="GF2K4M">
                                            <td>
                                                <input type="checkbox" className="student-checkbox" />
                                            </td>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>김</div>
                                                    <div className="student-info">
                                                        <span className="student-name">김철수</span>
                                                        <span className="student-email">kim@samsung.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="invite-badge invite-badge--gf2k4m">GF2K4M</span>
                                            </td>
                                            <td>
                                                <span className="project-badge">2025 AI 기초과정</span>
                                            </td>
                                            <td>
                                                <span className="status-badge status-badge--active">
                                                    <span className="status-dot"></span>
                                                    활성
                                                </span>
                                            </td>
                                            <td>173</td>
                                            <td>24.5h</td>
                                            <td>2025-10-01</td>
                                            <td>방금 전</td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="action-btn" onclick="viewStudentDetail('std-1')">👁️</button>
                                                    <button className="action-btn" onclick="editStudent('std-1')">✏️</button>
                                                    <button className="action-btn" onclick="openStudentMenu('std-1')">⋮</button>
                                                </div>
                                            </td>
                                        </tr>


                                        <tr data-student-id="std-2" className="student-row" data-course="ai-basic"
                                            data-status="active" data-invite="GF2K4M">
                                            <td>
                                                <input type="checkbox" className="student-checkbox" />
                                            </td>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>이</div>
                                                    <div className="student-info">
                                                        <span className="student-name">이영희</span>
                                                        <span className="student-email">lee@samsung.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="invite-badge invite-badge--gf2k4m">GF2K4M</span>
                                            </td>
                                            <td>
                                                <span className="project-badge">2025 AI 기초과정</span>
                                            </td>
                                            <td>
                                                <span className="status-badge status-badge--active">
                                                    <span className="status-dot"></span>
                                                    활성
                                                </span>
                                            </td>
                                            <td>156</td>
                                            <td>22.3h</td>
                                            <td>2025-10-01</td>
                                            <td>2분 전</td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="action-btn" onclick="viewStudentDetail('std-2')">👁️</button>
                                                    <button className="action-btn" onclick="editStudent('std-2')">✏️</button>
                                                    <button className="action-btn" onclick="openStudentMenu('std-2')">⋮</button>
                                                </div>
                                            </td>
                                        </tr>


                                        <tr data-student-id="std-3" className="student-row" data-course="ai-advanced"
                                            data-status="active" data-invite="GF3M5P">
                                            <td>
                                                <input type="checkbox" className="student-checkbox" />
                                            </td>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>박</div>
                                                    <div className="student-info">
                                                        <span className="student-name">박민수</span>
                                                        <span className="student-email">park@lg.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="invite-badge invite-badge--default">GF3M5P</span>
                                            </td>
                                            <td>
                                                <span className="project-badge">2025 AI 심화과정</span>
                                            </td>
                                            <td>
                                                <span className="status-badge status-badge--active">
                                                    <span className="status-dot"></span>
                                                    활성
                                                </span>
                                            </td>
                                            <td>142</td>
                                            <td>19.8h</td>
                                            <td>2025-09-28</td>
                                            <td>15분 전</td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="action-btn" onclick="viewStudentDetail('std-3')">👁️</button>
                                                    <button className="action-btn" onclick="editStudent('std-3')">✏️</button>
                                                    <button className="action-btn" onclick="openStudentMenu('std-3')">⋮</button>
                                                </div>
                                            </td>
                                        </tr>


                                        <tr data-student-id="std-4" className="student-row" data-course="ai-basic"
                                            data-status="active" data-invite="GF2K4M">
                                            <td>
                                                <input type="checkbox" className="student-checkbox" />
                                            </td>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #fa709a, #fee140)' }}>최</div>
                                                    <div className="student-info">
                                                        <span className="student-name">최지훈</span>
                                                        <span className="student-email">choi@samsung.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="invite-badge invite-badge--gf2k4m">GF2K4M</span>
                                            </td>
                                            <td>
                                                <span className="project-badge">2025 AI 기초과정</span>
                                            </td>
                                            <td>
                                                <span className="status-badge status-badge--active">
                                                    <span className="status-dot"></span>
                                                    활성
                                                </span>
                                            </td>
                                            <td>98</td>
                                            <td>15.2h</td>
                                            <td>2025-10-03</td>
                                            <td>1시간 전</td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="action-btn" onclick="viewStudentDetail('std-4')">👁️</button>
                                                    <button className="action-btn" onclick="editStudent('std-4')">✏️</button>
                                                    <button className="action-btn" onclick="openStudentMenu('std-4')">⋮</button>
                                                </div>
                                            </td>
                                        </tr>


                                        <tr data-student-id="std-5" className="student-row" data-course="prompt-eng"
                                            data-status="active" data-invite="GF3M5P">
                                            <td>
                                                <input type="checkbox" className="student-checkbox" />
                                            </td>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #a8edea, #fed6e3)' }}>정</div>
                                                    <div className="student-info">
                                                        <span className="student-name">정수민</span>
                                                        <span className="student-email">jung@hyundai.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="invite-badge invite-badge--default">GF3M5P</span>
                                            </td>
                                            <td>
                                                <span className="project-badge">프롬프트 엔지니어링</span>
                                            </td>
                                            <td>
                                                <span className="status-badge status-badge--active">
                                                    <span className="status-dot"></span>
                                                    활성
                                                </span>
                                            </td>
                                            <td>67</td>
                                            <td>11.4h</td>
                                            <td>2025-10-07</td>
                                            <td>2시간 전</td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="action-btn" onclick="viewStudentDetail('std-5')">👁️</button>
                                                    <button className="action-btn" onclick="editStudent('std-5')">✏️</button>
                                                    <button className="action-btn" onclick="openStudentMenu('std-5')">⋮</button>
                                                </div>
                                            </td>
                                        </tr>


                                        <tr data-student-id="std-6" className="student-row" data-course="ai-basic"
                                            data-status="inactive" data-invite="GF2K4M">
                                            <td>
                                                <input type="checkbox" className="student-checkbox" />
                                            </td>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #6b7280, #9ca3af)' }}>강</div>
                                                    <div className="student-info">
                                                        <span className="student-name">강휴학</span>
                                                        <span className="student-email">kang@samsung.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="invite-badge invite-badge--gf2k4m">GF2K4M</span>
                                            </td>
                                            <td>
                                                <span className="project-badge">2025 AI 기초과정</span>
                                            </td>
                                            <td>
                                                <span className="status-badge status-badge--inactive">
                                                    <span className="status-dot"></span>
                                                    비활성
                                                </span>
                                            </td>
                                            <td>8</td>
                                            <td>0.5h</td>
                                            <td>2025-10-01</td>
                                            <td>2025-10-05</td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button className="action-btn" onclick="viewStudentDetail('std-6')">👁️</button>
                                                    <button className="action-btn" onclick="editStudent('std-6')">✏️</button>
                                                    <button className="action-btn" onclick="openStudentMenu('std-6')">⋮</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <div className="pagination">
                                    <div className="pagination-info">
                                        전체 <strong>127</strong>명 중 <strong>1-6</strong>명 표시
                                    </div>
                                    <div className="pagination-controls">
                                        <button className="pagination-btn" disabled>이전</button>
                                        <button className="pagination-btn pagination-btn--active">1</button>
                                        <button className="pagination-btn">2</button>
                                        <button className="pagination-btn">3</button>
                                        <button className="pagination-btn">다음</button>
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