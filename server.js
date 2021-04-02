import express from 'express';
const app = express();
import dbConnect from './src/utils/db_Connection';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from './src/routes/Routes';
require('dotenv').config();
import LINK from './src/utils/InternalLinks'

const { BASE_API_URL } = LINK


//Database Connection
dbConnect.ConnectMongo();

app.use(cors());

app.use(bodyParser.json());

//base route
app.use(BASE_API_URL, Router)

app.use('/R1/resource', express.static(__dirname + '/'));

app.listen(3030, () => {
    console.log("server started at : 3030");
})