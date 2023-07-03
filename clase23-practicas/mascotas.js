import express from 'express';
const app = express();

const pets = [
{tipo: 'perro',
nombre:'armin'},
{tipo:'gate',
nombre:'gato',
},];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.param('pet', (req, res, next, pet) => {
	const index = pets.findIndex((p) => p.nombre === pet);

	// if (index < 0) {
	// 	return res.sendStatus(404)({ error: 'Pet not found' });
	// }

	req.petIndex = index;

	next();
});

// app.get('/:pet([a-zA-Z ]+)', (req, res) => {
// 	res.send(pets[req.petIndex]);
// });

app.get('/api/pets/:pet([a-zA-Z ]+)', (req, res) => {
    if(req.petIndex < 0 ){
            console.log('pisa aca')
        	res.status(401).send({ error: 'Pet not found' });
        } else {
            res.send(pets[req.petIndex]);
        }
	
});


app.get('*', (req, res) => {
	res.status(404).send({
		error: 'Ruta no encontrada o parametro invalido',
	});
});

const port = 3000;
app.listen(port,()=>{
    console.log(`escuchando puerto: ${port}`)}
);

