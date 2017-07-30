class Room {
    constructor(p) {
      this.x = p.x + p.random(1, p.width * 0.3);
      this.y = p.y + p.random(1, p.height * 0.3);
      this.height = p.height - (this.y - p.y);
      this.width = p.width - (this.x - p.x);
    }
}

class RoomBuilder {
  buildRoom(p) {
    return new Room(p);
  }

  generateRooms(partitions) {
    for(var i = 0; i < partitions.length; i++) {
      partitions[i].room = this.buildRoom(partitions[i]);
    }
  }

  placeRooms(cells, partitions) {
    for(var i = 0; i < partitions.length; i++) {
      var room = partitions[i].room;
      for(var y = room.y; y < room.y + room.height; y++) {
        if(y > 99) {
          break;
        }
        for(var x = room.x; x < room.x + room.width; x++) {
          cells[y][x] = "room";
        }
      }
    }

    return cells;
  }
}

class Partition {
  constructor(height, width, x ,y) {
    const MIN_SIZE = 10;

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.center = {
        x: Math.floor(this.x + (this.width / 2)),
        y: Math.floor(this.y + (this.height / 2))
    };

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

  connectPartitions(cellTypes, node) {
    if(node === undefined) {
      return cellTypes;
    }

    if(node.lchild === undefined && node.rchild === undefined) {
      return cellTypes;
    }

    for(var y = node.lchild.center.y; y <= node.rchild.center.y; y++) {
      for(var x = node.lchild.center.x; x <= node.rchild.center.x; x++) {
        cellTypes[y][x] = "room";
      }
    }

    cellTypes = this.connectPartitions(cellTypes, node.lchild);
    cellTypes = this.connectPartitions(cellTypes, node.rchild);
    return cellTypes;
  }

  getLeafNodes(node) {
    if(node === undefined) {
      return;
    }

    if(node.lchild === undefined && node.rchild === undefined) {
      return node;
    }

    var results = [];
    results = results.concat(this.getLeafNodes(node.lchild));
    results = results.concat(this.getLeafNodes(node.rchild));
    return results;
  }

  goodSplit(horizontal) {
    if(horizontal) {
      var lchild_ratio = 1;
      var rchild_ratio = 1;
    } else {
      var lchild_ratio = 1;
      var rchild_ratio = 1;
    }

    return !(lchild_ratio < 0.45 || rchild_ratio < 0.45);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  split(n, count) {
    count += 1;
    if(n <= 0) {
      return;
    }

    var horizontal = this.chooseDirection(this.height, this.width);
    if(horizontal) {
      var min = 0.25 * this.height;
      var max = 0.75 * this.height;
    } else {
      var min = 0.25 * this.width;
      var max = 0.75 * this.width;
    }

    var splitAt = this.random(min, max);
    if(horizontal) {
      this.lchild = new Partition(splitAt, this.width, this.x, this.y);
      this.rchild = new Partition(this.height - splitAt, this.width, this.x, this.y + splitAt);
    } else {
      this.lchild = new Partition(this.height, splitAt, this.x, this.y);
      this.rchild = new Partition(this.height, this.width - splitAt, this.x + splitAt, this.y);
    }

    if(this.goodSplit(horizontal)) {
      this.lchild.split(n - 1);
      this.rchild.split(n - 1);
      return true;
    } else {
      return this.split(n, count);
    }
  }
}

export {
  Partition,
  Room,
  RoomBuilder
};
