import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext"

// Router
import { BrowserRouter as Router } from "react-router-dom"

console.log("🚀 Chargement de main.jsx")
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider> 
        <App />
      </AuthProvider> 
    </Router>
  </StrictMode>,
)