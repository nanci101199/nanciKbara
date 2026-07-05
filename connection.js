const mongoose = require("mongoose");

async function connectMongoDb(url) {
    
   mongoose.connect(url).then(() => {
  console.log("Mongo connected");
}).catch((err) => console.log(err))

}

module.exports = { connectMongoDb }