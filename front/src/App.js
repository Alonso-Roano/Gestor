import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Proyectos from "./Paginas/Proyectos";
import Page404 from "./Paginas/Page404";
import "./App.css"
import Equipos from "./Paginas/Equipos";
import Miembros from "./Paginas/Miembros";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Page404/>} />
          <Route path="/404" element={<Page404/>} />
          <Route path='/proyectos' element={<Proyectos/>} />
          <Route path='/equipos' element={<Equipos/>} />
          <Route path='/miembros' element={<Miembros/>} />
          <Route path='/' element={<Proyectos/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;