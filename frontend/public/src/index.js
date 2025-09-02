import React from "react";
import ReactDOM from "react-dom/client"; // import ReactDOM from react-dom/client
import App from './services/App';

import './index.css'; // Optional, remove if not using CSS yet
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById("root")); // create root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
