import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Page404.css"
export default function Page404() {
    return (
        <>
            <main className="error">
                <div>
                    <h1 className="error_cuatro">Error 404</h1>
                    <h2>Pagina no encontrada</h2>
                    <Link to={"/proyectos"}><h3>Volver</h3></Link>
                </div>
            </main>
        </>
    );
}