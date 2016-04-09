var clique_for_resultados = $("#botao_pesquisar_produto, #violao, #guitarra, #contra_baixo, #pedal, #amplificador, #corda");

clique_for_resultados.click(function(){
  console.log($("#campo_pesquisar").val());
  $("header, section#produtos").addClass("esconder");
  $("section#filtro").removeClass("esconder");
  $("section#resultados").removeClass("esconder");
});
