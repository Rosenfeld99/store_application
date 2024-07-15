import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { UsersContextProvider } from './context/UsersContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AuthContextProvider>
      <UsersContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  </React.Fragment>,
)
