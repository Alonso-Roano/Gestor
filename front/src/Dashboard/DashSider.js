import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Header.css";
import "../CSS/Principal.css"
import "../CSS/Recursos.css"

export default function Slider() {
    return (
        <>
            <ul>
                <li>
                    <Link className="link" to={"/cuproyectos"}>
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
                                <Link className="link" to={"/cuproyectos"}>
                                    <span>
                                        <i class="nf nf-fa-file"></i>
                                        <p>Administar Proyectos</p>
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
                                <Link className="link" to={"/cuequipos"}>
                                    <span>
                                        <i class="nf nf-md-account_group"></i>
                                        <p>Administar Equipos</p>
                                    </span>
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
                                <Link className="link" to={"/cumiembros"}>
                                <span>
                                    <i class="nf nf-oct-person"></i>
                                    <p>Administar Miembros</p>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary><i class="nf nf-fa-file top"></i>Recursos </summary>
                    <ul>
                        <li>
                            <Link className="link" to={"/curecursos"}>
                                <span>
                                    <i class="nf nf-fa-file"></i>
                                    <p>Administar Recursos</p>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>
        </ul >
        </>
    );
}