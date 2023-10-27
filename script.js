var clientes = [
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

function verificarCPF() {
    var cpf = document.getElementById('cpf').value;
    var existe = false;

    for (var i = 0; i < clientes.length; i++) {
        if (clientes[i][cpf]) {
            existe = true;
            break;
        }
    }

    if (existe) {
        // Redireciona para a página se o CPF já existir
        window.location.href = 'pagina_existente.html';
    } else {
        // Redireciona para outra página se o CPF não existir
        window.location.href = 'pagina_nao_existente.html';
    }
}

window.onload = function() {
    var botao = document.getElementById('botao');
    botao.addEventListener('click', verificarCPF);
};








function formatarCPF() {
    var cpf = document.getElementById('cpf');
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

window.onload = formatarCPF;
