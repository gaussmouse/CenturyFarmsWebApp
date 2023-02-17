'use strict';

const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const api = process.env.API_URL;
const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(require("./routers/cropRouter"))
app.options('*', cors());

/*
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cropRouter from './routers/cropRouter.js';
import livestockRouter from './routers/livestockRouter.js';
import farmDescriptionRouter from './routers/farmDescriptionRouter.js';
import currentOwnerRouter from './routers/currentOwnerRouter.js';
import currentFarmRouter from './routers/farmCurrentRouter.js';
import pastFarmRouter from './routers/farmPastRouter.js';
import originalOwnerRouter from './routers/originalOwnerRouter.js';
import locationRouter from './routers/locationRouter.js';
import morgan from 'morgan';
*/

//const dbo = require("./db/conn.js");

/*
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(`${api}/crop`, cropRouter);
app.use(`${api}/farmdesc`, farmDescriptionRouter);
app.use(`${api}/livestock`, livestockRouter);
app.use(`${api}/currentOwner`, currentOwnerRouter);
app.use(`${api}/currentFarm`, currentFarmRouter);
app.use(`${api}/pastFarm`, pastFarmRouter);
app.use(`${api}/originalOwner`, originalOwnerRouter);
app.use(`${api}/location`, locationRouter);
*/

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //strictQuery: true,
    dbName: 'CFDB'
})
.then(() =>{
    console.log('Database is connected')
})
.catch((err)=> {
    console.log(err);
})

app.listen(port, () => {
    //console.log(api);
    console.log(`Server is running on port: ${port}`);
  });