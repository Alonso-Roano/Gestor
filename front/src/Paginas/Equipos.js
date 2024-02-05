import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import axios from "axios";
import Swal from "sweetalert2";

export default function Equipos() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Editar, setEditar] = useState(false);
    const [rol, setRol] = useState(3);
    const [Agregar, setAgregar] = useState(false);
    const [Comentarios, setComentarios] = useState(false);
    const [equipo, setEquipo] = useState([]);
    const [proyecto, setProyecto] = useState([]);
    const [Filtrados, setFiltrados] = useState([]);
    const [aproyecto, setaProyecto] = useState(true);
    const [acometario, setaComentario] = useState(true);
    const [selectedOption, setSelectedOption] = useState('1');
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    const [iconos, setIconos] = useState([]);
    const [comentarios, setComentarioss] = useState([]);
    const [comentario, setComentario] = useState([]);
    const [body, setBody] = useState({
        Nombre: "",
        Fecha: "",
        Proposito: "",
        Id_Iconos_Id: ""
    });
    const { idProyecto, NombreProyecto } = useParams();
    const autenticado = localStorage.getItem("token");
    const [header, payload, signature] = autenticado.split('.');
    var decodedPayload = JSON.parse(atob(payload));
    const [id, setId] = useState("");
    const fetchEquipos = async () => {
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/equipos/${idProyecto}`,
                {
                    headers: {
                        Authorization: `${autenticado}`,
                    },
                }
            );
            if (respuesta.data.length == 0) { setaProyecto(false) }
            else { setaProyecto(true) }
            setEquipo(respuesta.data);
            setFiltrados(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchComentarios = async () => {
        try {
            const respuesta = await axios.get(`https://localhost:1800/comentarios-proyecto/${idProyecto}`, {
                headers: {
                    Authorization: autenticado,
                },
            });
            if (respuesta.data.length) { setaComentario(true) }
            else { setaComentario(false) }
            setComentarioss(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const respuesta = await axios.get(
                    `https://localhost:1800/proyecto/${idProyecto}`,
                    {
                        headers: {
                            Authorization: `${autenticado}`,
                        },
                    }
                );
                setProyecto(respuesta.data[0]);
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
            } catch (error) {
                console.log(error);
            }
        };
        fetchProyectos();
        fetchEquipos();
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
        fetchIcono();
        const fetchRol = async () => {
            try {
                const respuesta = await axios.get(`https://localhost:1800/validacion_equipos/${decodedPayload.id}/${idProyecto}`, {
                    headers: {
                        Authorization: autenticado,
                    },
                });
                if (!respuesta.data.Equipos[0].Id_Rol_Id) navigate("/Proyectos");
                setRol(respuesta.data.Equipos[0].Id_Rol_Id)
            } catch (error) {
                console.log(error);
            }
        };
        fetchRol()
        fetchComentarios()
    }, []);
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
                `https://localhost:1800/editarEquipo/${idProyecto}/${id}`,
                {
                    Nombre: body.Nombre.length == 0 ? null : body.Nombre,
                    Descripcion: body.Proposito.length == 0 ? null : body.Proposito,
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
            console.log(response.data);
            Swal.fire({
                icon: "success",
                title: "Equipo editado con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
            setBody({ Nombre: "", Fecha: "", Proposito: "", Id_Iconos_Id: "0" }); setSelectedIcono("nf-oct-circle");
            fetchEquipos();
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
    const modificar = (Id, Nombre_Proyecto, Descripcion, Direccion, Id_Icono) => {
        setBody({
            Nombre: Nombre_Proyecto,
            Proposito: Descripcion,
            Id_Iconos_Id: `${Id_Icono}`
        })
        setSelectedIcono(Direccion)
        setId(Id);
        setEditar(true);
    }
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
    const cambioEntrada2 = ({ target }) => {
        const { name, value } = target;
        if(/[&$+,´:;=?@#|'<>.^*()%-]/.test(value)){
            return;
        }
        setComentario(value);
    };
    const filtroBusqueda = (lista, busqueda) => {
        const palabrasBusqueda = busqueda.toLowerCase().split(' ');

        const filtrarPorNombre = lista.filter(artist => {
            const minusculaArtista = artist.Nombre_Equipo.toLowerCase();
            return palabrasBusqueda.every(palabra => minusculaArtista.includes(palabra));
        });
        if (!filtrarPorNombre.length) { setaProyecto(false); }
        else { setaProyecto(true) }
        setFiltrados(filtrarPorNombre);
    };
    const handleSearchChange = (event) => {
        filtroBusqueda(equipo, event.target.value);
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

            const respuesta = await axios.post(`https://localhost:1800/RegistrarEquipo/${idProyecto}`, {
                Nombre: body.Nombre,
                Descripcion: body.Proposito,
                Id_Iconos_Id: body.Id_Iconos_Id,
                Id_Proyecto_Id: idProyecto,
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
            console.log("Error al crear el equipo:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el equipo',
            });
        }
    };
    const borrar = async (valor) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrara el equipo',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            const id = valor;
            try {
                const autenticado = localStorage.getItem("token");
                const respuesta = await axios.put(
                    `https://localhost:1800/borrarEquipo/${idProyecto}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                if (respuesta.data.Estatus === "Exitoso") {
                    fetchEquipos();
                    Swal.fire(
                        'Equipo eliminado correctamente'
                    );
                } else {
                    console.log("Error al eliminar la categoria")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const borrar2 = async (valor) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrara el comentario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            const id = valor;
            try {
                const autenticado = localStorage.getItem("token");
                const respuesta = await axios.put(
                    `https://localhost:1800/borrarComentarioProyecto/${idProyecto}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                if (respuesta.data.Estatus === "Exitoso") {
                    fetchComentarios();
                    Swal.fire(
                        'Cometario eliminado correctamente'
                    );
                } else {
                    console.log("Error al eliminar la categoria")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const agregarCom = async () => {
        if (!comentario.length) {
            Swal.fire({
                title: '¡Error!',
                text: 'Ingrese un comentario',
                icon: 'error',
            });
            return;
        }
        try {
            const autenticado = localStorage.getItem("token");

            const respuesta = await axios.post(`https://localhost:1800/AgregarComentarioProyecto/${idProyecto}`, {
                Id_Proyecto: idProyecto,
                Id_Miembro: decodedPayload.id,
                Descripcion: comentario,
                Estado: 1
            }, {
                headers: {
                    Authorization: autenticado,
                },
            });

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Comentario agregado',
                });
                setComentarios(false);
                fetchComentarios();
                setaComentario(true);
                setSelectedIcono("nf-oct-circle");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al agregar comentario',
                });
            }
        } catch (error) {
            console.log("Error al crear comentario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el comentario',
            });
        }
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
                            value={body.Proposito}
                            onChange={cambioEntrada}
                            name="Proposito"
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
            {Comentarios && (
                <div className="modal">
                    <h1>Agregar un Comentario</h1>
                    <button
                        className="salir"
                        onClick={() => { setComentarios(false); setComentario("")}}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={comentario}
                            onChange={cambioEntrada2}
                            name="Biografia"
                            className="coment"
                            placeholder="Introduce un comentario"
                        />
                    </div>
                    <button
                        className=""
                        onClick={() => agregarCom()}
                    >
                        COMENTAR
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
                <section >
                    <h1 className="titulo">{proyecto.Nombre} <i className={`nf ${proyecto.Direccion}`}></i></h1>
                    <span className="buscador">
                        <p>Equipos: </p>
                        <input type="text" placeholder="Ingrese el nombre del equipo" onChange={handleSearchChange} />
                        {rol == 1 || rol == 2 ? <i className="nf nf-oct-plus_circle" onClick={() => setAgregar(true)}></i> : <></>}
                        {rol == 1 ? <button onClick={() => navigate(`/Proyectos/${idProyecto}/${NombreProyecto}/Recursos`)}>Recursos</button> : <></>}
                        <button onClick={() => navigate(`/Proyectos`)}>Volver</button>
                    </span>
                    <aside className="equi">
                        <section className="partes">
                            <div className="equipos">
                                {aproyecto ? <>
                                    {Filtrados.map((lista, index) => {
                                        return (
                                            <div key={index}>
                                                <span className="elem">
                                                    
                                                    <i className={`nf ${lista.Direccion}`}></i>
                                                </span>
                                                <h3>{lista.Nombre_Equipo}</h3>
                                                <p className="des">{lista.Descripcion_Equipo}</p>
                                                <span className="elem">
                                                    {rol == 1 ? <button onClick={() => modificar(lista.Id_Equipo, lista.Nombre_Equipo, lista.Descripcion_Equipo, lista.Direccion, lista.Id_Iconos_Id)}>Editar</button> : <></>}
                                                    <p onClick={() => navigate(`/Proyectos/${idProyecto}/${NombreProyecto}/equipos/${lista.Id_Equipo}/${lista.Nombre_Equipo}`)}>Visualizar</p>
                                                </span>
                                                {rol == 1 ? <i tabIndex="1" onClick={() => borrar(lista.Id_Equipo)} className={`nf nf-cod-trash borrar borrar2`}></i> : <></>}
                                            </div>
                                        );
                                    })}
                                </>
                                    :
                                    <h4><center>No se encontró ningun equipo</center></h4>
                                }

                            </div>
                            <p className="decrip"><b>Descripcion:</b> <br></br><br></br>
                                {proyecto.Descripcion}
                            </p>
                        </section>
                        <div className="elementos">
                            <div className="comentarios">
                                <span className="cont">
                                    <h4>Comentarios</h4>
                                    <div>
                                        {acometario ?
                                            comentarios.map((lista, index) => {
                                                const fecha = lista.Fecha.split("T");
                                                return (
                                                    <article key={index}>
                                                        <span><b>{lista.Nombre_Miembro}</b><b>{fecha[0]}</b></span>
                                                        <p>{lista.Descripcion}</p>
                                                        {rol == 1 ? <i tabIndex="1" onClick={() => borrar2(lista.Id_Comentarios)} className={`nf nf-cod-trash borrar borrar2`}></i> : <></>}
                                                    </article>
                                                );
                                            })

                                            :
                                            <p>Ningun comentario agregado</p>
                                        }

                                    </div>
                                    {rol == 1 || rol == 2 ? <button onClick={() => setComentarios(true)}>Agregar comentario</button> : <></>}
                                </span>
                            </div>
                            <div className="opciones">
                                <p className="actua">Estado del proyecto:</p>
                                {proyecto.Estado == 1 && (<button className="rojo">Pendiente</button>)}
                                {proyecto.Estado == 2 && (<button className="amarillo">En curso</button>)}
                                {proyecto.Estado == 3 && (<button className="verde">Completado</button>)}
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}