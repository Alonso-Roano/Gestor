import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css"

export default function Index() {
    const navigate = useNavigate();
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