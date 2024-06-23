import jwt, { JwtPayload } from "jsonwebtoken";
import ENVS from "../envs/envs";

const secretKey = ENVS.JWT_SECRET;

export const jwtAdapter = {
  generateToken: (payload: object): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "30d" });
  },

  verifyToken: (token: string): string | JwtPayload | null => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
