
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // Ensure this is imported first for Tailwind to work
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

// Force style refresh and ensure Tailwind is applied
console.log("Initializing application with Tailwind CSS v4.1.0");

// Add a runtime check for Tailwind
const tailwindCheck = document.createElement('div');
tailwindCheck.className = 'hidden bg-purple-500 text-white p-4 rounded';
document.body.appendChild(tailwindCheck);
const computedStyle = window.getComputedStyle(tailwindCheck);
console.log('Tailwind CSS loaded check:', 
  computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? 'Success' : 'Failed',
  'Background:', computedStyle.backgroundColor
);
document.body.removeChild(tailwindCheck);

// Force CSS recalculation with custom element
const forceStyleRecalc = () => {
  const styleForcer = document.createElement('div');
  styleForcer.className = 'tw-force';
  document.body.appendChild(styleForcer);
  
  // Force a reflow/recalc
  window.getComputedStyle(styleForcer).opacity;
  
  // Remove after a short delay
  setTimeout(() => {
    if (document.body.contains(styleForcer)) {
      document.body.removeChild(styleForcer);
    }
  }, 100);
};

// Run the style recalculation
forceStyleRecalc();

// Add dynamic style to force CSS recalculation
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
  .tailwind-forced {
    display: none;
    background-color: rgb(168, 85, 247); /* purple-600 */
  }
`;
document.head.appendChild(dynamicStyle);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// Schedule another recalculation after initial render
setTimeout(forceStyleRecalc, 500);
