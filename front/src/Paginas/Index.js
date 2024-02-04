import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css"

export default function Index() {
    const navigate = useNavigate();
    useEffect(() => {
        const autenticado = localStorage.getItem("token");

        if (autenticado) {
            try {
                const token = autenticado.split('.');

                if (token.length === 3) {
                    window.location.href = '/proyectos';
                } else {
                    console.error("Formato de token incorrecto");
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }else{
        }

    }, []);
    return (
        <>
            <div className="inicio3">
                <div className="contenedor2">
                    <img src="/Logo.png" />
                    <h1>Bienvenido a Project Manager</h1>
                    <button onClick={()=>{navigate("/inicio")}}>Iniciar sesion</button>
                    <button onClick={()=>{navigate("/registro")}}>Registrarse</button>
                </div>
            </div>
        </>
    );
}