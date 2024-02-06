import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import "./modales.css";
import "./botones.css";
import DashSlider from "../Dashboard/DashSider";
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
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
    });


    const abrirModal = () => {
        setAgregar(true);
        setFormData({ nombre: '', descripcion: '' }); // Resetear formulario
    };
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        if ((name === "Nombre" || name === "Direccion" || name == "Fecha" || name == "Proposito") && /[&$+,´:;=?@#|'<>.^*()%-]/.test(value)) {
            return;
        }
            if (name === "opciones") {
                setFormData({ ...formData, Id_Iconos_Id: value });
                const idIconoSeleccionado = target.options[target.selectedIndex].id;
            } else {
                setFormData({ ...formData, [name]: value });
            }

    };

    // Obtener íconos
    const fetchIconos = async () => {
        try {
            const autenticado = localStorage.getItem("token");
            const respuesta = await axios.get('https://localhost:1800/vista-iconos',

                {
                    headers: {
                        Authorization: autenticado,
                    },
                });
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
            const autenticado = localStorage.getItem("token"); // Obtener el token de autenticación
            const headers = { Authorization: autenticado }; // Crear el objeto de encabezados

            if (editar) {
                // Lógica para actualizar un ícono
                respuesta = await axios.put(`https://localhost:1800/editarIcono/${iconoActual.Id_Iconos}`, iconoActual, { headers });
            } else {
                // Lógica para agregar un nuevo ícono
                respuesta = await axios.post('https://localhost:1800/AgregarIcono', iconoActual, { headers });
            }

            Swal.fire('¡Éxito!', respuesta.data.Mensaje, 'success');
            fetchIconos();
            setAgregar(false);
            setEditar(false);
            setIconoActual({ Id_Iconos: null, Nombre: "", Direccion: "" });
        } catch (error) {
            console.error("Error al guardar el ícono:", error);
            Swal.fire('Error', 'No se pudo guardar el ícono', 'error');
        }
    };


    const borrarIcono = async (id) => {
        try {
            const autenticado = localStorage.getItem("token");
            const respuesta = await axios.put(`https://localhost:1800/borrarIconos/${id}`,
                {},
                {
                    headers: {
                        Authorization: autenticado,
                    },
                })

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

    const agregarIcono = async () => {
        if (!iconoActual.Nombre || !iconoActual.Direccion) {
            Swal.fire('Error', 'Por favor, rellene todos los campos', 'error');
            return;
        }

        try {
            const autenticado = localStorage.getItem("token");
            const respuesta = await axios.post('https://localhost:1800/AgregarIcono', {
                Nombre: "", 
                Direccion: ""
            }, {
                headers: { Authorization: autenticado },
            });

            Swal.fire('¡Éxito!', 'Ícono agregado con éxito', 'success');
            // Aquí podrías actualizar la lista de íconos o realizar otras acciones necesarias
            setAgregar(false);
            setIconoActual({ Nombre: "", Direccion: "" });
        } catch (error) {
            console.error("Error al agregar el ícono:", error);
            Swal.fire('Error', 'No se pudo agregar el ícono', 'error');
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
                    const respuesta = await axios.get(`https://localhost:1800/vista-iconos`, {
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
                <div className="agregar-icono">
                    <button onClick={() => setAgregar(true)} className="boton-agregar-icono">
                        Agregar Ícono
                    </button>
                </div>

                {agregar && (
                    <div className="modal">
                        <h1>Agregar Ícono {formData.nombre}</h1>
                        <button
                            className="salir"
                            onClick={() => setAgregar(false)}
                        >
                            <i className="nf nf-oct-x text-2xl"></i>
                        </button>
                        <div className="entrada">
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={cambioEntrada}
                                name="nombre"
                                placeholder="Ingrese nombre del ícono"
                            />
                        </div>
                        <div className="entrada">
                            <input
                                type="text"
                                value={formData.direccion}
                                onChange={cambioEntrada}
                                name="direccion"
                                placeholder="Ingrese la dirección del ícono (clase CSS)"
                            />
                        </div>
                        <button
                            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            onClick={agregarIcono}
                        >
                            Agregar Ícono
                        </button>
                    </div>
                )}

                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <section className="equiposr">
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
                                        }} className="boton-estilo_editar">
                                            Editar
                                        </button>
                                        <button onClick={() => borrarIcono(icono.Id_Iconos)} className="boton-estilo_eliminar">
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