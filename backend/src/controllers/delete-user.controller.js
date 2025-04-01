const User = require("../models/user.model");
const Note = require("../models/note.model");
const { validatePassword } = require("../utils/validate-credentials.util");

const deleteUserController = async (req, res) => {
  const { password } = req.body;
  const userId = req.userId;

  // check if password is valid
  const passValid = validatePassword(password || "");
  if (!passValid.isValid) return res.status(400).json({ message: passValid.message });

  // check if password matches
  const foundUser = await User.findById(userId);
  const passMatch = await foundUser.doesPasswordMatch(password);
  if (!passMatch) return res.status(400).json({ message: "Password does not match." });

  // delete notes by user & delete user 
  await Note.deleteMany({ author: userId });
  await User.findByIdAndDelete(userId);
  res.clearCookie("refreshToken");
  res.sendStatus(204);
};


module.exports = { deleteUser: deleteUserController };