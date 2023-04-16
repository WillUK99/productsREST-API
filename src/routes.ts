import { Express, Request, Response } from 'express'

import * as UserController from './controller/user.controller'

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // User routes
  app.get('/users', UserController.getUsers)
  app.get('/users/:id', UserController.getUserById)
  app.post('/users', UserController.createUser)
}

export default routes
