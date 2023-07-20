import * as z from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     GetSessionResponse:
 *       type: array
 *       items:
 *         type: object
 *         required:
 *           - userId
 *           - isValid  
 *           - createdAt
 *           - updatedAt
 *         properties: 
 *           _id:
 *             type: string
 *           userId:
 *             type: string
 *           isValid:
 *             type: boolean
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *           __v:
 *             type: number
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: joe@joe.com
 *         password:
 *           type: string
 *           default: password
 *     CreateSessionResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */

export const createSessionSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Email must be valid'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  }),
})

export type CreateSessionInput = z.infer<typeof createSessionSchema>
