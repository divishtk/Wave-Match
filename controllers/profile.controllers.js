import { body } from "express-validator";
import { User } from "../models/users.model.js";
import { validateEditProfileData } from "../utils/validation.utils.js";

export const getProfile = async (req, resp) => {
  //   const cookies = req.cookies;
  //   console.log(cookies);
  //   resp.send("reading cookies");

  try {
    const user = await User.findById(req.user);

    return resp.status(200).json({
      success: true,
      message: "Get Profile success",
      user,
    });
  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      success: false,
      message: "Something went wrong while getting profile",
    });
  }
};

export const profileEdit = async (req, resp) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }

    const user = await User.findById(req.user);
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();

    return resp.status(201).json({
      success: true,
      message: `Your profile updated successfully , ${user.firstName}`,
      user,
    });


  } catch (error) {
    return resp.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
