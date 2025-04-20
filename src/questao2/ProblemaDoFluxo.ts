class EdmondsKarp {
  private capacity: number[][];
  private flow: number[][];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.capacity = Array.from({ length: n }, () => Array(n).fill(0));
    this.flow = Array.from({ length: n }, () => Array(n).fill(0));
  }

  addEdge(i: number, j: number, cap: number): void {
    this.capacity[i][j] = cap;
  }

  bfs(source: number, sink: number, parent: number[]): boolean {
    const visited = Array(this.n).fill(false);
    const queue: number[] = [];

    visited[source] = true;
    queue.push(source);

    while (queue.length > 0) {
      const u = queue.shift()!;

      for (let v = 0; v < this.n; v++) {
        if (!visited[v] && this.capacity[u][v] - this.flow[u][v] > 0) {
          queue.push(v);
          visited[v] = true;
          parent[v] = u;

          if (v === sink) {
            return true;
          }
        }
      }
    }

    return false;
  }

  edmondsKarp(source: number, sink: number): number {
    const parent = Array(this.n).fill(-1);
    let maxFlow = 0;

    while (this.bfs(source, sink, parent)) {
      let pathFlow = Infinity;
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, this.capacity[u][v] - this.flow[u][v]);
      }

      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        this.flow[u][v] += pathFlow;
        this.flow[v][u] -= pathFlow;
      }

      maxFlow += pathFlow;
    }

    return maxFlow;
  }
}

const graph = new EdmondsKarp(6);

graph.addEdge(0, 1, 16);
graph.addEdge(0, 2, 13);
graph.addEdge(1, 2, 10);
graph.addEdge(1, 3, 12);
graph.addEdge(2, 1, 4);
graph.addEdge(2, 4, 14);
graph.addEdge(3, 5, 20);
graph.addEdge(4, 5, 4);

const maxFlow = graph.edmondsKarp(0, 5);

console.log(`Fluxo máximo possível: ${maxFlow}`);
