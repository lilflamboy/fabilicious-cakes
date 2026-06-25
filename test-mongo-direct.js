const mongoose = require('mongoose');
const uri = "mongodb://parmarvidhi:vidhiparmar@ac-95bdzcl-shard-00-00.64tffhi.mongodb.net:27017,ac-95bdzcl-shard-00-01.64tffhi.mongodb.net:27017,ac-95bdzcl-shard-00-02.64tffhi.mongodb.net:27017/fabilicious?ssl=true&replicaSet=atlas-95bdzcl-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED TO MONGODB!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FAILED TO CONNECT:");
    console.error(err);
    process.exit(1);
  });
