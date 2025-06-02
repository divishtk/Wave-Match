import { Router } from "express";
import { deleteUser, getFeedOfUsers, getUserByEmail, login, logout, updateUser, userSignUpCOntroller } from "../controllers/user.controllers.js";
import authenticationMiddleware from "../middlewares/auth.middlewares.js";

const userRouter = Router();


userRouter.route("/sign-up").post(userSignUpCOntroller)
userRouter.route("/get-user-from-email").get(getUserByEmail)
userRouter.route("/get-user-feed").get(authenticationMiddleware,getFeedOfUsers)
userRouter.route("/delete-user").delete(deleteUser)
userRouter.route("/update-user/:userId").patch(updateUser)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(authenticationMiddleware,logout)



//endpoint for pending connection request
userRouter.route("/user/request").get(authenticationMiddleware,logout)







export default userRouter;
