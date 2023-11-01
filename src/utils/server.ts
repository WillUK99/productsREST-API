import express from "express"
import routes from '../routes'
import deserialiseUser from "../middleware/deserialiseUser"
import cookieParser from "cookie-parser"


export const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser());
  app.use(deserialiseUser)
  routes(app)

  return app
}
