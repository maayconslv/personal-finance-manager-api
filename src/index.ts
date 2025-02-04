import { HelloController } from './api/controllers/hello.controler';
import { ExpressConfig } from './api/express.config';

function main() {
  const expressConfig = ExpressConfig.configure();
  const helloControler = HelloController.configure();

  expressConfig.addGetRoute('/hello', helloControler.helloWorld);

  expressConfig.start(3000);
}

main();
