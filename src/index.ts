import exp from 'constants';
import { HelloController } from './api/controllers/hello.controler';
import { UserController } from './api/controllers/user.controler';
import { ExpressConfig } from './api/express.config';
import { ENV } from '../env';

function main() {
  const expressConfig = ExpressConfig.configure();
  expressConfig.setupRoutes();
  expressConfig.start(ENV.PORT);
}

main();
