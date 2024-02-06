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
import CuProyectos from "./Cruds/CuProyectos";
import CuComentarios from "./Cruds/CuComentarios";
import CuIconos from "./Cruds/CuIconos";
import CuElementos from "./Cruds/CuElementos";
import Recursos from "./Paginas/Recursos";
import Elementos from "./Paginas/Elementos";
import Index from "./Paginas/Index";
import Inicio from "./Paginas/Inicio";
import Registro from "./Paginas/Registro";
import ElementosUsiario from "./Paginas/ElementosUsuario";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Page404 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path='/proyectos' element={<Proyectos />} />
          <Route path='/Proyectos/:idProyecto/:NombreProyecto' element={<Equipos/>} />
          <Route path='/Proyectos/:idProyecto/:NombreProyecto/equipos/:idEquipo/:NombreEquipo' element={<Miembros/>} />
          <Route path='/Proyectos/:idProyecto/:NombreProyecto/recursos' element={<Recursos/>} />
          <Route path='/Proyectos/:idProyecto/:NombreProyecto/recursos/:idRecurso/:NombreRecurso' element={<Elementos/>} />
          <Route path='/Elementos/:idUsuario/:NombreUsuario' element={<ElementosUsiario/>} />
          <Route path='/cuequipos' element={<CuEquipos />} />
          <Route path='/cumiembros' element={<CuMiembros />} />
          <Route path='/curecursos' element={<CuRecursos />} />
          <Route path='/cuusuarios' element={<CuUsuarios />} />
          <Route path='/cuproyectos' element={<CuProyectos />} />
          <Route path='/cucomentarios' element={<CuComentarios />} />
          <Route path='/cuiconos' element={<CuIconos />} />
          <Route path='/cuelementos' element={<CuElementos />} />
          <Route path='/recursos' element={<Recursos/>} />
          <Route path='/inicio' element={<Inicio/>} />
          <Route path='/registro' element={<Registro/>} />
          <Route path='/inicio' element={<Inicio/>} />
          <Route path='/' element={<Index/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;