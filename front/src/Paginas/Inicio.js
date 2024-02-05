import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css"
import axios from "axios";
import swal from "sweetalert2"

export default function Inicio() {
    const navigate = useNavigate();
    useEffect(() => {
        const autenticado = localStorage.getItem("token");

        if (autenticado) {
            try {
                const token = autenticado.split('.');

                if (token.length === 3) {
                    navigate("/proyectos");
                } else {
                    console.error("Formato de token incorrecto");
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }else{
        }

    }, []);

    const [body, setBody] = useState({
        Nombre: "",
        Contrasenia: "",
    });
    const [mostrar, setMostrar] = useState(false);

    const most = () => {
        let mot = mostrar;
        setMostrar(!mot);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === "Nombre" || name === "Contrasenia") && value.startsWith(" ")) {
            return;
        }
        if ( (name === "Nombre") && /[&$+,´:;=?@#|'<>.^*()%-]/.test(value)) {
            return;
        }
        setBody({
            ...body,
            [name]: value,
        });
    };

    const handleInicioSesion = async () => {
        if (!body.Nombre || !body.Contrasenia) {
            swal.fire({
                title: '¡Error!',
                text: 'Rellene todos los campos',
                icon: 'error',
            });
            return;
        }

        try {
            const respuesta = await axios.post("https://localhost:1800/InicioSesion", body);

            if (respuesta.data.Mensaje === "Inicio de sesión exitoso") {
                //console.log("Inicio de sesión exitoso");
                const token = respuesta.data.token;
                localStorage.setItem("token", token);
                window.location.href = '/proyectos';
            } if (respuesta.data.Mensaje == "Contraseña incorrecta") {
                swal.fire({
                    title: '¡Error!',
                    text: 'Contraseña incorrecta',
                    icon: 'error',
                });
            }
            if (respuesta.data.Mensaje == "El usuario no existe") {
                swal.fire({
                    title: '¡Error!',
                    text: 'El usuario no existe',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión: " + error);
            swal.fire({
                title: '¡Error!',
                text: 'Error al iniciar sesión. Por favor, inténtalo nuevamente.',
                icon: 'error',
            });
        }
    };
    return (
        <>
            <main className="inicio2">
                <div className="contenedor">
                <Link to={"/"}><h3 className="volv">Volver</h3></Link>
                    <h1>INICIA SESION</h1>
                    <img src="/Logo.png"/>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        name="Nombre"
                        value={body.Nombre}
                        onChange={handleChange}
                    />
                    <span className="contrasena">
                        <input
                            type={mostrar ? "text" : "password"}
                            placeholder="Contraseña"
                            name="Contrasenia"
                            value={body.Contrasenia}
                            onChange={handleChange}
                        />
                        <i className={mostrar ? "nf nf-cod-eye" : "nf nf-cod-eye_closed"} onClick={() => most()}></i>
                    </span>

                    <button onClick={() => handleInicioSesion()}>Iniciar sesion</button>
                </div>
            </main>
        </>
    );
}