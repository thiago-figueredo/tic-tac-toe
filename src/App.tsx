import { CSSProperties } from "react";
import "./App.css";
import { useTicTacToe } from "./hooks/useTicTacToe";
import { Symbol } from "./logic/TicTacToe";

function App() {
  const {
    state,
    resetState,
    tableHeight,
    tableWidth,
    cellHeight,
    cellWidth,
    markCell,
  } = useTicTacToe();

  const css = {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  } as CSSProperties;

  return (
    <div className="table" style={{ width: tableWidth, height: tableHeight }}>
      {state.table.map((line, row) => (
        <div className="line" key={row}>
          {line.map(({ symbol, isWinTrace }, column) => {
            return (
              <p
                key={`${row}-${column}`}
                className="cell"
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  background: isWinTrace ? "green" : "",
                }}
                onClick={() => markCell(row, column)}
              >
                {symbol}
              </p>
            );
          })}
        </div>
      ))}

      <button
        style={{
          ...css,
          width: cellWidth,
          bottom: "-10rem",
          padding: "2rem",
          fontSize: "large",
          cursor: "pointer",
        }}
        onClick={resetState}
      >
        Restart
      </button>

      {state.winner !== Symbol.Empty && (
        <h2
          style={{
            ...css,
            textAlign: "center",
            fontSize: "x-large",
            color: "snow",
            bottom: "-13rem",
          }}
        >
          Winner: {state.winner}
        </h2>
      )}

      {state.draw && (
        <h2
          style={{
            ...css,
            textAlign: "center",
            fontSize: "x-large",
            color: "snow",
            bottom: "-13rem",
          }}
        >
          Draw
        </h2>
      )}
    </div>
  );
}

export default App;
