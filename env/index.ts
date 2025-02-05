import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3000),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.string().default('1h'),
})

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
  console.log('Invalid environment variables.', _env.error.message);
  throw new Error('Invalid environment variables.');
}

export const ENV = _env.data;
