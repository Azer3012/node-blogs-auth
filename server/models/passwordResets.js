const mongoose = require("mongoose");

const PasswordResetSchema = mongoose.Schema(
  {
    user: {
      type: "ObjectId",
      ref: "users",
    },
    resetToken: String,
    expired: {
      type: Boolean,
      default: () => false,
    },
  },
  {
    timestamps: true,
  }
);

const PasswordResetModel = mongoose.model(
  "passwordsResets",
  PasswordResetSchema
);

module.exports = PasswordResetModel;
