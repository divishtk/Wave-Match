import { ConnectionRequest } from "../models/connectionRequest.model.js";

export const getConnectionRequests = async (req, resp) => {
  const loggedInUser = req.user;

  try {
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
      // }).populate("fromUserId",["firstName","lastName"]);
    }).populate("fromUserId", "firstName lastName age about hobbies gender pic");

    return resp.status(201).json({
      success: true,
      message: "Your connections fetched",
      connectionRequest,
    });
  } catch (error) {
    return resp.status(201).json({
      success: true,
      message: error.message,
    });
  }
};
