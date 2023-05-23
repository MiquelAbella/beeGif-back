const mongoose = require("mongoose");

const gifSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "No title",
  },
  url: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const GIF = mongoose.model("GIF", gifSchema);

module.exports = GIF;
