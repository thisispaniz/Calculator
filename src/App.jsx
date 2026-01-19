import React, { useState } from 'react';
import './App.css';

function App() {
  const [current, setCurrent] = useState('');
  const [previous, setPrevious] = useState('');
  const [operation, setOperation] = useState('');

  const appendNumber = (el) => {
    if (el === '.' && current.includes('.')) return;
    setCurrent(current + el);
  };

  const chooseOperation = (el) => {
    if (current === '') return;
    if (previous !== '') {
      compute();
    }
    setOperation(el);
    setPrevious(current);
    setCurrent('');
  };

  const compute = () => {
    let computation;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      default:
        return;
    }

    setCurrent(computation.toString());
    setOperation('');
    setPrevious('');
  };

  const deleteNumber = () => {
    setCurrent(String(current).slice(0, -1));
  };

  const clear = () => {
    setCurrent('');
    setPrevious('');
    setOperation('');
  };

  return (
    <div className="calculator-grid">
      <p>title</p>
      <div className="output">
        <div className="previous-operand">{previous} {operation}</div>
        <div className="current-operand" data-testid="display">{current}</div>
      </div>

      <button className="span-two" onClick={clear}>AC</button>
      <button onClick={deleteNumber}>DEL</button>
      <button onClick={() => chooseOperation('÷')}>÷</button>

      <button onClick={() => appendNumber('1')}>1</button>
      <button onClick={() => appendNumber('2')}>2</button>
      <button onClick={() => appendNumber('3')}>3</button>
      <button onClick={() => chooseOperation('*')}>*</button>

      <button onClick={() => appendNumber('4')}>4</button>
      <button onClick={() => appendNumber('5')}>5</button>
      <button onClick={() => appendNumber('6')}>6</button>
      <button onClick={() => chooseOperation('+')}>+</button>

      <button onClick={() => appendNumber('7')}>7</button>
      <button onClick={() => appendNumber('8')}>8</button>
      <button onClick={() => appendNumber('9')}>9</button>
      <button onClick={() => chooseOperation('-')}>-</button>

      <button onClick={() => appendNumber('.')}>.</button>
      <button onClick={() => appendNumber('0')}>0</button>
      <button className="span-two" onClick={compute}>=</button>
    </div>
  );
}

export default App;