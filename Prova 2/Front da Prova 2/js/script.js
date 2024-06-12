var clientes = []

var clienteAlterado = null

function adicionar(){
    document.getElementById("cpf").disabled = false
    clienteAlterado = null
    mostrarModal()
    limparForm()
}
function buscarCliente(nome) {
var input = document.getElementById("campo-busca").value.toLowerCase(); 
var table = document.getElementById("table-customers");
var tr = table.getElementsByTagName("tr"); 
    for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td"); 

        for (var j = 0; j < td.length; j++) {
        var cell = td[j];
            if (cell) {
            var textValue = cell.textContent || cell.innerText; 
            if (textValue.toLowerCase().indexOf(input) > -1) { 
                    tr[i].style.display = ""; 
                    break;
                } else {
                    tr[i].style.display = "none"; 
                }
            }
        }
    }
}

function alterar(cpf){

    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i]
        if (cliente.cpf == cpf){
            document.getElementById("nome").value = cliente.nome
            document.getElementById("cpf").value = cliente.cpf
            document.getElementById("telefone").value = cliente.telefone
            document.getElementById("nome_do_cachorro").value = cliente.nome_do_cachorro
            document.getElementById("nome_do_gato").value = cliente.nome_do_gato
            clienteAlterado = cliente
        }
    }
    document.getElementById("cpf").disabled = true
    mostrarModal()
}
function excluir(cpf){
    if (confirm("Você deseja realmente excluir?")){
        fetch("http://localhost:3000/excluir/" + cpf, {
            headers: {
                "Content-type": "application/json"
            },
            method: "DELETE"
        }).then((response) => {
            recarregarClientes()
            alert("Cliente excluído com sucesso")
        }).catch((error) => {
            console.log(error)
            alert("Não foi possível excluir o cliente")
        })       
    }
}
function mostrarModal(){
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "flex"
}
function ocultarModal(){
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "none"
}
function cancelar(){
    ocultarModal()
    limparForm()
}
function salvar(){
    let nome = document.getElementById("nome").value
    let cpf = document.getElementById("cpf").value
    let telefone = document.getElementById("telefone").value
    let nome_do_cachorro = document.getElementById("nome_do_cachorro").value
    let nome_do_gato = document.getElementById("nome_do_gato").value

    if (clienteAlterado == null){
        let cliente = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "nome_do_cachorro": nome_do_cachorro,
            "nome_do_gato": nome_do_gato
        }

        fetch("http://localhost:3000/cadastrar", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(cliente)
        }).then(() => {
            clienteAlterado = null
            limparForm()
            ocultarModal()
            recarregarClientes()
            alert("Cliente cadastrado com sucesso")
        }).catch(() => {
            alert("Ops... algo deu errado")
        })

    }else{
        clienteAlterado.nome = nome
        clienteAlterado.cpf = cpf
        clienteAlterado.telefone = telefone
        clienteAlterado.nome_do_cachorro = nome_do_cachorro
        clienteAlterado.nome_do_gato = nome_do_gato
        fetch("http://localhost:3000/alterar", {
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(clienteAlterado)
        }).then((response) => {
            clienteAlterado = null
            limparForm()
            ocultarModal()
            recarregarClientes()
            alert("Cliente alterado com sucesso")
        }).catch((error) => {
            alert("Não foi possível alterar o cliente")
        })
    }
}

function exibirDados(){

    let tbody = document.querySelector("#table-customers tbody")

    tbody.innerHTML = ""

    for(let i = 0; i < clientes.length; i++){
        let linha = `
        <tr>
            <td>${clientes[i].nome}</td>
            <td>${clientes[i].cpf}</td>
            <td>${clientes[i].telefone}</td>
            <td>${clientes[i].nome_do_cachorro}</td>
            <td>${clientes[i].nome_do_gato}</td>
            <td>
                <button onclick="alterar('${clientes[i].cpf}')">Alterar</button>
                <button onclick="excluir('${clientes[i].cpf}')" class="botao-excluir">Excluir</button>
            </td>
        </tr>`
        
        let tr = document.createElement("tr")
        tr.innerHTML = linha

        tbody.appendChild(tr)
    }

}
function limparForm(){
    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""
    document.getElementById("telefone").value = ""
     document.getElementById("nome_do_cachorro").value = ""
      document.getElementById("nome_do_gato").value = ""
}
function exibirDados(clientesExibir = clientes) {
    clientesExibir.sort((a, b) => a.nome.localeCompare(b.nome));

    let tbody = document.querySelector("#table-customers tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < clientesExibir.length; i++) {
        let linha = `
        <tr>
            <td>${clientesExibir[i].nome}</td>
            <td>${clientesExibir[i].cpf}</td>
            <td>${clientesExibir[i].telefone}</td>
            <td>${clientesExibir[i].nome_do_cachorro}</td>
            <td>${clientesExibir[i].nome_do_gato}</td>
            <td>
                <button onclick="alterar('${clientesExibir[i].cpf}')">Alterar</button>
                <button onclick="excluir('${clientesExibir[i].cpf}')" class="botao-excluir">Excluir</button>
            </td>
        </tr>`;
        
        let tr = document.createElement("tr");
        tr.innerHTML = linha;

        tbody.appendChild(tr);
    }
}
function recarregarClientes(){
    fetch("http://localhost:3000/listar", {
        headers: {
            "Content-type": "application/json"
        },
        method: "GET"
    }).then((response) => response.json()) 
    .then((response) => {
        console.log(response)
        clientes = response
        exibirDados()
    }).catch((error) => {
        alert("Erro ao listar os clientes")
    })
}