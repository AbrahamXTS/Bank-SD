import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export class Security {
	static encode = ( payload: string ) => {
		return jwt.sign(payload, process.env.JWT_SECRET!);
	}
	
	static decode = ( payload: string ) => {
		return jwt.decode(payload)?.toString();
	}
}