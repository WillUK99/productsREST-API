import * as z from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Email must be valid'),
    name: z.string({ required_error: 'Name is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    passwordConfirmation: z.string({ required_error: 'Password confirmation is required' }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password confirmation does not match password',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
