const mongoose = require("mongoose");
const connection_string = process.env.CONNECTION_STRING;

 
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