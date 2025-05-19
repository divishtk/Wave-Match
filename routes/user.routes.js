import { Router } from "express";
import { deleteUser, getFeedOfUsers, getUserByEmail, userSignUpCOntroller } from "../controllers/user.controllers.js";

const userRouter = Router();


userRouter.route("/sign-up").post(userSignUpCOntroller)
userRouter.route("/get-user-from-email").get(getUserByEmail)
userRouter.route("/get-user-feed").get(getFeedOfUsers)
userRouter.route("/delete-user").delete(deleteUser)


export default userRouter;
