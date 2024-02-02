import React, { useEffect, useState } from "react";
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import Perfil from "../Componentes/Perfil";
import { Link, useNavigate } from "react-router-dom";

export default function Elementos() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Agregar, setAgregar] = useState(false);
    const [Asignar, setAsignar] = useState(false);
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
                    <h1>Agregar Elemento</h1>
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
                            placeholder="Ingrese nombre del elemento"
                        />
                    </div>
                    <select id="opciones" name="opciones">
                        <option value="0">Escoge el icono del elemento</option>
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
                        AGREGAR ELEMENTO
                    </button>
                </div>
            )}
            {Asignar && (
                <div className="modal">
                    <h1>Asignar Elemento</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setAsignar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Matricula de miembro"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        ASIGNAR
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
                                <p className="des tex">Descripcion: numero</p>
                                <p className="des tex">Asignado: numero</p>
                                <p className="des tex">Grupo: numero</p>
                                <span className="elem">
                                    <span className="amarillo" onClick={()=>setAsignar(true)}>estado</span>
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
                            <button onClick={()=>navigate("/proyectos")}>Volver</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    );
}