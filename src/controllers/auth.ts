import bcrypt from 'bcryptjs'
import { object, string } from 'yup'
import { Request, Response } from 'express'
import { DB } from '../database'
import { COLLECTIONS } from '../config'
import { generateAccessToken } from '../utils'
const AccountRepo = DB.collection(COLLECTIONS.ACCOUNTS)

const accountSchema = object().shape({
  username: string().email().required(),
  password: string().required()
})

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    accountSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const account = await AccountRepo.findOne({ username })
        if (!account) return res.status(401).json({ message: 'Email or password is wrong!' })
        const isPasswordCorrect = await bcrypt.compare(password, account?.password)
        if (!isPasswordCorrect) return res.status(401).json({ message: 'Email or password is wrong!' })

        const expires_in = '7d'
        const access_token = generateAccessToken(account, expires_in)
        const refresh_token = generateAccessToken(account, '14d')
        const token_type = 'Bearer'
        res.json({
          message: 'Login success',
          data: {
            access_token,
            expires_in,
            refresh_token,
            token_type
          }
        })
      })
      .catch((err) => {
        return res.status(400).json({ message: err.errors.join(', ') })
      })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const AuthController = {
  login
}
