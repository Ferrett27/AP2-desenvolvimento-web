const url = "https://botafogo-atletas.mange.li/2024-1/";

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

document.getElementById('home').style.visibility = 'hidden';

const container = document.getElementById("container");

const zeracard = () => {
    container.innerHTML= ""
}

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    //cookie
    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`;

    //localStorage
    sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset))

    window.location = url;
}

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = "sains-serif";
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);

    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;
    
    return cartao;
};

const manipulaJogadoresMasc = () => {
    if(sessionStorage.getItem('logado')) {
        zeracard()
        pega_json(`${url}masculino`).then( 
        (r) => {
            r.forEach((ele) => container.appendChild(montaCard(ele))
            )
        }
    )
    } else {
        alert('Você precisa estar logado')
    } 
}

const manipulaJogadoresFemi = () => {
    if(sessionStorage.getItem('logado')) {
        zeracard()
        pega_json(`${url}feminino`).then( 
        (r) => {
            r.forEach((ele) => container.appendChild(montaCard(ele))
            )
        }
    )
    } else {
        alert('Você precisa estar logado')
    } 
}

const manipulaJogadoresTodos = () => {
    if(sessionStorage.getItem('logado')) {
        zeracard()
        pega_json(`${url}all`).then( 
        (r) => {
            r.forEach((ele) => container.appendChild(montaCard(ele))
            )
        }
    )
    } else {
        alert('Você precisa estar logado')
    } 
}

const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === 'a54f6754415236f9bae4e0add5446d74'){
        sessionStorage.setItem('logado', 'sim');
        document.getElementById('tela-login').style.visibility = 'hidden';
        document.getElementById('home').style.visibility = "visible";
         
    } else {
        alert('Você errou a senha!!!')
    }
}




document.getElementById('botao').onclick = manipulaBotao;

document.getElementById('masculino').onclick = manipulaJogadoresMasc;
document.getElementById('feminino').onclick = manipulaJogadoresFemi;
document.getElementById('todes').onclick = manipulaJogadoresTodos;

document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');
    zeracard()
    document.getElementById('tela-login').style.visibility = "visible";
    document.getElementById('home').style.visibility = 'hidden';
}