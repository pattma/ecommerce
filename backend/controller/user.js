const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const sendToken = require("../utils/jwtToken");

const { HOST, APP_SERVICE_PORT, ACTIVATION_SECRET } = process.env;
const PORT = APP_SERVICE_PORT;

router.post("/create-account", upload.single("file"), async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userEmail = await User.findOne({ email });
  
      if (userEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            res.status(500).json({ message: "Error deleting file" });
          } else {
            res.json({ message: "File deleted successfully" });
          }
        });
        return next(new ErrorHandler("User already exists", 400));

      }
  
      // Profile photo from upload on Sign up Page
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
  
      const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
      };

      const activationToken = createActivationToken(user);
      const activationUrl = `http://${HOST}:${PORT}/activation/${activationToken}`;

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${user.email} to activate your account.`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
}

// Activate user
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.bode;
    const newUser = jwt.verify(activation_token, ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;

    User.create({ 
      name, 
      email, 
      password, 
      avatar, 
    });
    sendToken(newUser, 201, res);

  } catch (error) {
    
  }
}));

module.exports = router;
