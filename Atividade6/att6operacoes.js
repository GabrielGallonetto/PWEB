// Função para realizar as operações
function realizarOperacoes() {
    var num1 = parseFloat(prompt("Digite o primeiro número:"));
    var num2 = parseFloat(prompt("Digite o segundo número:"));

    var soma = num1 + num2;
    var subtracao = num1 - num2;
    var produto = num1 * num2;
    var divisao = num1 / num2;
    var resto = num1 % num2;

    alert("Soma: " + soma.toFixed(2) +
          "\nSubtração: " + subtracao.toFixed(2) +
          "\nProduto: " + produto.toFixed(2) +
          "\nDivisão: " + divisao.toFixed(2) +
          "\nResto: " + resto.toFixed(2));
}