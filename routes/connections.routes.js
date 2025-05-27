import { Router } from "express";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";
import { getConnectionRequests } from "../controllers/connection.controllers.js";

const connectionRouter = Router();

//endpoint for pending connection request
connectionRouter.route("/user/requests/received").get(authenticationMiddleware,getConnectionRequests)







export default connectionRouter;
