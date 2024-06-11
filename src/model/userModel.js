const { mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.models.user || mongoose.model("user", userSchema);
