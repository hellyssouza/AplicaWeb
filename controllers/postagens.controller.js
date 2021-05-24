const mongodb = require("../database/postagens");

function PostagensController() {}

PostagensController.prototype = {
  postagem: function (req, res) {
    let idPostagem = req.params.id;

    mongodb
      .obtenhaPorId(idPostagem)
      .then((doc) => {
        res.render("postagem", {
          id: doc.id,
          imagem: doc.imagem,
          titulo: doc.titulo,
          conteudo: doc.conteudo,
        });
        
        res.status(200);
        res.end();
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
        res.status(200);
        res.end();
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        res.end();
      });
  },

  postagens: function(req, res) {
    var tipoPostagem = parseInt(req.params.tipo, 10);
    var limite = parseInt(req.params.limite, 10);

    mongodb
      .obtenhaPorTipo(tipoPostagem, limite)
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
        res.status(200);
        res.end();
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        res.end();
      });
  },

  postagensPagina: function(req, res){
    let tipoDePostagem = parseInt(req.params.tipo, 10);
    let pagina = parseInt(req.params.pagina, 10);

    mongodb
      .obtenhaPorPaginacao(tipoDePostagem, pagina)
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
        res.status(200);
        res.end();
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        res.end();
      });
  }
};

module.exports = new PostagensController();