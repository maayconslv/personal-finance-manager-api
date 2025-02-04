import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

export class HelloController {
  private constructor() {}

  public static configure() {
    return new HelloController();
  }

  helloWorld = async (req: Request, res: Response): Promise<void> => {
    const users = await Prisma.user.findMany();
    console.log('all users: ', users);

    res.status(200).send({ message: 'hello world!' });
  };
}
