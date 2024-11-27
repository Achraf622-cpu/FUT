
const faceCards = document.querySelectorAll('.faceCard');
const playersModal = document.getElementById('playersModal');
const closeModal = document.getElementById('closeModal');
const playersList = document.getElementById('playersList');


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
  
    playersData.players.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.className = 'player-card';
  
      playerCard.innerHTML = `
        <div class="grid grid-cols-1 grid-rows-1">
        <div class="relative w-[125px] h-[125px]">
          <img src="src/000.png" alt="Back Image" class="absolute w-full h-full opacity-50 top-0 left-0">
          <h1 class="absolute font-bold z-10 top-2 left-2 ">${player.rating}</h1>
          <img src="${player.photo}" alt="Player Image" class="relative z-20 w-full h-full">
        </div>
        <div">
          <h1>${player.name}</h1>
        </div>
      `;
  
      playersList.appendChild(playerCard);
    });
  }
  showPlayers();


faceCards.forEach(card => {
  card.addEventListener('click', () => {
    playersModal.classList.remove('hidden'); 
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
