import React, { useEffect, useState } from "react";
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import Perfil from "../Componentes/Perfil";

export default function Elementos() {
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
                <section className="Recursos">
                    <h1 className="titulo">Recursos</h1>
                    <section>
                        <article className="titulo2">
                            <span className="icono_cont">
                                <i class="nf nf-fa-circle_thin"></i>
                            </span>
                            <span className="titulo_cont">
                                <p>Titulo</p>
                            </span>
                        </article>
                        <div className="equipos ele">
                            <div className="elemento">
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des tex">Matricula: numero</p>
                                <p className="des tex">Precio: numero</p>
                                <p className="des tex">Asignado: numero</p>
                                <p className="des tex">Grupo: numero</p>
                                <span className="elem">
                                    <span className="amarillo">estado</span>
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                </span>
                            </div>
                            <div className="elemento">
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des tex">Matricula: numero</p>
                                <p className="des tex">Precio: numero</p>
                                <p className="des tex">Asignado: numero</p>
                                <p className="des tex">Grupo: numero</p>
                                <span className="elem">
                                    <span className="amarillo">estado</span>
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                </span>
                            </div>
                            <div className="elemento">
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des tex">Matricula: numero</p>
                                <p className="des tex">Precio: numero</p>
                                <p className="des tex">Asignado: numero</p>
                                <p className="des tex">Grupo: numero</p>
                                <span className="elem">
                                    <span className="amarillo">estado</span>
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                </span>
                            </div>
                            <div className="elemento">
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des tex">Matricula: numero</p>
                                <p className="des tex">Precio: numero</p>
                                <p className="des tex">Asignado: numero</p>
                                <p className="des tex">Grupo: numero</p>
                                <span className="elem">
                                    <span className="amarillo">estado</span>
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                </span>
                            </div>
                            <div className="elemento">
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des tex">Matricula: numero</p>
                                <p className="des tex">Precio: numero</p>
                                <p className="des tex">Asignado: numero</p>
                                <p className="des tex">Grupo: numero</p>
                                <span className="elem">
                                    <span className="amarillo">estado</span>
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                </span>
                            </div>
                            <div className="mas">
                                <i class="nf nf-oct-plus_circle" tabIndex="1"></i>
                            </div>
                            <button>Volver</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    );
}