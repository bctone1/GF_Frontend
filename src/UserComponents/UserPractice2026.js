import { useState, useRef, useEffect } from 'react';
import UserSidebar2026 from './UserSidebar2026';
import { showToast2026, getSelectedClassId } from '../utill/utill';
import axios from 'axios';

export default function UserPractice2026() {

    const [messages, setMessages] = useState([]);

    const adjustPlusMenuPosition = () => {
        const menu = document.getElementById('plusMenu');
        const btn = document.getElementById('plusBtn');
        if (!menu || !btn) return;
        if (menu.classList.contains('plus-menu--open')) {
            const rect = btn.getBoundingClientRect();
            menu.style.left = rect.left + 'px';
            menu.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
        }
    };
    useEffect(() => {
        const handleResize = () => { adjustPlusMenuPosition(); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 모든 토글을 닫는 헬퍼 함수
    const closeAllToggles = (exceptType = null) => {

        if (exceptType !== 'attachmentList') {
            const attachmentList = document.getElementById('attachmentList');
            if (attachmentList) {
                attachmentList.classList.remove('attachment-dropdown--open');
            }
        }

        // plus-menu 닫기
        if (exceptType !== 'plusMenu') {
            const plusMenu = document.getElementById('plusMenu');
            if (plusMenu) {
                plusMenu.classList.remove('plus-menu--open');
            }
        }

        // inputSettings 닫기
        if (exceptType !== 'inputSettings') {
            const inputSettingsDropdown = document.getElementById('inputSettingsDropdown');
            const inputSettingsBtn = document.getElementById('inputSettingsBtn');
            if (inputSettingsDropdown) {
                inputSettingsDropdown.classList.remove('dropdown--open');
            }
            if (inputSettingsBtn) {
                inputSettingsBtn.classList.remove('dropdown--open');
            }
        }

        // modelListbox 닫기
        if (exceptType !== 'modelListbox') {
            const modelListboxDropdown = document.getElementById('modelListboxDropdown');
            const modelListboxTrigger = document.getElementById('modelListboxTrigger');
            if (modelListboxDropdown) {
                modelListboxDropdown.classList.remove('open');
            }
            if (modelListboxTrigger) {
                modelListboxTrigger.classList.remove('open');
            }
        }
    };

    const togglePlusMenu = () => {
        const menu = document.getElementById('plusMenu');
        const btn = document.getElementById('plusBtn');
        if (!menu || !btn) return;

        const isOpen = menu.classList.contains('plus-menu--open');

        if (!isOpen) {
            // 다른 토글들 닫기
            closeAllToggles('plusMenu');

            const rect = btn.getBoundingClientRect();
            menu.style.left = rect.left + 'px';
            menu.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
        }
        menu.classList.toggle('plus-menu--open');
        if (!isOpen) {
            requestAnimationFrame(() => {
                const rect = btn.getBoundingClientRect();
                menu.style.left = rect.left + 'px';
                menu.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
            });
        }
    };

    const toggleAttachmentDropdown = () => {
        const dropdown = document.getElementById('attachmentList');
        const btn = document.getElementById('attachmentListBtn');
        if (!dropdown || !btn) return;
        const isOpen = dropdown.classList.contains('attachment-dropdown--open');

        if (!isOpen) {
            closeAllToggles('attachmentList');
            dropdown.classList.add('attachment-dropdown--open');
            // btn.classList.add('attachment-btn--visible');
        } else {
            dropdown.classList.remove('attachment-dropdown--open');
            // btn.classList.remove('attachment-btn--visible');
        }
    }

    const toggleInputSettings = () => {
        const dropdownMenu = document.getElementById('inputSettingsDropdown');
        const btn = document.getElementById('inputSettingsBtn');
        if (!dropdownMenu || !btn) return;
        const isOpen = dropdownMenu.classList.contains('dropdown--open');

        if (!isOpen) {
            // 다른 토글들 닫기
            closeAllToggles('inputSettings');
            dropdownMenu.classList.add('dropdown--open');
            btn.classList.add('dropdown--open');
        } else {
            dropdownMenu.classList.remove('dropdown--open');
            btn.classList.remove('dropdown--open');
        }
    };

    const toggleModelListbox = () => {
        const dropdownMenu = document.getElementById('modelListboxDropdown');
        const btn = document.getElementById('modelListboxTrigger');
        if (!dropdownMenu || !btn) return;

        const isOpen = dropdownMenu.classList.contains('open');

        if (!isOpen) {
            // 다른 토글들 닫기
            closeAllToggles('modelListbox');
            dropdownMenu.classList.add('open');
            btn.classList.add('open');
        } else {
            dropdownMenu.classList.remove('open');
            btn.classList.remove('open');
        }
    };

    const toggleTuningModal = () => {
        const modal = document.getElementById('tuningModal');
        const isOpen = modal.classList.contains('modal-overlay--open');
        if (!isOpen) {
            closeAllToggles('tuningModal');
            modal.classList.add('modal-overlay--open');
        } else {
            modal.classList.remove('modal-overlay--open');
        }
    }

    const toggleProjectModal = () => {
        const modal = document.getElementById('projectModal');
        const isOpen = modal.classList.contains('modal-overlay--open');
        if (!isOpen) {
            closeAllToggles('projectModal');
            modal.classList.add('modal-overlay--open');
        } else {
            modal.classList.remove('modal-overlay--open');
        }
    }

    const toggleTemplateModal = () => {
        const modal = document.getElementById('templateModal');
        const isOpen = modal.classList.contains('modal-overlay--open');
        if (!isOpen) {
            closeAllToggles('templateModal');
            modal.classList.add('modal-overlay--open');
        } else {
            modal.classList.remove('modal-overlay--open');
        }
    }

    const toggleKnowledgeBaseModal = () => {
        const modal = document.getElementById('knowledgeBaseModal');
        const isOpen = modal.classList.contains('modal-overlay--open');
        if (!isOpen) {
            closeAllToggles('knowledgeBaseModal');
            modal.classList.add('modal-overlay--open');
            setSelectedDocument(currentKnowledgeIds);
        } else {
            modal.classList.remove('modal-overlay--open');
            setSelectedDocument([]);
        }
    }
    // 외부 클릭 감지로 토글 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            const plusMenu = document.getElementById('plusMenu');
            const plusBtn = document.getElementById('plusBtn');

            const inputSettingsDropdown = document.getElementById('inputSettingsDropdown');
            const inputSettingsBtn = document.getElementById('inputSettingsBtn');

            const modelListboxDropdown = document.getElementById('modelListboxDropdown');
            const modelListboxTrigger = document.getElementById('modelListboxTrigger');

            const attachmentList = document.getElementById('attachmentList');
            const attachmentListBtn = document.getElementById('attachmentListBtn');


            // plus-menu 외부 클릭 체크
            if (plusMenu && plusMenu.classList.contains('plus-menu--open')) {
                if (!plusMenu.contains(event.target) && !plusBtn?.contains(event.target)) {
                    plusMenu.classList.remove('plus-menu--open');
                }
            }

            // inputSettings 외부 클릭 체크
            if (inputSettingsDropdown && inputSettingsDropdown.classList.contains('dropdown--open')) {
                if (!inputSettingsDropdown.contains(event.target) && !inputSettingsBtn?.contains(event.target)) {
                    inputSettingsDropdown.classList.remove('dropdown--open');
                    inputSettingsBtn?.classList.remove('dropdown--open');
                }
            }

            // modelListbox 외부 클릭 체크
            if (modelListboxDropdown && modelListboxDropdown.classList.contains('open')) {
                if (!modelListboxDropdown.contains(event.target) && !modelListboxTrigger?.contains(event.target)) {
                    modelListboxDropdown.classList.remove('open');
                    modelListboxTrigger?.classList.remove('open');
                }
            }
            if (attachmentList && attachmentList.classList.contains('attachment-dropdown--open')) {
                if (!attachmentList.contains(event.target) && !attachmentListBtn?.contains(event.target)) {
                    attachmentList.classList.remove('attachment-dropdown--open');
                    attachmentListBtn?.classList.remove('attachment-btn--visible');

                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    // 사용할 데이터 요청
    const accessToken = sessionStorage.getItem("access_token");
    const [Assistant, setAssistant] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());
    const [selectedModels, setSelectedModels] = useState([]);

    const [allowedModelIds, setAllowedModelIds] = useState(() => {
        const stored = sessionStorage.getItem("allowed_model_ids");
        if (!stored) return [0];
        try {
            const parsed = JSON.parse(stored);
            // 배열인지 확인
            if (Array.isArray(parsed)) {
                return parsed;
            }
            // 배열이 아니면 배열로 변환
            if (typeof parsed === 'number') {
                return [parsed];
            }
            if (typeof parsed === 'string') {
                if (parsed.includes(',')) {
                    return parsed.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
                }
                const num = parseInt(parsed, 10);
                return isNaN(num) ? [1] : [num];
            }
            return [1]; // 기본값
        } catch {
            if (typeof stored === 'string' && stored.includes(',')) {
                return stored.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
            }
            const num = parseInt(stored, 10);
            return isNaN(num) ? [1] : [num];
        }
    });



    const fetchAssistant = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/models`);
        // console.log(response.data.items);
        setAssistant(response.data.items);
    }
    const fetchDocuments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/document`,
            { headers: { Authorization: `Bearer ${accessToken}`, }, }
        );
        setDocuments(response.data.items);
    }

    useEffect(() => {
        fetchAssistant();
        fetchDocuments();

    }, []);


    // 클래스 변경 함수 (강의 변경 시 허용된 모델 아이디 및 선택된 모델 업데이트)
    const getProjecList = (projectList) => {
        console.log('header에서 받아온 프로젝트 목록 : ', projectList);
        setProjectList(projectList);
    }

    const handleClassChange = (classId, allowedModelIdsArray, projectList) => {
        console.log('허용된 모델 아이디 : ', allowedModelIdsArray);
        console.log('선택된 강의 아이디 : ', classId);
        console.log('선택된 프로젝트 목록 : ', projectList);
        setProjectList(projectList);
        // setCurrentMessages([]);
        // setCompareMessages({});
        // setShowEmptyState(true);
        // setCurrentSession(0);
        setSavedClassId(classId);

        let modelIds = [1]; // 기본값
        if (Array.isArray(allowedModelIdsArray)) {
            modelIds = allowedModelIdsArray;
        } else if (allowedModelIdsArray != null) {
            // 배열이 아닌 경우 배열로 변환
            if (typeof allowedModelIdsArray === 'number') {
                modelIds = [allowedModelIdsArray];
            } else if (typeof allowedModelIdsArray === 'string') {
                if (allowedModelIdsArray.includes(',')) {
                    modelIds = allowedModelIdsArray.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
                } else {
                    const num = parseInt(allowedModelIdsArray, 10);
                    modelIds = isNaN(num) ? [1] : [num];
                }
            }
        }
        setAllowedModelIds(modelIds);

        if (Assistant && Assistant.length > 0) {
            const firstAllowedModel = Assistant.find(model => model.id === modelIds[0]);
            firstAllowedModel ? setSelectedModels([firstAllowedModel.model_name]) : setSelectedModels([Assistant[0].model_name]);
        }
    };


    const handleModelCheckboxChange = (modelValue, checked) => {
        if (checked) {
            if (selectedModels.length >= 3) {
                alert('최대 3개 모델까지 선택 가능합니다');
                return;
            }
            setSelectedModels([...selectedModels, modelValue]);
        } else {
            const remainingModels = selectedModels.filter(m => m !== modelValue);
            if (remainingModels.length < 1) {
                showToast2026('최소 1개 이상의 모델을 선택해야 합니다.', 'error');
                return;
            }
            setSelectedModels(remainingModels);
        }
    };





    const [selectedDocument, setSelectedDocument] = useState([]);

    const handleDocumentSelection = (document) => {
        setSelectedDocument(prev =>
            prev.some(doc => doc.knowledge_id === document.knowledge_id)
                ? prev.filter(doc => doc.knowledge_id !== document.knowledge_id) // 제거
                : [...prev, document] // 추가
        );
    };
    // const handleRemoveCurrentKBIds= (document)=>{
    //     setCurrentKnowledgeIds(prev => prev.filter(doc => doc.knowledge_id !== document.knowledge_id));
    // }

    const [currentKnowledgeIds, setCurrentKnowledgeIds] = useState([]);
    const handleConfirmKBSelection = () => {
        console.log('저장할 문서 ids : ', selectedDocument);
        setCurrentKnowledgeIds(selectedDocument.map(doc => doc));
        setSelectedDocument([]);
        toggleKnowledgeBaseModal();
        showToast2026(`${selectedDocument.length}개의 문서가 첨부되었습니다.`, 'success');

    }






    return (
        <>

            <div className="app">

                <UserSidebar2026
                    onClassChange={handleClassChange}
                    getProjecList={getProjecList}
                />

                <main className="main">
                    <header className="chat-header">
                        <div className="chat-header__left">
                            <span className="chat-header__title">새로운 대화</span>
                            <svg className="icon icon--sm chat-header__edit" viewBox="0 0 24 24" ><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </div>
                        <div className="chat-header__right">

                            <div className="mode-indicator mode-indicator--single" >
                                <span className="mode-indicator__dot"></span>
                                <span className="mode-indicator__text" >모델 선택 필요</span>
                            </div>
                            <div className="chat-header__participants" >
                                <div className="participant-avatar participant-avatar--gemini" title="Gemini">G</div>
                            </div>
                            <button className="chat-header__btn" title="참여자 초대" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                            </button>
                            <button className="chat-header__btn" title="더보기" >
                                <svg className="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                            </button>
                            <div className="dropdown" style={{ right: '0', top: 'auto' }}>
                                <div className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>공유하기</div>
                                <div className="dropdown__item" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>내보내기</div>
                                <div className="dropdown__divider"></div>
                                <div className="dropdown__item dropdown__item--danger" ><svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>대화 삭제</div>
                            </div>
                        </div>
                    </header>

                    <div className="chat-content">


                        <div className="chat-area" >
                            <div className="messages" >
                                {!messages.length ? (
                                    <>
                                        <div className="empty-state">
                                            <svg className="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                            <h3 className="empty-state__title">새로운 대화 시작</h3>
                                            <p className="empty-state__desc">AI 모델을 선택하고 메시지를 입력하세요.<br />여러 모델을 선택하면 비교 모드가 활성화됩니다.</p>
                                        </div>
                                    </>
                                ) : (
                                    <>

                                    </>
                                )}


                            </div>
                        </div>




                        <div className="chat-area chat-area--compare" ></div>

                        <div className="input-area">
                            <div className="input-container">
                                <div className="input-preview" >
                                    <svg className="icon icon--sm input-preview__icon" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                    <span className="input-preview__text" ></span>
                                    <button className="input-preview__close" >
                                        <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>
                                </div>
                                <div className="input-box">
                                    <textarea className="input-box__textarea" placeholder="메시지를 입력하세요..." rows="1" ></textarea>

                                    <div className="input-box__footer">
                                        <div className="input-box__left">

                                            <button className="input-btn" id="plusBtn" onClick={togglePlusMenu}>
                                                <svg className="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                            </button>







                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className={`attachment-btn ${currentKnowledgeIds.length !== 0 ? "attachment-btn--visible" : ""}`}
                                                    onClick={toggleAttachmentDropdown}
                                                    id="attachmentListBtn"
                                                >
                                                    <svg className="icon attachment-btn__icon" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                                    <span className="attachment-btn__text">첨부</span>
                                                    <span className="attachment-btn__count" >{currentKnowledgeIds.length}</span>
                                                    <svg className="icon attachment-btn__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                                </button>

                                                <div className="attachment-dropdown " id="attachmentList" >
                                                    <div className="attachment-dropdown__header">
                                                        <span className="attachment-dropdown__title">
                                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                                            첨부 파일
                                                        </span>
                                                        <span className="attachment-dropdown__clear"
                                                            onClick={() => { setCurrentKnowledgeIds([]); toggleAttachmentDropdown() }}
                                                        >모두 제거</span>
                                                    </div>

                                                    <div className="attachment-dropdown__list" >
                                                        <div className="attachment-dropdown__section-title">지식베이스</div>
                                                        {currentKnowledgeIds.map((document) => {
                                                            console.log(document);
                                                            return (
                                                                <div className="attachment-item" key={document.knowledge_id}>
                                                                    <div className="attachment-item__icon attachment-item__icon--knowledge">
                                                                        <svg className="icon" viewBox="0 0 24 24">
                                                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="attachment-item__info">
                                                                        <div className="attachment-item__name">{getDisplayName(document.name)}</div>
                                                                        <div className="attachment-item__meta">
                                                                            <span className="attachment-item__type attachment-item__type--knowledge">지식베이스</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className="attachment-item__remove" onClick={() => setCurrentKnowledgeIds(prev => prev.filter(doc => doc.knowledge_id !== document.knowledge_id))}>
                                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                    <div className="attachment-dropdown__footer">
                                                        <button className="attachment-dropdown__add" onClick={toggleKnowledgeBaseModal} >
                                                            <svg className="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                            파일 추가
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>






                                            <div style={{ position: 'relative' }}>
                                                <button className="input-btn" title="빠른 설정" onClick={toggleInputSettings} id="inputSettingsBtn">
                                                    <svg className="icon" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
                                                    <span className="input-btn__badge" >3</span>
                                                </button>

                                                <div className="dropdown settings-dropdown " id="inputSettingsDropdown">
                                                    <div className="settings-dropdown__item">
                                                        <span className="settings-dropdown__label">스트리밍 응답</span>
                                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active" ></div>
                                                    </div>
                                                    <div className="settings-dropdown__item">
                                                        <span className="settings-dropdown__label">자동 저장</span>
                                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active" ></div>
                                                    </div>
                                                    <div className="settings-dropdown__item">
                                                        <span className="settings-dropdown__label">맞춤법 검사</span>
                                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active" ></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>




                                        <div className="input-box__right">

                                            <div className="model-listbox" >
                                                <button className="model-listbox__trigger" onClick={toggleModelListbox} id="modelListboxTrigger">
                                                    <span className="model-listbox__label">
                                                        LLM 모델
                                                    </span>
                                                    <span className="model-listbox__selected" >선택 없음</span>
                                                    <span className="model-listbox__count" >0개 선택</span>
                                                    <svg className="icon icon--sm model-listbox__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                                                </button>

                                                <div className="model-listbox__dropdown" id="modelListboxDropdown">
                                                    <div className="model-listbox__header">
                                                        <span>모델 선택</span>
                                                        <span className="model-listbox__hint">최대 3개 선택 가능</span>
                                                    </div>
                                                    <div className="model-listbox__options">
                                                        {Assistant.map((model) => {
                                                            const isAllowed = Array.isArray(allowedModelIds) && allowedModelIds.includes(model.id);
                                                            const providerDatColor = model.provider === 'anthropic' ? 'claude' : model.provider === 'google' ? 'gemini' : model.provider === 'openai' ? 'gpt' : '';
                                                            return (
                                                                <label className="model-listbox__option" data-model={model.model_name} key={model.id}
                                                                    style={{ opacity: !isAllowed ? 0.5 : 1, cursor: !isAllowed ? 'not-allowed' : 'pointer' }}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedModels.includes(model.model_name)}
                                                                        onChange={(e) => handleModelCheckboxChange(model.model_name, e.target.checked)}
                                                                        disabled={!isAllowed}
                                                                    />
                                                                    <span className="model-listbox__checkbox"></span>
                                                                    <span className={`model-listbox__dot model-listbox__dot--${providerDatColor}`}></span>
                                                                    <span className="model-listbox__info">
                                                                        <span className="model-listbox__name">{model.model_name}</span>
                                                                        <span className="model-listbox__provider">{model.provider}</span>
                                                                    </span>
                                                                </label>
                                                            )
                                                        })}
                                                    </div>
                                                </div>



                                            </div>
                                            <button className="input-btn" title="음성 입력" >
                                                <svg className="icon" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                                            </button>
                                            <button className="input-btn input-btn--primary" title="전송">
                                                <svg className="icon" viewBox="0 0 24 24" style={{ color: 'white' }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


            <div className="plus-menu" id="plusMenu" style={{ left: '293px', bottom: '72px' }}>
                <div className="plus-menu__section">
                    <div className="plus-menu__section-title">파일 &amp; 문서</div>

                    <div className="plus-menu__item" >
                        <div className="plus-menu__icon"><svg className="icon" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></div>
                        <div className="plus-menu__text"><div className="plus-menu__title">파일 첨부</div><div className="plus-menu__desc">이미지, 문서 등을 업로드</div></div>
                    </div>
                    <div className="plus-menu__item" onClick={toggleTemplateModal}>
                        <div className="plus-menu__icon"><svg className="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
                        <div className="plus-menu__text"><div className="plus-menu__title">템플릿 사용</div><div className="plus-menu__desc">저장된 프롬프트 템플릿</div></div>
                    </div>
                    <div className="plus-menu__item" onClick={toggleKnowledgeBaseModal}>
                        <div className="plus-menu__icon"><svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                        <div className="plus-menu__text"><div className="plus-menu__title">지식베이스 연결</div><div className="plus-menu__desc">RAG 문서 참조</div></div>
                    </div>
                    <div className="plus-menu__item" onClick={toggleProjectModal}>
                        <div className="plus-menu__icon"><svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></div>
                        <div className="plus-menu__text"><div className="plus-menu__title">프로젝트 목록</div><div className="plus-menu__desc">저장된 프로젝트 열기</div></div>
                    </div>
                </div>

                <div className="plus-menu__divider"></div>
                <div className="plus-menu__section">
                    <div className="plus-menu__section-title">고급 설정</div>

                    <div className="plus-menu__item plus-menu__item--highlight" onClick={toggleTuningModal}>
                        <div className="plus-menu__icon plus-menu__icon--tuning">
                            <svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        </div>
                        <div className="plus-menu__text">
                            <div className="plus-menu__title">상세 설정 <span className="plus-menu__badge">NEW</span></div>
                            <div className="plus-menu__desc">Temperature, Few-shot 등 파인튜닝</div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="modal-overlay" id="tuningModal" onClick={toggleTuningModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" id="modalTitle">
                            <svg
                                className="icon"
                                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>상세 설정</h3>
                        <button className="modal__close" onClick={toggleTuningModal} >
                            <svg className="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="modal__body" id="modalBody">
                        <div className="tuning-section">
                            <div className="tuning-section__title">
                                <svg className="tuning-section__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                스타일 프리셋
                            </div>
                            <div className="tuning-presets">
                                <div className="tuning-preset " >
                                    <div className="tuning-preset__name">정확한</div>
                                    <div className="tuning-preset__value">T: 0.3</div>
                                </div>
                                <div className="tuning-preset tuning-preset--active">
                                    <div className="tuning-preset__name">균형잡힌</div>
                                    <div className="tuning-preset__value">T: 0.7</div>
                                </div>
                                <div className="tuning-preset " >
                                    <div className="tuning-preset__name">창의적</div>
                                    <div className="tuning-preset__value">T: 1.0</div>
                                </div>
                                <div className="tuning-preset " >
                                    <div className="tuning-preset__name">사용자 정의</div>
                                    <div className="tuning-preset__value">커스텀</div>
                                </div>
                            </div>
                        </div>

                        <div className="tuning-section">
                            <div className="tuning-section__title">
                                <svg className="tuning-section__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line></svg>
                                파라미터 조정
                            </div>

                            <div className="tuning-slider">
                                <div className="tuning-slider__header">
                                    <span className="tuning-slider__label">Temperature</span>
                                    <span className="tuning-slider__value" id="tempValue">0.7</span>
                                </div>
                                <input type="range" className="tuning-slider__input" id="tempSlider" min="0" max="2" step="0.1" />
                                <div className="tuning-slider__desc">낮을수록 일관된 응답, 높을수록 창의적인 응답</div>
                            </div>

                            <div className="tuning-slider">
                                <div className="tuning-slider__header">
                                    <span className="tuning-slider__label">Top P</span>
                                    <span className="tuning-slider__value" id="topPValue">0.9</span>
                                </div>
                                <input type="range" className="tuning-slider__input" id="topPSlider" min="0" max="1" step="0.05" />
                                <div className="tuning-slider__desc">확률 기반 토큰 선택 범위 (0.9 권장)</div>
                            </div>

                            <div className="tuning-slider">
                                <div className="tuning-slider__header">
                                    <span className="tuning-slider__label">Max Length</span>
                                    <span className="tuning-slider__value" id="maxLengthValue">2048</span>
                                </div>
                                <input type="range" className="tuning-slider__input" id="maxLengthSlider" min="256" max="4096" step="256" />
                                <div className="tuning-slider__desc">생성할 최대 토큰 수</div>
                            </div>
                        </div>

                        <div className="tuning-section">
                            <div className="tuning-section__title">
                                <svg className="tuning-section__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                Few-shot 예시
                            </div>
                            <div className="tuning-fewshot">
                                <div className="tuning-fewshot__header">
                                    <span className="tuning-fewshot__title">입출력 예시 (선택사항)</span>
                                    <span className="tuning-fewshot__add" >+ 예시 추가</span>
                                </div>
                                <div id="fewShotContainer">
                                    <div className="tuning-fewshot__item">
                                        <div className="tuning-fewshot__label">입력 (Input)</div>
                                        <textarea className="tuning-fewshot__input" rows="2" placeholder="예시 입력을 작성하세요..."></textarea>
                                        <div className="tuning-fewshot__label" style={{ marginTop: '8px' }}>출력 (Output)</div>
                                        <textarea className="tuning-fewshot__input" rows="2" placeholder="예시 출력을 작성하세요..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal__footer" id="modalFooter" style={{ display: 'flex' }}><button className="modal__btn " >기본값으로 초기화</button><button className="modal__btn modal__btn--primary" >적용</button></div>
                </div>
            </div >



            <div className="modal-overlay" id="projectModal" onClick={toggleProjectModal}>
                <div className="modal modal--popup" onClick={(e) => e.stopPropagation()}>

                    <div className="modal__body" id="modalBody">
                        <div className="popup-header">
                            <div className="popup-header__icon popup-header__icon--purple">
                                <svg className="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                            </div>
                            <div className="popup-header__text">
                                <div className="popup-header__title">프로젝트 목록</div>
                                <div className="popup-header__subtitle">총 {projectList.length}개의 프로젝트</div>
                            </div>
                            <button className="popup-close" onClick={toggleProjectModal}>
                                <svg className="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="popup-search-bar">
                            <div className="popup-search">
                                <svg className="icon icon--sm popup-search__icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" className="popup-search__input" placeholder="프로젝트 검색..." />
                            </div>
                            <div className="popup-sort">
                                <select className="popup-sort__select" >
                                    <option value="recent">최근 수정순</option>
                                    <option value="name">이름순</option>
                                    <option value="chatCount">대화 수순</option>
                                </select>
                                <svg className="icon icon--sm popup-sort__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                            </div>
                        </div>

                        <div className="popup-list" id="projectPopupList">

                            {projectList.map((project, index) => {
                                const itemColor = ['#9333ea', '#4285f4', '#d97757', '#d97757', '#10a37f', '#a50034', '#f59e0b'];
                                return (
                                    <div className="popup-item" key={project.project_id}>
                                        <div className="popup-item__color" style={{ background: itemColor[index] }}></div>
                                        <div className="popup-item__info">
                                            <div className="popup-item__name">{project.name}</div>
                                            <div className="popup-item__meta">
                                                <span>대화 5개</span>
                                                <span>•</span>
                                                <span>2시간 전</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal-overlay" id="templateModal" onClick={toggleTemplateModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <h3 className="modal__title" id="modalTitle">템플릿 선택</h3>
                        <button className="modal__close" onClick={toggleTemplateModal}>
                            <svg className="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="modal__body" id="modalBody">
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <div className="dropdown__item">마케팅 문구 생성</div>
                            <div className="dropdown__item">코드 리뷰 요청</div>
                            <div className="dropdown__item">번역 요청</div>
                            <div className="dropdown__item">요약 요청</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal-overlay" id="knowledgeBaseModal" onClick={toggleKnowledgeBaseModal}>
                <div className="modal modal--popup" onClick={(e) => e.stopPropagation()}>

                    <div className="modal__body" id="knowledgeBaseModalBody">
                        <div className="popup-header">
                            <div className="popup-header__icon popup-header__icon--green">
                                <svg className="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <div className="popup-header__text">
                                <div className="popup-header__title">지식베이스 연결</div>
                                <div className="popup-header__subtitle">RAG 문서를 선택하여 대화에 연결</div>
                            </div>
                            <button className="popup-close" onClick={toggleKnowledgeBaseModal}>
                                <svg className="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="popup-selected-tags">

                            {selectedDocument.map((document) => {
                                return (
                                    <span className="popup-selected-tag" key={document.knowledge_id}>
                                        {getDisplayName(document.name)}
                                        <button className="popup-selected-tag__remove" onClick={() => handleDocumentSelection(document)}>
                                            <svg className="icon icon--sm" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </span>
                                )
                            })}
                        </div>



                        <div className="popup-search-bar">
                            <div className="popup-search">
                                <svg className="icon icon--sm popup-search__icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" className="popup-search__input" placeholder="지식베이스 검색..." />
                            </div>
                            <div className="popup-sort">
                                <select className="popup-sort__select">
                                    <option value="recent" >최근순</option>
                                    <option value="name">이름순</option>
                                    <option value="chunkCount">청크 수순</option>
                                </select>
                                <svg className="icon icon--sm popup-sort__arrow" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                            </div>
                        </div>

                        <div className="popup-list" id="kbPopupList">
                            {documents.map((document, index) => {
                                return (
                                    <div
                                        className={`popup-item ${selectedDocument.some(doc => doc.knowledge_id === document.knowledge_id) ? 'popup-item--selected' : ''}`}
                                        key={document.knowledge_id}
                                        onClick={() => handleDocumentSelection(document)}
                                    >
                                        <div className="popup-item__checkbox">
                                            <svg className="icon icon--sm popup-item__checkbox-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <div className="popup-item__info">
                                            <div className="popup-item__name">{getDisplayName(document.name)}</div>
                                            <div className="popup-item__meta">
                                                <span>{document.chunk_count} 청크</span>
                                                <span>•</span>
                                                <span>{formatFileSize(document.file_size_bytes)}</span>
                                                <span>•</span>
                                                <span>{document.uploaded_at.split('T')[0].slice(5)} {document.uploaded_at.split('T')[1].split('.')[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                        <div className="popup-footer">
                            <button className="popup-footer__btn" onClick={toggleKnowledgeBaseModal}>취소</button>

                            <button className="popup-footer__btn popup-footer__btn--primary" disabled={selectedDocument.length === 0}
                                onClick={handleConfirmKBSelection}
                            >
                                {selectedDocument.length}개 연결하기
                            </button>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
const getDisplayName = (originName) => {
    const parts = originName.split("_");
    return parts.slice(2).join("_");
}

const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};