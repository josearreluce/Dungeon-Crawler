import React, { Component } from 'react';

class Cell extends Component {
    render () {
      var cellClass = "cell " + this.props.type;
      return (
        <td className={cellClass} id={this.props.id}></td>
      );
    }
}

class Room {
    constructor(height, width, point) {
      this.height = height;
      this.width = width;
      this.point = point;
    }
}

class Dungeon extends Component {
  constructor () {
      super();

      this.generateGrid = this.generateGrid.bind(this);
      this.getHeight = this.getHeight.bind(this);
      this.getWidth = this.getWidth.bind(this);
      this.getRandomPoint = this.getRandomPoint.bind(this);
      this.placeRooms = this.placeRooms.bind(this);

      this.state = {
        gridSize: 10000,
        cellTypes: Array(10000).fill("wall"),
        cells: []
      };
  }

  componentDidMount() {
    var rooms = this.generateRooms(5);
    var cellTypes = this.placeRooms(rooms);
    var cells = this.generateGrid(10000, cellTypes);
  }

  generateGrid(size, cellTypes) {
    var cells = [];
    for(var i = 0; i < size; i += 100) {
      var row = [];
      for(var j = 0; j < 100; j++) {
        row.push(<Cell id={i + j} type={cellTypes[i + j]} />);
      }
      cells.push(<tr> {row} </tr>);
    }

    this.setState({
      cells: cells,
      cellTypes: cellTypes
    });
  }

  generateRooms(num) {
      var rooms = [];
      for(var i = 0; i < num; i++) {
        var height = this.getHeight(50);
        var width = this.getWidth(50);
        var point = this.getRandomPoint(this.state.gridSize);
        rooms.push(new Room(height, width, point));
      }
      return rooms;
  }

  getWidth(maxSize) {
    return Math.floor(Math.random() * maxSize) + 5;
  }

  getHeight(maxSize) {
    return Math.floor(Math.random() * maxSize) + 5;
  }

  getRandomPoint(gridSize) {
    var x = Math.floor(Math.random() * gridSize);
    var y = Math.floor(Math.random() * gridSize);
    return [x,y];
  }

  placeRooms(rooms) {
    var cellTypes = this.state.cellTypes;
    for(var i = 0; i < rooms.length; i++) {
      var currRoom = rooms[i];
      for(var j = currRoom.point[0]; j < currRoom.point[0] + (currRoom.height * 100); j += 100) {
        for(var k = j; k < j + currRoom.width; k++) {
          cellTypes[k] = "room";
        }
      }
    }
    return cellTypes;
  }

  render () {
    return (
      <div id="dungeon">
        <table>
          { this.state.cells }
        </table>
      </div>
    );
  }
}

export default Dungeon;
