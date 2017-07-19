import React, { Component } from 'react';

class Cell extends Component {
    render () {
      var cellClass = "cell " + this.props.type;
      return (
        <td className={cellClass} id={this.props.id} style={this.props.styles}>
        </td>
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
    var rooms = this.generateRooms(1);
    var cellTypes = this.placeRooms(rooms);
    var cells = this.generateGrid(10000, cellTypes);
  }

  generateGrid(size, cellTypes) {
    var cells = [];
    for(var i = 0; i < size; i += 100) {
      var row = [];
      for(var j = 0; j < 100; j++) {
        var styles = {opacity: Math.random()};
        if(styles.opacity < 0.2) {
          styles.opacity += 0.2;
        }
        if(cellTypes[i + j] === "room") {
          styles.opacity = 1;
        }
        row.push(<Cell id={i + j} type={cellTypes[i + j]} styles={styles}/>);
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
        var point = this.getRandomPoint(this.state.gridSize);
        var height = this.getHeight(100 - (point[0] % 100));
        var width = this.getWidth(100 - (point[0] % 100));
        rooms.push(new Room(height, width, point));
      }
      return rooms;
  }

  getWidth(maxSize) {
    return Math.floor(Math.random() * maxSize);
  }

  getHeight(maxSize) {
    return Math.floor(Math.random() * maxSize);
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
        <div id="notice">
          <h2> ReactJS Roguelike Dungeon Crawler </h2>
          <p> This is a work in progress. </p>
        </div>
        <table>
          { this.state.cells }
        </table>
      </div>
    );
  }
}

export default Dungeon;
