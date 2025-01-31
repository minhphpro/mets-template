import { UploadApiOptions } from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import { uploadMiddleware, uploadToCloudinary, useMiddleware } from 'src/utils/upload'

export async function handleUpload(req: Request, res: Response, next: NextFunction) {
  try {
    await useMiddleware(uploadMiddleware)(req, res)

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const options: UploadApiOptions = {
      folder: req.body.folder || 'foler-name',
      width: parseInt(req.body.width || (req.query.width as string)) || 800,
      height: parseInt(req.body.height || (req.query.height as string)) || 600,
      crop: req.body.crop || 'limit'
    }

    const result = await uploadToCloudinary(req.file.buffer, options)

    res.status(200).json({
      success: true,
      message: 'Uploaded!',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const UploadController = {
  handleUpload
}
