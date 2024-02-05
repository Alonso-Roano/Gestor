import React, { useEffect, useState } from "react";
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import Perfil from "../Componentes/Perfil";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Elementos() {
    const navigate = useNavigate();
    const { idProyecto, NombreProyecto, idRecurso, NombreRecurso } = useParams();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Agregar, setAgregar] = useState(false);
    const [Asignar, setAsignar] = useState(false);
    const [recursos, setRecursos] = useState([]);
    const [elemento, setElemento] = useState([]);
    const [iconos, setIconos] = useState([]);
    const [acometario, setaComentario] = useState(true);
    const autenticado = localStorage.getItem("token");
    const [header, payload, signature] = autenticado.split('.');
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    var decodedPayload = JSON.parse(atob(payload));
    const [body, setBody] = useState({
        Nombre: "",
        Descripcion: "",
        Id_Iconos_Id: "0",
        miembro: "",
        ele: ""
    });
    const cargarRecursos = async () => {
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/recurso/${idRecurso}`, // Reemplaza con tu URL
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            setRecursos(respuesta.data.Resultados[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const cargarElementos = async () => {
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/elementos-recurso/${idRecurso}`, // Reemplaza con tu URL
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            if (respuesta.data.length == 0) { setaComentario(false) }
            else { setaComentario(true) }
            setElemento(respuesta.data);
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    };
    useEffect(() => {
        cargarRecursos();
        fetchIconos();
        cargarElementos();
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
                `https://localhost:1800/AgregarElemento/${idProyecto}`,
                {
                    Nombre: body.Nombre,
                    Descripcion: body.Descripcion,
                    Precio: 100,
                    Id_Iconos_Id: body.Id_Iconos_Id,
                    Id_Recurso_Id: idRecurso,
                    Id_Miembro_Id: null,
                    Estado: 1,
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
                    Descripcion: "",
                    Id_Iconos_Id: "0",
                });
                setSelectedIcono("nf-oct-circle")
                cargarElementos(); // Recarga la lista de recursos después de agregar uno nuevo
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al crear el recurso',
                });
            }
        } catch (error) {
            console.log("Error al crear el recurso:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el recurso',
            });
        }
    };
    const asignarRecurso = async () => {
        if (!body.miembro.length) {
            Swal.fire({
                title: '¡Error!',
                text: 'Inserte la matricula del miembro',
                icon: 'error',
            });
            return;
        }
        try {
            const autenticado = localStorage.getItem("token");
            const respuesta = await axios.put(
                `https://localhost:1800/asignarElemento/${idProyecto}/${body.ele}/${body.miembro}`,
                {
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
                    title: 'Recurso asignado con éxito',
                });
                setAsignar(false)
                cargarElementos(); // Recarga la lista de recursos después de agregar uno nuevo
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al agregar el miembro',
                });
            }
        } catch (error) {
            console.log("Error al crear el recurso:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el recurso',
            });
        }
    };
    const desasignarRecurso = async (valor) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se desadignará el miembro del recurso',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            try {
                const autenticado = localStorage.getItem("token");
                const respuesta = await axios.put(
                    `https://localhost:1800/desasignarElemento/${idProyecto}/${valor}`,
                    {
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
                        title: 'Recurso desasignado con éxito',
                    });
                    cargarElementos(); // Recarga la lista de recursos después de agregar uno nuevo
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al agregar el miembro',
                    });
                }
            } catch (error) {
                console.log("Error al crear el recurso:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al crear el recurso',
                });
            }
        }
    };
    const cambioEntrada = ({ target }) => {
        const { name, value, id } = target;
        if ((name === "Nombre" || name == "Descripcion" || name == "Proposito" || name == "miembro") && /[&$+,:;=?@#|'<>.^*()%-]/.test(value)) {
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
    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
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
                    `https://localhost:1800/borrarElemento/${idProyecto}/${idRecurso}`, // Reemplaza con tu URL
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
                    cargarElementos(); // Recarga la lista de recursos después de borrar uno
                } else {
                    console.log("Error al eliminar el recurso");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Elemento</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Descripcion: "", Id_Iconos_Id: "0", }); setAgregar(false); setSelectedIcono("nf-oct-circle") }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Ingrese nombre del elemento"
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
                        AGREGAR ELEMENTO
                    </button>
                </div>
            )}
            {Asignar && (
                <div className="modal">
                    <h1>Asignar Elemento</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ miembro: "" }); setAsignar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="number" inputMode="numeric"
                            value={body.miembro}
                            onChange={cambioEntrada}
                            name="miembro"
                            placeholder="Matricula de miembro"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => asignarRecurso()}
                    >
                        ASIGNAR
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
                    <h1 className="titulo">Recursos <i className="nf nf-oct-plus_circle ma" tabIndex="1" onClick={() => setAgregar(true)}></i></h1>
                    <section>
                        <article className="titulo2">
                            <span className="icono_cont">
                                <i className={`nf ${recursos.Direccion}`}></i>
                            </span>
                            <span className="titulo_cont">
                                <p>{recursos.Nombre}</p>
                            </span>
                        </article>
                        <div className="equipos ele">
                            {acometario ?
                                elemento.map((recurso, index) => (
                                    <div className="elemento" key={index}>
                                        <span className="elem">
                                            <h3>{recurso.Nombre}</h3>
                                            <i className={`nf ${recurso.Direccion}`}></i>
                                        </span>
                                        <p className="des tex">Matricula: {recurso.Id_Recurso}</p>
                                        <p className="des tex">Descripcion: {recurso.Descripcion}</p>
                                        <p className="des tex">Asignado a: {recurso.Nombre_Propietario ? recurso.Nombre_Propietario : "Nadie"}</p>
                                        <span className="elem">
                                            <span className={recurso.Nombre_Propietario ? "rojo" : "verde"} onClick={() => {setBody({ ele: recurso.Id_Recurso }); recurso.Nombre_Propietario ? setAsignar(false) : setAsignar(true); recurso.Nombre_Propietario ? desasignarRecurso(recurso.Id_Recurso) : setBody({ ele: recurso.Id_Recurso }) ; }}>{recurso.Nombre_Propietario ? "Desasignar" : "Asignar"}</span>
                                            <i className="nf nf-cod-trash" tabIndex="1" onClick={()=>{borrarRecurso(recurso.Id_Recurso)}}></i>
                                        </span>
                                    </div>
                                ))

                                :
                                <p>Ningun elemento agregado</p>
                            }
                            <button className="boton" onClick={() => navigate(`/Proyectos/${idProyecto}/${NombreProyecto}/recursos`)}>Volver</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    );
}