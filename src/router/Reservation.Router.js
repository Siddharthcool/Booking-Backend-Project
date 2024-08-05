const express = require("express");

const {
    CreateNewReservationController,
} = require("./../controller/Reservation.Controller");
const {
    CustomerAuthorizationMiddleware,
} = require("./../Middleware/Authorisation.Middleware");

const ReservationRouter = express.Router();

ReservationRouter.post(
    "/add",
    CustomerAuthorizationMiddleware,
    CreateNewReservationController
);

module.exports = ReservationRouter;