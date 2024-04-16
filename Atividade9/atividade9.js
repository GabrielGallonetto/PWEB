let age = [];
let sex = [];
let opinion = [];

age.length;

for (let i = 0; i < 5; i++) {
  age.push(parseInt(prompt("Digite a idade:")));
  sex.push(parseInt(prompt("Digite o sexo?\n1 - Homem\n2 - Mulher")));
  opinion.push(
    parseInt(
      prompt("Avalie:\n\nótimo = 4\nbom = 3\nregular = 2\npéssimo = 1\n")
    )
  );
}

const survey = (age, sex, opinion) => {
  const ageSum = age.reduce((acumulator, elemento) => acumulator + elemento, 0);
  const ageAvg = ageSum / age.length;

  const maxAge = Math.max(...age);
  const minAge = Math.min(...age);

  const badAvaliationQuantity = opinion.filter((item) => item === 1).length;

  const goodAvaliationPercentage =
    (opinion.filter((item) => item === 4 || item === 3).length /
      opinion.length) *
    100;

  const menQuantity = sex.filter((item) => item === 1).length;
  const womanQuantity = sex.filter((item) => item === 2).length;

  return `
    Média das idades é ${ageAvg}
    Idade da pessoa mais velha é ${maxAge}
    Idade da pessoa mais nova é ${minAge}
    Quantidade de pessoas que responderam péssimo foi ${badAvaliationQuantity}
    Porcentagem de pessoas que responderam ótimo e bom foi ${goodAvaliationPercentage}%
    O total de homens que responderam o questionário foi ${menQuantity}
    O total de mulheres que responderam o questionário foi ${womanQuantity}`;
};

alert(survey(age, sex, opinion));
