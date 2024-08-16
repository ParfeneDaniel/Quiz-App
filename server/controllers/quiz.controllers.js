const mongoose = require("mongoose");
const Quiz = require("../models/quiz.model");
const User = require("../models/user.model");

const createQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const quiz = {
      userId: user._id,
      username: user.username,
      ...req.body,
    };
    const newQuiz = new Quiz(quiz);
    user.quizzes.push(newQuiz._id);
    await Promise.all([newQuiz.save(), user.save()]);
    res.status(201).json({ message: "Your quiz was created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);
    if (!isValidQuizId) {
      return res.status(400).json({ message: "Your quiz id isn't valid" });
    }
    const userId = req.user.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "This quiz doesn't exist" });
    }
    if (quiz.userId != userId) {
      return res.status(403).json({ message: "Quiz isn't yours" });
    }
    await Promise.all([
      Quiz.findByIdAndDelete(quizId),
      User.updateOne({ _id: userId }, { $pull: { quizzes: quizId } }),
    ]);
    res.status(201).json({ message: "Your quiz was deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

module.exports = { createQuiz, deleteQuiz };
