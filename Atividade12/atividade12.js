function calcularArea () 
{
    const base = document.getElementById("base").value;
    const altura = document.getElementById("altura").value;
    const resultado = base * altura;

    mostrarResultadoCalculadora(resultado);
    alert(resultado);
}

function mostrarResultadoCalculadora(total) {
    const resultadoCalculadora = document.getElementById("resultado-calculadora-area");
    resultadoCalculadora.innerHTML = `
        <p><strong>Total:</strong> ${total}</p>
    `;
}

function criarContaCorrente() {
    const nomeCorrentista = document.getElementById("nome-correntista-corrente").value;
    const banco = document.getElementById("banco-corrente").value;
    const numeroConta = document.getElementById("numero-conta-corrente").value;
    const saldo = parseFloat(document.getElementById("saldo-corrente").value);
    const saldoEspecial = parseFloat(document.getElementById("saldo-especial-corrente").value);

    const contaCorrente = new ContaCorrenteComSaldoEspecial(nomeCorrentista, banco, numeroConta, saldo, saldoEspecial);

    mostrarResultadoContaCorrente(contaCorrente);
}

function criarContaPoupanca() {
    const nomeCorrentista = document.getElementById("nome-correntista-poupanca").value;
    const banco = document.getElementById("banco-poupanca").value;
    const numeroConta = document.getElementById("numero-conta-poupanca").value;
    const saldo = parseFloat(document.getElementById("saldo-poupanca").value);
    const dataVencimento = document.getElementById("data-vencimento-poupanca").value;

    const contaPoupanca = new ContaPoupancaComJuros(nomeCorrentista, banco, numeroConta, saldo, dataVencimento);

    mostrarResultadoContaPoupanca(contaPoupanca);
}

function mostrarResultadoContaCorrente(conta) {
    console.log("Mostrando resultado da conta corrente:", conta); 
    const resultadoContaCorrente = document.getElementById("resultado-conta-corrente");
    resultadoContaCorrente.innerHTML = `
        <p><strong>Conta Corrente com Saldo Especial:</strong></p>
        <p><strong>Nome do Correntista:</strong> ${conta.getNomeCorrentista()}</p>
        <p><strong>Banco:</strong> ${conta.getBanco()}</p>
        <p><strong>Número da Conta:</strong> ${conta.getNumeroConta()}</p>
        <p><strong>Saldo:</strong> ${conta.getSaldo()}</p>
        <p><strong>Saldo Especial:</strong> ${conta.getSaldoEspecial()}</p>
    `;
}

function mostrarResultadoContaPoupanca(conta) {
    console.log("Mostrando resultado da conta poupança:", conta); 
    const resultadoContaPoupanca = document.getElementById("resultado-conta-poupanca");
    resultadoContaPoupanca.innerHTML = `
        <p><strong>Conta Poupança com Juros:</strong></p>
        <p><strong>Nome do Correntista:</strong> ${conta.getNomeCorrentista()}</p>
        <p><strong>Banco:</strong> ${conta.getBanco()}</p>
        <p><strong>Número da Conta:</strong> ${conta.getNumeroConta()}</p>
        <p><strong>Saldo:</strong> ${conta.getSaldo()}</p>
        <p><strong>Data de Vencimento:</strong> ${conta.getDataVencimento()}</p>
    `;
}
