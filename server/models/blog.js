import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: "ObjectId",
      ref: "users",
    },
    body: String,
    comments:[{
      type:"ObjectId",
      ref:"comments"
    }],
    likes: [
      {
        type:"ObjectId",
        ref:"users"
      }
    ],
    tags:{
        type:[String],
        default:()=>[]
    }
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blogs", BlogSchema);
export default BlogModel;
