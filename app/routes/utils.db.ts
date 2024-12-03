import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017");
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017");
  clientPromise = client.connect();
}

export async function connectToDatabase(): Promise<Db> {
  try {
    const client = await clientPromise;
    const dbName = process.env.DB_NAME || "applications"; // Updated Database Name
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed");
  }
}
