import React from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import MyContext from './components/Context';


function App() {
  return (
    <div className="App">
      <MyContext.Provider value={{
        name: 'Mans',
        age: 26
      }}>
        <Wrapper/>
      </MyContext.Provider>
    </div>
  );
}

export default App;


//! Prop провайдера ОБЯЗАТЕЛЬНО value!!!