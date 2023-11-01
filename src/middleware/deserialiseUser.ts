import { get } from "lodash";
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
import config from "config";

const deserialiseUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "cookies.accessToken") || get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  if (!accessToken) return next()

  const { decodedToken, expired } = verifyJWT(accessToken, 'accessTokenPublicKey')

  if (decodedToken && !expired) {
    res.locals.user = decodedToken
    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken })

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)

      res.cookie('accessToken', newAccessToken, {
        maxAge: 900000,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })

      const { decodedToken } = verifyJWT(newAccessToken, 'accessTokenPublicKey')

      res.locals.user = decodedToken
    }
  }

  return next()
}

export default deserialiseUser