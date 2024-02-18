const app = require('./app');

const connectDatabase = require('./config/db')
const cloudinary = require('cloudinary')

//HANDLING UNCAUGHT EXCEPTION
process.on('uncaughtException',(err)=>{
    console.log(`error:${err.message}`);
    process.exit(1)
})

//config

require('dotenv').config({path: 'backend/config/.env'});



// DATABASE CONNECTION
connectDatabase()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.API_SECRET
})

const server = app.listen(process.env.PORT, ()=>{
    console.log('Server is connected on port ', process.env.PORT )
})






//Unhandled promise rejection
process.on('unhandledRejection', (err)=>{
    console.log(`Error :  ${err.message}`);
    server.close(()=>{
        process.exit(1);
    })
})