import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n';
import { BrowserRouter } from 'react-router-dom'
import ProportionsProvider from './utils/Contexts/ProportionsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProportionsProvider>
      <App />
    </ProportionsProvider>
  </BrowserRouter>
)
