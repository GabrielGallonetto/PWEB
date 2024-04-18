function calcularIMC() {
  event.preventDefault()
  
  var altura = parseFloat(document.getElementById('altura').value);
  var peso = parseFloat(document.getElementById('peso').value);
  if (isNaN(altura) || isNaN(peso)) {
    alert('Por favor, insira valores válidos para altura e peso.');
    return;
  }
  var imc = peso / (altura * altura);
  var classificacao, obesidade;
  if (imc < 18.5) {
    classificacao = 'Abaixo do Peso';
    obesidade = 'Grau 0';
  } else if (imc < 25) {
    classificacao = 'Peso Normal';
    obesidade = 'Grau 0';
  } else if (imc < 30) {
    classificacao = 'Sobrepeso';
    obesidade = 'Grau I';
  } else if (imc < 35) {
    classificacao = 'Obesidade';
    obesidade = 'Grau II';
  } else if (imc < 40) {
    classificacao = 'Obesidade Severa';
    obesidade = 'Grau III';
  } else {
    classificacao = 'Obesidade Mórbida';
    obesidade = 'Grau IV';
  }
  document.getElementById('resultado').innerHTML =
    `<p><strong>RESULTADOS</strong></p>
 <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
 <p><strong>CLASSIFICAÇÃO:</strong> ${classificacao}</p>
 <p><strong>OBESIDADE (GRAU):</strong> ${obesidade}</p>`;
}
