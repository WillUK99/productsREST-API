import log from "../logger"
import SessionModel from "../model/session.model"

export const createSession = async (userId: string) => {
  try {
    return (await SessionModel.create({ userId })).toJSON()
  } catch (e: any) {
    log.error(e)
    throw new Error(e)
  }
}