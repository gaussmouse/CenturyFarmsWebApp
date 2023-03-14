const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cropRouter = require('./routers/cropRouter.js');
const livestockRouter = require('./routers/livestockRouter.js');
const farmDescriptionRouter = require('./routers/farmDescriptionRouter.js');
const currentOwnerRouter = require('./routers/currentOwnerRouter.js');
const currentFarmRouter = require('./routers/farmCurrentRouter.js');
const pastFarmRouter = require('./routers/farmPastRouter.js');
const originalOwnerRouter = require('./routers/originalOwnerRouter.js');
const locationRouter = require('./routers/locationRouter.js');
const morgan = 'morgan';
const cors = 'cors';
require.dotenv.config({ path: "./config.env" });

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
const path = require('path');

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