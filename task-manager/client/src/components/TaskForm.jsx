import { useEffect, useState } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="task-form-card">
      <h2>{editingTask ? 'Edit Task' : 'Add a New Task'}</h2>
      <form onSubmit={handleSubmit} className="form-row">
        <label>
          Title <span style={{ color: '#dc2626' }}>*</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Buy groceries"
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add notes for this task"
          />
        </label>

        <label>
          Due date
          <input
            type="date"
            value={dueDate || ''}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>

        <div className="actions-row">
          <button type="submit" className="button-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" className="button-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
