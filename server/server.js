const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3400;
const DB_URL = process.env.DB_URL;
app.use(cors());

//server connection

const server = app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

//database connection

mongoose.connect(DB_URL).then(()=>{
    console.log("connected to the database");
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/auth', require('./ROUTES/authRoute'));
app.use('/user',require('./ROUTES/userRoute'));
app.use('/update',require('./ROUTES/updateRoute'));
