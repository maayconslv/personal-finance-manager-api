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

    expect(userResponse.user).to.be.deep.equal(userDatabase);
    expect(userResponse.token).to.be.a('string');
    expect(jwt.sub).to.be.equal(userDatabase.id);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    try {
      await service.authenticate('wrong-email', '123456qwer');
    } catch (error) {
      expect(error.message).to.be.equal('Invalid credentials');
    }
  });

  it('should not be able to authenticate a user with wrong email', async () => {
    try {
      await service.authenticate(data[0].email, 'wrong-password');
    } catch (error) {
      expect(error.message).to.be.equal('Invalid credentials');
    }
  });
});
