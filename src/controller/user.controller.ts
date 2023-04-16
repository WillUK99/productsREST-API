import { Request, Response, NextFunction } from 'express'

import User from '../model/user.model'
import asyncHandler from '../utils/asyncHandler'
import log from '../logger'
import { createUser } from '../service/user.service'
import { CreateUserInput } from '../schema/user.schema'

export const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find()
  res.json(users)
})

export const getUserByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.sendStatus(404)
  }
  res.json(user)
})

export const createUserHandler = asyncHandler(async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    const user = await createUser(req.body)
    return res.json(user)
  } catch (e) {
    log.error(e)
    return res.sendStatus(409)
  }
})