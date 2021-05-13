define(["require", "menu", "materialize", "jquery"], function (
  require,
  menu,
  materialize,
  jquery
) {
  function AplicaWebNewPost() {
    this.dropDown = jquery(".dropdown-trigger");
    this.confirmacao = jquery(".confirmacao");
    this.pathImg = jquery(".file-path");
    this.btnSim = jquery(".btnSim");
    this.btnNao = jquery(".btnNao");
    this.salvar = jquery(".salvar");
    this.editor = jquery(".editor");
    this.imagem = jquery(".imagem");
    this.titulo = jquery(".titulo");
    this.tipo = jquery(".tipo");

    this.inicialize();
  }

  AplicaWebNewPost.prototype = {
    inicialize: function () {
      this.preparaComponente();
    },

    preparaComponente: function () {
      this.associeEventos();
    },

    associeEventos: function () {
      var _this = this;

      _this.dropDown.dropdown({ coverTrigger: false });

      _this.tipo.formSelect();

      _this.confirmacao.modal();

      CKEDITOR.replace("editor");

      _this.salvar.click(function (event) {
        event.stopPropagation();
        event.preventDefault();

        _this.confirmacao.modal("open");

        _this.btnSim.click(function () {
          _this.confirmacao.modal("close");

          _this._enviePostagem();
        });

        _this.btnNao.click(function () {
          _this.confirmacao.modal("close");
        });
      });

      _this.imagem.change(function (event) {
        var imagem = new Image();
        imagem.src = window.URL.createObjectURL(event.target.files[0]);

        imagem.onload = () => {
          if (imagem.width != 319 || imagem.height != 158) {
            var mensagem =
              "A imagem a ser carregada deve ter Largura igual 319 e Altura igual a 158.";

            _this._apresenteMsgDeErro(mensagem);

            event.target.value = "";

            _this.pathImg.val("");
          }
        };
      });
    },

    _enviePostagem: function () {
      var formulario = jquery("[name='formulario']").get(0);

      var dados = new FormData(formulario);

      dados.set("texto", CKEDITOR.instances.editor.getData());

      dados.set("data", new Date());

      var url = this._obtenhaURL("novo");

      var _this = this;

      jquery.ajax({
        url: url,
        method: "POST",
        data: dados,
        cache: false,
        processData: false,
        contentType: false,
        crossDomain: true,
        success: (resp) => _this._callbackSucesso(resp),
        error: (resp) => _this._callbackErro(resp),
      });
    },

    _obtenhaURL: function (complemento) {
      return window.location.origin + "/" + complemento;
    },

    _callbackSucesso: function (resposta) {
      if (resposta.sucesso) {
        this._apresenteMsgDeSucesso("Sua postagem foi salva com sucesso.");

        CKEDITOR.instances.editor.setData("");

        this.imagem.val("");

        this.pathImg.val("");

        this.titulo.val("");
      } else {
        var texto = resposta.errors.reduce((acumulador, elemento) => {
          return "<li>" + elemento + "</li>" + acumulador;
        });

        this._apresenteMsgDeErro("<ul>" + texto + "</ul>");
      }
    },

    _callbackErro: function () {
      this._apresenteMsgDeErro(
        "Sua postagem não foi salva ocorreu um erro no servidor por favor procure o administrador."
      );
    },

    _apresenteMsgDeErro: function (mensagem) {
      M.toast({
        html: mensagem,
        classes: "rounded red",
      });
    },

    _apresenteMsgDeSucesso: function (mensagem) {
      M.toast({
        html: mensagem,
        classes: "rounded green",
      });
    },
  };

  return new AplicaWebNewPost();
});
