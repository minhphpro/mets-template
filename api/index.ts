import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import { CORS_LOCAL_URL, CORS_ORIGIN_URL, PORT } from '../src/config'
import { routes } from '../src/routes'

const app = express()
mongoose.set('strictQuery', true)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to API !!!')
})

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || [CORS_ORIGIN_URL, CORS_LOCAL_URL].includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', routes.auth)
app.use('/api/mails', routes.mail)
app.use('/api/upload/public', routes.upload)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(PORT, () => {
  console.log(`Port ${PORT} is running`)
})

export default app
