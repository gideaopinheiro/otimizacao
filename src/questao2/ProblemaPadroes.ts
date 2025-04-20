export type Solucao = {
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  lucro: number;
};

const folha1Limite = 200;
const folha2Limite = 90;
const tempoLimitePadrao = 5000;

let melhorLucro = -Infinity;
let melhorSolucao: Solucao | null = null;

const startTime = Date.now();

function calcularLucro(x1: number, x2: number, x3: number, x4: number): number {
  const corpos = x1 * 1 + x2 * 2 + x4 * 4;
  const tampas = x1 * 7 + x2 * 3 + x3 * 9 + x4 * 4;

  const latinhas = Math.min(corpos, tampas);
  const corposExcedentes = Math.max(0, corpos - tampas);
  const tampasExcedentes = Math.max(0, tampas - corpos);

  const lucro = 50 * latinhas - 50 * corposExcedentes - 3 * tampasExcedentes;

  return lucro;
}

function explorar(x1 = 0, x2 = 0, x3 = 0, x4 = 0): void {
  let tempoLimite = parseInt(process.argv[2]);
  if (!tempoLimite) {
    tempoLimite = tempoLimitePadrao;
  }
  const tempoAtual = Date.now();
  if (tempoAtual - startTime > tempoLimite) return;

  const folhasTipo1 = x1 + x3 + x4;
  const folhasTipo2 = x2;

  if (folhasTipo1 > folha1Limite || folhasTipo2 > folha2Limite) return;

  const lucro = calcularLucro(x1, x2, x3, x4);

  if (lucro > melhorLucro) {
    melhorLucro = lucro;
    melhorSolucao = { x1, x2, x3, x4, lucro };
  }

  explorar(x1 + 1, x2, x3, x4);
  explorar(x1, x2 + 1, x3, x4);
  explorar(x1, x2, x3 + 1, x4);
  explorar(x1, x2, x3, x4 + 1);
}

explorar();

console.log("Melhor solução encontrada dentro do tempo limite:");
console.log(melhorSolucao);
