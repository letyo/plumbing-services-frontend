import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles.css'; // Ensure this path is correct
import App from './components/App';
import smoothscroll from 'smoothscroll-polyfill';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Kick off the polyfill
smoothscroll.polyfill();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);