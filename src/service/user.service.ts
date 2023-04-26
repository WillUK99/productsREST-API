import { omit } from "lodash";
import log from "../logger";
import UserModel, { UserInput } from "../model/user.model";

export const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input)
    return omit(user.toJSON(), "password")
  } catch (e: any) {
    log.error(e)
    throw new Error(e)
  }
}

export const validateUser = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ email })

    if (!user) return false
    const isValid = await user.comparePassword(password)

    if (!isValid) return false

    return omit(user.toJSON(), "password")
  } catch (e: any) {
    log.error(e)
    throw new Error(e)
  }
}
