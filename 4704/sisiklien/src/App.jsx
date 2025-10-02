import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home/> */}
    <Login/>
  </StrictMode>,
)
