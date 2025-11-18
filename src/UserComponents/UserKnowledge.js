import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';



export default function UserKnowledge() {
    return (
        <>
            <div id="app">
                <UserHeader />
                <div className="container">
                    <UserSidebar />

                    <main class="main">
                        <div class="documents-layout">

                            <div class="folders-sidebar">
                                <div class="folders-header">
                                    <h2 class="folders-title">📂 폴더</h2>
                                    <button class="btn btn--sm btn--outline" >
                                        ➕
                                    </button>
                                </div>

                                <div class="folder-tree">
                                    <div class="folder-item folder-item--active" >
                                        <span class="folder-icon">📁</span>
                                        <span>모든 문서</span>
                                        <span class="folder-count">24</span>
                                    </div>

                                    <div class="folder-item" >
                                        <span class="folder-icon">🕒</span>
                                        <span>최근 문서</span>
                                        <span class="folder-count">8</span>
                                    </div>

                                    <div class="folder-item" >
                                        <span class="folder-icon">⭐</span>
                                        <span> 즐겨찾기</span>
                                        <span class="folder-count">5</span>
                                    </div>

                                    <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-3) 0' }}></div>

                                    <div class="folder-item" >
                                        <span class="folder-icon">🐍</span>
                                        <span>Python 학습</span>
                                        <span class="folder-count">12</span>
                                    </div>

                                    <div class="folder-item" >
                                        <span class="folder-icon">📝</span>
                                        <span>마케팅 자료</span>
                                        <span class="folder-count">8</span>
                                    </div>

                                    <div class="folder-item" >
                                        <span class="folder-icon">📊</span>
                                        <span>데이터 분석</span>
                                        <span class="folder-count">4</span>
                                    </div>
                                </div>
                            </div>


                            <div class="documents-main">
                                <div class="documents-header">
                                    <div class="header-top">
                                        <h1 class="header-title">📚지식베이스</h1>
                                        <div class="header-actions">
                                            <button class="btn btn--outline" >
                                                📤 업로드
                                            </button>
                                            <button class="btn btn--primary" style={{ background: 'var(--employee-primary)' }} >
                                                ➕ 문서 추가
                                            </button>
                                        </div>
                                    </div>

                                    <div class="search-bar">
                                        <input
                                            type="text"
                                            class="search-input"
                                            placeholder="🔍 문서 검색..."
                                            id="searchInput"
                                            onkeyup="searchDocuments(this.value)"
                                        />
                                        <select class="sort-select" onchange="sortDocuments(this.value)">
                                            <option value="recent">최근 수정순</option>
                                            <option value="name">이름순</option>
                                            <option value="size">크기순</option>
                                            <option value="type">유형순</option>
                                        </select>
                                    </div>
                                </div>


                                <div
                                    id="uploadDropzone"
                                    class="upload-dropzone"
                                    ondragover="handleDragOver(event)"
                                    ondragleave="handleDragLeave(event)"
                                    ondrop="handleDrop(event)"
                                >
                                    <div class="upload-icon">📄</div>
                                    <div class="upload-text">파일을 드래그하거나 클릭하여 업로드</div>
                                    <div class="upload-hint">AI가 문서를 분석하여 대화에 활용할 수 있습니다</div>
                                    <div class="upload-formats">
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

                                <div class="documents-content">

                                    <div class="view-controls">
                                        <div class="view-tabs">
                                            <button class="view-tab view-tab--active" >
                                                ⊞ 그리드
                                            </button>
                                            <button class="view-tab" >
                                                ☰ 리스트
                                            </button>
                                        </div>
                                    </div>


                                    <div id="documentsGrid" class="documents-grid">

                                        <div class="document-card" >
                                            <button class="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div class="document-card__header">
                                                <div class="document-icon document-icon--pdf">📄</div>
                                                <div class="document-info">
                                                    <div class="document-name">Python 기초 가이드.pdf</div>
                                                    <div class="document-meta">2.3 MB • 2시간 전</div>
                                                </div>
                                            </div>

                                            <div class="document-status">
                                                <div class="status-bar">
                                                    <div class="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="document-tags">
                                                <span class="doc-tag">Python</span>
                                                <span class="doc-tag">교육</span>
                                                <span class="doc-tag">프로그래밍</span>
                                            </div>

                                            <div class="document-stats">
                                                <div class="stat-item">
                                                    <div class="stat-value">156</div>
                                                    <div class="stat-label">청크</div>
                                                </div>
                                                <div class="stat-item">
                                                    <div class="stat-value">23</div>
                                                    <div class="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="document-card" >
                                            <button class="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div class="document-card__header">
                                                <div class="document-icon document-icon--doc">📝</div>
                                                <div class="document-info">
                                                    <div class="document-name">마케팅 전략 보고서.docx</div>
                                                    <div class="document-meta">1.8 MB • 어제</div>
                                                </div>
                                            </div>

                                            <div class="document-status">
                                                <div class="status-bar">
                                                    <div class="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="document-tags">
                                                <span class="doc-tag">마케팅</span>
                                                <span class="doc-tag">전략</span>
                                            </div>

                                            <div class="document-stats">
                                                <div class="stat-item">
                                                    <div class="stat-value">89</div>
                                                    <div class="stat-label">청크</div>
                                                </div>
                                                <div class="stat-item">
                                                    <div class="stat-value">12</div>
                                                    <div class="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="document-card" >
                                            <button class="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div class="document-card__header">
                                                <div class="document-icon document-icon--excel">📊</div>
                                                <div class="document-info">
                                                    <div class="document-name">2024 판매 데이터.xlsx</div>
                                                    <div class="document-meta">856 KB • 3일 전</div>
                                                </div>
                                            </div>

                                            <div class="document-status">
                                                <div class="status-bar">
                                                    <div class="status-indicator status-indicator--processing"></div>
                                                    <span style={{ color: 'var(--warning)', fontWeight: 'var(--font-semibold)' }}>
                                                        처리 중...
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="document-tags">
                                                <span class="doc-tag">데이터</span>
                                                <span class="doc-tag">판매</span>
                                            </div>

                                            <div class="document-stats">
                                                <div class="stat-item">
                                                    <div class="stat-value">-</div>
                                                    <div class="stat-label">청크</div>
                                                </div>
                                                <div class="stat-item">
                                                    <div class="stat-value">0</div>
                                                    <div class="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="document-card" >
                                            <button class="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div class="document-card__header">
                                                <div class="document-icon document-icon--image">🖼️</div>
                                                <div class="document-info">
                                                    <div class="document-name">프로젝트 다이어그램.png</div>
                                                    <div class="document-meta">1.2 MB • 1주일 전</div>
                                                </div>
                                            </div>

                                            <div class="document-status">
                                                <div class="status-bar">
                                                    <div class="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="document-tags">
                                                <span class="doc-tag">이미지</span>
                                                <span class="doc-tag">다이어그램</span>
                                            </div>

                                            <div class="document-stats">
                                                <div class="stat-item">
                                                    <div class="stat-value">1</div>
                                                    <div class="stat-label">이미지</div>
                                                </div>
                                                <div class="stat-item">
                                                    <div class="stat-value">8</div>
                                                    <div class="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="document-card" >
                                            <button class="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div class="document-card__header">
                                                <div class="document-icon document-icon--txt">📃</div>
                                                <div class="document-info">
                                                    <div class="document-name">회의록_2024-10-09.txt</div>
                                                    <div class="document-meta">45 KB • 오늘</div>
                                                </div>
                                            </div>

                                            <div class="document-status">
                                                <div class="status-bar">
                                                    <div class="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="document-tags">
                                                <span class="doc-tag">회의록</span>
                                                <span class="doc-tag">텍스트</span>
                                            </div>

                                            <div class="document-stats">
                                                <div class="stat-item">
                                                    <div class="stat-value">12</div>
                                                    <div class="stat-label">청크</div>
                                                </div>
                                                <div class="stat-item">
                                                    <div class="stat-value">3</div>
                                                    <div class="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="document-card" >
                                            <button class="document-card__menu" >
                                                ⋮
                                            </button>

                                            <div class="document-card__header">
                                                <div class="document-icon document-icon--pdf">📄</div>
                                                <div class="document-info">
                                                    <div class="document-name">데이터 분석 가이드.pdf</div>
                                                    <div class="document-meta">3.5 MB • 2일 전</div>
                                                </div>
                                            </div>

                                            <div class="document-status">
                                                <div class="status-bar">
                                                    <div class="status-indicator status-indicator--ready"></div>
                                                    <span style={{ color: 'var(--employee-primary)', fontWeight: 'var(--font-semibold)' }}>
                                                        RAG 준비 완료
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="document-tags">
                                                <span class="doc-tag">데이터</span>
                                                <span class="doc-tag">분석</span>
                                                <span class="doc-tag">가이드</span>
                                            </div>

                                            <div class="document-stats">
                                                <div class="stat-item">
                                                    <div class="stat-value">234</div>
                                                    <div class="stat-label">청크</div>
                                                </div>
                                                <div class="stat-item">
                                                    <div class="stat-value">15</div>
                                                    <div class="stat-label">활용 횟수</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div id="documentsList" class="documents-list" style={{ display: 'none' }}>

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