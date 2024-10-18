// src/index.js
/**
 * Application entry point.
 * Renders the root App component within React.StrictMode for development checks.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
