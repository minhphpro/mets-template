import { MongoClient, ServerApiVersion } from 'mongodb'
import { MONGO_DATABASE, MONGO_URI } from '../config'

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined')
}

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true
  }
})

;(async () => {
  await client.connect()
  console.log('Connected to Mongo')
})()

export default client
export const DB = client.db(MONGO_DATABASE)
