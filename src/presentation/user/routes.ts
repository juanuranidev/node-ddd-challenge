import { Router } from "express";
import { UserController } from "./controller";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user/user.repository.impl";
import { UserMiddleware } from "../middlewares/user.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userRepositoryImpl = new UserRepositoryImpl();
    const userController = new UserController(userRepositoryImpl);

    router.post("/v1/create", userController.createUser);
    router.post("/v1/login", userController.loginUser);
    router.get(
      "/v1/:userId/projects",
      [UserMiddleware.validateToken],
      userController.getProjects
    );
    router.get(
      "/v1/:userId/tasks",
      [UserMiddleware.validateToken],
      userController.getTasks
    );

    return router;
  }
}
