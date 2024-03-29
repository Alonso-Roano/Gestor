import React from "react";
import { useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import DashSlider from "../Dashboard/DashSider";

export default function CuRecurso() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [recursos, setRecursos] = useState([]);
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
    const eliminarRecurso = (id) => {

    };

    const editarRecurso = (id) => {

    };

    const agregarRecurso = () => {
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
                    <h1> CRUD de Recursos </h1>
                    <div class="buscador">
                        <input placeholder="Buscar"></input><button>Buscar</button>
                        <button onClick={abrirModal}>Agregar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Imagen</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recursos.map((recurso) => (
                                <tr key={recurso.id}>
                                    <td>{recurso.id}</td>
                                    <td>{recurso.nombre}</td>
                                    <td>{recurso.descripcion}</td>
                                    <td>{recurso.imagen}</td>
                                    <td><button onClick={() => editarRecurso(recurso.id)}>Editar</button></td>
                                    <td><button onClick={() => eliminarRecurso(recurso.id)}>Eliminar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {Agregar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Agregar Recurso</h2>
                            <div className="form">
                                <p>Ingresa el nombre del recurso</p>
                                <input type="text" />
                                <p>Agregar imagen</p>
                                <input type="file" />
                                <p>Agregar Descripcion</p>
                                <div className="desc">
                                    <input type="text" />
                                </div>
                                <button onClick={agregarRecurso}>Agregar Recurso</button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}