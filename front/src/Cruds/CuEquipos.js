import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Footer.css";
import Footer from "../Componentes/Footer";
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import DashSlider from "../Dashboard/DashSider";
import axios from "axios";
import Swal from "sweetalert2";

export default function CrudEquipos() {
    const navigate = useNavigate();
    const [equipos, setEquipos] = useState([]);
    const [equipoActual, setEquipoActual] = useState({ Id_Equipo: null, Nombre: "", Descripcion: "", Id_Iconos_Id: "" });
    const [editar, setEditar] = useState(false);
    const [agregar, setAgregar] = useState(false);
    const [equipo, setEquipo] = useState(true);
    const [clases, setClases] = useState("ocultar");
    const [iconos, setIconos] = useState([]);
    const autenticado = localStorage.getItem("token");
    const [selectedOption, setSelectedOption] = useState('1');
    const [aproyecto, setaProyecto] = useState(true);
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    const [id, setId] = useState("");
    const [body, setBody] = useState({
        Nombre: "",
        Fecha: "",
        Proposito: "",
        Id_Iconos_Id: "",
        idProyecto: ""
    });
    const [nuevoEquipo, setNuevoEquipo] = useState({
        Nombre: "",
        Descripcion: "",
        Id_Iconos_Id: ""
    });

    const mostrar = () => {
        setClases("mostrar");
        setEquipo(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setEquipo(true);
    };


    useEffect(() => {
        fetchEquipos();
        fetchIconos();
    }, []);

    const abrirModalAgregar = () => {
        setAgregar(true);
        setEditar(false);
        setEquipoActual({
            Id_Equipo: null,
            Nombre: "",
            Descripcion: "",
            Id_Iconos_Id: ""
        });
    };


    const handleNuevoEquipoChange = ({ target }) => {
        setNuevoEquipo({ ...nuevoEquipo, [target.name]: target.value });
    };

    const cerrarModal = () => {
        setAgregar(false);
        setEditar(false);
        setEquipoActual({
            Id_Equipo: null,
            Nombre: "",
            Descripcion: "",
            Id_Iconos_Id: ""
        });
    };
    const abrirModalEditar = (equipo) => {
        setEditar(true);
        setAgregar(false);
        setEquipoActual({
            Id_Equipo: equipo.Id_Equipo,
            Nombre: equipo.Nombre,
            Descripcion: equipo.Descripcion,
            Id_Iconos_Id: equipo.Id_Iconos_Id
        });
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setEquipoActual({ ...equipoActual, [name]: value });
    };

    const handleIconChange = ({ target }) => {
        const { value } = target;
        setSelectedIcono(value);
        setEquipoActual({ ...equipoActual, Id_Iconos_Id: value });
    };

    const fetchIconos = async () => {
        try {
            const respuesta = await axios.get(`https://localhost:1800/vista-iconos`, {
                headers: { Authorization: autenticado },
            });
            setIconos(respuesta.data);
        } catch (error) {
            console.log("Error al cargar iconos:", error);
        }
    };
    const guardarEquipo = async () => {
        if (!equipoActual.Nombre || !equipoActual.Descripcion || !equipoActual.Id_Iconos_Id) {
            Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
            return;
        }

        try {
            let respuesta;
            if (editar) {
                respuesta = await axios.put(`https://localhost:1800/equipos/${equipoActual.Id_Equipo}`, equipoActual, {
                    headers: { Authorization: autenticado },
                });
            } else {
                respuesta = await axios.post(`https://localhost:1800/equipos`, {
                    ...equipoActual,
                    Id_Proyecto_Id: body.idProyecto, // Asegúrate de incluir el ID del proyecto
                }, {
                    headers: { Authorization: autenticado },
                });
            }

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire('¡Éxito!', `Equipo ${editar ? 'actualizado' : 'agregado'} con éxito`, 'success');
                setAgregar(false);
                setEditar(false);
                fetchEquipos();
            } else {
                Swal.fire('Error', respuesta.data.Mensaje, 'error');
            }
        } catch (error) {
            console.error(`Error al ${editar ? 'actualizar' : 'agregar'} el equipo:`, error);
            Swal.fire('Error', `No se pudo ${editar ? 'actualizar' : 'agregar'} el equipo`, 'error');
        }
        setAgregar(false);
        setEditar(false);
        fetchEquipos();
    };


    const editarEquipo = async () => {
        if (!body.Nombre || !body.Descripcion || !body.Id_Iconos_Id) {
            Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
            return;
        }
        try {
            const respuesta = await axios.put(`https://localhost:1800/editarEquipo/${body.idProyecto}/${body.Id}`, body, {
                headers: { Authorization: autenticado },
            });
            Swal.fire('¡Éxito!', 'Equipo actualizado con éxito', 'success');
            setEditar(false);
            fetchEquipos();
        } catch (error) {
            console.error("Error al actualizar el equipo:", error);
            Swal.fire('Error', 'No se pudo actualizar el equipo', 'error');
        }
        setEditar(false);
        fetchEquipos();
    };

    const borrarEquipo = async (idEquipo) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrará el equipo',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            try {
                const respuesta = await axios.delete(`https://localhost:1800/equipos/${idEquipo}`, {
                    headers: { Authorization: autenticado },
                });

                if (respuesta.data.Estatus === "Exitoso") {
                    Swal.fire('¡Éxito!', 'Equipo eliminado con éxito', 'success');
                    fetchEquipos();
                } else {
                    Swal.fire('Error', respuesta.data.Mensaje, 'error');
                }
            } catch (error) {
                console.error("Error al eliminar el equipo:", error);
                Swal.fire('Error', 'No se pudo eliminar el equipo', 'error');
            }
        }
        fetchEquipos();
    };

    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        if ( (name === "Nombre"||name=="Proposito") && /[&$+,´:;=?@#|'<>.^*()%-]/.test(value)) {
            return;
        }
        if (name === "radio") {
            setSelectedOption(value);
        } else {
            if (name === "opciones") {
                setSelectedIcono(value);
                setBody({ ...body, Id_Iconos_Id: value });
                const idIconoSeleccionado = target.options[target.selectedIndex].id;
                setSelectedIcono(idIconoSeleccionado)
            } else {
                setBody({ ...body, [name]: value });
            }
        }

    };

    const Enviar = async () => {
        if (!body.Nombre.length || !body.Proposito.length || body.Id_Iconos_Id == 0) {
            Swal.fire({
                title: '¡Error!',
                text: 'Rellene todos los campos y escoja un icono',
                icon: 'error',
            });
            return;
        }
        try {
            const autenticado = localStorage.getItem("token");

            const respuesta = await axios.post(`https://localhost:1800/RegistrarEquipo/${body.idProyecto}`, {
                Nombre: body.Nombre,
                Descripcion: body.Proposito,
                Id_Iconos_Id: body.Id_Iconos_Id,
                Id_Proyecto_Id: body.idProyecto,
                Estado: 1,
            }, {
                headers: {
                    Authorization: autenticado,
                },
            });

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Equipo creado con éxito',
                });
                setAgregar(false);
                setBody({
                    Nombre: "",
                    Fecha: "",
                    Proposito: "",
                    Id_Iconos_Id: "0"
                })
                fetchEquipos();
                setaProyecto(true);
                setSelectedIcono("nf-oct-circle");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al crear el equipo',
                });
            }
        } catch (error) {
            //console.log("Error al crear el equipo:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El proyecto no existe',
            });
        }
    };

    const modificar = (Id, Nombre_Proyecto, Descripcion, Direccion, Id_Icono, idproyecto) => {
        setBody({
            Nombre: Nombre_Proyecto,
            Proposito: Descripcion,
            Id_Iconos_Id: `${Id_Icono}`,
            idProyecto: idproyecto
        })
        setSelectedIcono(Direccion)
        setId(Id);
        setEditar(true);
    }
    const fetchEquipos = async () => {
        try {
            const respuesta = await axios.get(`https://localhost:1800/equipos`, {
                headers: {
                    Authorization: autenticado,
                },
            });
            setEquipos(respuesta.data.Equipos)
            console.log(respuesta.data.Equipos)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));
        if (!autenticado) {
            navigate("/")
        } else {


            fetchEquipos()
            fetchIconos();
        }
    }, []);



    return (
        <>
            {agregar && (
                <div className="modal">
                    <h1>Agregar Equipo</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setAgregar(false); setSelectedIcono("nf-oct-circle"); }}
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
                    <div className="entrada">
                        <input
                            type="number"
                            value={body.idProyecto}
                            onChange={cambioEntrada}
                            name="idProyecto"
                            placeholder="Ingrese el id del proyecto"
                        />
                    </div>
                    <div className="flex">
                        <i className={`nf ${selectedIcono} gran`}></i>
                        <select name="opciones" value={body.Id_Iconos_Id} onChange={cambioEntrada}>
                            <option value="0" id="nf-oct-circle">Escoge el icono del proyecto</option>
                            {iconos.map((lista2, index) => {
                                return (
                                    <option key={index} id={lista2.Direccion} value={`${lista2.Id_Iconos}`}><div>{lista2.Nombre}</div></option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Proposito}
                            onChange={cambioEntrada}
                            name="Proposito"
                            placeholder="Proposito del equipo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => Enviar()}
                    >
                        CREAR EQUIPO
                    </button>
                </div>
            )}
            <header className="head">
                <div>
                    {equipo ?
                        <i className="nf nf-cod-three_bars" onClick={mostrar}></i>
                        :
                        <i className="nf nf-oct-x" onClick={ocultar}></i>
                    }
                    <p>Gestion</p>
                </div>
                <Cerrar></Cerrar>
            </header>
            <main>
                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <section className="equiposr">
                    <div className="salir">
                        <h1 className="titulo">CRUD de Equipos</h1>
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={abrirModalAgregar}
                    >
                        AGREGAR EQUIPO
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipos.map((equipo) => (
                                <tr key={equipo.Id_Equipo}>
                                    <td>{equipo.Nombre}</td>
                                    <td>{equipo.Descripcion}</td>
                                    <td>
                                        <button onClick={() => {
                                            setAgregar(true);
                                            setEquipoActual(equipo);
                                            modificar(equipo.Id_Equipo, equipo.Nombre, equipo.Descripcion, equipo.Descripcion, equipo.Id_Icon_Id)
                                        }} className="boton-estilo_editar">Editar</button>
                                        <button onClick={() => borrarEquipo(equipo.Id_Equipo)} className="boton-estilo_eliminar">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {(editar) && (
                    <div className="modal">
                        <div className="entrada">
                            <input
                                type="text"
                                value={body.Nombre}
                                onChange={handleNuevoEquipoChange}
                                name="Nombre"
                                placeholder="Ingrese nombre del equipo"
                            />
                        </div>
                        <div className="flex">
                            <i className={`nf ${selectedIcono} gran`}></i>
                            <select name="Id_Iconos_Id" value={body.Id_Iconos_Id} onChange={handleIconChange}>
                                <option value="0" id="nf-oct-circle">Escoge el icono del proyecto</option>
                                {iconos.map((lista2, index) => (
                                    <option key={index} id={lista2.Direccion} value={lista2.Id_Iconos}>{lista2.Nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="entrada">
                            <textarea
                                type="text"
                                value={body.Descripcion}
                                onChange={handleInputChange}
                                name="Descripcion"
                                placeholder="Proposito del equipo"
                            />
                        </div>
                        <button onClick={guardarEquipo}>
                            {editar ? 'Editar' : 'Agregar'} Equipo
                        </button>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                )}
            </main>
        </>
    );
}






