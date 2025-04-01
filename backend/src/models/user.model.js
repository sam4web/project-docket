const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// middleware to hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to check if the passed password is correct
userSchema.methods.doesPasswordMatch = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// method to generate access token
userSchema.methods.generateAccessToken = async function() {
  return jwt.sign(
    {
      UserInfo: {
        id: this._id,
        username: this.username,
        email: this.email,
        createdAt: this.createdAt
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30min" },
  );
};

// method to generate refresh token
userSchema.methods.generateRefreshToken = async function() {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" });
};

module.exports = mongoose.model("User", userSchema);