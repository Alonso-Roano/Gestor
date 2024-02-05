import React, { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import "./modales.css";
import DashSlider from "../Dashboard/DashSider";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import axios from "axios";
import Swal from "sweetalert2";

export default function CuMiembros() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [miembros, setMiembros] = useState([]);
    const [Editar, setEditar] = useState(false);
    const [Agregar, setAgregar] = useState(false);
    const [miembroEditando, setMiembroEditando] = useState(null);
    const [aproyecto, setaProyecto] = useState(true);
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    const autenticado = localStorage.getItem("token");
    const [body, setBody] = useState({
        Nombre: "",
        Carga: "",
        Rol: "1",
        Id: ""
    });
    const { idProyecto, NombreProyecto, idEquipo, NombreEquipo } = useParams();
    const [miembroActual, setMiembroActual] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [estaEditando, setEstaEditando] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        habilidades: '',
        rol: ''
    });

    const mostrar = () => {
        setClases("mostrar");
        setMiembros(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setMiembros(true);
    };


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const abrirModal = (miembro) => {
        setEstaEditando(miembro != null);
        setMiembroActual(miembro);
        setFormData(miembro ? { nombre: miembro.nombre, descripcion: miembro.descripcion, habilidades: miembro.habilidades, rol: miembro.rol } : { nombre: '', descripcion: '', habilidades: '', rol: '' });
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const cargarMiembros = async () => {
        try {
            const respuesta = await axios.get(`https://localhost:1800/miembros/${idEquipo}`, {
                headers: { Authorization: autenticado },
            });
            if (Array.isArray(respuesta.data)) {
                setMiembros(respuesta.data);
            } else {
                setMiembros([]);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron obtener los miembros', 'error');
            setMiembros([]);
        }
    };

    const guardarMiembro = async () => {
        if (estaEditando) {
            try {
                const respuesta = await axios.put(`https://localhost:1800/miembros/${miembroActual.Id}`, formData, {
                    headers: { Authorization: autenticado },
                });
                Swal.fire('¡Éxito!', 'Miembro actualizado con éxito', 'success');
            } catch (error) {
                Swal.fire('Error', 'Error al actualizar miembro', 'error');
            }
        } else {
            try {
                const respuesta = await axios.post(`https://localhost:1800/miembros`, formData, {
                    headers: { Authorization: autenticado },
                });
                Swal.fire('¡Éxito!', 'Miembro agregado con éxito', 'success');
            } catch (error) {
                Swal.fire('Error', 'Error al agregar miembro', 'error');
            }
        }
        cerrarModal();
        cargarMiembros();
    };

    const eliminarMiembro = async (idMiembro) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrará el miembro',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            try {
                const respuesta = await axios.delete(`https://localhost:1800/miembros/${idMiembro}`, {
                    headers: { Authorization: autenticado },
                });
                Swal.fire('¡Éxito!', 'Miembro eliminado con éxito', 'success');
                cargarMiembros();
            } catch (error) {
                Swal.fire('Error', 'Error al eliminar miembro', 'error');
            }
        }
    };

    useEffect(() => {
        cargarMiembros();
    }, []);


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
                <button className="cerrar">Cerrar sesión</button>
            </header>
            <main>
                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <div className="main-content">
                    <h1>CRUD de Miembros</h1>
                    <div className="buscador">
                        <input placeholder="Buscar"></input>
                        <button>Buscar</button>
                        <button onClick={() => abrirModal(null)}>Agregar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Habilidades</th>
                                <th>Rol</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {miembros.map((miembro) => (
                                <tr key={miembro.Id_Miembro}>
                                    <td>{miembro.Id_Miembro}</td>
                                    <td>{miembro.Nombre}</td>
                                    <td>{miembro.Descripcion}</td>
                                    <td>{miembro.Habilidades}</td>
                                    <td>{miembro.Rol}</td>
                                    <td>
                                        <button onClick={() => abrirModal(miembro)}>Editar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => eliminarMiembro(miembro.Id_Miembro)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{estaEditando ? "Editar Miembro" : "Agregar Miembro"}</h2>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
                            <input type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} placeholder="Descripción" />
                            <input type="text" name="habilidades" value={formData.habilidades} onChange={handleInputChange} placeholder="Habilidades" />
                            <select name="rol" value={formData.rol} onChange={handleInputChange}>
                                <option value="rol1">Rol 1</option>
                                <option value="rol2">Rol 2</option>
                                <option value="rol3">Rol 3</option>
                            </select>
                            <button onClick={guardarMiembro}>{estaEditando ? "Guardar Cambios" : "Agregar Miembro"}</button>
                            <button onClick={cerrarModal}>Cerrar</button>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}