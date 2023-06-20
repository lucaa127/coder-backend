import { Router } from 'express';
import userService from '../services/user.service.js';

const usersRouter = Router();


usersRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const newUser = await userService.addUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

usersRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
        try {
            const user = await userService.getUser(email);
            if (!user) throw new Error('Invalid data');
            if (user.password !== password) throw new Error('Invalid data');

            req.session.user = user;
            res.redirect('/');
        } catch (error) {
    		res.status(400).json({ error: error.message });
	}
});

usersRouter.post('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});





// -- ====  GESTION USUARIOS - MONGOOSE TEST ====== -- //


// usersRouter.get('/', async (req, res) => {
// 	try {
// 		const users = await userService.getAll();
// 		res.send(users);
// 	} catch (err) {
// 		res.status(500).send({ err });
// 	}
// });

// usersRouter.post('/', async (req, res) => {
// 	try {
// 		const user = await userService.addUser(req.body);
// 		res.status(201).send(user);
// 	} catch (err) {
// 		res.status(500).send({ err });
// 	}
// });

usersRouter.put('/:uid', async (req, res) => {
	const uid = req.params.uid;
	try {
		const user = await userService.updateUser(uid, req.body);
		res.status(201).send(user);
	} catch (err) {
		res.status(500).send({ err });
	}
});

usersRouter.delete('/:uid', async (req, res) => {
	const uid = req.params.uid;
	try {
		await userService.deleteUser(uid);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default usersRouter;