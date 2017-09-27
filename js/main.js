let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ui = new UI();
let board = new Board();
let scene = new Scene();
let mouse = new Mouse();
let gameMode;

scene.loadImages(ui, Object.assign({}, GFX, {
  "tileWhite": "ChallengeGFXPack/Isometric/groundTile_NW.png",
  "tileBlack": "pre-rendered/groundTile_NW_contrast.png",
  "sheep_SW": "ChallengeGFXPack/Isometric/astronaut_SW.png",
  "wolf_NE": "ChallengeGFXPack/Isometric/alien_NE.png",
  "sheep_NE": "ChallengeGFXPack/Isometric/astronaut_NE.png",
  "wolf_SW": "ChallengeGFXPack/Isometric/alien_SW.png",
  "rocksTall_NE_increased": "pre-rendered/rocksTall_NE_increased.png",
}), () => {
  init();
});

function init() {
  canvas.resize();
  ui.main();
  update();
  window.addEventListener("resize", () => { resize(); });
}

function update() {
  scene.update(board);
  scene.draw(canvas, ctx);
}

function newGame({flipped = false, mode = "TWO PLAYERS"} = {}) {
  if (flipped) scene.boardFlipped = true;
  else scene.boardFlipped = false;
  board = new Board();
  gameMode = mode;
  ui.hideMenu();
  update();
  if (mode == "SHEEP")
    setTimeout(() => { engineMove(); }, 250);
}

function engineMove() {
  let move = Engine.move(board);
  board.move(...move);
  update();
}

function clickDown(e) {
  if (ui.hidden) {
    let piece = scene.catchPiece(mouse.x, mouse.y);
    if (piece) {
      if (gameMode == "WOLF" && board.currentPlayer == Piece.SHEEP) return;
      if (gameMode == "SHEEP" && board.currentPlayer == Piece.WOLF) return;
      if (board.currentPlayer == piece.id) mouse.handle = piece;
    }
  }
}

function mouseMove() {
  if (ui.hidden) {
    let piece = mouse.handle;
    if (piece) {
      piece.setTranslation(-mouse.deltaX/scene.scale, -mouse.deltaY/scene.scale);
      scene.draw(canvas, ctx);
    }
  }
}

function clickUp() {
  if (ui.hidden) {
    let piece = mouse.handle;
    piece && move(piece);
    scene.draw(canvas, ctx);
  }
}

function move(piece) {
  piece.setTranslation(0, 0);

  let direction = scene.getDirection(mouse.angle);
  if (!direction)
    return;

  if (!scene.isOutsideTile(mouse.distance / scene.scale, direction))
    return;

  if (!board.isLegal(piece.row, piece.column, direction))
    return;

  board.move(piece.row, piece.column, direction);

  update();

  if(isWinner()) return;

  if (gameMode != "TWO PLAYERS") setTimeout(() => {
    engineMove();
    isWinner();
  });
}

function isWinner() {
  let winner = board.isWinner();
  if (winner) {
    alert((winner == Piece.SHEEP ? "SHEEP" : "WOLF") + " WINS");
    ui.showMenu();
    ui.main();
    return true;
  }
}

function resize() {
  canvas.resize();
  scene.resize();
  scene.draw(canvas, ctx);
}

function flip() {
  ui.hideMenu();
  scene.boardFlipped = !scene.boardFlipped;
  update();
}
