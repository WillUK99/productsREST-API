import mongoose from "mongoose"
import { UserDocument } from "./user.model"

export type SessionInput = {
  userId: UserDocument['_id']
  isValid: boolean
}

export type SessionDocument = mongoose.Document & SessionInput & {
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
  collection: "sessions",
})

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema)

export default SessionModel
