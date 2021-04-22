module.exports.artigos = function (req, res, next) {
  res.json([
    {
      Id: "1",
      Titulo: "Introdução ao Angular JS",
      Imagem: "/static/images/angular.jpg",
      Publicacao: "20/03/2021",
    },
    {
      Id: "2",
      Titulo: "Introdução ao React",
      Imagem: "/static/images/react.jpg",
      Publicacao: "20/03/2021",
    },
    {
      Id: "3",
      Titulo: "Introdução ao Node",
      Imagem: "/static/images/node.png",
      Publicacao: "20/03/2021",
    },
  ]);
};
