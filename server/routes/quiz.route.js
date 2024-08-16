const express = require("express");
const authorization = require("../middlewares/authorization");
const { createQuiz, deleteQuiz } = require("../controllers/quiz.controllers");

const router = express.Router();

router.use(authorization);
router.post("/createQuiz", createQuiz);
router.delete("/deleteQuiz/:quizId", deleteQuiz);

module.exports = router;
