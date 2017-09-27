class Board {
  constructor(position = Board.startPosition, currentPlayer = Piece.WOLF) {
    this.gameBoard = position.map(n => n.slice());
    this.currentPlayer = currentPlayer;
  }

  move(row, column, direction) {
  	let player = this.gameBoard[row][column];
    let [newRow, newColumn] = this.getNewPosition(row, column, direction);
    this.gameBoard[row][column] = 0;
    this.gameBoard[newRow][newColumn] = player;
    this.changeCurrentPlayer();
  }

  getNewPosition(row, column, direction) {
    switch (direction) {
    	case Direction.NW: row--; column--; break;
      case Direction.NE: row--; column++; break;
      case Direction.SW: row++; column--; break;
      case Direction.SE: row++; column++; break;
    }
    return [row, column];
  }

  changeCurrentPlayer() {
    switch (this.currentPlayer) {
      case Piece.SHEEP: this.currentPlayer = Piece.WOLF; break;
      case Piece.WOLF: this.currentPlayer = Piece.SHEEP; break;
    }
  }

  isWinner() {
    if (this.isWolfWinner() || this.isSheepBlocked())
      return Piece.WOLF;
    else if (this.isSheepWinner())
      return Piece.SHEEP;
    else
      return 0;
  }

  isWolfWinner() {
    let [sheepPositions, wolfPosition] = this.getPositions();
    for (let sheepPosition of sheepPositions) {
      if (sheepPosition[0] < wolfPosition[0]) {
        return false;
      }
    }
    return true;
  }

  isSheepWinner() {
    let [_,wolfPosition] = this.getPositions();
    let [y, x] = wolfPosition;
    let board = this.gameBoard
    if ((board[y-1] !== undefined && board[y-1][x-1] === 0) ||
        (board[y-1] !== undefined && board[y-1][x+1] === 0) ||
        (board[y+1] !== undefined && board[y+1][x-1] === 0) ||
        (board[y+1] !== undefined && board[y+1][x+1] === 0)) {
      return false;
    } else {
      return true;
    }
  }

  isSheepBlocked() {
    if (this.currentPlayer == Piece.WOLF)
      return false;

    let sheepMoves = Engine.getLegalMoves(this);
    if (sheepMoves.length == 0) return true;
    else return false;
  }

  getPositions() {
    let wolf, sheep = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        switch (this.gameBoard[y][x]) {
          case Piece.SHEEP: sheep.push([y, x]); break;
          case Piece.WOLF: wolf = [y, x]; break;
        }
      }
    }
    return [sheep, wolf];
  }

  isLegal(row, column, direction) {
    let player = this.gameBoard[row][column];

  	if (player != this.currentPlayer)
    	return false;

    if (this.isOutsideBoard(row, column, direction))
      return false;

    if (this.doesSheepGoBack(player, direction))
      return false;

    let [newRow, newColumn] = this.getNewPosition(row, column, direction);
    if (this.gameBoard[newRow][newColumn])
      return false;

    return true;
  }

  isOutsideBoard(row, column, direction) {
    if (column == 0 && (direction == Direction.NW || direction == Direction.SW))
    	return true;
    if (column == 7 && (direction == Direction.NE || direction == Direction.SE))
    	return true;
    if (row == 0 && (direction == Direction.NW || direction == Direction.NE))
    	return true;
    if (row == 7 && (direction == Direction.SW || direction == Direction.SE))
    	return true;

    return false;
  }

  doesSheepGoBack(player, direction) {
    if (player == Piece.WOLF) return false;
    return direction.includes("N");
  }

  static get startPosition() {
    return [
    	[ 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0 ]
    ];
  }

  static get pattern() {
    return [
      [ 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 0, 1, 0, 1, 0, 1, 0 ],
      [ 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 0, 1, 0, 1, 0, 1, 0 ],
      [ 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 0, 1, 0, 1, 0, 1, 0 ],
      [ 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 0, 1, 0, 1, 0, 1, 0 ]
    ];
  }

  static get WIDTH() { return Tile.WIDTH * 8; }

  static get HEIGHT() { return Tile.HEIGHT * 8; }
}
