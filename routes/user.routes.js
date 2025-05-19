import { Router } from "express";
import { deleteUser, getFeedOfUsers, getUserByEmail, updateUser, userSignUpCOntroller } from "../controllers/user.controllers.js";

const userRouter = Router();


userRouter.route("/sign-up").post(userSignUpCOntroller)
userRouter.route("/get-user-from-email").get(getUserByEmail)
userRouter.route("/get-user-feed").get(getFeedOfUsers)
userRouter.route("/delete-user").delete(deleteUser)
userRouter.route("/update-user/:userId").patch(updateUser)



export default userRouter;
