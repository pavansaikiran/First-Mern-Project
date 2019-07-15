const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const items = require('./routes/api/items');
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const config = require('config')

//declaring express variable

const app = express();

//applying the body parser
app.use(express.json());

//fetcing the mongo uri
const mongouri  =  config.get('mongoURI')

//connecting to mongodb
mongoose.connect(mongouri,{ useNewUrlParser: true,useCreateIndex: true })
.then(()=>{
    console.log("mongodb connected......");
}) 
.catch(error => console.log(error));

//using routes
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 5000;

//listening to port
app.listen(port, () => {
    console.log("server started on port "+port);
})
