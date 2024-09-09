import React from 'react';
import Die from "./components/Die";
import "./style.css";
import { nanoid } from 'nanoid';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

function App() {
  const [tenzies, setTenzies] = React.useState(false);
  const { width, height } = useWindowSize();

  function genrateNewDie() {
    return {
      "value": Math.ceil(Math.random() * 6),
      "isHeld": false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const newNumbers = [];
    for (let i = 1; i <= 10; i++) {
      newNumbers.push(genrateNewDie());
    }
    return newNumbers;
  }

  const [numbers, setNumbers] =  React.useState(allNewDice());


  function rollNumbers () {
    if (tenzies) {
      setNumbers(allNewDice());
      setTenzies(false);
    }
    else {
      setNumbers((oldNumbers) => oldNumbers.map((number) => {
        return number.isHeld ? number: genrateNewDie()
      }));
    }
  }

  const holdDice = (id) => {
    setNumbers((oldNumbers) => oldNumbers.map((number) => {
      return number.id == id ? {...number, isHeld: !number.isHeld}: {...number}
    }));
  }

  React.useEffect(() => {
    const allHeld = numbers.every(number => number.isHeld);
    const allSame = numbers.every(number => number.value === numbers[0].value);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, numbers);
  
  const die = numbers.map((number) => 
    <Die 
      key={number.id} 
      number={number.value} 
      isHeld={number.isHeld}
      holdDice={() => holdDice(number.id)}/>
    );

  return (
    <main className='container'>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
      <div className="die-content">
        {die}
      </div>
      <button onClick={rollNumbers}>{tenzies ? "New Game": "Roll"}</button>
      {tenzies && <Confetti width={width} height={height}/>}
    </main>
  )
}

export default App;
