import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { requestReview, sendConnectionRequest } from "../controllers/request.controllers.js";

const requestRouter = Router();


requestRouter.route("/request/send/:status/:toUserId").get(authenticationMiddleware,sendConnectionRequest);
requestRouter.route("/request/review/:status/:requestId").get(authenticationMiddleware,requestReview);


export default requestRouter;
