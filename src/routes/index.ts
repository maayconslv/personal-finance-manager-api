import express from 'express';
import { helloRouter } from './hello.route';

export namespace ExpressConfig {
  const app = express();

  export function configure() {
    app.use(express.json());
    app.use('/hello', helloRouter);

    app.listen(3000, () => {
      console.log('server is running on http://localhost:3000');
    });
  }
}
