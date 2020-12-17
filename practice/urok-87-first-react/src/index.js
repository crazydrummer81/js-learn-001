import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';


const Header = () => {
  const text = 'It works!!!';
  return <h2>{text}</h2>
}

const Field = () => {
  const holder = "Enter here";
  const styleField = {
    witdh: '300px',
    padding: '10px'
  }
  return <input 
    style={styleField}
    type="text" 
    placeholder={holder} 
    autoComplete=""
    className="first"
    htmlFor=""
  />
}

const Button = () => {
  const text = "Log in";
  const logged = true;
  return <button>{logged ? "Enter" : text}</button>
}

const App = () => {
  return (
    <div>
      <Header/>
      <Field/>
      <Button/>
    </div>
  )
}

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
