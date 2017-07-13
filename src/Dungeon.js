import React, { Component } from 'react';

class Room extends Component {
  render () {
    return (
      <div style={this.props.styles}></div>
    );
  }
}

class Dungeon extends Component {
  constructor () {
      super();
      this.getRandomPointInCircle = this.getRandomPointInCircle.bind(this);
      this.getRoomHeight = this.getRoomHeight.bind(this);
      this.getRoomWidth = this.getRoomWidth.bind(this);
      this.generateRooms = this.generateRooms.bind(this);
  }

  getRandomPointInCircle (radius) {
    var t = 2 * Math.PI * Math.random();
    var u = Math.random() + Math.random();
    var r = null;
    if(u > 1) {
      r = 2 - u;
    } else {
      r = u;
    }

    return [radius * r * Math.cos(t), radius * r * Math.sin(t)];
  }

  getRoomHeight () {
    return Math.floor(Math.random() * 100);
  }

  getRoomWidth () {
    return Math.floor(Math.random() * 100);
  }

  generateRooms (num) {
    var rooms = [];
    for(var i = 0; i < num; i++) {
      var upperLeftCorner = this.getRandomPointInCircle(1000);
      var height = this.getRoomHeight();
      var width = this.getRoomWidth();

      var x = Math.floor(Math.abs(upperLeftCorner[0]));
      var y = Math.floor(Math.abs(upperLeftCorner[1]));
      var dimensions = {
        border: '5px solid black',
        marginLeft: x,
        marginTop: y,
        height: height,
        width: width
      };

      rooms.push(<Room styles={dimensions} />);
    }

    //Should return rooms only. X and Y passed in for dev purposes.
    return [rooms, x, y];
  }

  render () {
    var roomInfo = this.generateRooms(1);

    return (
      <div>
        <p> This is a WIP </p>
        <p> The Dungeon will go here. </p>
        <p> Random Point: { roomInfo[1]},
                          { roomInfo[2]}
        </p>
        { roomInfo[0][0] }
      </div>
    );
  }
}

export default Dungeon;
