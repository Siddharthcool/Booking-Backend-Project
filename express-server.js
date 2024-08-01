const express = require('express');

const server = express()

require("dotenv").config()

require('./src/DB/connect')

const { CreateNewCityInDbService } = require ('./src/service/City.Service');

//importing the files 
const CityRouter = require('./src/router/City.Router');
const UserRouter = require('./src/router/User.Router');
const AdventureRouter = require('./src/router/Adventure.Router')

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

CreateNewCityInDbService("Raipur", "http://images.com/img1.png", "100+ places" ,["dabeli"]);

server.use(express.json());

server.use("/cities",CityRouter);
server.use("/user",UserRouter);
server.use("/adventure",AdventureRouter);


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})