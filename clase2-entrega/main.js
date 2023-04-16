

class ProductManager {
    constructor(){
        this.products = [];
    }

// add product
         addProduct(prod){
            try     {   
                        if((prod.title === undefined        || prod.title === '')
                        || (prod.description === undefined  || prod.description === '') 
                        || (prod.price === undefined        || prod.price === '' )
                        || (prod.thumbnail === undefined    || prod.thumbnail === '' )
                        || (prod.stock === undefined        || prod.stock === '') ){
                            console.log({error:'Faltan campos obligatorios'})
                            return
                        }

                        let newId = 0;
                        const obj =  this.getProducts();
                        
                        if (this.products.length == 0) {
                            newId = 1;
                        } else { 
                            const prodIds = obj.map( x => {return  parseInt(x.code) } );
                            let maxId = Math.max(...prodIds);
                            newId = maxId + 1;
                     };

                    let nuevoProducto = {...prod, code: newId}
                    this.products.push(nuevoProducto);
                    
                    return nuevoProducto;

            } catch(error) {    console.log(error);    };
        };

//get all productos

     getProducts(){
            try{
                if (this.products.length == 0) {
                    return 'Not found';
                } else { 
                    return this.products;
                };
            } catch(error) { console.log(error)}
        };

//gey product by ID 
         getProductById(id){
            try {
                    let product = this.products.find((x)=> x.code == id);
                        if (product == undefined){
                            return {Error: 'Not found'};
                        } else { 
                            return product;
                        }

            }   catch(error)    { console.log(error)}
        };
    };






let newProduct = new ProductManager();

let prod1 = {title: "Product 1", description:"Prod 1 description", price: 1999.9, thumbnail: "Prod1_img_url.png", stock: 10};
let prod2 = {title: "Product 2", description:"Prod 2 description", price: 299.5, thumbnail: "Prod2_img_url.png", stock: 20};
let prod3 = {title: "Product 3", description:"", price: 22, thumbnail: "Prod2_img_url.png", stock: 20};


newProduct.addProduct(prod1)
newProduct.addProduct(prod2)
newProduct.addProduct(prod3)

console.log(newProduct.getProducts());
console.log(newProduct.getProductById(2));





