import React, { Component } from 'react';
import Menu from './Menu.js';
import {Partition} from './Partition.js';
import {Room} from './Partition.js';
import {RoomBuilder} from './Partition.js';

class Cell extends Component {
    render () {
      var cellClass = "cell " + this.props.type;
      return (
        <td className={cellClass} id={[this.props.x,this.props.y]} style={this.props.styles}>
        </td>
      );
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
      this.placePartitions = this.placePartitions.bind(this);

      var cellTypes = [];
      for(var i = 0; i < 100; i++) {
        cellTypes.push(new Array(100).fill("wall"));
      }

      this.state = {
        cellTypes: cellTypes,
        cells: [],
        height: 100,
        width: 100
      };
  }

  componentDidMount() {
    var root = this.partition();
    var leafNodes = root.getLeafNodes(root);
    var roomConstructor = new RoomBuilder;
    var cellTypes = this.placePartitions(leafNodes);
    roomConstructor.generateRooms(leafNodes);
    var cellTypes = roomConstructor.placeRooms(cellTypes, leafNodes);
    var cellTypes = root.connectPartitions(cellTypes, root);
    var cells = this.generateGrid(10000, cellTypes);
  }

  generateGrid(size, cellTypes) {
    var cells = [];
    for(var y = 0; y < this.state.height; y++) {
      var row = [];
      for(var x = 0; x < this.state.width; x++) {
        var styles = {opacity: 1};
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

  partition() {
    var root = new Partition(100, 100, 0, 0);
    root.split(5, 0);
    return root;
  }

  placePartitions(partition) {
    var cells = this.state.cellTypes;
    for(var i = 0; i < partition.length; i++) {
      var currP = partition[i];
      for(var y = currP.y; y < currP.y + currP.height; y++) {
        for(var x = currP.x; x < currP.x + currP.width; x++) {
          if(x === currP.x || y === currP.y || x === currP.x + currP.width ||
              y === currP.y + currP.height) {
                cells[y][x] = "border";
              }
        }
      }
    }
    return cells;
  }

  render () {
    return (
      <div id="dungeon">
        <div id="notice">
          <h2> ReactJS Roguelike Dungeon Crawler </h2>
          <p> This is a work in progress. </p>
          <Menu />
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
