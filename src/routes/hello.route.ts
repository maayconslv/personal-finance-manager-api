import { Router } from 'express';
import { HelloController } from '../controllers/hello.controler';

const helloController = new HelloController();
export const helloRouter = Router();

helloRouter.get('/', helloController.helloWorld);
