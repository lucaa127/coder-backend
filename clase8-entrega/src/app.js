import  express 		from 'express';
import  productRouter	from './routers/product.router.js';
import  cartRouter		from './routers/cart.router.js';


//const archivo = new ProductManager('./file.txt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);



const PORT = 8080;
const server = app.listen(PORT, ()=>{
 console.log(`Escuchando en puerto: ${PORT}`);
});





// app.get('/products', async (req, res) => {
//     try {
//         let limit = parseInt(req.query.limit);
//         if (!limit || (isNaN(limit))) {
//             let products = await archivo.getProducts();
//             res.send(products); 
//         } else {
//             let products = await archivo.getProducts();
//             res.send(products.slice(0,limit));
//         }
//     } catch (error) {
//         console.log(error)
//         res.send(error);
//     }
// });

// app.get('/products/:pid', async (req, res) => {
//     try {
//         const { pid } = req.params;
//         let prod = await archivo.getProductById(pid);
//         res.send(prod);
//     } catch (error) {
//         console.log(error)
//         res.send(error);
//     };
// });