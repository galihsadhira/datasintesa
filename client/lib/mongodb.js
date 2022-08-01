const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
// const uri = `http://localhost:3000`;
const client = new MongoClient(uri);

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const database = client.db("test");
    const datas = database.collection("raw_datas");

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then(client => {
      return {
        client,
        db: database,
        collection: datas
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
