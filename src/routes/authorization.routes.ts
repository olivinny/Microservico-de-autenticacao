import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

/**
 Token 
 iss - o dominio da aplicação geradora do token
 sub - é do que o token se trata, e é muito utilizado para guardar o ID do usuário
 aud - define quem pode usar o token
 exp - dara para a expiração do token
 nbf - define uma data para qual o token não pode ser aceito antes dela
 iat - data de criação do token
 jti - o id do token
 */

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ForbiddenError("Usuário ou senha não informados");
      }

      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = "my_secret_key";
      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

authorizationRoute.post(
  "/token/validate",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
