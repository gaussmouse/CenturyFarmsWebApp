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
import cropTypeRouter from './routers/cropTypeRouter.js';
import livestockTypeRouter from './routers/livestockTypeRouter.js';
import futureMaxTemps from './routers/futureMaxTempRouter.js';
import futureMinTemps from './routers/futureMinTempRouter.js';
import futureMeanTemps from './routers/futureMeanTempRouter.js';
import futurePercipitation from './routers/futurePercipitationRouter.js';
import historicMaxTemps from './routers/historicMaxTempRouter.js';
import historicMinTemps from './routers/historicMinTempRouter.js';
import historicMeanTemps from './routers/historicMeanTempRouter.js';
import historicPercipitation from './routers/historicPercipitationRouter.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.options('*', cors());

const connection_string = process.env.ATLAS_URI;
//const mapbox_token = process.env.REACT_APP_MAPBOX_ACCESS_KEY;

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
app.use(`/cropType`, cropTypeRouter);
app.use('/livestockType', livestockTypeRouter);
app.use(`/hMaxT`, historicMaxTemps);
app.use(`/hMinT`, historicMinTemps);
app.use(`/hMeanT`, historicMeanTemps);
app.use(`/hPercipitation`, historicPercipitation);
app.use(`/fMaxT`, futureMaxTemps);
app.use(`/fMinT`, futureMinTemps);
app.use(`/fMeanT`, futureMeanTemps);
app.use(`/fPercipitation`, futurePercipitation);

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

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})