const container = document.getElementById('artigoContainer');
const params = new URLSearchParams(window.location.search);
const idArtigo = params.get('id');

function carregarArtigo() {
    if (!idArtigo) {
        container.innerHTML = '<p class="erro">Nenhum artigo especificado.</p>';
        return;
    }

    fetch('data/artigos.json')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar banco de artigos");
            return response.json();
        })
        .then(dados => {
        
            const lista = dados.artigos || dados;

            if (!Array.isArray(lista)) {
                throw new Error("Formato de dados inválido");
            }

            const artigoEncontrado = lista.find(a => a.id === idArtigo);
            
            if (artigoEncontrado) {
                renderizarArtigo(artigoEncontrado);
            } else {
                container.innerHTML = '<p class="erro">Artigo não encontrado :(</p>';
            }
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = '<p class="erro">Erro técnico ao carregar o artigo.</p>';
        });
}

function renderizarArtigo(post) {

    const autorNome = post.autor || "Pietro Madril";
    const autorImagem = "images/mestre.jpg"; 
    const autorBio = "Amante de Video Games, RPG, Fantasia e Cultura Japonesa. Estudante de Licenciatura em Teatro da UFSM.";


    container.innerHTML = `
        
        <div class="card-texto">
            <h1 class="artigo-titulo">${post.titulo}</h1>
            <div class="artigo-conteudo">
                ${post.conteudo}
            </div>
        </div>

        <div class="card-autor">
            <img src="${autorImagem}" alt="${autorNome}" class="autor-foto">
            <div class="autor-info">
                <h3>Escrito por ${autorNome}</h3>
                <p class="autor-bio">${autorBio}</p>
                <a href="blog.html" class="btn-voltar">&larr; Voltar para o Blog</a>
            </div>
        </div>
    `;
    
    document.title = `${post.titulo} - Raposa Prateada`;
}

document.addEventListener('DOMContentLoaded', () => {
    carregarArtigo();
    
    const menuBotao = document.querySelector('.menu-toggle');
    const menuLista = document.querySelector('.nav-list');
    if (menuBotao) {
        menuBotao.addEventListener('click', () => menuLista.classList.toggle('active'));
    }
});