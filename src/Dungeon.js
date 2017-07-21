import React, { Component } from 'react';

class Cell extends Component {
    render () {
      var cellClass = "cell " + this.props.type;
      return (
        <td className={cellClass} id={[this.props.x,this.props.y]} style={this.props.styles}>
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
      this.partition = this.partition.bind(this);

      this.state = {
        cellTypes: Array(100).fill(Array(100).fill("wall")),
        cells: [],
        height: 100,
        width: 100
      };
  }

  componentDidMount() {
    var cells = this.generateGrid(10000, this.state.cellTypes);
  }

  generateGrid(size, cellTypes) {
    var cells = [];
    for(var y = 0; y < this.state.height; y++) {
      var row = [];
      for(var x = 0; x < this.state.width; x++) {
        var styles = {opacity: Math.random()};
        row.push(<Cell key={x} x={x} y={y} type={cellTypes[y][x]} styles={styles} />);
      }
      cells.push(<tr key={y}>{row}</tr>);
    }

    this.setState({
      cells: cells,
      cellTypes: cellTypes
    });
  }

  getWidth(maxSize) {
    return Math.floor(Math.random() * maxSize);
  }

  getHeight(maxSize) {
    return Math.floor(Math.random() * maxSize);
  }

  getRandomPoint(gridSize) {
    var x = Math.floor(Math.random() * (gridSize / 100));
    var y = Math.floor(Math.random() * (gridSize / 100));
    return [x,y];
  }

  partition(numRooms, height, width) {
    //TO DO
    var horizontal = Math.random() > 0.5 ? true : false;
    var maxSplit = horizontal ? width * 0.75 : height * 0.75;
    var minSplit = horizontal ? width * 0.25 : height * 0.25;
    var splitAt = Math.floor((Math.random() * (maxSplit - minSplit)) + minSplit);

    throw "TO DO";
  }

  render () {
    return (
      <div id="dungeon">
        <div id="notice">
          <h2> ReactJS Roguelike Dungeon Crawler </h2>
          <p> This is a work in progress. </p>
        </div>
        <table>
          <tbody>
            { this.state.cells }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dungeon;
