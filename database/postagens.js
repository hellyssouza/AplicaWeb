let mongoose = require("mongoose");

function MongoDb(mongoDriver) {
  this.mogoose = mongoDriver;
  this.schema = undefined;
}

MongoDb.prototype = {
  initialize: function () {
    this.conecte();
  },

  conecte: function () {
    this.mogoose
      .connect("mongodb://localhost/aplicaweb", { useNewUrlParser: true })
      .then(() => console.log("Sucesso na conexão com o banco de dados."))
      .catch((error) =>
        console.log("Erro na conexão com o banco de dados: " + error)
      );

    this.schema = new mongoose.Schema({
      conteudo: String,
      titulo: String,
      imagem: String,
      data: String,
      tipo: Number,
    });
  },

  salve: function (postagem) {
    let modelo = mongoose.model("Postagem", this.schema);
    let novoDado = new modelo(postagem);

    novoDado
      .save()
      .then((document) => {
        console.log(document);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = new MongoDb(mongoose);
