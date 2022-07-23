"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const express_1 = require("express");
const userRoute = (0, express_1.Router)();
userRoute.get("/users", (req, res, next) => {
    const users = [{ userName: "Vinicius" }];
    res.status(http_status_codes_1.StatusCodes.OK).send(users);
});
userRoute.get("/users/:uuid", (req, res, next) => {
    const uuid = req.params.uuid;
    res.status(http_status_codes_1.StatusCodes.OK).send({ uuid });
});
userRoute.post("/users/", (req, res, next) => {
    const newUser = req.body;
    console.log(newUser);
    res.status(http_status_codes_1.StatusCodes.CREATED).send(newUser);
});
userRoute.put("/users/:uuid", (req, res, next) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;
    res.status(http_status_codes_1.StatusCodes.OK).send(modifiedUser);
});
userRoute.delete("/users/:uuid", (req, res, next) => {
    const uuid = req.params.uuid;
    res.sendStatus(http_status_codes_1.StatusCodes.OK);
});
exports.default = userRoute;
