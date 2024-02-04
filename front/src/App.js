import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Proyectos from "./Paginas/Proyectos";
import Page404 from "./Paginas/Page404";
import "./App.css"
import Equipos from "./Paginas/Equipos";
import Miembros from "./Paginas/Miembros";
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
          <Route path='/registro' element={<Registro/>} />
          <Route path='/inicio' element={<Inicio/>} />
          <Route path='/' element={<Index/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;