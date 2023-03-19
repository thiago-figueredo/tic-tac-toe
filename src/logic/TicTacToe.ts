export enum Symbol {
  Empty = "",
  X = "X",
  O = "O",
}

export type Table = Symbol[][];

export class TicTacToe {
  private static symbols = [Symbol.X, Symbol.O];

  public static getNextSymbol(symbol: Symbol): Symbol {
    switch (symbol) {
      case Symbol.Empty:
        return TicTacToe.getRandomSymbol(TicTacToe.symbols);
      case Symbol.X:
        return Symbol.O;
      case Symbol.O:
        return Symbol.X;
    }
  }

  public static updateTableAt(
    table: Table,
    row: number,
    column: number,
    symbol: Symbol
  ): Table {
    const dimension = table.length;

    if (row < 0 || row >= dimension || column < 0 || column >= dimension) {
      throw Error(`invalid position (${row}, ${column})`);
    }

    if (TicTacToe.getTableAt(table, row, column) !== Symbol.Empty) {
      return table;
    }

    const newTable = table.map((line, x) => {
      return x === row
        ? line.map((value, y) => (y === column ? symbol : value))
        : line;
    });

    return newTable;
  }

  public static hasWinner(table: Table): boolean {
    const tableContainsOnlyEmptySymbol = table.every((row) =>
      row.every((symbol) => symbol === Symbol.Empty)
    );

    if (tableContainsOnlyEmptySymbol) {
      return false;
    }

    return (
      TicTacToe.checkRowWin(table) ||
      TicTacToe.checkColumnWin(table) ||
      TicTacToe.checkDiagonalWin(table)
    );
  }

  public static hasDraw(table: Table): boolean {
    return table.every((row) => !row.includes(Symbol.Empty));
  }

  public static getTableAt(
    table: Table,
    row: number,
    column: number
  ): Symbol | undefined {
    return table.at(row)?.at(column);
  }

  public static checkDiagonalWin(table: Table): boolean {
    return (
      TicTacToe.checkPrimaryDiagonalWin(table) ||
      TicTacToe.checkSecondaryDiagonalWin(table)
    );
  }

  public static getRandomSymbol(array: Symbol[] = TicTacToe.symbols): Symbol {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static checkRowWin(table: Table): boolean {
    const dimension = table.length;
    const trace = Array.from({ length: dimension }).fill(
      Array.from({ length: dimension }).fill(Symbol.Empty)
    ) as Table;

    return table.some((row, x) => {
      const symbol = row.at(0);

      return row.every((value, y) => {
        trace[x][y] = value;
        return symbol !== Symbol.Empty && value === symbol;
      });
    });
  }

  private static checkColumnWin(table: Table): boolean {
    const dimension = table.length;

    for (let row = 0; row < dimension; ++row) {
      const columnSymbol = TicTacToe.getTableAt(table, 0, row);

      for (let column = 1; column < dimension; ++column) {
        if (TicTacToe.getTableAt(table, column, row) !== columnSymbol) {
          break;
        }

        if (column === dimension - 1 && columnSymbol !== Symbol.Empty) {
          return true;
        }
      }
    }

    return false;
  }

  private static checkPrimaryDiagonalWin(table: Table): boolean {
    const dimension = table.length;
    const primarySymbol = TicTacToe.getTableAt(table, 0, 0);

    if (primarySymbol === Symbol.Empty) {
      return false;
    }

    for (let index = 1; index < dimension; ++index) {
      const primaryDiagonalSymbol = TicTacToe.getTableAt(table, index, index);

      if (primarySymbol !== primaryDiagonalSymbol) {
        return false;
      }
    }

    return true;
  }

  private static checkSecondaryDiagonalWin(table: Table): boolean {
    const dimension = table.length;
    const secondarySymbol = TicTacToe.getTableAt(table, 0, dimension - 1);

    if (secondarySymbol === Symbol.Empty) {
      return false;
    }

    for (let row = 1; row < dimension; ++row) {
      const column = dimension - row - 1;
      const secondaryDiagonalSymbol = TicTacToe.getTableAt(table, row, column);

      if (secondaryDiagonalSymbol !== secondarySymbol) {
        return false;
      }
    }

    return true;
  }
}
