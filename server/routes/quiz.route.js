const express = require("express");
const authorization = require("../middlewares/authorization");
const {
  createQuiz,
  deleteQuiz,
  getQuiz,
  markAsPlayed,
  addLike,
  removeLike,
  getQuizzes,
} = require("../controllers/quiz.controllers");

const router = express.Router();

router.use(authorization);
router.post("/createQuiz", createQuiz);
router.delete("/deleteQuiz/:quizId", deleteQuiz);
router.get("/getQuiz/:quizId", getQuiz);
router.post("/markAsPlayed", markAsPlayed);
router.post("/addLike", addLike);
router.post("/removeLike", removeLike);
router.get("/getQuizzes", getQuizzes);

module.exports = router;
