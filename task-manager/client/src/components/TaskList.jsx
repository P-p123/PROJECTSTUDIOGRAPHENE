import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found for this filter.</div>;
  }

  return (
    <div className="task-list-card">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
