import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css"

export default function Miembros() {
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
                    <h1 className="titulo">Nombre del equipo</h1>
                    <span className="buscador">
                        <p>Equipos: </p>
                        <input type="text" placeholder="Ingrese el nombredel equipo" />
                        <i class="nf nf-oct-plus_circle"></i>
                    </span>
                    <aside className="equi">
                        <section className="partes">
                            <div className="miembros">
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                            </div>
                        </section>
                        <div className="elementos">
                            <div className="comentarios">
                                <span className="cont">
                                    <h4>Comentarios</h4>
                                    <div>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                        <article>
                                            <span><b>Nombre</b><b>fecha</b></span>
                                            <p>comentario</p>
                                        </article>
                                    </div>
                                    <button>Agregar comentario</button>
                                </span>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}