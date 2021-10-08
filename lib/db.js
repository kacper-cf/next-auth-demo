import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kdtw301:dbpwd@cluster0.30jyv.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
