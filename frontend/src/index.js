import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mainpage from './Mainpage'
import reportWebVitals from './reportWebVitals';
import { BodyProvider } from './hooks/useBody';
// import { AuthProvider } from './hooks/useAuth';


ReactDOM.render(
  <React.StrictMode>
    <BodyProvider>
      <Mainpage />
    </BodyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
