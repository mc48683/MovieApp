
import express from "express";
import tokenMiddleware from "../middleware/token.middleware.js";
import adminController from "../controllers/admin.controller.js";


const router = express.Router();

router.get("/allusers", tokenMiddleware.authAdmin, adminController.getUsers);

router.get("/allreviews", tokenMiddleware.authAdmin, adminController.getReviews);

router.delete("/allusers/:userId", tokenMiddleware.authAdmin, adminController.removeUser);

router.delete("/allreviews/:reviewId", tokenMiddleware.authAdmin, adminController.removeReview);

router.get("/allusers/:userId", tokenMiddleware.authAdmin, adminController.getUserReviews);

router.get("/allreviews/:userId", tokenMiddleware.authAdmin, adminController.getDisplayName);



export default router;
