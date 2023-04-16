import { Express, Request, Response } from 'express'

import * as UserController from './controller/user.controller'

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))
  app.post('/users', UserController.createUser)
}

export default routes
