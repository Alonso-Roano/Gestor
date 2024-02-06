import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Slider() {
    const navigate = useNavigate();
    const [datos, setDatos] = useState([]);
    const [proyecto, setProyecto] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [aproyecto, setaProyecto] = useState(true);
    const [aequipos, setaEquipos] = useState(true);
    const [amiembros, setaMiembros] = useState(true);
    const [icono, setIcono] = useState(true);
    const [iconos, setIconos] = useState([]);
    const fetchDatos = async () => {
        const autenticado = localStorage.getItem("token");
        if(autenticado){
            const [header, payload, signature] = autenticado.split('.');
            var decodedPayload = JSON.parse(atob(payload));
        }
        try {
            const respuesta = await axios.get(
                `https://localhost:1800/usuario/${decodedPayload.id}`,
                {
                    headers: {
                        Authorization: autenticado,
                    },
                }
            );
            setBody({Id_Iconos_Id:`${respuesta.data.Usuario.Id_Iconos_Id}`});
            setSelectedIcono(`${respuesta.data.Usuario.Direccion}`)
            setDatos(respuesta.data.Usuario)
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
            fetchDatos();
            const fetchProyectos = async () => {
                try {
                    const respuesta = await axios.get(
                        `https://localhost:1800/miembro-proyectos/${decodedPayload.id}`,
                        {
                            headers: {
                                Authorization: autenticado,
                            },
                        }
                    );
                    if (respuesta.data.Proyectos.length==0) setaProyecto(false);
                    setProyecto(respuesta.data.Proyectos)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchProyectos();
            const fetchEquipos = async () => {
                try {
                    const respuesta = await axios.get(
                        `https://localhost:1800/miembro-equipos/${decodedPayload.id}`,
                        {
                            headers: {
                                Authorization: autenticado,
                            },
                        }
                    );
                    if (respuesta.data.Equipos.length==0) setaEquipos(false);
                    setEquipos(respuesta.data.Equipos);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchEquipos();
            const fetchMiembros = async () => {
                try {
                    const respuesta = await axios.get(
                        `https://localhost:1800/miembros-miembros/${decodedPayload.id}`,
                        {
                            headers: {
                                Authorization: autenticado,
                            },
                        }
                    );
                    if (respuesta.data.MiembrosRelacionados.length==0) setaMiembros(false);
                    setMiembros(respuesta.data.MiembrosRelacionados);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchMiembros();
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
            const fetchDatosWrapper = async () => {
                await fetchProyectos();
                await fetchEquipos();
                await fetchMiembros();
                if(proyecto.length>0){
                    setaProyecto(true);
                }
            };
            const intervalId = setInterval(fetchDatosWrapper, 5000);
            return () => clearInterval(intervalId);
        }
    }, []);
    const [Perfil, setPerfil] = useState(false);
    const [body, setBody] = useState({
        Contrasenia: "",
        Habilidades: "",
        Proposito: "",
        Id_Iconos_Id: ""
    });
    const [selectedIcono, setSelectedIcono] = useState("nf-oct-circle");
    const cambioEntrada = ({ target }) => {
        const { name, value, id } = target;
        if ( (name === "Nombre"||name=="Habilidades"||name=="Proposito") && /[&$+,:;=?@#|'<>.^*()%-]/.test(value)) {
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
    const editarUsuario = async () => {
        if (body.Contrasenia == "") {
            if (body.Habilidades == "") {
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
        if (body.Contrasenia == "") {
            const { value: textoIngresado } = await Swal.fire({
              title: "Introduce la contraseña antigua",
              input: "text",
              inputPlaceholder: "Contraseña",
              showCancelButton: true,
              confirmButtonText: "Aceptar",
              cancelButtonText: "Cancelar",
            });
    
            if (textoIngresado) {
              const verificarUsuario = await axios.post("https://localhost:1800/InicioSesion", {
                Nombre: datos.Nombre,
                Contrasenia: textoIngresado,
              });
              if (verificarUsuario.data.Estatus === "Exitoso") {
              } else {
                Swal.fire("Contraseña incorrecta");
                return;
              }
            } else {
              return;
            }
          }

        const autenticado = localStorage.getItem("token");
        const [header, payload, signature] = autenticado.split('.');
        var decodedPayload = JSON.parse(atob(payload));

        try {
            const response = await axios.put(
                `https://localhost:1800/editarUsuario/${decodedPayload.id}`,
                {
                    Contrasenia: body.Contrasenia == "" ? null : body.Contrasenia,
                    Descripcion: body.Proposito == "" ? null : body.Proposito,
                    Id_Iconos: body.Id_Iconos_Id == 0 ? null : body.Id_Iconos_Id,
                    Habilidades: body.Habilidades == "" ? null : body.Habilidades,
                    Nivel:null
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
                title: "Usuario editado con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
            setBody({
                Contrasenia: "",
                Habilidades: "",
                Proposito: "",
                Id_Iconos_Id: "0"
            });
            fetchDatos();
            setSelectedIcono("nf-oct-circle")
        } catch (error) {
            console.error("Error al editar el usuario:", error);
            Swal.fire({
                icon: "error",
                title: "Error al editar el usuario",
                text: "Por favor, inténtalo de nuevo",
            });
        }
    };
    return (
        <>
            {Perfil && (
                <div className="modal perfil">
                    <h1>{datos.Nombre}</h1>
                    <button
                        className="salir"
                        onClick={() => { setPerfil(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <i className={`nf ${datos.Direccion} per`}></i>
                    <div className="flex">
                        <i className={`nf ${selectedIcono} gran`}></i>
                        <select name="opciones" value={body.Id_Iconos_Id} onChange={cambioEntrada}>
                            <option value="0" id="nf-oct-circle">Escoge el icono del usuario</option>
                            {iconos.map((lista2, index) => {
                                return (
                                    <option id={lista2.Direccion} value={`${lista2.Id_Iconos}`} key={index}>{lista2.Nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                    <p><b>Matricula: </b>{datos.Id_Miembro}</p>
                    <p><b>Nombre: </b>{datos.Nombre}</p>
                    <div className="entrada"><p><b>Contraseña: </b></p>
                    <div className="entrada">
                        <input
                            type="text"
                            value={body.Contrasenia}
                            onChange={cambioEntrada}
                            name="Contrasenia"
                            placeholder="Contraseña"
                        />
                    </div></div>
                    <p><b>Habilidades: </b></p>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Habilidades}
                            onChange={cambioEntrada}
                            name="Habilidades"
                            placeholder={`${datos.Habilidades ? datos.Habilidades : "Sin habilidades"}`}
                        />
                    </div>
                    <p><b>Descripcion:</b></p>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Proposito}
                            onChange={cambioEntrada}
                            name="Proposito"
                            placeholder={`${datos.Descripcion ? datos.Descripcion : "Sin descripcion"}`}
                        />
                    </div>
                    <button
                        className=""
                        onClick={() => editarUsuario()}
                    >
                        Editar
                    </button>
                </div>
            )}
            <ul>
                <li>
                    <Link className="link" to={"/proyectos"}>
                        <span className="inicio">
                            <i className="nf nf-md-view_dashboard top"></i>
                            <p>Principal</p>
                        </span>
                    </Link>
                </li>
                <li>
                    <details>
                        <summary><i className="nf nf-fa-file top"></i>Proyectos </summary>
                        <ul>
                            {aproyecto ? <>
                                {proyecto.map((lista, index) => {
                                    return (
                                        <li key={index}>
                                            <Link className="link" to={`/Proyectos/${lista.Id_Proyecto}/${lista.Nombre}`}>
                                                <span>
                                                    <i className={`nf ${lista.Direccion}`}></i>
                                                    <p>{lista.Nombre}</p>
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </>
                                :
                                <p>No tinenes ningun proyecto asignado</p>
                            }
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><i className="nf nf-md-account_group top"></i>Equipos</summary>
                        <ul>
                            {aequipos ? <>
                                {equipos.map((lista, index) => {
                                    return (
                                        <li key={index}>
                                            <Link className="link" to={`/Proyectos/${lista.Id_Proyecto_Id}/${lista.Nombre_Proyecto}/equipos/${lista.Id_Equipo}/${lista.Nombre_Equipo}`}>
                                                <span>
                                                    <i className={`nf ${lista.Direccion}`}></i>
                                                    <p>{lista.Nombre_Equipo}</p>
                                                </span>
                                            </Link>
                                            <Link className="link" to={`/Proyectos/${lista.Id_Proyecto_Id}/${lista.Nombre_Proyecto}`}>
                                                <p className="pro">{lista.Nombre_Proyecto}</p>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </>
                                :
                                <p>No tinenes ningun equipo asignado</p>
                            }
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><i className="nf nf-oct-person top"></i>Miembros</summary>
                        <ul>
                            {amiembros ? <>
                                {miembros.map((lista, index) => {
                                    return (
                                        <li key={index}>
                                            <span>
                                                <i className={`nf ${lista.Direccion}`}></i>
                                                <p>{lista.Nombre_Miembro}</p>
                                            </span>
                                            <Link className="link" to={`/miembros/${lista.Proyecto_ID}`}>
                                                <p className="pro">{lista.Nombre_Proyecto}</p>
                                            </Link>
                                        </li>
                                    );
                                })}

                            </>
                                :
                                <p>No tinenes ningun miembro asignado</p>
                            }
                        </ul>
                    </details>
                </li>
            </ul>
            <aside>
                <Link className="link" to={`/Elementos/${datos.Id_Miembro}/${datos.Nombre}`}>
                    <div>
                        <i className="nf nf-md-package"></i>
                        <p>Inventario</p>
                    </div>
                </Link>
                <div onClick={() => setPerfil(true)}>
                    <i className="nf nf-fa-user"></i>
                    <p>Perfil</p>
                </div>
            </aside>
        </>
    );
}