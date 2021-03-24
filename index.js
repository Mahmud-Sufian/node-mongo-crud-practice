const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;

const password = 'm-Qj$LZ2@MrGa.9';
const uri = "mongodb+srv://organicPractice:m-Qj$LZ2@MrGa.9@cluster0.qvri2.mongodb.net/organicPractice?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})








client.connect(err => {
  const productCollection = client.db("organicPractice").collection("products");

  app.get('/product', (req, res) => {
    productCollection.find({})
    .toArray( (err, document) => {
        res.send(document);
    })
  })


  app.get('/product/:id', (req, res) => {
    productCollection.find({_id: ObjectId(req.params.id)})
    .toArray( (err, document) => {
        res.send(document[0])
    })
  })

   app.post('/addPost', (req, res) => {
       const product = req.body;  
       productCollection.insertOne(product)
       .then(result => {
           res.redirect('/')
       })
   })
   

   app.patch('/update/:id', (req, res) => { 
    productCollection.updateOne({_id: ObjectId(req.params.id)}, 
    {
        $set: {quantity: req.body.quantity, price: req.body.price}
    })
    .then(result => {
        res.send(result.modifiedCount > 0)
    })
   })


   app.delete('/delete/:id', (req, res) => { 
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
         res.send(result.deletedCount > 0)
    })
   })
   
});



app.listen(3000, () => console.log('Running This Port'))