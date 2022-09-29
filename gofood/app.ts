import express from 'express';
import mongoose from 'mongoose';
import expressInstance from './services/express';

require('dotenv').config();

const port = process.env.PORT || 3003;
const app : express.Application = expressInstance.getApp();

const uri = process.env.ATLAS_URI as string;

if(uri != undefined){
    mongoose.connect(uri);
    
    const connection : mongoose.Connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB succefully connected");
    })
}else{
    console.error("URI not exist")
}

const menuRoute = require('./routes/menuRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const historyRoute = require('./routes/historyRoute');

app.use('/menu', menuRoute);
app.use('/restaurant', restaurantRoute);
app.use('/hist', historyRoute);

app.get('/', (req, res) => {
    console.log("Hello world");

    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})