const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorroutes = require('./routes/vendorroutes');
const bodyParser =require('body-parser')
const firmroutes =require('./routes/firmroutes')
const productRoutes =require('./routes/productRoutes')
const path=require('path');
const cors=require('cors');

const app = express();

const port =process.env.port|| 4000;

dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("connected to monodb"))
  .catch((error) => console.log(error));


// ✅ Add this middleware to parse JSON request bodies
app.use(express.json());  // <-- This is what you're missing!
app.use(bodyParser.json());

app.use('/vendor', vendorroutes);
app.use('/firm',firmroutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

app.use('/', (req, res) => {
  res.send("<h1>welcome to subway</h1>");
});

app.listen(port, () => {
  console.log(`connected to server at port number ${port}`);
});

