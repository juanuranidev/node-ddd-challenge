import ENVS from "./config/envs/envs";
import { db } from "./infraestructure/db";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: ENVS.PORT,
    routes: AppRoutes.routes,
    db: db(),
  });

  server.start();
}
