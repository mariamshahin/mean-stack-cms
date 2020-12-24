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
  role: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  summary: {
    type: String,
  },
  //   image: {
  //     type: String,
  //     required: true,
  //   },
  
});

export default mongoose.model("User", userSchema);
