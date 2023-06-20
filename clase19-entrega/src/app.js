import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import usersRouter from './routers/users.router.js';
import viewsRouter from './routers/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', '../views/');
app.set('view engine', 'handlebars');

app.use(cookieParser('B2zdY3B$pHmxW%'));

// Session
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
			'mongodb+srv://lucaa127:coder@cluster0.fwsqm1h.mongodb.net/?retryWrites=true&w=majority',
			mongoOptions: {
				useNewUrlParser: true,
			},
			ttl: 6000,
		}),
		secret: 'B2zdY3B$pHmxW%',
		resave: true,
		saveUninitialized: true,
	})
);

mongoose.connect(
	'mongodb+srv://lucaa127:coder@cluster0.fwsqm1h.mongodb.net/?retryWrites=true&w=majority'
);


app.use('/', viewsRouter);
app.use('/api/users', usersRouter);


app.listen(8080, () => {
	console.log('escucho el 8080');
});