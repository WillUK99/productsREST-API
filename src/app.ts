import express from 'express'
import config from 'config'
import log from './logger'
import connect from './db/connect'
import routes from './routes'

const port = config.get<number>('port')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, async () => {
  log.info(`Server started at http://localhost:${port}`)
  await connect()
  routes(app)
}) 