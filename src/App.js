// App.js - Main container for the application
import React, { useState } from 'react';
import ToDoList from './ToDoList';
import Snackbar from './Snackbar';
import './ToDoItem.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import SignUp from './SignUp'; // Import SignUp component
import Login from './Login'; // Import Login component
// App.js - Import FontAwesome components and icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendar } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [toDos, setToDos] = useState([]);
  const [newToDoText, setNewToDoText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Add authentication state

  const handleSignUp = () => {
    // Implement your signup logic here
    // Set loggedIn to true when signup is successful
    setLoggedIn(true);
  };

  const handleLogin = () => {
    // Implement your login logic here
    // Set loggedIn to true when login is successful
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement logout logic here
    // Set loggedIn to false when the user logs out
    setLoggedIn(false);
  };

  // Render the appropriate component based on authentication state
  if (!loggedIn) {
    return (
      <div className="app">
        <SignUp onSignUp={handleSignUp} />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  const addToDo = () => {
    if (newToDoText.trim() !== '') {
      const newToDo = {
        id: Date.now(),
        text: newToDoText,
        completed: false,
        dueDate: dueDate,
      };

      const newToDos = [...toDos, newToDo];
      setToDos(newToDos);
      setNewToDoText('');
      setDueDate('');
      showSnackbarMessage('Item added successfully');
    } else {
      showSnackbarMessage('Please enter a valid ToDo item');
    }
  };

  const toggleToDo = (id) => {
    const newToDos = toDos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setToDos(newToDos);
    showSnackbarMessage('Item updated successfully');
  };

  const deleteToDo = (id) => {
    const newToDos = toDos.filter((item) => item.id !== id);
    setToDos(newToDos);
    showSnackbarMessage('Item deleted successfully');
  };

  const showSnackbarMessage = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
    setSnackbarMessage('');
  };

  return (
    <div className="app">
      <div className="add-todo-container">
        <div className="input-container">
          <input
            className="input-field"
            type="text"
            placeholder="Enter to-do item"
            value={newToDoText}
            onChange={(e) => setNewToDoText(e.target.value)}
          />
        </div>
        <input
          className="due-date-field"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="add-button" onClick={addToDo}>
          Add To-Do
        </button>
      </div>

      <ToDoList items={toDos} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />
      {showSnackbar && <Snackbar message={snackbarMessage} onClose={closeSnackbar} />}
    </div>
  );
};

export default App;
