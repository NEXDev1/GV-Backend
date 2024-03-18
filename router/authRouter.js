const { Router } = require("express");
const { changePassword, forgotPassword, login } = require("../controller/authController");
const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/forgot-password", forgotPassword);
authRouter.post("/change-password", changePassword);

module.exports = authRouter;