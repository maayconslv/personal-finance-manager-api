import { Request, Response } from 'express';
import { prisma } from '../../config/prisma.database';

export class HelloController {
  private constructor() {}

  public static configure() {
    return new HelloController();
  }

  helloWorld = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({ message: 'hello world!' });
  };
}
