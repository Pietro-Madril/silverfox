const gridContainer = document.getElementById('gridProjetos');

function carregarProjetosDetalhadamente() {
    fetch('data/projetos_grade.json')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar JSON");
            return response.json();
        })
        .then(projetos => {
            renderizarGrade(projetos);
        })
        .catch(error => {
            console.error('Erro:', error);
            gridContainer.innerHTML = '<p>Erro ao carregar projetos.</p>';
        });
}

function renderizarGrade(lista) {
    lista.forEach(projeto => {
        const card = document.createElement('article');
        card.classList.add('card-projeto-livre');


        let fichaHTML = '';
        if (projeto.ficha_tecnica) {
            fichaHTML += '<ul>';
            for (const [chave, valor] of Object.entries(projeto.ficha_tecnica)) {
                fichaHTML += `<li><strong>${chave}:</strong> <span>${valor}</span></li>`;
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

    // Rodapé
    const anoSpan = document.getElementById('currentyear');
    if (anoSpan) anoSpan.textContent = new Date().getFullYear();
    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) lastModifiedPara.textContent = `Última atualização: ${document.lastModified}`;
});