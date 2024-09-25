import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(8080),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().default(5433),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  JWT_KEY_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1h'),
  EMAIL_SERVICE: z.string().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

export default () => {
  const parsedEnv = envSchema.safeParse(process.env)

  if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.format())
    throw new Error('Invalid environment variables')
  }

  const env = parsedEnv.data

  return {
    app: {
      port: Number(env.PORT),
      environment: env.NODE_ENV,
    },
    database: {
      host: env.DATABASE_HOST,
      port: Number(env.DATABASE_PORT),
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      name: env.DATABASE_NAME,
    },
    auth: {
      jwtSecret: env.JWT_KEY_SECRET,
      tokenExpiresIn: env.JWT_EXPIRES_IN,
    },
    email: {
      service: env.EMAIL_SERVICE,
      user: env.EMAIL_USER,
      password: env.EMAIL_PASSWORD,
    },
  }
}
