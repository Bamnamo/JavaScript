import * as mongoose from "mongoose";

const {Schema} = mongoose;

const PostSchmea = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model('Post', PostSchmea);
export default Post;