import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import the provider and wrap the entire app inside this
import {AuthContextProvider} from './context/authContext'
import { DarkModeContextProvider } from './context/darkModeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

