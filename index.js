const faceCards = document.querySelectorAll('.faceCard');
const playersModal = document.getElementById('playersModal');
const closeModal = document.getElementById('closeModal');
const playersList = document.getElementById('playersList');
const asideFaceCards = document.querySelectorAll('.aside .faceCard');
const removePlayerButton = document.getElementById('removePlayer');
let selectedPositionCard = null;
let selectedPlayers = new Set();

async function fetchPlayers() {
  try {
    const response = await fetch('players.json');
    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
  }
}

async function showPlayers() {
  const playersData = await fetchPlayers();
  playersList.innerHTML = ''; 

  const availablePlayers = playersData.players.filter(
    player => !selectedPlayers.has(player.name)
  );

  availablePlayers.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card cursor-pointer p-2 hover:bg-gray700 rounded';

    playerCard.innerHTML = `
      <div class="grid grid-cols-1 grid-rows-1">
        <div class="relative w-[125px] h-[125px]">
          <img src="src/000.png" alt="Back Image" class="absolute w-full h-full opacity-50 top-0 left-0">
          <h1 class="absolute font-bold z-10 top-2 left-2 ">${player.rating}</h1>
          <img src="${player.photo}" alt="Player Image" class="relative z-20 w-full h-full">
        </div>
        <div>
          <h1>${player.name}</h1>
        </div>
      </div>
    `;
    playerCard.addEventListener('click', () => {
      assignPlayerToPosition(player);
      playersModal.classList.add('hidden');
    });

    playersList.appendChild(playerCard);
  });
}

function assignPlayerToPosition(player) {
  if (selectedPositionCard.dataset.playerName) {
    const previousPlayerName = selectedPositionCard.dataset.playerName;
    selectedPlayers.delete(previousPlayerName);
  }

  selectedPlayers.add(player.name);

  selectedPositionCard.innerHTML = `
    <div class="relative flex flex-col items-center justify-center">
      <img src="src/000.png" alt="" class="w-20 h-20 z-0 opacity-50">
      <img src="${player.photo}" alt="" class="absolute w-16 h-16 z-10 mb-4">
      <h1 class="absolute top-1 right-1 text-sm font-bold bg-white text-black px-1 rounded z-20">${player.rating}</h1>
      <h1 class="text-center mt-1 text-sm font-semibold z-20">${player.name}</h1>
    </div>
  `;

  selectedPositionCard.dataset.playerName = player.name;
  selectedPositionCard = null;
}

removePlayerButton.addEventListener('click', () => {
  if (!selectedPositionCard) return;

  const playerName = selectedPositionCard.dataset.playerName;
  if (playerName) {
    selectedPlayers.delete(playerName);

    selectedPositionCard.innerHTML = `
      <div class="relative flex flex-col items-center justify-center">
        <img src="src/000.png" alt="" class="w-20 h-20 z-0 opacity-50">
      </div>
    `;
    delete selectedPositionCard.dataset.playerName;
    selectedPositionCard = null;
    playersModal.classList.add('hidden');
  }
});

faceCards.forEach(card => {
  card.addEventListener('click', () => {
    selectedPositionCard = card;
    playersModal.classList.remove('hidden');
    showPlayers();
  });
});

asideFaceCards.forEach(card => {
  card.addEventListener('click', () => {
    selectedPositionCard = card;
    playersModal.classList.remove('hidden');
    showPlayers();
  });
});

closeModal.addEventListener('click', () => {
  playersModal.classList.add('hidden');
});

playersModal.addEventListener('click', (event) => {
  if (event.target === playersModal) {
    playersModal.classList.add('hidden');
  }
});

showPlayers();
