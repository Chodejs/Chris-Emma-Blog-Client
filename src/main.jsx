import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log("🚑 Main.jsx is running!");

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("💀 FATAL: Could not find #root in index.html");
} else {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
}