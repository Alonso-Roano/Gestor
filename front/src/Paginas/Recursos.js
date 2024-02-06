import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import "../CSS/Recursos.css"
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";
import axios from "axios";
import Swal from "sweetalert2";

export default function Recursos() {
    const [acometario, setaComentario] = useState(true);
    const [Editar, setEditar] = useState(false);
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const { idProyecto, NombreProyecto } = useParams();
    const autenticado = localStorage.getItem("token");
    const [iconos, setIconos] = useState([]);
    const [header, payload, signature] = autenticado.split('.');
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    var decodedPayload = JSON.parse(atob(payload));
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [rol, setRol] = useState(3);
    const [recursos, setRecursos] = useState([]); // Estado para almacenar los recursos
    const [body, setBody] = useState({
        Nombre: "",
        Descripcion: "",
        Id_Iconos_Id: "0"
    });
    const [Agregar, setAgregar] = useState(false); // Estado para controlar la visibilidad del formulario
    const cambioEntrada = ({ target }) => {
        const { name, value, id } = target;
        if ((name === "Nombre" || name == "Descripcion" || name == "Proposito") && /[&$+,:;=?@#|'<>.^*()%-]/.test(value)) {
            return;
        }
        if (name === "opciones") {
            setSelectedIcono(value);
            setBody({ ...body, Id_Iconos_Id: value });
            const idIconoSeleccionado = target.options[target.selectedIndex].id;
            setSelectedIcono(idIconoSeleccionado)
        } else {
            setBody({ ...body, [name]: value });
        }
    };
    const cargarRecursos = async () => {
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/recursos/${idProyecto}`, // Reemplaza con tu URL
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            if(respuesta.data.Resultados.length==0){setaComentario(false)}
            else{setaComentario(true)}
            setRecursos(respuesta.data.Resultados);
        } catch (error) {
            //console.log(error);
        }
    };
    const fetchIconos = async () => {
        try {
            const respuesta = await axios.get(`https://localhost:1800/vista-iconos`, {
                headers: {
                    Authorization: autenticado,
                },
            });
            setIconos(respuesta.data)
        } catch (error) {
            //console.log(error);
        }
    };

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const respuesta = await axios.get(`https://localhost:1800/validacion_equipos/${decodedPayload.id}/${idProyecto}`, {
                    headers: {
                        Authorization: autenticado,
                    },
                });
                if (!respuesta.data.Equipos[0].Id_Rol_Id) navigate("/Proyectos");
                if (respuesta.data.Equipos[0].Id_Rol_Id !== 1) navigate("/Proyectos");
                setRol(respuesta.data.Equipos[0].Id_Rol_Id)
            } catch (error) {
                //console.log(error);
            }
        };
        fetchRol()
        cargarRecursos();
        fetchIconos();
    }, []);
    const agregarRecurso = async () => {
        if (!body.Nombre.length || !body.Descripcion.length || body.Id_Iconos_Id == 0) {
            Swal.fire({
                title: '¡Error!',
                text: 'Rellene todos los campos y escoja un icono',
                icon: 'error',
            });
            return;
        }
        try {
            const autenticado = localStorage.getItem("token");
            const respuesta = await axios.post(
                `https://localhost:1800/AgregarRecurso/${idProyecto}`, // Reemplaza con tu URL
                {
                    Nombre: body.Nombre,
                    Descripcion: body.Descripcion,
                    Id_Iconos_Id: body.Id_Iconos_Id,
                    Id_Proyecto_Id: idProyecto,
                },
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Recurso creado con éxito',
                });
                setAgregar(false);
                setBody({
                    Nombre: "",
                    Foto: "",
                    Biografia: "",
                });
                cargarRecursos(); // Recarga la lista de recursos después de agregar uno nuevo
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al crear el recurso',
                });
            }
        } catch (error) {
            //console.log("Error al crear el recurso:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el recurso',
            });
        }
    };
    const borrarRecurso = async (idRecurso) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrará el recurso',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            try {
                const autenticado = localStorage.getItem("token");
                const respuesta = await axios.put(
                    `https://localhost:1800/borrarRecurso/${idProyecto}/${idRecurso}`, // Reemplaza con tu URL
                    {},
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                if (respuesta.data.Estatus === "Exitoso") {
                    Swal.fire(
                        'Recurso eliminado correctamente'
                    );
                    cargarRecursos(); // Recarga la lista de recursos después de borrar uno
                } else {
                    //console.log("Error al eliminar el recurso");
                }
            } catch (error) {
                //console.log(error);
            }
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
    const Edit = async () => {
        if (body.Nombre == "") {
            if (body.Fecha == "") {
                if (body.Proposito == "") {
                    if (body.Id_Iconos_Id == 0 || body.Id_Iconos_Id == "") {
                        Swal.fire({
                            title: '¡Error!',
                            text: 'Rellene almenos un campo',
                            icon: 'error',
                        });
                        return;
                    }
                }
            }
        }

        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));

        try {
            const response = await axios.put(
                `https://localhost:1800/editarRecurso/${idProyecto}/${id}`,
                {
                    Nombre: body.Nombre.length == 0 ? null : body.Nombre,
                    Descripcion: body.Descripcion.length == 0 ? null : body.Descripcion,
                    Id_Iconos: body.Id_Iconos_Id == 0 ? null : body.Id_Iconos_Id,
                    Id_Proyecto: null,
                    Estado: null
                },
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            //console.log(response.data);
            Swal.fire({
                icon: "success",
                title: "Equipo editado con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
            setBody({ Nombre: "", Fecha: "", Proposito: "", Id_Iconos_Id: "0" }); setSelectedIcono("nf-oct-circle");
            cargarRecursos();
            setEditar(false);
        } catch (error) {
            console.error("Error al editar el equipo:", error);
            Swal.fire({
                icon: "error",
                title: "Error al editar el equipo",
                text: "Por favor, inténtalo de nuevo",
            });
        }
    }
    const modificar = (Id, Nombre, Descripcion, Id_Icono, Direccion) => {
        setBody({
            Nombre: Nombre,
            Descripcion: Descripcion,
            Id_Iconos_Id: `${Id_Icono}`
        })
        setSelectedIcono(Direccion)
        setId(Id);
        setEditar(true);
    }
    return (
        <>
            {Editar && (
                <div className="modal">
                    <h1>Editar Equipo</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setEditar(false); }}
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
                    <div className="flex">
                        <i className={`nf ${selectedIcono} gran`}></i>
                        <select name="opciones" value={body.Id_Iconos_Id} onChange={cambioEntrada}>
                            <option value="0" id="nf-oct-circle">Escoge el icono del proyecto</option>
                            {iconos.map((lista2, index) => {
                                return (
                                    <option id={lista2.Direccion} value={`${lista2.Id_Iconos}`} key={index}><div>{lista2.Nombre}</div></option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Descripcion}
                            onChange={cambioEntrada}
                            name="Descripcion"
                            placeholder="Proposito del equipo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => Edit()}
                    >
                        EDITAR EQUIPO
                    </button>
                </div>
            )}
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Recurso</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Id_Iconos_Id: "0", Descripcion: "", }); setAgregar(false); setSelectedIcono("nf-oct-circle") }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Ingrese nombre del recurso"
                        />
                    </div>
                    <div className="flex">
                        <i className={`nf ${selectedIcono} gran`}></i>
                        <select name="opciones" value={body.Id_Iconos_Id} onChange={cambioEntrada}>
                            <option value="0" id="nf-oct-circle">Escoge el icono del proyecto</option>
                            {iconos.map((lista2, index) => {
                                return (
                                    <option id={lista2.Direccion} value={`${lista2.Id_Iconos}`} key={index}><div>{lista2.Nombre}</div></option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Descripcion}
                            onChange={cambioEntrada}
                            name="Descripcion"
                            placeholder="Ingrese descripcion"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => agregarRecurso()}
                    >
                        AGREGAR RECURSO
                    </button>
                </div>
            )}
            <header className="head">
                <div>
                    {icono ?
                        <i className="nf nf-cod-three_bars" onClick={() => mostrar()}></i>
                        :
                        <i className="nf nf-oct-x" onClick={() => ocultar()}></i>
                    }
                    <img className="logo" src="/Logo.png"></img>
                    <p>Project Manager</p>
                </div>
                <Cerrar></Cerrar>
            </header>
            <main>
                <nav className={clases}>
                    <Slider></Slider>
                </nav>
                <section className="Recursos">
                    <h1 className="titulo">Recursos {rol == 1 ? <i className="nf nf-oct-plus_circle ma" tabIndex="1" onClick={() => setAgregar(true)}></i> : <></>} </h1>
                    <section>
                        <div className="equipos">
                            {acometario ?
                                recursos.map((recurso, index) => (
                                    <div key={index}>
                                        <span className="elem">
                                            <i className={`nf ${recurso.Direccion}`}></i>
                                        </span>
                                        <span className="elem">
                                        <h3>{recurso.Nombre}</h3>
                                        </span>
                                        <p className="des2">Descripcion: {recurso.Descripcion}</p>
                                        <span className="elem">
                                            {rol == 1 ? <button onClick={() => modificar(recurso.Id_Recurso,recurso.Nombre, recurso.Descripcion, recurso.Id_Iconos_Id, recurso.Direccion)}>Editar</button> : <></>}
                                            <Link className="link" to={`/Proyectos/${recurso.Id_Proyecto_Id}/${recurso.Nombre_Proyecto}/recursos/${recurso.Id_Recurso}/${recurso.Nombre}`}>Visualizar</Link>
                                        </span>
                                        {rol == 1 ? <i tabIndex="1" onClick={() => borrarRecurso(recurso.Id_Recurso)} className={`nf nf-cod-trash borrar borrar2`}></i> : <></>}
                                    </div>
                                ))

                                :
                                <p>Ningun recurso agregado</p>
                            }
                        </div>
                        <button className="boton" onClick={() => { navigate(`/Proyectos/${idProyecto}/${NombreProyecto}`) }}>Volver</button>
                    </section>
                </section>
            </main>
        </>
    );
}