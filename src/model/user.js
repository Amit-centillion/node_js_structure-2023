import { Schema, model } from "mongoose";

const UserShcema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new model("user", UserShcema);
