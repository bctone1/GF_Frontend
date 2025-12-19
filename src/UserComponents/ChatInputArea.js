import { useState, useRef, useCallback, memo } from 'react';

const ChatInputArea = memo(({
    messageInput,
    setMessageInput,
    onSendMessage,
    selectedModels,
    Assistant,
    allowedModelIds,
    handleModelCheckboxChange,
    currentKnowledgeIds,
    setCurrentKnowledgeIds,
    toggleAttachmentDropdown,
    toggleInputSettings,
    togglePlusMenu,
    toggleKnowledgeBaseModal,
    toggleModelListbox,
    getDisplayName
}) => {
    const messageInputRef = useRef(null);
    const autoResizeRef = useRef(null);
    const lastHeightRef = useRef(-1);

    const autoResize = useCallback((textarea) => {
        if (!textarea) return;

        // 이전 요청 취소
        if (autoResizeRef.current) {
            cancelAnimationFrame(autoResizeRef.current);
        }

        // requestAnimationFrame을 사용하여 브라우저 렌더링 사이클에 맞춤
        autoResizeRef.current = requestAnimationFrame(() => {
            // scrollHeight 계산을 최소화하기 위해 직접 접근
            const currentScrollHeight = textarea.scrollHeight;

            // 높이가 실제로 변경된 경우에만 DOM 조작 (불필요한 리플로우 방지)
            if (currentScrollHeight !== lastHeightRef.current) {
                // height를 'auto'로 설정하지 않고 직접 계산하여 리플로우 최소화
                const newHeight = Math.min(currentScrollHeight, 160);
                if (textarea.style.height !== `${newHeight}px`) {
                    textarea.style.height = `${newHeight}px`;
                }
                lastHeightRef.current = currentScrollHeight;
            }
            autoResizeRef.current = null;
        });
    }, []);

    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        // 상태 업데이트는 즉시 실행 (입력 반응성 유지)
        setMessageInput(value);
        // autoResize는 requestAnimationFrame으로 지연하여 입력 블로킹 방지
        autoResize(e.target);
    }, [setMessageInput, autoResize]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
        }
    }, [onSendMessage]);

    return (
        <div className="input-area">
            <div className="input-container">
                <div className="input-preview">
                    <svg className="icon icon--sm input-preview__icon" viewBox="0 0 24 24">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    <span className="input-preview__text"></span>
                    <button className="input-preview__close">
                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="input-box">
                    <textarea
                        className="input-box__textarea"
                        ref={messageInputRef}
                        value={messageInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="메시지를 입력하세요..."
                        rows="1"
                    />
                    <div className="input-box__footer">
                        <div className="input-box__left">
                            <button className="input-btn" id="plusBtn" onClick={togglePlusMenu}>
                                <svg className="icon" viewBox="0 0 24 24">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>

                            <div style={{ position: 'relative' }}>
                                <button
                                    className={`attachment-btn ${currentKnowledgeIds.length !== 0 ? "attachment-btn--visible" : ""}`}
                                    onClick={toggleAttachmentDropdown}
                                    id="attachmentListBtn"
                                >
                                    <svg className="icon attachment-btn__icon" viewBox="0 0 24 24">
                                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                    <span className="attachment-btn__text">첨부</span>
                                    <span className="attachment-btn__count">{currentKnowledgeIds.length}</span>
                                    <svg className="icon attachment-btn__arrow" viewBox="0 0 24 24">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                <div className="attachment-dropdown" id="attachmentList">
                                    <div className="attachment-dropdown__header">
                                        <span className="attachment-dropdown__title">
                                            <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                            </svg>
                                            첨부 파일
                                        </span>
                                        <span
                                            className="attachment-dropdown__clear"
                                            onClick={() => { setCurrentKnowledgeIds([]); toggleAttachmentDropdown(); }}
                                        >
                                            모두 제거
                                        </span>
                                    </div>

                                    <div className="attachment-dropdown__list">
                                        <div className="attachment-dropdown__section-title">지식베이스</div>
                                        {currentKnowledgeIds.map((document) => {
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
                                                    <button
                                                        className="attachment-item__remove"
                                                        onClick={() => setCurrentKnowledgeIds(prev => prev.filter(doc => doc.knowledge_id !== document.knowledge_id))}
                                                    >
                                                        <svg className="icon icon--sm" viewBox="0 0 24 24">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="attachment-dropdown__footer">
                                        <button className="attachment-dropdown__add" onClick={toggleKnowledgeBaseModal}>
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                            파일 추가
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <button className="input-btn" title="빠른 설정" onClick={toggleInputSettings} id="inputSettingsBtn">
                                    <svg className="icon" viewBox="0 0 24 24">
                                        <line x1="4" y1="21" x2="4" y2="14" />
                                        <line x1="4" y1="10" x2="4" y2="3" />
                                        <line x1="12" y1="21" x2="12" y2="12" />
                                        <line x1="12" y1="8" x2="12" y2="3" />
                                        <line x1="20" y1="21" x2="20" y2="16" />
                                        <line x1="20" y1="12" x2="20" y2="3" />
                                        <line x1="1" y1="14" x2="7" y2="14" />
                                        <line x1="9" y1="8" x2="15" y2="8" />
                                        <line x1="17" y1="16" x2="23" y2="16" />
                                    </svg>
                                    <span className="input-btn__badge">3</span>
                                </button>

                                <div className="dropdown settings-dropdown" id="inputSettingsDropdown">
                                    <div className="settings-dropdown__item">
                                        <span className="settings-dropdown__label">스트리밍 응답</span>
                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active"></div>
                                    </div>
                                    <div className="settings-dropdown__item">
                                        <span className="settings-dropdown__label">자동 저장</span>
                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active"></div>
                                    </div>
                                    <div className="settings-dropdown__item">
                                        <span className="settings-dropdown__label">맞춤법 검사</span>
                                        <div className="settings-dropdown__toggle settings-dropdown__toggle--active"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-box__right">
                            <div className="model-listbox">
                                <button className="model-listbox__trigger" onClick={toggleModelListbox} id="modelListboxTrigger">
                                    <span className="model-listbox__label">LLM 모델</span>
                                    <span className="model-listbox__selected">
                                        {selectedModels.length === 0
                                            ? '선택 없음'
                                            : selectedModels.length === 1
                                                ? selectedModels[0]
                                                : `${selectedModels[0]} 외 ${selectedModels.length - 1}개`
                                        }
                                    </span>
                                    <span className="model-listbox__count">{selectedModels.length}개 선택</span>
                                    <svg className="icon icon--sm model-listbox__arrow" viewBox="0 0 24 24">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
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
                                                <label
                                                    className="model-listbox__option"
                                                    data-model={model.model_name}
                                                    key={model.id}
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
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button className="input-btn" title="음성 입력">
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="23" />
                                    <line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                            </button>
                            <button className="input-btn input-btn--primary" title="전송" onClick={onSendMessage}>
                                <svg className="icon" viewBox="0 0 24 24" style={{ color: 'white' }}>
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ChatInputArea.displayName = 'ChatInputArea';

export default ChatInputArea;
