import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Proyectos from "./Paginas/Proyectos";
import Page404 from "./Paginas/Page404";
import "./App.css"
import Equipos from "./Paginas/Equipos";
import Miembros from "./Paginas/Miembros";
import Dashboard from "./Dashboard/Dashboard";
import CuEquipos from "./Cruds/CuEquipos";
import CuMiembros from "./Cruds/CuMiembros";
import CuRecursos from "./Cruds/CuRecursos";
import CuUsuarios from "./Cruds/CuUsuarios";

import Recursos from "./Paginas/Recursos";
import Elementos from "./Paginas/Elementos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Page404 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path='/proyectos' element={<Proyectos />} />
          <Route path='/equipos' element={<Equipos />} />
          <Route path='/miembros' element={<Miembros />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/cuequipos' element={<CuEquipos />} />
          <Route path='/cumiembros' element={<CuMiembros />} />
          <Route path='/curecursos' element={<CuRecursos />} />
          <Route path='/cuusuarios' element={<CuUsuarios />} />
          <Route path='/recursos' element={<Recursos/>} />
          <Route path='/elemento' element={<Elementos/>} />
          <Route path='/' element={<Proyectos/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;