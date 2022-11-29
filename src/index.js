import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Tester from './Tester';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, HashRouter, Route , Routes } from 'react-router-dom';
import Cheatsheet from './Cheatsheet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/test" exact element={<Tester />} />
        <Route path="/" exact element={<Cheatsheet />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
