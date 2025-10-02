import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import Home from './Pages/Home.jsx'
import Mahasiswa from "@/Pages/Admin/Mahasiswa";
import Login from './Pages/Auth/Login.jsx';
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <Home/> */}
  <Login/>
  {/* <Mahasiswa/> */}
  </StrictMode>,
)
