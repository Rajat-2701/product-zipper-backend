const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = "this is my secret";
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.decode(token, "this is my secret jwt token");
    console.log(verify);
    if (verify.role === "admin") {
      next();
    } else {
      res.status(401).send({ message: "Only admin can do this." });
    }
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
// function authorize(roles = []) {
//   if (typeof roles === "string") {
//     roles = [roles];
//   }

//   return [
//     // authorize based on user's role i.e. admin:

//     // expressJwt({ secret: "thisismysecrettoken", algorithms: ["HS256"] }),
//     async (req, res, next) => {
//       const token = req.headers.authorization.split(" ")[1];
//       console.log(token);
//       const verify = jwt.verify(token, "this is my secret jwt token");
//       console.log(verify);
//       next();
//       // console.log("object");
//       // const account = await User.findOne({ _id: req.user._id });
//       // console.log(account);
//       // if (!account || (roles.length && !roles.includes(account.role))) {
//       //   return res.status(200).json({
//       //     code: 200,
//       //     status: false,
//       //     message: "Sorry! Only admin can access this page.",
//       //     data: [],
//       //   });
//       // } else {
//       //   next();
//       // }
//     },
//   ];
// }

// module.exports = authorize;
