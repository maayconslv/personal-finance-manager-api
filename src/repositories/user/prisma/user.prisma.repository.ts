import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../user.repository';
import { UserDto } from '../../../services/user/user.service';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserPrismaRepository(prisma);
  }

  findByEmail(email: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
