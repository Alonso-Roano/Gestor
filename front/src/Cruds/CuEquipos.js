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
        fetch("http://localhost:3001/equipos")
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

    const abrirModal = () => {
        setAgregar(true);
        // Restablecer los valores del formulario aquí si es necesario
    };

    const agregarEquipo = () => {
        // Implementa la lógica para agregar un nuevo equipo
        // Por ejemplo, realizar una petición POST a tu API
        cerrarModal();
    };

    const editarEquipo = (id) => {
        // Implementa la lógica para editar un equipo existente
        // Podrías abrir un modal con los datos del equipo y luego enviar una petición PUT a tu API
    };
    const abrirModalAgregar = () => {
        setAgregar(true);
        setFormData({ nombre: '', descripcion: '' });
        setEquipoEditando(null);
    };

    const abrirModalEditar = (equipo) => {
        setAgregar(true);
        setFormData({ nombre: equipo.Nombre, descripcion: equipo.Descripcion });
        setEquipoEditando(equipo.Id_Equipo);
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
        const url = equipoEditando ? `http://localhost:3001/equipo/${equipoEditando}` : 'http://localhost:3001/equipo';

        fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                if (metodo === 'POST') {
                    setEquipos([...equipos, { ...formData, Id_Equipo: data.id }]);
                } else {
                    const equiposActualizados = equipos.map((eq) => eq.Id_Equipo === equipoEditando ? { ...eq, ...formData } : eq);
                    setEquipos(equiposActualizados);
                }
                cerrarModal();
            })
            .catch((error) => console.error("Error:", error));
    };

    const eliminarEquipo = (id) => {
        if (window.confirm("¿Estás seguro de querer eliminar este equipo?")) {
            fetch(`http://localhost:3001/equipos/${id}`, { method: 'DELETE' })
                .then(() => {
                    const equiposActualizados = equipos.filter((eq) => eq.Id_Equipo !== id);
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
                    <h1> CRUD de Equipos </h1>
                    <div class="buscador">
                        <input placeholder="Buscar"></input><button>Buscar</button>
                        <button onClick={abrirModal}>Agregar</button>
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
                            <tbody>
                                {equipos.map((equipo) => (
                                    <tr key={equipo.id}>
                                        <td>{equipo.id}</td>
                                        <td>{equipo.nombre}</td>
                                        <td><button onClick={() => editarEquipo(equipo.id)}>Editar</button></td>
                                        <td><button onClick={() => eliminarEquipo(equipo.id)}>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {Agregar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Agregar Equipo</h2>
                            <div className="form">
                                <p>Ingresa el nombre del equipo</p>
                                <input type="text" />
                                <button onClick={agregarEquipo}>Agregar Equipo</button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}