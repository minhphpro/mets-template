import express from 'express'
import { UploadController } from '../controllers'

const router = express.Router()
router.post('/', UploadController.handleUpload)

export default router
