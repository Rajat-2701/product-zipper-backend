const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: 'User',
    },
    pic: {
      type: Object,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      required: false,
    },
    otp: {
      type: String,
    },
    isOtpVerified: {
      type: String,
      default: '0',
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model('users', userSchema);

module.exports = User;
