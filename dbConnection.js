require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Use the standard MongoDB URI from the environment variable
const uri = process.env.MONGO_URI || 'mongodb://<username>:<password>@cluster0-shard-00-00.hruudlw.mongodb.net:27017,cluster0-shard-00-01.hruudlw.mongodb.net:27017,cluster0-shard-00-02.hruudlw.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-xyz-shard-0&authSource=admin&retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToMongo() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongo();

module.exports = client;
