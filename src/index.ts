import exp from 'constants';
import { HelloController } from './api/controllers/hello.controler';
import { UserController } from './api/controllers/user.controler';
import { ExpressConfig } from './api/express.config';

function main() {
  const expressConfig = ExpressConfig.configure();
  expressConfig.setupRoutes();
  expressConfig.start(3000);
}

main();

// import { ENV } from '../env';

// export class Server {
//   private expressConfig = ExpressConfig.configure();

//   constructor() {
//     this.expressConfig.setupRoutes();
//   }
//   public start(port: number) {
//     console.log('server startgin on port ', port);
//     this.expressConfig.start(port);
//   }

//   public stop() {
//     this.expressConfig.stop();
//   }
// }
