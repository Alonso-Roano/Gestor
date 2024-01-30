import React from "react";
import "./Dashboard.css";
import "../CSS/Header.css";
import { useState } from "react";

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
              <i class="nf nf-cod-three_bars" onClick={() => mostrar()}></i>
              :
              <i class="nf nf-oct-x" onClick={() => ocultar()}></i>
            }
            <p>Gestion</p>
          </div>
          <button className="cerrar">Cerrar sesion</button>
        </header>
        <main>
          <nav className={clases}>
            <ul>
              <li>
                <details>
                  <summary>Proyectos </summary>
                  <ul>
                    <li>
                      <span>
                        <i class="nf nf-fa-file"></i>
                        <p>Nombre del proyecto</p>
                      </span>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Equipos</summary>
                  <ul>
                    <li>
                      <span>
                        <i class="nf nf-md-account_group"></i>
                        <p>Nombre del equipo</p>
                      </span>
                      <p className="pro">Nombre del proyecto</p>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Miembros</summary>
                  <ul>
                    <li>
                      <span>
                        <i class="nf nf-oct-person"></i>
                        <p>Nombre del miembro</p>
                      </span>
                      <p className="pro">Nombre del equipo</p>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <aside>
              <div>
                <i class="nf nf-md-package"></i>
                <p>Inventario</p>
              </div>
              <div>
                <i class="nf nf-fa-user"></i>
                <p>Perfil</p>
              </div>
            </aside>
          </nav>
          <div class="main-content">
            <h1>Bienvenido al dashboard "administrador"</h1>
            <div class="rectangulos-container">
              <div class="rectangulo1">
                <h2>Usuarios</h2>
                <p>1</p>
              </div>
              <div class="rectangulo2">
                <h2>Miembros</h2>
                <p>2</p>
              </div>
              <div class="rectangulo3">
                <h2>Equipos</h2>
                <p>3</p>
              </div>
              <div class="rectangulo4">
                <h2>Proyectos</h2>
                <p>4</p>
              </div>
            </div>
          </div>
        </main>

      </body>
    </>
  );
};