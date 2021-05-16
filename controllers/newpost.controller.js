const validador = require("../validations/validador.postagem");
const mongodb = require("../database/postagens");
const formidable = require("formidable");

function NewPostController() {}

NewPostController.prototype = {
  newpost: function (req, res) {
    res.render("newpost", {});
  },

  novo: function (req, res) {
    const formulario = new formidable({ multiples: true });

    formulario.on("fileBegin", function (name, file) {
      if (file.size > 0 || file.name !== "") {
        let complemento = __dirname + "/../public/images/upload/";

        file.path = complemento + file.name;
      }
    });

    formulario.parse(req, (erro, fields, files) => {
      if (erro) {
        next(erro);
        res.status(500);
        res.end();
        return;
      }

      var errors = validador.valide(fields, files);

      if (errors.length == 0) {
        mongodb.salve({
          conteudo: fields.texto,
          titulo: fields.titulo,
          imagem: "/images/upload/" + files.imagem.name,
          data: new Date(fields.data).toLocaleDateString(),
          tipo: parseInt(fields.tipo),
        });

        res.json({ sucesso: true, errors: [] });
        res.end();
      } else {
        res.json({ sucesso: false, errors: errors });
        res.end();
      }
    });
  },
};

module.exports = new NewPostController();
