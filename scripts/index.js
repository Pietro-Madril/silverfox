const container = document.getElementById('spotlightContainer');

function buscarProjetos() {
    fetch('data/projetos.json')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar JSON");
            return response.json();
        })
        .then(projetos => {
            criarCards(projetos);
        })
        .catch(error => {
            console.error('Erro:', error);
            container.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
        });
}

function criarCards(listaDeProjetos) {
    listaDeProjetos.forEach(projeto => {
        
        const card = document.createElement('article');
        card.classList.add('card');

        card.onclick = () => {
            window.location.href = 'projetos.html';
        };

        card.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}" loading="lazy">
            <div class="card-content">
                <h3 class="card-title">${projeto.titulo}</h3>
                <p class="card-desc">${projeto.descricao}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buscarProjetos();
    atualizarRodape();
});

function atualizarRodape() {
    const anoSpan = document.getElementById('currentyear');
    if (anoSpan) anoSpan.textContent = new Date().getFullYear();

    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) lastModifiedPara.textContent = `Última atualização: ${document.lastModified}`;
}

const menuBotao = document.querySelector('.menu-toggle');
const menuLista = document.querySelector('.nav-list');

if (menuBotao) {
    menuBotao.addEventListener('click', () => {
        menuLista.classList.toggle('active');
    });
}