import mongoose, { ConnectOptions } from "mongoose"
import config from "config"
import log from "../logger"

const connectDB = async (): Promise<void> => {
  const dbUri = config.get("dbUri") as string

  try {
    await mongoose
      .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    log.info('Connected to MongoDB')
  } catch (err) {
    if (err instanceof Error) log.error(err.message)
    process.exit(1)
  }

  return
}

export default connectDB 
