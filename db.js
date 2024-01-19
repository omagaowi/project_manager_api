const { MongoClient } = require('mongodb')

let dbConnection
module.exports = {
    connectToDb: (cb)=>{
        MongoClient.connect(
          "mongodb+srv://omagadvd:cre8tive@cluster0.od13iq7.mongodb.net/?retryWrites=true&w=majority"
        )
          .then((client) => {
            dbConnection = client.db();
            return cb();
          })
          .catch((err) => {
            // console.log(err)
            return cb();
          });
    },
    getDb: ()=> dbConnection
}

// mongodb+srv://omagadvd:<password>@cluster0.od13iq7.mongodb.net/?retryWrites=true&w=majority