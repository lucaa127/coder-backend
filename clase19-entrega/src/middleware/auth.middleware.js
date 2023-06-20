export function isAuth(req, res, next) {
	if (req.session.user) {
		console.log('ingresa isAuth')
		next();
	} else {
		console.log('ingresa isAuth 2')
		res.redirect('/login');
	}
}

export function isGuest(req, res, next) {
	if (!req.session.user) {
		next();
	} else {
		res.redirect('/');
	}
}