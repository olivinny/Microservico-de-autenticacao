import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from "jsonwebtoken";
import userRepository from "../repositories/user.repository";

async function jwtAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU4NzAxNDExLCJzdWIiOiI2N2ViMDBkMi0zNDMzLTQyNTItYTEyOS0yYTk0MDhiZDAxMWQifQ.z2us0LywB0y_gYHwlWKC01ZNc3D5b1rg1KMMl96l9aE

    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido");
    }
    try {
      const tokenPayload = JWT.verify(token, "my_secret_key");

      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new ForbiddenError("Token inválido");
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
      };
      req.user = user;
      next();
    } catch {
      throw new ForbiddenError("Token inválido");
    }
  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
