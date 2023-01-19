const { uploads } = require("../cloudinary");

class Middleware {
  fileUploadCloudnary = async (req, res, next) => {
    var arrayImages = [];
    console.log(req.files);
      try {
        const cloudnaryPromise = uploads(req.files.pic.tempFilePath, "Profile-Pictures");
        arrayImages.push(cloudnaryPromise);
      } catch (error) {
        console.log(error, "cloudnary erro");
      }

    req.cloudnaryFiles = await Promise.all(arrayImages);

    next();
  };
}

module.exports = Middleware;
