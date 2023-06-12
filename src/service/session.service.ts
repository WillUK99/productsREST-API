import { FilterQuery } from "mongoose"
import log from "../logger"
import SessionModel, { SessionDocument } from "../model/session.model"

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
