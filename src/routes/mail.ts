import express from 'express'
import { MailController } from '../controllers'

const router = express.Router()
router.post('/send', MailController.send)

export default router
