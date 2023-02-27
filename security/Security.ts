import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const encode = (payload: string) => {
	return jwt.sign(payload, process.env.JWT_SECRET!);
}

export const decode = (payload: string) => {
	return jwt.decode(payload)?.toString();
}