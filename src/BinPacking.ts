type Bin = number[];
type Solution = Bin[];

function firstFit(items: number[]): Solution {
  const bins: Solution = [];
  for (const item of items) {
    let placed = false;
    for (let bin of bins) {
      if (bin.reduce((sum, i) => sum + i, 0) + item <= 1) {
        bin.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) {
      bins.push([item]);
    }
  }
  return bins;
}

function evaluate(solution: Solution): number {
  return solution.length;
}

function generateNeighbor(solution: Solution): Solution {
  const newSolution = solution.map((bin) => [...bin]);

  for (let i = 0; i < newSolution.length; i++) {
    for (let j = 0; j < newSolution[i].length; j++) {
      const item = newSolution[i][j];
      for (let k = 0; k < newSolution.length; k++) {
        if (
          k !== i &&
          newSolution[k].reduce((sum, el) => sum + el, 0) + item <= 1
        ) {
          newSolution[k].push(item);
          newSolution[i].splice(j, 1);
          if (newSolution[i].length === 0) {
            newSolution.splice(i, 1);
          }
          return newSolution;
        }
      }
    }
  }

  return newSolution;
}

function localSearch(items: number[], timeLimit: number): Solution {
  const startTime = Date.now();
  let currentSolution = firstFit(items);
  let currentCost = evaluate(currentSolution);

  while (Date.now() - startTime < timeLimit * 1000) {
    const neighbor = generateNeighbor(currentSolution);
    const neighborCost = evaluate(neighbor);

    if (neighborCost < currentCost) {
      currentSolution = neighbor;
      currentCost = neighborCost;
    } else {
      break;
    }
  }

  return currentSolution;
}

function main() {
  let timeLimit = parseInt(process.argv[2]);

  if (isNaN(timeLimit)) {
    timeLimit = 5;
    console.log(`O tempo limite padrão é ${timeLimit}s`);
  }

  const items: number[] = Array.from(
    { length: 50 },
    () => Math.random() * 0.8 + 0.1,
  );

  console.log("Itens:", items);

  const solution = localSearch(items, timeLimit);

  console.log("\nSolução encontrada:");
  solution.forEach((bin, index) => {
    console.log(
      `Bin ${index + 1}: [${bin.join(", ")}] -> soma: ${bin.reduce((sum, item) => sum + item, 0).toFixed(2)}`,
    );
  });
  console.log(`\nNúmero total de bins usados: ${solution.length}`);
}

main();
