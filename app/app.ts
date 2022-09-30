import express from 'express';
import expressInstance from './services/express';

require('dotenv').config();

const port = process.env.PORT || 3001;
const app : express.Application = expressInstance.getApp();

app.get('/', (req, res) => {
    console.log("Hello world");

    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})