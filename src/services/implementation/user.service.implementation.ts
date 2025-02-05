import { UserRepository } from '../../repositories/user/user.repository';
import { AuthenticatedUser, UserService } from '../user/user.service';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { ENV } from '../../../env';

export class UserServiceImplementation implements UserService {
  constructor(private readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new UserServiceImplementation(repository);
  }

  async authenticate(email: string, password: string): Promise<AuthenticatedUser> {
    const user = await this.repository.findByEmail(email);
    const doesPasswordMatch = user ? await compare(password, user.password) : false;

    if (!doesPasswordMatch || !user) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      {
        sub: user.id,
      },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.JWT_EXPIRATION_TIME,
      },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
