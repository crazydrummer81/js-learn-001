import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, refreshData] = useState([{name: 'Mans', sex: 'male'}]);

  useEffect(() => {
    console.log(data);   
  });

  

  return (
    <div className="App">
      <p>Ты кликнул {count} раз</p>
      <button
        onClick={() => setCount(count + 1)}
      >Нажми</button>
      {data.map(item => {
        return (
          <div>Name: {item.name}, sex: {item.sex}</div>
        );
      })}
      <button onClick={() => refreshData(data => ([...data, {name: 'Kayta', sex: 'female'}]))}>Добавить данные</button>
    </div>
  );
}

export default App;
