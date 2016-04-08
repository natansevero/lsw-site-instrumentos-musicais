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


function select_vazio(campo){
    var select_campo = document.createElement("option");   //  deixa o elemento vazio
    select_campo.innerHTML = "";
    var option_campo= document.getElementById(campo);
    option_campo.appendChild(select_campo);
}



 document.getElementById("buscar_excluir").disabled = true;     


$("#excluir_produto").on("change", function(evt){
                                           
            var produto = $("#excluir_produto").val();
            
            var marca = $("#excluir_marca").val();
            
            $("#excluir_marca").empty();                   //limpa o select 
            select_vazio("excluir_marca");                 // o select fica selecionado com nulo(="") 

           
            var cor = $("#excluir_cor").val();
                  
            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);

            var marcas_listadas = [];                //marcas ja listadas no select
           
            store.openCursor().onsuccess = function(event){
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
                            var option_marca= document.getElementById("excluir_marca");
                            option_marca.appendChild(select_marca);

                            marcas_listadas.push(cursor.value.marca);

                        }
                      cursor.continue();	
				}

            }                       
});  



$("#excluir_marca").on("change", function(evt){
                                           
            var produto = $("#excluir_produto").val();       
            var marca = $("#excluir_marca").val();
            var cor = $("#excluir_cor").val();

            $("#excluir_cor").empty();
            select_vazio("excluir_cor");
            
 
            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);
            var cores_listadas = [];
           
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

   
                if (cursor) {

                    var cont = 0;
                    for(var i in cores_listadas){
                        if(cursor.value.cor == cores_listadas[i]){
                             cont++;
                             break;
                        }
                    }

                        if((cont == 0) && (cursor.value.marca == marca)){
                            var select_cor = document.createElement("option");
                            select_cor.innerHTML = cursor.value.cor;
                            var option_cor= document.getElementById("excluir_cor");
                            option_cor.appendChild(select_cor);

                            cores_listadas.push(cursor.value.cor);

                        }

                        cursor.continue();
                }  

            }                       
});   





$("#excluir_cor").on("change", function(evt){
                                           
             var produto = $("#excluir_produto").val();
             var nome = $("#excluir_nome").val();

             $("#excluir_nome").empty();
             select_vazio("excluir_nome");

             var marca = $("#excluir_marca").val();            
             var cor = $("#excluir_cor").val();
            
            
            
            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);
            var nomes_listadas = [];
            
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

       
                if (cursor) {
                        var cont = 0;
                        for(var i in nomes_listadas){
                             if(cursor.value.nome == nomes_listadas[i]){
                                  cont++;
                                  break;
                             }
                        }

                        if((cont == 0) && (cursor.value.marca == marca) && (cursor.value.cor == cor) ){
                             var select_nome = document.createElement("option");
                             select_nome.innerHTML = cursor.value.nome;
                             var option_nome= document.getElementById("excluir_nome");
                            option_nome.appendChild(select_nome);

                            nomes_listadas.push(cursor.value.nome);
                        }

                        cursor.continue();
                }       
            }                       
});   



$("#excluir_nome").on("change", function(evt){
                                           
             var produto = $("#excluir_produto").val();
             var nome = $("#excluir_nome").val();
             var marca = $("#excluir_marca").val();
             var preco = Number($("#excluir_preco").val());
             
             $("#excluir_preco").empty();
             select_vazio("excluir_preco");
           
             var cor = $("#excluir_cor").val();
          

            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);
            var preco_listadas = [];

            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

             
                if (cursor) {

                        var cont = 0;
                        for(var i in preco_listadas){
                             if(cursor.value.preco == preco_listadas[i]){
                                  cont++;
                                  break;
                             }
                        }

                        if((cont == 0) && (cursor.value.marca == marca) && (cursor.value.cor == cor) && (cursor.value.nome == nome)){
                             var select_preco = document.createElement("option");
                             select_preco.innerHTML = cursor.value.preco;
                             var option_preco= document.getElementById("excluir_preco");
                             option_preco.appendChild(select_preco);

                             preco_listadas.push(cursor.value.preco);
                        }
         
                        cursor.continue();
                }       
            }                       
}); 




 $("#excluir_preco").on("change", function(evt){
    if($("#excluir_preco").val() != ""){
        document.getElementById("buscar_excluir").disabled = false;
    }
    else{
        document.getElementById("buscar_excluir").disabled = true;
    }  
 }); 




$("#buscar_excluir").on("click", function(evt){
                                           
             var produto = $("#excluir_produto").val();
             var nome = $("#excluir_nome").val();
             var marca = $("#excluir_marca").val();
             var preco = Number($("#excluir_preco").val());
             var cor = $("#excluir_cor").val();
            
            
            
            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);

            var registros = 0;
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                 
                 
                if (cursor) {

                        if((cursor.value.marca == marca) && (cursor.value.cor == cor) && (cursor.value.nome == nome)  && (cursor.value.preco == preco)){
                            
                             var itens= document.getElementById("quantidade_itens");
                             itens.innerHTML=cursor.value.quantidade + " itens encontrados";
                             registros++;

                             var id = document.getElementById("id_produto");
                             $("#id_produto").empty();
                             id.value = cursor.key;


                            $("#quantidade_excluir").empty();
                            for(var k=1; k<=cursor.value.quantidade; k++){
                                var quantidade_itens = document.createElement("option");   //  deixa o elemento vazio
                                quantidade_itens.innerHTML = k;
                                var option_quantidade= document.getElementById("quantidade_excluir");
                                option_quantidade.appendChild(quantidade_itens);                        
                            }
                             
                 
                        }

                        else{
                            cursor.continue();
                        }
                        
                } 


                if(registros == 0){
                    var itens= document.getElementById("quantidade_itens");
                    itens.innerHTML="nenhum item encontrado";        
                }



            }                       
});     




$("#botao_excluir").on("click", function(evt){                 //funca que exclui ou diminui a quantidade de intes
            var produto = $("#excluir_produto").val();
            var id = Number($("#id_produto").val());
            var nova_quantidade = Number($("#quantidade_excluir").val());                             
             
 
            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);

            
            store.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
                 
                if (cursor) {

                        if(cursor.key != id){
                            cursor.continue();
                        }

                        else{
                            if(nova_quantidade == cursor.value.quantidade){      //excluir item, o id ja nao tem mais produtos
                                var request = cursor.delete(id);
                                    request.onsuccess = function(event){
                                            console.log("excluido com sucesso");
                                    }
  
                                request.onerror = function(event){
                                        console.log("erro na exclusao");
                                };         
                            }

                            else{
                                request = store.get(id);

                                request.onsuccess = function(event){
                                        var data = request.result;
                                        data.quantidade -= nova_quantidade;
                                        var atualiza = cursor.update(data);

                                        atualiza.onsuccess = function(event){
                                                       console.log("atualizado com sucesso");
                                        };

                                        atualiza.onerror = function(event){
                                                    console.log("erro na atualização");
                                        }; 
                                }
  
                                request.onerror = function(event){
                                        console.log("erro na captura");
                                };          
                            }
                     
                        }   
                } 

            }                       
});