require.config({
  baseUrl: "/javascripts/",
  paths: {
    materialize: "shared/materialize.min",
    principal: "aplica.web.index",
    jquery: "shared/jquery"
  }
});

require(["jquery", "principal"], function (jquery, principal) {
  jquery(document).ready(function () {
    jquery(".body").data(principal);
  });
});
