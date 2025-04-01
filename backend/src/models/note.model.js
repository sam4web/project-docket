const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#8d99ae",
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: true,
});


module.exports = mongoose.model("Note", noteSchema);