//let archivo='chat.txt';
//const fs=require ('fs');
const options = require('../config/mensajes');
const knex = require('knex')(options);

class Chat {
    constructor() {
        // incializar variables

    }

     read(){
      //console.log('read');
     //const contenido = fs.readFileSync(this.archivo, 'utf-8');
     try{
       const contenido=  knex.from('mensajes').select('author','email','text','datetime');
       console.log(contenido);
       //Envio objeto
       return contenido;
     } catch(error) {
       throw error;
     }
   }

   save(objeto){
     console.log('save');

     let item={
       author:objeto.author,
       text:objeto.text,
       email:objeto.email,
       datetime:(new Date(Date.now())).toLocaleString()
     }
     knex('mensajes').insert(item);
      //fs.writeFileSync(archivo,JSON.stringify(contenido,null,'\t'));

     return item;
   }


}

module.exports = new Chat();
