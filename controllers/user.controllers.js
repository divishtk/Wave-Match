import { User } from "../models/users.model.js";

export const userSignUpCOntroller = async (req, resp) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return resp.status(400).json({
        success: false,
        message: "Account already exixts",
      });
    }

    const userDB = await User.create({
      firstName,
      lastName,
      email,
      password,
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
  try {
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
      success: false,
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
