import React from 'react';

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
  return (
    <div className={`task-item ${task.status === 'Complete' ? 'completed' : ''}`}>
      <div className="task-info" onClick={() => onEdit(task)}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <small>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</small>
      </div>
      <div className="task-actions">
        {task.status === 'Open' && (
          <button onClick={() => onComplete(task._id)} className="complete-btn">Complete</button>
        )}
        <button onClick={() => onDelete(task._id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
