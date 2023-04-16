import { Express, Request, Response } from 'express'

import verifyResource from './middleware/verifyResource'
import { createUserSchema } from './schema/user.schema'
import * as UserController from './controller/user.controller'

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // User routes
  app.get('/users', UserController.getUsersHandler)
  app.get('/users/:id', UserController.getUserByIdHandler)
  app.post('/users', verifyResource(createUserSchema), UserController.createUserHandler)
}

export default routes
