type Graph = Map<number, number[]>;

function greedyColoring(graph: Graph): Map<number, number> {
  const colorMap = new Map<number, number>();
  const vertices = Array.from(graph.keys());

  vertices.sort(
    (a, b) => (graph.get(b)?.length ?? 0) - (graph.get(a)?.length ?? 0),
  );

  for (const vertex of vertices) {
    const usedColors = new Set<number>();

    for (const neighbor of graph.get(vertex) || []) {
      if (colorMap.has(neighbor)) {
        usedColors.add(colorMap.get(neighbor)!);
      }
    }

    let color = 0;
    while (usedColors.has(color)) {
      color++;
    }

    colorMap.set(vertex, color);
  }

  return colorMap;
}

const exampleGraph: Graph = new Map([
  [0, [1, 2]],
  [1, [0, 2, 3]],
  [2, [0, 1, 3]],
  [3, [1, 2, 4]],
  [4, [3]],
]);

const frequencias = greedyColoring(exampleGraph);

console.log("Frequências atribuídas:");
for (const [antena, frequencia] of frequencias.entries()) {
  console.log(`Antena ${antena}: frequência ${frequencia}`);
}

const maxFreq = Math.max(...Array.from(frequencias.values()));
console.log(`\nFrequências mínimas utilizadas: ${maxFreq + 1}`);
