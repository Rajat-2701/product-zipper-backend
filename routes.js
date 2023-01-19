const express = require("express");
const createProduct = require("./controllers/products.controller");
const {
  registerUser,
  loginUser,
  updateUser,
  verifyOtp,
} = require("./controllers/user.controller");
const router = express.Router();
const middleware = require("./validation/joi");
const authorize = require("./_middlewares/authorize");
const Middleware = require("./_middlewares/multer");
router
  .route("/register")
  .post(
    middleware.registerSchema,
    new Middleware().fileUploadCloudnary,
    registerUser,
    
  );
router.route("/verify-otp").post(verifyOtp);
router.route("/login").post(loginUser);
router.route("/update").post(updateUser);
router.route("/add-product").post(authorize, createProduct);
module.exports = router;
