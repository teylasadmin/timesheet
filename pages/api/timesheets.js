import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log("Hello from get")
    let doc = await req.db.collection('timesheets').findOne()
    console.log(doc);
    res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;

  console.log("DATA to save before parsing: ", data);
  //data = JSON.parse(data);

  //console.log("DATA to save : ", data);
  //data = JSON.parse(data);
  //data.date = new Date(data.date);
  //let doc = await req.db.collection('timesheets').updateOne({date: new Date(data.date)}, {$set:data}, {upsert: true})
  let doc = await req.db.collection('timesheets').insertOne(data, function (error, response) {
                                                               if(error) {
                                                                   console.log('Error occurred while inserting :', error);
                                                               } else {
                                                                   console.log('inserted record', response);
                                                               }
                                                           })
  res.json({message: 'ok'});
});

export default handler;

/*
export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: 'Hello from the Server side' }))
}*/
