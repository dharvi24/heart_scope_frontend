import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import main CSS file

// Set initial theme before React renders to prevent flash
(function setInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    // If localStorage is not available, default to dark
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
