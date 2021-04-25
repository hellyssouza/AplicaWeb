let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

function MongoDb(mongoDriver) {
  this.mogoose = mongoDriver;
  this.schema = undefined;
  this.initialize();
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

    mongoose.model("postagens", this.schema);
  },

  salve: function (postagem) {
    let modelo = mongoose.model("postagens");

    let novaPostagem = new modelo(postagem);

    novaPostagem
      .save()
      .then((document) => {
        console.log(document);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  obtenha: async function () {
    let modelo = mongoose.model("postagens");

    return await modelo.find();
  },

  obtenhaPorId: function(id){
    let modelo = mongoose.model("postagens");

    return modelo.findById(id);
  }
};

module.exports = new MongoDb(mongoose);
