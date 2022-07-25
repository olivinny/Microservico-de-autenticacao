import { StatusCodes } from "http-status-codes";
import { Router, Request, Response, NextFunction } from "express";
import userRepository from "../repositories/user.repository";

// get / users
// get / users/:uuid
// post / users
// put / users/:uuid
// delete / users/:uuid

const userRoute = Router();

userRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userRepository.findAllUsers();
      res.status(StatusCodes.OK).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userRoute.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepository.findById(uuid);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRoute.post(
  "/users/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = req.body;
      const uuid = await userRepository.create(newUser);
      res.status(StatusCodes.CREATED).send(uuid);
    } catch (error) {
      next(error);
    }
  }
);

userRoute.put(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const modifiedUser = req.body;
      modifiedUser.uuid = uuid;

      await userRepository.update(modifiedUser);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

userRoute.delete(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      await userRepository.remove(uuid);
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
);

export default userRoute;
