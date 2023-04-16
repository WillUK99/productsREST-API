import { Request, Response, NextFunction } from 'express'
import { genSaltSync, hashSync } from 'bcrypt'

import User from '../model/user.model'

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body
  // const salt = genSaltSync(10)
  // const hash = hashSync(password, salt)
  const user = new User({ email, password, name })
  user.save()
    .then((user) => res.json(user))
    .catch(next)
}