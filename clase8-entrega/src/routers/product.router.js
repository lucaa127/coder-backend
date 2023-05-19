import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const productRouter = Router();
const prodController = new ProductController();

productRouter.get('/', async(req, res) => {
    try {const   products = await prodController.getProducts();
        let   limit = parseInt(req.query.limit);
        
        if (!limit || (isNaN(limit))) {
            res.send(products); 
         } else {
            res.send(products.slice(0,limit));
        }
    } catch (error) {
        console.log(error)
        res.send(error);
    }
} );

productRouter.get ('/:id', async(req,res)=> {
    const { id } = req.params;
    const prods = await prodController.getProductById(id);
    res.json(prods);
});

productRouter.post('/', async(req,res)=> {
   try {const data = req.body;
        const addProduct = await prodController.addProduct(data);
        res.status(201).send(addProduct);
        } catch (error) {
        res.status(500).send({err: error});
   } 

})

export default productRouter;