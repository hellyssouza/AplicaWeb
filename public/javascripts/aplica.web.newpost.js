define(function (requite) {
  var materialize = require("materialize");
  var jquery = require("jquery");

  function NewPost() {
    this.dropDown = jquery(".dropdown-trigger");
    this.confirmacao = jquery(".confirmacao");
    this.pathImg = jquery(".file-path");
    this.btnSim = jquery(".btnSim");
    this.btnNao = jquery(".btnNao");
    this.salvar = jquery(".salvar");
    this.editor = jquery(".editor");
    this.imagem = jquery(".imagem");
    this.tipo = jquery(".tipo");
  }

  NewPost.prototype = {
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
            var mensagem = "A imagem a ser carregada deve ter Largura igual 319 e Altura igual a 158.";

            M.toast({ html: mensagem, classes: 'rounded center' });
            
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

      var url = this._obtenhaURL("postagem");

      var _this = this;

      jquery.ajax({
        url: url,
        method: "POST",
        data: dados,
        cache: false,
        processData: false,
        contentType: false,
        crossDomain: true,
        success: function (data) {
          M.toast({ html: "Sua postagem foi salva com sucesso.", classes: 'rounded' });
          
          CKEDITOR.instances.editor.setData("");
          
          _this.imagem.val("");
          
          _this.pathImg.val("");
        },
        error: function () {
          M.toast({
            html: "Sua postagem não foi salva ocorreu um ou mais erros.", classes: 'rounded'
          });
        },
      });
    },

    _obtenhaURL: function (complemento) {
      return window.location.origin + "/" + complemento;
    },
  };

  return new NewPost();
});
