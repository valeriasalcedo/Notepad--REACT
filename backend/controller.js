import pool from "./db.js";
import { generateToken } from "./jwtUtils.js";
import bcrypt from "bcrypt";

/**
 * Registrar un nuevo usuario.
 */
export const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        // Check if the user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
            [fullname, email, hashedPassword]
        );

        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser.rows[0] });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

/**
 * Iniciar sesión y generar un token.
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const user = result.rows[0];

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Generate token
        const token = generateToken({ id: user.id, email: user.email });

        // Save token in DB (optional, but useful for logout)
        await pool.query("UPDATE users SET token = $1 WHERE id = $2", [token, user.id]);

        res.json({ user: { id: user.id, fullname: user.fullname, email: user.email }, token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};


/**
 * Cerrar sesión y eliminar el token.
 */
export const logout = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({ error: "Usuario no autenticado" });
    }

    try {
        await pool.query("UPDATE users SET token = NULL WHERE id = $1", [req.user.id]);
        res.json({ mensaje: "Sesión cerrada correctamente" });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        res.status(500).json({ error: "Error al cerrar sesión" });
    }
};
