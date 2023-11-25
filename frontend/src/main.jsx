import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContextProvider.jsx'
import { NotesContextProvider } from './context/NotesContextProvider.jsx'
import { SidebarContextProvider } from './context/SidebarContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesContextProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </NotesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
