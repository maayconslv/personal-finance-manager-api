import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ExpressConfig } from '../express.config';
import { prisma } from '../../config/prisma.database';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { ServerTest } from '../../test/server.test';

describe('POST - Authenticate User Controller', async () => {
  const server = new ServerTest();
  const database = prisma;
  const userData = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: '123456qwer',
  };

  beforeAll(async () => {
    console.log('antes do start');
    server.start(3000);
    await database.user.create({ data: { ...userData, password: await hash('123456qwer', 6) } });
  });

  afterAll(async () => {
    await database.user.deleteMany();
    server.stop();
  });

  it('should be able to authenticate a user', async () => {
    const response = await axios.post('http://localhost:3000/authenticate', {
      email: userData.email,
      password: userData.password,
    });
    const userResponse = response.data.authenticatedUser;
    const userDatabase = await prisma.user.findUniqueOrThrow({ where: { email: userData.email } });

    expect(userResponse.user.name).toBe(userDatabase.name);
    expect(userResponse.user.email).toBe(userDatabase.email);
    expect(userResponse.user.id).toBe(userDatabase.id);
  });
});
