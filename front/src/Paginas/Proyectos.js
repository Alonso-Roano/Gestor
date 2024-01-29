import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css"

export default function Proyectos() {
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
                <section >
                    <h1 className="titulo">Proyectos</h1>
                    <aside className="proyectos">
                        <div>
                            <img src="https://www.ecoavant.com/uploads/s1/28/20/68/imagen-de-que-es-la-naturaleza.webp"></img>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <img></img>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <img></img>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <img></img>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <img></img>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <img></img>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}