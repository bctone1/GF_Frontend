import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { showToast, getSelectedClassId, getSelectedClassTitle } from '../utill/utill';
import { useSearchParams } from 'react-router-dom';

export default function UserPractice() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentProject, setCurrentProject] = useState('AI 실습 기초');
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [plusMenuView, setPlusMenuView] = useState('main');
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [showEmptyState, setShowEmptyState] = useState(true);
    const [comparePanels, setComparePanels] = useState([]);
    const [compareMessages, setCompareMessages] = useState({}); // { model: [messages] }

    const [documents, setDocuments] = useState([]);
    const [Assistant, setAssistant] = useState([]);
    const [currentSession, setCurrentSession] = useState(0);
    const [currentProjectId, setCurrentProjectId] = useState(0);

    const messageInputRef = useRef(null);
    const plusMenuRef = useRef(null);
    const plusBtnRef = useRef(null);
    const modelDropdownRef = useRef(null);
    const modelDisplayRef = useRef(null);
    const messagesEndRef = useRef(null);
    const compareMessagesRefs = useRef({});
    const accessToken = sessionStorage.getItem("access_token");


    const [sessions, setSessions] = useState([]);
    const [savedClassId, setSavedClassId] = useState(getSelectedClassId());

    const [allowedModelIds, setAllowedModelIds] = useState(() => {
        const stored = sessionStorage.getItem("allowed_model_ids");
        if (!stored) return [1]; // 기본값
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
    const [selectedModels, setSelectedModels] = useState(['gpt-4o-mini']);

    const fetchSessions = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions`,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", } }
        );
        console.log(response.data.items);
        setSessions(response.data.items);
    }
    const [projectList, setProjectList] = useState([]);
    const fetchProjects = async (classId) => {
        // 클래스가 선택되지 않으면 프로젝트를 표시하지 않음
        if (!classId) {
            setProjectList([]);
            return;
        }

        try {
            const url = `${process.env.REACT_APP_API_URL}/projects?class_id=${classId}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            });
            // API가 클래스 필터링을 지원하지 않는 경우 클라이언트 측에서 필터링
            const projects = response.data.items || [];
            const filteredProjects = projects.filter(project => String(project.class_id) === String(classId));
            setProjectList(filteredProjects);
        } catch (error) {
            console.error('프로젝트 조회 실패:', error);
            setProjectList([]);
        }
    }


    // UserSidebar에서 클래스 변경 시 호출되는 콜백
    const handleClassChange = (classId, allowedModelIdsArray) => {
        setCurrentMessages([]);
        setCompareMessages({});
        setShowEmptyState(true);
        setCurrentSession(0);
        setSavedClassId(classId);
        fetchProjects(classId);

        // allowedModelIdsArray가 배열인지 확인하고 배열로 변환
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

        // Assistant가 로드되었고, 첫 번째 허용된 모델을 찾아서 선택
        if (Assistant && Assistant.length > 0) {
            const firstAllowedModel = Assistant.find(model => model.id === modelIds[0]);
            if (firstAllowedModel) {
                setSelectedModels([firstAllowedModel.model_name]);
            } else {
                // 허용된 모델을 찾을 수 없으면 첫 번째 모델 사용
                setSelectedModels([Assistant[0].model_name]);
            }
        } else {
            setSelectedModels(['gpt-4o-mini']);
        }
    };

    const filteredSessions = useMemo(() => {
        if (!savedClassId) return [];
        return sessions.filter(
            session => session.class_id === Number(savedClassId)
        );
    }, [sessions, savedClassId]);

    const fetchDocuments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/document`,
            { headers: { Authorization: `Bearer ${accessToken}`, }, }
        );
        setDocuments(response.data.items);
    }

    const fetchAssistant = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/models`);
        // console.log(response.data.items);
        setAssistant(response.data.items);
    }

    useEffect(() => {
        fetchAssistant();
        fetchDocuments();
        fetchSessions();
        fetchProjects(savedClassId);
    }, []);

    // Assistant가 로드되고 allowedModelIds가 변경될 때 첫 번째 허용된 모델 자동 선택
    useEffect(() => {
        if (Assistant && Assistant.length > 0 && Array.isArray(allowedModelIds) && allowedModelIds.length > 0) {
            const firstAllowedModel = Assistant.find(model => allowedModelIds.includes(model.id));
            if (firstAllowedModel && !selectedModels.includes(firstAllowedModel.model_name)) {
                setSelectedModels([firstAllowedModel.model_name]);
            }
        }
    }, [Assistant, allowedModelIds]);

    // 외부 클릭 처리
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showPlusMenu && plusMenuRef.current && plusBtnRef.current &&
                !plusBtnRef.current.contains(e.target) &&
                !plusMenuRef.current.contains(e.target)) {
                setShowPlusMenu(false);
            }

            if (showModelDropdown && modelDropdownRef.current && modelDisplayRef.current &&
                !modelDisplayRef.current.contains(e.target) &&
                !modelDropdownRef.current.contains(e.target)) {
                setShowModelDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showPlusMenu, showModelDropdown]);

    // 메시지 스크롤
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentMessages]);

    // 선택된 모델 수에 따라 패널 생성
    useEffect(() => {
        if (selectedModels.length >= 1) {
            setComparePanels(selectedModels);
            // 메시지는 유지 (필터링하지 않음)
            // UI에서 compareMessages[model]을 사용하므로 선택된 모델의 메시지만 표시됨
        } else {
            setComparePanels([]);
        }
    }, [selectedModels]);

    // 단일 모드일 때 compareMessages와 currentMessages 동기화
    useEffect(() => {
        if (selectedModels.length === 1) {
            const model = selectedModels[0];
            const messages = compareMessages[model] || [];
            setCurrentMessages(messages);
        }
    }, [compareMessages, selectedModels]);

    // 메시지 스크롤
    useEffect(() => {
        if (selectedModels.length >= 2) {
            comparePanels.forEach(model => {
                const ref = compareMessagesRefs.current[model];
                if (ref) {
                    ref.scrollIntoView({ behavior: 'smooth' });
                }
            });
        } else if (selectedModels.length === 1 && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [compareMessages, comparePanels, selectedModels]);



    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    // 비교 모드용 API 호출 (여러 모델 ID 지원)
    const getCompareResponse = async (question) => {
        console.log("요청한 모델 : ", selectedModels);
        try {
            const documentIds = attachedFiles
                .filter(file => file.isDocument && file.knowledge_id)
                .map(file => file.knowledge_id);

            const URL = currentProjectId ?
                `${process.env.REACT_APP_API_URL}/user/practice/sessions/${currentSession}/chat?class_id=${savedClassId}&project_id=${currentProjectId}`
                : `${process.env.REACT_APP_API_URL}/user/practice/sessions/${currentSession}/chat?class_id=${savedClassId}`;
            console.log("CHAT URL : ", URL);
            const res = await axios.post(
                URL,
                {
                    prompt_text: question,
                    model_names: selectedModels,
                    document_ids: documentIds.length > 0 ? documentIds : [0]
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    timeout: 60000, // 60초 타임아웃
                }
            );
            console.log(res.data);
            if (res.data.session_id) {
                setCurrentSession(res.data.session_id);
                fetchSessions();
            }
            return res.data;
        } catch (err) {
            console.error('API 호출 오류:', err);
            // 에러를 throw하여 상위에서 처리하도록 함
            throw err;
        }
    };

    const autoResize = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
        }
    };

    const toggleChatSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const togglePlusMenu = () => {
        if (showPlusMenu) {
            setShowPlusMenu(false);
        } else {
            setPlusMenuView('main');
            setShowPlusMenu(true);
        }
    };

    const showMainMenu = (e) => {
        e.stopPropagation();
        setPlusMenuView('main');
    };

    const showProjectMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('project');
    };

    const showAgentMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('agent');
    };

    const showKnowledgeMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('knowledge');
    };

    const showIntegrationMenu = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setPlusMenuView('integration');
    };

    const selectProjectFromPlusMenu = async (project) => {
        if (!currentSession) {
            showToast('채팅을 먼저 시작해주세요', 'error');
            return;
        }
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${currentSession}`,
            {
                project_id: project.project_id
            },
            { headers: { Authorization: `Bearer ${accessToken}`, }, }
        );
        console.log(res.data);
        setCurrentProject(project.name);
        setShowPlusMenu(false);
        setPlusMenuView('main');
        fetchSessions();
    };

    const toggleModelDropdown = () => {
        setShowModelDropdown(!showModelDropdown);
    };

    const startNewChat = () => {
        setCurrentMessages([]);
        setCompareMessages({});
        setShowEmptyState(true);
        setCurrentSession(0);
        showToast('새 채팅이 시작되었습니다', 'success');
    };



    const applySuggestion = (text) => {
        setMessageInput(text);
        if (messageInputRef.current) {
            messageInputRef.current.focus();
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
                showToast('최소 1개 이상의 모델을 선택해야 합니다.', 'error');
                // alert('최소 1개 이상의 모델을 선택해야 합니다.');
                return;
            }
            setSelectedModels(remainingModels);
        }
    };

    const updateSelectedDisplay = () => {
        if (selectedModels.length === 1) {
            const model = Assistant.find(m => m.id === selectedModels[0]);
            return { text: model?.model_name || '모델 선택' };
        } else if (selectedModels.length > 1) {
            return { text: `${selectedModels.length}개 모델 선택됨` };
        }
        if (Assistant.length > 0) {
            return { text: Assistant[0].model_name || '모델 선택' };
        }
        return { text: '모델 선택' };
    };

    const sendMessage = async () => {
        const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        const message = messageInput.trim();

        if (!message || isGenerating) return;
        if (selectedModels.length === 0) { alert('모델을 선택해주세요'); return; }

        setMessageInput('');
        if (messageInputRef.current) { autoResize(messageInputRef.current); }
        setIsGenerating(true);
        setShowEmptyState(false);

        // 각 패널에 사용자 메시지 추가
        selectedModels.forEach(model => {
            setCompareMessages(prev => ({
                ...prev,
                [model]: [
                    ...(prev[model] || []),
                    {
                        type: 'user',
                        content: message,
                        time: currentTime
                    }
                ]
            }));
        });

        try {
            const responseData = await getCompareResponse(message);

            // 응답 데이터 검증
            if (!responseData) {
                throw new Error('응답 데이터가 없습니다.');
            }

            if (!responseData.results || !Array.isArray(responseData.results) || responseData.results.length === 0) {
                throw new Error('응답 결과가 없습니다.');
            }

            // 각 모델별로 응답 처리
            const processedModels = new Set();
            responseData.results.forEach((result) => {
                if (!result || !result.model_name) {
                    console.warn('유효하지 않은 응답 결과:', result);
                    return;
                }

                const modelName = result.model_name;
                processedModels.add(modelName);

                setCompareMessages(prev => ({
                    ...prev,
                    [modelName]: [
                        ...(prev[modelName] || []),
                        {
                            type: 'assistant',
                            content: result.response_text || '응답이 비어있습니다.',
                            time: result.created_at
                                ? new Date(result.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                                : currentTime,
                            modelName: result.model_name,
                            latency: result.latency_ms,
                            tokenUsage: result.token_usage
                        }
                    ]
                }));
            });

            // 선택된 모델 중 응답이 없는 모델에 대해 에러 메시지 표시
            selectedModels.forEach(model => {
                if (!processedModels.has(model)) {
                    setCompareMessages(prev => ({
                        ...prev,
                        [model]: [
                            ...(prev[model] || []),
                            {
                                type: 'assistant',
                                content: '서버 오류가 발생했습니다. 관리자에게 문의해주세요.',
                                time: currentTime,
                                isError: true
                            }
                        ]
                    }));
                }
            });

        } catch (err) {
            console.error('응답 생성 중 오류:', err);

            // 모든 선택된 모델에 에러 메시지 표시
            selectedModels.forEach(model => {
                setCompareMessages(prev => ({
                    ...prev,
                    [model]: [
                        ...(prev[model] || []),
                        {
                            type: 'assistant',
                            content: '서버 오류가 발생했습니다. 관리자에게 문의해주세요.',
                            time: currentTime,
                            isError: true
                        }
                    ]
                }));
            });

            // 사용자에게 토스트 메시지 표시 (선택사항)
            if (err.response) {
                // 서버 응답이 있는 경우
                const status = err.response.status;
                if (status === 401) {
                    showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'error');
                } else if (status === 403) {
                    showToast('접근 권한이 없습니다.', 'error');
                } else if (status >= 500) {
                    showToast('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
                }
            } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
                showToast('요청 시간이 초과되었습니다. 다시 시도해주세요.', 'error');
            } else if (err.message?.includes('Network Error') || !err.response) {
                showToast('네트워크 연결을 확인해주세요.', 'error');
            }
        }

        setIsGenerating(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const uploadFile = () => {
        showToast('Phase 2에서 구현 예정입니다', 'error');
        // alert("Phase 2에서 구현 예정입니다");
        return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,.pdf,.doc,.docx,.txt';
        input.multiple = true;
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) {
                    console.log(`${file.name}은 10MB 초과`);
                    return;
                }
                setAttachedFiles(prev => [...prev, file]);
                console.log(`${file.name} 첨부됨`);
            });
        };
        input.click();
    };

    const removeFile = (index) => {
        const file = attachedFiles[index];
        const fileName = file.name || (file.documentName || '파일');
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
        console.log(`${fileName} 제거됨`);
    };

    const addDocumentToAttached = (document) => {
        // 이미 첨부된 문서인지 확인
        const isAlreadyAttached = attachedFiles.some(
            file => file.knowledge_id === document.knowledge_id
        );

        if (isAlreadyAttached) {
            showToast('이미 첨부된 문서입니다.', 'info');
            return;
        }

        // 문서 정보를 File 객체처럼 만들어서 추가
        const documentFile = {
            knowledge_id: document.knowledge_id,
            name: document.name,
            size: document.file_size_bytes,
            documentName: document.name,
            isDocument: true,
            updated_at: document.updated_at,
            chunk_count: document.chunk_count
        };

        setAttachedFiles(prev => [...prev, documentFile]);
        setShowPlusMenu(false);
        setPlusMenuView('main');
        showToast(`${document.name}이(가) 첨부되었습니다.`, 'success');
    };

    const selectedDisplay = updateSelectedDisplay();

    const handleSessionClick = useCallback(async (sessionId) => {
        console.log("sessionId : ", sessionId);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/practice/sessions/${sessionId}`,
                { headers: { Authorization: `Bearer ${accessToken}`, }, }
            );

            const sessionData = response.data;
            const newCompareMessages = {};

            // prompt_text를 기준으로 그룹화 (같은 질문에 대한 여러 모델의 응답)
            const promptGroups = {};
            sessionData.responses.forEach((resp) => {
                if (!promptGroups[resp.prompt_text]) {
                    promptGroups[resp.prompt_text] = [];
                }
                promptGroups[resp.prompt_text].push(resp);
            });

            // prompt_text를 created_at 기준으로 정렬
            const sortedPrompts = Object.keys(promptGroups).sort((a, b) => {
                const timeA = promptGroups[a][0]?.created_at || '';
                const timeB = promptGroups[b][0]?.created_at || '';
                return new Date(timeA) - new Date(timeB);
            });

            // 각 질문-응답 쌍을 처리
            sortedPrompts.forEach((promptText) => {
                const responses = promptGroups[promptText];
                const firstResponse = responses[0];
                const userMessageTime = new Date(firstResponse.created_at).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                // 각 모델별로 메시지 추가
                responses.forEach((resp) => {
                    const modelName = resp.model_name;

                    // 해당 모델의 메시지 배열이 없으면 초기화
                    if (!newCompareMessages[modelName]) {
                        newCompareMessages[modelName] = [];
                    }

                    // 사용자 메시지 추가 (이미 추가되지 않은 경우)
                    const hasUserMessage = newCompareMessages[modelName].some(
                        msg => msg.type === 'user' && msg.content === promptText
                    );
                    if (!hasUserMessage) {
                        newCompareMessages[modelName].push({
                            type: 'user',
                            content: promptText,
                            time: userMessageTime
                        });
                    }

                    // 어시스턴트 메시지 추가
                    newCompareMessages[modelName].push({
                        type: 'assistant',
                        content: resp.response_text,
                        time: new Date(resp.created_at).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        modelName: resp.model_name,
                        latency: resp.latency_ms,
                        tokenUsage: resp.token_usage
                    });
                });
            });

            // 메시지 상태 업데이트
            setCompareMessages(newCompareMessages);
            setCurrentSession(sessionId);
            setShowEmptyState(false);
            setCurrentProject(projectList.find(p => p.project_id === sessionData.project_id)?.name || '');

            // 사용된 모델들을 selectedModels에 설정 (상위 3개만)
            const usedModels = Object.keys(newCompareMessages);
            console.log("usedModels : ", usedModels);
            if (usedModels.length > 0) {
                // 상위 3개만 선택
                const top3Models = usedModels.slice(0, 3);
                setSelectedModels(top3Models);
            }
        } catch (error) {
            console.error('세션 로드 중 오류:', error);
            showToast('세션을 불러오는 중 오류가 발생했습니다.', 'error');
        }
    }, [accessToken, projectList]);


    // URL 쿼리 파라미터에서 sessionId가 있으면 자동으로 세션 로드
    useEffect(() => {
        const sessionIdFromUrl = searchParams.get('sessionId');
        if (sessionIdFromUrl) {
            const sessionId = parseInt(sessionIdFromUrl, 10);
            if (sessionId && !isNaN(sessionId)) {
                // 세션이 로드될 때까지 약간의 지연 후 실행
                const timer = setTimeout(() => {
                    handleSessionClick(sessionId);
                    // URL에서 쿼리 파라미터 제거 (한 번만 실행되도록)
                    setSearchParams({});
                }, 100);
                return () => clearTimeout(timer);
            }
        }
        const projectIdFromUrl = searchParams.get('projectId');
        if (projectIdFromUrl) {
            const projectId = parseInt(projectIdFromUrl, 10);
            if (projectId && !isNaN(projectId)) {
                const timer = setTimeout(() => {
                    const project = projectList.find(p => p.project_id === projectId);
                    if (project) {
                        setCurrentProject(project.name);
                        setCurrentProjectId(project.project_id);
                        setSearchParams({});
                    }
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [searchParams, sessions, handleSessionClick, setSearchParams, setCurrentProject, projectList, setCurrentProjectId]);

    const [myprofile, setMyprofile] = useState(null);
    const handleAccountData = (accountData) => {
        // console.log(accountData);
    }

    const handleProfileData = (profileData) => {
        setMyprofile(profileData);
        console.log(profileData);
    }

    return (
        <>
            <div id="app">
                <UserHeader
                    onAccountData={handleAccountData}
                    onProfileData={handleProfileData}
                />
                <div className="container">
                    <UserSidebar onClassChange={handleClassChange} />

                    <main className="main">
                        <div className="practice-container">
                            {/* 좌측: 히스토리 사이드바 */}
                            <aside className={`chat-sidebar ${isSidebarCollapsed ? 'chat-sidebar--collapsed' : ''}`} id="chatSidebar">
                                <div className="chat-sidebar__header">
                                    <button className="chat-sidebar__new-chat" onClick={startNewChat}>
                                        <span>새 채팅</span>
                                    </button>
                                </div>

                                <div className="chat-sidebar__history" id="chatHistory">
                                    {filteredSessions.map((session) => (
                                        <div key={session.session_id} className={`chat-history-item ${currentSession === session.session_id ? 'chat-history-item--active' : ''}`} onClick={() => handleSessionClick(session.session_id)}>
                                            {session.project_id && (
                                                <div className="chat-history-item__project">{projectList.find(p => p.project_id === session.project_id)?.name || ''}</div>
                                            )}
                                            <div className="chat-history-item__title">{session.title ? session.title : '대화하기'}</div>
                                            <div className="chat-history-item__meta">
                                                <span>{session.updated_at?.split('T')[0].slice(5)}{" "}{session.updated_at?.split('T')[1].slice(0, 5)}</span>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <div className="chat-sidebar__files" id="attachedFiles">
                                    <h3 className="chat-sidebar__files-title">첨부된 파일 ({attachedFiles.length}개)</h3>
                                    {attachedFiles.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: 'var(--space-3)', color: 'var(--text-tertiary)', fontSize: '11px' }}>
                                            📁<br />첨부된 파일이 없습니다
                                        </div>
                                    ) : (
                                        attachedFiles.map((file, index) => (
                                            <div key={index} className="attached-file">
                                                <div className="attached-file__icon">📄</div>
                                                <div className="attached-file__info">
                                                    <div className="attached-file__name">{getDisplayName(file.name || file.documentName)}</div>
                                                    <div className="attached-file__size">
                                                        {file.size ? formatFileSize(file.size) : (file.chunk_count ? `${file.chunk_count} 청크` : '')}
                                                        {file.isDocument && <span style={{ marginLeft: '4px', color: 'var(--primary-600)', fontSize: '10px' }}>지식베이스</span>}
                                                    </div>
                                                </div>
                                                <button className="attached-file__remove" onClick={() => removeFile(index)}>✕</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </aside>

                            {/* 중앙: 대화 영역 */}
                            <section className="chat-main" id="chatMain" style={{ position: 'relative' }}>
                                <button
                                    className={`sidebar-toggle-btn ${isSidebarCollapsed ? 'sidebar-toggle-btn--collapsed' : ''}`}
                                    id="sidebarToggleBtn"
                                    onClick={toggleChatSidebar}
                                >
                                    <span className="sidebar-toggle-btn__icon">{isSidebarCollapsed ? '▶' : '◀'}</span>
                                </button>

                                {/* 단일 모델 선택 시 (1개) */}
                                {selectedModels.length === 1 && (
                                    <>
                                        <div className="chat-main__header" id="singleHeader">
                                            <div className="chat-main__title">
                                                <span>
                                                    {projectList.find(p => p.project_id === sessions.find(s => s.session_id === currentSession)?.project_id)?.name || ''}
                                                </span>
                                                {sessions.find(s => s.session_id === currentSession)?.title && (
                                                    <span className="chat-main__badge">{sessions.find(s => s.session_id === currentSession)?.title || ''}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="chat-messages" id="chatMessages">
                                            {showEmptyState && currentMessages.length === 0 ? (
                                                <div className="empty-state">
                                                    <h3 className="empty-state__title">새로운 채팅를 시작하세요</h3>
                                                    <p className="empty-state__desc">AI 모델을 선택하고 메시지를 입력하세요.
                                                        여러 모델을 선택하면 비교 모드가 활성화됩니다.</p>

                                                </div>
                                            ) : (
                                                currentMessages.map((msg, index) => (
                                                    <div key={index} className={`chat-message ${msg.type === 'user' ? 'chat-message--user' : 'chat-message--assistant'}`}>
                                                        <div className="chat-message__avatar">
                                                            {msg.type === 'user' ? `${myprofile?.full_name.charAt(0)}` : '🤖'}
                                                        </div>
                                                        <div className="chat-message__content">
                                                            <div className="chat-message__bubble">
                                                                <div className="chat-message__text">{msg.content}</div>
                                                            </div>
                                                            <div className="chat-message__meta">
                                                                <span className="chat-message__time">{msg.time}</span>
                                                                {msg.type === 'assistant' && msg.modelName && (
                                                                    <span className="chat-message__model" >
                                                                        {msg.modelName}
                                                                    </span>
                                                                )}
                                                                {msg.type === 'assistant' && msg.latency && (
                                                                    <span className="chat-message__latency" style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>
                                                                        {msg.latency}ms
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                            {isGenerating && (
                                                <div className="chat-message chat-message--assistant chat-message--loading">
                                                    <div className="chat-message__avatar">🤖</div>
                                                    <div className="chat-message__content">
                                                        <div className="chat-message__bubble">
                                                            <div className="typing-indicator">
                                                                <div className="typing-indicator__dot"></div>
                                                                <div className="typing-indicator__dot"></div>
                                                                <div className="typing-indicator__dot"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div ref={messagesEndRef} />
                                        </div>
                                    </>
                                )}

                                {/* 여러 모델 선택 시 (2개 이상) */}
                                {selectedModels.length >= 2 && (
                                    <div className="chat-main--compare" id="compareContainer">
                                        {comparePanels.map((modelName) => {
                                            // const model = Assistant.find(m => m.id === modelId);
                                            // const modelName = model?.model_name || 'Unknown Model';
                                            const messages = compareMessages[modelName] || [];
                                            const hasMessages = messages.length > 0;

                                            return (
                                                <div key={modelName} className="compare-panel" data-model={modelName}>
                                                    <div className="compare-panel__header">
                                                        <div className="compare-panel__model">
                                                            <div className="compare-panel__model-icon" >
                                                                🤖
                                                            </div>
                                                            <div className="compare-panel__model-name">{modelName}</div>
                                                        </div>
                                                    </div>
                                                    <div className="compare-panel__messages">
                                                        {!hasMessages ? (
                                                            <div className="empty-state" style={{ padding: 'var(--space-6)' }}>
                                                                <div className="empty-state__desc" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                                                    {modelName} 응답이 여기에 표시됩니다
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {messages.map((msg, index) => (
                                                                    <div key={index} className={`chat-message ${msg.type === 'user' ? 'chat-message--user' : 'chat-message--assistant'}`}>
                                                                        <div className="chat-message__avatar">
                                                                            {msg.type === 'user' ? `${myprofile?.full_name.charAt(0)}` : '🤖'}
                                                                        </div>
                                                                        <div className="chat-message__content">
                                                                            <div className="chat-message__bubble">
                                                                                <div className="chat-message__text">{msg.content}</div>
                                                                            </div>
                                                                            <div className="chat-message__meta">
                                                                                <span className="chat-message__time">{msg.time}</span>
                                                                                {msg.type === 'assistant' && msg.modelName && (
                                                                                    <span className="chat-message__model">
                                                                                        {msg.modelName}
                                                                                    </span>
                                                                                )}
                                                                                {msg.type === 'assistant' && msg.latency && (
                                                                                    <span className="chat-message__latency" style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>
                                                                                        {msg.latency}ms
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {isGenerating && (
                                                                    <div className="chat-message chat-message--assistant chat-message--loading">
                                                                        <div className="chat-message__avatar">🤖</div>
                                                                        <div className="chat-message__content">
                                                                            <div className="chat-message__bubble">
                                                                                <div className="typing-indicator">
                                                                                    <div className="typing-indicator__dot"></div>
                                                                                    <div className="typing-indicator__dot"></div>
                                                                                    <div className="typing-indicator__dot"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div ref={el => compareMessagesRefs.current[modelName] = el} />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="chat-input-wrapper">
                                    <div className="chat-input" id="chatInput">
                                        <div className="chat-input__textarea-wrapper">
                                            <button
                                                className="chat-input__plus-btn"
                                                id="plusBtn"
                                                ref={plusBtnRef}
                                                onClick={togglePlusMenu}
                                            >
                                                <span>➕</span>
                                            </button>
                                            <textarea
                                                className="chat-input__textarea"
                                                id="messageInput"
                                                ref={messageInputRef}
                                                value={messageInput}
                                                onChange={(e) => {
                                                    setMessageInput(e.target.value);
                                                    autoResize(e.target);
                                                }}
                                                onKeyDown={handleKeyDown}
                                                placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈, Enter로 전송)"
                                                rows="2"
                                            />
                                        </div>

                                        {/* Plus Menu Dropdown */}
                                        {showPlusMenu && (
                                            <div className="plus-menu" id="plusMenu" ref={plusMenuRef}>
                                                {plusMenuView === 'main' && (
                                                    <div id="mainMenu">
                                                        <button className="plus-menu__item" onClick={showProjectMenu}>
                                                            <span className="plus-menu__icon">📁</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">프로젝트 선택</div>
                                                                <div className="plus-menu__desc">작업할 프로젝트 변경</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>

                                                        <div className="plus-menu__divider"></div>

                                                        <button className="plus-menu__item" onClick={showAgentMenu}>
                                                            <span className="plus-menu__icon">👨‍💻</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">AI 에이전트</div>
                                                                <div className="plus-menu__desc">AI 에이전트 선택 및 관리</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>
                                                        <button className="plus-menu__item" onClick={showKnowledgeMenu}>
                                                            <span className="plus-menu__icon">📚</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">지식베이스</div>
                                                                <div className="plus-menu__desc">지식베이스에서 선택</div>
                                                            </div>
                                                            <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>›</span>
                                                        </button>
                                                        <button className="plus-menu__item" onClick={uploadFile}>
                                                            <span className="plus-menu__icon">📎</span>
                                                            <div className="plus-menu__text">
                                                                <div className="plus-menu__title">파일 첨부</div>
                                                                <div className="plus-menu__desc">현재 채팅에 파일 첨부</div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                )}

                                                {plusMenuView === 'project' && (
                                                    <div id="projectMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">프로젝트 선택</span>
                                                        </div>
                                                        <div id="plusMenuProjects">
                                                            {projectList && projectList.length > 0 ? (
                                                                projectList.map(project => (
                                                                    <div
                                                                        key={project.project_id}
                                                                        className={`plus-menu__project-item ${project.name === currentProject ? 'plus-menu__project-item--active' : ''}`}
                                                                        onClick={() => selectProjectFromPlusMenu(project)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        <div className="plus-menu__project-icon" style={{ background: `${project.color}20`, color: project.color }}>
                                                                            📁
                                                                        </div>
                                                                        <div className="plus-menu__project-name">{project.name} ({project.description})</div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="plus-menu__empty">프로젝트가 없습니다</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {plusMenuView === 'agent' && (
                                                    <div id="agentMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">AI 에이전트</span>
                                                        </div>
                                                        <div className="plus-menu__empty">
                                                            Phase 2에서 구현 예정입니다
                                                        </div>
                                                    </div>
                                                )}

                                                {plusMenuView === 'knowledge' && (
                                                    <div id="knowledgeMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">지식베이스</span>
                                                        </div>
                                                        <div id="plusMenuKnowledge" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                            {documents && documents.length > 0 ? (
                                                                documents.map(document => (
                                                                    <div
                                                                        key={document.knowledge_id}
                                                                        className="plus-menu__item"
                                                                        onClick={() => addDocumentToAttached(document)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        <span className="plus-menu__icon">📄</span>
                                                                        <div className="plus-menu__text">
                                                                            <div className="plus-menu__title">{getDisplayName(document.name)}</div>
                                                                            <div className="plus-menu__desc">
                                                                                {formatFileSize(document.file_size_bytes)} · {document.chunk_count} 청크
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="plus-menu__empty">
                                                                    등록된 문서가 없습니다. 문서를 등록해주세요.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {plusMenuView === 'integration' && (
                                                    <div id="integrationMenu">
                                                        <div className="plus-menu__header">
                                                            <button className="plus-menu__back" onClick={showMainMenu}>
                                                                <span>‹</span>
                                                            </button>
                                                            <span className="plus-menu__header-title">외부 연동</span>
                                                        </div>
                                                        <div className="plus-menu__empty">
                                                            Phase 2에서 구현 예정입니다
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="chat-input__footer">
                                            <div className="chat-input__info">
                                                <div className="chat-input__cost">
                                                    <span>예상:</span>
                                                    <span className="chat-input__cost-value">$0.02</span>
                                                </div>
                                                <span>~200 tokens</span>
                                            </div>
                                            <button
                                                className="chat-input__send"
                                                id="sendBtn"
                                                onClick={sendMessage}
                                                disabled={isGenerating}
                                            >
                                                <span>전송</span>
                                                <span>⏎</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="chat-input__shortcuts">
                                        💡 Cmd+K 입력 지우기 · Cmd+/ 명령어
                                    </div>
                                </div>
                            </section>

                            {/* 우측: 모델 선택 패널 */}
                            <aside className="model-panel" id="modelPanel">
                                <div className="model-panel__header">
                                    <h2 className="model-panel__title">LLM 모델</h2>
                                </div>

                                <div className="model-panel__body">
                                    <div className="selected-model-display" id="selectedModelDisplay">
                                        <div className="selected-model-display__label">현재 선택</div>
                                        {/* <button
                                            className={`selected-model-display__button ${showModelDropdown ? 'open' : ''}`}
                                            ref={modelDisplayRef}
                                            onClick={toggleModelDropdown}
                                        >
                                            <span className="selected-model-display__icon" >
                                                🤖
                                            </span>
                                            <span className="selected-model-display__text">{selectedDisplay.text}</span>
                                            <span className="selected-model-display__arrow">▼</span>
                                        </button> */}
                                    </div>

                                    {/* {showModelDropdown && ( */}
                                    <div className="model-selector-dropdown" id="modelDropdown" ref={modelDropdownRef}>
                                        {Assistant.map((model) => {
                                            const isAllowed = Array.isArray(allowedModelIds) && allowedModelIds.includes(model.id);
                                            return (
                                                <label
                                                    key={model.id}
                                                    className={`model-selector-dropdown__item ${selectedModels.includes(model.id) ? 'model-selector-dropdown__item--selected' : ''
                                                        }`}
                                                    style={{ opacity: !isAllowed ? 0.5 : 1 }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="model-checkbox-input"
                                                        value={model.id}
                                                        checked={selectedModels.includes(model.model_name)}
                                                        onChange={(e) => handleModelCheckboxChange(model.model_name, e.target.checked)}
                                                        disabled={!isAllowed}
                                                    />
                                                    <div
                                                        className={`model-selector-dropdown__icon ${model.iconClass || ''}`}
                                                        style={model.iconStyle || {}}
                                                    >
                                                        🤖
                                                    </div>
                                                    <div className="model-selector-dropdown__info">
                                                        <div className="model-selector-dropdown__name">{model.model_name}</div>
                                                        <div className="model-selector-dropdown__desc">{model.provider}</div>
                                                    </div>
                                                    <span className="model-selector-dropdown__check">
                                                        {selectedModels.includes(model.id) ? '✓' : ''}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {/* )} */}
                                </div>
                            </aside>


                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

function getDisplayName(originName) {
    const parts = originName.split("_");
    return parts.slice(2).join("_");
}