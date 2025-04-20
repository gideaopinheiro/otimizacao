type Produto = {
  nome: string;
  lucro: number;
  carne: number;
  cereal: number;
};

const produtos: Produto[] = [
  { nome: "AMGS", lucro: 20, carne: 1, cereal: 5 },
  { nome: "RE", lucro: 30, carne: 4, cereal: 2 },
];

let carneDisponivel = 10_000;
let cerealDisponivel = 30_000;

const eficienciaProduto = (p: Produto) =>
  p.lucro / (p.carne * 4 + p.cereal * 1);

produtos.sort((a, b) => eficienciaProduto(b) - eficienciaProduto(a));

const producao: Record<string, number> = {
  AMGS: 0,
  RE: 0,
};

for (const produto of produtos) {
  const maxPorCarne = Math.floor(carneDisponivel / produto.carne);
  const maxPorCereal = Math.floor(cerealDisponivel / produto.cereal);
  const maxProducao = Math.min(maxPorCarne, maxPorCereal);

  if (maxProducao > 0) {
    producao[produto.nome] = maxProducao;
    carneDisponivel -= maxProducao * produto.carne;
    cerealDisponivel -= maxProducao * produto.cereal;
  }
}

const lucroTotal = producao["AMGS"] * 20 + producao["RE"] * 30;

console.log("Produção ótima aproximada:");
console.log(`AMGS: ${producao["AMGS"]}`);
console.log(`RE: ${producao["RE"]}`);
console.log(`Lucro total: R$ ${lucroTotal}`);
