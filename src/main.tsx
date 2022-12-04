import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BG } from './components/BG/BG';
import './index.css';
import { ToastContainer } from 'react-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <BG />
    <ToastContainer position='top-right' delay={5000} />
  </React.StrictMode>
);
