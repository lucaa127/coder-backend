import { userModel } from '../models/user.model.js';

class UserService {
	constructor() {
		this.model = userModel;
	}

    async getUser(email) {
		return await this.model.findOne({ email: email });
	}
    
	async getAll() {
		return await this.model.find();
	}

	async addUser(user) {
		if (!user.email) {
			throw new Error('Missing required fields');
		}
		return await this.model.create(user);
	}

	async updateUser(uid, user) {
		if (!uid) {
			throw new Error('Missing required fields');
		}
		return await this.model.updateOne({ email: uid }, user);
	}

	async deleteUser(uid) {
		return this.model.deleteOne({ email: uid });
	}
}

const userService = new UserService();

export default userService;