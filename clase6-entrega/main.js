import fs from 'fs';

export default class ProductManager {
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
                await fs.promises.writeFile(this.fPath, JSON.stringify(objetos));
            } catch(error) {
                console.log('Error al guardar');
                }
        }; 
    async getProducts(){
        try { 
            const obj = await fs.promises.readFile(this.fPath,'UTF-8');
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
        try {let prods       = await this.getProducts();
             let prod        = prods.find((x)=> x.id === id);
             let prodsFilter = prods.filter((x) => x.id != id);
             console.log(prods)
                if (!prod){
                    return {Error: 'Producto no encontrado'};
                } else {
                   
                    const {code, title, description, price, thumbnail, stock} = product;
                    (code)          ? prod.code         = code            : null;
                    (title)         ? prod.title        = title           : null;
                    (description)   ? prod.description  = description     : null;
                    (price)         ? prod.price        = price           : null;
                    (thumbnail)     ? prod.thumbnail    = thumbnail       : null;
                    (stock)         ? prod.stock        = stock           : null;

                    const objetoActualizado = {...prod,id: id};
                    prodsFilter.push(objetoActualizado);
                    await fs.promises.writeFile(this.fPath, JSON.stringify(prodsFilter));
                    
                    return { UPDATE : `producto id: ${id} actualizado correctamente` }}

                } catch(error) {  console.log(error)  }
    };

    async deleteById(id){
        try{
            let objetos = await this.getProducts();
            const objToDelete = objetos.findIndex(x => x.id == id);
                if (objToDelete !== -1){
                   objetos = objetos.filter(x => x.id !== id);
                   await fs.promises.writeFile(this.fPath,JSON.stringify(objetos));
                   console.log (`El producto id:${id}, fue eliminado.`)
            } else {
                   console.log (`El producto id:${id}, no existe.`)
            }
        } catch(error) {
            console.log ('Error al eliminar por ID')
        }
    };
};

//FOR TEST
//const archivo = new ProductManager('./file.txt');
    
async function ejecutar(){
    try {
        //save
        let producto1 = {code:"PROD01", title: "Product 1", description:"Prod 1 description", price: 1999.9, thumbnail: "Prod1_img_url.png", stock: 10};
        let producto2 = {code:"PROD02", title: "Producto 2", description:"Prod 2 description",price: 1800, thumbnail: "url del segundo producto", stock: 10} 
        let producto3 = {code:"PROD00",  description:"Updated Prod description",price: 800, thumbnail: "url del prod actualizado", stock: 210}
        let producto4 = {code:"PROD04",  description:"Prod 4 description",price: 200, thumbnail: "url del producto 4", stock: 20}
        
        //await archivo.addProduct(producto1);
        //await archivo.addProduct(producto2);
        //await archivo.addProduct(producto4);

         //get by id    

            //console.log(await archivo.getProductById(3));

        //get All
            //console.log(await archivo.getProducts());

        //upd 
            //console.log(await archivo.updateProduct(1,producto3));    
            //console.log(await archivo.getProductById(2));

        //delete by id 
           //await archivo.deleteById(3);    

        }   catch(error)  { console.log('error') };

};


//ejecutar();