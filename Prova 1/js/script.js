//simula um banco de dados em memória
var clientes = []

//guarda o objeto que está sendo alterado
var clienteAlterado = null

function adicionar(){
    //libera para digitar o CPF
    document.getElementById("cpf").disabled = false
    clienteAlterado = null
    mostrarModal()
    limparForm()
}
function alterar(cpf){

    //procurar o cliente que tem o CPF clicado no alterar
    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i]
        if (cliente.cpf == cpf){
            //achou o cliente, entao preenche o form
            document.getElementById("nome").value = cliente.nome
            document.getElementById("cpf").value = cliente.cpf
            document.getElementById("telefone").value = cliente.telefone
            document.getElementById("nomedocachorro").value = cliente.nomedocachorro
            document.getElementById("nomedogato").value = cliente.nomedogato
            clienteAlterado = cliente
        }
    }
    //bloquear o cpf para nao permitir alterá-lo
    document.getElementById("cpf").disabled = true
    mostrarModal()
}
function excluir(cpf){
    if (confirm("Você deseja realmente excluir?")){
        for(let i=0; i < clientes.length; i++){
            let cliente = clientes[i]
            if (cliente.cpf == cpf){
                //remove o elemento encontrado na posição "i"
                clientes.splice(i, 1) 
            }
        }
        exibirDados()
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
    let nomedocachorro = document.getElementById("nomedocachorro").value
    let nomedogato = document.getElementById("nomedogato").value

    //se não estiver alterando ninguém, adiciona no vetor
    if (clienteAlterado == null){
        let cliente = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "nomedocachorro": nomedocachorro,
            "nomedogato": nomedogato
        }
        //adiciona o objeto cliente no vetor de clientes
        clientes.push(cliente)
    }else{
        clienteAlterado.nome = nome
        clienteAlterado.cpf = cpf
        clienteAlterado.telefone = telefone
        clienteAlterado.nomedocachorro = nomedocachorro
        clienteAlterado.nomedogato = nomedogato
    }

    clienteAlterado = null

    //limpa o form
    limparForm()

    ocultarModal()

    exibirDados()
}

function exibirDados(){

    let tbody = document.querySelector("#table-customers tbody")

    //antes de listar os clientes, limpa todas as linhas
    tbody.innerHTML = ""

    for(let i = 0; i < clientes.length; i++){
        let linha = `
        <tr>
            <td>${clientes[i].nome}</td>
            <td>${clientes[i].cpf}</td>
            <td>${clientes[i].telefone}</td>
            <td>${clientes[i].nomedocachorro}</td>
            <td>${clientes[i].nomedogato}</td>
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
    document.getElementById("nomedogato").value = ""
    document.getElementById("nomedogato").value = ""
}