import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { sendConnectionRequest } from "../controllers/request.controllers.js";

const requestRouter = Router();


requestRouter.route("/send-request").get(authenticationMiddleware,sendConnectionRequest)


export default requestRouter;
