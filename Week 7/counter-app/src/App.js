import { useState } from "react";
import './App.css';
function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="container">
      <h1>Simple Counter</h1>
      <p className="count">{count}</p>
      <div className="buttonContainer">
        <button onClick={decrement} className="button">-</button>
        <button onClick={increment} className="button">+</button>
      </div>
    </div>
  );
}

export default App;
