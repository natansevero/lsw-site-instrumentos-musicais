const DB_NAME = 'instrumentos_musicais';
const DB_VERSION = 1;

var db;                                                   //conexao com o banco

    console.log("Abrindo transação...");

var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = function(event){
        db = this.result;
        alert("conectado corretamente");
    };

    request.onerror = function(event){
        console.error("Error: " , event.target.errorCode);      
    };




//--------------form-------------------
$("#pesquisar_produto").submit(function(){
            var produto = $("#campo_pesquisar").val();
            $("section#resultados").empty();
            db.transaction(produto).onerror = function(event){
                 alert("produto nao encontrado");
            };
            
            db.transaction(produto).objectStore(produto).openCursor().onsuccess = function(event){
                var cursor = event.target.result;
            
                if (cursor) {
                     var resultados = $("section#resultados");
                     
                        resultados.append("<div class='col-xs-12 col-sm-4 col-md-4'><div class='box aling-center'><div class='box-link'><div class='fundo'><img src='img/produtos/"+cursor.value.foto+"' class='img-responsive center-block'></div><div class='caption'><h3><strong>"+cursor.value.marca+"<span id='marca'></span></strong></h3><h3><span id='preco'>R$"+cursor.value.preco+"</span></h3></div></div></div></div>");  
                             
                     
                     cursor.continue();                           
                    
                }
            };


            

            
});




//----------------links das fotos-------------------
$(".box-link").on("click", function(evt){

            var produto = evt.target.name;
            var produto_filtrado = document.getElementById('produto_filtrado');
            produto_filtrado.innerHTML = produto;               //deve ser informada a tabela.
            
            
            
            transacao = db.transaction(produto);              
            store = transacao.objectStore(produto);
            
            
            var marcas_listadas = [];
            var cores_listadas = [];
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {

                     var cont = 0;
                        for(var i in marcas_listadas){
                            if(cursor.value.marca == marcas_listadas[i]){
                                 cont++;
                                 break;
                            }
                        }

                        if(cont == 0){

                            var select_marca = document.createElement("option");
                            select_marca.innerHTML = cursor.value.marca;
                            var option_marca= document.getElementById("filtrar_marca");
                            option_marca.appendChild(select_marca);


                            var select_cor = document.createElement("option");
                            select_cor.innerHTML = cursor.value.cor;
                            var option_cor= document.getElementById("filtrar_cor");
                            option_cor.appendChild(select_cor);

                            cores_listadas.push(cursor.value.cor);
                        }

                            var resultados = $("section#resultados");
                            resultados.append("<div class='col-xs-12 col-sm-4 col-md-4'><div class='box aling-center'><div class='box-link'><div class='fundo'><img src='img/produtos/"+cursor.value.foto+"' class='img-responsive center-block'></div><div class='caption'><h3><strong>"+cursor.value.marca+"<span id='marca'></span></strong></h3><h3><span id='preco'>R$"+cursor.value.preco+"</span></h3></div></div></div></div>");  
                             
                     
                     cursor.continue();                  		  
                    
                }

               
            }                                                                             
});



function option_nulo(campo){

     var select = document.createElement("option");
     select.innerHTML = "";
     var option= document.getElementById(campo);
     option.appendChild(select);
}



$("#meus_filtros").submit(function(event){

        var produto = $('#produto_filtrado').html();

        transacao = db.transaction(produto);              
        store = transacao.objectStore(produto);

        filtro_cor = document.getElementById("filtrar_cor").value;
        filtro_marca = document.getElementById("filtrar_marca").value;
        




            $("section#resultados").empty();            
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {
                     if((filtro_cor == "") && (filtro_marca =="")){       //filtros vazio = seta tudo da tabela no banco
                                 var resultados = $("section#resultados");
                                 resultados.append("<div class='col-xs-12 col-sm-4 col-md-4'><div class='box aling-center'><div class='box-link'><div class='fundo'><img src='img/produtos/"+cursor.value.foto+"' class='img-responsive center-block'></div><div class='caption'><h3><strong>"+cursor.value.marca+"<span id='marca'></span></strong></h3><h3><span id='preco'>R$"+cursor.value.preco+"</span></h3></div></div></div></div>");         
                     }


                     else if((filtro_cor != "") && (filtro_marca !="")){       //duplo filtro
                            if((cursor.value.marca == filtro_marca) && (cursor.value.cor == filtro_cor)){     
                                 var resultados = $("section#resultados");
                                 resultados.append("<div class='col-xs-12 col-sm-4 col-md-4'><div class='box aling-center'><div class='box-link'><div class='fundo'><img src='img/produtos/"+cursor.value.foto+"' class='img-responsive center-block'></div><div class='caption'><h3><strong>"+cursor.value.marca+"<span id='marca'></span></strong></h3><h3><span id='preco'>R$"+cursor.value.preco+"</span></h3></div></div></div></div>"); 
                            }        
                     }

                     else if((filtro_cor != "") && (filtro_marca =="")){       //filtro por cor
                            if(cursor.value.cor == filtro_cor){     
                                 var resultados = $("section#resultados");
                                 resultados.append("<div class='col-xs-12 col-sm-4 col-md-4'><div class='box aling-center'><div class='box-link'><div class='fundo'><img src='img/produtos/"+cursor.value.foto+"' class='img-responsive center-block'></div><div class='caption'><h3><strong>"+cursor.value.marca+"<span id='marca'></span></strong></h3><h3><span id='preco'>R$"+cursor.value.preco+"</span></h3></div></div></div></div>"); 
                            }        
                     }


                     else if((filtro_cor == "") && (filtro_marca !="")){       //filtro por marca
                            if(cursor.value.marca == filtro_marca){     
                                 var resultados = $("section#resultados");
                                 resultados.append("<div class='col-xs-12 col-sm-4 col-md-4'><div class='box aling-center'><div class='box-link'><div class='fundo'><img src='img/produtos/"+cursor.value.foto+"' class='img-responsive center-block'></div><div class='caption'><h3><strong>"+cursor.value.marca+"<span id='marca'></span></strong></h3><h3><span id='preco'>R$"+cursor.value.preco+"</span></h3></div></div></div></div>"); 
                            }        
                     }


     
                     cursor.continue();                           
                    
                }

               
            }       
        


});




$("#filtrar_marca").on("change", function(event){
         
        var produto = $('#produto_filtrado').html();
               


        transacao = db.transaction(produto);              
        store = transacao.objectStore(produto);


        filtro_cor = document.getElementById("filtrar_cor").value;
        $("#filtrar_cor").empty();
        option_nulo("filtrar_cor");
        
        filtro_marca = document.getElementById("filtrar_marca").value;
        


        store.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;

                if (cursor) {
                    if(filtro_marca == ""){      //mostra todas as cores disponiveis
                            var select_cor = document.createElement("option");
                            select_cor.innerHTML = cursor.value.cor;
                            var option_cor= document.getElementById("filtrar_cor");
                            option_cor.appendChild(select_cor);
                            cursor.continue();
                    }
                    else{
                        if(cursor.value.marca == filtro_marca){
                            var select_cor = document.createElement("option");
                            select_cor.innerHTML = cursor.value.cor;
                            var option_cor= document.getElementById("filtrar_cor");
                            option_cor.appendChild(select_cor);
                            cursor.continue();
                        }
                        else{
                            cursor.continue();
                        }

                    }
                    
                }
                     
               
        }      


});