import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verificarToken, verificarAdmin, verificarRol1, verificarRol1o2 } from './auth.js';

const app = express();
app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProjectAdministrator'
});

app.listen(1800, () => {
    console.log("Iniciando Servidor...");
});

conexion.connect(function (error) {
    if (error) {
        console.log("No fue posible la conexión");
        console.log("Error: " + error.message);
    } else {
        console.log("¡Conexión exitosa!");
    }
});
app.post("/Registro", async (req, res) => {
    const { Nombre, Contrasenia } = req.body;
    const NVerificacion = "SELECT * FROM Miembros WHERE Nombre = ?";
    const NUsuario = [Nombre];

    conexion.query(NVerificacion, NUsuario, async (error, results) => {
        if (error) {
            console.error("Error al verificar la existencia del usuario: ", error);
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
        }
        if (results.length > 0) {
            return res.json({ Estatus: "Error", Mensaje: "El usuario ya existe" });
        }
        try {
            const Vcontrasenia = await bcrypt.hash(Contrasenia, 10);
            const sql = "INSERT INTO Miembro (Nombre, Contrasenia) VALUES (?, ?)";
            const verificacion = [Nombre, Vcontrasenia];
            conexion.query(sql, verificacion, (error, results) => {
                if (error) {
                    console.error("Error al registrar el usuario: ", error);
                    res.json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
                } else {
                    const nuevoUsuarioId = results.insertId;
                    const token = jwt.sign({ id: nuevoUsuarioId }, 'secreto');
                    res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente", token: token });
                }
            });
        } catch (error) {
            console.error("Error al cifrar la contraseña: ", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al cifrar la contraseña" });
        }
    });
});
app.post("/InicioSesion", async (req, res) => {
    const { Nombre, Contrasenia } = req.body;
    const sql = "SELECT * FROM Miembros WHERE Nombre = ?";
    const values = [Nombre];
    try {
        conexion.query(sql, values, async (error, results) => {
            if (error) {
                console.error("Error al realizar la consulta: ", error);
                res.status(500).json({ Estatus: "Error", Mensaje: "Error al iniciar sesión" });
            } else if (results.length > 0) {
                const usuario = results[0];
                const token = jwt.sign({ id: usuario.Id_Miembro }, "secreto");
                const verificar = bcrypt.compareSync(Contrasenia, usuario.Contrasenia);
                if (verificar) {
                    res.json({ Estatus: "Exitoso", Mensaje: "Inicio de sesión exitoso", token });
                } else {
                    res.json({ Estatus: "Error", Mensaje: "Contraseña incorrecta" });
                    console.log("El contraseña incorrecta");
                }
            } else {
                res.json({ Estatus: "Error", Mensaje: "El usuario no existe" });
                console.log("El usuario no existe");
            }
        });
    } catch (error) {
        console.error("Error al comparar la contraseña: ", error);
        res.status(500).json({ Estatus: "Error", Mensaje: "Error al comparar la contraseña" });
    }
});
app.post("/CrearProyecto", verificarToken, (req, res) => {
    const { Nombre, Id_Iconos_Id, Descripcion, Fecha_Final, Estado } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secreto");
    req.usuarioId = decoded.id;

    const sql = "CALL SP_Crear_Proyecto(?, ?, ?, ?, ?, ?)";
    const values = [Nombre, Id_Iconos_Id, Descripcion, Fecha_Final, Estado, req.usuarioId];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al crear el proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al crear el proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Proyecto creado con éxito" });
        }
    });
});
app.post("/RegistrarEquipo/:id", verificarToken, verificarRol1,(req, res) => {
    const { Nombre, Descripcion, Id_Iconos_Id, Id_Proyecto_Id, Estado } = req.body;

    const sql = "CALL SP_Registrar_Equipo(?, ?, ?, ?, ?)";
    const values = [Nombre, Descripcion, Id_Iconos_Id, Id_Proyecto_Id, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al registrar el equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Equipo registrado con éxito" });
        }
    });
});
app.post("/AgregarMiembroAEquipo/:id", verificarToken, verificarRol1o2, (req, res) => {
    const { miembroId, equipoId, rolId, carga } = req.body;

    const sql = "CALL SP_Agregar_Miembro_A_Equipo(?, ?, ?, ?)";
    const values = [miembroId, equipoId, rolId, carga];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al agregar miembro al equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar miembro al equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Miembro agregado al equipo con éxito" });
        }
    });
});
app.post("/AgregarComentarioProyecto/:id", verificarToken, verificarRol1o2,(req, res) => {
    const { Id_Proyecto, Id_Miembro, Descripcion, Estado } = req.body;

    const sql = "CALL SP_Agregar_Comentario_Proyecto(?, ?, ?, ?)";
    const values = [Id_Proyecto, Id_Miembro, Descripcion, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al agregar comentario a proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar comentario a proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Comentario agregado al proyecto con éxito" });
        }
    });
});
app.post("/AgregarComentarioEquipo", verificarToken, (req, res) => {
    const { Id_Equipo, Id_Miembro, Descripcion, Estado } = req.body;

    const sql = "CALL SP_Agregar_Comentario_Equipo(?, ?, ?, ?)";
    const values = [Id_Equipo, Id_Miembro, Descripcion, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al agregar comentario a equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar comentario a equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Comentario agregado al equipo con éxito" });
        }
    });
});
app.post("/AgregarRecurso/:id", verificarToken, verificarRol1,(req, res) => {
    const { Nombre, Descripcion, Id_Iconos_Id, Id_Proyecto_Id } = req.body;

    const sql = "CALL SP_Agregar_Recurso(?, ?, ?, ?)";
    const values = [Nombre, Descripcion, Id_Iconos_Id, Id_Proyecto_Id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al agregar recurso:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar recurso" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Recurso agregado con éxito" });
        }
    });
});
app.post("/AgregarElemento/:id", verificarToken, verificarRol1,(req, res) => {
    const { Nombre, Descripcion, Precio, Id_Iconos_Id, Id_Recurso_Id, Id_Miembro_Id, Estado } = req.body;

    const sql = "CALL SP_Agregar_Elemento(?, ?, ?, ?, ?, ?, ?)";
    const values = [Nombre, Descripcion, Precio, Id_Iconos_Id, Id_Recurso_Id, Id_Miembro_Id, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al agregar elemento:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar elemento" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Elemento agregado con éxito" });
        }
    });
});
app.post("/AgregarIcono", verificarToken,verificarAdmin,(req, res) => {
    const { Nombre, Direccion } = req.body;

    const sql = "CALL SP_Agregar_Icono(?, ?)";
    const values = [Nombre, Direccion];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al agregar icono:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar icono" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Icono agregado con éxito" });
        }
    });
});
app.get("/equipos/:proyectoId",verificarToken, (req, res) => {
    const proyectoId = req.params.proyectoId;
    const sql = "SELECT * FROM Vista_Equipos_Proyecto WHERE Id_Proyecto = ? AND Estado_Equipo > 0";
    conexion.query(sql, [proyectoId], (error, results) => {
        if (error) {
            console.error("Error al obtener los equipos del proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los equipos del proyecto" });
        } else {
            res.json(results);
        }
    });
});
app.get("/miembros/:equipoId",verificarToken, (req, res) => {
    const equipoId = req.params.equipoId;
    const sql = "SELECT * FROM Vista_Miembros_Equipo WHERE Id_Equipo = ? AND Nivel > 0";
    conexion.query(sql, [equipoId], (error, results) => {
        if (error) {
            console.error("Error al obtener los miembros del equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los miembros del equipo" });
        } else {
            res.json(results);
        }
    });
});
app.get("/recursos-lider/:miembroId",verificarToken, (req, res) => {
    const miembroId = req.params.miembroId;
    const sql = "SELECT RL.*, I.Direccion FROM Vista_Recursos_Lider RL JOIN Iconos I ON I.Id_Iconos = RL.Id_Iconos_Id WHERE Id_Miembro = ? AND Estado > 0";
    conexion.query(sql, [miembroId], (error, results) => {
        if (error) {
            console.error("Error al obtener los recursos del líder:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los recursos del líder" });
        } else {
            res.json(results);
        }
    });
});
app.get("/elementos-recurso/:recursoId",verificarToken, (req, res) => {
    const recursoId = req.params.recursoId;
    const sql = "SELECT ER.*, I.Direccion FROM Vista_Elementos_Recurso ER JOIN Iconos I ON I.Id_Iconos = ER.Id_Iconos_Id WHERE Id_Recurso = ? AND Estado > 0";
    conexion.query(sql, [recursoId], (error, results) => {
        if (error) {
            console.error("Error al obtener los elementos del recurso:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los elementos del recurso" });
        } else {
            res.json(results);
        }
    });
});
app.get("/comentarios-proyecto/:proyectoId",verificarToken, (req, res) => {
    const proyectoId = req.params.proyectoId;
    const sql = "SELECT * FROM Vista_Comentarios_Proyecto WHERE Id_Proyecto_Id = ? AND Estado > 0";
    conexion.query(sql, [proyectoId], (error, results) => {
        if (error) {
            console.error("Error al obtener los comentarios del proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los comentarios del proyecto" });
        } else {
            res.json(results);
        }
    });
});
app.get("/comentarios-equipo/:equipoId",verificarToken, (req, res) => {
    const equipoId = req.params.equipoId;
    const sql = "SELECT * FROM Vista_Comentarios_Equipo WHERE Id_Equipo_Id = ? AND Estado > 0";
    conexion.query(sql, [equipoId], (error, results) => {
        if (error) {
            console.error("Error al obtener los comentarios del equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los comentarios del equipo" });
        } else {
            res.json(results);
        }
    });
});
app.get("/recursos/:idProyecto",verificarToken, (req, res) => {
    const idProyecto = req.params.idProyecto;
    const sql = "SELECT ER.*, I.Direccion FROM Vista_Recursos ER JOIN Iconos I ON I.Id_Iconos = ER.Id_Iconos_Id WHERE Id_Proyecto = ? AND Estado > 0";
    const values = [idProyecto];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al obtener la vista de recursos:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener la vista de recursos" });
        } else {
            res.json({ Estatus: "Exitoso", Resultados: results });
        }
    });
});
app.get("/vista-iconos", verificarToken,(req, res) => {
    const sql = "SELECT * FROM Vista_Iconos ORDER BY Nombre";
    conexion.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener los iconos:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los iconos" });
        } else {
            res.json(results);
        }
    });
});
app.get("/usuario/:idUsuario",verificarToken, (req, res) => {
    const idUsuario = req.params.idUsuario;
    const sql = "SELECT ER.*, I.Direccion FROM Miembros ER JOIN Iconos I ON I.Id_Iconos = ER.Id_Iconos_Id WHERE Id_Miembro = ? AND Nivel > 0";
    const values = [idUsuario];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al obtener los datos del usuario:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los datos del usuario" });
        } else {
            if (results.length > 0) {
                const usuario = results[0];
                res.json({ Estatus: "Exitoso", Usuario: usuario });
            } else {
                res.status(404).json({ Estatus: "Error", Mensaje: "Usuario no encontrado" });
            }
        }
    });
});
app.get("/miembro-proyectos/:idMiembro",verificarToken, (req, res) => {
    const idMiembro = req.params.idMiembro;
    const sql = "SELECT ER.*, I.Direccion FROM Vista_Miembro_Proyectos ER JOIN Iconos I ON I.Id_Iconos = ER.Id_Iconos_Id WHERE Id_Miembro = ? AND Estado > 0";
    const values = [idMiembro];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al obtener los proyectos del miembro:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los proyectos del miembro" });
        } else {
            res.json({ Estatus: "Exitoso", Proyectos: results });
        }
    });
});
app.get("/miembro-equipos/:idMiembro",verificarToken, (req, res) => {
    const idMiembro = req.params.idMiembro;
    const sql = "SELECT ER.*, I.Direccion FROM Vista_Miembro_Equipos ER JOIN Iconos I ON I.Id_Iconos = ER.Id_Iconos_Id WHERE Id_Miembro = ? AND Estado > 0";
    const values = [idMiembro];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al obtener los equipos del miembro:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los equipos del miembro" });
        } else {
            res.json({ Estatus: "Exitoso", Equipos: results });
        }
    });
});
app.get("/miembros-miembros/:idMiembro",verificarToken, (req, res) => {
    const idMiembro = req.params.idMiembro;
    const sql = "SELECT ER.*, I.Direccion FROM Vista_Miembros_Miembros ER JOIN Iconos I ON I.Id_Iconos = ER.Id_Iconos_Id WHERE Lider_Proyecto_ID = ? AND Nivel > 0 AND Usuario_ID <> Lider_Proyecto_ID";
    const values = [idMiembro];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al obtener los miembros relacionados al miembro:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los miembros relacionados al miembro" });
        } else {
            res.json({ Estatus: "Exitoso", MiembrosRelacionados: results });
        }
    });
});
app.put("/editarProyecto/:id", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.id;
    const { Nombre, Descripcion, Id_Iconos, Fecha_Final, Estado } = req.body;

    const sql = "CALL SP_Editar_Proyecto(?, ?, ?, ?, ?, ?)";
    const values = [id, Nombre, Descripcion, Id_Iconos, Fecha_Final, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Proyecto editado con éxito" });
        }
    });
});
app.put("/borrarProyecto/:id", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.id;

    const sql = "CALL SP_Borrar_Proyecto(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Proyecto borrado con éxito" });
        }
    });
});
app.put("/editarEquipo/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;
    const { Nombre, Descripcion, Id_Iconos, Id_Proyecto, Estado } = req.body;

    const sql = "CALL SP_Editar_Equipo(?, ?, ?, ?, ?, ?)";
    const values = [id, Nombre, Descripcion, Id_Iconos, Id_Proyecto, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Equipo editado con éxito" });
        }
    });
});
app.put("/borrarEquipo/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;

    const sql = "CALL SP_Borrar_Equipo(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Equipo borrado con éxito" });
        }
    });
});
app.put("/editarComentarioProyecto/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;
    const { Descripcion, Estado } = req.body;

    const sql = "CALL SP_Editar_Comentario_Proyecto(?, ?, ?)";
    const values = [id, Descripcion, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el comentario del proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el comentario del proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Comentario del proyecto editado con éxito" });
        }
    });
});
app.put("/borrarComentarioProyecto/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;

    const sql = "CALL SP_Borrar_Comentario_Proyecto(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el comentario del proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el comentario del proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Comentario del proyecto borrado con éxito" });
        }
    });
});
app.put("/editarComentarioEquipo/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;
    const { Descripcion, Estado } = req.body;

    const sql = "CALL SP_Editar_Comentario_Equipo(?, ?, ?)";
    const values = [id, Descripcion, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el comentario del equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el comentario del equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Comentario del equipo editado con éxito" });
        }
    });
});
app.put("/borrarComentarioEquipo/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;

    const sql = "CALL SP_Borrar_Comentario_Equipo(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el comentario del equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el comentario del equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Comentario del equipo borrado con éxito" });
        }
    });
});
app.put("/editarEstadoProyecto/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;
    const { Estado } = req.body;

    const sql = "CALL SP_Editar_Estado_Proyecto(?, ?)";
    const values = [id, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el estado del proyecto:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el estado del proyecto" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Estado del proyecto editado con éxito" });
        }
    });
});
app.put("/editarCargaMiembroEquipo/:id/:idsMiembro/:idsEquipo", verificarToken, (req, res) => {
    const { idMiembro, idEquipo } = req.params.ids;
    const { Carga } = req.body;

    const sql = "CALL SP_Editar_Carga_Miembro_Equipo(?, ?, ?)";
    const values = [idMiembro, idEquipo, Carga];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar la carga del miembro en el equipo:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar la carga del miembro en el equipo" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Carga del miembro en el equipo editada con éxito" });
        }
    });
});
app.put("/editarRecurso/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;
    const { Nombre, Descripcion, Id_Iconos, Id_Proyecto, Estado } = req.body;

    const sql = "CALL SP_Editar_Recurso(?, ?, ?, ?, ?, ?)";
    const values = [id, Nombre, Descripcion, Id_Iconos, Id_Proyecto, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el recurso:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el recurso" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Recurso editado con éxito" });
        }
    });
});
app.put("/borrarRecurso/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;

    const sql = "CALL SP_Borrar_Recurso(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el recurso:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el recurso" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Recurso borrado con éxito" });
        }
    });
});
app.put("/editarElemento/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;
    const { Nombre, Descripcion, Precio, Id_Iconos, Id_Recurso, Id_Miembro, Estado } = req.body;

    const sql = "CALL SP_Editar_Elemento(?, ?, ?, ?, ?, ?, ?)";
    const values = [id, Nombre, Descripcion, Precio, Id_Iconos, Id_Recurso, Id_Miembro, Estado];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el elemento:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el elemento" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Elemento editado con éxito" });
        }
    });
});
app.put("/borrarElemento/:id/:ids", verificarToken, verificarRol1, (req, res) => {
    const id = req.params.ids;

    const sql = "CALL SP_Borrar_Elemento(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el elemento:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el elemento" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Elemento borrado con éxito" });
        }
    });
});
app.put("/asignarElemento/:id/:idsElemento/:idsMiembro", verificarToken, (req, res) => {
    const { idElemento, idMiembro } = req.params.ids;

    const sql = "CALL SP_Asignar_Elemento(?, ?)";
    const values = [idElemento, idMiembro];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al asignar el elemento a un miembro:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al asignar el elemento a un miembro" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Elemento asignado con éxito" });
        }
    });
});
app.put("/desasignarElemento/:id/:ids", verificarToken, (req, res) => {
    const id = req.params.ids;

    const sql = "CALL SP_Desasignar_Elemento(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al desasignar el elemento:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al desasignar el elemento" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Elemento desasignado con éxito" });
        }
    });
});
app.put("/editarUsuario/:ids", verificarToken, async (req, res) => {
    const id = req.params.ids;
    const { Contrasenia, Descripcion, Id_Iconos, Habilidades, Nivel} = req.body;
    let Vcontrasenia=""
    if(Contrasenia){Vcontrasenia = await bcrypt.hash(Contrasenia, 10);}
    else{Vcontrasenia = Contrasenia}
    const sql = "CALL SP_Editar_Usuario(?, ?, ?, ?, ?, ?, ?)";
    const values = [id, null, Vcontrasenia, Descripcion, Id_Iconos, Habilidades, Nivel];
    
    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al editar el usuario:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al editar el usuario" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Usuario editado con éxito" });
        }
    });
});
app.put("/borrarUsuario/:id", verificarToken, verificarAdmin, (req, res) => {
    const id = req.params.id;

    const sql = "CALL SP_Borrar_Usuario(?)";
    const values = [id];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al borrar el usuario:", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al borrar el usuario" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Usuario borrado con éxito" });
        }
    });
});