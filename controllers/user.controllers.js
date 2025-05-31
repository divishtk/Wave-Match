import { ConnectionRequest } from "../models/connectionRequest.model.js";
import { User } from "../models/users.model.js";
import { validateSignUpData } from "../utils/validation.utils.js";

export const userSignUpCOntroller = async (req, resp) => {
  try {
    const sanitizeData = await validateSignUpData(req);
    const user = await User.findOne({ email: sanitizeData.email });

    if (user) {
      return resp.status(400).json({
        success: false,
        message: "Account already exixts",
      });
    }

    const userDB = await User.create({
      ...sanitizeData,
    });

    await userDB.save();
    const createdUserCheck = await User.findById(userDB._id);
    if (!createdUserCheck) {
      return resp.status(400).json({
        success: false,
        message: "Something went wrong while user creation",
      });
    }

    return resp.status(400).json({
      data: createdUserCheck,
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserByEmail = async (req, resp) => {
  const email = req.body.email;

  try {
    const user = await User.find({
      email,
    });

    if (user.length === 0) {
      return resp.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return resp.status(200).json({
      data: user,
      success: true,
      message: "Fetch Success",
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      success: false,
      message: "Something went wrong while fetching",
    });
  }
};

export const getFeedOfUsers = async (req, resp) => {
  /*try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      return resp.status(404).json({
        success: false,
        message: "No registered users as of now..",
      });
    }

    return resp.status(200).json({
      data: allUsers,
      success: true,
      message: "Fetch Success",
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      success: false,
      message: "Something went wrong while fetching all users",
    });
  }*/

  try {
    const loggedInUser = req.user;

    //find all connection request that either i have (send + received)

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId , toUserId")
   // .populate("fromUserId", "firstName")
    //.populate("toUserId" , "firstName");


    const hiddenUsersFromFeed = new Set() ;
    connectionRequest.forEach(req =>{
      hiddenUsersFromFeed.add(req.fromUserId.toString()) ;
      hiddenUsersFromFeed.add(req.toUserId.toString()) ;
    })


    const users = await User.find({
      $and :[
          {
            _id : {
              $nin: Array.from(hiddenUsersFromFeed) 
            }
          },
          {
            _id : {
              $ne: loggedInUser._id
            }
          }
      ]  
      }).select("firstName lastName age about hobbies gender pic")

    resp.send(users);
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      success: false,
      message: "Something went wrong while fetching all users",
    });
  }
};

export const deleteUser = async (req, resp) => {
  const user = req.body.userId;

  try {
    const deleteUser = await User.findByIdAndDelete({
      //user
      _id: user,
    });

    if (!deleteUser) {
      return resp.status(401).json({
        success: false,
        message: "User is already deleted or it doesnot exists",
      });
    }

    return resp.status(400).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      success: false,
      message: "Error while deleting user",
    });
  }
};

export const updateUser = async (req, resp) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["pic", "age", "about", "gender", "hobbies"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error(`Updating is not allowed `);
    }

    if (data.hobbies.length > 10) {
      throw new Error(`Hobbies more then 10 is not allowed `);
    }

    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    return resp.status(400).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      success: false,
      message: "Error while updating user",
      err: error.message,
    });
  }
};

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(400).json({
        success: false,
        message: "Account doesnot exists, please create account",
      });
    }
    const checkPassword = await user.isMatchPassword(password);

    if (!checkPassword) {
      return resp.status(401).json({
        success: false,
        message: "Please provide the correct password",
      });
    }

    const token = await user.getJWT();
    resp.cookie("token", token, {
      expires: new Date(Date.now() + 2 + 3600000),
    });

    return resp.status(200).json({
      success: true,
      message: "Logged In",
    });
  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      success: false,
      message: "Something went wrong while performing login",
    });
  }
};

export const logout = async (req, resp) => {
  resp.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  return resp.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
