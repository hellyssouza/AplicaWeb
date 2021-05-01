const mongodb = require("../database/postagens");

function PostagensController() {}

PostagensController.prototype = {
  postagem: function (req, res) {
    let idPostagem = req.params.id;

    var objeto = mongodb
      .obtenhaPorId(idPostagem)
      .then((doc) => {
        let tipoPostagem = "";

        switch (doc.tipo) {
          case 1:
            tipoPostagem = "ARTIGO";
            break;
          case 2:
            tipoPostagem = "TUTORIAL";
            break;
          case 3:
            tipoPostagem = "CURSO";
            break;
        }

        res.render("postagem", {
          id: doc.id,
          imagem: doc.imagem,
          titulo: doc.titulo,
          tipo: tipoPostagem,
          conteudo: doc.conteudo,
        });
      })
      .catch((error) => {
        console.log(error);

        res.status(500);
        res.end();
      });
  },

  artigos: function (req, res) {
    mongodb
      .obtenha()
      .then((postagens) => {
        var documentos = postagens.map((doc) => {
          return {
            id: doc.id,
            titulo: doc.titulo,
            imagem: doc.imagem,
            tipo: doc.tipo,
            data: doc.data,
          };
        });

        res.json(documentos);
        res.end();
      })
      .catch((error) => {
        console.log(error);

        res.status(500);
        res.end();
      });
  },
};

module.exports = new PostagensController();
