import { Router } from "express";
import { deleteUser, getFeedOfUsers, getUserByEmail, login, logout, updateUser, userSignUpCOntroller } from "../controllers/user.controllers.js";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";

const userRouter = Router();


userRouter.route("/sign-up").post(userSignUpCOntroller)
userRouter.route("/get-user-from-email").get(getUserByEmail)
userRouter.route("/get-user-feed").get(getFeedOfUsers)
userRouter.route("/delete-user").delete(deleteUser)
userRouter.route("/update-user/:userId").patch(updateUser)
userRouter.route("/login").get(login)
userRouter.route("/logout").post(authenticationMiddleware,logout)






export default userRouter;
