import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";

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
                <Cerrar></Cerrar>
            </header>
            <main>
                <nav className={clases}>
                    <Slider></Slider>
                </nav>
                <section >
                    <h1 className="titulo">Proyectos <i class="nf nf-oct-plus_circle ma" tabIndex="1"></i></h1>
                    <aside className="proyectos">
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
                            <h3>Titulo</h3>
                            <p className="des">Descripcion</p>
                            <span className="elem">
                                <span className="amarillo">estado</span>
                                <button>Editar</button>
                                <p>Visualizar</p>
                            </span>
                        </div>
                        <div>
                            <i class="nf nf-fa-circle_thin"></i>
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