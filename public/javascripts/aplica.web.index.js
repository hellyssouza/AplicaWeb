define(["require", "jquery", "materialize", "menu"], function (
  require,
  jquery,
  materialize,
  menu
) {
  function AplicaWebIndex() {
    this.inicialize();
  }

  AplicaWebIndex.prototype = {
    inicialize: function () {
      this.divBotaoBuscarMais = jquery(".controle-de-busca");
      this.botaoBuscarMais = jquery(".buscarMais");

      this.preparaComponente();
      this.associeEventos();
    },

    preparaComponente: function () {
      var _this = this;

      var callback = function () {
        if ($(".card").length == 6) {
          _this.divBotaoBuscarMais.show();
        } else {
          _this.divBotaoBuscarMais.hide();
        }
      };

      menu.definaCallBackClickLinks(callback);
      menu.obtenhaPostagem(1, callback);
    },

    associeEventos: function () {
      this.botaoBuscarMais.click(function () {
        var tipoDePostagem = menu.obtenhaTipoDePostagemNoContexto();
        var quantidade = $(".card").length;

        menu.obtenhaProximasPaginas(tipoDePostagem, quantidade);
      });
    },

    _obtenhaURL: function (complemento) {
      return window.location.origin + "/" + complemento;
    },
  };

  return new AplicaWebIndex();
});
