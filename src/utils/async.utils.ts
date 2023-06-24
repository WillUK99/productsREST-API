import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

type RouteHandler<P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ParsedQs> =
  (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => Promise<any>

export const asyncHandler = <P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>
  (routeHandler: RouteHandler<P, ResBody, ReqBody, ReqQuery>) =>
  (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(routeHandler(req, res, next)).catch(next)
  }
