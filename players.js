// Fetch the players data
async function fetchPlayers() {
  try {
    const response = await fetch('players.json'); 
    if (!response.ok) {
      throw new Error('Failed to fetch players data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    return { players: [] };
  }
}


async function renderPlayers() {
  const playersData = await fetchPlayers();
  const playersContainer = document.getElementById('playersContainer');
  const searchInput = document.getElementById('searchInput');

 
  function displayPlayers(filteredPlayers) {
    playersContainer.innerHTML = '';

   

    filteredPlayers.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.className =
        'bg-gray-800 p-4 rounded shadow-md hover:bg-gray-700 transition cursor-pointer';

      playerCard.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${player.photo}" alt="${player.name}" class="w-20 h-20 rounded">
          <div>
            <h2 class="text-lg font-bold">${player.name}</h2>
            <p class="text-sm text-gray-400">Position: ${player.position}</p>
            <p class="text-sm text-gray-400">Club: <img src="${player.logo}" alt="${player.club}" class="inline w-6 h-6"> ${player.club}</p>
            <p class="text-sm text-gray-400">Nationality: <img src="${player.flag}" alt="${player.nationality}" class="inline w-6 h-6"> ${player.nationality}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-4 text-center">
          <div>
            <h3 class="font-bold text-green-400">${player.rating}</h3>
            <p class="text-xs text-gray-400">Rating</p>
          </div>
          <div>
            <h3 class="font-bold text-green-400">${player.pace}</h3>
            <p class="text-xs text-gray-400">Pace</p>
          </div>
          <div>
            <h3 class="font-bold text-green-400">${player.shooting}</h3>
            <p class="text-xs text-gray-400">Shooting</p>
          </div>
          <div>
            <h3 class="font-bold text-green-400">${player.passing}</h3>
            <p class="text-xs text-gray-400">Passing</p>
          </div>
          <div>
            <h3 class="font-bold text-green-400">${player.dribbling}</h3>
            <p class="text-xs text-gray-400">Dribbling</p>
          </div>
          <div>
            <h3 class="font-bold text-green-400">${player.defending}</h3>
            <p class="text-xs text-gray-400">Defending</p>
          </div>
          <div>
            <h3 class="font-bold text-green-400">${player.physical}</h3>
            <p class="text-xs text-gray-400">Physical</p>
          </div>
        </div>
      `;

      playersContainer.appendChild(playerCard);
    });
  }
  displayPlayers(playersData.players);
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPlayers = playersData.players.filter(player =>
      player.name.toLowerCase().includes(searchTerm) ||
      player.position.toLowerCase().includes(searchTerm) ||
      player.club.toLowerCase().includes(searchTerm)
    );
    displayPlayers(filteredPlayers);
  });
}
renderPlayers();
