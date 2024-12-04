"use strict";

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

function renderPlayers() {
  var playersData, playersContainer, searchInput, displayPlayers;
  return regeneratorRuntime.async(function renderPlayers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          displayPlayers = function _ref(filteredPlayers) {
            playersContainer.innerHTML = '';
            filteredPlayers.forEach(function (player) {
              var playerCard = document.createElement('div');
              playerCard.className = 'bg-gray-800 p-4 rounded shadow-md hover:bg-gray-700 transition cursor-pointer';
              playerCard.innerHTML = "\n        <div class=\"flex items-center space-x-4\">\n          <img src=\"".concat(player.photo, "\" alt=\"").concat(player.name, "\" class=\"w-20 h-20 rounded\">\n          <div>\n            <h2 class=\"text-lg font-bold\">").concat(player.name, "</h2>\n            <p class=\"text-sm text-gray-400\">Position: ").concat(player.position, "</p>\n            <p class=\"text-sm text-gray-400\">Club: <img src=\"").concat(player.logo, "\" alt=\"").concat(player.club, "\" class=\"inline w-6 h-6\"> ").concat(player.club, "</p>\n            <p class=\"text-sm text-gray-400\">Nationality: <img src=\"").concat(player.flag, "\" alt=\"").concat(player.nationality, "\" class=\"inline w-6 h-6\"> ").concat(player.nationality, "</p>\n          </div>\n        </div>\n        <div class=\"grid grid-cols-3 gap-2 mt-4 text-center\">\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.rating, "</h3>\n            <p class=\"text-xs text-gray-400\">Rating</p>\n          </div>\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.pace, "</h3>\n            <p class=\"text-xs text-gray-400\">Pace</p>\n          </div>\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.shooting, "</h3>\n            <p class=\"text-xs text-gray-400\">Shooting</p>\n          </div>\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.passing, "</h3>\n            <p class=\"text-xs text-gray-400\">Passing</p>\n          </div>\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.dribbling, "</h3>\n            <p class=\"text-xs text-gray-400\">Dribbling</p>\n          </div>\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.defending, "</h3>\n            <p class=\"text-xs text-gray-400\">Defending</p>\n          </div>\n          <div>\n            <h3 class=\"font-bold text-green-400\">").concat(player.physical, "</h3>\n            <p class=\"text-xs text-gray-400\">Physical</p>\n          </div>\n        </div>\n      ");
              playersContainer.appendChild(playerCard);
            });
          };

          _context2.next = 3;
          return regeneratorRuntime.awrap(fetchPlayers());

        case 3:
          playersData = _context2.sent;
          playersContainer = document.getElementById('playersContainer');
          searchInput = document.getElementById('searchInput');
          displayPlayers(playersData.players);
          searchInput.addEventListener('input', function (e) {
            var searchTerm = e.target.value.toLowerCase();
            var filteredPlayers = playersData.players.filter(function (player) {
              return player.name.toLowerCase().includes(searchTerm) || player.position.toLowerCase().includes(searchTerm) || player.club.toLowerCase().includes(searchTerm);
            });
            displayPlayers(filteredPlayers);
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

renderPlayers();