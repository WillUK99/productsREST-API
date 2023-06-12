import express from 'express'
import config from 'config'
import log from './logger'
import connect from './db/connect'
import routes from './routes'
import deserialiseUser from './middleware/deserialiseUser'

const port = config.get<number>('port')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(deserialiseUser)


app.listen(port, async () => {
  log.info(`Server started at http://localhost:${port}`)
  await connect()
  routes(app)
}) 