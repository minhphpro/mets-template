import { Request, Response } from 'express'
import streamifier from 'streamifier'
import multer from 'multer'
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary'
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_SECRET_KEY } from '../config'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY
})

const storage = multer.memoryStorage()
const upload = multer({ storage })
export const uploadMiddleware = upload.single('file')

export function useMiddleware(fn: any) {
  return (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        resolve(result)
      })
    })
  }
}

export async function uploadToCloudinary(fileBuffer: Buffer, options: UploadApiOptions) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
    streamifier.createReadStream(fileBuffer).pipe(stream)
  })
}
