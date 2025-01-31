import mongoose from 'mongoose'
import { IAccount } from '../types'

const AccountSchema = new mongoose.Schema<IAccount>({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
})

export const Account = mongoose.model<IAccount>('Account', AccountSchema)
