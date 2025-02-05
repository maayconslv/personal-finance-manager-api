import { UserDto } from '../../services/user/user.service';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDto | null>;
}
