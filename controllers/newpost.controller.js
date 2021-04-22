const mongodb = require("../database/postagens");
const formidable = require("formidable");

mongodb.initialize();

module.exports.newpost = function (req, res) {
  res.render("newpost", {});
};

module.exports.postagem = function (req, res) {
  const formulario = new formidable({ multiples: true });

  formulario.on("fileBegin", function (name, file) {
    file.path = __dirname + "/../public/images/" + file.name;
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
      imagem: "/static/images/" + files.imagem.name,
      data: fields.data,
      tipo: parseInt(fields.tipo)
    });

    res.status(200);
    res.end();
  });
};
