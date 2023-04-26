import config from 'config'
import * as jwt from 'jsonwebtoken'

export const signJWT = (payload: Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions | undefined) => {
  const signingKey = config.get<string>(keyName)

  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export const verifyJWT = (token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPPublicKey') => {
  const publicKey = config.get<string>(keyName)

  try {
    const decodedToken = jwt.verify(token, publicKey)
    return {
      isValid: true,
      expired: false,
      decodedToken,
    }
  } catch (err: any) {
    return {
      isValid: false,
      expired: err.message === 'jwt expired',
      decodedToken: null,
    }
  }
}
