import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Symbol, Table, TicTacToe } from "../logic/TicTacToe";

export interface State {
  draw: boolean;
  dimension: number;
  currentSymbol: Symbol;
  winner: Symbol;
  table: Table;
}

interface TicTacToeResult {
  state: State;
  cellWidth: number;
  cellHeight: number;
  tableWidth: number;
  tableHeight: number;
  markCell: (row: number, column: number, symbol?: Symbol) => void;
  setState: Dispatch<SetStateAction<State>>;
  resetState: () => void;
}

const initialState = {
  dimension: 3,
  draw: false,
  currentSymbol: Symbol.Empty,
  winner: Symbol.Empty,
  table: Array.from({ length: 3 }).fill(
    Array.from({ length: 3 }).fill({ symbol: Symbol.Empty, isWinTrace: false })
  ) as Table,
};

export function useTicTacToe(): TicTacToeResult {
  const [state, setState] = useState<State>(initialState);
  const { table, dimension, currentSymbol, winner, draw } = state;

  const tableWidth = window.innerWidth / 2;
  const tableHeight = window.innerHeight / 2;
  const cellWidth = tableWidth / dimension;
  const cellHeight = tableHeight / dimension;

  const updateTableAt = (row: number, column: number, symbol: Symbol) => {
    setState((oldState) => {
      return {
        ...oldState,
        table: TicTacToe.updateTableAt(oldState.table, row, column, {
          symbol,
          isWinTrace: false,
        }),
        currentSymbol: symbol,
      };
    });
  };

  const markCell = (row: number, column: number, symbol = currentSymbol) => {
    const strategies = {
      [Symbol.Empty]: () => {
        updateTableAt(row, column, TicTacToe.getNextSymbol(symbol));
      },
      [Symbol.X]: () => updateTableAt(row, column, Symbol.O),
      [Symbol.O]: () => updateTableAt(row, column, Symbol.X),
    };

    if (!winner && !draw) {
      strategies[symbol as keyof typeof strategies]();
    }
  };

  const resetState = () => setState({ ...initialState });

  useEffect(() => {
    if (TicTacToe.hasDraw(table)) {
      setState((oldState) => ({ ...oldState, draw: true }));
    } else if (TicTacToe.hasWinner(table)) {
      setState((oldState) => ({
        ...oldState,
        winner: currentSymbol,
      }));
    }
  }, [table]);

  return {
    state,
    setState,
    tableWidth,
    tableHeight,
    cellWidth,
    cellHeight,
    markCell,
    resetState,
  };
}
