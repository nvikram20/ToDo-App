import React, { useState } from 'react';
import ToDoList from './pages/Todo/ToDoList';
import Snackbar from './pages/Snackbar/Todo/Snackbar'
import './pages/Todo/ToDoItem.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes,Navigate, Outlet, Link } from 'react-router-dom';
import SignUp from './pages/Register/SignUp'; 
import Login from './pages/Login/Login'; 
import { useNavigate } from 'react-router-dom';


const App = () => {
  const [toDos, setToDos] = useState([]);
  const [newToDoText, setNewToDoText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Add authentication state

  const [showSignUp, setShowSignUp] = useState(false); 
  let navigate = useNavigate();

  const handleSignUp = () => {
    setLoggedIn(true);
    navigate('/todolist');
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };

  // Render the appropriate component based on authentication state
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

  if (!loggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
      </Routes>
    );
  }

  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/todolist" element={<ToDoList items={toDos} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />} />
  //       <Route path="*" element={<Navigate replace to="/todolist" />} />
  //     </Routes>
  //   </Router>
  // );


  return (

    <div className="app">
      <Routes>
        <Route path="/todolist" element={<ToDoList items={toDos} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />} />
        <Route path="*" element={<Navigate replace to="/todolist" />} />
      </Routes>

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
