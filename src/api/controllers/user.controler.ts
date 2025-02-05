import { Request, Response } from 'express';
import { UserPrismaRepository } from '../../repositories/user/prisma/user.prisma.repository';
import { prisma } from '../../config/prisma.database';
import { UserServiceImplementation } from '../../services/implementation/user.service.implementation';

export class UserController {
  constructor() {}

  public static configure(): UserController {
    return new UserController();
  }

  authenticate = async (req: Request, res: Response): Promise<void> => {
    const userRepository = UserPrismaRepository.build(prisma);
    const userService = UserServiceImplementation.build(userRepository);

    const { email, password } = req.body;
    try {
      const authenticatedUser = await userService.authenticate(email, password);
      res.status(200).send({ authenticatedUser });
    } catch (error: any) {
      res.status(401).send({ message: error.message });
    }
  };
}
