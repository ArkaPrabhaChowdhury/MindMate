import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  condition: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  chat_history: [chatSchema], // Array of chat objects
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
