import express from "express";
import {body} from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middleware/token.middleware.js";


const router = express.Router();

router.post(
    "/register",
    body("username")
        .exists().withMessage("Username is required")
        .custom(async value => {
        const user = await userModel.findOne({ username: value });
        if (user) return Promise.reject("Username already taken");
    }),

    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min:8 }).withMessage("Minimum length 8 characters"),
    body("confirmPassword")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("confirmPassword")
        .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmPassword not match");
        return true;
    }),
    body("displayName")
        .exists().withMessage("displayName is required"),
    requestHandler.validate,
    userController.register

);

router.post("/login",
    body("username")
        .exists().withMessage("Password is required"),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Minimum length 8 characters"),
    requestHandler.validate,
    userController.login

);

router.get("/info", tokenMiddleware.authUser, userController.getInfo);

router.get("/favorites", tokenMiddleware.authUser, favoriteController.getFavoritesOfUser);

router.post("/favorites", tokenMiddleware.authUser, 
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId can't be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favoriteController.addFavorite

);

router.delete("/favorites/:favoriteId", tokenMiddleware.authUser, favoriteController.removeFavorite);




export default router;