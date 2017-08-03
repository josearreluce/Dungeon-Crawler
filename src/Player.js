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
    return {x: center.x, y: center.y};
  }

  withinView(cellX, cellY, cellTypes) {
    var minY = cellY < 6 ? 0 : cellY - 6;
    var maxY = cellY > 93 ? 99 : cellY + 6;
    for(var y = minY; y <= maxY; y++) {
      var minX = cellX < 6 ? 0 : cellX - 6;
      var maxX = cellX > 93 ? 99 : cellX + 6;
      for(var x = minX; x <= maxX; x++) {
        if(cellTypes[y][x] === "player") {
          return true;
        }
      }
    }

    return false;
  }
}

export default Player;
