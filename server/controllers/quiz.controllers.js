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
    user.quizzes.push({
      ID: newQuiz._id,
      title: newQuiz.title,
      category: newQuiz.category,
    });
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

const getQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const userId = req.user.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "This quiz doesn't exist" });
    }
    const user = await User.findById(userId);
    if (quiz.userId == userId) {
      res.json({ message: "This is your quiz", quiz, isYours: true });
    } else {
      const wasPlayed = user.played.find((id) => id == quizId) ? true : false;
      const wasLiked = user.liked.find((id) => id == quizId) ? true : false;
      res.json({
        message: "This isn't your quiz",
        quiz,
        isYours: false,
        played: wasPlayed,
        liked: wasLiked,
      });
    }
    return res.status(201);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

const markAsPlayed = async (req, res) => {
  try {
    const { quizId } = req.body;
    var { numberOfPoints } = req.body;
    const userId = req.user.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "This quiz doesn't exist" });
    }
    if (quiz.userId == userId) {
      return res
        .status(403)
        .json({ message: "This quiz is yours, you can't mark it" });
    }
    const user = await User.findById(userId);
    const wasPlayed = user.played.find((id) => id == quizId);
    if (wasPlayed) {
      return res.status(201).json({ message: "You already played this quiz" });
    }
    if (numberOfPoints > quiz.questions.length) {
      numberOfPoints = 0;
    }
    const authorQuiz = await User.findById(quiz.userId);
    quiz.numberOfPlays = quiz.numberOfPlays + 1;
    user.played.push(quizId);
    user.points = user.points + numberOfPoints;
    authorQuiz.numberOfPlays = authorQuiz.numberOfPlays + 1;
    await Promise.all([quiz.save(), user.save(), authorQuiz.save()]);
    res.status(201).json({ message: "This quiz was marked as played" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

const addLike = async (req, res) => {
  try {
    const { quizId } = req.body;
    const userId = req.user.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "This quiz doesn't exist" });
    }
    if (quiz.userId == userId) {
      return res
        .status(403)
        .json({ message: "This quiz is yours, you can't like it" });
    }
    const user = await User.findById(userId);
    const wasLiked = user.liked.find((id) => id == quizId);
    if (wasLiked) {
      return res.status(201).json({ message: "You already liked this quiz" });
    }
    const authorQuiz = await User.findById(quiz.userId);
    quiz.numberOfLikes = quiz.numberOfLikes + 1;
    user.liked.push(quizId);
    authorQuiz.numberOfLikes = authorQuiz.numberOfLikes + 1;
    await Promise.all([quiz.save(), user.save(), authorQuiz.save()]);
    res.status(201).json({ message: "This quiz was liked" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const { quizId } = req.body;
    const userId = req.user.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "This quiz doesn't exist" });
    }
    if (quiz.userId == userId) {
      return res
        .status(403)
        .json({ message: "This quiz is yours, you can't remove like" });
    }
    const user = await User.findById(userId);
    const wasLiked = user.liked.find((id) => id == quizId);
    if (!wasLiked) {
      return res.status(201).json({ message: "You didn't like this quiz" });
    }
    const authorQuiz = await User.findById(quiz.userId);
    quiz.numberOfLikes = quiz.numberOfLikes - 1;
    authorQuiz.numberOfLikes = authorQuiz.numberOfLikes - 1;
    await Promise.all([
      quiz.save(),
      authorQuiz.save(),
      User.updateOne(
        {
          _id: userId,
        },
        { $pull: { liked: quizId } }
      ),
    ]);
    res.status(201).json({ message: "You remove the like from this quiz" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

module.exports = {
  createQuiz,
  deleteQuiz,
  getQuiz,
  markAsPlayed,
  addLike,
  removeLike,
};
