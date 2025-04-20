type Grafo = Record<number, Set<number>>;

function encontrarCliqueMaxima(grafo: Grafo): number[] {
  const vertices = Object.keys(grafo).map(Number);
  let melhorClique: number[] = [];

  function ehClique(possivelClique: number[]): boolean {
    for (let i = 0; i < possivelClique.length; i++) {
      for (let j = i + 1; j < possivelClique.length; j++) {
        const u = possivelClique[i];
        const v = possivelClique[j];
        if (!grafo[u].has(v)) return false;
      }
    }
    return true;
  }

  function backtrack(indice: number, cliqueAtual: number[]) {
    if (cliqueAtual.length > melhorClique.length) {
      melhorClique = [...cliqueAtual];
    }

    for (let i = indice; i < vertices.length; i++) {
      const v = vertices[i];
      cliqueAtual.push(v);
      if (ehClique(cliqueAtual)) {
        backtrack(i + 1, cliqueAtual);
      }
      cliqueAtual.pop();
    }
  }

  backtrack(0, []);
  return melhorClique;
}

const grafo: Grafo = {
  0: new Set([1, 2]),
  1: new Set([0, 2]),
  2: new Set([0, 1, 3]),
  3: new Set([2, 4]),
  4: new Set([3]),
};

const cliqueMax = encontrarCliqueMaxima(grafo);
console.log("Clique máxima encontrada:", cliqueMax);
