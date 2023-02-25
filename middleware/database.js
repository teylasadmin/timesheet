import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://timesheet:admin@cluster0.nnmxims.mongodb.net/?retryWrites=true&w=majority', {
//const client = new MongoClient('mongodb://localhost:27017', { PWD: timesheet/admin
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('timesheet');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;