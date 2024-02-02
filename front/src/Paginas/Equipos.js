import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Footer.css";
import Footer from "../Componentes/Footer";
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";

export default function Equipos() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Editar, setEditar] = useState(false);
    const [Agregar, setAgregar] = useState(false);
    const [Comentarios, setComentarios] = useState(false);
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
                    <h1>Editar Equipo</h1>
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
                            placeholder="Ingrese nombre del equipo"
                        />
                    </div>
                    <select id="opciones" name="opciones">
                        <option value="0">Escoge el icono del Equipo</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                    
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Proposito del equipo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    //onClick={agregarArtista}
                    >
                        EDITAR EQUIPO
                    </button>
                </div>
            )}
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Equipo</h1>
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
                            placeholder="Ingrese nombre del equipo"
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
                        CREAR EQUIPO
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
                    <h1 className="titulo">Nombre del proyecto</h1>
                    <span className="buscador">
                        <p>Equipos: </p>
                        <input type="text" placeholder="Ingrese el nombre del equipo" />
                        <i class="nf nf-oct-plus_circle" onClick={()=>setAgregar(true)}></i>
                        <button onClick={()=>navigate("/recursos")}>Recursos</button>
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
                                        <button onClick={()=>modificar()}>Editar</button>
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
                                    <button onClick={()=>setComentarios(true)}>Agregar comentario</button>
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