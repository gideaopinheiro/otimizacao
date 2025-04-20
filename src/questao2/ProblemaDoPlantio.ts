type Cultura = {
  nome: string;
  aguaPorHa: number;
  lucroPorHa: number;
  limiteTotal: number;
};

const culturas: Cultura[] = [
  { nome: "milho", aguaPorHa: 200, lucroPorHa: 500, limiteTotal: 150 },
  { nome: "arroz", aguaPorHa: 300, lucroPorHa: 700, limiteTotal: 150 },
  { nome: "feijao", aguaPorHa: 250, lucroPorHa: 600, limiteTotal: 150 },
];

const numFazendas = 3;
const areaPorFazenda = 100;
const aguaPorFazenda = 1000;

const totalArea = numFazendas * areaPorFazenda;
const totalAgua = numFazendas * aguaPorFazenda;

const eficienciaCultura = (c: Cultura) => c.lucroPorHa / c.aguaPorHa;
culturas.sort((a, b) => eficienciaCultura(b) - eficienciaCultura(a));

let melhorLucro = 0;
let melhorProporcao: number[] = [];

for (let milho = 0; milho <= totalArea; milho++) {
  for (let arroz = 0; arroz <= totalArea - milho; arroz++) {
    const feijao = totalArea - milho - arroz;

    const propMilho = milho / totalArea;
    const propArroz = arroz / totalArea;
    const propFeijao = feijao / totalArea;

    if (
      milho > culturas[0].limiteTotal ||
      arroz > culturas[1].limiteTotal ||
      feijao > culturas[2].limiteTotal
    ) {
      continue;
    }

    const aguaTotal =
      milho * culturas[0].aguaPorHa +
      arroz * culturas[1].aguaPorHa +
      feijao * culturas[2].aguaPorHa;

    if (aguaTotal > totalAgua) continue;

    const lucro =
      milho * culturas[0].lucroPorHa +
      arroz * culturas[1].lucroPorHa +
      feijao * culturas[2].lucroPorHa;

    if (lucro > melhorLucro) {
      melhorLucro = lucro;
      melhorProporcao = [propMilho, propArroz, propFeijao];
    }
  }
}

const resultado: Record<string, number[]> = {
  milho: [],
  arroz: [],
  feijao: [],
};

for (let i = 0; i < numFazendas; i++) {
  resultado["milho"].push(melhorProporcao[0] * areaPorFazenda);
  resultado["arroz"].push(melhorProporcao[1] * areaPorFazenda);
  resultado["feijao"].push(melhorProporcao[2] * areaPorFazenda);
}

console.log("Área plantada por fazenda (em ha):");
for (let i = 0; i < numFazendas; i++) {
  console.log(`Fazenda ${i + 1}:`);
  console.log(`  Milho:  ${resultado["milho"][i].toFixed(2)}`);
  console.log(`  Arroz:  ${resultado["arroz"][i].toFixed(2)}`);
  console.log(`  Feijão: ${resultado["feijao"][i].toFixed(2)}`);
}
console.log(`Lucro total estimado: R$ ${melhorLucro.toFixed(2)}`);
