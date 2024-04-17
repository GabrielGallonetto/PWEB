class Pesquisa {
  constructor() {
    this.idades = [];
    this.sexos = [];
    this.opinioes = [];
  }

  iniciarPesquisa() {
    const iniciarPesquisa = confirm("Clique em OK para iniciar a pesquisa");
    if (iniciarPesquisa) {
      this.realizarPesquisa();
    } else {
      alert("Pesquisa cancelada!");
    }
  }

  realizarPesquisa() {
    for (let respostas = 0; respostas < 2; respostas++) {
      const idade = parseInt(prompt("Digite a idade da pessoa:"));
      const sexo = prompt("Digite o sexo (M/F):");
      const opiniao = parseInt(prompt("Digite a opinião (1=Péssimo, 2=Regular, 3=Bom, 4=Ótimo):"));
      this.idades.push(idade);
      this.sexos.push(sexo);
      this.opinioes.push(opiniao);
    }
  }

  media() {
    const totalIdades = this.idades.reduce((acc, idade) => acc + idade, 0);
    const media = totalIdades / this.idades.length;
    alert(`Média de idade: ${media.toFixed(2)} anos`);
  }

  pessoaMaisVelha() {
    const idadeMaisVelha = Math.max(...this.idades);
    alert(`Idade da pessoa mais velha: ${idadeMaisVelha} anos`);
  }

  pessoaMaisNova() {
    const idadeMaisNova = Math.min(...this.idades);
    alert(`Idade da pessoa mais nova: ${idadeMaisNova} anos`);
  }

  quantidadePessimo() {
    const quantidadePessimo = this.opinioes.filter(opiniao => opiniao === 1).length;
    alert(`Quantidade de pessoas que responderam "péssimo": ${quantidadePessimo}`);
  }

  porcentagemOtimoBom() {
    const otimoBomCount = this.opinioes.filter(opiniao => opiniao === 4 || opiniao === 3).length;
    const porcentagem = (otimoBomCount / this.opinioes.length) * 100;
    alert(`Porcentagem de pessoas que responderam "ótimo" e "bom": ${porcentagem.toFixed(2)}%`);
  }

  numeroMulheresHomens() {
    const mulheres = this.sexos.filter(sexo => sexo.toUpperCase() === 'F').length;
    const homens = this.sexos.filter(sexo => sexo.toUpperCase() === 'M').length;
    alert(`Número de mulheres: ${mulheres}\nNúmero de homens: ${homens}`);
  }
}

const pesquisa = new Pesquisa();

window.onload = function () {
  pesquisa.iniciarPesquisa();
};
