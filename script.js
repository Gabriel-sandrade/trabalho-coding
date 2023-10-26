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
