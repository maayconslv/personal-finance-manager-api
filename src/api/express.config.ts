import express, { Express, Request, Response } from 'express';

export class ExpressConfig {
  private constructor(readonly app: Express) {}

  public static configure(): ExpressConfig {
    const app = express();
    app.use(express.json());
    return new ExpressConfig(app);
  }

  public start(port: number) {
    this.app.listen(port, () => console.log('Server is running por http://localhost:3000'));
  }

  public addGetRoute(path: string, handle: (req: Request, res: Response) => void) {
    this.app.get(path, handle);
  }

  public addPostRoute(path: string, handle: (req: Request, res: Response) => void) {
    this.app.post(path, handle);
  }

  public addPutRoute(path: string, handle: (req: Request, res: Response) => void) {
    this.app.put(path, handle);
  }

  public addDeleteRoute(path: string, handle: (req: Request, res: Response) => void) {
    this.app.delete(path, handle);
  }
}
