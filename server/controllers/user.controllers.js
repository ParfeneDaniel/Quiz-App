const User = require("../models/user.model");

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, req.body);
    res.status(201).json({ message: "Your details were successfully updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

module.exports = { updateUser };
