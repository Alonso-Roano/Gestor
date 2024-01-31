import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import "../CSS/Recursos.css"
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";
import { Link } from "react-router-dom";

export default function Recursos() {
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
                        <div className="equipos">
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <Link className="link" to={"/elemento"}><p>Visualizar</p></Link>
                                </span>
                            </div>
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <p>Visualizar</p>
                                </span>
                            </div>
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <p>Visualizar</p>
                                </span>
                            </div>
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <p>Visualizar</p>
                                </span>
                            </div>
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <p>Visualizar</p>
                                </span>
                            </div>
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <p>Visualizar</p>
                                </span>
                            </div>
                            <div>
                                <span className="elem">
                                    <h3>Titulo</h3>
                                    <i class="nf nf-fa-circle_thin"></i>
                                </span>
                                <p className="des">Cantidad: N</p>
                                <span className="elem">
                                    <i class="nf nf-cod-trash" tabIndex="1"></i>
                                    <p>Visualizar</p>
                                </span>
                            </div>
                            <div className="mas">
                                <i class="nf nf-oct-plus_circle" tabIndex="1"></i>
                            </div>
                        </div>
                        <button>Volver</button>
                    </section>
                </section>
            </main>
        </>
    );
}