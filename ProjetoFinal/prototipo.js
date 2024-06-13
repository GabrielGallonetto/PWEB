// Configurações do aplicativo
const Config = {
    categoriasExistentes: ['Trabalho', 'Família', 'Faculdade'],
    prioridades: ['Baixa', 'Média', 'Alta'],
    status: ['Pendente', 'Em Andamento', 'Concluído']
};

// Seletores de elementos HTML
const tabelaEventos = document.querySelector('#tabelaEventos tbody');
const feedback = document.querySelector('#feedback');
const inputPesquisa = document.getElementById('pesquisaEvento');
const filtroStatus = document.getElementById('filtroStatus');
const botaoAtualizar = document.getElementById('atualizarEventos');
const botaoAdicionar = document.getElementById('adicionarEvento');
const calendario = document.getElementById('calendar');

// Função para carregar eventos do localStorage
function carregarEventos() {
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    return eventos;
}

// Função para salvar eventos no localStorage
function salvarEventos(eventos) {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Função para salvar um evento no localStorage
function salvarEventoLocalStorage(evento) {
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    // Verifica se já existe um evento com o mesmo ID e o substitui
    const index = eventos.findIndex(e => e.id === evento.id);
    if (index !== -1) {
        eventos[index] = evento;
    } else {
        eventos.push(evento);
    }

    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Função para excluir um evento do localStorage
function excluirEventoLocalStorage(id) {
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos = eventos.filter(evento => evento.id !== id);
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Função para calcular a urgência do evento e retornar um elemento visual
function calcularUrgencia(dataEvento) {
    let hoje = new Date();
    let data = new Date(dataEvento);
    let diffDias = Math.floor((data - hoje) / (1000 * 60 * 60 * 24));

    let cor = 'green';
    let texto = 'Baixa'; // Texto padrão para baixa urgência

    if (diffDias <= 7 && diffDias > 3) {
        cor = 'yellow';
        texto = 'Média';
    } else if (diffDias <= 3) {
        cor = 'red';
        texto = 'Alta';
    }

    const divUrgencia = document.createElement('div');
    divUrgencia.className = 'urgencia';
    divUrgencia.style.backgroundColor = cor;
    divUrgencia.textContent = texto;

    return divUrgencia;
}

// Função para criar uma linha de evento
function criarLinhaEvento(evento = {}) {
    const linha = document.createElement('tr');
    linha.dataset.id = evento.id || '';

    // Criação das células da linha
    const tdId = document.createElement('td');
    const inputId = document.createElement('input');
    inputId.type = 'text';
    inputId.value = evento.id || '';
    inputId.disabled = true;
    tdId.appendChild(inputId);
    linha.appendChild(tdId);

    const tdTitulo = document.createElement('td');
    const inputTitulo = document.createElement('input');
    inputTitulo.type = 'text';
    inputTitulo.value = evento.titulo || '';
    tdTitulo.appendChild(inputTitulo);
    linha.appendChild(tdTitulo);

    const tdCategoria = document.createElement('td');
    const selectCategoria = document.createElement('select');
    Config.categoriasExistentes.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        if (categoria === evento.categoria) {
            option.selected = true;
        }
        selectCategoria.appendChild(option);
    });
    tdCategoria.appendChild(selectCategoria);
    linha.appendChild(tdCategoria);

    const tdData = document.createElement('td');
    const inputData = document.createElement('input');
    inputData.type = 'date';
    inputData.value = evento.data || '';
    inputData.min = new Date().toISOString().split('T')[0]; // Define a data mínima como hoje
    tdData.appendChild(inputData);
    linha.appendChild(tdData);

    const tdDescricao = document.createElement('td');
    const inputDescricao = document.createElement('input');
    inputDescricao.type = 'text';
    inputDescricao.value = evento.descricao || '';
    tdDescricao.appendChild(inputDescricao);
    linha.appendChild(tdDescricao);

    const tdPrioridade = document.createElement('td');
    const selectPrioridade = document.createElement('select');
    Config.prioridades.forEach(prioridade => {
        const option = document.createElement('option');
        option.value = prioridade;
        option.textContent = prioridade;
        if (prioridade === evento.prioridade) {
            option.selected = true;
        }
        selectPrioridade.appendChild(option);
    });
    tdPrioridade.appendChild(selectPrioridade);
    linha.appendChild(tdPrioridade);

    const tdStatus = document.createElement('td');
    const selectStatus = document.createElement('select');
    Config.status.forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        if (status === evento.status) {
            option.selected = true;
        }
        selectStatus.appendChild(option);
    });
    tdStatus.appendChild(selectStatus);
    linha.appendChild(tdStatus);

    // Criação da célula de urgência
    const tdUrgencia = document.createElement('td');
    const divUrgencia = calcularUrgencia(evento.data);
    tdUrgencia.appendChild(divUrgencia);
    linha.appendChild(tdUrgencia);

    // Criação da célula de ações
    const tdAcoes = document.createElement('td');
    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.addEventListener('click', () => salvarEvento(linha));
    tdAcoes.appendChild(btnSalvar);

    const btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.addEventListener('click', () => cancelarAdicao(linha));
    tdAcoes.appendChild(btnCancelar);

    if (evento.id) { // Adicionar botão Excluir apenas para eventos existentes
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirEvento(evento.id));
        tdAcoes.appendChild(btnExcluir);
    }

    linha.appendChild(tdAcoes);

    tabelaEventos.appendChild(linha);
}

// Função para adicionar uma linha de evento
function adicionarLinhaEvento() {
    criarLinhaEvento();
}

// Função para atualizar a tabela de eventos
function atualizarTabela() {
    let eventos = carregarEventos();
    tabelaEventos.innerHTML = '';
    eventos.forEach(evento => {
        criarLinhaEvento(evento);
    });
}

// Função para salvar um evento
function salvarEvento(linha) {
    const id = linha.dataset.id || null;
    const novoEvento = {
        id: id || Date.now(), // Gera um ID único se não houver ID definido
        titulo: linha.querySelector('td:nth-child(2) input').value,
        categoria: linha.querySelector('td:nth-child(3) select').value,
        data: linha.querySelector('td:nth-child(4) input').value,
        descricao: linha.querySelector('td:nth-child(5) input').value,
        prioridade: linha.querySelector('td:nth-child(6) select').value,
        status: linha.querySelector('td:nth-child(7) select').value
    };

    salvarEventoLocalStorage(novoEvento);

    if (id) {
        mostrarFeedback('Evento atualizado com sucesso!', 'alert alert-success');
    } else {
        linha.dataset.id = novoEvento.id; // Adiciona o ID gerado
        mostrarFeedback('Evento salvo com sucesso!', 'alert alert-success');
    }

    atualizarTabela();
}

// Função para cancelar a adição ou edição de um evento
function cancelarAdicao(linha) {
    if (!linha.dataset.id) { // Remove a linha apenas se for uma adição cancelada
        linha.remove();
    }
}

// Função para mostrar feedback ao usuário
function mostrarFeedback(mensagem, classe) {
    feedback.textContent = mensagem;
    feedback.className = classe;
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// Função para atualizar a tabela de eventos com eventos fornecidos
function atualizarTabelaEventos(eventos) {
    // Limpa o conteúdo atual da tabela
    tabelaEventos.innerHTML = '';

    // Itera sobre cada evento e cria uma linha na tabela para cada um
    eventos.forEach(evento => {
        const linha = document.createElement('tr');
        linha.dataset.id = evento.id || '';

        // Criação das células da linha
        const tdId = document.createElement('td');
        const inputId = document.createElement('input');
        inputId.type = 'text';
        inputId.value = evento.id || '';
        inputId.disabled = true;
        tdId.appendChild(inputId);
        linha.appendChild(tdId);

        const tdTitulo = document.createElement('td');
        const inputTitulo = document.createElement('input');
        inputTitulo.type = 'text';
        inputTitulo.value = evento.titulo || '';
        tdTitulo.appendChild(inputTitulo);
        linha.appendChild(tdTitulo);

        const tdCategoria = document.createElement('td');
        const selectCategoria = document.createElement('select');
        Config.categoriasExistentes.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            if (categoria === evento.categoria) {
                option.selected = true;
            }
            selectCategoria.appendChild(option);
        });
        tdCategoria.appendChild(selectCategoria);
        linha.appendChild(tdCategoria);

        const tdData = document.createElement('td');
        const inputData = document.createElement('input');
        inputData.type = 'date';
        inputData.value = evento.data || '';
        inputData.min = new Date().toISOString().split('T')[0]; // Define a data mínima como hoje
        tdData.appendChild(inputData);
        linha.appendChild(tdData);

        const tdDescricao = document.createElement('td');
        const inputDescricao = document.createElement('input');
        inputDescricao.type = 'text';
        inputDescricao.value = evento.descricao || '';
        tdDescricao.appendChild(inputDescricao);
        linha.appendChild(tdDescricao);

        const tdPrioridade = document.createElement('td');
        const selectPrioridade = document.createElement('select');
        Config.prioridades.forEach(prioridade => {
            const option = document.createElement('option');
            option.value = prioridade;
            option.textContent = prioridade;
            if (prioridade === evento.prioridade) {
                option.selected = true;
            }
            selectPrioridade.appendChild(option);
        });
        tdPrioridade.appendChild(selectPrioridade);
        linha.appendChild(tdPrioridade);

        const tdStatus = document.createElement('td');
        const selectStatus = document.createElement('select');
        Config.status.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === evento.status) {
                option.selected = true;
            }
            selectStatus.appendChild(option);
        });
        tdStatus.appendChild(selectStatus);
        linha.appendChild(tdStatus);

        // Criação da célula de urgência
        const tdUrgencia = document.createElement('td');
        const divUrgencia = calcularUrgencia(evento.data);
        tdUrgencia.appendChild(divUrgencia);
        linha.appendChild(tdUrgencia);

        // Criação da célula de ações
        const tdAcoes = document.createElement('td');
        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        btnSalvar.addEventListener('click', () => salvarEvento(linha));
        tdAcoes.appendChild(btnSalvar);

        const btnCancelar = document.createElement('button');
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', () => cancelarAdicao(linha));
        tdAcoes.appendChild(btnCancelar);

        if (evento.id) { // Adicionar botão Excluir apenas para eventos existentes
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => excluirEvento(evento.id));
            tdAcoes.appendChild(btnExcluir);
        }

        linha.appendChild(tdAcoes);

        // Adiciona a linha à tabela de eventos
        tabelaEventos.appendChild(linha);
    });
}


// Função para pesquisar eventos na tabela
function pesquisarEventos() {
    const textoPesquisa = inputPesquisa.value.trim().toLowerCase();
    const statusFiltro = filtroStatus.value;

    let eventos = carregarEventos();
    let eventosFiltrados = eventos.filter(evento => {
        const titulo = evento.titulo.toLowerCase();
        const descricao = evento.descricao.toLowerCase();
        const categoria = evento.categoria.toLowerCase();

        // Verifica se o texto de pesquisa está presente no título, descrição ou
        return titulo.includes(textoPesquisa) ||
               descricao.includes(textoPesquisa) ||
               categoria.includes(textoPesquisa);
    });

    // Filtra também pelo status, se selecionado
    if (statusFiltro) {
        eventosFiltrados = eventosFiltrados.filter(evento => evento.status === statusFiltro);
    }

    // Atualiza a tabela com os eventos filtrados
    atualizarTabelaEventos(eventosFiltrados);
}

// Função para buscar eventos com base no status
function buscarEventos(status = '') {
    const eventos = carregarEventos();
    const eventosFiltrados = status ? eventos.filter(evento => evento.status === status) : eventos;

    // Atualiza a tabela com os eventos filtrados
    atualizarTabelaEventos(eventosFiltrados);
}

// Função para inicializar a tabela de eventos
function inicializarTabelaEventos() {
    let eventos = carregarEventos();
    eventos.forEach(evento => {
        criarLinhaEvento(evento);
    });

    // Adiciona event listeners
    botaoAdicionar.addEventListener('click', adicionarLinhaEvento);
    inputPesquisa.addEventListener('input', pesquisarEventos);
    filtroStatus.addEventListener('change', () => buscarEventos(filtroStatus.value));
}



// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    inicializarTabelaEventos();
    adicionarEventListeners();
});

// Função para adicionar um evento
function adicionarEvento() {
    let tbody = document.querySelector('#tabelaEventos tbody');
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>#</td>
        <td><input type="text" id="novoTitulo" placeholder="Título"></td>
        <td>
            <select id="novaPrioridade">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
            </select>
        </td>
        <td><input type="date" id="novaData"></td>
        <td><input type="text" id="novaDescricao" placeholder="Descrição"></td>
        <td>
            <select id="novoStatus">
                <option value="Pendente">Pendente</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
            </select>
        </td>
        <td></td>
        <td><button onclick="salvarNovoEvento()">Salvar</button></td>
    `;
    tbody.appendChild(tr);
}

// Função para salvar o novo evento
function salvarNovoEvento() {
    let eventos = carregarEventos();
    let novoEvento = {
        id: eventos.length ? eventos[eventos.length - 1].id + 1 : 1,
        titulo: document.getElementById('novoTitulo').value,
        categoria: document.getElementById('novaCategoria').value,
        data: document.getElementById('novaData').value,
        descricao: document.getElementById('novaDescricao').value,
        prioridade: document.getElementById('novaPrioridade').value,
        status: document.getElementById('novoStatus').value
    };
    eventos.push(novoEvento);
    salvarEventos(eventos);
    atualizarTabela();
}

// Função para atualizar a lista de eventos
function atualizarEventos() {
    atualizarTabela();
}

// Função para limpar eventos
function limparEventos() {
    localStorage.removeItem('eventos');
    atualizarTabela();
}

// Função para editar um evento
function editarEvento(id) {
    let eventos = carregarEventos();
    let evento = eventos.find(evento => evento.id === id);
    if (evento) {
        evento.titulo = prompt("Título do evento:", evento.titulo);
        evento.categoria = prompt("Categoria do evento:", evento.categoria);
        evento.data = prompt("Data do evento:", evento.data);
        evento.descricao = prompt("Descrição do evento:", evento.descricao);
        evento.prioridade = prompt("Prioridade do evento:", evento.prioridade);
        evento.status = prompt("Status do evento:", evento.status);
        salvarEventos(eventos);
        atualizarTabela();
    }
}

// Função para remover um evento
function removerEvento(id) {
    let eventos = carregarEventos();
    eventos = eventos.filter(evento => evento.id !== id);
    salvarEventos(eventos);
    atualizarTabela();
}

// Funções de manipulação de DOM e Event Listeners
function adicionarEventListeners() {
    inputPesquisa.addEventListener('input', pesquisarEventos);
    botaoAdicionar.addEventListener('click', adicionarLinhaEvento);
    filtroStatus.addEventListener('change', () => buscarEventos(filtroStatus.value));

    if (botaoAtualizar) {
        botaoAtualizar.addEventListener('click', () => {
            if (document.title === 'Finalizados') {
                atualizarEventosConcluidos();
            } else {
                atualizarTabela();
            }
        });
    }
}

inputPesquisa.addEventListener('input', pesquisarEventos);

filtroStatus.addEventListener('change', () => buscarEventos(filtroStatus.value));