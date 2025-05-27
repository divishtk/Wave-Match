import { ConnectionRequest } from "../models/connectionRequest.model.js";
import { User } from "../models/users.model.js";

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

    const toUserIdExists = await User.findById(toUserId);
    console.log(toUserIdExists);
    if (!toUserIdExists) {
      return resp.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingConnectionRequest) {
      return resp.status(400).json({
        success: false,
        message: "Connection request already exists",
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
    console.log(error);
    return resp.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const requestReview = async (req, resp) => {
  const loggedInUser = req.user;
  const { status, requestId } = req.params;

  try {
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return resp.status(404).json({
        success: false,
        message: "Status not allowed",
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser,
      status: "intrested",
    });

    if (!connectionRequest) {
      return resp.status(404).json({
        success: false,
        message: "Connection request not found!",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    return resp.status(201).json({
      success: true,
      message: "Connection request " + status,
      data,
    });
  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
