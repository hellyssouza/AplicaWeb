define(["require", "jquery", "materialize"], function (
  require,
  jquery,
  materialize
) {
  function AplicaWebMenu() {
    this.linkArtigosMobile = jquery(".dropdown__link:eq(0)");
    this.linkTutorialMobile = jquery(".dropdown__link:eq(1)");
    this.linkCursosMobile = jquery(".dropdown__link:eq(2)");
    this.container = jquery(".body > .container");
    this.linkArtigos = jquery(".header__link:eq(0)");
    this.linkTutorial = jquery(".header__link:eq(1)");
    this.linkCursos = jquery(".header__link:eq(2)");
    this.dropDown = jquery(".dropdown-trigger");
    this.callbackLinks = function () {};

    this.inicialize();
  }

  AplicaWebMenu.prototype = {
    inicialize: function () {
      this.associeEventos();
    },

    associeEventos: function () {
      this.dropDown.dropdown({ coverTrigger: false });
      var _this = this;

      this.linkArtigosMobile.click(function (event) {
        event.preventDefault();

        _this.obtenhaPostagem(1, _this.callbackLinks);
      });

      this.linkTutorialMobile.click(function (event) {
        event.preventDefault();

        _this.obtenhaPostagem(2, _this.callbackLinks);
      });

      this.linkCursosMobile.click(function (event) {
        event.preventDefault();

        _this.obtenhaPostagem(3, _this.callbackLinks);
      });

      this.linkArtigos.click(function () {
        _this.obtenhaPostagem(1, _this.callbackLinks);
      });

      this.linkTutorial.click(function () {
        _this.obtenhaPostagem(2, _this.callbackLinks);
      });

      this.linkCursos.click(function () {
        _this.obtenhaPostagem(3, _this.callbackLinks);
      });
    },

    obtenhaPostagem: function (tipoPostagem, callback) {
      var url = this._obtenhaURL(
        "postagens/" + tipoPostagem + "/" + this.obtenhaLimiteDeBusca()
      );
      var _this = this;

      _this._AjaxGet(
        url,
        "json",
        function (data) {
          _this._montePostagensNaTela(true, data);

          _this.container.data("tipo-de-postagem", tipoPostagem);

          callback();
        },
        function () {
          console.error("Ocorreu um falha na busca dos artigos.");
        }
      );
    },

    obtenhaProximasPaginas: function (tipoPostagem, pagina) {
      var url = this._obtenhaURL("paginacao/" + tipoPostagem + "/" + pagina);
      var _this = this;

      _this._AjaxGet(
        url,
        "json",
        function (data) {
          _this._montePostagensNaTela(false, data);

          _this.container.data("tipo-de-postagem", tipoPostagem);
        },
        function () {
          console.error("Ocorreu um falha na busca dos artigos.");
        }
      );
    },

    obtenhaTipoDePostagemNoContexto: function () {
      return parseInt(this.container.data("tipo-de-postagem"), 10);
    },

    definaCallBackClickLinks: function (callback) {
      this.callbackLinks = callback;
    },

    obtenhaLimiteDeBusca: function () {
      if ("ontouchstart" in window && window.screen.availWidth < 768) {
        return 3;
      }

      return 6;
    },

    _obtenhaURL: function (complemento) {
      return window.location.origin + "/" + complemento;
    },

    _montePostagensNaTela: function (naoEFluxoDePaginacao, artigos) {
      var contadorAuxiliar = 1;

      if (naoEFluxoDePaginacao) {
        this._configureCssIndex();
        this.container.empty();

        if (artigos.length === 0) {
          this.container.append(
            "<div class='flow-text center'>Nenhum conte??do postado.<div>"
          );
          return;
        }
      }

      for (var indice = 0; indice < artigos.length; indice++) {
        if (contadorAuxiliar > 3) {
          contadorAuxiliar = 1;
        }

        if (contadorAuxiliar == 1) {
          this.guid = this._gereGuid();

          var linha = this._crieLinha(this.guid);

          this.container.append(linha);
        }

        if (contadorAuxiliar <= 3) {
          var coluna = this._crieColunaComCard(artigos[indice]);

          var seletorLinha = "#" + this.guid;

          jquery(seletorLinha).append(coluna);

          contadorAuxiliar += 1;
        }
      }
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

    _crieLinha: function (idDaLinha) {
      var linha = document.createElement("div");

      linha.classList.value = "row";

      linha.id = idDaLinha;

      return linha;
    },

    _crieColunaComCard: function (postagem) {
      var coluna = document.createElement("div");
      coluna.classList.value = "col l4 m6 s12";
      var _this = this;

      var card = document.createElement("div");
      card.classList.value = "card hoverable";
      card.id = postagem["id"];

      card.onclick = function () {
        var elemento = jquery(this).get(0);
        var url = _this._obtenhaURL("postagem/" + elemento.id);

        _this._AjaxGet(
          url,
          "html",
          function (html) {
            _this.container.empty();
            _this.container.html(html);
            _this._configureCssPostagem();
            _this.callbackLinks();
          },
          function () {
            console.error("Ocorreu um falha na busca dos artigos.");
          }
        );
      };

      var cardImagem = document.createElement("div");
      cardImagem.classList.value = "card-image";

      var imagem = document.createElement("img");
      imagem.src = postagem["imagem"];

      var conteudo = document.createElement("div");
      conteudo.classList.value = "card-content";

      var descricao = document.createElement("div");
      descricao.classList.value = "card__descricao truncate";
      descricao.innerText = postagem["titulo"];

      var informacao = document.createElement("div");
      informacao.classList.value = "card__informacao";
      informacao.innerText = postagem["data"];

      cardImagem.appendChild(imagem);
      conteudo.appendChild(descricao);
      conteudo.appendChild(informacao);
      card.appendChild(cardImagem);
      card.appendChild(conteudo);
      coluna.appendChild(card);

      return coluna;
    },

    _AjaxGet: function (url, dataType, callbackSucesso, callbackErro) {
      jquery.ajax({
        url: url,
        method: "GET",
        dataType: dataType,
        crossDomain: true,
        success: callbackSucesso,
        error: callbackErro,
      });
    },

    _configureCssIndex: function () {
      $("[href*='aplica.web.']").remove();
      $("head").append(
        "<link rel='stylesheet' type='text/css' href='/stylesheets/aplica.web.index.css'>"
      );
    },

    _configureCssPostagem: function () {
      $("[href*='aplica.web.']").remove();
      $("head").append(
        "<link rel='stylesheet' type='text/css' href='/stylesheets/aplica.web.postagem.css'>"
      );
    },
  };

  return new AplicaWebMenu();
});
