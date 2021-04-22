define(function (require) {
  var materialize = require("materialize");
  var jquery = require("jquery");
  
  function Index() {
    this.container = jquery(".body > .container");
    this.dropDown = jquery(".dropdown-trigger");
    this.linkArtigos = jquery(".header__link:eq(0)");
    this.linkCursos = jquery(".header__link:eq(1)");
  }

  Index.prototype = {
    inicialize: function () {
      this.preparaComponentes();
      this.associeEventos();
    },

    preparaComponentes: function () {
      this.dropDown.dropdown({ coverTrigger: false });
      this._obtenhaArtigos();
    },

    associeEventos: function () {
      var _this = this;
      this.linkArtigos.click(function () {
        _this._obtenhaArtigos();
      });
    },

    _gereGuid: function () {
      var data = new Date().getTime();

      var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (valor) {
          var random = (data + Math.random() * 16) % 16 | 0;

          data = Math.floor(data / 16);

          return (valor == "x" ? random : (random & 0x3) | 0x8).toString(16);
        }
      );

      return guid;
    },

    _obtenhaURL: function (complemento) {
      return window.location.origin + "/" + complemento;
    },

    _obtenhaArtigos: function () {
      var _this = this;

      jquery.ajax({
        url: _this._obtenhaURL("artigos"),
        method: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
          _this._monteArtigosNaTela(data);
        },
        error: function () {
          console.error("Ocorreu um falha na busca dos artigos.");
        },
      });
    },

    _monteArtigosNaTela: function (artigos) {
      var contadorAuxiliar = 1;
      this.container.empty();
      var guid = "";
      var coluna = `<div class="col l4 m6 s12">
                      <div class="card hoverable">
                        <div class="card-image">
                          <img src="{0}">
                        </div>
                        <div class="card-content">
                          <div class="card__descricao">
                            {1}
                          </div>
                          <div class="card__informacao">
                            {2}
                          </div>
                        </div>
                      </div>
                    </div>`;

      for (var indice = 0; indice <= artigos.length; indice++) {
        if (contadorAuxiliar == 1) {
          var linha = '<div id="{0}" class="row"></div>';
          this.guid = this._gereGuid();
          this.container.append(linha.replace("{0}", this.guid));
        }

        if (contadorAuxiliar <= 3) {
          var colunaTemp = coluna
            .replace("{0}", artigos[indice]["Imagem"])
            .replace("{1}", artigos[indice]["Titulo"])
            .replace("{2}", artigos[indice]["Publicacao"]);

          jquery("#" + this.guid).append(colunaTemp);
        } else {
          contadorAuxiliar = 1;
        }

        contadorAuxiliar += 1;
      }
    },
  };

  return new Index();
});
