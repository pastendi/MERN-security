import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import { GlobalStyle } from './globalStyle'
import { AppProvider } from './context/appContext'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyle />
      <App />
    </AppProvider>
  </React.StrictMode>
)
