const express = require("express");
const {
    CreateAdventureDetailController,
} = require("../controller/AdventureDetails.Controller");
const {
    AdminAuthorizationMiddleware,
} = require("..//Middleware/Authorisation.Middleware");

const AdventureDetailRouter = express.Router();

AdventureDetailRouter.post(
    "/add",
    AdminAuthorizationMiddleware,
    CreateAdventureDetailController
);

module.exports = AdventureDetailRouter;