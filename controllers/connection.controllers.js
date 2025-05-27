import { ConnectionRequest } from "../models/connectionRequest.model.js";

export const getConnectionRequests = async (req, resp) => {
  const loggedInUser = req.user;

  try {
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
      // }).populate("fromUserId",["firstName","lastName"]);
    }).populate(
      "fromUserId",
      "firstName lastName age about hobbies gender pic"
    );

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

export const yourConnections = async (req, resp) => {
  const loggedInUser = req.user;

  try {
    // const yourConnections = await ConnectionRequest.find({
    //   toUserId: loggedInUser,
    //   status:"accepted"
    // }).populate("fromUserId",["firstName"]);

    const yourConnections = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", "firstName lastName age about hobbies gender pic")
      .populate("toUserId", "firstName lastName age about hobbies gender pic");


      console.log(yourConnections)

    const data = yourConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    return resp.status(201).json({
      success: true,
      message: "Your connections",
      data,
    });
  } catch (error) {
    console.log(error);
    return resp.status(201).json({
      success: true,
      message: error.message,
    });
  }
};
