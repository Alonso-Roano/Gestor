import React from "react";
import { useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";

export default function CuEquipos() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [equipos, setEquipos] = useState([]); // Aquí irían los datos de los equipos

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const eliminarEquipo = (id) => {
       
    };

    const editarEquipo = (id) => {
       
    };
    return (
        <>
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
                    <h1> CRUD de Equipos </h1>
                    <div class="buscador">
                        <input></input><button>Buscar</button>
                        <button>Agregar</button>
                    </div>
                    <div className="tabla-contenedor">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipos.map((equipo) => (
                                    <tr key={equipo.id}>
                                        <td>{equipo.id}</td>
                                        <td>{equipo.nombre}</td>
                                        <td><button onClick={() => editarEquipo(equipo.id)}>Editar</button></td>
                                        <td><button onClick={() => eliminarEquipo(equipo.id)}>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

        </>
    )
}