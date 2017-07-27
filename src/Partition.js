class Room {
    constructor(height, width, x, y) {
      this.height = height;
      this.width = width;
      this.x = x;
      this.y = y;
    }
}

class Partition {
  constructor(height, width, x ,y) {
    const MIN_SIZE = 10;

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
  Room
};
