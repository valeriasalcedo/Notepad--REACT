import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en el archivo .env");
    }
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
};
