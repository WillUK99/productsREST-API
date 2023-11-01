import { FilterQuery, UpdateQuery } from "mongoose"
import log from "../logger"
import SessionModel, { SessionDocument } from "../model/session.model"
import { signJWT, verifyJWT } from "../utils/jwt.utils"
import { get } from "lodash"
import { findUser } from "./user.service"
import config from "config"

export const createSession = async (userId: string) => {
  try {
    return (await SessionModel.create({ userId })).toJSON()
  } catch (e: any) {
    log.error(e)
    throw new Error(e)
  }
}

export const findSessions = (searchQuery: FilterQuery<SessionDocument>) => {
  return SessionModel.find(searchQuery).lean()
}

export const updateSession = async (searchQuery: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
  try {
    return await SessionModel.updateOne(searchQuery, update)
  } catch (e: any) {
    log.error(e)
    throw new Error(e)
  }
}

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string
}) => {
  const { decodedToken } = verifyJWT(refreshToken, 'refreshTokenPublicKey')

  if (!decodedToken || get(decodedToken, 'session')) return false

  const session = await SessionModel.findById(get(decodedToken, 'session'))

  if (!session || !session.isValid) return false

  const user = await findUser({ _id: session.userId })

  if (!user) return false

  const accessToken = signJWT(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') }
  )

  return accessToken
}
