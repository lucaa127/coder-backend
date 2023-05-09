import express from 'express'
import handlebars from 'express-handlebars';


const app = express();


app.get('/', (req, res) => {
	res.send({ test: 'Test de server' });
});

app.listen(8080, () => {
	console.log('escucho el 8080');
});