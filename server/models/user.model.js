const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    previousPasswords: [
      {
        type: String,
      },
    ],
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
