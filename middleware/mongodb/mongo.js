import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

// Middleware setup.
// NOT SECURE - DO NOT PUSH INTO PRODUCTION WITHOUT ADDING ADDITIONAL SECURITY MEASURES
const client = new MongoClient(
  "mongodb+srv://demo:user@claypot.vzzkp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
async function database(req, res, next) {
  // console.log(client)
  await client.connect();
  req.dbClient = client;
  req.db = client.db("cpm-next");
  return next();
}
console.log("test two");

const mongo_middleware = nextConnect();
mongo_middleware.use(database);
export default mongo_middleware;
