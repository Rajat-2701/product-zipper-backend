const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

// config cloudinary
cloudinary.config({
  cloud_name: "dvwtqsrv3",
  api_key: "524694372332363",
  api_secret: "tiKX6Rs4K3LfTsiaim3kZWTrYQA",
});
// register user :

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log("object", hashPassword);
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    res.send({ message: "User already exists with this email." });
  }
  let file = req.files.pic;
  //   console.log(file);
  console.log(file);

  cloudinary.uploader.upload(
    file.tempFilePath,
    { folder: "profile-pictures" },
    async (err, result) => {
      console.log(result);
      file = result.url;
      const profilePic = file;
      const user = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
        role,
        pic: profilePic,
      });
      if (user) {
        res.status(400);
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: hashPassword,
          phone: user.phone,
          role: user.role,
          pic: user.pic,
        });
      } else {
        res.status(200).send({ message: "Something went wrong." });
      }
    }
  );
});

// login user:
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(200);
    res.send({ message: "No user found" });
  } else {
    const validPasword = await bcrypt.compare(password, user.password);

    if (!validPasword) {
      res.status(200);
      res.send({ message: "Password is incorrect" });
    } else {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          pic: user.pic,
          role: user.role,
        },
        "this is my secret jwt token",
        {
          expiresIn: "24h",
        }
      );
      res.status(200);
      res.send({
        data: [
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            pic: user.pic,
            token: token,
          },
        ],
      });
    }
  }
});

// update user:
const updateUser = asyncHandler(async (req, res) => {
  try {
    const update = await User.findOneAndUpdate(req.body._id);
    if (update) {
      update.name = req.body.name || update.name;
      update.email = req.body.email || update.email;
      update.password = req.body.password || update.password;

      if (req.body.password) {
        update.password = req.body.password;
      }
      const updatedUser = await update.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
      });
    }
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = { registerUser, loginUser, updateUser };
