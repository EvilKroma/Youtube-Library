/*
* Main file, calling App.tsx
*/

import React from 'react'; // Import React library to use their functionalities
import ReactDOM from 'react-dom/client'; 
import './index.css'; 
import App from './App'; // Imports the application's main component
import reportWebVitals from './reportWebVitals'; // Create React App includes a performance relayer that allows you to measure and analyze the performance of your application

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Selects the element with the 'root' ID in the .html file
);

root.render(
  <React.StrictMode>
    <App /> {/* Render App element in root, strict mod to detect erros */}
  </React.StrictMode>
);

reportWebVitals(); // For performance relayer
