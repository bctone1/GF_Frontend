import UserSidebar2026 from './UserSidebar2026';

export default function UserKnowledge2026() {
    return (
        <>
            <div className="app">
                <UserSidebar2026 />


                <main className="main">
                    <header className="page-header">
                        <div className="page-header__left">
                            <h1 className="page-header__title">지식베이스</h1>
                        </div>

                    </header>

                    <div className="kb-content">
                        {/* Mode Selection  */}
                        <div className="mode-selection" id="modeSelection">
                            <div className="mode-selection__header">
                                <h2 className="mode-selection__title">지식베이스 생성 방식 선택</h2>
                                <p className="mode-selection__desc">목적에 맞는 방식을 선택해주세요</p>
                            </div>

                            <div className="mode-cards">
                                <div className="mode-card" id="simpleCard" onclick="selectMode('simple')">
                                    <div className="mode-card__check">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="mode-card__icon mode-card__icon--simple">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                    </div>
                                    <h3 className="mode-card__title">간편 업로드</h3>
                                    <p className="mode-card__desc">파일만 업로드하면 자동으로 최적화된 설정이 적용됩니다. 빠르고 간편하게 시작하세요.</p>
                                    <div className="mode-card__features">
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            자동 청킹 설정
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            최적화된 검색 파라미터
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            1분 내 설정 완료
                                        </div>
                                    </div>
                                </div>

                                <div className="mode-card" id="advancedCard" onclick="selectMode('advanced')">
                                    <div className="mode-card__check">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="mode-card__icon mode-card__icon--advanced">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mode-card__title">고급 설정</h3>
                                    <p className="mode-card__desc">청킹 방식, 검색 파라미터를 직접 설정합니다. RAG 학습에 최적화된 모드입니다.</p>
                                    <div className="mode-card__features">
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            청킹 방식 선택
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            검색 파라미터 조정
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            미리보기 및 테스트
                                        </div>
                                    </div>
                                </div>

                                <div className="mode-card" id="compareCard" onclick="selectMode('compare')">
                                    <div className="mode-card__check">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="mode-card__icon mode-card__icon--compare">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <rect x="3" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="14" width="7" height="7"></rect>
                                            <rect x="3" y="14" width="7" height="7"></rect>
                                        </svg>
                                    </div>
                                    <h3 className="mode-card__title">비교 모드</h3>
                                    <p className="mode-card__desc">서로 다른 RAG 설정의 결과를 나란히 비교하며 최적의 설정을 찾아보세요.</p>
                                    <div className="mode-card__features">
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            A/B 설정 비교
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            실시간 결과 비교
                                        </div>
                                        <div className="mode-card__feature">
                                            <svg className="icon icon--sm mode-card__feature-icon" viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            성능 지표 분석
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* File List Section */}
                            <div className="file-list-section" id="fileListSection">
                                <div className="file-list-header">
                                    <h3 className="file-list-title">업로드된 파일</h3>
                                    <span className="file-list-count" id="fileCount">12개 파일</span>
                                </div>

                                {/* Stats Summary Bar */}
                                <div className="stats-summary" id="statsSummary">
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--files">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsTotalFiles">12</span>
                                            <span className="stats-summary__label">총 파일</span>
                                        </div>
                                    </div>
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--chunks">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsTotalChunks">1,232</span>
                                            <span className="stats-summary__label">총 청크</span>
                                        </div>
                                    </div>
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--ready">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsReadyFiles">10</span>
                                            <span className="stats-summary__label">처리 완료</span>
                                        </div>
                                    </div>
                                    <div className="stats-summary__item">
                                        <div className="stats-summary__icon stats-summary__icon--failed">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                            </svg>
                                        </div>
                                        <div className="stats-summary__info">
                                            <span className="stats-summary__value" id="statsFailedFiles">2</span>
                                            <span className="stats-summary__label">처리 실패</span>
                                        </div>
                                    </div>
                                </div>

                                {/* File List Toolbar */}
                                <div className="file-list-toolbar">
                                    <div className="file-search">
                                        <svg className="icon icon--sm file-search__icon" viewBox="0 0 24 24">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                        <input type="text" className="file-search__input" id="fileSearchInput" placeholder="파일명으로 검색..." oninput="filterFiles()" />
                                    </div>

                                    <div className="file-filter" id="statusFilter">
                                        <button className="file-filter__button" onclick="toggleFilterDropdown('status')">
                                            <span id="statusFilterLabel">전체 상태</span>
                                            <svg className="icon icon--sm file-filter__arrow" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </button>
                                        <div className="file-filter__dropdown" id="statusDropdown">
                                            <div className="file-filter__item selected" data-value="all" onclick="selectFilter('status', 'all', '전체 상태')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                전체 상태
                                            </div>
                                            <div className="file-filter__item" data-value="ready" onclick="selectFilter('status', 'ready', '처리 완료')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                처리 완료
                                            </div>
                                            <div className="file-filter__item" data-value="failed" onclick="selectFilter('status', 'failed', '처리 실패')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                처리 실패
                                            </div>
                                        </div>
                                    </div>

                                    <div className="file-filter" id="sortFilter">
                                        <button className="file-filter__button" onclick="toggleFilterDropdown('sort')">
                                            <span id="sortFilterLabel">최근 업로드순</span>
                                            <svg className="icon icon--sm file-filter__arrow" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </button>
                                        <div className="file-filter__dropdown" id="sortDropdown">
                                            <div className="file-filter__item selected" data-value="recent" onclick="selectFilter('sort', 'recent', '최근 업로드순')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                최근 업로드순
                                            </div>
                                            <div className="file-filter__item" data-value="oldest" onclick="selectFilter('sort', 'oldest', '오래된순')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                오래된순
                                            </div>
                                            <div className="file-filter__item" data-value="name" onclick="selectFilter('sort', 'name', '이름순')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                이름순
                                            </div>
                                            <div className="file-filter__item" data-value="size" onclick="selectFilter('sort', 'size', '크기순')">
                                                <svg className="icon icon--sm file-filter__check" viewBox="0 0 24 24">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                크기순
                                            </div>
                                        </div>
                                    </div>

                                    <div className="file-view-toggle">
                                        <button className="file-view-toggle__btn active" id="gridViewBtn" onclick="setViewMode('grid')" title="그리드 보기">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                        </button>
                                        <button className="file-view-toggle__btn" id="listViewBtn" onclick="setViewMode('list')" title="리스트 보기">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Selection Bar */}
                                <div className="selection-bar hidden" id="selectionBar">
                                    <label className="selection-bar__checkbox">
                                        <input type="checkbox" id="selectAllCheckbox" onchange="toggleSelectAll()" />
                                        <span className="selection-bar__checkbox-label">전체 선택</span>
                                    </label>
                                    <span className="selection-bar__count" id="selectedCount">0개 선택됨</span>
                                    <div className="selection-bar__actions">
                                        <button className="selection-bar__btn selection-bar__btn--cancel" onclick="clearSelection()">
                                            선택 취소
                                        </button>
                                        <button className="selection-bar__btn selection-bar__btn--delete" onclick="deleteSelectedFiles()">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                            선택 삭제
                                        </button>
                                    </div>
                                </div>

                                <div className="file-grid" id="fileGrid" style={{ display: 'grid' }}>
                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="1" onchange="toggleFileSelection(1)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--pdf">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">프롬프트 엔지니어링 가이드.pdf</div>
                                                <div className="file-card__meta">2.4 MB · 2025-01-10</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--ready">
                                            처리 완료
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">128개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="3" onchange="toggleFileSelection(3)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--csv">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">실습 데이터.csv</div>
                                                <div className="file-card__meta">540 KB · 2025-01-10</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--failed">
                                            처리 실패
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">0개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="9" onchange="toggleFileSelection(9)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--pdf">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">임베딩 모델 비교.pdf</div>
                                                <div className="file-card__meta">2.8 MB · 2025-01-10</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--failed">
                                            처리 실패
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">0개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="2" onchange="toggleFileSelection(2)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--docx">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">AI 기초 교재.docx</div>
                                                <div className="file-card__meta">1.2 MB · 2025-01-09</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--ready">
                                            처리 완료
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">89개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="4" onchange="toggleFileSelection(4)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--pdf">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">RAG 시스템 설계서.pdf</div>
                                                <div className="file-card__meta">3.1 MB · 2025-01-08</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--ready">
                                            처리 완료
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">156개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="5" onchange="toggleFileSelection(5)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--docx">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">자연어처리 입문.docx</div>
                                                <div className="file-card__meta">890 KB · 2025-01-07</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--ready">
                                            처리 완료
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">67개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="6" onchange="toggleFileSelection(6)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--csv">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">고객 FAQ 데이터.csv</div>
                                                <div className="file-card__meta">1.5 MB · 2025-01-06</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--ready">
                                            처리 완료
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">234개 청크</span>
                                        </div>
                                    </div>

                                    <div className="file-card ">
                                        <input type="checkbox" className="file-card__checkbox" data-file-id="7" onchange="toggleFileSelection(7)" />
                                        <div className="file-card__header">
                                            <div className="file-card__icon file-card__icon--pdf">
                                                <svg className="icon" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                            </div>
                                            <div className="file-card__info">
                                                <div className="file-card__name">LLM 파인튜닝 가이드.pdf</div>
                                                <div className="file-card__meta">4.2 MB · 2025-01-05</div>
                                            </div>
                                        </div>
                                        <span className="file-card__status file-card__status--ready">
                                            처리 완료
                                        </span>
                                        <div className="file-card__footer">
                                            <span className="file-card__chunks">198개 청크</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pagination */}
                                <div className="pagination" id="pagination" style={{ display: 'flex' }}>
                                    <button className="pagination__btn" id="prevPageBtn" onclick="changePage('prev')" disabled="">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                        이전
                                    </button>
                                    <div id="pageNumbers"><button className="pagination__btn pagination__btn--active" onclick="goToPage(1)">1</button><button className="pagination__btn " onclick="goToPage(2)">2</button></div>
                                    <button className="pagination__btn" id="nextPageBtn" onclick="changePage('next')">
                                        다음
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                    <span className="pagination__info" id="paginationInfo">1-8 / 12개</span>
                                </div>

                                <div className="empty-state" id="emptyState" style={{ display: 'none' }}>
                                    <div className="empty-state__icon">
                                        <svg className="icon icon--lg" viewBox="0 0 24 24">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                        </svg>
                                    </div>
                                    <div className="empty-state__title">파일이 없습니다</div>
                                    <div className="empty-state__desc">파일을 업로드하여 지식베이스를 구축하세요</div>
                                </div>
                            </div>
                        </div>

                        {/* Simple Upload Mode */}
                        <div className="simple-upload" id="simpleUpload">
                            <div className="simple-upload__back" onclick="goBack()">
                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                모드 선택으로 돌아가기
                            </div>

                            <div className="step-card">
                                <div className="step-card__header">
                                    <h3 className="step-card__title">파일 업로드</h3>
                                    <p className="step-card__desc">AI 학습에 활용될 문서를 업로드하세요</p>
                                </div>

                                <div className="upload-zone" id="simpleUploadZone" onclick="document.getElementById('simpleFileInput').click()" />
                                <input type="file" id="simpleFileInput" multiple="" accept=".pdf,.txt,.docx,.csv" style={{ display: 'none' }} onchange="handleFileUpload(this.files, 'simple')" />
                                <div className="upload-zone__icon">
                                    <svg className="icon icon--lg" viewBox="0 0 24 24">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                </div>
                                <div className="upload-zone__title">파일을 드래그하거나 클릭하여 업로드</div>
                                <div className="upload-zone__desc">AI가 문서를 분석하여 대화에 활용할 수 있습니다</div>
                                <div className="upload-zone__formats">지원 형식: PDF, TXT, DOCX, CSV (최대 10MB)</div>
                            </div>
                            <div className="upload-progress" id="simpleUploadProgress"></div>
                        </div>
                    </div>

                    {/* Advanced Mode */}
                    <div className="advanced-mode" id="advancedMode">
                        <div className="advanced-mode__back" onclick="goBack()">
                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            모드 선택으로 돌아가기
                        </div>

                        {/* Stepper */}
                        <div className="stepper">
                            <div className="stepper__step">
                                <div className="stepper__circle stepper__circle--active" id="stepCircle1">1</div>
                                <span className="stepper__label stepper__label--active" id="stepLabel1">데이터 소스</span>
                            </div>
                            <div className="stepper__line" id="stepLine1"></div>
                            <div className="stepper__step">
                                <div className="stepper__circle" id="stepCircle2">2</div>
                                <span className="stepper__label" id="stepLabel2">청킹 설정</span>
                            </div>
                            <div className="stepper__line" id="stepLine2"></div>
                            <div className="stepper__step">
                                <div className="stepper__circle" id="stepCircle3">3</div>
                                <span className="stepper__label" id="stepLabel3">검색 설정</span>
                            </div>
                            <div className="stepper__line" id="stepLine3"></div>
                            <div className="stepper__step">
                                <div className="stepper__circle" id="stepCircle4">4</div>
                                <span className="stepper__label" id="stepLabel4">미리보기</span>
                            </div>
                        </div>

                        {/* Step 1: Data Source */}
                        <div className="step step--active" id="step1">
                            <div className="step-card">
                                <div className="step-card__header">
                                    <h3 className="step-card__title">데이터 소스 선택</h3>
                                    <p className="step-card__desc">지식베이스에 추가할 파일을 업로드해주세요</p>
                                </div>

                                <div className="upload-zone" id="advancedUploadZone" onclick="document.getElementById('advancedFileInput').click()" />
                                <input type="file" id="advancedFileInput" multiple="" accept=".pdf,.txt,.docx,.csv" style={{ display: 'none' }} onchange="handleFileUpload(this.files, 'advanced')" />
                                <div className="upload-zone__icon">
                                    <svg className="icon icon--lg" viewBox="0 0 24 24">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                </div>
                                <div className="upload-zone__title">파일을 드래그하거나 클릭</div>
                                <div className="upload-zone__desc">PDF, TXT, DOCX, CSV 파일 지원</div>
                            </div>
                            <div className="upload-progress" id="advancedUploadProgress"></div>

                            <div className="step-actions">
                                <button className="btn btn--outline" onclick="goBack()">취소</button>
                                <button className="btn btn--primary" onclick="goToStep(2)">다음 단계</button>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Chunking */}
                    <div className="step" id="step2">
                        <div className="step-card" id="chunkingStepCard">
                            {/* Settings Section (왼쪽) */}
                            <div className="step-card__settings">
                                <div className="step-card__header">
                                    <h3 className="step-card__title">청킹 설정</h3>
                                    <p className="step-card__desc">문서를 어떻게 나눌지 설정합니다</p>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">청킹 방식</label>
                                    <div className="option-cards">
                                        <div className="option-card option-card--active" onclick="selectOption(this); updateChunkPreview();">
                                            <div className="option-card__header">
                                                <div className="option-card__icon option-card__icon--blue">
                                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="3" y1="9" x2="21" y2="9"></line>
                                                        <line x1="3" y1="15" x2="21" y2="15"></line>
                                                    </svg>
                                                </div>
                                                <span className="option-card__title">일반</span>
                                                <span className="option-card__badge">권장</span>
                                            </div>
                                            <p className="option-card__desc">텍스트 청크 모드에서는 검색된 청크와 회수된 청크가 동일합니다.</p>
                                        </div>
                                        <div className="option-card" onclick="selectOption(this); updateChunkPreview();">
                                            <div className="option-card__header">
                                                <div className="option-card__icon option-card__icon--purple">
                                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="4"></circle>
                                                        <circle cx="12" cy="12" r="9"></circle>
                                                    </svg>
                                                </div>
                                                <span className="option-card__title">부모-자식</span>
                                            </div>
                                            <p className="option-card__desc">자식 청크는 검색에 사용되고 부모 청크는 컨텍스트로 회수됩니다.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">세그먼트 식별자</label>
                                        <input type="text" className="form-input" id="segmentIdentifier" value="#n#n" placeholder="예: ###, ---" oninput="updateChunkPreview()" />
                                        <p className="form-hint">마크다운 헤더나 구분선으로 문서 분할</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">최대 청크 길이 <span className="form-label__hint">(자)</span></label>
                                        <input type="number" className="form-input" id="maxChunkLength" value="1024" min="128" max="4096" oninput="updateChunkPreview()" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">청크 중첩 <span className="form-label__hint">(자)</span></label>
                                    <input type="number" className="form-input" id="chunkOverlap" value="50" min="0" max="200" style={{ maxWidth: '200px' }} oninput="updateChunkPreview()" />
                                    <p className="form-hint">청크 간 문맥 연결을 위한 중복 영역</p>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">텍스트 전처리 규칙</label>
                                    <div className="checkbox-group">
                                        <label className="checkbox-item">
                                            <input type="checkbox" id="replaceSpaces" checked="" onchange="updateChunkPreview()" />
                                            <span className="checkbox-item__label">연속된 공백, 줄바꿈, 탭을 대체합니다</span>
                                        </label>
                                        <label className="checkbox-item">
                                            <input type="checkbox" id="removeUrls" onchange="updateChunkPreview()" />
                                            <span className="checkbox-item__label">모든 URL과 이메일 주소를 제거합니다</span>
                                        </label>
                                    </div>
                                </div>

                                <button className="btn btn--outline btn--sm" id="previewChunkBtn" onclick="toggleChunkPreview()">
                                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <span id="previewBtnText">프리뷰 청크</span>
                                </button>

                                <div className="step-actions">
                                    <button className="btn btn--outline" onclick="goToStep(1)">이전</button>
                                    <button className="btn btn--primary" onclick="goToStep(3)">다음 단계</button>
                                </div>
                            </div>

                            {/* Preview Panel (오른쪽) - 토글로 표시 */}
                            <div className="step-card__preview" id="chunkPreviewPanel" style={{ display: 'none' }}>
                                <div className="step-card__preview-header">
                                    <div className="step-card__preview-title">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="3" y1="9" x2="21" y2="9"></line>
                                            <line x1="3" y1="15" x2="21" y2="15"></line>
                                        </svg>
                                        청크 미리보기
                                    </div>
                                    <button className="step-card__preview-close" onclick="toggleChunkPreview()" title="미리보기 닫기">
                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                <div className="step-card__preview-body">
                                    {/* Stats */}
                                    <div className="step-card__preview-stats">
                                        <div className="preview-stat">
                                            <div className="preview-stat__value" id="previewChunkCount">12</div>
                                            <div className="preview-stat__label">총 청크 수</div>
                                        </div>
                                        <div className="preview-stat">
                                            <div className="preview-stat__value" id="previewAvgLength">856</div>
                                            <div className="preview-stat__label">평균 길이</div>
                                        </div>
                                    </div>

                                    {/* Chunk List */}
                                    <div className="step-card__preview-list" id="chunkPreviewList">
                                        {/* 청크들이 여기에 동적으로 생성됨 */}
                                    </div>
                                </div>
                                <div className="step-card__preview-footer">
                                    <button className="preview-refresh-btn" id="refreshPreviewBtn" onclick="refreshChunkPreview()">
                                        <svg className="icon" viewBox="0 0 24 24">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                            <path d="M3 3v5h5"></path>
                                        </svg>
                                        미리보기 새로고침
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Search Settings */}
                    <div className="step" id="step3">
                        <div className="step-card">
                            <div className="step-card__header">
                                <h3 className="step-card__title">검색 설정</h3>
                                <p className="step-card__desc">RAG 검색 방식과 파라미터를 설정합니다</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">인덱스 모드</label>
                                <div className="option-cards">
                                    <div className="option-card option-card--active" onclick="selectIndexMode(this, 'high-quality')">
                                        <div className="option-card__header">
                                            <div className="option-card__icon option-card__icon--blue">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                                </svg>
                                            </div>
                                            <span className="option-card__title">고품질</span>
                                            <span className="option-card__badge">권장</span>
                                        </div>
                                        <p className="option-card__desc">임베딩 모델을 호출하여 높은 정확도의 검색 결과를 제공합니다.</p>
                                    </div>
                                    <div className="option-card" onclick="selectIndexMode(this, 'economic')">
                                        <div className="option-card__header">
                                            <div className="option-card__icon option-card__icon--purple">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                                </svg>
                                            </div>
                                            <span className="option-card__title">경제적</span>
                                        </div>
                                        <p className="option-card__desc">키워드 기반 검색으로 비용을 절감합니다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 고품질 모드 설정 */}
                            <div id="highQualitySettings">
                                <div className="form-group">
                                    <label className="form-label">임베딩 모델</label>
                                    <select className="form-select" id="embeddingModel">
                                        <option value="text-embedding-3-large">text-embedding-3-large (권장)</option>
                                        <option value="text-embedding-3-small">text-embedding-3-small</option>
                                        <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                                    </select>
                                    <p className="form-hint">벡터 검색에 사용할 임베딩 모델을 선택합니다</p>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">재랭크 모델</label>
                                    <div className="option-card option-card--active" id="rerankToggleCard" onclick="toggleRerankMode()">
                                        <div className="option-card__header">
                                            <div className="option-card__icon option-card__icon--green">
                                                <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <circle cx="12" cy="12" r="8" stroke-dasharray="4 2"></circle>
                                                </svg>
                                            </div>
                                            <span className="option-card__title">재랭크 모델</span>
                                            <span className="option-card__radio"></span>
                                        </div>
                                        <p className="option-card__desc">재랭크 모델은 사용자 쿼리와의 의미적 일치를 기반으로 후보 문서 목록을 재배열하여 의미적 순위를 향상시킵니다.</p>
                                    </div>

                                    {/* 재랭크 ON 설정 */}
                                    <div className="rerank-settings" id="rerankSettings">
                                        <div className="rerank-settings__item">
                                            <div className="rerank-settings__row">
                                                <label className="rerank-settings__label">상위 K</label>
                                                <div className="rerank-settings__control">
                                                    <input type="range" className="slider-input rerank-settings__slider" id="rerankTopK" min="1" max="10" value="3" oninput="updateRerankSlider('rerankTopK', 'rerankTopKValue')" />
                                                    <span className="rerank-settings__value" id="rerankTopKValue">3</span>
                                                </div>
                                            </div>
                                            <p className="rerank-settings__hint">재랭크 후 최종 반환할 문서 수</p>
                                        </div>

                                        <div className="rerank-settings__item">
                                            <div className="rerank-settings__row">
                                                <label className="rerank-settings__label">
                                                    <div className="rerank-settings__checkbox">
                                                        <input type="checkbox" id="scoreThresholdEnabled" onclick="event.stopPropagation(); toggleScoreThreshold();" />
                                                        점수 임계값
                                                    </div>
                                                </label>
                                                <div className="rerank-settings__control">
                                                    <input type="range" className="slider-input rerank-settings__slider" id="scoreThreshold" min="0" max="1" step="0.1" value="0.5" oninput="updateRerankSlider('scoreThreshold', 'scoreThresholdValue')" disabled="" />
                                                    <span className="rerank-settings__value" id="scoreThresholdValue">0.5</span>
                                                </div>
                                            </div>
                                            <p className="rerank-settings__hint">이 점수 이상인 문서만 반환 (0~1)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 재랭크 OFF 설정 (Top K, 유사도 임계값) */}
                                <div id="noRerankSettings" style={{ display: 'none' }}>
                                    <div className="form-group">
                                        <label className="form-label">Top K</label>
                                        <p className="form-hint">검색 시 반환할 최대 청크 수</p>
                                        <div className="slider-group">
                                            <input type="range" className="slider-input" id="topK" min="1" max="20" value="5" oninput="updateSliderValue('topK', 'topKValue', '개')" />
                                            <span className="slider-value" id="topKValue">5개</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">유사도 임계값</label>
                                        <p className="form-hint">최소 유사도 점수 (%)</p>
                                        <div className="slider-group">
                                            <input type="range" className="slider-input" id="threshold" min="0" max="100" value="70" oninput="updateSliderValue('threshold', 'thresholdValue', '%')" />
                                            <span className="slider-value" id="thresholdValue">70%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 경제적 모드 설정 */}
                            <div id="economicSettings" style={{ display: 'none' }}>
                                <div className="form-group">
                                    <label className="form-label">Top K</label>
                                    <p className="form-hint">검색 시 반환할 최대 청크 수</p>
                                    <div className="slider-group">
                                        <input type="range" className="slider-input" id="economicTopK" min="1" max="20" value="5" oninput="updateSliderValue('economicTopK', 'economicTopKValue', '개')" />
                                        <span className="slider-value" id="economicTopKValue">5개</span>
                                    </div>
                                </div>
                            </div>

                            <div className="step-actions">
                                <button className="btn btn--outline" onclick="goToStep(2)">이전</button>
                                <button className="btn btn--primary" onclick="goToStep(4)">다음 단계</button>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Preview */}
                    <div className="step" id="step4">
                        <div className="step-card">
                            <div className="step-card__header">
                                <h3 className="step-card__title">설정 확인</h3>
                                <p className="step-card__desc">지식베이스 설정을 확인하고 생성을 완료하세요</p>
                            </div>

                            <div className="summary-card">
                                <div className="summary-card__title">
                                    <svg className="icon icon--sm summary-card__title-icon" viewBox="0 0 24 24">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                    </svg>
                                    데이터 소스
                                </div>
                                <div className="summary-list">
                                    <div className="summary-item">
                                        <span className="summary-item__label">업로드된 파일</span>
                                        <span className="summary-item__value">2개</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-item__label">총 크기</span>
                                        <span className="summary-item__value">4.2 MB</span>
                                    </div>
                                </div>
                            </div>

                            <div className="summary-card">
                                <div className="summary-card__title">
                                    <svg className="icon icon--sm summary-card__title-icon" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="3" y1="9" x2="21" y2="9"></line>
                                        <line x1="9" y1="21" x2="9" y2="9"></line>
                                    </svg>
                                    청킹 설정
                                </div>
                                <div className="summary-list">
                                    <div className="summary-item">
                                        <span className="summary-item__label">청킹 방식</span>
                                        <span className="summary-item__value">일반</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-item__label">최대 청크 길이</span>
                                        <span className="summary-item__value">1024자</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-item__label">청크 중첩</span>
                                        <span className="summary-item__value">50자</span>
                                    </div>
                                </div>
                            </div>

                            <div className="summary-card">
                                <div className="summary-card__title">
                                    <svg className="icon icon--sm summary-card__title-icon" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    검색 설정
                                </div>
                                <div className="summary-list">
                                    <div className="summary-item">
                                        <span className="summary-item__label">인덱스 모드</span>
                                        <span className="summary-item__value">고품질</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-item__label">재순위 모드</span>
                                        <span className="summary-item__value">재랭크 모델</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-item__label">Top K</span>
                                        <span className="summary-item__value">5개</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-item__label">유사도 임계값</span>
                                        <span className="summary-item__value">70%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="step-actions">
                                <button className="btn btn--outline" onclick="goToStep(3)">이전</button>
                                <button className="btn btn--primary btn--lg" onclick="createKnowledgeBase()">지식베이스 생성</button>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}