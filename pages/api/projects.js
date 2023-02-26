import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const { id } = req.query;
    console.log("id:",id)
    //let doc = await req.db.collection('projects').findOne({'projectName':'Test project for reading tasks'}, {projection:{ _id: 0, taskList: 1 }}) // gets taskList only
    let doc = await req.db.collection('projects').findOne({'projectName':'Test Project'})
    console.log("DOC:",doc);

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