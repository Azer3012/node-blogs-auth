import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: "ObjectId",
      ref: "users",
    },
    blog: {
      type: "ObjectId",
      ref: "blogs",
    },
    body: String,
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("blogs", CommentSchema);
export default CommentModel;
