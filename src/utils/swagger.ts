import type { Express, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { version } from '../../package.json'
import log from '../logger'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products REST API Docs',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      }
    ]
  },
  apis: ['./src/routes.ts', './src/schema/*.ts'],
}

const spec = swaggerJsdoc(options)

export const swaggerDocs = (app: Express, port: number) => {
  // Swagger docs page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))

  // Swagger docs in JSON format
  app.get('/api-docs.json', (req: Request, res: Response) => {
    try {
      res.setHeader('Content-Type', 'application/json')
      res.send(spec)
    } catch (e: any) {
      log.error(e)
      res.sendStatus(500)
    }
  })

  log.info(`Swagger docs available at http://localhost:${port}/api-docs`)
}
