import { Request, Response, NextFunction } from 'express'

import User from '../model/user.model'
import asyncHandler from '../utils/asyncHandler'

export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find()
  res.json(users)
})

export const getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.sendStatus(404)
  }
  res.json(user)
})

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body
  const user = new User({ email, password, name })
  user.save()
    .then((user) => res.json(user))
    .catch(next)
})