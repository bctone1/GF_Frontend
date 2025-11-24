import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';



export default function UserKnowledge() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main className="main">
                        <div className="documents-layout">

                            <div className="folders-sidebar">
                                <div className="folders-header">
                                    <h2 className="folders-title">📂 폴더</h2>
                                    <button className="btn btn--sm btn--outline" >
                                        ➕
                                    </button>
                                </div>

                                <div className="folder-tree">
                                    <div className="folder-item folder-item--active" >
                                        <span className="folder-icon">📁</span>
                                        <span>모든 문서</span>
                                        <span className="folder-count">24</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">🕒</span>
                                        <span>최근 문서</span>
                                        <span className="folder-count">8</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">⭐</span>
                                        <span> 즐겨찾기</span>
                                        <span className="folder-count">5</span>
                                    </div>

                                    <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-3) 0' }}></div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">🐍</span>
                                        <span>Python 학습</span>
                                        <span className="folder-count">12</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">📝</span>
                                        <span>마케팅 자료</span>
                                        <span className="folder-count">8</span>
                                    </div>

                                    <div className="folder-item" >
                                        <span className="folder-icon">📊</span>
                                        <span>데이터 분석</span>
                                        <span className="folder-count">4</span>
                                    </div>
                                </div>
                            </div>


                            <div className="documents-main">
                                <div className="documents-header">
                                    <div className="header-top">
                                        <h1 className="header-title">📚지식베이스</h1>
                                        <div className="header-actions">
                                            <button className="btn btn--outline" >
                                                📤 업로드
                                            </button>
                                            <button className="btn btn--primary" style={{ background: 'var(--employee-primary)' }} >
                                                ➕ 문서 추가
                                            </button>
                                        </div>
                                    </div>

                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder="🔍 문서 검색..."
                                            id="searchInput"
                                            onkeyup="searchDocuments(this.value)"
                                        />
                                        <select className="sort-select" onchange="sortDocuments(this.value)">
                                            <option value="recent">최근 수정순</option>
                                            <option value="name">이름순</option>
                                            <option value="size">크기순</option>
                                            <option value="type">유형순</option>
                                        </select>
                                    </div>
                                </div>


                                <div
                                    id="uploadDropzone"
                                    className="upload-dropzone"
                                    ondragover="handleDragOver(event)"
                                    ondragleave="handleDragLeave(event)"
                                    ondrop="handleDrop(event)"
                                >
                                    <div className="upload-icon">📄</div>
                                    <div className="upload-text">파일을 드래그하거나 클릭하여 업로드</div>
                                    <div className="upload-hint">AI가 문서를 분석하여 대화에 활용할 수 있습니다</div>
                                    <div className="upload-formats">
                                        지원 형식: PDF, TXT, CSV(최대 50MB)
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        multiple
                                        accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                                        onchange="handleFileSelect(event)"
                                    />
                                </div>

                                <div className="documents-content">

                                    <div className="view-controls">
                                        <div className="view-tabs">
                                            <button className="view-tab view-tab--active" >
                                                ⊞ 그리드
                                            </button>
                                            <button className="view-tab" >
                                                ☰ 리스트
                                            </button>
                                        </div>
                                    </div>


                                    <div id="documentsGrid" className="documents-grid">

                                        <div className="document-card" >
                                            <button className="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div className="document-card__header">
                                                <div className="document-icon document-icon--pdf">📄</div>
                                                <div className="document-info">
                                                    <div className="document-name">Python 기초 가이드.pdf</div>
                                                    <div className="document-meta">2.3 MB • 2시간 전</div>
                                                </div>
                                            </div>

                                            <div className="document-status">
                                                <div className="status-bar">
                                                    <div className="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="document-tags">
                                                <span className="doc-tag">Python</span>
                                                <span className="doc-tag">교육</span>
                                                <span className="doc-tag">프로그래밍</span>
                                            </div>

                                            <div className="document-stats">
                                                <div className="stat-item">
                                                    <div className="stat-value">156</div>
                                                    <div className="stat-label">청크</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-value">23</div>
                                                    <div className="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="document-card" >
                                            <button className="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div className="document-card__header">
                                                <div className="document-icon document-icon--doc">📝</div>
                                                <div className="document-info">
                                                    <div className="document-name">마케팅 전략 보고서.docx</div>
                                                    <div className="document-meta">1.8 MB • 어제</div>
                                                </div>
                                            </div>

                                            <div className="document-status">
                                                <div className="status-bar">
                                                    <div className="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="document-tags">
                                                <span className="doc-tag">마케팅</span>
                                                <span className="doc-tag">전략</span>
                                            </div>

                                            <div className="document-stats">
                                                <div className="stat-item">
                                                    <div className="stat-value">89</div>
                                                    <div className="stat-label">청크</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-value">12</div>
                                                    <div className="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="document-card" >
                                            <button className="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div className="document-card__header">
                                                <div className="document-icon document-icon--excel">📊</div>
                                                <div className="document-info">
                                                    <div className="document-name">2024 판매 데이터.xlsx</div>
                                                    <div className="document-meta">856 KB • 3일 전</div>
                                                </div>
                                            </div>

                                            <div className="document-status">
                                                <div className="status-bar">
                                                    <div className="status-indicator status-indicator--processing"></div>
                                                    <span style={{ color: 'var(--warning)', fontWeight: 'var(--font-semibold)' }}>
                                                        처리 중...
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="document-tags">
                                                <span className="doc-tag">데이터</span>
                                                <span className="doc-tag">판매</span>
                                            </div>

                                            <div className="document-stats">
                                                <div className="stat-item">
                                                    <div className="stat-value">-</div>
                                                    <div className="stat-label">청크</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-value">0</div>
                                                    <div className="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="document-card" >
                                            <button className="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div className="document-card__header">
                                                <div className="document-icon document-icon--image">🖼️</div>
                                                <div className="document-info">
                                                    <div className="document-name">프로젝트 다이어그램.png</div>
                                                    <div className="document-meta">1.2 MB • 1주일 전</div>
                                                </div>
                                            </div>

                                            <div className="document-status">
                                                <div className="status-bar">
                                                    <div className="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="document-tags">
                                                <span className="doc-tag">이미지</span>
                                                <span className="doc-tag">다이어그램</span>
                                            </div>

                                            <div className="document-stats">
                                                <div className="stat-item">
                                                    <div className="stat-value">1</div>
                                                    <div className="stat-label">이미지</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-value">8</div>
                                                    <div className="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="document-card" >
                                            <button className="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div className="document-card__header">
                                                <div className="document-icon document-icon--txt">📃</div>
                                                <div className="document-info">
                                                    <div className="document-name">회의록_2024-10-09.txt</div>
                                                    <div className="document-meta">45 KB • 오늘</div>
                                                </div>
                                            </div>

                                            <div className="document-status">
                                                <div className="status-bar">
                                                    <div className="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="document-tags">
                                                <span className="doc-tag">회의록</span>
                                                <span className="doc-tag">텍스트</span>
                                            </div>

                                            <div className="document-stats">
                                                <div className="stat-item">
                                                    <div className="stat-value">12</div>
                                                    <div className="stat-label">청크</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-value">3</div>
                                                    <div className="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="document-card" >
                                            <button className="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div className="document-card__header">
                                                <div className="document-icon document-icon--pdf">📄</div>
                                                <div className="document-info">
                                                    <div className="document-name">데이터 분석 가이드.pdf</div>
                                                    <div className="document-meta">3.5 MB • 2일 전</div>
                                                </div>
                                            </div>

                                            <div className="document-status">
                                                <div className="status-bar">
                                                    <div className="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="document-tags">
                                                <span className="doc-tag">데이터</span>
                                                <span className="doc-tag">분석</span>
                                                <span className="doc-tag">가이드</span>
                                            </div>

                                            <div className="document-stats">
                                                <div className="stat-item">
                                                    <div className="stat-value">234</div>
                                                    <div className="stat-label">청크</div>
                                                </div>
                                                <div className="stat-item">
                                                    <div className="stat-value">15</div>
                                                    <div className="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div id="documentsList" className="documents-list" style={{ display: 'none' }}>

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