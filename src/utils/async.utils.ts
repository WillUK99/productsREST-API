import { Request, Response, NextFunction } from 'express'

type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncHandler = (routeHandler: RouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(routeHandler(req, res, next)).catch(next)
}
