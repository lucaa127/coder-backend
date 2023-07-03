import express from 'express';

const app = express();

const pets = [
	{
		name: 'Firulais',
		type: 'dog',
	},
	{
		name: 'Mishu',
		type: 'cat',
	},
	{
		name: 'Luna',
		type: 'cat',
	},
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.param('pet', (req, res, next, pet) => {
	const index = pets.findIndex((p) => p.name === pet);

	if (index < 0) {
		return res.status(404).send({ error: 'Pet not found' });
	}

	req.petIndex = index;

	next();
});

// Obtiene el Pet
app.get('/api/pets/:pet([a-zA-Z ]+)', (req, res) => {
	res.send(pets[req.petIndex]);
});

// Agrega Pet
app.post('/api/pets/', (req, res) => {
	const pet = req.body;
	pets.push(pet);
	res.status(201).send(pet);
});

// Adopta PET
app.put('/api/pets/:pet([a-zA-Z ]+)', (req, res) => {
	pets[req.petIndex].adopted = true;
	res.send(pets[req.petIndex]);
});

app.get('*', (req, res) => {
	res.status(404).send({
		error: 'Ruta no encontrada o parametro invalido',
	});
});

app.listen(3000, () => {
	console.log('escucho el 3000');
});