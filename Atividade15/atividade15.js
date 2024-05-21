
function validar() {
    const form = document.nomeform;
    const nome = form.elements['nome'];
    const email = form.elements['email'];
    const comentario = form.elements['comentario'];
    const pesquisa = form.elements['pesquisa'];

    if (nome.value.length < 10) {
        alert("O nome deve ter pelo menos 10 caracteres.");
        return false;
    }

    if (!email.value.includes('@') || !email.value.includes('.')) {
        alert("O e-mail deve conter '@' e '.'");
        return false;
    }

    if (comentario.value.length < 20) {
        alert("O comentário deve ter pelo menos 20 caracteres.");
        return false;
    }

    var pesquisaSelecionada = false;
    pesquisa.forEach(radio => {
        if (radio.checked) {
            pesquisaSelecionada = true;
        }
    });

    if (!pesquisaSelecionada) {
        alert("Por favor, selecione uma opção de pesquisa.");
        return false;
    }

    const radioS = document.getElementById(radioSim);
    if (radioS.checked == true) {
        alert("Que bom que você voltou a visitar esta página!");
    }
    else {
        alert("Volte sempre à esta página!");
    }

    return true;
}

function limpar() {
    const form = document.nomeform;
    form.reset(); // Limpa o formulário
}
