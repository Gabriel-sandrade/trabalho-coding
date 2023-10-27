var quartos = JSON.parse(sessionStorage.getItem('quartos')) || [
    { 'A1': { ocupado: false } },
    { 'A2': { ocupado: false } },
    { 'A3': { ocupado: false } },
    { 'A4': { ocupado: false } },
    { 'A5': { ocupado: false } },
    { 'A6': { ocupado: false } },
    { 'A7': { ocupado: false } },
    { 'A8': { ocupado: false } },
    { 'A9': { ocupado: false } },
    { 'A10': { ocupado: false } },
    { 'B1': { ocupado: false } },
    { 'B2': { ocupado: false } },
    { 'B3': { ocupado: false } },
    { 'B4': { ocupado: false } },
    { 'B5': { ocupado: false } },
    { 'B6': { ocupado: false } },
    { 'B7': { ocupado: false } },
    { 'B8': { ocupado: false } },
    { 'B9': { ocupado: false } },
    { 'B10': { ocupado: false } },
    { 'C1': { ocupado: false } },
    { 'C2': { ocupado: false } },
    { 'C3': { ocupado: false } },
    { 'C4': { ocupado: false } },
    { 'C5': { ocupado: false } },
    { 'C6': { ocupado: false } },
    { 'C7': { ocupado: false } },
    { 'C8': { ocupado: false } },
    { 'C9': { ocupado: false } },
    { 'C10': { ocupado: false } }
];





var clientes = JSON.parse(sessionStorage.getItem('clientes')) || [
    {
        '123.456.789-00': {
            nome: 'João Silva',
            telefone: '(11) 12345-6789',
            email: 'joao.silva@example.com',
            dataDeNascimento: '01/01/1980'
        }
    },
    {
        '987.654.321-00': {
            nome: 'Maria Santos',
            telefone: '(21) 98765-4321',
            email: 'maria.santos@example.com',
            dataDeNascimento: '02/02/1990'
        }
    }
];

var LOG = JSON.parse(sessionStorage.getItem('LOG')) || [];


function formatarCPF() {
    var cpf = document.getElementById('cpf');
    if (cpf) {
        cpf.addEventListener('keydown', function(e) {
            var value = cpf.value.replace(/\D/g, '');
            if (value.length >= 11 && e.key.match(/\d/)) {
                e.preventDefault();
            }
        });
        cpf.addEventListener('input', function(e) {
            var value = cpf.value.replace(/\D/g, '');
            cpf.value = value.replace(/(\d{3})(\d)/, '$1.$2')
                             .replace(/(\d{3})(\d)/, '$1.$2')
                             .replace(/(\d{3})(\d{1,2})/, '$1-$2');
        });
    }
}

function verificarCPF() {
    var cpf = document.getElementById('cpf');
    var botao = document.getElementById('botao');
    if (cpf && botao) {
        botao.addEventListener('click', function() {
            var existe = false;
    
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i][cpf.value]) {
                    existe = true;
                    break;
                }
            }
            
            // Armazena o CPF em sessionStorage
            sessionStorage.setItem('cpf', cpf.value);
            if (existe) {
                // Redireciona para alugar.html se o CPF já existir
                window.location.href = 'alugar.html';
            } else {
                // Redireciona para cadastro.html se o CPF não existir
                window.location.href = 'cadastro.html';
            }
        });
    }
}

function cadastrarCliente() {
    var cpf = sessionStorage.getItem('cpf');
    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;
    var email = document.getElementById('email').value;
    var dataNascimento = document.getElementById('dataNascimento').value;

    var novoCliente = {};
    novoCliente[cpf] = {
        nome: nome,
        telefone: telefone,
        email: email,
        dataDeNascimento: dataNascimento
    };

    clientes.push(novoCliente);
    
    // Atualiza a lista de clientes no sessionStorage
    sessionStorage.setItem('clientes', JSON.stringify(clientes));

    window.location.href = 'alugar.html';
}

function criaFuncaoAlugar(quarto) {
    return function() {
        alugarQuarto(quarto);
    };
}

function criaFuncaoDesocupar(quarto) {
    return function() {
        desocuparQuarto(quarto);
    };
}

function mostraQuartos() {
    var path = window.location.pathname;
    var tabelaOcupados = document.getElementById('tabelaOcupados');
    var tabelaDesocupados = document.getElementById('tabelaDesocupados');

    for (var i = 0; i < quartos.length; i++) {
        for (var quarto in quartos[i]) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.textContent = quarto;
            tr.appendChild(td);

            if (quartos[i][quarto].ocupado) {
                if (path === '/quartos.html') {
                    var tdButton = document.createElement('td');
                    var button = document.createElement('button');
                    button.textContent = 'Desocupar';
                    button.addEventListener('click', criaFuncaoDesocupar(quarto));
                    tdButton.appendChild(button);
                    tr.appendChild(tdButton);

                    tabelaOcupados.appendChild(tr);
                }
            } else {
                if (path === '/alugar.html') {
                    var tdButton = document.createElement('td');
                    var button = document.createElement('button');
                    button.textContent = 'Alugar';
                    button.addEventListener('click', criaFuncaoAlugar(quarto));
                    tdButton.appendChild(button);
                    tr.appendChild(tdButton);
                }
                tabelaDesocupados.appendChild(tr);
            }
        }
    }
}


function alugarQuarto(quarto) {
    for (var i = 0; i < quartos.length; i++) {
        if (quartos[i][quarto]) {
            quartos[i][quarto].ocupado = true;

            var cpf = sessionStorage.getItem('cpf');
            var cliente;
            for (var j = 0; j < clientes.length; j++) {
                if (clientes[j][cpf]) {
                    cliente = clientes[j][cpf];
                    break;
                }
            }

            LOG.push({
                quarto: quarto,
                cliente: cliente,
                dataHora: new Date().toISOString().slice(0, 19)
            });

            sessionStorage.setItem('LOG', JSON.stringify(LOG));
            sessionStorage.setItem('quartos', JSON.stringify(quartos));
            
            alert("O cliente " + cliente.nome + " alugou o quarto " + quarto);

            // Apaga o CPF do cliente de sessionStorage
            sessionStorage.removeItem('cpf');
            
            // Redireciona de volta para index.html
            window.location.href = 'index.html';
            break;
        }
    }
}


function desocuparQuarto(quarto) {
    for (var i = 0; i < quartos.length; i++) {
        if (quartos[i][quarto]) {
            quartos[i][quarto].ocupado = false;

            sessionStorage.setItem('quartos', JSON.stringify(quartos));
            
            location.reload();
            break;
        }
    }
}

function verificarQuartos() {
    console.log("Verificando...");
    var agora = new Date();

    for (var i = 0; i < LOG.length; i++) {
        var log = LOG[i];
        var quarto = log.quarto;
        var dataHoraAluguel = new Date(log.dataHora);

        // Calcula a diferença em milissegundos
        var diferenca = agora - dataHoraAluguel;

        // Converte a diferença de milissegundos para horas
        var horas = diferenca / 1000 / 60 / 60;

        if (horas >= 1) {
            // Se já se passou 1 hora, muda o status do quarto para desocupado
            for (var j = 0; j < quartos.length; j++) {
                if (quartos[j][quarto]) {
                    quartos[j][quarto].ocupado = false;
                    break;
                }
            }
        }
    }

    // Atualiza a lista de quartos no sessionStorage
    sessionStorage.setItem('quartos', JSON.stringify(quartos));
}

// Executa a função verificarQuartos() a cada 10 segundos
setInterval(verificarQuartos, 10000);


function mostrarClientes() {
    var tabela = document.getElementById('tabelaClientes');

    // Limpar a tabela antes de preenchê-la
    tabela.innerHTML = `
        <thead>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Data de nascimento</th>
            <th>Remover</th> <!-- Adicione esta linha -->
        </thead>
    `;

    for (var cliente of clientes) {
        for (var cpf in cliente) {
            var info = cliente[cpf];
            var row = tabela.insertRow();
            var cellCPF = row.insertCell(0);
            var cellNome = row.insertCell(1);
            var cellTelefone = row.insertCell(2);
            var cellEmail = row.insertCell(3);
            var cellDataNascimento = row.insertCell(4);
            var cellRemover = row.insertCell(5); // Adicione esta linha

            cellCPF.innerHTML = cpf;
            cellNome.innerHTML = info.nome;
            cellTelefone.innerHTML = info.telefone;
            cellEmail.innerHTML = info.email;
            cellDataNascimento.innerHTML = info.dataDeNascimento;

            // Adicione esta linha
            cellRemover.innerHTML = `<button onclick="removerCliente('${cpf}')">Remover</button>`;
        }
    }
}


function removerCliente(cpf) {
    console.log("Vai remover");
    console.log(clientes);
    clientes = clientes.filter(cliente => !cliente.hasOwnProperty(cpf));
    sessionStorage.setItem('clientes', JSON.stringify(clientes));
    mostrarClientes();
}


function inicializar() {
    var path = window.location.pathname;

    if (path === '/index.html' || path === '/') {
        formatarCPF();
        verificarCPF();
    } else if (path === '/cadastro.html') {
        cadastrarCliente();
    } else if (path === "/alugar.html" || path === '/quartos.html') {
        mostraQuartos();
        alugarQuarto();
    } else if (path === '/clientes.html') {
        mostrarClientes();
        removerCliente();
    }
}

window.onload = inicializar;
