import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "../CSS/Recursos.css";
import axios from "axios";

export default function Slider() {
    const navigate = useNavigate();
    const [datos, setDatos] = useState([]);
    const [proyecto, setProyecto] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [miembros, setMiembros] = useState([]);
    useEffect(() => {
        const autenticado = localStorage.getItem("token");
        if(!autenticado){
            navigate("/")
        }else{
            const fetchDatos = async () => {
                const autenticado = localStorage.getItem("token");
                const [header, payload, signature] = autenticado.split('.');
                const decodedPayload = JSON.parse(atob(payload));
                try {
                    const respuesta = await axios.get(
                        `http://localhost:1800/usuario/${decodedPayload.Id}`,
                        {
                            headers: {
                                Authorization: autenticado,
                            },
                        }
                    );
                    setDatos(respuesta.data.Proyectos)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDatos();
        const fetchProyectos = async () => {
            const autenticado = localStorage.getItem("token");
            const [header, payload, signature] = autenticado.split('.');
            const decodedPayload = JSON.parse(atob(payload));
            try {
                const respuesta = await axios.get(
                    `http://localhost:1800/miembro-proyectos/${decodedPayload.Id}`,
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                setProyecto(respuesta.data.Proyectos)
            } catch (error) {
                console.log(error);
            }
        };
        fetchProyectos();
        const fetchEquipos = async () => {
            const autenticado = localStorage.getItem("token");
            const [header, payload, signature] = autenticado.split('.');
            const decodedPayload = JSON.parse(atob(payload));
            try {
                const respuesta = await axios.get(
                    `http://localhost:1800/miembro-equipos/${decodedPayload.Id}`,
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                setEquipos(respuesta.data.Equipos)
            } catch (error) {
                console.log(error);
            }
        };
        fetchEquipos();
        const fetchMiembros = async () => {
            const autenticado = localStorage.getItem("token");
            const [header, payload, signature] = autenticado.split('.');
            const decodedPayload = JSON.parse(atob(payload));
            try {
                const respuesta = await axios.get(
                    `http://localhost:1800/miembros-miembros/${decodedPayload.Id}`,
                    {
                        headers: {
                            Authorization: autenticado,
                        },
                    }
                );
                setMiembros(respuesta.data.)
            } catch (error) {
                console.log(error);
            }
        };
        fetchMiembros();
    }
    }, []);
    const [Perfil, setPerfil] = useState(false);
    const [body, setBody] = useState({
        Nombre: "",
        Foto: "",
        Biografia: "",
    });
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    return (
        <>
            {Perfil && (
                <div className="modal perfil">
                    <h1>Perfil</h1>
                    <button
                        className="salir"
                        onClick={() => { setBody({ Nombre: "", Foto: "", Biografia: "", }); setPerfil(false); }}
                    >
                        <i className="nf nf-oct-x text-2xl"></i>
                    </button>
                    <i class="nf nf-cod-three_bars per"></i>
                    <select id="opciones" name="opciones">
                        <option value="0">Escoge el icono del elemento</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                    <p><b>Matricula:</b></p>
                    <p><b>Nombre:</b></p>
                    <p><b>Habilidades:</b></p>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Ingrese sus habilidades"
                        />
                    </div>
                    <p><b>Descripcion:</b></p>
                    <div className="entrada">
                        <textarea
                            type="text"
                            value={body.Biografia}
                            onChange={cambioEntrada}
                            name="Biografia"
                            placeholder="Ingrese sus habilidades"
                        />
                    </div>
                    <button
                        className=""
                    //onClick={agregarArtista}
                    >
                        Editar
                    </button>
                </div>
            )}
            <ul>
                <li>
                    <Link className="link" to={"/proyectos"}>
                        <span className="inicio">
                            <i class="nf nf-md-view_dashboard top"></i>
                            <p>Principal</p>
                        </span>
                    </Link>
                </li>
                <li>
                    <details>
                        <summary><i class="nf nf-fa-file top"></i>Proyectos </summary>
                        <ul>
                            <li>
                                <Link className="link" to={"/equipos"}>
                                    <span>
                                        <i class="nf nf-fa-file"></i>
                                        <p>Nombre del proyecto</p>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><i class="nf nf-md-account_group top"></i>Equipos</summary>
                        <ul>
                            <li>
                                <Link className="link" to={"/miembros"}>
                                    <span>
                                        <i class="nf nf-md-account_group"></i>
                                        <p>Nombre del equipo</p>
                                    </span>
                                </Link>
                                <Link className="link" to={"/equipos"}>
                                    <p className="pro">Nombre del proyecto</p>
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary><i class="nf nf-oct-person top"></i>Miembros</summary>
                        <ul>
                            <li>
                                <span>
                                    <i class="nf nf-oct-person"></i>
                                    <p>Nombre del miembro</p>
                                </span>
                                <Link className="link" to={"/miembros"}>
                                    <p className="pro">Nombre del equipo</p>
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
            <aside>
                <Link className="link" to={"/recursos"}>
                    <div>
                        <i class="nf nf-md-package"></i>
                        <p>Inventario</p>
                    </div>
                </Link>
                <div onClick={() => setPerfil(true)}>
                    <i class="nf nf-fa-user"></i>
                    <p>Perfil</p>
                </div>
            </aside>
        </>
    );
}