function Validador() {
  this.erros = new Array();
}

Validador.prototype = {
  valide: function () {
    this.erros = new Array();

    if (arguments.length == 0) {
      return new Array();
    }

    if (
      typeof arguments[0].titulo == undefined ||
      arguments[0].titulo == "" ||
      arguments[0].titulo == null
    ) {
      this.erros.push("Título da postagem não foi informado.");
    }

    if (
      typeof arguments[0].texto == undefined ||
      arguments[0].texto == "" ||
      arguments[0].texto == null
    ) {
      this.erros.push("Conteúdo da postagem não foi informado.");
    }

    if(arguments[1].imagem.size == 0) {
      this.erros.push("A imagem da logo não foi informada.");
    }

    return this.erros;
  },
};

module.exports = new Validador();
