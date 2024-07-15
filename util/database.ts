//util/database.ts
import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://hanho:1234@hanho.fwfhrts.mongodb.net/forum?retryWrites=true&w=majority&appName=hanho'
const options: any = { useNewUrlParser: true }
let connectDB: any
if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(url, options).connect()
}
export { connectDB }