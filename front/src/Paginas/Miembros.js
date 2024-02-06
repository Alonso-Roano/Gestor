import React, { useEffect, useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Miembros() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [Editar, setEditar] = useState(false);
    const [rol, setRol] = useState(3);
    const [Agregar, setAgregar] = useState(false);
    const [Comentarios, setComentarios] = useState(false);;
    const [equipo, setEquipo] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [Filtrados, setFiltrados] = useState([]);
    const [aproyecto, setaProyecto] = useState(true);
    const [acometario, setaComentario] = useState(true);
    const [selectedOption, setSelectedOption] = useState('1');
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    const [iconos, setIconos] = useState([]);
    const [comentarios, setComentarioss] = useState([]);
    const [comentario, setComentario] = useState([]);
    const [Perfil, setPerfil] = useState(false)
    const [body, setBody] = useState({
        Nombre: "",
        Carga: "",
        Rol:"1",
        Id:""
    });
    const [editar, setEdiar] = useState({
        Icono:"",
        Nombre: "",
        Carga: "",
        Rol:"0",
        Habilidades:"",
        Id:""
    });
    const { idProyecto, NombreProyecto, idEquipo, NombreEquipo } = useParams();
    const autenticado = localStorage.getItem("token");
    const [header, payload, signature] = autenticado.split('.');
    var decodedPayload = JSON.parse(atob(payload));
    const [id, setId] = useState("");
    const fetchEquipos = async () => {
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/miembros/${idEquipo}`,
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            if (respuesta.data.length == 0) { setaProyecto(false) }
            else { setaProyecto(true) }
            setEquipo(respuesta.data)
            setFiltrados(respuesta.data)
        } catch (error) {
            //console.log(error);
        }
    }
    const fetchComentarios = async () => {
        try {
            const respuesta = await axios.get(`https://localhost:1800/comentarios-equipo/${idEquipo}`, {
                headers: {
                    Authorization: autenticado,
                },
            });
            if (respuesta.data.length) { setaComentario(true) }
            else { setaComentario(false) }
            setComentarioss(respuesta.data)
        } catch (error) {
            //console.log(error);
        }
    };
    useEffect(() => {
        const fetchEquipo = async () => {
            try {
                const respuesta = await axios.get(
                    `https://localhost:1800/equipo/${idEquipo}`,
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                setEquipos(respuesta.data[0]);
            } catch (error) {
                //console.log(error);
            }
        };
        fetchEquipo();
        fetchEquipos();
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
                //console.log(error);
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
        if (body.Carga == "") {
                        Swal.fire({
                            title: '¡Error!',
                            text: 'Rellene carga',
                            icon: 'error',
                        });
                        return;
        }

        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));

        try {
            const response = await axios.put(
                `https://localhost:1800/editarCargaMiembroEquipo/${idProyecto}/${body.Id}/${idEquipo}`,
                {
                    Carga:body.Carga
                },
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            Swal.fire({
                icon: "success",
                title: "Carga editada con exito",
                showConfirmButton: false,
                timer: 1500,
            });
            setBody({ Nombre: "", Fecha: "", Proposito: "", Id_Iconos_Id: "0" }); setSelectedIcono("nf-oct-circle");
            fetchEquipos();
            setEditar(false);
        } catch (error) {
            console.error("Error al editar carga:", error);
            Swal.fire({
                icon: "error",
                title: "Error al editar carga",
                text: "Por favor, inténtalo de nuevo",
            });
        }
    }
    const modificar = (Id, Carga) => {
        setBody({
            Carga: Carga,
            Id: Id,
        })
        setEditar(true);
    }
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        if ( (name === "Nombre"||name=="Carga") && /[&$+,´:;=?@#|'<>.^*()%-]/.test(value)) {
            return;
        }
        if (name === "radio") {
            setSelectedOption(value);
        } else {
            if (name === "opciones") {
                setSelectedIcono(value);
                setBody({ ...body, Rol: value });
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
            const minusculaArtista = artist.Nombre_Miembro.toLowerCase();
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
        if (!body.Nombre.length || !body.Carga.length) {
            Swal.fire({
                title: '¡Error!',
                text: 'Rellene todos los campos',
                icon: 'error',
            });
            return;
        }
        try {
            const autenticado = localStorage.getItem("token");

            const respuesta = await axios.post(`https://localhost:1800/AgregarMiembroAEquipo/${idProyecto}`, {
                miembroId: body.Nombre,
                equipoId: idEquipo,
                rolId: body.Rol,
                carga: body.Carga
            }, {
                headers: {
                    Authorization: autenticado,
                },
            });

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Miembro agregado',
                });
                setAgregar(false);
                setBody({
                    Nombre: "",
                    Carga: "",
                    Rol: "0"
                })
                fetchEquipos();
                setaProyecto(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al agregar miembro',
                });
            }
        } catch (error) {
            //console.log("Error al crear el equipo:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Matricula invalida',
            });
        }
    };
    const borrar = async (valor) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrara el miembro',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            const id = valor;
            try {
                const autenticado = localStorage.getItem("token");
                const respuesta = await axios.delete(
                    `https://localhost:1800/borrarMiembro/${idProyecto}/${id}/${idEquipo}`,
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                if (respuesta.data.Estatus === "Exitoso") {
                    fetchEquipos();
                    Swal.fire(
                        'Miembro eliminado correctamente'
                    );
                } else {
                    //console.log("Error al eliminar la categoria")
                }
            } catch (error) {
                //console.log(error)
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
                    `https://localhost:1800/borrarComentarioEquipo/${idProyecto}/${id}`,
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
                    //console.log("Error al eliminar la categoria")
                }
            } catch (error) {
                //console.log(error)
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

            const respuesta = await axios.post(`https://localhost:1800/AgregarComentarioEquipo`, {
                Id_Equipo: idEquipo,
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
            //console.log("Error al crear comentario:", error);
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
                    <h1>Editar Carga</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setEditar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>

                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Carga}
                            onChange={cambioEntrada}
                            name="Carga"
                            className="coment"
                            placeholder="Carga de trabajo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={()=>Edit()}
                    >
                        EDITAR CARGA
                    </button>
                </div>
            )}
            {Perfil && (
                <div className="modal">
                    <h1>Perfil</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setPerfil(false); }}
                    >
                        <i className={`nf nf-oct-x text-2xl`}></i>
                    </button>
                    <i className={`nf ${editar.Icono} text-2xl per`}></i>
                    <p><b>Matricula: </b>{editar.Id}</p>
                    <p><b>Nombre: </b>{editar.Nombre}</p>
                    <p><b>Habilidades: </b>{editar.Habilidades}</p>
                    <p><b>Carga:</b> {editar.Carga}</p>
                </div>
            )}
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Miembro</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Carga: "", Rol: "0", }); setAgregar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Ingrese matricula del miembro"
                        />
                    </div>
                    <select name="opciones" value={body.Rol} onChange={cambioEntrada}>
                            <option value="1" id="nf-oct-circle">Lider de proyecto</option>
                            <option id="" value="2"><div>Sublider</div></option>
                            <option id="" value="3"><div>Miembro</div></option>
                        </select>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Carga}
                            onChange={cambioEntrada}
                            name="Carga"
                            placeholder="Ingrese carga de trabajo"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={()=>Enviar()}
                    >
                        AGREGAR MIEMBRO
                    </button>
                </div>
            )}
            {Comentarios && (
                <div className="modal">
                    <h1>Agregar un Comentario</h1>
                    <button
                        className="salir"
                        onClick={() => { setComentarios(false); setComentario("") }}
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
                    <h1 className="titulo">{equipos.Nombre} <i className={`nf ${equipos.Direccion}`} onClick={() => setAgregar(true)}></i></h1>
                    <span className="buscador">
                        <p>Equipos:</p>
                        <input type="text" placeholder="Ingrese el nombre del miembro" onChange={handleSearchChange} />
                        {rol == 1 || rol == 2 ? <i className="nf nf-oct-plus_circle" onClick={() => setAgregar(true)}></i> : <></>}
                        <button onClick={() => navigate(`/Proyectos/${idProyecto}/${NombreProyecto}`)}>Volver</button>
                    </span>
                    <aside className="equi">
                        <section className="partes">
                            <div className="miembros">
                                {aproyecto ?
                                    <>
                                        {Filtrados.map((lista, index) => {
                                            return (
                                                <div className="miembro" key={index}>
                                                    <span className="elem">
                                                    <i className={`nf ${lista.Direccion}`}></i></span>
                                                    <h3>{lista.Nombre_Miembro}</h3>
                                                    <span className="elem">
                                                        {rol == 1 ? <button onClick={() => modificar(lista.Id_Miembro,lista.Carga)}>Editar</button>:<></>}
                                                        <p onClick={() =>{ setPerfil(true);
                                                        setEdiar({
                                                            Icono:lista.Direccion,
                                                            Nombre:lista.Nombre_Miembro,
                                                            Carga:lista.Carga,
                                                            Habilidades:lista.Habilidades,
                                                            Id:lista.Id_Miembro
                                                        })
                                                        }}>Visualizar</p>
                                                    </span>
                                                    {rol == 1 ? <i tabIndex="1" onClick={() => borrar(lista.Id_Miembro)} className={`nf nf-cod-trash borrar borrar2`}></i> : <></>}
                                                </div>
                                            );
                                        })}
                                    </>
                                    :
                                    <h4><center>No se encontró ningun equipo</center></h4>
                                }
                            </div>
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
                                    <button onClick={() => setComentarios(true)}>Agregar comentario</button>
                                </span>
                            </div>
                            <div className="opciones">
                                <p className="decrip mar"><b>Descripcion:</b> <br></br><br></br>
                                    {equipos.Descripcion}
                                </p>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
            
        </>
    );
}
