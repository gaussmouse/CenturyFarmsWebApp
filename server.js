import * as dotenv from 'dotenv'; 
dotenv.config({ path: "./config.env" });

import express from 'express';
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
import cors from 'cors';

const app = express();

app.use(cors());
app.options('*', cors());

const connection_string = process.env.ATLAS_URI;
//const mapbox_token = process.env.REACT_APP_MAPBOX_ACCESS_KEY;

// middleware and routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(`/crop`, cropRouter);
app.use(`/farmdesc`, farmDescriptionRouter);
app.use(`/livestock`, livestockRouter);
app.use(`/currentOwner`, currentOwnerRouter);
app.use(`/currentFarm`, currentFarmRouter);
app.use(`/pastFarm`, pastFarmRouter);
app.use(`/originalOwner`, originalOwnerRouter);
app.use(`/location`, locationRouter);

mongoose.set(
    'strictQuery', false
);
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'CFDB'
})
.then(() =>{
    console.log('Database is connected')
})
.catch((err)=> {
    console.log(err);
})

//app.get('/map-data', async (res) => {
//    const response = await fetch(mapbox_token);
//    const mapboxPrivateToken = response.json();
//    res.json({mapboxPrivateToken});
//})

// Accessing the path module
import path from 'path';

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})