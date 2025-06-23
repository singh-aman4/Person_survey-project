const express=require('express');
require('dotenv').config();

const db=require('./dbConnect.js');
const app=express();

const cors = require('cors');  // CORS - corss origin resource sharing (allowing the my frontend to talk yo muy backend);
app.use(cors());

//for receiving the POST jason object;
const person=require('./modelP.js');
const bodyParser=require('body-parser');
app.use(bodyParser.json());  //stores the post msg in 'req.body'



app.get('/',(req,res)=>{
    res.send("Welcome to the HOMEPAGE, Glad to have you here");
})



const personRoutes=require('./routing.js');
app.use('/person',personRoutes);



const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("The main server is running!");
})

//push testing