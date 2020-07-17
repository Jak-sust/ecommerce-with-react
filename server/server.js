import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

try{
    mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    console.log('Connected with Mongo Database Server');
}catch(e){
    console.log(e);
}


const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.get("/api/products", ( req, res ) => {
//     res.send(data.products);
// });

// app.get("/api/products/:id", ( req, res ) => {
//     let productId = req.params.id;
//     let product = data.products.find( x=> x._id  === parseInt( productId ) );
//     if( product ) 
//         res.send( product );
//     else
//         res.status(404).send({ message: "product not found" });
// });

app.listen(5000, ()=> { console.log("Server started at http://localhost:5000"); });