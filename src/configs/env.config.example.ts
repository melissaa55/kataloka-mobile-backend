import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(8787),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgresql://username:password@host/db'),
  JWT_SECRET: z.string().default('THIS-IS-YOUR-SECRET-KEY'),
  TOKEN_EXPIRATION_TIME: z.coerce.number().default(3600),
  ALLOWED_ORIGINS: z
    .string()
    .default('["http://10.10.10.194:8081"]')
    .transform((value) => JSON.parse(value.replace(/\\/g, '')))
    .pipe(z.array(z.string().url())),
});

const result = EnvSchema.safeParse(process.env);
if (!result.success) {
  console.error('Invalid environment variables: ');
  console.error(result.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = result.data;
