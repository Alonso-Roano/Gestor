import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cerrar() {
    const navigate = useNavigate();
    return (
        <>
        <button className="cerrar" onClick={() => {
                      localStorage.clear("token");
                      navigate("/");
                    }}>Cerrar sesion</button>
        </>
    );
}