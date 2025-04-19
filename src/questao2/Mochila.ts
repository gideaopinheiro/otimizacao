export class Mochila {
  private _itens: Item[] = [];
  private _capacidadeAtual: number = 0;

  constructor(private _capacidadeTotal: number) {}

  addItem(item: Item): boolean {
    if (!this.podeAdicionar(item)) return false;
    this._itens.push(item);
    this._capacidadeAtual += item.peso;
    return true;
  }

  private podeAdicionar(item: Item): boolean {
    return this._capacidadeAtual + item.peso <= this._capacidadeTotal;
  }

  get capacidadeTotal(): number {
    return this._capacidadeTotal;
  }

  get capacidadeAtual(): number {
    return this._capacidadeAtual;
  }

  get itens(): Item[] {
    return [...this._itens];
  }

  get valorTotal(): number {
    let sum = 0;
    this._itens.forEach((item) => {
      sum += item.valor;
    });
    return sum;
  }
}

export class Item {
  constructor(
    private _peso: number,
    private _valor: number,
  ) {}

  get peso(): number {
    return this._peso;
  }
  get valor(): number {
    return this._valor;
  }
}

export function resolverMochilaPD({
  itens,
  mochila,
}: {
  itens: Item[];
  mochila: Mochila;
}) {
  const capacidadeMax = mochila.capacidadeTotal;
  const n = itens.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacidadeMax + 1).fill(0),
  );

  for (let i = 1; i <= n; i++) {
    const item = itens[i - 1];
    for (let peso = 0; peso <= capacidadeMax; peso++) {
      if (item.peso > peso) {
        dp[i][peso] = dp[i - 1][peso];
      } else {
        dp[i][peso] = Math.max(
          dp[i - 1][peso],
          dp[i - 1][peso - item.peso] + item.valor,
        );
      }
    }
  }

  let peso = mochila.capacidadeTotal;
  for (let i = n; i > 0; i--) {
    if (dp[i][peso] !== dp[i - 1][peso]) {
      const item = itens[i - 1];
      mochila.addItem(item);
      peso -= item.peso;
    }
  }

  return { valorTotal: mochila.valorTotal, itensNaMochila: mochila.itens };
}

export function configuraProblema() {
  const itens: Item[] = [
    new Item(3, 12),
    new Item(5, 2),
    new Item(5, 22),
    new Item(8, 3),
    new Item(10, 33),
    new Item(6, 19),
  ];
  const mochila = new Mochila(20);

  return { mochila, itens };
}

console.log(resolverMochilaPD(configuraProblema()));
