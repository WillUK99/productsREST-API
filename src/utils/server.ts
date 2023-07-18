import express from "express"
import routes from '../routes'
import deserialiseUser from "../middleware/deserialiseUser"


export const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(deserialiseUser)
  routes(app)

  return app
}
