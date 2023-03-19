import { faker } from "@faker-js/faker";
import { Symbol, Table, TicTacToe } from "./TicTacToe";

const makeTable = (table: Symbol[][]): Table => {
  return table.map((row) =>
    row.map((symbol) => ({ symbol, isWinTrace: false }))
  );
};

const emptyTable = makeTable([
  [Symbol.Empty, Symbol.Empty, Symbol.Empty],
  [Symbol.Empty, Symbol.Empty, Symbol.Empty],
  [Symbol.Empty, Symbol.Empty, Symbol.Empty],
]);

const dimension = emptyTable.length;

describe("TicTacToe", () => {
  describe("updateTableAt", () => {
    it("should update table at the given row and column", () => {
      const cell = { symbol: Symbol.X, isWinTrace: faker.datatype.boolean() };

      for (let row = 0; row < dimension; ++row) {
        for (let column = 0; column < dimension; ++column) {
          const newTable = emptyTable;
          newTable[row][column] = cell;

          expect(
            TicTacToe.updateTableAt(emptyTable, row, column, cell)
          ).toEqual(newTable);
        }
      }
    });
  });

  describe("row win", () => {
    it("should be true when all symbols of row are the same", () => {
      const table = makeTable([
        [Symbol.O, Symbol.Empty, Symbol.Empty],
        [Symbol.Empty, Symbol.X, Symbol.X],
        [Symbol.X, Symbol.X, Symbol.X],
      ]);

      const newTable = [
        [
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.Empty, isWinTrace: false },
          { symbol: Symbol.Empty, isWinTrace: false },
        ],
        [
          { symbol: Symbol.Empty, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: false },
        ],
        [
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: true },
        ],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
      expect(table).toEqual(newTable);
    });
  });

  it("should be false when row contains only empty symbol", () => {
    const table = makeTable([
      [Symbol.Empty, Symbol.Empty, Symbol.Empty],
      [Symbol.O, Symbol.X, Symbol.X],
      [Symbol.O, Symbol.X, Symbol.X],
    ]);

    const newTable = [
      [
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.Empty, isWinTrace: false },
      ],
      [
        { symbol: Symbol.O, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
      ],
      [
        { symbol: Symbol.O, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
      ],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
    expect(table).toEqual(newTable);
  });

  describe("column win", () => {
    it("should return true when all symbol of column are the same", () => {
      const table = makeTable([
        [Symbol.Empty, Symbol.X, Symbol.Empty],
        [Symbol.O, Symbol.X, Symbol.X],
        [Symbol.O, Symbol.X, Symbol.X],
      ]);

      const newTable = [
        [
          { symbol: Symbol.Empty, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.Empty, isWinTrace: false },
        ],
        [
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: false },
        ],
        [
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: false },
        ],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
      expect(table).toEqual(newTable);
    });
  });

  it("should be false when column contains only empty symbol", () => {
    const table = makeTable([
      [Symbol.Empty, Symbol.X, Symbol.O],
      [Symbol.Empty, Symbol.O, Symbol.X],
      [Symbol.Empty, Symbol.O, Symbol.O],
    ]);

    const newTable = [
      [
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
        { symbol: Symbol.O, isWinTrace: false },
      ],
      [
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.O, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
      ],
      [
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.O, isWinTrace: false },
        { symbol: Symbol.O, isWinTrace: false },
      ],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
    expect(table).toEqual(newTable);
  });

  describe("primary diagonal win", () => {
    it("should be true when all symbol of primary diagonal are the same", () => {
      const table = makeTable([
        [Symbol.O, Symbol.X, Symbol.O],
        [Symbol.Empty, Symbol.O, Symbol.X],
        [Symbol.Empty, Symbol.O, Symbol.O],
      ]);

      const newTable = [
        [
          { symbol: Symbol.O, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: false },
        ],
        [
          { symbol: Symbol.Empty, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: false },
        ],
        [
          { symbol: Symbol.Empty, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: true },
        ],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
      expect(table).toEqual(newTable);
    });
  });

  it("should be false when primary diagonal contains only empty symbol", () => {
    const table = makeTable([
      [Symbol.Empty, Symbol.X, Symbol.O],
      [Symbol.O, Symbol.Empty, Symbol.X],
      [Symbol.Empty, Symbol.O, Symbol.Empty],
    ]);

    const newTable = [
      [
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
        { symbol: Symbol.O, isWinTrace: false },
      ],
      [
        { symbol: Symbol.O, isWinTrace: false },
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.X, isWinTrace: false },
      ],
      [
        { symbol: Symbol.Empty, isWinTrace: false },
        { symbol: Symbol.O, isWinTrace: false },
        { symbol: Symbol.Empty, isWinTrace: false },
      ],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
    expect(table).toEqual(newTable);
  });

  describe("secondary diagonal win", () => {
    it("should be true when all symbol of secondary diagonal are the same", () => {
      const table = makeTable([
        [Symbol.Empty, Symbol.X, Symbol.X],
        [Symbol.O, Symbol.X, Symbol.X],
        [Symbol.X, Symbol.O, Symbol.Empty],
      ]);

      const newTable = [
        [
          { symbol: Symbol.Empty, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: true },
        ],
        [
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.X, isWinTrace: false },
        ],
        [
          { symbol: Symbol.X, isWinTrace: true },
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.Empty, isWinTrace: false },
        ],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
      expect(table).toEqual(newTable);
    });
  });

  it("should be false when secondary diagonal contains only empty symbol", () => {
    const table = makeTable([
      [Symbol.O, Symbol.X, Symbol.Empty],
      [Symbol.O, Symbol.Empty, Symbol.X],
      [Symbol.Empty, Symbol.O, Symbol.Empty],
    ]);

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
  });

  describe("draw", () => {
    it("should set draw to true when table does not contain none empty symbol and there is no winner", () => {
      const table = makeTable([
        [Symbol.O, Symbol.X, Symbol.O],
        [Symbol.O, Symbol.X, Symbol.X],
        [Symbol.X, Symbol.O, Symbol.O],
      ]);

      const newTable = [
        [
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: false },
        ],
        [
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: false },
          { symbol: Symbol.X, isWinTrace: false },
        ],
        [
          { symbol: Symbol.X, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: false },
          { symbol: Symbol.O, isWinTrace: false },
        ],
      ];

      expect(TicTacToe.hasWinner(table)).toBeFalsy();
      expect(TicTacToe.hasDraw(table)).toBeTruthy();
      expect(table).toEqual(newTable);
    });
  });
});
