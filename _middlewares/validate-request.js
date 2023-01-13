function validateRequest(req, res, next, schema) {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      errorArray = [];
      const err = error.details.map((x) => {
        var message = x.message.replace(/['"]+/g, "");
        errorArray.push(message);
      });
      res.status(200).json({ code: 200, status: false, message: errorArray, data: [] });
  
    } else {
      req.body = value;
      next();
    }
  }
  module.exports = validateRequest;
  