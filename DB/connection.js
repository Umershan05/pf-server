const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("mongodb atlas successfully connected with pfServer");
}).catch((err)=>{
    console.log(`MongoDb Connection failed!!Error: ${err}`);
})