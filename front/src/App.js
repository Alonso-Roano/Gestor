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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/404" element={<Page404/>} />
          <Route path='/proyectos' element={<Proyectos/>} />
          <Route path='/equipos/:id' element={<Equipos/>} />
          <Route path='/miembros/:id' element={<Miembros/>} />
          <Route path='/recursos' element={<Recursos/>} />
          <Route path='/elemento' element={<Elementos/>} />
          <Route path='/inicio' element={<Inicio/>} />
          <Route path='/registro' element={<Registro/>} />
          <Route path='/' element={<Index/>} />
          <Route path='*' element={<Page404/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;