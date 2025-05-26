import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { getProfile, profileEdit } from "../controllers/profile.controllers.js";

const profileRouter = Router();

profileRouter.route("/profile/view").get(authenticationMiddleware,getProfile);
profileRouter.route("/profile/edit").patch(authenticationMiddleware,profileEdit)




export default profileRouter;
