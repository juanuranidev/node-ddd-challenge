import { Router } from "express";
import { ProjectController } from "./controller";
import { ProjectRepositoryImpl } from "../../infraestructure/repositories/project/project.repository.impl.";
import { UserMiddleware } from "../middlewares/user.middleware";

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();

    const projectRepositoryImpl = new ProjectRepositoryImpl();
    const projectController = new ProjectController(projectRepositoryImpl);

    router.post(
      "/v1/create",
      [UserMiddleware.validateToken],
      projectController.createProject
    );
    router.get(
      "/v1/read/:id",
      [UserMiddleware.validateToken],
      projectController.readProject
    );
    router.put(
      "/v1/update/:id",
      [UserMiddleware.validateToken],
      projectController.updateProject
    );
    router.delete(
      "/v1/delete/:id",
      [UserMiddleware.validateToken],
      projectController.deleteProject
    );

    return router;
  }
}
