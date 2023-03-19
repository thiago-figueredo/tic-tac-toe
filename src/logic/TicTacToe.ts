export enum Symbol {
  Empty = "",
  X = "X",
  O = "O",
}

export type Cell = {
  symbol: Symbol;
  isWinTrace: boolean;
};

export type Table = Cell[][];

export type WinResult = {
  win: boolean;
  trace: Table;
};

export class TicTacToe {
  private static symbols = [Symbol.X, Symbol.O];

  private static makeRowWinTrace(table: Table, row: number): Cell[] {
    return table[row].map(({ symbol }) => ({ symbol, isWinTrace: true }));
  }

  public static getNextSymbol(symbol: Symbol): Symbol {
    switch (symbol) {
      case Symbol.Empty:
        return this.getRandomSymbol(this.symbols);
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
    cell: Cell
  ): Table {
    const dimension = table.length;

    if (row < 0 || row >= dimension || column < 0 || column >= dimension) {
      throw Error(`invalid position (${row}, ${column})`);
    }

    if (this.getTableAt(table, row, column)?.symbol !== Symbol.Empty) {
      return table;
    }

    const newTable = table.map((line, x) => {
      return x === row
        ? line.map((value, y) => {
            return y === column ? cell : value;
          })
        : line;
    });

    return newTable;
  }

  public static hasWinner(table: Table): boolean {
    const tableContainsOnlyEmptySymbol = table.every((row) =>
      row.every(({ symbol }) => symbol === Symbol.Empty)
    );

    if (tableContainsOnlyEmptySymbol) {
      return false;
    }

    return (
      this.checkRowWin(table) ||
      this.checkColumnWin(table) ||
      this.checkDiagonalWin(table)
    );
  }

  public static hasDraw(table: Table): boolean {
    return table.every((row) => {
      return row.every(({ symbol }) => symbol !== Symbol.Empty);
    });
  }

  public static getTableAt(
    table: Table,
    row: number,
    column: number
  ): Cell | undefined {
    return table.at(row)?.at(column);
  }

  public static checkDiagonalWin(table: Table): boolean {
    return (
      this.checkPrimaryDiagonalWin(table) ||
      this.checkSecondaryDiagonalWin(table)
    );
  }

  public static getRandomSymbol(array: Symbol[] = this.symbols): Symbol {
    return array[Math.floor(Math.random() * array.length)];
  }

  public static getEmptyTable(dimension: number): Table {
    return Array.from({ length: dimension }).fill(
      Array.from({ length: dimension }).fill({
        symbol: Symbol.Empty,
        isWinTrace: false,
      })
    ) as Table;
  }

  private static checkRowWin(table: Table): boolean {
    const win = table.some((row, x) => {
      const { symbol } = row[0];
      const isInWinningRow = row.every((cell) => {
        return symbol !== Symbol.Empty && cell.symbol === symbol;
      });

      if (isInWinningRow) {
        table[x] = this.makeRowWinTrace(table, x);
      }

      return isInWinningRow;
    });

    return win;
  }

  private static checkColumnWin(table: Table): boolean {
    const dimension = table.length;
    let columnIndex = -1;
    let win = false;

    for (let row = 0; row < dimension; ++row) {
      const currentCell = this.getTableAt(table, 0, row) as Cell;
      const columnSymbol = currentCell.symbol;

      for (let column = 1; column < dimension; ++column) {
        if (this.getTableAt(table, column, row)?.symbol !== columnSymbol) {
          break;
        }

        if (column === dimension - 1 && columnSymbol !== Symbol.Empty) {
          columnIndex = row;
          win = true;
        }
      }
    }

    if (columnIndex >= 0) {
      for (let index = 0; index < dimension; ++index) {
        const cell = this.getTableAt(table, index, columnIndex) as Cell;
        table[index][columnIndex] = { ...cell, isWinTrace: true };
      }
    }

    return win;
  }

  private static checkPrimaryDiagonalWin(table: Table): boolean {
    const dimension = table.length;
    const { symbol: primarySymbol } = this.getTableAt(table, 0, 0) as Cell;

    if (primarySymbol === Symbol.Empty) {
      return false;
    }

    for (let index = 1; index < dimension; ++index) {
      const { symbol: primaryDiagonalSymbol } = this.getTableAt(
        table,
        index,
        index
      ) as Cell;

      if (primarySymbol !== primaryDiagonalSymbol) {
        return false;
      }
    }
    for (let index = 0; index < dimension; ++index) {
      const cell = table[index][index];
      table[index][index] = { ...cell, isWinTrace: true };
    }

    return true;
  }

  private static checkSecondaryDiagonalWin(table: Table): boolean {
    const dimension = table.length;
    const { symbol: secondarySymbol } = this.getTableAt(
      table,
      0,
      dimension - 1
    ) as Cell;

    if (secondarySymbol === Symbol.Empty) {
      return false;
    }

    for (let row = 1; row < dimension; ++row) {
      const column = dimension - row - 1;
      const { symbol: secondaryDiagonalSymbol } = this.getTableAt(
        table,
        row,
        column
      ) as Cell;

      if (secondaryDiagonalSymbol !== secondarySymbol) {
        return false;
      }
    }

    for (let row = 0; row < dimension; ++row) {
      const column = dimension - row - 1;
      const cell = table[row][column];
      table[row][column] = { ...cell, isWinTrace: true };
    }

    return true;
  }
}
