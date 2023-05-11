import { Router } from 'express';
import CartController from '../controllers/CartController.js';

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get('/', async(req, res) => {
    try{const  createCart = await cartController.createCart();
        console.log(createCart)
        //res.send(createCart)
        } catch(error) {
            res.send('Working NO OK: ', error)
    };
} );


cartRouter.get('/', async(req, res) => {
    try {const   products = await prodController.getProducts();
        let   limit = parseInt(req.query.limit);
        
        if (!limit || (isNaN(limit))) {
            res.send(products); 
         } else {
            //let products = await archivo.getProducts();
            res.send(products.slice(0,limit));
        }
    } catch (error) {
        console.log(error)
        res.send(error);
    }
} );


export default cartRouter
