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
        ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
    numberOfPlays: {
      type: Number,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    played: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
        required: true,
      },
    ],
    liked: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
