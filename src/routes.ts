import { createProductSchema } from './schema/product.schema';
import { Express, Request, Response } from 'express'

import requireUser from './middleware/requireUser'
import verifyResource from './middleware/verifyResource'
import { createUserSchema } from './schema/user.schema'
import { createSessionSchema } from './schema/session.schema'
import * as UserController from './controller/user.controller'
import * as SessionController from './controller/session.controller'
import * as ProductController from './controller/product.controller'

const routes = (app: Express) => {
  /**
   * @openapi
   * /api/healthcheck:
   *   get:
   *     tags:
   *       - Healthcheck
   *     description: Check if the app is running
   *     responses:
   *       200:
   *         description: App is running
   */
  app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  app.get('/api/users', UserController.getUsersHandler)

  /**
     * @openapi
     * '/api/users':
     *  post:
     *     tags:
     *     - User
     *     summary: Register a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreateUserResponse'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
  app.post('/api/users', verifyResource(createUserSchema), UserController.createUserHandler)

  app.get('/api/sessions', requireUser, SessionController.getUserSessionsHandler)
  app.post('/api/sessions', verifyResource(createSessionSchema), SessionController.createUserSessionHandler)
  app.delete('/api/sessions', requireUser, SessionController.deleteUserSessionHandler)

  app.get('/api/product/:productId', ProductController.getProductHandler)
  app.get('/api/product', ProductController.getAllProductsHandler)
  app.post('/api/product', [requireUser, verifyResource(createProductSchema)], ProductController.createProductHandler)
  app.put('/api/product/:productId', [requireUser, verifyResource(createProductSchema)], ProductController.updateProductHandler)
  app.delete('/api/product/:productId', requireUser, ProductController.deleteProductHandler)
}

export default routes

