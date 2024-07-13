import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema<UserType>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	userName: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	imageUrl: { type: String, default: "https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png" },
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
