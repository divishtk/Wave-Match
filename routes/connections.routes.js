import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { getConnectionRequests } from "../controllers/connection.controllers.js";

const connectionRouter = Router();

//endpoint for pending connection request
userRouter.route("/user/request").get(authenticationMiddleware,getConnectionRequests)







export default connectionRouter;
