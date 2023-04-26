import { Request, Response } from 'express'

import log from '../logger'
import { asyncHandler } from '../utils/async.utils'
import { createSession } from '../service/session.service'
import { CreateSessionInput } from '../schema/session.schema'
import { validateUser } from '../service/user.service'
import { signJWT } from '../utils/jwt.utils'

export const createSessionHandler = asyncHandler(async (req: Request<{}, {}, CreateSessionInput['body']>, res: Response) => {
  try {
    const { email, password } = req.body

    const validUser = await validateUser(email, password)
    if (!validUser) return res.sendStatus(401)

    const session = await createSession(validUser._id)
    if (!session) return res.sendStatus(409)

    const accessToken = signJWT({ user: validUser._id, session: session._id }, 'accessTokenPrivateKey', { expiresIn: '15m' })
    const refreshToken = signJWT({ user: validUser._id, session: session._id }, 'refreshTokenPrivateKey', { expiresIn: '7d' })

    return res.json({ accessToken, refreshToken })
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(409)
  }
})


