export class Facility {
  constructor(
    public nome: string,
    public custoFixo: number,
  ) {}
}

export class Client {
  constructor(
    public nome: string,
    public custos: number[],
  ) {}
}

export function resolverProblemaDasFacilities({
  facilities,
  clients,
}: {
  facilities: Facility[];
  clients: Client[];
}) {
  const n = facilities.length;
  const m = clients.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(Infinity),
  );

  dp[0][0] = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let custoAtendimentoCliente = clients[i - 1].custos[j - 1];

      let custoTotal =
        dp[i - 1][j - 1] +
        custoAtendimentoCliente +
        facilities[j - 1].custoFixo;

      dp[i][j] = Math.min(dp[i][j], custoTotal);
    }
  }

  let melhorCusto = Infinity;
  let numFacilities = -1;
  for (let j = 1; j <= n; j++) {
    if (dp[m][j] < melhorCusto) {
      melhorCusto = dp[m][j];
      numFacilities = j;
    }
  }

  let facilitiesAbertas: string[] = [];
  let clientesAtendidos = m;

  while (clientesAtendidos > 0 && numFacilities > 0) {
    for (let j = 1; j <= numFacilities; j++) {
      const custoAtendimentoCliente =
        clients[clientesAtendidos - 1].custos[j - 1];
      const custoAnterior =
        dp[clientesAtendidos - 1][j - 1] + facilities[j - 1].custoFixo;

      if (
        dp[clientesAtendidos][numFacilities] ===
        custoAnterior + custoAtendimentoCliente
      ) {
        facilitiesAbertas.push(facilities[j - 1].nome);
        clientesAtendidos--;
        numFacilities--;
        break;
      }
    }
  }

  return {
    custoTotal: melhorCusto,
    facilitiesAbertas,
  };
}

export function configurarProblema() {
  const facilities = [
    new Facility("F1", 9),
    new Facility("F2", 2),
    new Facility("F3", 2),
  ];

  const clients = [
    new Client("C1", [18, 10, 10]),
    new Client("C2", [8, 1, 100]),
    new Client("C3", [0, 10, 1]),
  ];

  return { facilities, clients };
}

console.log(resolverProblemaDasFacilities(configurarProblema()));
