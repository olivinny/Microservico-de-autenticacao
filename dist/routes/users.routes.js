"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const express_1 = require("express");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const userRoute = (0, express_1.Router)();
userRoute.get("/users", async (req, res, next) => {
    const users = await user_repository_1.default.findAllUsers();
    res.status(http_status_codes_1.StatusCodes.OK).send(users);
});
userRoute.get("/users/:uuid", async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const user = await user_repository_1.default.findById(uuid);
        res.status(http_status_codes_1.StatusCodes.OK).send(user);
    }
    catch (error) {
        next(error);
    }
});
userRoute.post("/users/", async (req, res, next) => {
    try {
        const newUser = req.body;
        const uuid = await user_repository_1.default.create(newUser);
        console.log(newUser);
        res.status(http_status_codes_1.StatusCodes.CREATED).send(uuid);
    }
    catch (error) {
        next(error);
    }
});
userRoute.put("/users/:uuid", async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;
        await user_repository_1.default.update(modifiedUser);
        res.status(http_status_codes_1.StatusCodes.OK).send();
    }
    catch (error) {
        next(error);
    }
});
userRoute.delete("/users/:uuid", async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        await user_repository_1.default.remove(uuid);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        next(error);
    }
});
exports.default = userRoute;
