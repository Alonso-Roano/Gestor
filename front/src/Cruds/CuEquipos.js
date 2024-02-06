import React, { useState, useEffect } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import DashSlider from "../Dashboard/DashSider";

export default function CuEquipos() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [equipos, setEquipos] = useState([]);
    const [Agregar, setAgregar] = useState(false);
    const [equipoEditando, setEquipoEditando] = useState(null);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

    useEffect(() => {
        fetch(`http://localhost:1800/equipos`)
            .then((response) => response.json())
            .then((data) => setEquipos(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };

    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const abrirModalAgregar = () => {
        setAgregar(true);
        setFormData({ nombre: '', descripcion: '' });
        setEquipoEditando(null);
    };

    const abrirModalEditar = (equipo) => {
        setAgregar(true);
        setFormData({ nombre: equipo.nombre, descripcion: equipo.descripcion });
        setEquipoEditando(equipo.id);
    };

    const cerrarModal = () => {
        setAgregar(false);
        setEquipoEditando(null);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const agregarEditarEquipo = () => {
        const metodo = equipoEditando ? 'PUT' : 'POST';
        const url = equipoEditando ? `http://localhost:1800/equipos/${equipoEditando}` : 'http://localhost:1800/equipos';

        fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                if (metodo === 'POST') {
                    setEquipos([...equipos, { ...formData, id: data.id }]);
                } else {
                    const equiposActualizados = equipos.map((eq) => eq.id === equipoEditando ? { ...eq, ...formData } : eq);
                    setEquipos(equiposActualizados);
                }
                cerrarModal();
            })
            .catch((error) => console.error("Error:", error));
    };

    const eliminarEquipo = (id) => {
        if (window.confirm("¿Estás seguro de querer eliminar este equipo?")) {
            fetch(`http://localhost:1800/equipos/${id}`, { method: 'DELETE' })
                .then(() => {
                    const equiposActualizados = equipos.filter((eq) => eq.id !== id);
                    setEquipos(equiposActualizados);
                })
                .catch((error) => console.error("Error:", error));
        }
    };

    return (
        <>
            <header className="head">
                <div>
                    {icono ?
                        <i className="nf nf-cod-three_bars" onClick={() => mostrar()}></i>
                        :
                        <i className="nf nf-oct-x" onClick={() => ocultar()}></i>
                    }
                    <p>Gestion</p>
                </div>
                <button className="cerrar">Cerrar sesion</button>
            </header>
            <main>
                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <div className="main-content">
                    <h1> CRUD de Equipos </h1>
                    <div className="buscador">
                        <input placeholder="Buscar"></input>
                        <button>Buscar</button>
                        <button id="agregarBtn" onClick={abrirModalAgregar}>Agregar</button>
                    </div>
                    <div className="tabla-contenedor">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="equiposTableBody">
                                {equipos.map((equipo) => (
                                    <tr key={equipo.id}>
                                        <td>{equipo.id}</td>
                                        <td>{equipo.nombre}</td>
                                        <td>
                                            <button onClick={() => abrirModalEditar(equipo)}>Editar</button>
                                        </td>
                                        <td>
                                            <button onClick={() => eliminarEquipo(equipo.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {Agregar && (
                    <div className="modal" id="modal">
                        <div className="modal-content">
                            <h2 id="modalTitle">
                                {equipoEditando ? "Editar Equipo" : "Agregar Equipo"}
                            </h2>
                            <div className="form">
                                <p>Ingresa el nombre del equipo</p>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    onChange={handleInputChange}
                                    value={formData.nombre}
                                    name="nombre"
                                />
                                <p>Ingresa la descripción del equipo</p>
                                <input
                                    type="text"
                                    id="descripcionInput"
                                    onChange={handleInputChange}
                                    value={formData.descripcion}
                                    name="descripcion"
                                />
                                <button id={equipoEditando ? "guardarEditarBtn" : "agregarEquipoBtn"} onClick={agregarEditarEquipo}>
                                    {equipoEditando ? "Guardar" : "Agregar Equipo"}
                                </button>

                                <button id="cerrarModalBtn" onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}



