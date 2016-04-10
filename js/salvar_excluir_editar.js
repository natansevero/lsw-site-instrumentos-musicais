
//==================================================================funcao salvar===============================================================

const DB_BANCO_NAME = 'instrumentos_musicais';
const DB_VERSION = 1;

var db;  


           console.log("Abrindo transação...");

           var request = indexedDB.open(DB_BANCO_NAME, DB_VERSION);

           request.onsuccess = function(event){
                db = this.result;
                alert("conectado corretamente");
           };

           request.onerror = function(event){
                  console.error("Error: " , event.target.errorCode); 
                  alert("erro no request");     
           };                                                 //conexao com o banco




$("#form_inserir").submit(function(evt){
            
            evt.preventDefault();
                                                                
            var produto = $("#inserir_produto").val();
            var nome = $("#inserir_nome").val();
            var marca = $("#inserir_marca").val();
            var preco = Number($("#inserir_preco").val());
            var caminho_foto = $("#inserir_foto").val();
            nome_foto = caminho_foto.split("\\");
            foto = nome_foto[nome_foto.length -1];
            var cor = $("#inserir_cor").val();
            var quantidade = Number($("#inserir_quantidade").val());
            
            
            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);

            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {
                    if((cursor.value.nome != nome) || (cursor.value.marca != marca)
                      || (cursor.value.preco != preco) || (cursor.value.foto != foto) || (cursor.value.cor != cor)){
                        cursor.continue();
                    }

                    else{
                        var id=Number(cursor.key);
                        var request = store.get(id);
                        console.log("Request: "+request)
                        
                        request.onsuccess = function(event){
                                var data = request.result; 
                                data.quantidade += quantidade;
                    

                                var atualiza = cursor.update(data);
                                atualiza.onsuccess = function(event){
                                     alert("estoque atualizado");
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

                else {//novo registro a ser cadastrado
                    
                    var data = [];
                    data.nome = nome;
                    data.marca = marca;
                    data.preco = preco;
                    data.foto = foto;
                    data.cor = cor;
                    data.quantidade = quantidade;
            
                     
                    var request= store.add(data);

                    resultado = document.getElementById('resultado_inserir');
                    request.onsuccess = function(event){     //criar um modal para esta função
                        
                        alert("produto cadastrado com sucesso");
                        
                        
                    }
        
                    request.onerror = function(event){
                        alert("erro ao salvar o produto");
                    } 
                }
            }                       
});
































//==================================================================funcao excluir===============================================================


var botao_excluir_inativo = $("#quantidade_excluir").val();



function botao_ativo(){
   document.getElementById("botao_excluir").disabled = true; 
}


function botao_inativo(){
   document.getElementById("botao_excluir").disabled = false; 
}



if(botao_excluir_inativo == null){
    botao_ativo();
}



function select_vazio(campo){
    var select_campo = document.createElement("option");   //  deixa o elemento vazio
    select_campo.innerHTML = "";
    var option_campo= document.getElementById(campo);
    option_campo.appendChild(select_campo);
}

    


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


$("#form_excluir").submit(function(evt){
              evt.preventDefault();                            
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
                             
                             var itens= document.getElementById("quantidade_itens_excluir");
                             itens.innerHTML=cursor.value.quantidade;
                             registros++;

                             var id_produto = document.getElementById("id_produto_excluir");
                             id_produto.innerHTML = cursor.key;


                            $("#quantidade_excluir").empty();
                            for(var k=1; k<=cursor.value.quantidade; k++){
                                var quantidade_itens = document.createElement("option");   //  deixa o elemento vazio
                                quantidade_itens.innerHTML = k;
                                var option_quantidade= document.getElementById("quantidade_excluir");
                                option_quantidade.appendChild(quantidade_itens);                        
                            }
                             botao_inativo(); 
                 
                        }

                        else{
                            cursor.continue();
                        }
                        
                }
                else{
                    var itens= document.getElementById("quantidade_itens_excluir");
                             itens.innerHTML="0";
                             
                             var id_produto = document.getElementById("id_produto_excluir");
                             id_produto.innerHTML = "";
                             
                             $("#quantidade_excluir").empty();
                     botao_ativo();        
                } 
            }
                                  
});     




$("#botao_excluir").click(function(evt){

            evt.preventDefault();                //funca que exclui ou diminui a quantidade de intes
            var produto = $("#excluir_produto").val();
            var id = Number($("#id_produto_excluir").html());
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
                                            alert("excluido com sucesso");
                                            botao_ativo(); 
                                    }
  
                                request.onerror = function(event){
                                        alert("erro na exclusao");
                                };         
                            }

                            else{
                                request = store.get(id);
                                
                                request.onsuccess = function(event){
                                        var data = request.result;
                                        data.quantidade -= nova_quantidade;
                                        var atualiza = cursor.update(data);

                                        atualiza.onsuccess = function(event){
                                                       alert("atualizado com sucesso");
                                                       botao_ativo(); 
                                        };

                                        atualiza.onerror = function(event){
                                                    alert("erro na atualização");
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












//==================================================================funcao editar===============================================================





function select_vazio(campo){
    var select_campo = document.createElement("option");   //  deixa o elemento vazio
    select_campo.innerHTML = "";
    var option_campo= document.getElementById(campo);
    option_campo.appendChild(select_campo);
}
  


$("#editar_produto").on("change", function(evt){
                                           
            var produto = $("#editar_produto").val();
            
            var marca = $("#editar_marca").val();
            
            $("#editar_marca").empty();                   //limpa o select 
            select_vazio("editar_marca");                 // o select fica selecionado com nulo(="") 

           
            var cor = $("#editar_cor").val();
                  
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
                            var option_marca= document.getElementById("editar_marca");
                            option_marca.appendChild(select_marca);

                            marcas_listadas.push(cursor.value.marca);

                        }
                      cursor.continue();    
                }

            }                       
});  



$("#editar_marca").on("change", function(evt){
                                           
            var produto = $("#editar_produto").val();       
            var marca = $("#editar_marca").val();
            var cor = $("#editar_cor").val();

            $("#editar_cor").empty();
            select_vazio("editar_cor");
            
 
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
                            var option_cor= document.getElementById("editar_cor");
                            option_cor.appendChild(select_cor);

                            cores_listadas.push(cursor.value.cor);

                        }

                        cursor.continue();
                }  

            }                       
});   





$("#editar_cor").on("change", function(evt){
                                           
             var produto = $("#editar_produto").val();
             var nome = $("#editar_nome").val();

             $("#editar_nome").empty();
             select_vazio("editar_nome");

             var marca = $("#editar_marca").val();            
             var cor = $("#editar_cor").val();
            
            
            
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
                             var option_nome= document.getElementById("editar_nome");
                            option_nome.appendChild(select_nome);

                            nomes_listadas.push(cursor.value.nome);
                        }

                        cursor.continue();
                }       
            }                       
});   



$("#editar_nome").on("change", function(evt){
                                           
             var produto = $("#editar_produto").val();
             var nome = $("#editar_nome").val();
             var marca = $("#editar_marca").val();
             var preco = Number($("#editar_preco").val());
             
             $("#editar_preco").empty();
             select_vazio("editar_preco");
           
             var cor = $("#editar_cor").val();
          

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
                             var option_preco= document.getElementById("editar_preco");
                             option_preco.appendChild(select_preco);

                             preco_listadas.push(cursor.value.preco);
                        }
         
                        cursor.continue();
                }       
            }                       
}); 



$("#form_editar").submit(function(evt){

             evt.preventDefault();
             var produto = $("#editar_produto").val();
             var nome = $("#editar_nome").val();
             var marca = $("#editar_marca").val();
             var preco = Number($("#editar_preco").val());
             var cor = $("#editar_cor").val();

            transacao = db.transaction(produto, "readwrite");              //pega o nome da tabela direto do formulario
            store = transacao.objectStore(produto);
            
            
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

             
                if (cursor) {
                    
                         if((cursor.value.nome == nome) && (cursor.value.marca == marca) && (cursor.value.preco == preco) && (cursor.value.cor == cor)){
                            document.getElementById("id_produto_editar").innerHTML = cursor.key;
                            var registros = document.getElementById("quantidade_itens_editar");
                            registros.innerHTML = cursor.value.quantidade;
                         }

                         else{
                            cursor.continue();
                         }
                } 
            }            
             
             var novo_marca = document.getElementById("modal_marca_editar");
             novo_marca.value = marca;
             var novo_nome = document.getElementById("modal_nome_editar");
             novo_nome.value = nome;
             var novo_cor = document.getElementById("modal_cor_editar");
             novo_cor.value = cor;
             var novo_preco = document.getElementById("modal_preco_editar");
             novo_preco.value = preco;

});




$("#modal_form_editar").submit(function(evt){                         //funcao que realmente altera os campos
              evt.preventDefault();

             var produto = $("#editar_produto").val();
             var novo_nome = $("#modal_nome_editar").val();
             var novo_marca = $("#modal_marca_editar").val();
             var novo_preco = Number($("#modal_preco_editar").val());
             var novo_cor = $("#modal_cor_editar").val();
             var id = Number($("#id_produto_editar").html());
                         
            
            
            
            transacao = db.transaction(produto, "readwrite");             
            store = transacao.objectStore(produto);

            
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                 
                 
                if (cursor) {

                        if(cursor.key != id) {
                                cursor.continue();                   
                        }
                             
                        else{
                            var data = [];
                            data.nome = novo_nome;
                            data.marca = novo_marca;
                            data.preco = novo_preco;
                            data.cor = novo_cor;
                            

                            var atualiza = cursor.update(data); 

                            atualiza.onsuccess = function(event){
                                alert("atualizado com sucesso");
                            };

                            atualiza.onerror = function(event){
                                alert("erro na atualização"); 
                            };
                        }   
                } 
            }                       
});     




