import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ items, toggleToDo, deleteToDo }) => {
  return (
    <div className="todo-list-container">
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.completed}
          dueDate={item.dueDate} 
          toggleToDo={toggleToDo}
          deleteToDo={deleteToDo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
