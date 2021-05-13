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
      menu._obtenhaPostagem(1);
    },

    _obtenhaURL: function (complemento) {
      return window.location.origin + "/" + complemento;
    }
  };

  return new AplicaWebIndex();
});
