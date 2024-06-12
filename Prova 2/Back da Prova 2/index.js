const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())
app.use(express.json())

var clientes = []

app.get('/listar', (request, response) => {
  const clientesOrdenados = clientes.sort((a, b) => a.nome.localeCompare(b.nome));
  response.json(clientesOrdenados);
});

app.post("/cadastrar", (request, response) => {
    let cliente = request.body
    console.log(cliente)
    clientes.push(cliente) 
    response.json({ success: true  })
})

app.delete("/excluir/:cpf", (request, response) => {
  let cpf = request.params.cpf
  for(let i=0; i < clientes.length; i++){
    let cliente = clientes[i]
    if (cliente.cpf == cpf){
        clientes.splice(i, 1) 
    }
  }
  response.json({ success: true })
})
app.get("/buscar-cliente/:nome", (req, res) => {
  const query = req.query.q.toLowerCase(); 

  const resultados = clientes.filter(cliente =>
      (cliente.nome.toLowerCase().includes(query) ||
      cliente.cpf.includes(query) ||
      cliente.telefone.includes(query) ||
      cliente.nome_do_cachorro.toLowerCase().includes(query) ||
      cliente.nome_do_gato.toLowerCase().includes(query))
  );
  res.json(resultados);
});

app.put("/alterar", (request, response) => {
  let cliente = request.body
  for(let i=0; i < clientes.length; i++){
    if (clientes[i].cpf == cliente.cpf){
      clientes[i] = cliente 
    }
  }
  response.json({ success: true })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})