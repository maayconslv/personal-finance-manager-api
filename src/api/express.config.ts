import express, { Express, Request, Response } from 'express';
import { Server } from 'node:http';
import { UserController } from './controllers/user.controler';

export class ExpressConfig {
  private server?: Server;
  private readonly userController = UserController.configure();
  private constructor(readonly app: Express) {}

  public static configure(): ExpressConfig {
    const app = express();
    app.use(express.json());
    return new ExpressConfig(app);
  }

  public start(port: number): void {
    this.server = this.app.listen(port, () => console.log('Server is running por http://localhost:3000'));
  }

  public stop(): void {
    if (this.server) {
      this.server.close((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Server stopped');
        }
      });
    } else {
      console.log('Server is not running');
    }
  }

  public setupRoutes(): void {
    this.app.post('/authenticate', this.userController.authenticate);
  }
}
