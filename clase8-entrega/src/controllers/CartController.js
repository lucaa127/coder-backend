import fs from 'fs';

export default class CartController {
    constructor(){
        this.fPath = './carrito.json'
        if (!fs.existsSync(this.fPath)) {
			fs.writeFileSync(this.fPath, JSON.stringify([]));
		    };
        }

        async listCarts(){ 

            try { 
                const objetos = await fs.promises.readFile(this.fPath,'UTF-8');
                return JSON.parse(objetos);
                }
            catch(error){
                console.log(error);
                return([]);
                }
            };

        async createCart(){ 
           try {let newId = 0;
                const arrCarritos = await this.listCarts();
                if(arrCarritos.length == 0){
                    newId = 1;
                }   else   {
                    let cartIds = arrCarritos.map( x =>{ return parseInt(x.id) } );
                    let maxId = Math.max(...cartIds);
                    newId = maxId + 1;
                };
    
                const datosCarrito = {products: []};
                const nuevoObjeto = {...datosCarrito, id: newId};
    
                arrCarritos.push(nuevoObjeto);
                await fs.promises.writeFile(this.fPath, JSON.stringify(arrCarritos));
    
                return newId;
                }
            catch(error){
                return(error);
                }
            };
    };