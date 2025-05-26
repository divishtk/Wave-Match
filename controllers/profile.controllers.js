import { User } from "../models/users.model.js";

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