// selecting and turning the card

function turnCard(event) {
	event.target.classList.toggle ('turn');
}

const table = document.querySelector ('#grid');
table.addEventListener ('click', turnCard);