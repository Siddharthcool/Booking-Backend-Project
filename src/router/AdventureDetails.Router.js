const express = require("express");
const {
  CreateAdventureDetailController,
} = require("../controller/AdventureDetails.Controller");

const AdventureDetailRouter = express.Router();

AdventureDetailRouter.post("/add", CreateAdventureDetailController);

module.exports = AdventureDetailRouter;
