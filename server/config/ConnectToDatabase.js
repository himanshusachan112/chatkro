 const mongoose=require("mongoose");
 require("dotenv").config();

 exports.databaseConnect=async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("database connection is successful");
    })
    .catch((err)=>{
        console.log("database conncection faliled");
        console.error(err);
        process.exit(1);
    })
 }