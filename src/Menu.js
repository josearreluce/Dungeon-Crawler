import React, { Component } from 'react';

class Menu extends Component {
  render () {
    return (
      <div id="menu">
        Health: {this.props.health}
        Weapon: {this.props.weapon}
        Attack: {this.props.attack}
        Level: {this.props.level}
        Next Level: {this.props.next}
        Dungeon: {this.props.dungeon}

        <button> Toggle Darkness </button>
      </div>
    );
  }
}

export default Menu;
