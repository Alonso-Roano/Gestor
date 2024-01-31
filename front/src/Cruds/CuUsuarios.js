import React, { useState } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css"; 

export default function CuUsuarios() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [usuarios, setUsuarios] = useState([]); 

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };

    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const eliminarUsuario = (id) => {
        
    };

    const editarUsuario = (id) => {
        
    };

    return (
        <>
            <header className="head">
                <div>
                    {icono ?
                        <i className="nf nf-cod-three_bars" onClick={mostrar}></i>
                        :
                        <i className="nf nf-oct-x" onClick={ocultar}></i>
                    }
                    <p>Gestion</p>
                </div>
                <button className="cerrar">Cerrar sesión</button>
            </header>
            <main>
                <nav className={clases}>
                    {/* ... tu código de navegación ... */}
                </nav>
                <div className="main-content">
                    <h1> CRUD de Usuarios </h1>
                    <div className="buscador">
                        <input></input><button>Buscar</button>
                        <button>Agregar</button>
                    </div>
                    <div className="tabla-contenedor">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td><button onClick={() => editarUsuario(usuario.id)}>Editar</button></td>
                                        <td><button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
