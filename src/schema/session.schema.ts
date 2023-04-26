import * as z from 'zod'

export const createSessionSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Email must be valid'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  }),
})

export type CreateSessionInput = z.infer<typeof createSessionSchema>
