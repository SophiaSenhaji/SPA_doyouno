import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home/index';
import AnimalForm from './components/pages/AnimalForm/index';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/form" component={AnimalForm}/>
          <Route path="/animal/:id" component={AnimalForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
