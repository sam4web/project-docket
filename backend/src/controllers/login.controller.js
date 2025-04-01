const { validateEmail, validatePassword } = require("../utils/validate-credentials.util");
const User = require("../models/user.model");

// @route /auth/login
// @method POST
const loginController = async (req, res) => {
  let { email, password } = req.body;
  email = email?.trim();

  // check for credentials validation
  const emailValid = validateEmail(email || "");
  const passValid = validatePassword(password || "");
  if (!emailValid.isValid) return res.status(400).json({ message: emailValid.message });
  if (!passValid.isValid) return res.status(400).json({ message: passValid.message });

  try {
    // check if user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(400).json({ message: "User with this email does not exists." });

    // check if password matches
    const passMatch = await foundUser.doesPasswordMatch(password);
    if (!passMatch) return res.status(400).json({ message: "Password does not match." });

    // generate new access and refresh token
    const accessToken = await foundUser.generateAccessToken();
    const refreshToken = await foundUser.generateRefreshToken();

    // add refresh token on response cookie
    res.cookie("refreshToken", refreshToken,
      {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
        secure: process.env.NODE_ENV !== "development",
      });

    return res.status(200).json(accessToken);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = { login: loginController };