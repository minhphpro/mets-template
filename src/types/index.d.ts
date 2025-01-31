import { ObjectId } from 'mongodb'

export interface IAccount {
  _id: ObjectId | undefined
  username: string
  password: string
}
