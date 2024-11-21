const params = new URLSearchParams(window.location.search)

const id = params.get("id");

const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        const dados = await resposta.json(); 
        return dados;
    } catch (error){
        alert('Ocorreu um erro');
    }
}

const montaPagina = (dados) => {
    const body = document.body;
    body.innerHTML = ''

    const article = document.createElement("article");
    article.id = "article-descricao"
    body.append(article)
    
    const divdetalhes = document.createElement("div");
    divdetalhes.id = "detalhes-div"
    document.getElementById("article-descricao").appendChild(divdetalhes)

    const divinformacoes = document.createElement("div");
    divinformacoes.id = "informacoes-div"
    document.getElementById("article-descricao").appendChild(divinformacoes)

    const nome = document.createElement("h1");
    nome.innerHTML = dados.nome
    document.getElementById("detalhes-div").appendChild(nome)

    const imagem = document.createElement("img");
    imagem.src = dados.imagem
    document.getElementById("detalhes-div").appendChild(imagem)

    const informacoes = document.createElement("p");
    informacoes.id = "informacoes"
    informacoes.innerHTML = `No botafogo desde: ${dados.no_botafogo_desde}
    <br> Número de jogos: ${dados.n_jogos} <br> Posição: ${dados.posicao} <br> Altura: ${dados.altura} 
    <br> Nascimento: ${dados.nascimento} <br> Naturalidade: ${dados.naturalidade} `;
    document.getElementById("informacoes-div").appendChild(informacoes)

    const detalhes = document.createElement("p");
    detalhes.innerHTML = dados.detalhes;
    document.getElementById("informacoes-div").appendChild(detalhes)

    const divbotao = document.createElement("div");
    divbotao.id = "botao-div"
    body.appendChild(divbotao)

    const botao = document.createElement("button");
    botao.id = "botao"
    botao.innerHTML = "Voltar"
    document.getElementById("botao-div").appendChild(botao)

    botao.onclick = () => {
        history.back()
    }

}

if(sessionStorage.getItem('logado')) {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
    (r) => montaPagina(r)
);
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado</h1> <br> <button id='botao'>Voltar</button>";
    document.getElementById("botao").onclick = () => {
        window.location = "index.html"
    }
} 

const achaCookie = ( chave ) => {
    const lista = document.cookie.split("; ");
    const par = lista.find(
        ( e ) => e.startsWith(`${chave}=`)
    )

    return par.split("=")[1]
}