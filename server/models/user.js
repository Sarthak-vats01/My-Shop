import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String },
  password: { type: String },
});

userSchema.plugin(passportLocalMongoose);
const userModel = mongoose.model("User", userSchema);

export default userModel;
