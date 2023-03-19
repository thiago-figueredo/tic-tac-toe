import { Symbol, TicTacToe } from "./TicTacToe";

const emptyTable = [
  [Symbol.Empty, Symbol.Empty, Symbol.Empty],
  [Symbol.Empty, Symbol.Empty, Symbol.Empty],
  [Symbol.Empty, Symbol.Empty, Symbol.Empty],
];

const dimension = emptyTable.length;

describe("TicTacToe", () => {
  it("should have a default state", () => {});

  describe("updateTableAt", () => {
    it("should update table at the given row and column", () => {
      const symbol = Symbol.X;

      for (let row = 0; row < dimension; ++row) {
        for (let column = 0; column < dimension; ++column) {
          const newTable = emptyTable;
          newTable[row][column] = symbol;

          expect(
            TicTacToe.updateTableAt(emptyTable, row, column, symbol)
          ).toEqual(newTable);
        }
      }
    });
  });

  describe("row win", () => {
    it("should be true when all symbols of row are the same", () => {
      const table = [
        [Symbol.O, Symbol.Empty, Symbol.Empty],
        [Symbol.Empty, Symbol.X, Symbol.X],
        [Symbol.X, Symbol.X, Symbol.X],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
    });
  });

  it("should be false when row contains only empty symbol", () => {
    const table = [
      [Symbol.Empty, Symbol.Empty, Symbol.Empty],
      [Symbol.O, Symbol.X, Symbol.X],
      [Symbol.O, Symbol.X, Symbol.X],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
  });

  describe("column win", () => {
    it("should return true when all symbol of column are the same", () => {
      const table = [
        [Symbol.Empty, Symbol.X, Symbol.Empty],
        [Symbol.O, Symbol.X, Symbol.X],
        [Symbol.O, Symbol.X, Symbol.X],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
    });
  });

  it("should be false when column contains only empty symbol", () => {
    const table = [
      [Symbol.Empty, Symbol.X, Symbol.O],
      [Symbol.Empty, Symbol.O, Symbol.X],
      [Symbol.Empty, Symbol.O, Symbol.O],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
  });

  describe("primary diagonal win", () => {
    it("should be true when all symbol of primary diagonal are the same", () => {
      const table = [
        [Symbol.O, Symbol.X, Symbol.O],
        [Symbol.Empty, Symbol.O, Symbol.X],
        [Symbol.Empty, Symbol.O, Symbol.O],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
    });
  });

  it("should be false when primary diagonal contains only empty symbol", () => {
    const table = [
      [Symbol.Empty, Symbol.X, Symbol.O],
      [Symbol.O, Symbol.Empty, Symbol.X],
      [Symbol.Empty, Symbol.O, Symbol.Empty],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
  });

  describe("secondary diagonal win", () => {
    it("should be true when all symbol of secondary diagonal are the same", () => {
      const table = [
        [Symbol.Empty, Symbol.X, Symbol.X],
        [Symbol.O, Symbol.X, Symbol.X],
        [Symbol.X, Symbol.O, Symbol.Empty],
      ];

      expect(TicTacToe.hasWinner(table)).toBeTruthy();
    });
  });

  it("should be false when secondary diagonal contains only empty symbol", () => {
    const table = [
      [Symbol.O, Symbol.X, Symbol.Empty],
      [Symbol.O, Symbol.Empty, Symbol.X],
      [Symbol.Empty, Symbol.O, Symbol.Empty],
    ];

    expect(TicTacToe.hasWinner(table)).toBeFalsy();
  });

  describe("draw", () => {
    it("should set draw to true when table does not contain none empty symbol and there is no winner", () => {
      const table = [
        [Symbol.O, Symbol.X, Symbol.O],
        [Symbol.O, Symbol.X, Symbol.X],
        [Symbol.X, Symbol.O, Symbol.O],
      ];

      expect(TicTacToe.hasWinner(table)).toBeFalsy();
      expect(TicTacToe.hasDraw(table)).toBeTruthy();
    });
  });
});
