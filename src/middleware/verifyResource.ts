import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from 'zod'

const verifyResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    })
    next()
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
}

export default verifyResource
