import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { requestReview, sendConnectionRequest } from "../controllers/request.controllers.js";

const requestRouter = Router();


requestRouter.route("/request/send/:status/:toUserId").post(authenticationMiddleware,sendConnectionRequest);
requestRouter.route("/request/review/:status/:requestId").post(authenticationMiddleware,requestReview);


export default requestRouter;
