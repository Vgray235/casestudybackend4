// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true, trim: true },
//   password: { type: String, required: true }
// }, { timestamps: true });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.checkPassword = function (plain) {
//   return bcrypt.compare(plain, this.password);
// };

// export default mongoose.model("User", userSchema);

// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
