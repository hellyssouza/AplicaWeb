define(function (require) {
  var materialize = require("materialize");
  var jquery = require("jquery");

  function Index() {
    this.linkArtigos = jquery(".header__link:eq(0)");
    this.linkCursos = jquery(".header__link:eq(1)");
    this.container = jquery(".body > .container");
    this.dropDown = jquery(".dropdown-trigger");
    
    this.inicialize();
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
      var _this = this;

      for (var indice = 0; indice < artigos.length; indice++) {
        if (contadorAuxiliar > 3) {
          contadorAuxiliar = 1;
        }

        if (contadorAuxiliar == 1) {
          _this.guid = _this._gereGuid();

          var linha = _this._crieLinha(_this.guid);

          _this.container.append(linha);
        }

        if (contadorAuxiliar <= 3) {
          var coluna = _this._crieColunaComCard(artigos[indice]);

          var seletorLinha = "#" + _this.guid;

          jquery(seletorLinha).append(coluna);

          contadorAuxiliar += 1;
        }
      }
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
      
      card.onclick = function(){
        var elemento = jquery(this).get(0);
        jquery.ajax({
          url: _this._obtenhaURL("postagem/" + elemento.id),
          method: "GET",
          dataType: 'html',
          crossDomain: true,
          success: function (html) {
            document.documentElement.innerHTML = html;
          },
          error: function () {
            console.error("Ocorreu um falha na busca dos artigos.");
          },
        });
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
  };

  return new Index();
});
