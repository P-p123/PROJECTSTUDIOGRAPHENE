const TaskItem = ({ task, onEdit, onToggle, onDelete }) => {
  const hasDueDate = task.dueDate;
  const isOverdue =
    hasDueDate && !task.completed && new Date(task.dueDate) < new Date();
  const dueDateLabel = hasDueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : 'No due date';

  const handleDelete = () => {
    const confirmed = window.confirm('Delete this task?');
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <div className="task-item">
      <div className="task-grid">
        <label className="task-checkbox-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
          />
          <span className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </span>
        </label>

        <div className="task-meta">
          <span className={`task-badge ${task.completed ? 'completed' : isOverdue ? 'overdue' : 'active'}`}>
            {task.completed ? 'Completed' : isOverdue ? 'Overdue' : 'Active'}
          </span>
          <span className={`task-badge due ${hasDueDate ? '' : 'no-due'}`}>
            {dueDateLabel}
          </span>
        </div>

        <div className="task-actions">
          <button type="button" className="task-button edit" onClick={onEdit}>
            Edit
          </button>
          <button type="button" className="task-button delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );
};

export default TaskItem;
