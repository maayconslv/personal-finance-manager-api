import { Request, Response } from 'express';

export class HelloController {
  helloWorld = (req: Request, res: Response): void => {
    res.status(200).send({ message: 'hello world!' });
  };
}
