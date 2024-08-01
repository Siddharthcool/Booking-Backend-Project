const express = require ('express');

const {CreateMewCityController , GetAllCitiesController , UpdateCityController , DeleteCityController}  = require("./../controller/City.Controller");

const CityRouter = express.Router();

CityRouter.post("/add", CreateMewCityController)
CityRouter.get("/all",GetAllCitiesController)
CityRouter.put("/update",UpdateCityController)
CityRouter.delete("/delete",DeleteCityController)

module.exports = CityRouter;


