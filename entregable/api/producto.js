//Knex
const options = require("../config/productos");
const knex = require("knex")(options);


class Productos {
  constructor() {
    // incializar variables
    }

  read() {
    console.log("read");
     async() => {
      try {
        let productos = await knex.from("productos").select("*");
        return productos;
      } catch (error) {
        throw error;
      } finally {
        console.log("cerrando conexion...");
        knex.destroy();
      }
    };
    
  }

  save(objeto) {
    console.log("save");
    const productos = this.read();

    let id = productos[productos.length].id + 1;
    let item = {
      title: objeto.title,
      price: objeto.price,
      thumbnail: objeto.thumbnail,
      id: id,
    };
    async () => {
      try {
        await knex("productos").insert(item);
        return item;
      } catch (error) {
        throw error;
      } finally {
        console.log("cerrando conexion...");
        knex.destroy();
      }
    };
  }

  update(id, objeto) {
    async () => {
      try {
        await knex
          .from("productos")
          .where("id", id)
          .update(objeto);
        return objeto;
      } catch (error) {
        throw error;
      } finally {
        console.log("cerrando conexion...");
        knex.destroy();
      }
    };
  }

  delete(id) {
    async ()=>{
      try {
        const item = await knex.from('productos').select('*').where('id', '=', id);
        
        return item.then( async ()=>{
          await knex.from('productos').where('id', '=', id).del();
        });
      }catch (error) {
        throw error;
      } finally {
        console.log("cerrando conexion...");
        knex.destroy();
      }     

    }   
    
  }
}

module.exports = new Productos();
