import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config/adapters/jwt.adapter";

export class UserMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.header("Authorization");

      if (!authorization)
        return res.status(401).json({ error: "No token provided" });
      if (!authorization.startsWith("Bearer "))
        return res.status(401).json({ error: "Invalid Bearer token" });

      const token = authorization.split(" ")[1];

      const userInformation = jwtAdapter.verifyToken(token);

      if (!userInformation) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.body.user = userInformation;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
