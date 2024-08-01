const express = require('express');

const server = express()

require("dotenv").config()

require('./src/DB/connect')

const { CreateNewCityInDbService } = require ('./src/service/City.Service');

//importing the files 
const CityRouter = require('./src/router/City.Router');
const AuthenticationRouter = require('./src/router/Authentication.Router');
const AdventureRouter = require('./src/router/Adventure.Router');
const AdventureDetailsRouter = require('./src/router/AdventureDetails.Router');

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

CreateNewCityInDbService("Raipur", "http://images.com/img1.png", "100+ places" ,["dabeli"]);

server.use(express.json());

server.use("/cities",CityRouter);
server.use("/auth",AuthenticationRouter);
server.use("/adventure",AdventureRouter);
server.use("/adventure/details",AdventureDetailsRouter);
server.use("*",(request,response) =>{
    response.status(404).json({
        success:false,
        message:"Route not found"})
})


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})