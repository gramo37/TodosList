const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
var cors = require('cors');
const bodyParser = require("body-parser")
const connectToDatabase = require('./db');

// Handling uncaught error
process.on("uncaughtException", (err)=>{
    console.log(`Error message: ${err.message}`);
    console.log("\n\n\n\nError: ", err);
    console.log("\n\n\n\n", "Shutting Down because of uncaught error")
    process.exit(1)
})

var currentPath = process.cwd();
dotenv.config({path: path.join(currentPath, 'config/config.env')})
const errorMiddleware = require('./middleware/errors')

const app = express();
app.use(cors());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectToDatabase();


//Routes
app.use('/api/v1', require('./routes/userRoute'))
app.use('/api/v1', require('./routes/todosRoute'))

// Middleware for error
app.use(errorMiddleware);

const server = app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is working on ${process.env.PORT}`)
})


// Unhandled Promise Rejection error
process.on("unhandledRejection", (err)=>{
    console.log(`error: ${err.message}`);
    console.log("Shutting Down because of unhandled Rejection error")

    server.close(()=>{
        process.exit(1)
    });
})