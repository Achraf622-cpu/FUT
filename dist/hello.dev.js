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

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("HTTP error! status: ".concat(response.status));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          return _context.abrupt("return", _context.sent);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching players:', _context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function renderPlayer(player) {
  var playerDiv = document.createElement('div');
  playerDiv.className = 'player w-full min-h-[60px] bg-[#2a2a30] flex items-center justify-between rounded-[5px]';
  playerDiv.innerHTML = "\n    <div class=\"flex items-center w-[70%] pl-5 cursor-pointer\">\n      <div class=\"profileImage w-[40px] h-[40px] rounded-[50%] bg-[#bfbfbf] overflow-hidden\">\n        <img src=\"".concat(player.photo, "\" alt=\"").concat(player.name, " image profile\" class=\"w-[40px] h-[40px]\">\n      </div>\n      <div class=\"playerInformation flex flex-col justify-evenly pl-4\">\n        <h3 class=\"text-white\">").concat(player.name, "</h3>\n        <h6 class=\"text-[#b0b0b0]\">").concat(player.nationality, "</h6>\n      </div>\n    </div>\n    <div class=\"w-[20%] h-full flex justify-center items-center\">\n      <i class=\"fa-solid fa-trash text-xl text-red-600 cursor-pointer\"></i>\n    </div>\n  ");
  return playerDiv;
}

function displayPlayers() {
  var playersContainer, playersData;
  return regeneratorRuntime.async(function displayPlayers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          playersContainer = document.querySelector('.players'); // Ensure this selector matches your container

          playersContainer.innerHTML = ''; // Clear the container before appending new players

          _context2.next = 4;
          return regeneratorRuntime.awrap(fetchPlayers());

        case 4:
          playersData = _context2.sent;

          if (playersData && Array.isArray(playersData.players)) {
            playersData.players.forEach(function (player) {
              var playerDiv = renderPlayer(player);
              playersContainer.appendChild(playerDiv);
            });
          } else {
            console.error('Invalid player data format');
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Call the function to load and display players on page load


displayPlayers();
s;