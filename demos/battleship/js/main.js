(function() {
  const BOARD_OFFSET_X = 50;
  const BOARD_OFFSET_Y = 50;
  var game = new Game();

  function render() {
    var grid1 = game.player1.board.grid;
    var grid2 = game.player2.board.grid;
    var target1 = $('#player1 > .board');
    var target2 = $('#player2 > .board');
    var el;

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        el1 = $('<div/>')
          .addClass('tile')
          .data({coordinates: [j, i], player: 1})
          .css({
            left: (50 * j + BOARD_OFFSET_X) + "px",
            top: (50 * i + BOARD_OFFSET_Y) + "px",
          });

        el2 = $('<div/>')
          .addClass('tile')
          .data({coordinates: [j, i], player: 2})
          .css({
            left: (50 * j + BOARD_OFFSET_X) + "px",
            top: (50 * i + BOARD_OFFSET_Y) + "px"
          });

        if (grid1[i][j].isOccupied) {
          el1.css("background", "blue");
        }

        if (grid2[i][j].isOccupied) {
          el2.css("background", "blue");
        }

        target1.append(el1);
        target2.append(el2);
      }
    }
  }

  function init() {
    game.player1.placeShip("carrier", "vertical", 0, 3);
    game.player1.placeShip("battleship", "horizontal", 2, 5);
    game.player1.placeShip("cruiser", "horizontal", 0, 0);
    game.player1.placeShip("submarine", "vertical", 9, 0);
    game.player1.placeShip("destroyer", "vertical", 9, 4);

    game.player2.placeShip("carrier", "horizontal", 5, 9);
    game.player2.placeShip("battleship", "vertical", 4, 5);
    game.player2.placeShip("cruiser", "horizontal", 0, 3);
    game.player2.placeShip("submarine", "vertical", 9, 0);
    game.player2.placeShip("destroyer", "horizontal", 6, 4);

    render();

    $('.tile').click(function () {
      try {
        if ($(this).data("player") == 1 && game.currentPlayer == game.player1 ||
        $(this).data("player") == 2 && game.currentPlayer == game.player2) {
          throw("Choose an enemy square");
        }

        $('#error').text("");

        var coords = $(this).data("coordinates");
        game.fire(coords[0], coords[1], function(target) {
          if (target.isHit) {
            $(this).css("background", "red");
          } else {
            $(this).css("background", "white");
          }
        }.bind(this));
      } catch(error) {
        $('#error').text(error);
      }
    });
  }

  init();
})();
