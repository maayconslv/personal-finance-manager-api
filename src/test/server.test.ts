import { ExpressConfig } from '../api/express.config';

export class ServerTest {
  private expressConig = ExpressConfig.configure();

  public start(port: number) {
    this.expressConig.setupRoutes();
    this.expressConig.start(port);
  }

  stop() {
    this.expressConig.stop();
  }
}
