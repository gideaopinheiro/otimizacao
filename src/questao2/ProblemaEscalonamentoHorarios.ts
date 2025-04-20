const demanda: number[] = [3, 2, 4, 4, 3, 1, 2];

const totalTurnos = 7;

const gerarCoberturaTurnos = (): number[][] => {
  const turnos: number[][] = [];

  for (let inicio = 0; inicio < totalTurnos; inicio++) {
    const cobertura = Array(7).fill(0);
    for (let offset = 0; offset < 5; offset++) {
      cobertura[(inicio + offset) % 7] = 1;
    }
    turnos.push(cobertura);
  }

  return turnos;
};

const turnos = gerarCoberturaTurnos();

let melhorTotal = Infinity;
let melhorSolucao: number[] = [];

function branchAndBound(
  turnoAtual: number,
  alocacao: number[],
  cobertura: number[],
): void {
  if (turnoAtual === totalTurnos) {
    const coberta = cobertura.every((v, i) => v >= demanda[i]);
    if (coberta) {
      const totalEnfermeiras = alocacao.reduce((a, b) => a + b, 0);
      if (totalEnfermeiras < melhorTotal) {
        melhorTotal = totalEnfermeiras;
        melhorSolucao = [...alocacao];
      }
    }
    return;
  }

  const limiteSuperior = Math.max(...demanda);
  for (let n = 0; n <= limiteSuperior; n++) {
    const novaCobranca = [...cobertura];
    for (let i = 0; i < 7; i++) {
      novaCobranca[i] += turnos[turnoAtual][i] * n;
    }

    const novaAlocacao = [...alocacao, n];

    const totalAtual = novaAlocacao.reduce((a, b) => a + b, 0);
    if (totalAtual >= melhorTotal) continue; // poda

    branchAndBound(turnoAtual + 1, novaAlocacao, novaCobranca);
  }
}

branchAndBound(0, [], Array(7).fill(0));

console.log("Melhor total de enfermeiras:", melhorTotal);
for (let i = 0; i < melhorSolucao.length; i++) {
  console.log(`Turno começando no dia ${i}: ${melhorSolucao[i]} enfermeiras`);
}
