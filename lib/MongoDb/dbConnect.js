import { MongoClient, ServerApiVersion } from "mongodb";

export const collections = {
    users: "users",
}

const uri = process.env.MONGODB_URI;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

export default async function dbConncect(collectionName) {
    const client = new MongoClient(uri, options);
    const collection = client.db("ShopNow_DB").collection(collectionName)
    return collection;
}; 
const clientPromise = new MongoClient(uri, options).connect();

export { clientPromise };