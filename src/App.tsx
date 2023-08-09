import { useEffect, useState } from "react";
import "../src/App.css";

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState("");
  const [lines, setLines] = useState([[10, 5, 2], [7], [5], [9], [12]]);
  const numberItems = parseInt(itemsInPersonCart);
  function addPersonToLine(e: React.FocusEvent<HTMLFormElement>) {
    e.preventDefault();
    if (itemsInPersonCart === undefined || numberItems <= 0) return;
    let leastItemsAmount = 1e9;
    let lineWithLeast: number[] | undefined;

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);

      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    if (!lineWithLeast) return;

    setLines((prevLines) =>
      prevLines.map((line) =>
        line === lineWithLeast ? [...line, numberItems] : line
      )
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={addPersonToLine}>
        <input
          required
          type="number"
          value={itemsInPersonCart}
          onChange={(e) => {
            setItemsInPersonCart(e.currentTarget.value);
          }}
        />
        <button>Checkout</button>
      </form>
      <div className="lines">
        {lines.map((line, idx) => (
          <div className="line" key={idx}>
            {line.map((numberOfItems, lineIndex) => (
              <div key={lineIndex}>{numberOfItems}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
