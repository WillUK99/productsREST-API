import { get } from "lodash";
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.utils";

const deserialiseUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')

  if (!accessToken) return next()

  const { decodedToken, expired } = verifyJWT(accessToken, 'accessTokenPublicKey')
  console.log(decodedToken)
  if (decodedToken) {

    res.locals.user = decodedToken
    return next()
  }

  return next()
}

export default deserialiseUser