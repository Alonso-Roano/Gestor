import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import "../CSS/Modales.css";
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";

export default function Proyectos() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Editar, setEditar] = useState(false);
    const [Agregar, setAgregar] = useState(false);
    const [id, setId] = useState("");
    const [body, setBody] = useState({
        Nombre: "",
        Foto: "",
        Biografia: "",
    });
    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };
    const modificar = () => {
        setEditar(true);
    }
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    return (
        <>
            {Editar && (
                <div className="modal">
                    <h1>Editar Proyecto</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setEditar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Ingrese nombre del proyecto"
                        />
                    </div>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Foto}
                            onChange={cambioEntrada}
                            name="Foto"
                            placeholder="Ingrese fecha limite del proyecto"
                        />
                    </div>
                    <select id="opciones" name="opciones">
                        <option value="0">Escoge el icono del proyecto</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Proposito del proyecto"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        EDITAR PROYECTO
                    </button>
                </div>
            )}
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Proyecto</h1>
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
                            placeholder="Ingrese nombre del proyecto"
                        />
                    </div>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Foto}
                            onChange={cambioEntrada}
                            name="Foto"
                            placeholder="Ingrese fecha limite del proyecto"
                        />
                    </div>
                    <select id="opciones" name="opciones">
                        <option value="0">Escoge el icono del proyecto</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Proposito del proyecto"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        CREAR PROYECTO
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
                <section >
                    <h1 className="titulo">Proyectos <i class="nf nf-oct-plus_circle ma" tabIndex="1" onClick={() => setAgregar(true)}></i></h1>
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
                                <button onClick={()=>modificar()}>Editar</button>
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