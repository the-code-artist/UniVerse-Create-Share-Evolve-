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

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import {AuthContextProvider} from './context/authContext';

// ReactDOM.render(
//   <React.StrictMode>
//    <AuthContextProvider>
//      <App />
//    </AuthContextProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// // );
// import React from "react";
// // import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();
// ReactDOM.render(
//   <React.StrictMode>
//    {/* <AuthContextProvider> */}
//      <App />
//    {/* </AuthContextProvider> */}
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<React.StrictMode>
//   <App/>
//   </React.StrictMode>);

// reportWebVitals();