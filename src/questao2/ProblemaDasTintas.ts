type Fonte = "SolA" | "SolB" | "SEC" | "COR";

type Solucao = {
  [k in Fonte]: number;
};

interface Componente {
  SEC: number;
  COR: number;
}

const precos: Record<Fonte, number> = {
  SolA: 1.5,
  SolB: 1.0,
  SEC: 4.0,
  COR: 6.0,
};

const composicao: Record<Fonte, Componente> = {
  SolA: { SEC: 0.3, COR: 0.7 },
  SolB: { SEC: 0.6, COR: 0.4 },
  SEC: { SEC: 1.0, COR: 0.0 },
  COR: { SEC: 0.0, COR: 1.0 },
};

const demandas = {
  SR: 1000,
  SN: 250,
};

const restricoes = {
  SR: { minSEC: 0.25, minCOR: 0.5 },
  SN: { minSEC: 0.2, minCOR: 0.5 },
};

function inicializarSolucao(): { SR: Solucao; SN: Solucao } {
  return {
    SR: { SolA: 0, SolB: 1000, SEC: 0, COR: 0 },
    SN: { SolA: 0, SolB: 250, SEC: 0, COR: 0 },
  };
}

function calcularTotais(s: Solucao): {
  SEC: number;
  COR: number;
  custo: number;
} {
  let SEC = 0;
  let COR = 0;
  let custo = 0;
  for (const fonte of Object.keys(s) as Fonte[]) {
    const litros = s[fonte];
    SEC += litros * composicao[fonte].SEC;
    COR += litros * composicao[fonte].COR;
    custo += litros * precos[fonte];
  }
  return { SEC, COR, custo };
}

function valida(s: Solucao, tipo: "SR" | "SN"): boolean {
  const total = Object.values(s).reduce((a, b) => a + b, 0);
  const { SEC, COR } = calcularTotais(s);
  const percSEC = SEC / total;
  const percCOR = COR / total;
  const r = restricoes[tipo];
  return percSEC >= r.minSEC && percCOR >= r.minCOR;
}

function ajustar(s: Solucao, tipo: "SR" | "SN"): Solucao {
  const copia: Solucao = { ...s };
  let tentativas = 1000;

  while (!valida(copia, tipo) && tentativas-- > 0) {
    const total = Object.values(copia).reduce((a, b) => a + b, 0);
    const { SEC, COR } = calcularTotais(copia);

    const percSEC = SEC / total;
    const percCOR = COR / total;

    const faltaSEC = restricoes[tipo].minSEC - percSEC;
    const faltaCOR = restricoes[tipo].minCOR - percCOR;

    if (faltaSEC > 0) {
      copia.SEC += 1;
    } else if (faltaCOR > 0) {
      copia.COR += 1;
    } else {
      break;
    }

    if (copia.SolB >= 1) copia.SolB -= 1;
  }

  return copia;
}

function custoTotal(sol: { SR: Solucao; SN: Solucao }): number {
  const c1 = calcularTotais(sol.SR).custo;
  const c2 = calcularTotais(sol.SN).custo;
  return c1 + c2;
}

function executar() {
  const solucaoInicial = inicializarSolucao();
  const ajustadoSR = ajustar(solucaoInicial.SR, "SR");
  const ajustadoSN = ajustar(solucaoInicial.SN, "SN");

  const total = custoTotal({ SR: ajustadoSR, SN: ajustadoSN });

  console.log("Mistura para tinta SR:");
  console.log(ajustadoSR);
  console.log("Mistura para tinta SN:");
  console.log(ajustadoSN);
  console.log(`Custo total: R$ ${total.toFixed(2)}`);
}

executar();
