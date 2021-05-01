const mongodb = require("../database/postagens");
const formidable = require("formidable");

function NewPostController() {}

NewPostController.prototype = {
  newpost: function (req, res) {
    res.render("newpost", {});
  },

  postagem: function (req, res) {
    const formulario = new formidable({ multiples: true });

    formulario.on("fileBegin", function (name, file) {
      let complemento = __dirname + "/../public/images/upload/";

      file.path = complemento + file.name;
    });

    formulario.parse(req, (erro, fields, files) => {
      if (erro) {
        next(erro);

        res.status(500);

        res.end();

        return;
      }

      mongodb.salve({
        conteudo: fields.texto,
        titulo: fields.titulo,
        imagem: "/images/upload/" + files.imagem.name,
        data: new Date(fields.data).toLocaleDateString(),
        tipo: parseInt(fields.tipo),
      });

      res.status(200);
      res.end();
    });
  }
};

module.exports = new NewPostController();
