import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/authContext.jsx'
import { SocketProvider } from './context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <SocketProvider> */}
        <AuthProvider>
          <App />
        </AuthProvider>
      {/* </SocketProvider> */}
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
