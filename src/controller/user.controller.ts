import { Request, Response } from 'express'
import { omit } from 'lodash'

import User from '../model/user.model'
import { asyncHandler } from '../utils/async.utils'
import log from '../logger'
import { createUser } from '../service/user.service'
import { CreateUserInput } from '../schema/user.schema'

export const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find()
  const usersWithoutPassword = users.map((user) => omit(user.toJSON(), 'password'))
  res.send(usersWithoutPassword)
})

export const createUserHandler = asyncHandler(async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    const user = await createUser(req.body)
    return res.json(user)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(409)
  }
})