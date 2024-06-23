import { Router } from "express";
import { TaskController } from "./controller";
import { TaskRepositoryImpl } from "../../infraestructure/repositories/task/task.repository.impl.";
import { UserMiddleware } from "../middlewares/user.middleware";

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskRepositoryImpl = new TaskRepositoryImpl();
    const taskController = new TaskController(taskRepositoryImpl);

    router.post(
      "/v1/create",
      [UserMiddleware.validateToken],
      taskController.createTask
    );
    router.get(
      "/v1/read/:id",
      [UserMiddleware.validateToken],
      taskController.readTask
    );
    router.put(
      "/v1/update/:id",
      [UserMiddleware.validateToken],
      taskController.updateTask
    );
    router.delete(
      "/v1/delete/:id",
      [UserMiddleware.validateToken],
      taskController.deleteTask
    );

    return router;
  }
}
