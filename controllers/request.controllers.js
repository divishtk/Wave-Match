import { param } from "express-validator";
import { ConnectionRequest } from "../models/connectionRequest.model.js";

export const sendConnectionRequest = async (req, resp) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "intrested"];

    if (!allowedStatus.includes(status)) {
      return resp.status(400).json({
        success: false,
        message: "Invalid status type: " + status,
      });
    }

    


    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    return resp.status(201).json({
      success: false,
      message: "Connection request sent",
      data,
    });
  } catch (error) {
    return resp.status(401).json({
      success: false,
      message: "Something went wrong while sending request",
    });
  }
};
