import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { AuthContextProvider } from './context/authContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
