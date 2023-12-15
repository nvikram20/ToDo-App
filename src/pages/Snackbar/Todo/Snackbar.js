// Snackbar.js
import React, { useEffect } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="snackbar">
      <span>{message}</span>
    </div>
  );
};

export default Snackbar;