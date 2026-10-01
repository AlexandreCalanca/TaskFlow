import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  AlertCircle,
  Loader2
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

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

const COLUMN_COLORS = ['#49C4E5', '#8471F2', '#67E2AE', '#FF7F50', '#E5A449', '#9333EA'];

export default function App() {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [boardModalMode, setBoardModalMode] = useState(null);
  const [deleteModalConfig, setDeleteModalConfig] = useState(null);

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColId, setDragOverColId] = useState(null);

  const fetchBoards = useCallback(async (selectBoardId = null) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/boards`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setBoards(data);

      if (data.length > 0) {
        if (selectBoardId && data.some((b) => b.id === selectBoardId)) {
          setActiveBoardId(selectBoardId);
        } else if (!activeBoardId || !data.some((b) => b.id === activeBoardId)) {
          setActiveBoardId(data[0].id);
        }
      } else {
        setActiveBoardId(null);
      }
    } catch (err) {
      console.error(err);
      setError('Backend Spring Boot desconectado. Verifique se o IntelliJ está rodando.');
    } finally {
      setLoading(false);
    }
  }, [activeBoardId]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const currentBoard = useMemo(() => {
    return boards.find((b) => b.id === activeBoardId) || boards[0] || null;
  }, [boards, activeBoardId]);

  useEffect(() => {
    if (activeTaskModal && currentBoard) {
      for (const col of currentBoard.columns) {
        const found = col.tasks?.find((t) => t.id === activeTaskModal.id);
        if (found) {
          setActiveTaskModal({ ...found, columnId: col.id });
          return;
        }
      }
      setActiveTaskModal(null);
    }
  }, [boards, currentBoard]);

  const handleToggleSubtask = async (taskId, subtaskId) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/subtasks/${subtaskId}/toggle`, { method: 'PATCH' });
      await fetchBoards(currentBoard?.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeTaskStatus = async (task, targetColId) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${task.id}/move`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetColumnId: Number(targetColId), newPosition: 1 })
      });
      await fetchBoards(currentBoard?.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (payload) => {
    try {
      await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      await fetchBoards(currentBoard?.id);
      setAddTaskModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${taskId}`, { method: 'DELETE' });
      await fetchBoards(currentBoard?.id);
      setActiveTaskModal(null);
      setDeleteModalConfig(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', String(taskId));
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    if (dragOverColId !== colId) setDragOverColId(colId);
  };

  const handleDrop = (e, targetColId) => {
    e.preventDefault();
    const taskIdStr = e.dataTransfer.getData('text/plain') || draggedTaskId;
    setDraggedTaskId(null);
    setDragOverColId(null);
    if (!taskIdStr) return;

    const taskId = Number(taskIdStr);
    let taskToMove = null;
    let currentColId = null;
    for (const col of currentBoard.columns) {
      const found = col.tasks?.find((t) => t.id === taskId);
      if (found) {
        taskToMove = found;
        currentColId = col.id;
        break;
      }
    }

    if (taskToMove && currentColId !== targetColId) {
      handleChangeTaskStatus(taskToMove, targetColId);
    }
  };

  const themeClasses = darkMode ? 'dark bg-[#20212C] text-white' : 'bg-[#F4F7FD] text-[#000112]';

  return (
      <div className={`min-h-screen font-sans flex flex-col ${themeClasses}`}>
        <header className={`h-20 px-6 border-b flex items-center justify-between shrink-0 ${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'}`}>
          <div className="flex items-center gap-4">
            <LogoIcon />
            <h1 className="font-bold text-2xl">{currentBoard ? currentBoard.name : 'Projeto Kanban'}</h1>
          </div>
          <button
              onClick={() => setAddTaskModalOpen(true)}
              disabled={!currentBoard || !currentBoard.columns || currentBoard.columns.length === 0}
              className="bg-[#635FC7] hover:bg-[#A8A4FF] text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nova Tarefa</span>
          </button>
        </header>

        <main className="flex-1 overflow-x-auto p-6 flex gap-6">
          {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#635FC7] animate-spin mb-2" />
                <p className="text-sm font-bold text-[#828FA3]">Carregando quadro...</p>
              </div>
          ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <AlertCircle className="w-10 h-10 text-[#EA5555] mb-2" />
                <p className="text-sm font-bold text-[#EA5555] mb-4">{error}</p>
                <button onClick={() => fetchBoards()} className="bg-[#635FC7] text-white font-bold px-4 py-2 rounded-full text-sm">
                  Tentar Novamente
                </button>
              </div>
          ) : currentBoard && currentBoard.columns ? (
              currentBoard.columns.map((column, idx) => (
                  <section
                      key={column.id}
                      onDragOver={(e) => handleDragOver(e, column.id)}
                      onDrop={(e) => handleDrop(e, column.id)}
                      className={`w-72 shrink-0 flex flex-col rounded-xl p-2 transition-colors ${
                          dragOverColId === column.id ? 'bg-[#635FC7]/10 ring-2 ring-[#635FC7]/50 border-dashed' : ''
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLUMN_COLORS[idx % COLUMN_COLORS.length] }} />
                      <h2 className="text-xs font-bold uppercase text-[#828FA3]">{column.name} ({column.tasks?.length || 0})</h2>
                    </div>

                    <div className="space-y-3 min-h-[300px]">
                      {(column.tasks || []).map((task) => {
                        const completed = task.subtasks ? task.subtasks.filter((s) => s.isCompleted).length : 0;
                        const total = task.subtasks ? task.subtasks.length : 0;

                        return (
                            <div
                                key={task.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                onClick={() => setActiveTaskModal({ ...task, columnId: column.id })}
                                className="p-4 rounded-lg shadow-sm cursor-grab bg-white dark:bg-[#2B2C37] border border-gray-100 dark:border-gray-700 hover:border-[#635FC7]"
                            >
                              <h3 className="font-bold text-sm mb-1">{task.title}</h3>
                              <p className="text-xs font-bold text-[#828FA3]">{completed} de {total} subtarefas</p>
                            </div>
                        );
                      })}
                    </div>
                  </section>
              ))
          ) : null}
        </main>

        {/* Modal Detalhes */}
        {activeTaskModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4" onClick={() => setActiveTaskModal(null)}>
              <div className="w-full max-w-md bg-white dark:bg-[#2B2C37] rounded-xl p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-bold text-lg">{activeTaskModal.title}</h2>
                  <button onClick={() => handleDeleteTask(activeTaskModal.id)} className="text-[#EA5555] hover:opacity-80">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-[#828FA3] mb-4">{activeTaskModal.description || 'Sem descrição.'}</p>
                <div className="space-y-2 mb-4">
                  {(activeTaskModal.subtasks || []).map((sub) => (
                      <label key={sub.id} className="flex items-center gap-3 p-2 rounded bg-gray-50 dark:bg-gray-800 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={sub.isCompleted}
                            onChange={() => handleToggleSubtask(activeTaskModal.id, sub.id)}
                            className="accent-[#635FC7]"
                        />
                        <span className={sub.isCompleted ? 'line-through opacity-50' : ''}>{sub.title}</span>
                      </label>
                  ))}
                </div>
                <button onClick={() => setActiveTaskModal(null)} className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-sm font-bold rounded">
                  Fechar
                </button>
              </div>
            </div>
        )}

        {/* Modal Criar Tarefa */}
        {addTaskModalOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4" onClick={() => setAddTaskModalOpen(false)}>
              <div className="w-full max-w-md bg-white dark:bg-[#2B2C37] rounded-xl p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold text-lg mb-4">Adicionar Tarefa</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  handleCreateTask({
                    columnId: Number(fd.get('columnId')),
                    title: fd.get('title'),
                    description: fd.get('description'),
                    subtasks: [fd.get('sub1'), fd.get('sub2')].filter(Boolean)
                  });
                }} className="space-y-3">
                  <input name="title" required placeholder="Título da tarefa" className="w-full border p-2 rounded text-sm dark:bg-gray-800" />
                  <textarea name="description" placeholder="Descrição" rows={2} className="w-full border p-2 rounded text-sm dark:bg-gray-800" />
                  <input name="sub1" placeholder="Subtarefa 1 (opcional)" className="w-full border p-2 rounded text-sm dark:bg-gray-800" />
                  <input name="sub2" placeholder="Subtarefa 2 (opcional)" className="w-full border p-2 rounded text-sm dark:bg-gray-800" />
                  <select name="columnId" className="w-full border p-2 rounded text-sm dark:bg-gray-800">
                    {currentBoard?.columns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <button type="submit" className="w-full py-2 bg-[#635FC7] text-white font-bold rounded text-sm">Criar Tarefa</button>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}
