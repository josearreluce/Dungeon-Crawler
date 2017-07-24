import React, { Component } from 'react';
import Menu from './Menu.js';

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

class Partition {
  constructor(height, width, x ,y) {
    const MIN_SIZE = 5;

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.lchild = undefined;
    this.rchild = undefined;
    this.minSize = MIN_SIZE;
  }

  chooseDirection(height, width) {
    var horizontal = Math.random() > 0.5;
    if(width > height && width > height * 1.25) {
      horizontal = false;
    } else if (height > width && height > width * 1.25) {
      horizontal = true;
    }

    return horizontal;
  }

  split() {
    if(this.lchild || this.rchild) {
      return false;
    }
    var height = this.height;
    var width = this.width;
    var x = this.x;
    var y = this.y;

    var horizontal = this.chooseDirection(height, width);

    var max = horizontal ? height : width;
    var min = this.minSize;
    if(max < min) {
      return false;
    }

    var splitAt = Math.floor(Math.random() * (max - min) + min);

    if(horizontal) {
      this.lchild = new Partition(splitAt, width, x, y);
      this.rchild = new Partition(height - splitAt,
        width, x, y + splitAt);
    } else {
      this.lchild = new Partition(height, splitAt, x, y);
      this.rchild = new Partition(height, width - splitAt,
        x + splitAt, y);
    }

    return true;
  }

  verifySize() {
    return this.height >= this.minSize &&
          this.width >= this.minSize;
  }
}

class Dungeon extends Component {
  constructor () {
      super();

      this.drawPartition = this.drawPartition.bind(this);
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
        width: 100
      };
  }

  componentDidMount() {
    var partitions = this.partition(12,100,100);
    var cellTypes = this.drawPartition(partitions);
    var cells = this.generateGrid(10000, cellTypes);
  }

  drawPartition(partitions) {
    //TO DO: remove none leaf nodes
    var cellTypes = this.state.cellTypes;

    for(var i = 0; i < partitions.length; i++) {
      var p = partitions[i];
      for(var y = p.y; y < p.y + p.height; y++) {
        for(var x = p.x; x < p.x + p.width; x++) {
          if(y === p.y || y === p.y + p.height - 1) {
            cellTypes[y][x] = "room";
          } else {
            if(x === p.x || x === p.x + p.width - 1) {
              cellTypes[y][x] = "room";
            }
          }
        }
      }
    }

    return cellTypes;
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

  partition(numRooms, height, width) {
    var root = new Partition(height, width, 0, 0);
    var partitions = [];
    partitions.push(root);

    var count = 0;
    while(true) {
      var length = partitions.length;
      if(length > 100) {
        break;
      }

        partitions[count].split();
        if(partitions[count].lchild &&
           partitions[count].verifySize()) {
          partitions.push(partitions[count].lchild);
        }

        if(partitions[count].rchild &&
           partitions[count].verifySize()) {
          partitions.push(partitions[count].rchild)
        }

        if(partitions.length === length) {
          break;
        }

        count += 1;
    }
    console.log(partitions);
    return partitions;
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
