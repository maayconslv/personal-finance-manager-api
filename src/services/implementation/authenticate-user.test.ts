import { describe, expect, it } from 'vitest';
import { UserDto } from '../user/user.service';
import { UserInMemoryRepository } from '../../repositories/user/in-memory/user.in-memory.repository';
import { UserServiceImplementation } from './user.service.implementation';
import { faker } from '@faker-js/faker';
import crypto from 'node:crypto';
import { hash } from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { ENV } from '../../../env';

describe('SERVICE - Authenticate User Service', async () => {
  const password = '123456qwer';
  const hashedPassword = await hash(password, 6);

  const data: UserDto[] = [
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: hashedPassword,
      id: crypto.randomUUID().toString(),
    },
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: hashedPassword,
      id: crypto.randomUUID().toString(),
    },
  ];

  const repository = UserInMemoryRepository.build(data);
  const service = UserServiceImplementation.build(repository);

  it('should be able to authenticate a user', async () => {
    const userDatabase = data[0];

    const userResponse = await service.authenticate(data[0].email, '123456qwer');
    const jwt = jsonwebtoken.verify(userResponse.token, ENV.JWT_SECRET);

    expect(userResponse.user.id).to.be.equal(userDatabase.id);
    expect(userResponse.user.name).to.be.equal(userDatabase.name);
    expect(userResponse.user.email).to.be.equal(userDatabase.email);
    expect(userResponse.token).to.be.a('string');
    expect(jwt.sub).to.be.equal(userDatabase.id);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    expect(service.authenticate('wrong-email', '1234565qwerr')).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to authenticate a user with wrong email', async () => {
    expect(service.authenticate(data[0].email, 'wrong-password')).rejects.toBeInstanceOf(Error);
  });
});
