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
  app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // User routes
  app.get('/api/users', UserController.getUsersHandler)
  app.post('/api/users', verifyResource(createUserSchema), UserController.createUserHandler)

  // Session routes
  app.get('/api/sessions', requireUser, SessionController.getUserSessionsHandler)
  app.post('/api/sessions', verifyResource(createSessionSchema), SessionController.createUserSessionHandler)
  app.delete('/api/sessions', requireUser, SessionController.deleteUserSessionHandler)

  // Product routes
  app.get('/api/product/:productId', ProductController.getProductHandler)
  app.get('/api/product', ProductController.getAllProductsHandler)
  app.post('/api/product', [requireUser, verifyResource(createProductSchema)], ProductController.createProductHandler)
  app.put('/api/product/:productId', [requireUser, verifyResource(createProductSchema)], ProductController.updateProductHandler)
  app.delete('/api/product/:productId', requireUser, ProductController.deleteProductHandler)
}

export default routes

