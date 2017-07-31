import React, { Component } from 'react';

class Player extends Component {
  constructor () {
    super();
    this.placePlayer = this.placePlayer.bind(this);
    this.withinView = this.withinView.bind(this);
  }

  placePlayer(cells, partitions) {
    var index = Math.floor(Math.random() * (partitions.length - 1));
    var room = partitions[index];
    var center = {
      x: Math.floor(room.x + room.width * 0.5),
      y: Math.floor(room.y + room.height * 0.5)
    };

    cells[center.y][center.x] = "player";
    return cells;
  }

  withinView(cellX, cellY, cellTypes) {
    var maxY = cellY < 95 ? 5 : (100 - cellY);
    var minY = cellY > 4 ? cellY - 5 : 0;
    for(var y = minY; y < cellY + maxY; y++) {
      var maxX = cellX < 95 ? 5 : (100 - cellX);
      var minX = cellX > 4 ? cellX - 5 : 0;
      for(var x = minX; x < cellX + maxX; x++) {
        if(cellTypes[y][x] === "player") {
          return true;
        }
      }
    }

    return false;
  }
}

export default Player;
