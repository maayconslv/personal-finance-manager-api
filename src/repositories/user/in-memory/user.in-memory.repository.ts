import { UserDto } from '../../../services/user/user.service';
import { UserRepository } from '../user.repository';

export class UserInMemoryRepository implements UserRepository {
  constructor(private readonly data: UserDto[] = []) {}

  public static build(data: UserDto[]) {
    return new UserInMemoryRepository(data);
  }

  findByEmail(email: string): Promise<UserDto | null> {
    const user = this.data.filter((item) => item.email === email)[0];
    return Promise.resolve(user);
  }
}
