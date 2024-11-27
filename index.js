
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

// Populate the modal with player data
async function showPlayers() {
    const playersData = await fetchPlayers();
    playersList.innerHTML = ''; 
  
    playersData.players.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.className = 'player-card';
  
      playerCard.innerHTML = `
        <div class="rating-badge text-xl ml-5 mt-6">${player.rating}</div>
        <img src="${player.photo}" alt="${player.name}">
        <h3>${player.name}</h3>
      `;
  
      playersList.appendChild(playerCard);
    });
  }


faceCards.forEach(card => {
  card.addEventListener('click', () => {
    showPlayers();
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
