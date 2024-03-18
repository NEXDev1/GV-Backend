const {
  findUserByEmail,
  updateUserPassword,
} = require("../database/repository/authRepository");
const { generateToken } = require("../services/jwt");
const { passwordComparing, passwordHashing } = require("../services/bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await passwordComparing(user.password, password);

    if (passwordMatch) {
      const token = generateToken(user._id);
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        data: { user, token },
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // sendPasswordResetEmail(user.email);
    return res.status(200).json({
      status: "success",
      message: "Password reset instructions sent successfully",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await findUserByEmail(email);

    const passwordMatch = await passwordComparing(
      user.password,
      currentPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await passwordHashing(newPassword);
    if (hashedPassword) await updateUserPassword(email, hashedPassword);

    return res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
