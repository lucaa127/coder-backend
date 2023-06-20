import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	img: String,
});

export const userModel = mongoose.model('users', userSchema);