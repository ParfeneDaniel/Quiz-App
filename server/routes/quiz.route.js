const express = require("express");
const authorization = require("../middlewares/authorization");
const { createQuiz, deleteQuiz, getQuiz } = require("../controllers/quiz.controllers");

const router = express.Router();

router.use(authorization);
router.post("/createQuiz", createQuiz);
router.delete("/deleteQuiz/:quizId", deleteQuiz);
router.get("/getQuiz/:quizId", getQuiz);

module.exports = router;
