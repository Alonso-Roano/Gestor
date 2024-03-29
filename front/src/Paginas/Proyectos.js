import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import "../CSS/Modales.css";
import Slider from "../Componentes/Slider";
import Cerrar from "../Componentes/CerrarSesion";
import axios from "axios";
import Swal from "sweetalert2";

export default function Proyectos() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [iconos, setIconos] = useState([]);
    const [Editar, setEditar] = useState(false);
    const [Agregar, setAgregar] = useState(false);
    const [id, setId] = useState("");
    const [proyecto, setProyecto] = useState([]);
    const [aproyecto, setaProyecto] = useState(true);
    const [selectedOption, setSelectedOption] = useState('1');
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    const [Filtrados, setFiltrados] = useState([]);
    const fetchProyectos = async () => {
        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/miembro-proyectos/${decodedPayload.id}`,
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            if (respuesta.data.Proyectos.length == 0) setaProyecto(false);
            setProyecto(respuesta.data.Proyectos)
            setFiltrados(respuesta.data.Proyectos);
        } catch (error) {
            //console.log(error);
        }
    };
    useEffect(() => {
        const url = `/Proyectos`;
        window.history.replaceState({}, "", url);
        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));
        if (!autenticado) {
            navigate("/")
        } else {
            fetchProyectos();
            const fetchIcono = async () => {
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
            fetchIcono()
        }
    }, []);
    const [body, setBody] = useState({
        Nombre: "",
        Fecha: "",
        Proposito: "",
        Id_Iconos_Id: ""
    });
    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };
    const modificar = (Id, Nombre_Proyecto, Descripcion, Fecha_Final, Estado, Direccion, Id_Icono) => {
        setBody({
            Nombre: Nombre_Proyecto,
            Fecha: Fecha_Final,
            Proposito: Descripcion,
            Id_Iconos_Id: `${Id_Icono}`
        })
        setSelectedOption(`${Estado}`);
        setSelectedIcono(Direccion)
        setId(Id);
        setEditar(true);
    }
    const Enviar = async () => {
        if (!body.Nombre.length || !body.Fecha.length || !body.Proposito.length || body.Id_Iconos_Id == 0) {
            Swal.fire({
                title: '¡Error!',
                text: 'Rellene todos los campos y escoja un icono',
                icon: 'error',
            });
            return;
        }
        try {
            const autenticado = localStorage.getItem("token");

            const respuesta = await axios.post("https://localhost:1800/CrearProyecto", {
                Nombre: body.Nombre,
                Id_Iconos_Id: body.Id_Iconos_Id,
                Descripcion: body.Proposito,
                Fecha_Final: body.Fecha,
                Estado: 1,
            }, {
                headers: {
                    Authorization: autenticado,
                },
            });

            if (respuesta.data.Estatus === "Exitoso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Proyecto creado con éxito',
                });
                setAgregar(false);
                setBody({
                    Nombre: "",
                    Fecha: "",
                    Proposito: "",
                    Id_Iconos_Id: "0"
                })
                fetchProyectos();
                setaProyecto(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al crear el proyecto',
                });
            }
        } catch (error) {
            //console.log("Error al crear el proyecto:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el proyecto',
            });
        }
    };
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        if ((name === "Nombre" || name == "Fecha" || name == "Proposito") && /[&$+,´:;=?@#|'<>.^*()%-]/.test(value)) {
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
                `https://localhost:1800/editarProyecto/${id}`,
                {
                    Nombre: body.Nombre.length == 0 ? null : body.Nombre,
                    Descripcion: body.Proposito.length == 0 ? null : body.Proposito,
                    Id_Iconos: body.Id_Iconos_Id == 0 ? null : body.Id_Iconos_Id,
                    Fecha_Final: body.Fecha.length == 0 ? null : body.Fecha,
                    Estado: selectedOption
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
                title: "Proyecto editado con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
            setBody({ Nombre: "", Fecha: "", Proposito: "", Id_Iconos_Id: "0" }); setSelectedIcono("nf-oct-circle");
            fetchProyectos();
            setEditar(false);
        } catch (error) {
            console.error("Error al editar el Proyecto:", error);
            Swal.fire({
                icon: "error",
                title: "Error al editar el Proyecto",
                text: "Por favor, inténtalo de nuevo",
            });
        }
    }
    const borrar = async (valor) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrara el proyecto',
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
                    `https://localhost:1800/borrarProyecto/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                if (respuesta.data.Estatus === "Exitoso") {
                    fetchProyectos();
                    Swal.fire(
                        'Proyecto eliminado correctamente'
                    );
                } else {
                    //console.log("Error al eliminar la categoria")
                }
            } catch (error) {
                //console.log(error)
            }
        }
    }
    const filtroBusqueda = (lista, busqueda) => {
        const palabrasBusqueda = busqueda.toLowerCase().split(' ');

        const filtrarPorNombre = lista.filter(artist => {
            const minusculaArtista = artist.Nombre.toLowerCase();
            return palabrasBusqueda.every(palabra => minusculaArtista.includes(palabra));
        });
        if (!filtrarPorNombre.length) { setaProyecto(false); }
        else { setaProyecto(true) }
        setFiltrados(filtrarPorNombre);
    };
    const handleSearchChange = (event) => {
        filtroBusqueda(proyecto, event.target.value);
    };
    return (
        <>
            {Editar && (
                <div className="modal">
                    <h1>Editar Proyecto</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Fecha: "", Proposito: "", Id_Iconos_Id: "0" }); setSelectedIcono("nf-oct-circle"); setEditar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder={body.Nombre}
                        />
                    </div>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Fecha}
                            onChange={cambioEntrada}
                            name="Fecha"
                            placeholder={body.Fecha}
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
                            placeholder="Proposito del proyecto"
                        />
                    </div>
                    <div className="flex">
                        <label className={selectedOption === '1' ? 'seleccionado1' : ''}>
                            <input
                                type="radio"
                                name="radio"
                                value="1"
                                checked={selectedOption === '1'}
                                onChange={cambioEntrada}
                            />
                            Pendiente
                        </label>

                        <label className={selectedOption === '2' ? 'seleccionado2' : ''}>
                            <input
                                type="radio"
                                name="radio"
                                value="2"
                                checked={selectedOption === '2'}
                                onChange={cambioEntrada}
                            />
                            En curso
                        </label>

                        <label className={selectedOption === '3' ? 'seleccionado3' : ''}>
                            <input
                                type="radio"
                                name="radio"
                                value="3"
                                checked={selectedOption === '3'}
                                onChange={cambioEntrada}
                            />
                            Completado
                        </label>
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => Edit()}
                    >
                        EDITAR PROYECTO
                    </button>
                </div>
            )}
            {Agregar && (
                <div className="modal">
                    <h1>Agregar Proyecto</h1>
                    <button
                        className="salir"
                        onClick={() => { setAgregar(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            placeholder="Ingrese nombre del proyecto"
                        />
                    </div>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Fecha}
                            onChange={cambioEntrada}
                            name="Fecha"
                            placeholder="Ingrese fecha limite del proyecto"
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
                            placeholder="Proposito del proyecto"
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => Enviar()}
                    >
                        CREAR PROYECTO
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
                <section className="equipor" >
                    <h1 className="titulo ma">Proyectos <i className="nf nf-oct-plus_circle " tabIndex="1" onClick={() => setAgregar(true)}></i></h1>
                    <div className="flex2">
                        <div>
                            <input
                                type="text"
                                placeholder="Buscar por nombre de proyecto"
                                className="w-full h-full pl-[10px] rounded-[5px] text-black outline-none"
                                onChange={handleSearchChange}
                            />
                            <i className="nf nf-fa-search text-white font-medium text-xl m-3"></i>
                        </div>
                    </div>
                    <aside className="proyectos">
                        {aproyecto ? <>
                            {Filtrados.map((lista, index) => {
                                return (
                                    <div key={index}>
                                        <i className={`nf ${lista.Direccion}`}></i>
                                        <h3>{lista.Nombre}</h3>
                                        <p className="des">{lista.Descripcion}</p>
                                        <span className="elem">
                                            <span className={lista.Estado == 1 ? "rojo" : lista.Estado == 2 ? "amarillo" : "verde"}>{lista.Estado == 1 ? "Pendiente" : lista.Estado == 2 ? "En curso" : "Completado"}</span>
                                            {lista.Id_Rol_Id == 1 ? <button onClick={() => modificar(lista.Id_Proyecto, lista.Nombre_Proyecto, lista.Descripcion, lista.Fecha_Final, lista.Estado, lista.Direccion, lista.Id_Iconos_Id)}>Editar</button> : <></>}
                                            <p onClick={() => { navigate(`/Proyectos/${lista.Id_Proyecto_Id}/${lista.Nombre}`) }}>Visualizar</p>
                                        </span>
                                        {lista.Id_Rol_Id == 1 ? <i tabIndex="1" onClick={() => borrar(lista.Id_Proyecto_Id)} className={`nf nf-cod-trash borrar`}></i> : <></>}
                                    </div>
                                );
                            })}
                        </>
                            :
                            <p>No se encontró ningun proyecto</p>
                        }
                    </aside>
                </section>
            </main>
        </>
    );
}