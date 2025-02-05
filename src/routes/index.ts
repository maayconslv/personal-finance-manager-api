import express from 'express';
import { helloRouter } from './hello.route';
import { userRoutes } from './user.routes/user.routes';

export namespace ExpressConfig {
  const app = express();

  export function configure() {
    app.use(express.json());
    app.use('/hello', helloRouter);
    app.use(userRoutes);


    app.listen(3000, () => {
      console.log('server is running on http://localhost:3000');
    });
  }
}
