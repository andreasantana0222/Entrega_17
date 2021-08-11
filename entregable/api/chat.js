//Knex
const options = require("../config/mensajes");
const knex = require("knex")(options);

class Chat {
  constructor() {
    // incializar variables
  }

  read() {
    console.log("read");
    async () => {
      try {
        let mensajes = await knex.from("mensajes").select("*");
        return mensajes;
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

    const mensajes = this.read();

    let id = mensajes[mensajes.length].id + 1;

    let item = {
      author: objeto.author,
      text: objeto.text,
      email: objeto.email,
      datetime: new Date(Date.now()).toLocaleString(),
    };

    async () => {
      try {
        await knex("mensajes").insert(item);
        return item;
      } catch (error) {
        throw error;
      } finally {
        console.log("cerrando conexion...");
        knex.destroy();
      }
    };
  }
}

module.exports = new Chat();
