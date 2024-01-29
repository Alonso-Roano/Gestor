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
    database: 'maquetado'
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
                    res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente" });
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
                    res.json({ Estatus: "Exitoso", Mensaje: "Inicio de sesión exitoso", token});
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