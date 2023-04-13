import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export type UserDocument = mongoose.Document & {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (newPassword: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: "users",
  discriminatorKey: "role",
})

userSchema.pre("save", async function (next) {
  const user = this as UserDocument
  if (!user.isModified("password")) return next() // Only hash the password if it has been modified (or is new)
  try {
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } catch (e: any) {
    next(e)
  }
})

userSchema.methods.comparePassword = async function (newPassword: string): Promise<boolean> {
  const user = this as UserDocument
  return bcrypt.compare(newPassword, user.password).catch((e: any) => false)
}

const UserModel = mongoose.model("User", userSchema)

export default UserModel
