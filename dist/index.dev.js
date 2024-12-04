"use strict";

var faceCards = document.querySelectorAll('.faceCard');
var playersModal = document.getElementById('playersModal');
var closeModal = document.getElementById('closeModal');
var playersList = document.getElementById('playersList');
var asideFaceCards = document.querySelectorAll('.aside .faceCard');
var removePlayerButton = document.getElementById('removePlayer');
var selectedPositionCard = null;
var selectedPlayers = new Set();

function fetchPlayers() {
  var response;
  return regeneratorRuntime.async(function fetchPlayers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('players.json'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching players:', _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function showPlayers(getPosition) {
  var playersData, availablePlayers;
  return regeneratorRuntime.async(function showPlayers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchPlayers());

        case 2:
          playersData = _context2.sent;
          playersList.innerHTML = '';
          availablePlayers = playersData.players.filter(function (player) {
            return !selectedPlayers.has(player.name);
          });
          console.log(availablePlayers);
          availablePlayers.forEach(function (player) {
            if (getPosition) {
              var playerCard = document.createElement('div');
              playerCard.className = 'player-card cursor-pointer p-2 hover:bg-gray700 rounded';

              if (getPosition == player.position) {
                playerCard.innerHTML = "\n      <div class=\"grid grid-cols-1 grid-rows-1\">\n        <div class=\"relative w-[125px] h-[125px]\">\n          <img src=\"src/000.png\" alt=\"Back Image\" class=\"absolute w-full h-full opacity-50 top-0 left-0\">\n          <h1 class=\"absolute font-bold z-10 top-2 left-2 \">".concat(player.rating, "</h1>\n          <img src=\"").concat(player.photo, "\" alt=\"Player Image\" class=\"relative z-20 w-full h-full\">\n        </div>\n        <div>\n          <h1>").concat(player.name, "</h1>\n        </div>\n      </div>\n    ");
                playerCard.addEventListener('click', function () {
                  assignPlayerToPosition(player);
                  playersModal.classList.add('hidden');
                });
                playersList.appendChild(playerCard);
              }
            } else {
              var _playerCard = document.createElement('div');

              _playerCard.className = 'player-card cursor-pointer p-2 hover:bg-gray700 rounded';
              _playerCard.innerHTML = "\n      <div class=\"grid grid-cols-1 grid-rows-1\">\n        <div class=\"relative w-[125px] h-[125px]\">\n          <img src=\"src/000.png\" alt=\"Back Image\" class=\"absolute w-full h-full opacity-50 top-0 left-0\">\n          <h1 class=\"absolute font-bold z-10 top-2 left-2 \">".concat(player.rating, "</h1>\n          <img src=\"").concat(player.photo, "\" alt=\"Player Image\" class=\"relative z-20 w-full h-full\">\n        </div>\n        <div>\n          <h1>").concat(player.name, "</h1>\n        </div>\n      </div>\n    ");

              _playerCard.addEventListener('click', function () {
                assignPlayerToPosition(player);
                playersModal.classList.add('hidden');
              });

              playersList.appendChild(_playerCard);
            }
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function assignPlayerToPosition(player) {
  if (selectedPositionCard.playerName) {
    var previousPlayerName = selectedPositionCard.playerName;
    selectedPlayers["delete"](previousPlayerName);
  }

  selectedPlayers.add(player.name);
  selectedPositionCard.innerHTML = "\n    <div class=\"relative flex flex-col items-center justify-center\">\n      <img src=\"src/000.png\" alt=\"\" class=\"w-20 h-20 z-0 opacity-50\">\n      <img src=\"".concat(player.photo, "\" alt=\"\" class=\"absolute w-16 h-16 z-10 mb-4 max-[402px]:w-[20px] max-[402px]:h-[20px]\">\n      <h1 class=\"absolute top-1 right-1 text-sm font-bold bg-white text-black px-1 rounded z-20\">").concat(player.rating, "</h1>\n      <h1 class=\"text-center mt-1 text-sm font-semibold z-20 max-[402px]:text-[5px]\">").concat(player.name, "</h1>\n    </div>\n  ");
  selectedPositionCard.playerName = player.name;
  selectedPositionCard = null;
}

removePlayerButton.addEventListener('click', function () {
  if (!selectedPositionCard) return;
  var playerName = selectedPositionCard.playerName;

  if (playerName) {
    selectedPlayers["delete"](playerName);
    selectedPositionCard.innerHTML = "<div class=\"faceCard\">\n      <img src=\"src/000.png\" alt=\"Back Image\" class=\"absolute w-20 h-20 z-0 opacity-50\"/>\n      <img src=\"src/0_.png\" alt=\"Front Image\" class=\"relative w-16 h-16 z-10 ml-2\"/>\n      </div>\n    ";
    delete selectedPositionCard.playerName;
    selectedPositionCard = null;
    playersModal.classList.add('hidden');
  }
});
faceCards.forEach(function (card) {
  card.addEventListener('click', function () {
    var getPosition = card.id;
    selectedPositionCard = card;
    playersModal.classList.remove('hidden');
    showPlayers(getPosition);
  });
});
asideFaceCards.forEach(function (card) {
  card.addEventListener('click', function () {
    selectedPositionCard = card;
    playersModal.classList.remove('hidden');
    showPlayers();
  });
});
closeModal.addEventListener('click', function () {
  playersModal.classList.add('hidden');
});
playersModal.addEventListener('click', function (event) {
  if (event.target === playersModal) {
    playersModal.classList.add('hidden');
  }
});
showPlayers();