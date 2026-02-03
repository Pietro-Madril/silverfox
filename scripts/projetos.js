const gridContainer = document.getElementById('gridProjetos');

function carregarProjetosDetalhadamente() {
    
    fetch('data/projetos.json')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar JSON");
            return response.json();
        })
        .then(dados => {
          
            const lista = dados.projetos || dados;

            if (Array.isArray(lista)) {
                renderizarGrade(lista);
            } else {
                console.error("Formato inválido:", dados);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            gridContainer.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
        });
}

function renderizarGrade(lista) {
    if(!gridContainer) return; 
    gridContainer.innerHTML = ''; 

    lista.forEach(projeto => {
        const card = document.createElement('article');
        card.classList.add('card-projeto-livre'); 

        let fichaHTML = '';
        
        if (projeto.ficha_tecnica) {
            fichaHTML += '<ul>';
            
            if (Array.isArray(projeto.ficha_tecnica)) {
                projeto.ficha_tecnica.forEach(dado => {
                    fichaHTML += `<li><strong>${dado.item}:</strong> <span>${dado.texto}</span></li>`;
                });
            } 

            else if (typeof projeto.ficha_tecnica === 'object') {
                for (const [chave, valor] of Object.entries(projeto.ficha_tecnica)) {
                    fichaHTML += `<li><strong>${chave}:</strong> <span>${valor}</span></li>`;
                }
            }
            fichaHTML += '</ul>';
        }

        card.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}" loading="lazy">
            
            <div class="conteudo-card">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
            </div>

            <div class="ficha-tecnica">
                ${fichaHTML}
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProjetosDetalhadamente();
    
    const menuBotao = document.querySelector('.menu-toggle');
    const menuLista = document.querySelector('.nav-list');
    if (menuBotao) {
        menuBotao.addEventListener('click', () => {
            menuLista.classList.toggle('active');
        });
    }
});