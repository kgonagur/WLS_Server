
const express = require('express'); // express is used for server side development
const mongoose = require("mongoose"); // mongoose is used to interact with mongo db
const app = express(); 
const cors = require ('cors');
const bodyParser=require('body-parser');

// server is configured to run on port 3500
require('dotenv/config');
const PORT = process.env.PORT || 3500;
const postRoute=require('./routes/routes');

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/rpis', postRoute);



mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true}, (err)=>{
    if(err)
    {console.log(err)}
    else {console.log('connected to db')}});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
