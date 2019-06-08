import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/Home" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
