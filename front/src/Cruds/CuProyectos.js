import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        // Aquí debes realizar una solicitud a tu API para obtener los proyectos desde la vista "proyectosView"
        // Puedes utilizar fetch o axios para hacer la solicitud.
        // Asumo que tu API devuelve los proyectos en formato JSON.

        // Ejemplo de cómo hacer la solicitud (debes adaptarlo a tu API):
        fetch("/api/proyectosView") // Reemplaza "/api/proyectosView" con la ruta correcta a tu vista
            .then((response) => response.json())
            .then((data) => setProyectos(data))
            .catch((error) => console.error("Error al obtener proyectos", error));
    }, []); // Esto se ejecutará una vez al cargar el componente

    const agregarProyecto = () => {
        // Aquí puedes implementar la lógica para agregar un proyecto
        // Puedes realizar una solicitud POST a tu API para agregar el proyecto a la vista "proyectosView"
        // Luego, actualiza el estado de proyectos para reflejar el nuevo proyecto agregado.
        cerrarModal();
    };

    const eliminarProyecto = (id) => {
        // Aquí puedes implementar la lógica para eliminar un proyecto
        // Realiza una solicitud DELETE a tu API para eliminar el proyecto de la vista "proyectosView"
        // Luego, actualiza el estado de proyectos para reflejar el proyecto eliminado.
    };

    const editarProyecto = (id) => {
        // Aquí puedes implementar la lógica para editar un proyecto
        // Puedes redirigir al usuario a una página de edición o abrir un modal de edición.
    };

    return (
        <>
            <header className="head">
                <div>
                    {icono ? (
                        <i className="nf nf-cod-three_bars" onClick={() => mostrar()}></i>
                    ) : (
                        <i className="nf nf-oct-x" onClick={() => ocultar()}></i>
                    )}
                    <p>Gestion</p>
                </div>
                <button className="cerrar">Cerrar sesion</button>
            </header>
            <main>
                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <div className="main-content">
                    <h1> CRUD de Proyectos </h1>
                    <div className="buscador">
                        <input placeholder="Buscar"></input>
                        <button>Buscar</button>
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
                                    <td>
                                        <button onClick={() => editarProyecto(proyecto.id)}>Editar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => eliminarProyecto(proyecto.id)}>Eliminar</button>
                                    </td>
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
                                <input type="text" />
                                <p>Agregar imagen</p>
                                <input type="file" />
                                <p>Agregar Descripcion</p>
                                <div className="desc">
                                    <input type="text" />
                                </div>
                                <button onClick={agregarProyecto}>Agregar Proyecto</button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
