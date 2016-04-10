const DB_NAME = 'instrumentos_musicais';
const DB_VERSION = 1;

const DB_STORE_NAME_VIOLAO = 'violao';                     // CADA INSTRUMENTO É UMA TABELA NO BANCO
const DB_STORE_NAME_GUITARRA = 'guitarra';
const DB_STORE_NAME_CONTRA_BAIXO = 'contra_baixo';
const DB_STORE_NAME_AMPLIFICADOR = 'amplificador';
const DB_STORE_NAME_PEDAl = 'pedal';
const DB_STORE_NAME_CORDA = 'corda';



var db;

console.log("Abrindo transação...");

var request = indexedDB.open(DB_NAME, DB_VERSION);

request.onsuccess = function(event){
    db = this.result;
    console.log("conectado corretamente");
};

request.onerror = function(event){                     //criar modal para o evento
    console.log("Error: " , event.target.errorCode);
};

request.onupgradeneeded = function(event){
  var store = event.currentTarget.result.createObjectStore(DB_STORE_NAME_VIOLAO, {KeyPath: 'id', autoIncrement: true});
  store.createIndex('nome', 'nome');
  store.createIndex('marca', 'marca');
  store.createIndex('preco', 'preco');
  store.createIndex('foto', 'foto');
  store.createIndex('cor', 'cor');
  store.createIndex('quantidade', 'quantidade');



  
  
  store = event.currentTarget.result.createObjectStore(DB_STORE_NAME_GUITARRA, {KeyPath: 'id', autoIncrement: true});
  store.createIndex('nome', 'nome');
  store.createIndex('marca', 'marca');
  store.createIndex('preco', 'preco');
  store.createIndex('foto', 'foto');
  store.createIndex('cor', 'cor');
  store.createIndex('quantidade', 'quantidade');




  store = event.currentTarget.result.createObjectStore(DB_STORE_NAME_CONTRA_BAIXO, {KeyPath: 'id', autoIncrement: true});
  store.createIndex('nome', 'nome');
  store.createIndex('marca', 'marca');
  store.createIndex('preco', 'preco');
  store.createIndex('foto', 'foto');
  store.createIndex('cor', 'cor');
  store.createIndex('quantidade', 'quantidade');




  store = event.currentTarget.result.createObjectStore(DB_STORE_NAME_AMPLIFICADOR, {KeyPath: 'id', autoIncrement: true});
  store.createIndex('nome', 'nome');
  store.createIndex('marca', 'marca');
  store.createIndex('preco', 'preco');
  store.createIndex('foto', 'foto');
  store.createIndex('cor', 'cor');
  store.createIndex('quantidade', 'quantidade');
  



  store = event.currentTarget.result.createObjectStore(DB_STORE_NAME_PEDAl, {KeyPath: 'id', autoIncrement: true});
  store.createIndex('nome', 'nome');
  store.createIndex('marca', 'marca');
  store.createIndex('preco', 'preco');
  store.createIndex('foto', 'foto');
  store.createIndex('cor', 'cor');
  store.createIndex('quantidade', 'quantidade');




  store = event.currentTarget.result.createObjectStore(DB_STORE_NAME_CORDA, {KeyPath: 'id', autoIncrement: true});
  store.createIndex('nome', 'nome');
  store.createIndex('marca', 'marca');
  store.createIndex('preco', 'preco');
  store.createIndex('foto', 'foto');
  store.createIndex('cor', 'cor');
  store.createIndex('quantidade', 'quantidade');
  
};