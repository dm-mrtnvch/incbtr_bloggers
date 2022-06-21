import {MongoClient} from 'mongodb'
import {IBlogger, IPost} from "../interfaces/global_interfaces";

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);

let db = client.db("bloggers")

export const bloggersCollection = db.collection<IBlogger>('bloggers')
export const postsCollection = db.collection<IPost>('posts')

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        await client.db('bloggers').command({ping: 1})
        console.log("Connected successfully to mongo server");

    } catch {
        console.log("Can't connect to db");
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
