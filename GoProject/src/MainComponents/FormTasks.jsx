import { useState } from 'react';
import '../MainComponentsCSS/FormTasks.css';

const FormTasks = ({ onDragStart }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ text: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const createTask = () => {
    if (!newTask.text.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask.text,
      description: newTask.description,
      boardId: null // задача пока без доски
    };
    setTasks([...tasks, task]);
    setNewTask({ text: '', description: '' });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDesc(task.description);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editText, description: editDesc } : task
    ));
    setEditingId(null);
  };

  return (
    <div className="main-content">
      <div className="task-form">
        <input
          type="text"
          placeholder="Название задачи"
          value={newTask.text}
          onChange={(e) => setNewTask({...newTask, text: e.target.value})}
        />
        <input
          type="text"
          placeholder="Описание"
          value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
        />
        <button onClick={createTask}>Добавить задачу</button>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="task-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('taskId', task.id);
              e.dataTransfer.setData('taskText', task.text);
              e.dataTransfer.setData('taskDesc', task.description);
            }}
          >
            {editingId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Название"
                />
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Описание"
                />
                <button onClick={() => saveEdit(task.id)}>💾</button>
              </>
            ) : (
              <>
                <h3>{task.text}</h3>
                <p>{task.description}</p>
                <div className="task-actions">
                  <button onClick={() => startEdit(task)}>✏️</button>
                  <button onClick={() => deleteTask(task.id)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormTasks;