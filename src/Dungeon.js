import React, { Component } from 'react';

class Cell extends Component {
    render () {
      return (
        <td className="cell"></td>
      );
    }
}

class Dungeon extends Component {
  constructor () {
      super();

      this.generateGrid = this.generateGrid.bind(this);
  }

  generateGrid(size) {
    var cells = [];
    for(var i = 0; i < size; i += 100) {
      var row = [];
      for(var j = 0; j < 100; j++) {
        row.push(<Cell />);
      }
      cells.push(<tr> {row} </tr>);
    }

    return cells;
  }

  render () {
    var cells = this.generateGrid(5000);
    return (
      <div id="dungeon">
        <table>
          { cells }
        </table>
      </div>
    );
  }
}

export default Dungeon;
