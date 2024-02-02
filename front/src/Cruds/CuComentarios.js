import React from "react";
import { useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import DashSlider from "../Dashboard/DashSider";

export default function CuComentarios() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [comentarios, setComentarios] = useState([]);
    const [Agregar, setAgregar] = useState(false);

    const abrirModal = () => setAgregar(true);
    const cerrarModal = () => setAgregar(false);

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const eliminarComentario = (id) => {

    };

    const editarComentario = (id) => {

    };

    const agregarComentario = () => {
        cerrarModal();
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
                <button className="cerrar">Cerrar sesion</button>
            </header>
            <main>

                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <div class="main-content">
                    <h1> CRUD de Comentarios </h1>
                    <div class="buscador">
                        <input placeholder="Buscar"></input><button>Buscar</button>
                        <button onClick={abrirModal}>Agregar</button>
                    </div>
                    <div className="tabla-contenedor">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Descripcion</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comentarios.map((comentario) => (
                                    <tr key={comentario.id}>
                                        <td>{comentario.id}</td>
                                        <td>{comentario.descripcion}</td>
                                        <td><button onClick={() => editarComentario(comentario.id)}>Editar</button></td>
                                        <td><button onClick={() => eliminarComentario(comentario.id)}>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {Agregar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Agregar Comentario</h2>
                            <div className="form">
                                <p>Ingresa el Comentario</p>
                                <input type="desc" />
                                <button onClick={agregarComentario}>Agregar Comentario</button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}