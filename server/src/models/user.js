import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  //   photo: {
  //     type: String,
  //     required: true,
  //   },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("User", userSchema);
