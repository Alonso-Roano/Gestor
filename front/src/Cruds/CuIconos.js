import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import "./modales.css";
import "./botones.css";
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";
import axios from "axios";
import Swal from "sweetalert2";

export default function CrudIconos() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [iconos, setIconos] = useState([]);
    const [icono, setIcono] = useState(true);
    const [editar, setEditar] = useState(false);
    const [agregar, setAgregar] = useState(false);
    const [iconoActual, setIconoActual] = useState({ Id_Iconos: null, Nombre: "", Direccion: "" });

    // Obtener íconos
    const fetchIconos = async () => {
        try {
            const respuesta = await axios.get('http://localhost:1800/vista-iconos');
            setIconos(respuesta.data);
        } catch (error) {
            console.error("Error al obtener los íconos:", error);
            Swal.fire('Error', 'No se pudieron obtener los íconos', 'error');
        }
    };

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const guardarIcono = async () => {
        if (!iconoActual.Nombre || !iconoActual.Direccion) {
            Swal.fire('Error', 'Por favor, rellene todos los campos', 'error');
            return;
        }

        try {
            let respuesta;
            if (editar) {
                // Aquí iría la lógica para actualizar un ícono, si tienes un endpoint para ello
            } else {
                respuesta = await axios.post('http://localhost:1800/AgregarIcono', iconoActual);
            }

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire('¡Éxito!', respuesta.data.Mensaje, 'success');
                fetchIconos();
                setAgregar(false);
                setEditar(false);
                setIconoActual({ Id_Iconos: null, Nombre: "", Direccion: "" });
            } else {
                Swal.fire('Error', respuesta.data.Mensaje, 'error');
            }
        } catch (error) {
            console.error("Error al guardar el ícono:", error);
            Swal.fire('Error', 'No se pudo guardar el ícono', 'error');
        }
    };

    const borrarIcono = async (id) => {
        try {
            const respuesta = await axios.put(`http://localhost:1800/borrarIconos/${id}`);
            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire('¡Éxito!', respuesta.data.Mensaje, 'success');
                fetchIconos();
            } else {
                Swal.fire('Error', respuesta.data.Mensaje, 'error');
            }
        } catch (error) {
            console.error("Error al borrar el ícono:", error);
            Swal.fire('Error', 'No se pudo borrar el ícono', 'error');
        }
    };

    useEffect(() => {
        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));
        if (!autenticado) {
            navigate("/")
        } else {

            const fetchIcono = async () => {
                try {
                    const respuesta = await axios.get(`http://localhost:1800/vista-iconos`, {
                        headers: {
                            Authorization: autenticado,
                        },
                    });
                    setIconos(respuesta.data)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchIcono()
        }
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
                <Cerrar></Cerrar>
            </header>

            <main>
                <nav className={clases}>
                    <Slider></Slider>
                </nav>
                <section>
                    <div className="titulo-seccion">
                        <h1 className="titulo">CRUD de Iconos</h1>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iconos.map((icono) => (
                                <tr key={icono.Id_Iconos}>
                                    <td>{icono.Nombre}</td>
                                    <td>{icono.Direccion}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditar(true);
                                            setAgregar(false);
                                            setIconoActual(icono);
                                        }} className="boton-editar">
                                            Editar
                                        </button>
                                        <button onClick={() => borrarIcono(icono.Id_Iconos)} className="boton-eliminar">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {agregar || editar ? (
                        <div className="modal">
                            <h2>{editar ? "Editar Ícono" : "Agregar Ícono"}</h2>
                            <input
                                type="text"
                                placeholder="Nombre del ícono"
                                value={iconoActual.Nombre}
                                onChange={(e) => setIconoActual({ ...iconoActual, Nombre: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Dirección del ícono"
                                value={iconoActual.Direccion}
                                onChange={(e) => setIconoActual({ ...iconoActual, Direccion: e.target.value })}
                            />
                            <button onClick={guardarIcono}>
                                {editar ? "Actualizar Ícono" : "Agregar Ícono"}
                            </button>
                            <button onClick={() => { setAgregar(false); setEditar(false); }}>Cancelar</button>
                        </div>
                    ) : null}
                </section>
            </main>
        </>
    );

}