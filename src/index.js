import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Global error handler for leaflet-related errors
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && 
      (event.error.message.includes('_leaflet_pos') || 
       event.error.message.includes('leaflet') ||
       event.error.message.includes('getMapPanePos') ||
       event.error.message.includes('getNewPixelOrigin') ||
       event.error.message.includes('onZoomTransitionEnd'))) {
    console.warn('Global: Suppressed leaflet error:', event.error.message);
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message &&
      (event.reason.message.includes('leaflet') ||
       event.reason.message.includes('_leaflet_pos'))) {
    console.warn('Global: Suppressed leaflet promise rejection:', event.reason.message);
    event.preventDefault();
    return false;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 