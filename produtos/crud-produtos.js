const express = require("express")
const app = express();
const PORTA = 3000;

let produtos = [];

app.use(express.json());

const logMiddleware = (req, res, next) => {
  const horaAtual = new Date().toISOString();
  console.log(`[${horaAtual}] Nova solicitação recebida para: [${req.method}] [${req.originalUrl}]`);
  next();
};

app.use(logMiddleware);

app.get("/", function(req, res) {
 res.send("Sucesso");
});

app.get("/produtos", function(req, res) {
 if (produtos) {
  res.status(200).json(produtos);
 }
});

app.post("/produtos", function(req, res) {
const produto = req.body;
produto.id = (produtos.length || 0) + 1;
produtos.push(produto);
res.status(201).send("Produto adicionado com sucesso!");
});

app.get("/produtos/:id", (req, res) => {
const{id} = req.params;
const produto = produtos.find(produto => produto.id === parseInt(id));
if(!produto) {
 res.status(404).send("Produto não encontrado.");
 return;
}
res.json(produto);
});

app.put("/produtos/:id", (req, res) => {
 const{id} = req.params;
 const dadosAtualizados = req.body;
 const index = produtos.findIndex(produto => produto.id === parseInt(id));
 if(index === -1) {
  res.status(404).send("Produto não encontrado");
  return;
 }
 produtos[index] = {...produtos[index], ...dadosAtualizados };
 res.status(200).send("Produto atualizado com sucesso")
})

app.delete("/produtos/:id", (req, res) => {
 const{id} = req.params;
 const index = produtos.findIndex(produto => produto.id === parseInt(id));
 if(index === -1) {
  res.status(404).send("Produto não encontrado.");
  return;
 }
 produtos.splice(index, 1);
 res.status(200).send("Produto deletado com sucesso");
});


app.listen(3000, function(){
 console.log("Servidor rodando!!!")
})