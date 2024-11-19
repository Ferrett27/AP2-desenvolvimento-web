const url = "https://botafogo-atletas.mange.li/2024-1/";

let jogadores = []

const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        const dados = await resposta.json(); 
        return dados;
    } catch (error){
        alert('Ocorreu um erro')
    }
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

const montaLogin = () => {
    const body = document.body;
    body.innerHTML = ""

    const article = document.createElement("article")
    article.id = "article-login"
    body.appendChild(article)

    const div1 = document.createElement("div")
    div1.id = "div-img"
    document.getElementById("article-login").appendChild(div1)
    const img = document.createElement("img")
    img.id ="escudo"
    img.src = "escudo.png"
    document.getElementById("div-img").appendChild(img)

    const titulo = document.createElement("h1")
    titulo.id = "login-texto"
    titulo.innerHTML = "Elenco botafogo 2024/1"
    document.getElementById("div-img").appendChild(titulo)

    const div2 = document.createElement("div")
    div2.id = "div-input"
    document.getElementById("article-login").appendChild(div2)
    const caixa = document.createElement("input")
    caixa.setAttribute("type", "password")
    caixa.setAttribute("placeholder", "Informe a senha...")
    caixa.id = "senha"
    document.getElementById("div-input").appendChild(caixa)

    const br = document.createElement("br")
    br.id = "pular"
    document.getElementById("div-input").appendChild(br)

    const botao = document.createElement("button")
    botao.innerHTML = "Tentar"
    botao.id = "botao"
    document.getElementById("div-input").appendChild(botao)

    const dica = document.createElement("p")
    dica.innerHTML = "Senha: Libertadores"
    document.getElementById("div-input").appendChild(dica)

    botao.addEventListener("click", e => {
        const senha = document.getElementById("senha").value
        manipulaBotao(senha)
    })

}

const montaHome = () => {
    const body = document.body;
    body.innerHTML = '';

    const header = document.createElement("header");
    header.id = "header";
    body.appendChild(header);

    const titulo = document.createElement("h1");
    titulo.id = "titulo";
    titulo.innerHTML = "Elenco Botafogo 2024/1";
    document.getElementById("header").appendChild(titulo);

    const logout = document.createElement("button");
    logout.id = "logout";
    logout.innerHTML = "logout";
    document.getElementById("header").appendChild(logout);

    const divsele = document.createElement("div");
    divsele.id = "div-selecao"
    body.appendChild(divsele);

    const selecao = document.createElement("select");
    selecao.id = "selecao";
    document.getElementById("div-selecao").appendChild(selecao)

    const opc1 = document.createElement("option")
    opc1.disabled = true
    opc1.setAttribute("selected", "true")
    opc1.innerHTML = "Escolha o elenco"
    document.getElementById("selecao").appendChild(opc1);

    const opcm = document.createElement("option")
    opcm.value = "masculino"
    opcm.innerHTML = "Masculino"
    document.getElementById("selecao").appendChild(opcm);

    const opcf = document.createElement("option")
    opcf.value = "feminino"
    opcf.innerHTML = "Feminino"
    document.getElementById("selecao").appendChild(opcf);

    const opct = document.createElement("option")
    opct.value = "all"
    opct.innerHTML = "Todos"
    document.getElementById("selecao").appendChild(opct);


    const opcoes = document.createElement("div");
    opcoes.id = "grid-opcoes";
    body.appendChild(opcoes)

    const botaom = document.createElement("button")
    botaom.innerHTML = "Masculino"
    botaom.id = "masculino"
    document.getElementById("grid-opcoes").appendChild(botaom)

    const botaof = document.createElement("button")
    botaof.innerHTML = "Feminino"
    botaof.id = "feminino"
    document.getElementById("grid-opcoes").appendChild(botaof)

    const botaot = document.createElement("button")
    botaot.innerHTML = "Todos"
    botaot.id = "todos"
    document.getElementById("grid-opcoes").appendChild(botaot)

    const divfiltro = document.createElement("div")
    divfiltro.id = "div-filtro"
    body.appendChild(divfiltro)

    const filtro =  document.createElement("input")
    filtro.setAttribute("type", "text")
    filtro.setAttribute("placeholder", "Pesquisar atleta...")
    filtro.id = "caixa-texto"
    document.getElementById("div-filtro").appendChild(filtro)

    const container = document.createElement("div")
    container.id = "container"
    body.appendChild(container)

    botaom.addEventListener("click", e =>{
        manipulaJogadoresMasc(container)
    });

    botaof.addEventListener("click", e =>{
        manipulaJogadoresFemi(container)
    });

    botaot.addEventListener("click", e =>{
        manipulaJogadoresTodos(container)
    });

    filtro.addEventListener("input", (e) => {
        const valorInput = e.target.value.toLowerCase();
        const atletasfiltrados = jogadores.filter((atleta) => {
            return (
                atleta.nome.toLowerCase().includes(valorInput)
            );
        });
        zeracard(container);
        atletasfiltrados.forEach((ele) => container.appendChild(montaCard(ele)));
    });

    logout.onclick = () => {
        sessionStorage.removeItem('logado');
        zeracard(container)
        jogadores = []
        montaLogin()
    };

    selecao.onchange = function () {
        const selecaovalor = document.getElementById("selecao").value
        if (selecaovalor == "masculino"){
            manipulaJogadoresMasc(container)
        }
        if (selecaovalor == "feminino"){
            manipulaJogadoresFemi(container)
        }
        if (selecaovalor == "all"){
            manipulaJogadoresTodos(container)
        }
    };
}

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const saiba = document.createElement("h2");
    

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    saiba.innerHTML = "Saiba mais";
    cartao.appendChild(saiba)

    cartao.onclick = manipulaClick;

    cartao.dataset.nome = atleta.nome;
    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;
    
    return cartao
};

const manipulaJogadoresMasc = (e) => {
    if(sessionStorage.getItem('logado')) {
        const m = "masculino"
        zeracard(e)
        jogadores = jogadoresAtual(m)
        pega_json(`${url}${m}`).then( 
        (r) => {
            r.forEach((ele) => e.appendChild(montaCard(ele)) 
            )
        } 
    )
    } else {
        alert('Você precisa estar logado')
    } 
}

const manipulaJogadoresFemi = (e) => {
    if(sessionStorage.getItem('logado')) {
        const f = "feminino"
        zeracard(e)
        jogadores = jogadoresAtual(f)
        pega_json(`${url}${f}`).then( 
        (r) => {
            r.forEach((ele) => e.appendChild(montaCard(ele))
            )
        }
    )
    } else {
        alert('Você precisa estar logado')
    } 
}

const manipulaJogadoresTodos = (e) => {
    if(sessionStorage.getItem('logado')) {
        const t = "all"
        zeracard(e)
        jogadores = jogadoresAtual(t)
        pega_json(`${url}${t}`).then( 
        (r) => {
            r.forEach((ele) => e.appendChild(montaCard(ele))
            )
        }
    )
    } else {
        alert('Você precisa estar logado')
    } 
}

const jogadoresAtual = (e) => {
    jogadores = []
    pega_json(`${url}${e}`).then((r) =>{r.forEach((ele) => jogadores.push(ele))})
    return jogadores
}

const manipulaBotao = (e) => {  
    if (hex_sha256(e) === 'ef9ef6feb1a7173b179a73722b693fa715fed5393d91335d390fb8a2e94485dc'){
        sessionStorage.setItem('logado', 'sim');
        montaHome()
    } else {
        alert('Senha incorreta')
    }
}

const zeracard = (e) => {
    e.innerHTML= ""
}

window.onload = () =>{
    if(sessionStorage.getItem('logado')) {
        montaHome()
    } else {
        montaLogin()
    }
}