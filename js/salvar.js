// indexedDB.deleteDatabase('carros');

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


$("#adicionar_produto").on("click", function(evt){
                                                                
            var produto = $("#produto").val();
            var nome = $("#nome").val();
            var marca = $("#marca").val();
            var preco = Number($("#preco").val());
            var foto = $("#foto").val();
            var cor = $("#cor").val();
            var quantidade = Number($("#quantidade").val());
            
            
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
                                     console.log("atualizada a quant desse produto");
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
        
                    request.onsuccess = function(event){     //criar um modal para esta função
                        console.log("Sucesso ao salvar");
                    }
        
                    request.onerror = function(event){
                        alert("Erro ao salvar");           //criar um modal para esta função
                    } 
                }
            }                       
});




