import { createServer } from './utils/server';
import config from 'config'
import log from './logger'
import connect from './db/connect'
import { swaggerDocs } from './utils/swagger';

const port = config.get<number>('port')

const app = createServer()

app.listen(port, async () => {
  log.info(`Server started at http://localhost:${port}`)
  await connect()
  swaggerDocs(app, port)
}) 