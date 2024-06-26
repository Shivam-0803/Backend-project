import dotenv from "dotenv"



import connectDB from './db/index.js';
import {app} from './app.js'

dotenv.config({
    path: './env'
})



connectDB()


.then(()=>{
    app.on("error" ,(error)=>{
        console.log("ERRR" ,error);
        throw err;
    })
    app.listen(process.env.PORT || 8002 , ()=>{
        console.log(` server is running at port ; ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGO DB CONNECNN FAILED" ,err)
})














// import express from 'express'
// const app = express()


// (async () => {
//     try{
//        await  mongoose.connect(`$process.env.MONGODB_URI)/${DB_NAME}`)
//        app.on("ERROR" ,(error) => {
//         console.log("ERROR" ,error);
//         throw error;
//        })

//        app.listen(process.env.PORT , ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
//        })
//     }


//     catch(error){
//         console.log("ERROR "  , error)
//     }
// })()
