import { NextFunction, Request, Response } from 'express'
import { sendEmail } from './../utils/mail'
import { EMAIL_TO } from 'src/config'

async function send(req: Request, res: Response, next: NextFunction) {
  try {
    const from = req.body.from || 'Minh Pham'
    const to = req.body.to || EMAIL_TO
    const subject = req.body.subject || 'Subject'
    const content = req.body.content || 'Hello world'

    const result = await sendEmail(from, to, subject, content)
    if (result) {
      res.status(200).json({ message: 'Email sent successfully' })
    } else {
      res.status(500).json({ message: 'Email sent failed' })
    }
  } catch (error) {
    next(error)
  }
}

export const MailController = {
  send
}
