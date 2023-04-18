import log from "../logger";
import UserModel, { UserInput } from "../model/user.model";

export const createUser = async (input: UserInput) => {
  try {
    return await UserModel.create(input)
  } catch (e: any) {
    log.error(e)
    throw new Error(e)
  }
}