import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dungeon from './Dungeon.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dungeon />
      </div>
    );
  }
}

export default App;
