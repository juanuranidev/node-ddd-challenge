import { Router } from "express";
import { ProjectRoutes } from "./project/routes";
import { TaskRoutes } from "./task/routes";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/user", UserRoutes.routes);
    router.use("/api/project", ProjectRoutes.routes);
    router.use("/api/task", TaskRoutes.routes);

    return router;
  }
}
