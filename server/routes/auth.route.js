const express = require("express");
const {
  signUp,
  validEmail,
  signIn,
  refresh,
  changePassword,
  forgotPassword,
  reset,
  signOut,
} = require("../controllers/auth.controllers");
const authorization = require("../middlewares/authorization");

const router = express.Router(); 

router.post("/signUp", signUp);
router.post("/validEmail/:emailToken", validEmail);
router.post("/signIn", signIn);
router.post("/refresh", refresh);
router.put("/changePassword", authorization, changePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/reset", reset);
router.post("/signOut", authorization, signOut);

module.exports = router;
