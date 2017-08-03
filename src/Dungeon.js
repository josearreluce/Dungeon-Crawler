import React, { Component } from 'react';
import Menu from './Menu.js';
import Player from './Player.js';
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

      var cellTypes = [];
      for(var i = 0; i < 100; i++) {
        cellTypes.push(new Array(100).fill("wall"));
      }

      this.state = {
        cellTypes: cellTypes,
        cells: [],
        height: 100,
        player: undefined,
        width: 100
      };
  }

  componentDidMount() {
    var root = this.partition();
    var leafNodes = root.getLeafNodes(root);
    var roomConstructor = new RoomBuilder;
    roomConstructor.generateRooms(leafNodes);
    var cellTypes = roomConstructor.placeRooms(this.state.cellTypes, leafNodes);
    cellTypes = root.connectPartitions(cellTypes, root);
    var player = new Player;
    var player_position = player.placePlayer(cellTypes, leafNodes);
    console.log(player_position);
    var cells = this.generateGrid(cellTypes, player, player_position);
  }

  generateGrid(cellTypes, player, player_position) {
    console.log("Generating a grid.");
    var cells = [];
    for(var y = 0; y < this.state.height; y++) {
      var row = [];
      for(var x = 0; x < this.state.width; x++) {
        var cellOpacity = 0;
        if(player.withinView(x, y, cellTypes)) {
          cellOpacity = 1;
        }

        var styles = {opacity: cellOpacity};
        row.push(<Cell key={x} x={x} y={y} type={cellTypes[y][x]} styles={styles} />);
      }
      cells.push(<tr key={y}>{row}</tr>);
    }

    this.setState({
      cells: cells,
      cellTypes: cellTypes,
      player: player_position,
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

  handleKeyDown(e) {
    e.preventDefault();
    var player = this.state.player;
    var cellTypes = this.state.cellTypes;

    var key = e.which;
    if(key === 37) {
      if(player.x <= 0) {
        return;
      }

      if(cellTypes[player.y][player.x - 1] === "wall") {
        return;
      }

      cellTypes[player.y][player.x] = "room";
      cellTypes[player.y][player.x - 1] = "player";
      this.generateGrid(cellTypes, new Player, {x: player.x - 1, y: player.y});
    }

    if(key === 38) {
      if(player.y <= 0) {
        return;
      }

      if(cellTypes[player.y - 1][player.x] === "wall") {
        return;
      }

      cellTypes[player.y][player.x] = "room";
      cellTypes[player.y - 1][player.x] = "player";
      this.generateGrid(cellTypes, new Player, {x: player.x, y: player.y - 1});
    }

    if(key === 39) {
      if(player.x >= 99) {
        return;
      }

      if(cellTypes[player.y][player.x + 1] === "wall") {
        return;
      }

      cellTypes[player.y][player.x] = "room";
      cellTypes[player.y][player.x + 1] = "player";
      this.generateGrid(cellTypes, new Player, {x: player.x + 1, y: player.y});
    }

    if(key === 40) {
      if(player.y >= 99) {
        return;
      }

      if(cellTypes[player.y + 1][player.x] === "wall") {
        return;
      }

      cellTypes[player.y][player.x] = "room";
      cellTypes[player.y + 1][player.x] = "player";
      this.generateGrid(cellTypes, new Player, {x: player.x, y: player.y + 1});
    }
  }

  partition() {
    var root = new Partition(100, 100, 0, 0);
    root.split(5, 0);
    return root;
  }

  render () {
    return (
      <div tabIndex="0" id="dungeon" onKeyDown={(event) => this.handleKeyDown(event)}>
        <div id="notice">
          <h2> ReactJS Roguelike Dungeon Crawler </h2>
          <p> This is a work in progress. </p>
          <Menu
            health="100"
            weapon="stick"
            attack="7"
            level="0"
            next="60 XP"
            dungeon="0" />
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
