// const mongoose = require("mongoose");
const User = require("../models/user");

exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    return error;
  }
};

// exports.findUserBy_id = async (email) => {
//   try {
//     const user = await User.findOne({ email });
//     return user;
//   } catch (error) {
//     console.error("Error finding user:", error);
//     return error;
//   }
// };

exports.updateUserPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    user.password = newPassword;
    await user.save();
  } catch (error) {
    throw new Error("Error updating user password");
  }
};
