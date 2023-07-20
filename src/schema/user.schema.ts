import * as z from 'zod'

/**
 * @openapi
 * components:
 *    schemas:
 *      CreateUserInput:
 *        tags:
 *         - User
 *        type: object
 *        required: 
 *          - email
 *          - name 
 *          - password  
 *          - passwordConfirmation
 *        properties:
 *          email:
 *            type: string
 *            default: 'joe@blogs.com'
 *            description: The user's email.
 *          name:
 *            type: string
 *            default: 'Joe Blogs'
 *            description: The user's name.
 *          password:
 *            type: string
 *            default: 'supersecurepassword123'
 *            description: The user's password.
 *          passwordConfirmation:
 *            type: string
 *            default: 'supersecurepassword123'
 *            description: The user's password confirmation.
 *      CreateUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          name: 
 *            type: string
 *          _id:
 *            type: string
 *          createdAt: 
 *            type: string
 *          updatedAt:
 *            type: string
 */


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
