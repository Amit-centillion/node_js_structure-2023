const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    password: {
      type: String,
    },
    // role: {
    //   type: Schema.Types.ObjectId,
    // },
    otp: {
      type: Number,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
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

userSchema.plugin(paginate);
module.exports = mongoose.model("user", userSchema);
