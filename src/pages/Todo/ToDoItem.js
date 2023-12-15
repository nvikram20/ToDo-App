import React from 'react';
import './ToDoItem.css';

const ToDoItem = ({ id, text, completed, dueDate, toggleToDo, deleteToDo }) => {
  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={completed} onChange={() => toggleToDo(id)} />
      <span className="todo-text">{text}</span>
      {dueDate && <span className="due-date">Due: {dueDate}</span>}
      <button onClick={() => deleteToDo(id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default ToDoItem;
