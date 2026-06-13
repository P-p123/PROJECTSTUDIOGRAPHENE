import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import {
  getTasks,
  createTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} from './services/api';
import './App.css';

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Unable to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, taskData);
        setTasks((current) =>
          current.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTask(null);
      } else {
        const newTask = await createTask(taskData);
        setTasks((current) => [newTask, ...current]);
      }
    } catch (err) {
      setError('Unable to save task. Please try again.');
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const updatedTask = await toggleTaskCompletion(taskId);
      setTasks((current) =>
        current.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (err) {
      setError('Unable to update task state. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((current) => current.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Unable to delete task. Please try again.');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === FILTERS.ACTIVE) {
      return !task.completed;
    }
    if (filter === FILTERS.COMPLETED) {
      return task.completed;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="header-row">
            <span className="hero-badge">✨ Productivity</span>
            <button
              type="button"
              className="toggle-theme-button"
              onClick={() => setDarkMode((value) => !value)}
            >
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
          <h1>Personal Task Manager</h1>
          <p>Keep your tasks clear, deadlines visible, and progress easy to track.</p>
        </header>

        <section className="top-pane">
          <TaskForm
            onSave={handleSaveTask}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
          <div className="stats-panel">
            <div className="stat-card">
              <span>Active</span>
              <strong>{activeCount}</strong>
            </div>
            <div className="stat-card">
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </section>

        <section className="tasks-pane">
          <FilterBar filter={filter} onChange={setFilter} />
          {error && <div className="error-banner">{error}</div>}
          {loading ? (
            <div className="empty-state">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={sortedTasks}
              onEdit={setEditingTask}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
