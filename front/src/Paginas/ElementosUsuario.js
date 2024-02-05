import React, { useEffect, useState } from "react";
import Cerrar from "../Componentes/CerrarSesion";
import Slider from "../Componentes/Slider";
import Perfil from "../Componentes/Perfil";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ElementosUsiario() {
    const navigate = useNavigate();
    const [clases, setClases] = useState("ocultar");
    const { idUsuario, NombreUsuario } = useParams();
    const [elmento, setElemento] = useState([]);
    const [icono, setIcono] = useState(true);
    const autenticado = localStorage.getItem("token");
    const [header, payload, signature] = autenticado.split('.');
    var decodedPayload = JSON.parse(atob(payload));
    const [aproyecto, setaProyecto] = useState(true);
    useEffect(() => {
        const fetchElemento = async () => {
            try {
                const respuesta = await axios.get(
                    `https://localhost:1800/recursos-lider/${idUsuario}`,
                    {
                        headers: {
                            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNzExODEzM30.WsFaXTSOmg269S5h7UjwT7GpoZkPzeQT_3HMLfxiDoc",
                        },
                    }
                );
                if (respuesta.data.length == 0) { setaProyecto(false) }
                else { setaProyecto(true) }
                setElemento(respuesta.data);
            } catch (error) {
            }
        };
        fetchElemento();
    }, []);
    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };
    return (
        <>
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
                    <h1 className="titulo">Recursos</h1>
                    <section>
                        <article className="titulo2">
                            <span className="icono_cont">
                                <i className="nf nf-fa-user_circle_o"></i>
                            </span>
                            <span className="titulo_cont">
                                <p>Elementos de usurio</p>
                            </span>
                        </article>
                        <div className="equipos ele">
                            {aproyecto ? <>
                                {elmento.map((lista, index) => {
                                    return (
                                        <div className="elemento" key={index}>
                                            <span className="elem">
                                                <h3>{lista.Nombre}</h3>
                                                <i className={`nf ${lista.Direccion}`}></i>
                                            </span>
                                            <p className="des tex">Matricula: {lista.Id_Elemento}</p>
                                            <p className="des tex">Descripcion: {lista.Descripcion}</p>
                                            <p className="des tex" onClick={()=>navigate(`/Proyectos/${lista.Id_Proyecto_Id}/${lista.Nombre_Proyecto}/recursos`)}>Proyecto: <b>{lista.Nombre_Proyecto}</b></p>
                                            <p className="des tex" onClick={()=>navigate(`/Proyectos/${lista.Id_Proyecto_Id}/${lista.Nombre_Proyecto}/recursos/${lista.Id_Recurso}/${lista.Nombre_Recurso}`)}>Recurso: <b>{lista.Nombre_Recurso}</b></p>
                                        </div>
                                    );
                                })}
                            </>
                                :
                                <h4><center>No se encontró ningun recurso</center></h4>
                            }
                            <button className="boton" onClick={() => navigate("/proyectos")}>Volver</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    );
}