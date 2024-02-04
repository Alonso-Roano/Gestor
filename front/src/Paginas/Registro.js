import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
export default function Registro(){
    const navigate = useNavigate()
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

    const most = () =>{
        let mot = mostrar;
        setMostrar(!mot);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === "Nombre" || name === "Contrasenia") && value.startsWith(" ")) {
            return;
        }
        setBody({
            ...body,
            [name]: value,
        });
    };

    const Enviar = async () => {
        if (!body.Nombre.length || !body.Contrasenia) {
            Swal.fire({
                title: '¡Error!',
                text: 'Rellene todos los campos',
                icon: 'error',
              });
            return;
        }

        try {
            const respuesta = await axios.post("https://localhost:1800/Registro", {
                Nombre: body.Nombre,
                Contrasenia: body.Contrasenia,
            });
            if (respuesta.data) {
                if(respuesta.data.Mensaje=="Error al registrar el usuario"){
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Error al registrar el usuario',
                        icon: 'error',
                      });
                }
                if(respuesta.data.Mensaje=="El usuario ya existe"){
                    Swal.fire({
                        title: '¡Error!',
                        text: 'El usuario ya existe',
                        icon: 'error',
                      });
                }
                if(respuesta.data.Mensaje=="Usuario registrado exitosamente"){
                    console.log("Inicio de sesión exitoso");
                    const token = respuesta.data.token;
                    localStorage.setItem("token", token);
                    window.location.href = '/proyectos';
                }
            }
        } catch (error) {
            console.log("Error al registrar el usuario: " + error);
        }
    };
    return (
        <>
            <main className="inicio2">
                <div className="contenedor">
                <Link to={"/"}><h3 className="volv">Volver</h3></Link>
                    <h1>REGISTRAR</h1>
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
                        <i class={mostrar?"nf nf-cod-eye":"nf nf-cod-eye_closed"} onClick={()=>most()}></i>
                    </span>

                    <button onClick={()=>Enviar()}>Registrar</button>
                </div>
                <p className="volver"><Link to={"/pagina"}>Volver</Link></p>
            </main>
        </>
    );
}