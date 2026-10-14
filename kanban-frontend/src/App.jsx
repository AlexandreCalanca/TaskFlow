import React, { useState, useEffect, useRef, useMemo } from 'react';

import {

  ChevronDown,

  ChevronUp,

  MoreVertical,

  Plus,

  X,

  Sun,

  Moon,

  Eye,

  EyeOff,

  Check,

  Columns,

  Trash2,

  Edit,

  AlertCircle

} from 'lucide-react';



const INITIAL_DATA = {

  boards: [

    {

      id: 'board-1',

      name: 'Lançamento de Plataforma',

      columns: [

        {

          id: 'col-todo',

          name: 'A Fazer',

          color: '#49C4E5',

          tasks: [

            {

              id: 'task-1',

              title: 'Construir UI para o fluxo de integração',

              description: 'Telas de cadastro e boas-vindas para novos usuários, incluindo detalhes da empresa e configuração do espaço de trabalho.',

              status: 'col-todo',

              subtasks: [

                { id: 'sub-1', title: 'Página de cadastro', isCompleted: true },

                { id: 'sub-2', title: 'Página de login', isCompleted: false },

                { id: 'sub-3', title: 'Tela de boas-vindas', isCompleted: false }

              ]

            },

            {

              id: 'task-2',

              title: 'Desenvolver controles de busca e filtragem',

              description: 'Implementar barra de busca responsiva com filtragem em tempo real e tags de status.',

              status: 'col-todo',

              subtasks: [

                { id: 'sub-4', title: 'Componente do campo de busca', isCompleted: false }

              ]

            },

            {

              id: 'task-3',

              title: 'Construir interface de configurações',

              description: 'Configurações de perfil, preferências de conta, alternância de tema e detalhes de faturamento.',

              status: 'col-todo',

              subtasks: [

                { id: 'sub-5', title: 'Aba de Conta', isCompleted: false },

                { id: 'sub-6', title: 'Aba de Faturamento', isCompleted: false }

              ]

            },

            {

              id: 'task-4',

              title: 'QA e teste de todas as jornadas de usuário',

              description: 'Verificar cadastro de ponta a ponta, criação de tarefas, atualizações e exclusões no Chrome, Safari e Firefox.',

              status: 'col-todo',

              subtasks: [

                { id: 'sub-7', title: 'Sessão de testes interna', isCompleted: false },

                { id: 'sub-8', title: 'Corrigir bugs de regressão relatados', isCompleted: false }

              ]

            }

          ]

        },

        {

          id: 'col-doing',

          name: 'Em Andamento',

          color: '#8471F2',

          tasks: [

            {

              id: 'task-5',

              title: 'Projetar páginas de configurações e busca',

              description: 'Wireframes de alta fidelidade no Figma com breakpoints para mobile, tablet e desktop.',

              status: 'col-doing',

              subtasks: [

                { id: 'sub-9', title: 'Configurações - Conta', isCompleted: true },

                { id: 'sub-10', title: 'Configurações - Faturamento', isCompleted: true },

                { id: 'sub-11', title: 'Modal de resultados de pesquisa', isCompleted: false }

              ]

            },

            {

              id: 'task-6',

              title: 'Adicionar endpoints de gerenciamento de conta',

              description: 'Endpoints REST API para atualizar nome, e-mail, URL do avatar e notificações do usuário.',

              status: 'col-doing',

              subtasks: [

                { id: 'sub-12', title: 'Atualizar middleware de autenticação', isCompleted: true },

                { id: 'sub-13', title: 'Endpoint PUT de perfil', isCompleted: false },

                { id: 'sub-14', title: 'Endpoint para deletar conta', isCompleted: false }

              ]

            },

            {

              id: 'task-7',

              title: 'Projetar fluxo de onboarding',

              description: 'Definir estilos visuais de ilustrações e barra de progresso em etapas.',

              status: 'col-doing',

              subtasks: [

                { id: 'sub-15', title: 'Modal de boas-vindas', isCompleted: true },

                { id: 'sub-16', title: 'Etapa 1: Dados da organização', isCompleted: false },

                { id: 'sub-17', title: 'Etapa 2: Convite de equipe', isCompleted: false }

              ]

            }

          ]

        },

        {

          id: 'col-done',

          name: 'Concluído',

          color: '#67E2AE',

          tasks: [

            {

              id: 'task-8',

              title: 'Realizar testes de usabilidade do wireframe',

              description: 'Garantir navegação intuitiva e clareza com 6 participantes externos.',

              status: 'col-done',

              subtasks: [

                { id: 'sub-18', title: 'Completar 5 testes de usabilidade', isCompleted: true }

              ]

            },

            {

              id: 'task-9',

              title: 'Criar protótipo interativo',

              description: 'Protótipo navegável para validação inicial de hipóteses e alinhamento com stakeholders.',

              status: 'col-done',

              subtasks: [

                { id: 'sub-19', title: 'Configurar transições no Figma', isCompleted: true }

              ]

            },

            {

              id: 'task-10',

              title: 'Revisar feedback dos testes e iterar',

              description: 'Avaliar gravações das sessões e mitigar principais pontos de atrito identificados.',

              status: 'col-done',

              subtasks: [

                { id: 'sub-20', title: 'Alinhar melhorias com líder de design', isCompleted: true },

                { id: 'sub-21', title: 'Atualizar biblioteca de componentes', isCompleted: true },

                { id: 'sub-22', title: 'Publicar especificação da v1.1', isCompleted: true }

              ]

            }

          ]

        }

      ]

    },

    {

      id: 'board-2',

      name: 'Plano de Marketing',

      columns: [

        {

          id: 'col-mkt-todo',

          name: 'A Fazer',

          color: '#49C4E5',

          tasks: [

            {

              id: 'task-m1',

              title: 'Planejar campanha de lançamento no Product Hunt',

              description: 'Preparar criativos, copywriting, comentários de criadores e estratégia de divulgação.',

              status: 'col-mkt-todo',

              subtasks: [

                { id: 'sub-m1', title: 'Escrever chamadas e descrições', isCompleted: false },

                { id: 'sub-m2', title: 'Criar animações em GIF de prévia', isCompleted: false }

              ]

            }

          ]

        },

        {

          id: 'col-mkt-doing',

          name: 'Em Andamento',

          color: '#8471F2',

          tasks: [

            {

              id: 'task-m2',

              title: 'Redigir artigos de anúncio otimizados para SEO',

              description: 'Focar em palavras-chave de alta intenção sobre produtividade e gestão ágil de projetos.',

              status: 'col-mkt-doing',

              subtasks: [

                { id: 'sub-m3', title: 'Pesquisa de termos e palavras-chave', isCompleted: true },

                { id: 'sub-m4', title: 'Rascunhar primeiro post do blog', isCompleted: false }

              ]

            }

          ]

        },

        {

          id: 'col-mkt-done',

          name: 'Concluído',

          color: '#67E2AE',

          tasks: [

            {

              id: 'task-m3',

              title: 'Aprovação de paleta e tipografia da marca',

              description: 'Guia de tokens de cores e escala tipográfica pronto para handoff com desenvolvedores.',

              status: 'col-mkt-done',

              subtasks: [

                { id: 'sub-m5', title: 'Checar contraste e acessibilidade WCAG', isCompleted: true }

              ]

            }

          ]

        }

      ]

    },

    {

      id: 'board-3',

      name: 'Roteiro de Produto',

      columns: [

        {

          id: 'col-rd-now',

          name: 'Agora',

          color: '#49C4E5',

          tasks: [

            {

              id: 'task-r1',

              title: 'Sincronização em tempo real com WebSockets',

              description: 'Cursores compartilhados e atualização instantânea de tarefas entre sessões conectadas.',

              status: 'col-rd-now',

              subtasks: [

                { id: 'sub-r1', title: 'Definição de protocolo e mensagens', isCompleted: false }

              ]

            }

          ]

        },

        {

          id: 'col-rd-next',

          name: 'A Seguir',

          color: '#8471F2',

          tasks: [

            {

              id: 'task-r2',

              title: 'Aplicativos Móveis Nativos (iOS/Android)',

              description: 'Avaliar React Native vs Flutter para desenvolvimento multiplataforma.',

              status: 'col-rd-next',

              subtasks: [

                { id: 'sub-r2', title: 'Elaborar matriz comparativa e spike técnico', isCompleted: false }

              ]

            }

          ]

        }

      ]

    }

  ]

};



const LogoIcon = () => (

  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">

    <rect width="6" height="25" rx="2" fill="#635FC7" />

    <rect opacity="0.75" x="9" width="6" height="25" rx="2" fill="#635FC7" />

    <rect opacity="0.5" x="18" width="6" height="25" rx="2" fill="#635FC7" />

  </svg>

);



const BoardIcon = ({ active }) => (

  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">

    <path

      d="M0 2.66667C0 1.19391 1.19391 0 2.66667 0H13.3333C14.8061 0 16 1.19391 16 2.66667V13.3333C16 14.8061 14.8061 16 13.3333 16H2.66667C1.19391 16 0 14.8061 0 13.3333V2.66667ZM2.66667 2.66667V13.3333H6.66667V2.66667H2.66667ZM9.33333 2.66667V7.33333H13.3333V2.66667H9.33333ZM13.3333 10H9.33333V13.3333H13.3333V10Z"

      fill={active ? '#FFFFFF' : '#828FA3'}

    />

  </svg>

);



export default function App() {

  // State Initialization

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  const [data, setData] = useState({ boards: [] });
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('kanban_theme') === 'dark');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [boardModalMode, setBoardModalMode] = useState(null);
  const [deleteModalConfig, setDeleteModalConfig] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColId, setDragOverColId] = useState(null);
  const COLOR_SET = ['#49C4E5','#8471F2','#67E2AE','#FF7F50','#E5A449','#9333EA'];

  const api = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
    });
    if (!response.ok) {
      let detail = '';
      try { detail = await response.text(); } catch {}
      throw new Error(`HTTP ${response.status}: ${detail.slice(0, 150)}`);
    }
    return response.status === 204 ? null : response.json();
  };

  const normalize = (boards) => boards.map(b => ({
    ...b,
    columns: [...(b.columns || [])].sort((a,z) => a.position - z.position).map((c,i) => ({
      ...c, color: COLOR_SET[i % COLOR_SET.length],
      tasks: [...(c.tasks || [])].sort((a,z) => a.position - z.position).map(t => ({
        ...t, status: c.id,
        subtasks: [...(t.subtasks || [])].sort((a,z) => a.position - z.position)
      }))
    }))
  }));

  const refresh = async (select = null) => {
    const remote = await api('/boards');
    const boards = normalize(remote);
    setData({ boards });
    setActiveBoardId(prev => (select != null && boards.some(b => b.id === select)) ? select :
      boards.some(b => b.id === prev) ? prev : boards[0]?.id ?? null);
    return boards;
  };

  useEffect(() => {
    let alive = true;
    api('/boards').then(remote => {
      if (!alive) return;
      const boards = normalize(remote);
      setData({ boards });
      setActiveBoardId(boards[0]?.id ?? null);
    }).catch(e => { if (alive) setError(`Não foi possível conectar ao Spring Boot: ${e.message}`); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);
  useEffect(() => { localStorage.setItem('kanban_theme',darkMode ? 'dark':'light'); }, [darkMode]);
  const currentBoard = useMemo(() => data.boards.find(b => b.id === activeBoardId) || data.boards[0] || null, [data, activeBoardId]);
  useEffect(() => {
    if (!activeTaskModal) return;
    const found = currentBoard?.columns.flatMap(c => c.tasks).find(t => t.id === activeTaskModal.id);
    if (!found) setActiveTaskModal(null);
    else if (found !== activeTaskModal) setActiveTaskModal(found);
  }, [data]);

  const perform = async (action, success, select = currentBoard?.id) => {
    setError('');
    try { await action(); await refresh(select); if (success) setNotice(success); }
    catch (e) { setError(e.message); }
  };
  const unsupported = (kind) => setNotice(`${kind} ainda depende de um endpoint no Spring Boot. A interface original foi preservada e esta operação não alterou os dados.`);

  const handleToggleSubtask = async (taskId, subtaskId) =>
    perform(() => api(`/tasks/subtasks/${subtaskId}/toggle`, { method: 'PATCH' }));

  const handleChangeTaskStatus = async (task, newColId) => {
    if (String(task.status) === String(newColId)) return;
    await perform(() => api(`/tasks/${task.id}/move`, {
      method: 'PATCH', body: JSON.stringify({ targetColumnId: Number(newColId), newPosition: 1 })
    }));
  };

  const handleSaveTask = async (payload, isEditing = false) => {
    if (isEditing) return unsupported('Editar tarefa');
    await perform(() => api('/tasks', {
      method: 'POST', body: JSON.stringify({
        columnId: Number(payload.status), title: payload.title,
        description: payload.description,
        subtasks: payload.subtasks.map(s => s.title)
      })
    }), 'Tarefa criada com sucesso!');
  };

  const handleDeleteTask = async (id) => {
    await perform(() => api(`/tasks/${id}`, { method: 'DELETE' }), 'Tarefa excluída.');
    setActiveTaskModal(null); setDeleteModalConfig(null);
  };

  const handleSaveBoard = async (payload, isEditing = false) => {
    if (isEditing) return unsupported('Editar quadro ou colunas');
    setError('');
    try {
      const created = await api('/boards', { method:'POST', body: JSON.stringify({ name:payload.name }) });
      await refresh(created.id);
      setBoardModalMode(null);
      setMobileMenuOpen(false);
      setNotice('Quadro criado com as três colunas padrão do back-end.');
    } catch (e) { setError(e.message); }
  };

  const handleDeleteBoard = async (id) => {
    await perform(() => api(`/boards/${id}`, {method:'DELETE'}), 'Quadro excluído.', null);
    setDeleteModalConfig(null); setHeaderMenuOpen(false);
  };

  const handleDragStart = (e, taskId) => {

    e.dataTransfer.setData('text/plain', taskId);

    setDraggedTaskId(taskId);

  };



  const handleDragOver = (e, colId) => {

    e.preventDefault();

    if (dragOverColId !== colId) {

      setDragOverColId(colId);

    }

  };



  const handleDrop = (e, targetColId) => {

    e.preventDefault();

    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;

    setDraggedTaskId(null);

    setDragOverColId(null);



    if (!taskId) return;



    // Find the task

    let taskToMove = null;

    for (const col of currentBoard.columns) {

      const found = col.tasks.find((t) => t.id === taskId);

      if (found) {

        taskToMove = found;

        break;

      }

    }



    if (taskToMove && taskToMove.status !== targetColId) {

      handleChangeTaskStatus(taskToMove, targetColId);

    }

  };



  const themeClasses = darkMode ? 'dark bg-[#20212C] text-white' : 'bg-[#F4F7FD] text-[#000112]';



  return (

    <div className={`min-h-screen font-sans flex flex-col antialiased selection:bg-[#635FC7] selection:text-white ${themeClasses}`}>

      {}

      <header

        className={`h-20 sm:h-24 px-4 sm:px-6 md:px-8 border-b flex items-center justify-between shrink-0 transition-colors z-20 ${

          darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'

        }`}

      >

        {/* Left: Brand & Mobile Title / Switcher */}

        <div className="flex items-center gap-4 sm:gap-6">

          <div className="flex items-center gap-3">

            <LogoIcon />

            <span

              className={`hidden md:inline-block font-extrabold text-2xl tracking-wide ${

                darkMode ? 'text-white' : 'text-[#000112]'

              }`}

            >

              kanban

            </span>

          </div>



          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-[#3E3F4E] mx-2" />



          {/* Board Title (Desktop plain text, Mobile dropdown toggle) */}

          <div className="relative">

            <button

              onClick={() => setMobileMenuOpen((v) => !v)}

              className="flex md:hidden items-center gap-2 text-left focus:outline-none group"

              aria-label="Alternar quadro"

            >

              <h1 className="font-bold text-lg sm:text-xl truncate max-w-[180px] sm:max-w-xs group-hover:text-[#635FC7] transition-colors">

                {currentBoard ? currentBoard.name : 'Nenhum Quadro Encontrado'}

              </h1>

              {mobileMenuOpen ? (

                <ChevronUp className="w-5 h-5 text-[#635FC7]" />

              ) : (

                <ChevronDown className="w-5 h-5 text-[#635FC7]" />

              )}

            </button>



            <h1 className="hidden md:block font-bold text-2xl truncate max-w-sm lg:max-w-md xl:max-w-lg">

              {currentBoard ? currentBoard.name : 'Nenhum Quadro Encontrado'}

            </h1>

          </div>

        </div>



        {/* Right: Actions */}

        <div className="flex items-center gap-3 sm:gap-4 relative">

          <button

            onClick={() => setAddTaskModalOpen(true)}

            disabled={!currentBoard || currentBoard.columns.length === 0}

            className="flex items-center justify-center gap-2 bg-[#635FC7] hover:bg-[#A8A4FF] disabled:opacity-40 disabled:hover:bg-[#635FC7] disabled:cursor-not-allowed text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 text-sm sm:text-base"

          >

            <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />

            <span className="hidden sm:inline">+ Nova Tarefa</span>

          </button>



          {/* Header 3-Dots Menu */}

          <div className="relative">

            <button

              onClick={() => setHeaderMenuOpen((v) => !v)}

              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#20212C] text-[#828FA3] hover:text-[#000112] dark:hover:text-white transition-colors"

              aria-label="Opções do quadro"

            >

              <MoreVertical className="w-5 h-5" />

            </button>



            {headerMenuOpen && (

              <div

                className={`absolute right-0 mt-3 w-48 rounded-xl shadow-xl border py-2 z-50 text-sm font-medium animate-in fade-in zoom-in-95 ${

                  darkMode ? 'bg-[#20212C] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'

                }`}

              >

                <button

                  onClick={() => {

                    setHeaderMenuOpen(false);

                    unsupported('Editar quadro ou colunas');

                  }}

                  disabled={!currentBoard}

                  className="w-full text-left px-4 py-2.5 hover:bg-[#635FC7]/10 text-[#828FA3] hover:text-[#635FC7] transition-colors flex items-center gap-2 disabled:opacity-50"

                >

                  <Edit className="w-4 h-4" />

                  Editar Quadro

                </button>

                <button

                  onClick={() => {

                    setHeaderMenuOpen(false);

                    if (currentBoard) {

                      setDeleteModalConfig({ type: 'board', item: currentBoard });

                    }

                  }}

                  disabled={!currentBoard}

                  className="w-full text-left px-4 py-2.5 hover:bg-[#EA5555]/10 text-[#EA5555] transition-colors flex items-center gap-2 disabled:opacity-50"

                >

                  <Trash2 className="w-4 h-4" />

                  Excluir Quadro

                </button>

              </div>

            )}

          </div>

        </div>

      </header>



      {}

      {(error || notice) && <div className={`flex items-center justify-between px-5 py-3 text-sm font-semibold ${error ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`} role="status"><span>{error || notice}</span><button onClick={() => {setError('');setNotice('')}} aria-label="Fechar aviso"><X size={18}/></button></div>}
      {loading && <div className="px-5 py-3 text-sm text-[#828FA3]">Carregando quadros do PostgreSQL...</div>}
      <div className="flex flex-1 overflow-hidden relative">

        {/* DESKTOP SIDEBAR */}

        <aside

          className={`hidden md:flex flex-col border-r transition-all duration-300 ease-in-out shrink-0 ${

            sidebarVisible ? 'w-64 lg:w-72' : 'w-0 -translate-x-full overflow-hidden'

          } ${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'}`}

        >

          {/* Boards List */}

          <div className="py-6 flex-1 flex flex-col justify-between overflow-y-auto">

            <div>

              <p className="px-6 text-xs font-bold tracking-widest text-[#828FA3] uppercase mb-4">

                TODOS OS QUADROS ({data.boards.length})

              </p>



              <div className="space-y-1 pr-6">

                {data.boards.map((b) => {

                  const isActive = b.id === currentBoard?.id;

                  return (

                    <button

                      key={b.id}

                      onClick={() => setActiveBoardId(b.id)}

                      className={`w-full flex items-center gap-3.5 px-6 py-3.5 rounded-r-full text-sm font-bold transition-all text-left group ${

                        isActive

                          ? 'bg-[#635FC7] text-white shadow-sm'

                          : 'text-[#828FA3] hover:bg-[#635FC7]/10 hover:text-[#635FC7]'

                      }`}

                    >

                      <BoardIcon active={isActive} />

                      <span className="truncate">{b.name}</span>

                    </button>

                  );

                })}



                <button

                  onClick={() => setBoardModalMode('add')}

                  className="w-full flex items-center gap-3 px-6 py-3.5 rounded-r-full text-sm font-bold text-[#635FC7] hover:bg-[#635FC7]/10 transition-colors"

                >

                  <BoardIcon active={false} />

                  <span className="flex items-center gap-1">

                    <Plus className="w-4 h-4" /> Criar Novo Quadro

                  </span>

                </button>

              </div>

            </div>



            {/* Bottom Controls: Theme Toggle & Hide Sidebar */}

            <div className="px-5 space-y-3 pt-6">

              {/* Theme Switcher Widget */}

              <div

                className={`p-3 rounded-lg flex items-center justify-center gap-6 ${

                  darkMode ? 'bg-[#20212C]' : 'bg-[#F4F7FD]'

                }`}

              >

                <Sun className={`w-5 h-5 ${!darkMode ? 'text-[#828FA3]' : 'text-[#828FA3]'}`} />

                <button

                  onClick={() => setDarkMode((prev) => !prev)}

                  className="w-11 h-6 bg-[#635FC7] hover:bg-[#A8A4FF] rounded-full p-1 transition-colors relative focus:outline-none"

                  aria-label="Alternar tema"

                >

                  <div

                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow ${

                      darkMode ? 'translate-x-5' : 'translate-x-0'

                    }`}

                  />

                </button>

                <Moon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-[#828FA3]'}`} />

              </div>



              {/* Hide Sidebar Action */}

              <button

                onClick={() => setSidebarVisible(false)}

                className="w-full flex items-center gap-3 px-4 py-3 rounded-r-full text-sm font-bold text-[#828FA3] hover:text-[#635FC7] hover:bg-[#635FC7]/10 transition-colors"

              >

                <EyeOff className="w-4 h-4" />

                Ocultar Barra Lateral

              </button>

            </div>

          </div>

        </aside>



        {/* Floating Show Sidebar Button when hidden */}

        {!sidebarVisible && (

          <button

            onClick={() => setSidebarVisible(true)}

            className="hidden md:flex items-center justify-center w-14 h-12 bg-[#635FC7] hover:bg-[#A8A4FF] text-white rounded-r-full fixed bottom-8 left-0 z-30 shadow-lg transition-transform hover:w-16 active:scale-95"

            aria-label="Mostrar barra lateral"

            title="Mostrar Barra Lateral"

          >

            <Eye className="w-5 h-5" />

          </button>

        )}



        {/* MOBILE BOARD SWITCHER MODAL / POPUP */}

        {mobileMenuOpen && (

          <div

            className="md:hidden fixed inset-0 bg-black/50 z-40 flex justify-center items-start pt-24 px-8"

            onClick={() => setMobileMenuOpen(false)}

          >

            <div

              className={`w-full max-w-xs rounded-xl shadow-2xl py-4 overflow-hidden border ${

                darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'

              }`}

              onClick={(e) => e.stopPropagation()}

            >

              <p className="px-6 text-xs font-bold tracking-widest text-[#828FA3] uppercase mb-3">

                TODOS OS QUADROS ({data.boards.length})

              </p>

              <div className="space-y-1 pr-6 mb-4">

                {data.boards.map((b) => {

                  const isActive = b.id === currentBoard?.id;

                  return (

                    <button

                      key={b.id}

                      onClick={() => {

                        setActiveBoardId(b.id);

                        setMobileMenuOpen(false);

                      }}

                      className={`w-full flex items-center gap-3 px-6 py-3 rounded-r-full text-sm font-bold text-left transition-colors ${

                        isActive

                          ? 'bg-[#635FC7] text-white'

                          : 'text-[#828FA3] hover:bg-[#635FC7]/10 hover:text-[#635FC7]'

                      }`}

                    >

                      <BoardIcon active={isActive} />

                      <span className="truncate">{b.name}</span>

                    </button>

                  );

                })}



                <button

                  onClick={() => {

                    setMobileMenuOpen(false);

                    setBoardModalMode('add');

                  }}

                  className="w-full flex items-center gap-3 px-6 py-3 rounded-r-full text-sm font-bold text-[#635FC7]"

                >

                  <BoardIcon active={false} />

                  <span>+ Criar Novo Quadro</span>

                </button>

              </div>



              {/* Theme toggle mobile */}

              <div className="px-6 pt-2">

                <div

                  className={`p-3 rounded-lg flex items-center justify-center gap-6 ${

                    darkMode ? 'bg-[#20212C]' : 'bg-[#F4F7FD]'

                  }`}

                >

                  <Sun className="w-5 h-5 text-[#828FA3]" />

                  <button

                    onClick={() => setDarkMode((v) => !v)}

                    className="w-11 h-6 bg-[#635FC7] rounded-full p-1 relative"

                    aria-label="Alternar tema mobile"

                  >

                    <div

                      className={`w-4 h-4 bg-white rounded-full transition-transform ${

                        darkMode ? 'translate-x-5' : 'translate-x-0'

                      }`}

                    />

                  </button>

                  <Moon className="w-5 h-5 text-[#828FA3]" />

                </div>

              </div>

            </div>

          </div>

        )}



        {}

        <main className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6 md:p-8 flex gap-6 select-none">

          {currentBoard && currentBoard.columns.length > 0 ? (

            <>

              {currentBoard.columns.map((column) => {

                const isDragOver = dragOverColId === column.id;

                return (

                  <section

                    key={column.id}

                    onDragOver={(e) => handleDragOver(e, column.id)}

                    onDrop={(e) => handleDrop(e, column.id)}

                    className={`w-72 sm:w-80 shrink-0 flex flex-col transition-colors rounded-xl p-1.5 ${

                      isDragOver ? 'bg-[#635FC7]/10 ring-2 ring-[#635FC7]/50 border-dashed' : ''

                    }`}

                  >

                    {/* Column Header */}

                    <div className="flex items-center gap-3 mb-5 px-1">

                      <span

                        className="w-3.5 h-3.5 rounded-full shrink-0"

                        style={{ backgroundColor: column.color || '#49C4E5' }}

                      />

                      <h2 className="text-xs font-bold tracking-widest uppercase text-[#828FA3] truncate">

                        {column.name} ({column.tasks.length})

                      </h2>

                    </div>



                    {/* Column Tasks List */}

                    <div className="flex-1 space-y-4 min-h-[300px]">

                      {column.tasks.map((task) => {

                        const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

                        const totalSubtasks = task.subtasks.length;



                        return (

                          <div

                            key={task.id}

                            draggable

                            onDragStart={(e) => handleDragStart(e, task.id)}

                            onClick={() => setActiveTaskModal(task)}

                            className={`p-5 rounded-lg shadow-sm cursor-grab active:cursor-grabbing group transition-all duration-150 transform hover:-translate-y-1 hover:shadow-md border ${

                              darkMode

                                ? 'bg-[#2B2C37] border-[#3E3F4E]/40 hover:border-[#635FC7]'

                                : 'bg-white border-transparent hover:border-[#635FC7]/40'

                            }`}

                          >

                            <h3

                              className={`font-bold text-base mb-2 group-hover:text-[#635FC7] transition-colors leading-snug ${

                                darkMode ? 'text-white' : 'text-[#000112]'

                              }`}

                            >

                              {task.title}

                            </h3>

                            <p className="text-xs font-bold text-[#828FA3]">

                              {completedSubtasks} de {totalSubtasks} subtarefas

                            </p>

                          </div>

                        );

                      })}



                      {/* Drop placeholder if empty */}

                      {column.tasks.length === 0 && (

                        <div

                          className={`h-40 border-2 border-dashed rounded-xl flex items-center justify-center text-xs font-bold text-[#828FA3] ${

                            darkMode ? 'border-[#3E3F4E]/50' : 'border-[#E4EBFA]'

                          }`}

                        >

                          Arraste uma tarefa aqui

                        </div>

                      )}

                    </div>

                  </section>

                );

              })}



              {/* + New Column CTA card */}

              <div className="w-72 sm:w-80 shrink-0 pt-9">

                <button

                  onClick={() => unsupported('Adicionar coluna')}

                  className={`w-full h-full min-h-[500px] rounded-xl flex flex-col items-center justify-center gap-2 font-bold text-xl sm:text-2xl transition-all duration-200 border-2 border-dashed ${

                    darkMode

                      ? 'bg-gradient-to-b from-[#2B2C37]/60 to-[#2B2C37]/20 border-[#3E3F4E] text-[#828FA3] hover:text-[#635FC7] hover:border-[#635FC7]'

                      : 'bg-gradient-to-b from-[#E9EFFA]/70 to-[#E9EFFA]/20 border-[#E4EBFA] text-[#828FA3] hover:text-[#635FC7] hover:border-[#635FC7]'

                  }`}

                >

                  <Plus className="w-7 h-7" />

                  + Nova Coluna

                </button>

              </div>

            </>

          ) : (

            /* EMPTY BOARD STATE */

            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">

              <Columns className="w-16 h-16 text-[#828FA3] mb-4 opacity-40" />

              <h2 className="text-lg font-bold text-[#828FA3] mb-6">

                Crie um quadro para começar. Cada quadro recebe três colunas automaticamente.

              </h2>

              <button

                onClick={() => unsupported('Adicionar coluna')}

                className="bg-[#635FC7] hover:bg-[#A8A4FF] text-white font-bold px-6 py-3.5 rounded-full transition-transform active:scale-95 flex items-center gap-2"

              >

                <Plus className="w-5 h-5" />

                + Adicionar Nova Coluna

              </button>

            </div>

          )}

        </main>

      </div>



      {}

      {activeTaskModal && (

        <TaskDetailModal

          task={activeTaskModal}

          columns={currentBoard?.columns || []}

          darkMode={darkMode}

          onClose={() => {

            setActiveTaskModal(null);

            setTaskMenuOpen(false);

          }}

          onToggleSubtask={(subId) => handleToggleSubtask(activeTaskModal.id, subId)}

          onChangeStatus={(newStatus) => handleChangeTaskStatus(activeTaskModal, newStatus)}

          onEdit={() => {

            setTaskToEdit(activeTaskModal);

            setActiveTaskModal(null);

            unsupported('Editar tarefa');

          }}

          onDelete={() => {

            setDeleteModalConfig({ type: 'task', item: activeTaskModal });

          }}

        />

      )}



      {}

      {(addTaskModalOpen || editTaskModalOpen) && (

        <TaskFormModal

          isOpen={addTaskModalOpen || editTaskModalOpen}

          isEditing={editTaskModalOpen}

          initialTask={taskToEdit}

          columns={currentBoard?.columns || []}

          darkMode={darkMode}

          onClose={() => {

            setAddTaskModalOpen(false);

            setEditTaskModalOpen(false);

            setTaskToEdit(null);

          }}

          onSave={(payload) => {

            handleSaveTask(payload, editTaskModalOpen);

            setAddTaskModalOpen(false);

            setEditTaskModalOpen(false);

            setTaskToEdit(null);

          }}

        />

      )}



      {}

      {boardModalMode && (

        <BoardFormModal

          mode={boardModalMode}

          board={boardModalMode === 'edit' ? currentBoard : null}

          darkMode={darkMode}

          onClose={() => setBoardModalMode(null)}

          onSave={(payload) => handleSaveBoard(payload, boardModalMode === 'edit')}

        />

      )}



      {}

      {deleteModalConfig && (

        <DeleteConfirmModal

          config={deleteModalConfig}

          darkMode={darkMode}

          onClose={() => setDeleteModalConfig(null)}

          onConfirm={() => {

            if (deleteModalConfig.type === 'board') {

              handleDeleteBoard(deleteModalConfig.item.id);

            } else {

              handleDeleteTask(deleteModalConfig.item.id);

            }

          }}

        />

      )}

    </div>

  );

}



function TaskDetailModal({

  task,

  columns,

  darkMode,

  onClose,

  onToggleSubtask,

  onChangeStatus,

  onEdit,

  onDelete

}) {

  const [menuOpen, setMenuOpen] = useState(false);

  const completedCount = task.subtasks.filter((s) => s.isCompleted).length;

  const totalCount = task.subtasks.length;



  return (

    <div

      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"

      onClick={onClose}

    >

      <div

        className={`w-full max-w-lg rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative ${

          darkMode ? 'bg-[#2B2C37] text-white' : 'bg-white text-[#000112]'

        }`}

        onClick={(e) => e.stopPropagation()}

      >

        {/* Header row: Title and 3 dots */}

        <div className="flex items-start justify-between gap-4 mb-5">

          <h2 className="font-bold text-lg sm:text-xl leading-snug">{task.title}</h2>



          <div className="relative shrink-0">

            <button

              onClick={() => setMenuOpen((v) => !v)}

              className="p-1 rounded text-[#828FA3] hover:text-[#000112] dark:hover:text-white"

              aria-label="Opções da tarefa"

            >

              <MoreVertical className="w-5 h-5" />

            </button>



            {menuOpen && (

              <div

                className={`absolute right-0 mt-2 w-44 rounded-xl shadow-lg border py-2 z-20 text-sm font-medium ${

                  darkMode ? 'bg-[#20212C] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'

                }`}

              >

                <button

                  onClick={() => {

                    setMenuOpen(false);

                    onEdit();

                  }}

                  className="w-full text-left px-4 py-2 hover:bg-[#635FC7]/10 text-[#828FA3] hover:text-[#635FC7] flex items-center gap-2"

                >

                  <Edit className="w-4 h-4" />

                  Editar Tarefa

                </button>

                <button

                  onClick={() => {

                    setMenuOpen(false);

                    onDelete();

                  }}

                  className="w-full text-left px-4 py-2 hover:bg-[#EA5555]/10 text-[#EA5555] flex items-center gap-2"

                >

                  <Trash2 className="w-4 h-4" />

                  Excluir Tarefa

                </button>

              </div>

            )}

          </div>

        </div>



        {/* Task Description */}

        <p className="text-sm text-[#828FA3] leading-relaxed mb-6 font-medium">

          {task.description || 'Nenhuma descrição informada.'}

        </p>



        {/* Subtasks Section */}

        <div className="mb-6">

          <h3 className="text-xs font-bold tracking-wider text-[#828FA3] uppercase mb-4">

            Subtarefas ({completedCount} de {totalCount})

          </h3>



          <div className="space-y-2">

            {task.subtasks.map((sub) => (

              <label

                key={sub.id}

                className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors text-xs sm:text-sm font-bold ${

                  darkMode

                    ? 'bg-[#20212C] hover:bg-[#635FC7]/20 text-white'

                    : 'bg-[#F4F7FD] hover:bg-[#635FC7]/10 text-[#000112]'

                }`}

              >

                <div

                  className={`w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors ${

                    sub.isCompleted ? 'bg-[#635FC7]' : 'border border-[#828FA3]/50 bg-white dark:bg-[#2B2C37]'

                  }`}

                >

                  {sub.isCompleted && <Check className="w-3 h-3 text-white stroke-[3]" />}

                </div>



                <input

                  type="checkbox"

                  checked={sub.isCompleted}

                  onChange={() => onToggleSubtask(sub.id)}

                  className="sr-only"

                />



                <span

                  className={`flex-1 transition-all ${

                    sub.isCompleted ? 'line-through text-[#828FA3] opacity-60' : ''

                  }`}

                >

                  {sub.title}

                </span>

              </label>

            ))}

          </div>

        </div>



        {/* Current Status Dropdown */}

        <div>

          <label className="block text-xs font-bold tracking-wider text-[#828FA3] uppercase mb-2">

            Status Atual

          </label>

          <div className="relative">

            <select

              value={task.status}

              onChange={(e) => onChangeStatus(e.target.value)}

              className={`w-full appearance-none px-4 py-3 rounded border text-sm font-medium cursor-pointer focus:outline-none focus:border-[#635FC7] ${

                darkMode

                  ? 'bg-[#2B2C37] border-[#3E3F4E] text-white'

                  : 'bg-white border-[#E4EBFA] text-[#000112]'

              }`}

            >

              {columns.map((c) => (

                <option key={c.id} value={c.id} className={darkMode ? 'bg-[#2B2C37]' : 'bg-white'}>

                  {c.name}

                </option>

              ))}

            </select>

            <ChevronDown className="w-4 h-4 text-[#635FC7] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

          </div>

        </div>

      </div>

    </div>

  );

}



function TaskFormModal({ isOpen, isEditing, initialTask, columns, darkMode, onClose, onSave }) {

  const [title, setTitle] = useState(initialTask?.title || '');

  const [description, setDescription] = useState(initialTask?.description || '');

  const [status, setStatus] = useState(initialTask?.status || columns[0]?.id || '');

  const [subtasks, setSubtasks] = useState(

    initialTask?.subtasks?.map((s) => ({ ...s })) || [

      { id: 'sub-new-1', title: '', isCompleted: false },

      { id: 'sub-new-2', title: '', isCompleted: false }

    ]

  );

  const [errors, setErrors] = useState({});



  const handleSubtaskChange = (index, value) => {

    const updated = [...subtasks];

    updated[index].title = value;

    setSubtasks(updated);

  };



  const handleAddSubtask = () => {

    setSubtasks([...subtasks, { id: `sub-new-${Date.now()}`, title: '', isCompleted: false }]);

  };



  const handleRemoveSubtask = (index) => {

    setSubtasks(subtasks.filter((_, i) => i !== index));

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    const newErrors = {};



    if (!title.trim()) {

      newErrors.title = "Não pode ser vazio";

    }



    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);

      return;

    }



    // Filter out completely empty subtask inputs or assign default placeholder

    const cleanedSubtasks = subtasks

      .map((s) => ({ ...s, title: s.title.trim() }))

      .filter((s) => s.title.length > 0);



    const payload = {

      id: initialTask?.id || `task-${Date.now()}`,

      title: title.trim(),

      description: description.trim(),

      status: status || columns[0]?.id,

      subtasks: cleanedSubtasks

    };



    onSave(payload);

  };



  return (

    <div

      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"

      onClick={onClose}

    >

      <div

        className={`w-full max-w-lg rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative ${

          darkMode ? 'bg-[#2B2C37] text-white' : 'bg-white text-[#000112]'

        }`}

        onClick={(e) => e.stopPropagation()}

      >

        <div className="flex items-center justify-between mb-6">

          <h2 className="font-bold text-lg sm:text-xl">

            {isEditing ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}

          </h2>

          <button onClick={onClose} className="p-1 text-[#828FA3] hover:text-[#EA5555]">

            <X className="w-5 h-5" />

          </button>

        </div>



        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}

          <div>

            <label className="block text-xs font-bold tracking-wider text-[#828FA3] uppercase mb-2">

              Título

            </label>

            <div className="relative">

              <input

                type="text"

                value={title}

                onChange={(e) => {

                  setTitle(e.target.value);

                  if (errors.title) setErrors({});

                }}

                placeholder="ex.: Fazer pausa para o café"

                className={`w-full px-4 py-2.5 rounded border text-sm focus:outline-none ${

                  errors.title

                    ? 'border-[#EA5555] pr-28'

                    : 'border-[#E4EBFA] dark:border-[#3E3F4E] focus:border-[#635FC7]'

                } ${darkMode ? 'bg-[#2B2C37] text-white' : 'bg-white text-[#000112]'}`}

              />

              {errors.title && (

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#EA5555]">

                  {errors.title}

                </span>

              )}

            </div>

          </div>



          {/* Description */}

          <div>

            <label className="block text-xs font-bold tracking-wider text-[#828FA3] uppercase mb-2">

              Descrição

            </label>

            <textarea

              rows={3}

              value={description}

              onChange={(e) => setDescription(e.target.value)}

              placeholder="ex.: É sempre bom fazer uma pausa. Esse intervalo de 15 minutos vai recarregar as energias."

              className={`w-full px-4 py-2.5 rounded border text-sm focus:outline-none resize-none ${

                darkMode

                  ? 'bg-[#2B2C37] border-[#3E3F4E] focus:border-[#635FC7] text-white'

                  : 'bg-white border-[#E4EBFA] focus:border-[#635FC7] text-[#000112]'

              }`}

            />

          </div>



          {/* Subtasks */}

          <div>

            <label className="block text-xs font-bold tracking-wider text-[#828FA3] uppercase mb-2">

              Subtarefas

            </label>

            <div className="space-y-3 mb-3">

              {subtasks.map((sub, index) => (

                <div key={sub.id || index} className="flex items-center gap-3">

                  <input

                    type="text"

                    value={sub.title}

                    onChange={(e) => handleSubtaskChange(index, e.target.value)}

                    placeholder="ex.: Preparar café fresco"

                    className={`flex-1 px-4 py-2.5 rounded border text-sm focus:outline-none ${

                      darkMode

                        ? 'bg-[#2B2C37] border-[#3E3F4E] focus:border-[#635FC7] text-white'

                        : 'bg-white border-[#E4EBFA] focus:border-[#635FC7] text-[#000112]'

                    }`}

                  />

                  <button

                    type="button"

                    onClick={() => handleRemoveSubtask(index)}

                    className="p-1.5 text-[#828FA3] hover:text-[#EA5555] transition-colors"

                  >

                    <X className="w-5 h-5" />

                  </button>

                </div>

              ))}

            </div>



            <button

              type="button"

              onClick={handleAddSubtask}

              className={`w-full py-2.5 rounded-full font-bold text-sm transition-colors ${

                darkMode

                  ? 'bg-white text-[#635FC7] hover:bg-white/90'

                  : 'bg-[#635FC7]/10 text-[#635FC7] hover:bg-[#635FC7]/20'

              }`}

            >

              + Adicionar Nova Subtarefa

            </button>

          </div>



          {/* Status Select */}

          <div>

            <label className="block text-xs font-bold tracking-wider text-[#828FA3] uppercase mb-2">

              Status

            </label>

            <div className="relative">

              <select

                value={status}

                onChange={(e) => setStatus(e.target.value)}

                className={`w-full appearance-none px-4 py-3 rounded border text-sm font-medium cursor-pointer focus:outline-none focus:border-[#635FC7] ${

                  darkMode

                    ? 'bg-[#2B2C37] border-[#3E3F4E] text-white'

                    : 'bg-white border-[#E4EBFA] text-[#000112]'

                }`}

              >

                {columns.map((c) => (

                  <option key={c.id} value={c.id} className={darkMode ? 'bg-[#2B2C37]' : 'bg-white'}>

                    {c.name}

                  </option>

                ))}

              </select>

              <ChevronDown className="w-4 h-4 text-[#635FC7] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

            </div>

          </div>



          {/* Submit Button */}

          <button

            type="submit"

            className="w-full bg-[#635FC7] hover:bg-[#A8A4FF] text-white font-bold py-3 rounded-full text-sm transition-transform active:scale-98 shadow-sm"

          >

            {isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}

          </button>

        </form>

      </div>

    </div>

  );

}



function BoardFormModal({ mode, board, darkMode, onClose, onSave }) {
  const [name, setName] = useState(board?.name || '');
  return <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className={`w-full max-w-lg rounded-xl p-6 sm:p-8 ${darkMode ? 'bg-[#2B2C37] text-white' : 'bg-white text-[#000112]'}`} onClick={e=>e.stopPropagation()}>
      <div className="flex justify-between items-center mb-6"><h2 className="font-bold text-xl">Adicionar Novo Quadro</h2><button onClick={onClose}><X className="text-[#828FA3]"/></button></div>
      <form onSubmit={e=>{e.preventDefault();if(name.trim())onSave({name:name.trim()})}} className="space-y-5">
        <label className="block text-xs font-bold text-[#828FA3]">Nome do Quadro
          <input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="ex.: Lançamento de Plataforma" className={`block mt-2 w-full rounded border px-4 py-3 font-medium text-sm focus:outline-none focus:border-[#635FC7] ${darkMode?'bg-[#2B2C37] border-[#3E3F4E] text-white':'bg-white border-[#E4EBFA] text-[#000112]'}`}/>
        </label>
        <div><p className="text-xs font-bold text-[#828FA3] mb-3">Colunas do Quadro</p><div className="space-y-2">{[['A Fazer','#49C4E5'],['Em Progresso','#8471F2'],['Concluído','#67E2AE']].map(([label,color])=><div key={label} className={`px-4 py-3 border rounded flex items-center gap-3 text-sm ${darkMode?'border-[#3E3F4E]':'border-[#E4EBFA]'}`}><span className="h-3 w-3 rounded-full" style={{background:color}}/>{label}</div>)}</div><p className="text-xs text-[#828FA3] mt-3">Estas três colunas são criadas automaticamente pelo Spring Boot.</p></div>
        <button type="submit" className="w-full rounded-full bg-[#635FC7] hover:bg-[#A8A4FF] text-white font-bold py-3">Criar Novo Quadro</button>
      </form>
    </div></div>;
}

function DeleteConfirmModal({ config, darkMode, onClose, onConfirm }) {
  const isBoard = config.type === 'board';
  return <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className={`w-full max-w-md p-8 rounded-xl ${darkMode ? 'bg-[#2B2C37] text-white' : 'bg-white text-[#000112]'}`} onClick={e => e.stopPropagation()}>
      <h2 className="flex gap-3 items-center text-[#EA5555] font-bold text-lg mb-5"><AlertCircle size={22}/>{isBoard ? 'Excluir este quadro?' : 'Excluir esta tarefa?'}</h2>
      <p className="text-[#828FA3] text-sm leading-relaxed mb-6">Tem certeza de que deseja excluir {isBoard?'o quadro':'a tarefa'} <strong>{isBoard?config.item.name:config.item.title}</strong>? Esta ação não pode ser desfeita.</p>
      <div className="flex gap-3"><button onClick={onConfirm} className="flex-1 bg-[#EA5555] text-white font-bold rounded-full py-3">Excluir</button><button onClick={onClose} className="flex-1 bg-[#635FC7]/10 text-[#635FC7] font-bold rounded-full py-3">Cancelar</button></div>
    </div>
  </div>
}
