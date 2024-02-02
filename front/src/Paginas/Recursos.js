import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import "../CSS/Recursos.css"
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";

export default function Recursos() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Agregar, setAgregar] = useState(false);
    const [body, setBody] = useState({
        Nombre: "",
        Foto: "",
        Biografia: "",
    });
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
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
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Recurso</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setAgregar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Ingrese nombre del recurso"
                        />
                    </div>
                    <select id="opciones" name="opciones">
                        <option value="0">Escoge el icono del recurso</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Ingrese descripcion"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        AGREGAR RECURSO
                    </button>
                </div>
            )}
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
                    <h1 className="titulo">Recursos <i class="nf nf-oct-plus_circle ma" tabIndex="1" onClick={() => setAgregar(true)}></i></h1>
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
                        </div>
                        <button onClick={()=>{navigate("/proyectos")}}>Volver</button>
                    </section>
                </section>
            </main>
        </>
    );
}