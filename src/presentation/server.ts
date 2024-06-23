import express, { Router } from "express";
import compression from "compression";
import cors from "cors";

interface Options {
  port: number;
  routes: Router;
  db: any;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly db: any;

  constructor(options: Options) {
    const { port, routes, db } = options;
    this.port = port;
    this.routes = routes;
    this.db = db;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());

    this.app.use(
      cors({
        origin: "*",
      })
    );

    this.db;

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port} 🚀`);
    });
  }
}
