import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import "../CSS/Recursos.css"
import Perfil from "./Perfil";

export default function Slider() {
    return (
        <>
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
                <div>
                    <i class="nf nf-fa-user"></i>
                    <p>Perfil</p>
                </div>
            </aside>
        </>
    );
}