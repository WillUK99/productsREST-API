import UserModel, { UserInput } from "../model/user.model";

export const createUser = async (input: UserInput) => {
  try {
    return await UserModel.create(input)
  } catch (e: any) {
    throw new Error(e)
  }
}