import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { getProfile } from "../controllers/profile.controllers.js";

const profileRouter = Router();

profileRouter.route("/get-profile").get(authenticationMiddleware,getProfile)



export default profileRouter;
