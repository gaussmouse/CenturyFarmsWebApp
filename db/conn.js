// const mongoose = require("mongoose");
// const connection_string = process.env.ATLAS_URI;

 
// mongoose.connect(connection_string, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     //strictQuery: true,
//     dbName: 'CFDB'
// })
// .then(() =>{
//     console.log('Database is connected')
// })
// .catch((err)=> {
//     console.log(err);
// })

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("CFDB");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};