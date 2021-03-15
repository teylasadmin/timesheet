import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('projects').findOne()
    console.log(doc);
    res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;

  let doc = await req.db.collection('projects').insertOne(data, function (error, response) {
                                                               if(error) {
                                                                   console.log('Error occurred while inserting :', error);
                                                               } else {
                                                                   console.log('inserted record', response);
                                                               }
                                                           })
  res.json({message: 'ok'});
});
export default handler;