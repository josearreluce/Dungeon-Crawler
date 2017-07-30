import React, { Component } from 'react';

class Player extends Component {
  constructor () {
    super();
    this.placePlayer = this.placePlayer.bind(this);
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
}

export default Player;
