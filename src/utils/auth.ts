import jwt, { Secret, VerifyErrors } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { SECRET_KEY } from '../config'
import { createError } from '../utils'
import { IAccount } from '../types'

export function generateAccessToken(user: IAccount | any, expiresIn: string = '7d') {
  const { username, password, admin } = user
  const tokenPayload = { username, password, admin }
  return jwt.sign(tokenPayload, SECRET_KEY as Secret, { expiresIn })
}

export function verifyToken(req: Request, next: NextFunction, callback: (params: any) => void) {
  const token = req.headers?.['authorization']?.split(' ')[1]
  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }

  jwt.verify(token, SECRET_KEY as Secret, (err: VerifyErrors | null, decoded: any) => {
    if (err) return next(createError(403, 'Token is not valid!'))
    callback(decoded)
  })
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  verifyToken(req, next, (decoded: any) => {
    if (decoded) {
      next()
    } else {
      return next(createError(403, 'You are not authorized!'))
    }
  })
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  verifyToken(req, next, (decoded: any) => {
    if (decoded?.admin?.is_super_admin) {
      next()
    } else {
      return next(createError(403, 'You are not authorized!'))
    }
  })
}
