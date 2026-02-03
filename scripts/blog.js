/* scripts/blog.js */

const container = document.getElementById('blogContainer');

function carregarPosts() {
    fetch('data/artigos.json')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar artigos");
            return response.json();
        })
        .then(posts => {
            criarCardsBlog(posts);
        })
        .catch(error => {
            console.error('Erro:', error);
            container.innerHTML = '<p>Não foi possível carregar os artigos.</p>';
        });
}

function criarCardsBlog(lista) {
    lista.sort((a, b) => new Date(b.data) - new Date(a.data));

    lista.forEach(post => {
        const card = document.createElement('article');
        card.classList.add('blog-card');
        
        card.onclick = () => {
            window.location.href = `artigo.html?id=${post.id}`;
        };

        const dataFormatada = new Date(post.data).toLocaleDateString('pt-BR');
        card.innerHTML = `
            <img src="${post.imagem}" alt="${post.titulo}" loading="lazy">
            
            <div class="blog-content">
                <span class="blog-data">${dataFormatada}</span>
                <h3 class="blog-title">${post.titulo}</h3>
                <p class="blog-resumo">${post.resumo}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarPosts();
    
    const menuBotao = document.querySelector('.menu-toggle');
    const menuLista = document.querySelector('.nav-list');
    if (menuBotao) menuBotao.addEventListener('click', () => menuLista.classList.toggle('active'));
    
    const anoSpan = document.getElementById('currentyear');
    if(anoSpan) anoSpan.textContent = new Date().getFullYear();
});