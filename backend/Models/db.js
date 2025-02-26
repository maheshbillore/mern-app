const mongoose = require('mongoose');

require('dotenv').config();

const mongoose_url = process.env.MONGOOSE_URL;     
mongoose.connect(mongoose_url).then(()=>{
    console.log("MongoDB Connected .. ...");
}).catch((err)=>{
    console.log(`MongoDb Connected Error ${err}`);
})