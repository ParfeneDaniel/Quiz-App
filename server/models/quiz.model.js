const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  difficulty: {
    type: String,
    default: "",
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answers: [
        {
          type: String,
        },
      ],
      correct: {
        type: Number,
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
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
