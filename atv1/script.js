//busca dados no localStorage ou inicias uma lista
let produtos = JSON.parse(localStorage.getItem("produtos")) ||  [];

const form = document.getElementById("form-produto");
const tabela = document.getElementById("tabela-produto");
const busca =  document.getElementById("busca");

function salvarDados(){
    localStorage.setItem("produtos", Json.stringify(produtos));

}
//limpa a tebela antes de atualizar
function atualizarTabela(){
    tabela.innerHTML = "";
 //filtro de busca
    const filtro = busca.value.toLowerCase();


//percorre todos os produtos
    produtos.forEach((produto, index) => {
        if(produto.nome.toLowerCase().includes(filtro)){
            const tr = docuemnt.createElement("tr");

//colunas da tabela
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.unidade}</td>
                <td>${produto.categoria}</td>
                <td>
                <button class = "acao adicionar" onclick = "alterarQuantidade(${index}, 1">+</button>
                <button class = "acao remover" onclick = "alterarQuantidade(${index}, -1">-</button>
                <button class = "acao remover" onclick = "removerProduto(${index}">Excluir</button>


                
                </td>

            `;

            tabela.appendChild(tr);
        }
    })
}

//adiciona um novo produto


form.addEventListener("submit", function(event){
    event.preventDefault(); //evita o recarregamento da pg

    const nome = document.getElementById("nome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const unidade = docuemnt.getElementById("unidade").value;
    const categoria = document.getElementById("categoria").value;

//cria um novo obj de produto
    const novoProduto = {
        nome,
        quantidade,
        unidade,
        categoria,
    };

//add na lista
    produtos.push(novoProduto);

//atualizar a tabela e salvar
    salvarDados();
    atualizarTabela();

//limpar o formulario
    form.reset();

});

//alterar quantidade do produto
function alterarQuantidade(index,valor){
    produtos[index].quantidade += valor;


//evita quantidade negativa
if(produtos[index].quantidade <0){
    produtos[index].quantidade = 0;
}


salvarDados();
atualizarTabela();
};

//remove um produto da lista
function removerProduto(index){
    produtos.split(index,1);
    salvarDados();
    atualizarTabela();
}

//atualiza a tabela ao digitar no campo de busca
busca.addEventListener("input",atualizarTabela);
atualizarTabela();