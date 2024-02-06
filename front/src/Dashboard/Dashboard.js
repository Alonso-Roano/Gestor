import React from "react";
import "./Dashboard.css";
import "../CSS/Header.css";
import { useState } from "react";
import DashSlider from "./DashSider";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [clases, setClases] = useState("ocultar");
  const [icono, setIcono] = useState(true);
  const mostrar = () => {
    setClases("mostrar");
    setIcono(false);
  };
  const ocultar = () => {
    setClases("ocultar");
    setIcono(true);
  };

  return (
    <>
      <body>
        <header className="head">
          <div>
            {icono ?
              <i className="nf nf-cod-three_bars" onClick={mostrar}></i>
              :
              <i className="nf nf-oct-x" onClick={ocultar}></i>
            }
            <p>Gestion</p>
          </div>
          <button className="cerrar">Cerrar sesion</button>
        </header>
        <main>
          <nav className={clases}>
            <DashSlider />
            <aside>
              <div>
                <i className="nf nf-md-package"></i>
                <p>Inventario</p>
              </div>
              <div>
                <i className="nf nf-fa-user"></i>
                <p>Perfil</p>
              </div>
            </aside>
          </nav>
          <div className="main-content">
            <h1>Bienvenido al Dashboard </h1>
            <div className="rectangulos-container">
              <div className="rectangulo-con-boton">
                <div className="rectangulo1">
                  <h2>Miembros</h2>
                  <p>Miembros totales: 1</p>
                  <div className="func">
                    <p>Funcionando</p>
                  </div>
                </div>
                <Link to="/cumiembros" className="dashboard-button">Administrar Miembros</Link>
              </div>
              <div className="rectangulo-con-boton">
                <div className="rectangulo2">
                  <h2>Elementos</h2>
                  <p>Elementos totales: 2</p>
                  <div className="func">
                    <p>Funcionando</p>
                  </div>
                </div>
                <Link to="/cuelementos" className="dashboard-button">Administrar Elementos</Link>
              </div>
              <div className="rectangulo-con-boton">
                <div className="rectangulo3">
                  <h2>Equipos</h2>
                  <p>Equipos totales: 3</p>
                  <div className="func">
                    <p>Funcionando</p>
                  </div>
                </div>
                <Link to="/cuequipos" className="dashboard-button">Administrar Equipos</Link>
              </div>
              <div className="rectangulo-con-boton">
                <div className="rectangulo4">
                  <h2>Proyectos</h2>
                  <p>Proyectos totatales: 4</p>
                  <div className="func">
                    <p>Funcionando</p>
                  </div>
                </div>
                <Link to="/cuproyectos" className="dashboard-button">Administrar Proyectos</Link>
              </div>
              <div className="rectangulo-con-boton">
                <div className="rectangulo4">
                  <h2>Comentarios</h2>
                  <p>Comentarios totales: 5</p>
                  <div className="func">
                    <p>Funcionando</p>
                  </div>
                </div>
                <Link to="/cuproyectos" className="dashboard-button">Administrar Comentarios</Link>
              </div>
              <div className="rectangulo-con-boton">
                <div className="rectangulo4">
                  <h2>Recursos</h2>
                  <p>Recursos totales: 6</p>
                  <div className="func">
                    <p>Funcionando</p>
                  </div>
                </div>
                <Link to="/cuproyectos" className="dashboard-button">Administrar Recursos</Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}

