//let archivo='productos.txt';
//const fs=require ('fs');
const options = require('../config/productos');
const knex = require('knex')(options);

class Productos {
    constructor() {
        // incializar variables
        this.listaProductos=[{}];

    }

     read(){
      //console.log('read');
     //const contenido = fs.readFileSync(this.archivo, 'utf-8');
     //this.listaProductos=JSON.parse(contenido);
     const contenido=  knex.from('productos').select('id','title','price','thumbnail');
     console.log(contenido);
     //console.log(JSON.parse(contenido));
     //Envio objeto
     return contenido;
   }

   save(objeto){
     console.log('save');

     //productos.push(item);
      //fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
      knex('productos').insert(objeto);
      let item = knex.from('productos').select('*').where({title:objeto.title});
     return item;
   }

   update(id,objeto){

     let item={
       title:objeto.title,
       price:objeto.price,
       thumbnail:objeto.thumbnail
     }

     knex.from('productos').where({id:id}).update(item);
     //fs.writeFileSync(archivo,JSON.stringify(productos,null,'\t'));
    return item;

   }

   delete(id){

       let item = knex.from('productos').select('*').where({id:id});
        knex.from('productos').where({id:id}).del();
      return item;

        }

}

module.exports = new Productos();
