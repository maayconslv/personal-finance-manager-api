import { ExpressConfig } from '../api/express.config';

export class ServerTest {
  private expressConfig = ExpressConfig.configure();

  public start(port: number) {
    this.expressConfig.setupRoutes();
    this.expressConfig.start(port);
  }

  stop() {
    this.expressConfig.stop();
  }
}
