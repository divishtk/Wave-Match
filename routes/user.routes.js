import { Router } from "express";
import { getUserByEmail, userSignUpCOntroller } from "../controllers/user.controllers.js";

const userRouter = Router();


userRouter.route("/sign-up").post(userSignUpCOntroller)
userRouter.route("/get-user-from-email").get(getUserByEmail)



export default userRouter;
