import mongoose from "mongoose"
import config from "config"

import { UserDocument } from "./user.model"

export type SessionDocument = mongoose.Document & {
  userId: UserDocument['_id']
  isValid: boolean
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
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

const SessionModel = mongoose.model("Session", sessionSchema)

export default SessionModel
