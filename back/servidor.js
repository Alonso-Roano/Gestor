import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectadministrator'
});

app.listen(3001, () => {
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
    const NVerificacion = "SELECT * FROM usuarios WHERE Nombre = ?";
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
            const sql = "INSERT INTO usuarios (Nombre, Contrasenia) VALUES (?, ?)";
            const verificacion = [Nombre, Vcontrasenia];
            conexion.query(sql, verificacion, (error, results) => {
                if (error) {
                    console.error("Error al registrar el usuario: ", error);
                    res.json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
                } else {
                    const token = jwt.sign({ id: results.insertId }, "secreto");
                    res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente", token });
                }
            });
        } catch (error) {
            console.error("Error al cifrar la contraseña: ", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al cifrar la contraseña" });
        }
    });
})

app.post("/InicioSesion", async (req, res) => {
    const { Nombre, Contrasenia } = req.body;
    const sql = "SELECT * FROM usuarios WHERE Nombre = ?";
    const values = [Nombre];
    try {
        conexion.query(sql, values, async (error, results) => {
            if (error) {
                console.error("Error al realizar la consulta: ", error);
                res.status(500).json({ Estatus: "Error", Mensaje: "Error al iniciar sesión" });
            } else if (results.length > 0) {
                const usuario = results[0];
                const token = jwt.sign({ id: usuario.Id }, "secreto");
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


app.get("/Nombre/:id", (req, res) => {
    const userId = req.params.id;

    const sql = "SELECT Nombre FROM usuarios WHERE Id = ?";
    const values = [userId];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al obtener el nombre del usuario: ", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener el nombre del usuario" });
        } else if (results.length > 0) {
            const nombreUsuario = results[0].Nombre;
            res.json({ Estatus: "Exitoso", NombreUsuario: nombreUsuario });
        } else {
            res.status(404).json({ Estatus: "Error", Mensaje: "Usuario no encontrado" });
        }
    });
});


app.get("/miembros", (req, res) => {
    conexion.query("SELECT * FROM miembros", (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los miembros" });
        }
        res.json(results); // Devuelve directamente el arreglo de resultados
    });
});



// Ruta para contar miembros
app.get("/contarMiembro", (req, res) => {
    conexion.query("SELECT COUNT(*) AS totalMiembro FROM miembro", (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al contar los miembros" });
        }
        res.json({ totalMiembros: results[0].totalMiembros });
    });
});


app.get("/miembro", (req, res) => {
    conexion.query("SELECT * FROM miembro", (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los miembro" });
        }
        res.json({ miembros: results });
    });
});

// Ruta para agregar un miembro
app.post("/miembro", (req, res) => {
    const { Nombre, Contrasenia, Descripcion, Id_Iconos_Id, Habilidades, Nivel } = req.body;
    const sql = "INSERT INTO miembro (Nombre, Contrasenia, Descripcion, Id_Iconos_Id, Habilidades, Nivel) VALUES (?, ?, ?, ?, ?, ?)";
    const valores = [Nombre, Contrasenia, Descripcion, Id_Iconos_Id, Habilidades, Nivel];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar el miembro" });
        }
        res.json({ Estatus: "Exitoso", Mensaje: "Miembro agregado exitosamente", id: results.insertId });
    });
});

// Ruta para actualizar un miembro
app.put("/miembro/:id", (req, res) => {
    const { Nombre, Contrasenia, Descripcion, Id_Iconos_Id, Habilidades, Nivel } = req.body;
    const sql = "UPDATE miembro SET Nombre = ?, Contrasenia = ?, Descripcion = ?, Id_Iconos_Id = ?, Habilidades = ?, Nivel = ? WHERE Id_Miembro = ?";
    const valores = [Nombre, Contrasenia, Descripcion, Id_Iconos_Id, Habilidades, Nivel, req.params.id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al actualizar el miembro" });
        }
        res.json({ Estatus: "Exitoso", Mensaje: "Miembro actualizado exitosamente" });
    });
});

// Ruta para eliminar un miembro
app.delete("/miembro/:id", (req, res) => {
    const sql = "DELETE FROM miembros WHERE Id_Miembro = ?";
    const valores = [req.params.id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al eliminar el miembro" });
        }
        res.json({ Estatus: "Exitoso", Mensaje: "Miembro eliminado exitosamente" });
    });
});


// ... (Código anterior igual)

// Ruta para obtener todos los equipos
app.get("/equipos", (req, res) => {
    conexion.query("SELECT * FROM equipo", (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los equipos" });
        }
        res.json(results);
    });
});

// Ruta para agregar un equipo
app.post("/equipos", (req, res) => {
    const { Nombre, Descripcion } = req.body;
    const sql = "INSERT INTO equipo (Nombre, Descripcion) VALUES (?, ?)";
    const valores = [Nombre, Descripcion];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar el equipo" });
        }
        res.json({ Estatus: "Exitoso", Mensaje: "Equipo agregado exitosamente", id: results.insertId });
    });
});

// Ruta para actualizar un equipo
app.put("/equipos/:id", (req, res) => {
    const { Nombre, Descripcion } = req.body;
    const sql = "UPDATE equipo SET Nombre = ?, Descripcion = ? WHERE Id_Equipo = ?";
    const valores = [Nombre, Descripcion, req.params.id];

    conexion.query(sql, valores, (error) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al actualizar el equipo" });
        }
        res.json({ Estatus: "Exitoso", Mensaje: "Equipo actualizado exitosamente" });
    });
});

// Ruta para eliminar un equipo
app.delete("/equipos/:id", (req, res) => {
    const sql = "DELETE FROM equipo WHERE Id_Equipo = ?";
    const valores = [req.params.id];

    conexion.query(sql, valores, (error) => {
        if (error) {
            return res.status(500).json({ Estatus: "Error", Mensaje: "Error al eliminar el equipo" });
        }
        res.json({ Estatus: "Exitoso", Mensaje: "Equipo eliminado exitosamente" });
    });
});

// ... Resto del código
