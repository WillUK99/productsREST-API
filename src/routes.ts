import { Express, Request, Response } from 'express'

import verifyResource from './middleware/verifyResource'
import { createUserSchema } from './schema/user.schema'
import { createSessionSchema } from './schema/session.schema'
import * as UserController from './controller/user.controller'
import * as SessionController from './controller/session.controller'

const routes = (app: Express) => {
  app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // User routes
  app.get('/api/users', UserController.getUsersHandler)
  app.get('/api/users/:id', UserController.getUserByIdHandler)
  app.post('/api/users', verifyResource(createUserSchema), UserController.createUserHandler)

  // Session routes
  app.post('/api/session', verifyResource(createSessionSchema), SessionController.createSessionHandler)
}

export default routes
