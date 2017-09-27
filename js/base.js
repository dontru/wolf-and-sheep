class Viewport {
  static get WIDTH() { return document.width || document.body.clientWidth; }
  static get HEIGHT() { return document.height || document.body.clientHeight; }
}


HTMLCanvasElement.prototype.resize = function() {
  this.width = Viewport.WIDTH;
  this.height = Viewport.HEIGHT;
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function containsPosition(positions, position) {
  for (let elem of positions)
    if (elem[0] == position[0] && elem[1] == position[1])
      return true;
  return false;
}


class Direction {
  static get NW() { return "NW"; }
  static get NE() { return "NE"; }
  static get SW() { return "SW"; }
  static get SE() { return "SE"; }
  static get ALL() { return ["NW", "NE", "SW", "SE"] }
}


function GameObject(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
}


class Tile extends GameObject {
  static get WIDTH() { return 151-1; }
  static get HEIGHT() { return 107-1; }
}


class Piece extends GameObject {
  constructor(x, y, id, row, column) {
    super(x, y, id);
    this.row = row;
    this.column = column;
    this.setTranslation(0, 0);
  }

  setTranslation(deltaX, deltaY) {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }

  containsPoint(x, y) {
    return ptInTriangle (
      {x: x, y: y},
      {x: this.x, y: this.y - Tile.HEIGHT/2 + 1},
      {x: this.x - Tile.WIDTH/2 + 1, y: this.y},
      {x: this.x + Tile.WIDTH/2 - 1, y: this.y}
    ) || ptInTriangle (
      {x: x, y: y},
      {x: this.x, y: this.y + Tile.HEIGHT/2 - 1},
      {x: this.x - Tile.WIDTH/2 + 1, y: this.y},
      {x: this.x + Tile.WIDTH/2 - 1, y: this.y}
    );
  }

  static get SHEEP() { return 1; }
  static get WOLF()  { return 2; }
}

// http://jsfiddle.net/PerroAZUL/zdaY8/1/
function ptInTriangle(p, p0, p1, p2) {
  var A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
  var sign = A < 0 ? -1 : 1;
  var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
  var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

  return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}
