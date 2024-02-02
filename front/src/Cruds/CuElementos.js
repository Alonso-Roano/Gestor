import React from "react";
import { useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import DashSlider from "../Dashboard/DashSider";

export default function CuElementos() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [elementos, setElementos] = useState([]);
    const [Agregar, setAgregar] = useState(false);

    const abrirModal = () => setAgregar(true);
    const cerrarModal = () => setAgregar(false);

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };
    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const eliminarElemento = (id) => {

    };

    const editarElemento = (id) => {

    };

    const agregarElemento = () => {
        cerrarModal();
    };
    return (
        <>
            <header className="head">
                <div>
                    {icono ?
                        <i class="nf nf-cod-three_bars" onClick={() => mostrar()}></i>
                        :
                        <i class="nf nf-oct-x" onClick={() => ocultar()}></i>
                    }
                    <p>Gestion</p>
                </div>
                <button className="cerrar">Cerrar sesion</button>
            </header>
            <main>

                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <div class="main-content">
                    <h1> CRUD de Elementos </h1>
                    <div class="buscador">
                        <input placeholder="Buscar"></input><button>Buscar</button>
                        <button onClick={abrirModal}>Agregar</button>
                    </div>
                    <div className="tabla-contenedor">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>ID_Recurso</th>
                                    <th>ID_Miembro</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementos.map((elemento) => (
                                    <tr key={elemento.id}>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.nombre}</td>
                                        <td>{elemento.precio}</td>
                                        <td>{elemento.id_recurso}</td>
                                        <td>{elemento.id_miembro}</td>
                                        <td><button onClick={() => editarElemento(elemento.id)}>Editar</button></td>
                                        <td><button onClick={() => eliminarElemento(elemento.id)}>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {Agregar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Agregar Elemento</h2>
                            <div className="form">
                                <p>Ingresa Elemento</p>
                                <input type="text" />
                                <p>Ingresa el Precio</p>
                                <input type="text" />
                                <button onClick={agregarElemento}>Agregar Elemento</button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}