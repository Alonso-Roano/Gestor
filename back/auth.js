import jwt from 'jsonwebtoken';
import mysql from 'mysql';

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectAdministrator'
});

export async function verificarToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso denegado" });
    }
    try {
        const decoded = jwt.verify(token, "AlonsoRoano");
        req.usuarioId = decoded.id;

        const sql = "SELECT * FROM Miembro WHERE Id_Miembro = ?";
        const values = [req.usuarioId];

        conexion.query(sql, values, (error, results) => {
            if (error) {
                console.error("Error al verificar la existencia del usuario: ", error);
                return res.status(500).json({ Estatus: "Error", Mensaje: "Error al verificar la existencia del usuario" });
            }
            if (results.length === 0) {
                return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso no permitido" });
            }
            req.usuarioNivel = results[0].Nivel;
            next();
        });
    } catch (err) {
        return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso no permitido" });
    }
}

export function verificarAdmin(req, res, next) {
    if (req.usuarioNivel !== 1) {
        return res.status(403).json({ Estatus: "Error", Mensaje: "Acceso no permitido. Se requieren permisos de administrador." });
    }
    next();
}

export function verificarRol1(req, res, next) {
    const token = req.headers.authorization;
    const Proyecto = req.params.id;
    if (!token) {
        return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso denegado" });
    }
    try {
        const decoded = jwt.verify(token, "AlonsoRoano");
        req.usuarioId = decoded.id;

        const sql = "SELECT * FROM ProjectRolesView WHERE ProjectID = ? AND MemberID = ?";
        const values = [Proyecto, req.usuarioId];

        conexion.query(sql, values, (error, results) => {
            const sql2 = "SELECT * FROM Miembro WHERE Id_Miembro = ?";
            const values2 = [req.usuarioId];

            conexion.query(sql2, values2, (error2, results2) => {
                if(results2[0].Nivel==1){

                }else{
                    if (error) {
                        console.error("Error al verificar la existencia del usuario: ", error);
                        return res.status(500).json({ Estatus: "Error", Mensaje: "Error al verificar la existencia del usuario" });
                    }
                    if (!results[0]) {
                        return res.status(403).json({ Estatus: "Error", Mensaje: "Acceso no permitido. Se requiere rol 1." });
                    }
                    if (results[0].RoleID !== 1 && results[0].Nivel !== 1) {
                        return res.status(403).json({ Estatus: "Error", Mensaje: "Acceso no permitido. Se requiere rol 1 o ser administrador." });
                    }
                }
                next();
            })

            
        });
    } catch (err) {
        return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso no permitido" });
    }
}

export function verificarRol1o2(req, res, next) {
    const token = req.headers.authorization;
    const Proyecto = req.params.id;
    if (!token) {
        return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso denegado" });
    }
    try {
        const decoded = jwt.verify(token, "AlonsoRoano");
        req.usuarioId = decoded.id;
        const sql = "SELECT * FROM ProjectRolesView WHERE ProjectID = ? AND MemberID = ?";
        const values = [Proyecto, req.usuarioId];

        conexion.query(sql, values, (error, results) => {
                let rol = results[0].RoleID
                if(results[0].Nivel==1){

                }else{
                    if (error) {
                        console.error("Error al verificar la existencia del usuario: ", error);
                        return res.status(500).json({ Estatus: "Error", Mensaje: "Error al verificar la existencia del usuario" });
                    }
                    if (results[0].length) {
                        console.log("No se devolvio nada")
                        return res.status(403).json({ Estatus: "Error", Mensaje: "Acceso no permitido. Se requiere rol 1." });
                    }
                    if (results[0].RoleID == 1||results[0].RoleID == 2) {
                    }else{
                        return res.status(403).json({ Estatus: "Error", Mensaje: "Acceso no permitido. Se requiere rol 1 o ser administrador." });
                    }
                }
                next();
        });
    } catch (err) {
        return res.status(401).json({ Estatus: "Error", Mensaje: "Acceso no permitido" });
    }
}

export function limpiarDatos(datos) {
    const regex = /[\&\$\+\,\:\;\=\?\@\#\|\'\<\>\.\^\*\(\)\%\-\"]/g;
    for (const key in datos) {
        if (key !== 'Contrasenia' && typeof datos[key] === 'string') {
            datos[key] = datos[key].replace(regex, '');
        }
    }
    return datos;
}