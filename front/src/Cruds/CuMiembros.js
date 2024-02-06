import React, { useState, useEffect } from "react";
import "../CSS/Header.css";
import "../CSS/Principal.css";
import "./tabla.css";
import "./modales.css";
import DashSlider from "../Dashboard/DashSider";

export default function CuMiembros() {
    const [clases, setClases] = useState("ocultar");
    const [icono, setIcono] = useState(true);
    const [miembros, setMiembros] = useState([]);
    const [Agregar, setAgregar] = useState(false);
    const [miembroEditando, setMiembroEditando] = useState(null);

    // Suponiendo que tienes un estado para manejar los valores del formulario de agregar/editar
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        habilidades: '',
        rol: ''
    });

    const abrirModalEditar = (miembro) => {
        setAgregar(true);
        setFormData({
            nombre: miembro.Nombre,
            descripcion: miembro.Descripcion,
            habilidades: miembro.Habilidades,
            rol: miembro.Rol // Asegúrate de que el rol esté disponible
        });
        setMiembroEditando(miembro.Id_Miembro);
    };

    const abrirModal = () => {
        setAgregar(true);
        setFormData({ nombre: '', descripcion: '', habilidades: '', rol: '' }); // Resetear formulario
    };

    const cerrarModal = () => {
        setAgregar(false);
        setMiembroEditando(null); // Resetear el estado de edición
        setFormData({ nombre: '', descripcion: '', habilidades: '', rol: '' }); // Resetear el formulario
    };

    const mostrar = () => {
        setClases("mostrar");
        setIcono(false);
    };

    const ocultar = () => {
        setClases("ocultar");
        setIcono(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const agregarMiembro = () => {
        fetch("https://localhost:3001/miembro", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.Estatus === "Exitoso") {
                    setMiembros([...miembros, { ...formData, Id_Miembro: data.id }]);
                    cerrarModal();
                } else {
                    // Manejar el error
                    console.error("Error al agregar el miembro:", data.Mensaje);
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const editarMiembro = () => {
        fetch(`https://localhost:3001/miembro/${miembroEditando}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                const miembrosActualizados = miembros.map((miembro) => {
                    if (miembro.Id_Miembro === miembroEditando) {
                        return { ...miembro, ...formData };
                    }
                    return miembro;
                });
                setMiembros(miembrosActualizados);
                cerrarModal();
            })
            .catch((error) => console.error("Error:", error));
    };

    const eliminarMiembro = (id) => {
        if (window.confirm("¿Estás seguro de querer eliminar este miembro?")) {
            fetch(`https://localhost:3001/miembro/${id}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then(() => {
                    setMiembros(miembros.filter((miembro) => miembro.Id_Miembro !== id));
                })
                .catch((error) => console.error("Error:", error));
        }
    };

    useEffect(() => {
        fetch("https://localhost:3001/miembro")
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Para verificar qué estás recibiendo
                if (data && data.miembros) {
                    setMiembros(data.miembros);
                } else {
                    console.error("La respuesta no contiene la propiedad 'miembros'");
                }
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <>
            <header className="head">
                <div>
                    {icono ?
                        <i className="nf nf-cod-three_bars" onClick={() => mostrar()}></i>
                        :
                        <i className="nf nf-oct-x" onClick={() => ocultar()}></i>
                    }
                    <p>Gestion</p>
                </div>
                <button className="cerrar">Cerrar sesión</button>
            </header>
            <main>
                <nav className={clases}>
                    <DashSlider></DashSlider>
                </nav>
                <div className="main-content">
                    <h1>CRUD de Miembros</h1>
                    <div className="buscador">
                        <input placeholder="Buscar"></input><button>Buscar</button>
                        <button onClick={abrirModal}>Agregar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Habilidades</th>
                                <th>Rol</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {miembros.map((miembro) => (
                                <tr key={miembro.Id_Miembro}>
                                    <td>{miembro.Id_Miembro}</td>
                                    <td>{miembro.Nombre}</td>
                                    <td>{miembro.Descripcion}</td>
                                    <td>{miembro.Habilidades}</td>
                                    <td>{miembro.Rol}</td>
                                    <td>
                                        <button onClick={() => abrirModalEditar(miembro)}>Editar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => eliminarMiembro(miembro.Id_Miembro)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {Agregar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{miembroEditando ? "Editar Miembro" : "Agregar Miembro"}</h2>
                            <div className="form">
                                <p>Ingresa el nombre del miembro</p>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                                <div className="desc">
                                    <p>Agregar Descripcion</p>
                                    <input type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                                </div>
                                <p>Agregar Habilidades</p>
                                <div className="desc">
                                    <input type="text" name="habilidades" value={formData.habilidades} onChange={handleInputChange} />
                                </div>
                                <p>Agregar Rol</p>
                                <select className="text" name="rol" value={formData.rol} onChange={handleInputChange}>
                                    <option value="rol1">Rol 1</option>
                                    <option value="rol2">Rol 2</option>
                                    <option value="rol3">Rol 3</option>
                                </select>
                                <button onClick={miembroEditando ? editarMiembro : agregarMiembro}>
                                    {miembroEditando ? "Guardar Cambios" : "Agregar Miembro"}
                                </button>
                                <button onClick={cerrarModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </>
    )
}