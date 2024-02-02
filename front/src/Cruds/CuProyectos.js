import React from "react";
import { useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import "./modales.css";
import DashSlider from "../Dashboard/DashSider";

export default function CuProyectos() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [proyectos, setProyectos] = useState([]);
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

    const agregarProyecto = () => {
        // Aquí lógica para agregar un proyecto
        cerrarModal();
    };

    const eliminarProyecto = (id) => {

    };

    const editarProyecto = (id) => {

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
                    <h1> CRUD de Proyectos </h1>
                    <div class="buscador">
                        <input placeholder="Buscar"></input><button>Buscar</button>
                        <button onClick={abrirModal}>Agregar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Descripcion</th>
                                <th>Fecha</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proyectos.map((proyecto) => (
                                <tr key={proyecto.id}>
                                    <td>{proyecto.id}</td>
                                    <td>{proyecto.nombre}</td>
                                    <td>{proyecto.imagen}</td>
                                    <td>{proyecto.descripcion}</td>
                                    <td>{proyecto.fecha}</td>
                                    <td><button onClick={() => editarProyecto(proyecto.id)}>Editar</button></td>
                                    <td><button onClick={() => eliminarProyecto(proyecto.id)}>Eliminar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {Agregar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Agregar Proyecto</h2>
                            <div className="form">
                                <p>Ingresa el nombre del proyecto</p>
                                <input type="text"/>
                                <p>Agregar imagen</p>
                                <input type="file"/>
                                <p>Agregar Descripcion</p>
                                <div className="desc">
                                    <input type="text"/>
                                </div>
                                <button onClick={agregarProyecto}>Agregar Proyecto</button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}