import { Request, Response } from 'express'

import log from '../logger'
import { asyncHandler } from '../utils/async.utils'
import { createSession, findSessions, updateSession } from '../service/session.service'
import { CreateSessionInput } from '../schema/session.schema'
import { validateUser } from '../service/user.service'
import { signJWT } from '../utils/jwt.utils'
import config from 'config'

export const createUserSessionHandler = asyncHandler(async (req: Request<{}, {}, CreateSessionInput['body']>, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await validateUser(email, password)
    if (!user) return res.sendStatus(401)

    const session = await createSession(user._id)
    if (!session) return res.sendStatus(409)

    const accessToken = signJWT({ ...user, session: session._id }, 'accessTokenPrivateKey', { expiresIn: config.get('accessTokenTtl') })
    const refreshToken = signJWT({ ...user, session: session._id }, 'refreshTokenPrivateKey', { expiresIn: config.get('refreshTokenTtl') })

    return res.json({ accessToken, refreshToken })
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(409)
  }
})

export const getUserSessionsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = res.locals.user._id
  const userSession = await findSessions({ userId, isValid: true })
  return res.send(userSession)
})

export const deleteUserSessionHandler = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session
  await updateSession({ _id: sessionId }, { isValid: false })
  return res.json({
    accessToken: null,
    refreshToken: null,
  })
})
