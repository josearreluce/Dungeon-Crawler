import React, { Component } from 'react';

class Room extends Component {
  render () {
    return (
      <div className={this.props.class} style={this.props.styles}></div>
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
      this.roomOverlap = this.roomOverlap.bind(this);
  }

  getRandomPointInCircle (radius) {
    var x = Math.floor(Math.random() * radius);
    var y = Math.floor(Math.random() * radius);
    return [x,y];

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
        marginLeft: x,
        marginTop: y,
        height: height,
        width: width
      };

      rooms.push(<Room class="room" styles={dimensions} />);
    }

    //Should return rooms only. X and Y passed in for dev purposes.
    return rooms;
  }

  roomOverlap(room1, room2) {
    var room1_x = room1.props.styles['marginLeft'];
    var room1_y = room1.props.styles['marginTop'];
    var room1_height = room1.props.styles['height'];
    var room1_width = room1.props.styles['width'];

    var room2_x = room2.props.styles['marginLeft'];
    var room2_y = room2.props.styles['marginTop'];
    var room2_height = room2.props.styles['height'];
    var room2_width = room2.props.styles['width'];

    if(room1_x > room2_x + room2_width || room2_x > room1_x + room1_width) {
      return false;
    }

    if(room1_y + room1_height < room2_y || room2_y + room2_height < room1_y) {
      return false;
    }

    return true;

  }

  render () {
    var rooms = this.generateRooms(10);
    var finalRooms = [];
    for (var i = 0; i < rooms.length; i++) {
      for (var j = i + 1; j < rooms.length; j++) {
        if(this.roomOverlap(rooms[i], rooms[j])) {
          break;
        }

        if(j === rooms.length - 1) {
          finalRooms.push(rooms[i]);
        }
      }
    }

    return (
      <div id="dungeon">
        <p> This is a WIP </p>
        <p> The Dungeon will go here. </p>
        { finalRooms }
      </div>
    );
  }
}

export default Dungeon;
