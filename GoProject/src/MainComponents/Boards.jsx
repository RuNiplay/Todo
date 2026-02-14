import { useState } from 'react';
import '../MainComponentsCSS/Boards.css';

const Boards = () => {
  const [boards, setBoards] = useState([
    { id: 1, name: 'Работа', tasks: [] },
    { id: 2, name: 'Личное', tasks: [] },
    { id: 3, name: 'Спорт', tasks: [] },
  ]);
  const [newBoardName, setNewBoardName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const createBoard = () => {
    if (!newBoardName.trim()) return;
    
    const board = {
      id: Date.now(),
      name: newBoardName,
      tasks: []
    };
    setBoards([...boards, board]);
    setNewBoardName('');
  };

  const deleteBoard = (id) => {
    setBoards(boards.filter(board => board.id !== id));
  };

  const startEdit = (board) => {
    setEditingId(board.id);
    setEditName(board.name);
  };

  const saveEdit = (id) => {
    setBoards(boards.map(board => 
      board.id === id ? { ...board, name: editName } : board
    ));
    setEditingId(null);
  };

  const handleDrop = (e, boardId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const taskText = e.dataTransfer.getData('taskText');
    const taskDesc = e.dataTransfer.getData('taskDesc');
    
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { ...board, tasks: [...board.tasks, { id: taskId, text: taskText, description: taskDesc }] }
        : board
    ));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="boards-container">
      <div className="boards-header">
        <h2>Рабочие пространства</h2>
        <div className="create-board">
          <input
            type="text"
            placeholder="Название доски"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <button onClick={createBoard}>+ Создать доску</button>
        </div>
      </div>

      <div className="boards-grid">
        {boards.map(board => (
          <div 
            key={board.id} 
            className="board-card"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, board.id)}
          >
            {editingId === board.id ? (
              <div className="board-edit">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => saveEdit(board.id)}>💾</button>
              </div>
            ) : (
              <div className="board-header">
                <div className="board-info">
                  <h3>{board.name}</h3>
                  <span className="task-count">{board.tasks.length} задач</span>
                </div>
                <div className="board-actions">
                  <button onClick={() => startEdit(board)}>✏️</button>
                  <button onClick={() => deleteBoard(board.id)}>🗑️</button>
                </div>
              </div>
            )}
            
            {board.tasks.length > 0 && (
              <div className="board-tasks">
                {board.tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="board-task"
                    onClick={() => setSelectedTask(task)}
                  >
                    {task.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content task-details" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTask.text}</h2>
              <button className="close-btn" onClick={() => setSelectedTask(null)}>×</button>
            </div>
            <div className="task-full-description">
              <p>{selectedTask.description || 'Нет описания'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;