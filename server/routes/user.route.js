const express = require("express");
const authorization = require("../middlewares/authorization");
const { updateUser } = require("../controllers/user.controllers");

const router = express.Router();

router.use(authorization);
router.put("/updateUser", updateUser);
router.get("/getUser/:userId")

module.exports = router;
