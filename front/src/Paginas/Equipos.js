import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
<<<<<<< HEAD
import "../CSS/Principal.css";
import "../CSS/Footer.css";
import Footer from "../Componentes/Footer";
=======
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import Perfil from "../Componentes/Perfil";
>>>>>>> 131939108a7ca93ecc61a7ac7b7a07ed49b99027

export default function Equipos() {
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
            <Perfil></Perfil>
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
                    <h1 className="titulo">Nombre del proyecto</h1>
                    <span className="buscador">
                        <p>Equipos: </p>
                        <input type="text" placeholder="Ingrese el nombre del equipo" />
                        <i class="nf nf-oct-plus_circle"></i>
                        <button>Recursos</button>
                    </span>
                    <aside className="equi">
                        <section className="partes">
                            <div className="equipos">
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="elem">
                                        <h3>Titulo</h3>
                                        <i class="nf nf-md-account_group"></i>
                                    </span>
                                    <p className="des">Integrantes: uno, dos, tres, cuatro, cinco, seis</p>
                                    <span className="elem">
                                        <p>Visualizar</p>
                                    </span>
                                </div>
                            </div>
                            <p className="decrip"><b>Descripcion:</b> <br></br><br></br>
                                Descripcion
                            </p>
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
                            <p className="actua">Actualizar estatus</p>
                            <div className="opciones">
                                <button className="rojo">Pendiente</button>
                                <button className="amarillo">En curso</button>
                                <button className="verde">Completado</button>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
}