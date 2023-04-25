const fs = require('fs/promises');

class ProductManager {
    constructor(filePath){
        this.fPath = filePath;
    }
    async addProduct(prod){
        try{    const objetos = await this.getProducts();
                let newId = 0;
                    if (objetos.length == 0){
                        newId = 1;
                    } else {
                        let valorIds = objetos.map( ids => { return parseInt(ids.id) } );
                        let maxID = Math.max(...valorIds)
                        newId = maxID + 1;
                    };
                const objetoNuevo = {...prod,id: newId};
                objetos.push(objetoNuevo);
                await fs.writeFile(this.fPath, JSON.stringify(objetos));
            } catch(error) {
                console.log('Error al guardar');
                }
        }; 
    async getProducts(){
        try { 
            const obj = await fs.readFile(this.fPath,'UTF-8');
            return JSON.parse(obj);
            }
          catch(error){
            return([]);
          }
    };

    async getProductById(id){
        try {let obj = await this.getProducts();
             obj = obj.find(x => x.id == id)
             if (obj === undefined){
                return `No se pudo encontrar el producto ID: ${id}`;
                } else {
             return obj;}
        }   catch(error)  { return 'Error al buscar producto por ID'}
    };

    async updateProduct(id, product){
        try {let prods = await this.getProducts();
            let prod = prods.find((x)=> x.id == id);
                if (prod == undefined){
                    return {Error: 'Producto no encontrado'};
                } else { 
                    const {code, title, description, price, thumbnail, stock} = product;
                    prod.code           = code;
                    prod.title          = title;
                    prod.description    = description;
                    prod.price          = price;
                    prod.thumbnail      = thumbnail;
                    prod.stock          = stock;

                    await this.deleteById(id);
                    await this.addProduct({...prod, id:id})


                    return { UPDATE : `producto id: ${id} actualizado correctamente` }}
                
                } catch(error) {  console.log(error)  }
    };

    async deleteById(id){
        try{
            let objetos = await this.getProducts();
            const objToDelete = objetos.findIndex(x => x.id == id);
                if (objToDelete !== -1){
                   objetos = objetos.filter(x => x.id !== id);
                   await fs.writeFile(this.fPath,JSON.stringify(objetos));
                   console.log (`El producto id:${id}, fue eliminado.`)
            } else {
                   console.log (`El producto id:${id}, no existe.`)
            }
        } catch(error) {
            console.log ('Error al eliminar por ID')
        }
    };
}


//FOR TEST

const archivo = new ProductManager('./file.txt');
    
async function ejecutar(){
    try {
        //save
        let producto1 = {code:"PROD01", title: "Product 1", description:"Prod 1 description", price: 1999.9, thumbnail: "Prod1_img_url.png", stock: 10};
        let producto2 = {code:"PROD02", title: "Producto 2", description:"Prod 2 description",price: 1800, thumbnail: "url del segundo producto", stock: 10}
        
        let producto3 = {code:"PROD00", title: "Producto upd", description:"Prod UPD description",price: 800, thumbnail: "url del prod actualizado", stock: 210}
        // await archivo.addProduct(producto1);
        // await archivo.addProduct(producto2);

        //get by id    

        //console.log(await archivo.getProductById(3));

        //get All
            //console.log(await archivo.getProducts());

        //upd 
       //console.log(await archivo.updateProduct(2,producto3));    
       console.log(await archivo.getProductById(2));

        //delete by id 
           //await archivo.deleteById(3);    

        //delete all
            //console.log (await archivo.deleteAll()); 
        }   catch(error)  { console.log('error') };

};


ejecutar();