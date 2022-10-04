export interface ISymbolToVolatility {
  symbol: string;
  volatility: number;
}

type TSymbolToVolatility = Record<string, number>;

export default class TopVolatility {
  private maxCount = 0;
  private currentCount = 0;
  private lowestSymbolToVolility: ISymbolToVolatility = undefined;
  private symbolToVolatility: TSymbolToVolatility = {};

  constructor(maxCount: number) {
    this.maxCount = maxCount;
  }

  private findAndSetLowestSymbolToVolatility = () => {
    const [key, value] = Object.entries(this.symbolToVolatility).sort(
      ([_aKey, aVal], [_bKey, bVal]) => aVal - bVal
    )[0];

    this.lowestSymbolToVolility = {
      symbol: key,
      volatility: value,
    };
  };

  private increaseCurrentCount = () => {
    this.currentCount++;
  };

  private removeLowestFromSymbolToVolatility = () => {
    delete this.symbolToVolatility[this.lowestSymbolToVolility.symbol];
    this.findAndSetLowestSymbolToVolatility();
  };

  private setToLowest = (entry: ISymbolToVolatility) => {
    if (
      !this.lowestSymbolToVolility ||
      this.lowestSymbolToVolility.volatility > entry.volatility
    ) {
      this.lowestSymbolToVolility = entry;
    }
  };

  private updateEntry = ({ symbol, volatility }: ISymbolToVolatility) => {
    this.symbolToVolatility[symbol] = volatility;
    this.setToLowest({ symbol, volatility });
  };

  public getCount = (): number => {
    return this.currentCount;
  };

  public getTop = (): ISymbolToVolatility[] => {
    return Object.entries(this.symbolToVolatility)
      .sort(([_aKey, aVal], [_bKey, bVal]) => bVal - aVal)
      .map(([key, val]) => ({ symbol: key, volatility: val }));
  };

  public addToSymbolToVolatility = (entry: ISymbolToVolatility) => {
    if (this.symbolToVolatility[entry.symbol]) {
      this.updateEntry(entry);
      console.log(`Updated symbol ${entry.symbol}`);
      return;
    }

    if (!entry.volatility) {
      return;
    }

    if (this.currentCount < this.maxCount) {
      this.increaseCurrentCount();
      this.updateEntry(entry);
      console.log(
        `Added symbol: ${entry.symbol} with volatility of ${entry.volatility}`
      );
      console.log(`Count increased to ${this.getCount()}`);
      return;
    }

    if (this.lowestSymbolToVolility.volatility > entry.volatility) {
      return;
    }

    const lowestSymbol = this.lowestSymbolToVolility.symbol;
    this.removeLowestFromSymbolToVolatility();
    this.updateEntry(entry);
    console.log(
      `Added symbol: ${entry.symbol} with volatility of ${entry.volatility}`
    );
    console.log(`Removed symbol ${lowestSymbol}`);
  };
}
