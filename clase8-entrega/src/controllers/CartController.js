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
                } catch(error){
                    console.log('Error al listar: ', error);
                    return([]);
                }
            };

            async getCartProducts(cid){ 
                try { 
                    const getCarts     = await this.listCarts();
                    const cartById  = getCarts.find((x)=> x.id == cid);
                    
                    if(cartById){
                        return cartById
                    } else {
                        return {error: `El carrito ID: ${cid}, no existe.`}
                    }

                    } catch(error){
                        console.log();
                        return({error:'Error al obtener productos del carrito', ERR: error});
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
                return newId  }   catch(error)   {
                    return(error);
                }
            };

            async addProductToCart(id,pid) {
                try{const getCarts = await this.listCarts();
                    let cartById = getCarts.find((x)=> x.id == id);

                    if (cartById){
                    getCarts.map(async cart => {
                        if(cart.id == cartById.id){
                            let prodById = cart.products.find((x)=> x.pid == pid);
                            console.log(' Objeto: ',prodById)
                            if (prodById){
                                console.log('Ingresa OK porque existe el producto en el carro')
                                cart.products.map(async prod => {
                                    if(prod.pid == pid){
                                        prod.quantity += 1
                                    }
                                })
                            } else {let newProd = {pid: pid, quantity: 1}
                                    cart.products.push(newProd);
                            }
                         }            
                    })
                        await fs.promises.writeFile(this.fPath, JSON.stringify(getCarts));
                        console.log('Info carros :',getCarts);
                        return getCarts;
                    } else {return {error:'El carrito de compras no existe'}}
            }   catch(error)    {console.log("ERR: ", error)};
        };        

    };


      


//     try{

//         const obtenerCarritos = await this.listarCarritos();
//         let carritoPorId = obtenerCarritos.find( x => x.id == id);
        
//         obtenerCarritos.map(async cart => {
//             if(cart.id == carritoPorId.id){
//                 cart.productos.push(productos);
//                 await fs.writeFile(this.archivoRuta, JSON.stringify(obtenerCarritos));
//             } else {
                
//                 return 'El carrito no existe'
//             }
//         }) 

//     }       catch(error)    {console.log(error)};

// };




    // async updateProduct(id, product){
    //     try {let prods       = await this.getProducts();
    //          let prod        = prods.find((x)=> x.id === id);
    //          let prodsFilter = prods.filter((x) => x.id != id);
    //          console.log(prods)
    //             if (!prod){
    //                 return {Error: 'Producto no encontrado'};
    //             } else {
                   
    //                 const {code, title, description, price, thumbnail, stock} = product;
    //                 (code)          ? prod.code         = code            : null;
    //                 (title)         ? prod.title        = title           : null;
    //                 (description)   ? prod.description  = description     : null;
    //                 (price)         ? prod.price        = price           : null;
    //                 (thumbnail)     ? prod.thumbnail    = thumbnail       : null;
    //                 (stock)         ? prod.stock        = stock           : null;

    //                 const objetoActualizado = {...prod,id: id};
    //                 prodsFilter.push(objetoActualizado);
    //                 await fs.promises.writeFile(this.fPath, JSON.stringify(prodsFilter));
                    
    //                 return { UPDATE : `producto id: ${id} actualizado correctamente` }}

    //             } catch(error) {  console.log(error)  }
   // };





//    async addProductToCart(id,pid) {
//     try{const getCarts = await this.listCarts();
//         let cartById = getCarts.find((x)=> x.id == id);
//         getCarts.map(async cart => {
//             if(cart.id == cartById.id){
                
//                 //let prod        = cartById.products.find((x)=> x.pid === pid);
//                 if (prod) {
//                     //let prodsFilter = cartById.products.filter((x) => x.pid != pid);

//                     prod.quantity += 1
//                     //console.log (" PROD FILT: ", prodsFilter, " PROD: ", prod)
//                     } else {
//                     let newProduct  =  {pid: pid, quantity: 1}    
//                     cart.products.push(newProduct);
//                     console.log ("CART : ",cart);
//                 }
//                     await fs.promises.writeFile(this.fPath, JSON.stringify(getCarts));
//                     } else {return 'El carrito de compras no existe'
//                 }
//            })
//         }   catch(error)    {console.log("ERR: ", error)};
// };


                     //let prod        = cartById.products.find((x)=> x.pid === pid);
                     //if (prod) {
                        //let prodsFilter = cartById.products.filter((x) => x.pid != pid);

                       // prod.quantity += 1
                        //console.log (" PROD FILT: ", prodsFilter, " PROD: ", prod)
                        //} else {
                        //let newProduct  =  {pid: pid, quantity: 1}    
                        //cart.products.push(newProduct);
                        //console.log ("CART : ",cart);
                   // }
                     //   await fs.promises.writeFile(this.fPath, JSON.stringify(getCarts));
                       // } else {return 'El carrito de compras no existe'
                   // }
            //   })
          //  }   catch(error)    {console.log("ERR: ", error)};
  //  };
//}