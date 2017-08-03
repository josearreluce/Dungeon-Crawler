import React, { Component } from 'react';
import './App.css';

import Dungeon from './Dungeon.js';
import Menu from './Menu.js';

class App extends Component {
  render() {
    return (
      <div tabIndex="0" className="App">
        <Dungeon />
      </div>
    );
  }
}

export default App;
