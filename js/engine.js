class Engine {
  static move(board) {
    let analyzeBoard = new Board(board.gameBoard, board.currentPlayer);
    let [sheepPositions, wolfPosition] = analyzeBoard.getPositions();

    switch (analyzeBoard.currentPlayer) {
      case Piece.SHEEP: return Engine.sheepMove(analyzeBoard, sheepPositions);
      case Piece.WOLF: return Engine.wolfMove(analyzeBoard, wolfPosition);
    }
  }

  static sheepMove(board, sheepPositions) {
    let legalMoves = Engine.getLegalSheepMoves(board, sheepPositions);
    if (legalMoves.length == 1)
      return legalMoves[0];

    let tmp = [], max, bestMoves;
    for (let move of legalMoves) {
      let tmpBoard = new Board(board.gameBoard, board.currentPlayer);
      tmpBoard.move(...move);
      tmp.push({ move, value: WolfFactor(tmpBoard) });
    }

    max = tmp.map(n => n.value).max();
    bestMoves = tmp.filter(n => n.value == max).map(n => n.move);
    return bestMoves[0];
  }

  static wolfMove(board, wolfPosition) {
    let legalMoves = Engine.getLegalWolfMoves(board, wolfPosition);
    if (legalMoves.length == 1)
      return legalMoves[0];

    let tmp = [], min, bestMoves;
    for (let move of legalMoves) {
      let tmpBoard = new Board(board.gameBoard, board.currentPlayer);
      tmpBoard.move(...move);
      tmp.push({ move, wolfFactor: WolfFactor(tmpBoard) });
    }

    min = tmp.map(n => n.wolfFactor).min();
    bestMoves = tmp.filter(n => n.wolfFactor == min).map(n => n.move);
    if (bestMoves.length == 1)
      return bestMoves[0];

    tmp = [];
    for (let move of bestMoves) {
      let tmpBoard = new Board(board.gameBoard, board.currentPlayer);
      tmpBoard.move(...move);
      tmp.push({ move, value: Engine.evaluatePosition(tmpBoard) });
    }

    min = tmp.map(n => n.value).min();
    bestMoves = tmp.filter(n => n.value == min).map(n => n.move);
    return bestMoves[0];
  }

  static getLegalMoves(board) {
    let legalMoves = [];
    let [sheepPositions, wolfPosition] = board.getPositions();
    let positions = [...sheepPositions, wolfPosition];

    for (let piece of positions)
      for (let direction of Direction.ALL)
        if (board.isLegal(piece[0], piece[1], direction))
          legalMoves.push([piece[0], piece[1], direction]);

    return legalMoves;
  }

  static getLegalSheepMoves(board, sheepPositions) {
    let legalMoves = [];

    for (let piece of sheepPositions)
      for (let direction of Direction.ALL)
        if (board.isLegal(piece[0], piece[1], direction))
          legalMoves.push([piece[0], piece[1], direction]);

    return legalMoves;
  }

  static getLegalWolfMoves(board, wolfPosition) {
    let legalMoves = [];

    for (let direction of Direction.ALL)
      if (board.isLegal(wolfPosition[0], wolfPosition[1], direction))
        legalMoves.push([wolfPosition[0], wolfPosition[1], direction]);

    return legalMoves;
  }

  static evaluatePosition(board) {
    let value = 0;
    let [sheepPositions, wolfPosition] = board.getPositions();
    let sheepRows = sheepPositions.map(n => n[0]);
    let sheepColumns = sheepPositions.map(n => n[1]);
    let wolfRow = wolfPosition[0];
    let wolfColumn = wolfPosition[1];

    switch (sheepRows.max() - sheepRows.min()) {
      case 0:
      case 1: value += 4; break;
      case 2: value += 3; break;
      case 3: value += 2; break;
      case 4: value += 1; break;
    }

    for (let column of sheepColumns) {
      switch (column) {
        case 1: case 6: value += 3; break;
        case 2: case 5: value += 5; break;
        case 3: case 4: value += 6; break;
      }
    }

    switch (wolfRow) {
      case 1: value -= 32; break;
      case 2: value -= 16; break;
      case 3: value -= 8; break;
      case 4: value -= 4; break;
      case 5: value -= 2; break;
      case 6: value -= 1; break;
    }

    switch (wolfColumn) {
      case 3: case 4: value -= 6; break;
      case 2: case 5: value -= 5; break;
      case 1: case 6: value -= 3; break;
    }

    return value;
  }
}

function WolfFactor(board, depth = 0, lastMoves = []) {
  let analyzeBoard = new Board(board.gameBoard, Piece.WOLF);
  let [_, wolfPosition] = analyzeBoard.getPositions();

  if (containsPosition(lastMoves, wolfPosition) || depth > 10)
    return 1000;

  if (containsPosition([[0,1],[0,3],[0,5],[0,7]], wolfPosition))
    return depth;

  let values = [];
  let myLastMoves = [...lastMoves, wolfPosition];

  let legalMoves = [];
  for (let direction of Direction.ALL) {
    if (analyzeBoard.isLegal(wolfPosition[0], wolfPosition[1], direction)) {
      legalMoves.push([wolfPosition[0], wolfPosition[1], direction]);
    }
  }

  for (let move of legalMoves) {
    let tmpBoard = new Board(analyzeBoard.gameBoard, Piece.WOLF);
    tmpBoard.move(...move);
    values.push( WolfFactor(tmpBoard, depth+1, myLastMoves) );
  }

  return values.min();
}
