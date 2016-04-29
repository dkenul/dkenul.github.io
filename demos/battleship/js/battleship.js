const SHIPS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
}

function Game(name1, name2) {

  this.player1 = new Player(name1 || "Player 1");
  this.player2 = new Player(name2 || "Player 2");
  this.currentPlayer = this.player1;
  this.otherPlayer = this.player2;
  this.winner;

  this.isWon = function() {
    return !!this.winner;
  }

  this.fire = function(x, y, callback) {
    var target = this.otherPlayer.board.grid[y][x];

    target.hit();

    this.currentPlayer = this.otherPlayer;
    this.otherPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;

    if (callback) {
      callback(target);
    };
  }
}

function Board() {
  this.grid = newGrid();

  function newGrid() {
    var result = [];

    for (var i = 0; i < 10; i++) {
      row = [];

      for (var j = 0; j < 10; j++) {
        row.push(new Tile());
      }

      result.push(row);
    }

    return result;
  }

  this.reset = function() {
    this.grid = newGrid();
  }
}

function Tile() {
  this.hidden = true;
  this.isOccupied = false;
  this.isHit = false;

  this.hit = function() {
    if (this.isHit) {
      throw "You already hit that";
    } else if (!this.hidden) {
      throw "You already tried that";
    } else if (this.isOccupied) {
      this.isHit = true;
    }

    this.hidden = false;
  }

  this.occupy = function() {
    if (this.isOccupied) {
      throw "There's another ship here!";
    } else {
      this.isOccupied = true;
    }
  }
}

function Ship(tiles) {
  this.segments = tiles;

  this.isSunk = function() {
    for (var i = 0; i < this.segments.length; i++) {
      if (!this.segments[i].isHit) {
        return false;
      }
    }

    return true;
  }
}

function Player(name) {
  this.name = name || "anonymous";
  this.board = new Board();
  this.ships = [];

  this.placeShip = function(type, orientation, x, y) {
    var tiles = [];
    var shipLength = SHIPS[type];
    var grid = this.board.grid;

    for (var i = 0; i < shipLength; i++) {
      var target;

      if (orientation == "horizontal") {
         target = grid[y][x + i];
      } else {
        target = grid[y + i][x];
      }

      if (target) {
        tiles.push(target);
      } else {
        throw "Ship is off the board";
      }
    }

    tiles.forEach(function(tile) {
      tile.occupy();
    });

    this.ships.push(new Ship(tiles));
  }
}
