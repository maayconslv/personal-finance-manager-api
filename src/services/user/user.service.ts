export interface UserDto {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthenticatedUserDto {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedUser {
  token: string;
  user: AuthenticatedUserDto;
}

export interface UserService {
  authenticate(email: string, password: string): Promise<AuthenticatedUser>;
}
