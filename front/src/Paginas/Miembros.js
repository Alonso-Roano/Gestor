import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";

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
                <Cerrar></Cerrar>
            </header>
            <main>
                <nav className={clases}>
                    <Slider></Slider>
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