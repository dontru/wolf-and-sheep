class Scene {
  constructor() {
    this.images = {};
    this.boardFlipped = false;
    this.initGameObjects();
    this.resize();
  }

  resize() {
    let widthScale = Viewport.WIDTH / Board.WIDTH;
    let heightScale = Viewport.HEIGHT / Board.HEIGHT;
    this.scale = Math.min(widthScale, heightScale) * 0.6;

    this.translation = {
      x: Viewport.WIDTH / 2,
      y: Viewport.HEIGHT / 2 - 3.5 * Tile.HEIGHT * this.scale
    };
  }

  initGameObjects() {
    let X = 72, Y = 51;

    let pipeT = { x: -352, y: -100 };
    let buildingL = { x: -520, y: -20 };
    let structL = {x: -800, y: -100 };
    let corridors = { x: 250, y: -150 };
    let structR = { x: 700, y: 140 };
    let pipeB = { x: -150, y: 900 };
    let structB = { x: -400, y: 850 };
    let robot =  { x: -750, y: 750 };
    let platformL = { x: -900, y: 350 };

    this.gameObjects = [
      new GameObject(-580, -200, "rocksTall_NE_increased"),
      new GameObject(structL.x, structL.y, "metalStructureBottom_NE"),
      new GameObject(structL.x, structL.y - 1*X, "metalStructureCross_NE"),

      new GameObject(pipeT.x + 3*X, pipeT.y - 3*Y, "pipeCorner_NE"),
      new GameObject(pipeT.x + 2*X, pipeT.y - 2*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x + 1*X, pipeT.y - 1*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x + 0*X, pipeT.y - 0*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x - 1*X, pipeT.y + 1*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x - 1*X, pipeT.y + 1*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x - 2*X, pipeT.y + 2*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x - 3*X, pipeT.y + 3*Y, "pipeStraight_NW"),
      new GameObject(pipeT.x - 4*X, pipeT.y + 4*Y, "pipeStraight_NW"),

      new GameObject(buildingL.x - 0*X, buildingL.y + 0*Y, "frameHighTile_NE"),
      new GameObject(buildingL.x - 1*X, buildingL.y + 1*Y, "frameHighTile_NE"),
      new GameObject(buildingL.x - 2*X, buildingL.y + 2*Y, "frameHighTile_NE"),
      new GameObject(buildingL.x - 3*X, buildingL.y + 3*Y, "frameHighTile_NE"),
      new GameObject(buildingL.x - 220, buildingL.y + 91, "buildingCorridor_NW"),

      new GameObject(-342, -200, "metalTileLarge_NE"),
      new GameObject(-342, -200, "stairs_SE"),
      new GameObject( -92,  -90, "stairs_SE"),
      new GameObject(-270, -190, "spaceCraft3_SW"),

      new GameObject(corridors.x - 108, corridors.y - 3*Y, "portal_NE"),
      new GameObject(corridors.x + 244, corridors.y + 130, "metalTileSmall_NE"),
      new GameObject(corridors.x + 1*X, corridors.y - 1*Y, "buildingCorridorOpen_NE"),
      new GameObject(corridors.x + 2*X, corridors.y - 0*Y, "buildingCorridorOpen_NE"),
      new GameObject(corridors.x + 0*X, corridors.y + 0*Y, "buildingCorridorOpen_NE"),
      new GameObject(corridors.x + 1*X, corridors.y + 1*Y, "buildingCorridorOpen_NE"),
      new GameObject(corridors.x + 170, corridors.y + 120, "station_SE"),

      new GameObject(structR.x, structR.y, "metalStructureBottom_NE"),
      new GameObject(structR.x, structR.y - 1*X, "metalStructure_NE"),
      new GameObject(structR.x, structR.y - 2*X, "metalStructureCross_NE"),

      new GameObject(720 + 1*X, 420 + 2*Y, "meteorHalf_NE"),
      new GameObject(720, 420, "meteorFull_NE"),
      new GameObject(720 + 0*X, 420 + 2*Y, "satelliteDishAntenna_SE"),

      new GameObject(297, 586, "buildingCorner_SW"),
      new GameObject(225, 628, "buildingCorridor_NW"),
      new GameObject(152, 680, "buildingOpen_NW"),
      new GameObject(132, 818, "metalTileSmall_NE"),
      new GameObject( 91, 849, "metalTileSmall_NE"),
      new GameObject( 18, 756, "stairsLong_SE"),
      new GameObject(444, 579, "buildingOpen_NW"),
      new GameObject(372, 630, "buildingCorner_NW"),
      new GameObject(324, 548, "satelliteDishAntenna_SW"),

      new GameObject(pipeB.x - 2.5*X, pipeB.y - 2.5*Y, "pipeStandStraightLinerEnd_NE"),
      new GameObject(pipeB.x - 2*X, pipeB.y - 2*Y, "pipeStandStraightLiner_NE"),
      new GameObject(pipeB.x - 1*X, pipeB.y - 1*Y, "pipeStandStraightLiner_NE"),

      new GameObject(structB.x - 1*X, structB.y - 1*Y, "metalStructureCross_NE"),
      new GameObject(structB.x, structB.y, "metalStructureCross_NE"),

      new GameObject(robot.x, robot.y, "alienBones_NE"),
      new GameObject(robot.x - 0.5*X, robot.y - 0.5*Y, "robot_SE"),

      new GameObject(platformL.x - 1*X, platformL.y - 1*Y, "metalStructureBottom_NE"),
      new GameObject(platformL.x - 2*X, platformL.y, "metalStructureBottom_NE"),
      new GameObject(platformL.x, platformL.y, "metalStructureBottom_NE"),
      new GameObject(platformL.x - 1*X, platformL.y + 1*Y, "metalStructureBottom_NE"),
      new GameObject(platformL.x - 2*X - 2, platformL.y - 1*Y - 5, "metalTileLarge_NE"),
      new GameObject(platformL.x + 1*X, platformL.y + 1*Y+20, "stairsLong_SE"),
      new GameObject(platformL.x + 15, platformL.y + 3*Y + 5, "stationLarge_SE")
    ];
  }

  update(board) {
    this.tiles = [];
    this.pieces = [];

    if (!this.boardFlipped) {
      for (let row = 0; row < 8; row++) {
        let firstX = -row * Tile.WIDTH / 2;
        let firstY =  row * Tile.HEIGHT / 2;
        for (let column = 0; column < 8; column++) {
          let posX = firstX + column * Tile.WIDTH / 2;
          let posY = firstY + column * Tile.HEIGHT / 2;

          let tileId = Board.pattern[row][column];
          this.tiles.push(new Tile(posX, posY, tileId));

          let pieceId = board.gameBoard[row][column];
          if (pieceId)
            this.pieces.push(new Piece(posX, posY, pieceId, row, column));
        }
      }
    } else {
      for (let row = 0; row < 8; row++) {
        let firstX = -row * Tile.WIDTH / 2;
        let firstY =  row * Tile.HEIGHT / 2;
        for (let column = 0; column < 8; column++) {
          let posX = firstX + column * Tile.WIDTH / 2;
          let posY = firstY + column * Tile.HEIGHT / 2;

          let tileId = Board.pattern[7-row][7-column];
          this.tiles.push(new Tile(posX, posY, tileId));

          let pieceId = board.gameBoard[7-row][7-column];
          if (pieceId)
            this.pieces.push(new Piece(posX, posY, pieceId, 7-row, 7-column));
        }
      }
    }
  }

  draw(canvas, ctx) {
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(this.translation.x, this.translation.y);
    ctx.scale(this.scale, this.scale);

    this.drawTiles(ctx);
    this.drawGameObjects(ctx);
    this.drawPieces(ctx);

    ctx.restore();
  }

  drawGameObjects(ctx) {
    for (let gameObject of this.gameObjects) {
      let x = gameObject.x;
      let y = gameObject.y;
      ctx.drawImage(this.images[gameObject.id], x, y);
    }
  }

  drawTiles(ctx) {
    for (let tile of this.tiles) {
      let x = tile.x - Tile.WIDTH/2;
      let y = tile.y - Tile.HEIGHT/2;
      switch (tile.id) {
        case 0: ctx.drawImage(this.images["tileWhite"], x, y); break;
        case 1: ctx.drawImage(this.images["tileBlack"], x, y); break;
      }
    }
  }

  drawPieces(ctx) {
    for (let piece of this.pieces) {
      let x = piece.x - 20 + piece.deltaX;
      let y = piece.y - 50 + piece.deltaY;
      if (!this.boardFlipped) {
        switch (piece.id) {
          case 1: ctx.drawImage(this.images["sheep_SW"], x, y); break;
          case 2: ctx.drawImage(this.images["wolf_NE"], x, y); break;
        }
      } else {
        switch (piece.id) {
          case 1: ctx.drawImage(this.images["sheep_NE"], x, y); break;
          case 2: ctx.drawImage(this.images["wolf_SW"], x, y); break;
        }
      }
    }
  }

  loadImages(ui, images, onDone) {
    let queue = [];
    for (let image in images)
      queue.push({ key: image, path: images[image] });
    this.loadImg(ui, queue, onDone);
  }

  loadImg(ui, images, onDone) {
    ui.loadImg();
    let image = images.pop();
    if (image !== undefined) {
      let key = image.key;
      this.images[key] = new Image();
      this.images[key].onload = () => { this.loadImg(ui, images, onDone); }
      this.images[key].src = image.path;
    } else {
      onDone();
    }
  }

  catchPiece(x, y) {
    for (let piece of this.pieces)
      if (piece.containsPoint(this.transformedX(x), this.transformedY(y)))
        return piece;
  }

  transformedX(x) { return (x - this.translation.x) / this.scale; }
  transformedY(y) { return (y - this.translation.y) / this.scale; }

  getDirection(angle) {
    if (angle <= 25 || angle >= 335) {
      return !this.boardFlipped ? Direction.NE : Direction.SW;
    } else if (angle >= 50 && angle <= 130) {
      return !this.boardFlipped ? Direction.SE : Direction.NW;
    } else if (angle >= 155 && angle <= 205) {
      return !this.boardFlipped ? Direction.SW : Direction.NE;
    } else if (angle >= 230 && angle <= 310) {
      return !this.boardFlipped ? Direction.NW : Direction.SE;
    }
  }

  isOutsideTile(distance, direction) {
    switch (direction) {
      case Direction.NE: case Direction.SW:
        if (distance > 75) return true;
      case Direction.SE: case Direction.NW:
        if (distance > 53) return true;
    }
    return false;
  }
}
