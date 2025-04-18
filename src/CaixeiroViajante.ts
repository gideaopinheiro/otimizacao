export class Mapa {
  private _distancias: number[][];

  constructor(distancias: number[][]) {
    this._distancias = distancias;
  }

  distanciaDe(i: number, j: number): number {
    return this._distancias[i][j];
  }

  get tamanho(): number {
    return this._distancias.length;
  }
}

type ResultadoTSP = {
  custoMinimo: number;
  rota: number[];
};

export function resolverCaixeiroViajantePD(mapa: Mapa): ResultadoTSP {
  const n = mapa.tamanho;
  const dp = Array.from({ length: n }, () => Array(1 << n).fill(Infinity));
  const parent = Array.from({ length: n }, () => Array(1 << n).fill(-1));

  dp[0][1] = 0;

  for (let mask = 1; mask < 1 << n; mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u))) continue;
      for (let v = 0; v < n; v++) {
        if (mask & (1 << v)) continue;
        const nextMask = mask | (1 << v);
        const custo = dp[u][mask] + mapa.distanciaDe(u, v);
        if (custo < dp[v][nextMask]) {
          dp[v][nextMask] = custo;
          parent[v][nextMask] = u;
        }
      }
    }
  }

  let mask = (1 << n) - 1;
  let u = 0;
  for (let i = 1; i < n; i++) {
    if (
      dp[i][mask] + mapa.distanciaDe(i, 0) <
      dp[u][mask] + mapa.distanciaDe(u, 0)
    ) {
      u = i;
    }
  }

  const rota: number[] = [];
  let last = u;
  while (last !== -1) {
    rota.push(last);
    const temp = parent[last][mask];
    mask = mask ^ (1 << last);
    last = temp;
  }

  // rota.push(0);
  rota.reverse();

  return { custoMinimo: dp[u][(1 << n) - 1] + mapa.distanciaDe(u, 0), rota };
}

export function configuraProblemaTSP() {
  const distancias = [
    [0, 10, 15, 20],
    [5, 0, 9, 10],
    [6, 13, 0, 12],
    [8, 8, 9, 0],
  ];
  const mapa = new Mapa(distancias);
  return mapa;
}

const resultadoTSP = resolverCaixeiroViajantePD(configuraProblemaTSP());

console.log("Custo mínimo:", resultadoTSP.custoMinimo);
console.log("Rota (por índice):", resultadoTSP.rota);
