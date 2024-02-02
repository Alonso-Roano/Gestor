import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";

export default function Miembros() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Editar, setEditar] = useState(false);
    const [Agregar, setAgregar] = useState(false);
    const [Comentarios, setComentarios] = useState(false);
    const [Perfil, setPerfil] = useState(false);
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
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    const modificar = () => {
        setEditar(true);
    }
    return (
        <>
            {Editar && (
                <div className="modal">
                    <h1>Editar Carga</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setEditar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            className="coment"
                            placeholder="Carga de trabajo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        EDITAR CARGA
                    </button>
                </div>
            )}
            {Perfil && (
                <div className="modal">
                    <h1>Perfil</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setPerfil(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <i class="nf nf-cod-three_bars per"></i>
                    <p><b>Matricula:</b></p>
                    <p><b>Nombre:</b></p>
                    <p><b>Habilidades:</b></p>
                    <p><b>Carga:</b></p>
                </div>
            )}
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Miembro</h1>
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
                            placeholder="Ingrese matricula del miembro"
                        />
                    </div>
                    
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Ingrese carga de trabajo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        AGREGAR MIEMBRO
                    </button>
                </div>
            )}
            {Comentarios && (
                <div className="modal">
                    <h1>Agregar un Comentario</h1>
                    <button
                        className="salir"
                        onClick={() => { setComentarios(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            className="coment"
                            placeholder="Introduce un comentario"
                        />
                    </div>
                    <button
                        className=""
                    //onClick={agregarArtista}
                    >
                        COMENTAR
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
                    <h1 className="titulo">Nombre del equipo</h1>
                    <span className="buscador">
                        <p>Equipos: </p>
                        <input type="text" placeholder="Ingrese el nombre del miembro" />
                        <i class="nf nf-oct-plus_circle" onClick={()=>setAgregar(true)}></i>
                    </span>
                    <aside className="equi">
                        <section className="partes">
                            <div className="miembros">
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                    <button onClick={()=>modificar()}>Editar</button>
                                        <p onClick={()=>setPerfil(true)}>Visualizar</p>
                                    </span>
                                </div>
                                <div className="miembro">
                                    <i class="nf nf-oct-person_fill"></i>
                                    <h3>Titulo</h3>
                                    <span className="elem">
                                        <button onClick={()=>modificar()}>Editar</button>
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
                            <div className="comentarios comiem">
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
                                    <button onClick={()=>setComentarios(true)}>Agregar comentario</button>
                                </span>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
            
        </>
    );
}