import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from "./components/pages/Home.jsx"
import Criar from "./components/pages/Criar.jsx"
import Listar from "./components/pages/Listar.jsx"
import Editar from "./components/pages/Editar.jsx"
import Deletar from "./components/pages/Deletar.jsx"
import Perfil from "./components/pages/Perfil.jsx"
import Cadastrar from "./components/pages/Cadastrar.jsx"
import Privilegio from "./components/pages/Privilegio.jsx"
import PrivateRoute from './components/routes/PrivateRoute.jsx'
import EditDados from "./components/pages/EditDados.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
function NotFound(){
  return(
    <>
      Rota não encontrada
    </>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<App/>} path='/'></Route>
        <Route element={<Cadastrar/>} path="/cadastrar"></Route>
        <Route element={<NotFound/>} path="*"></Route>
        <Route element={<PrivateRoute/>}>
        <Route element={<Criar/>} path='/create'></Route>
        <Route element={<Home/>} path='/home'></Route>
        <Route element={<Listar/>} path='/list'></Route>
        <Route element={<Editar/>} path="/edit/:id"></Route>
        <Route element={<Deletar/>} path="/delete/:id"></Route>
        <Route element={<Perfil/>} path="/perfil"></Route>
        <Route element={<Privilegio/>} path="/privilegio/:id"></Route>
        <Route element={<EditDados/>} path="/editDados/:id"></Route>
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)