// selecting and turning the card

function turnCard(event) {
	let card = event.target.className;
	
	// event.target.classList.toggle ('unturn');
	// event.target.classList.toggle ('turn');
}

//randomising the classes

let classes = ['one-unturn', 'two-unturn', 'three-unturn', 'four-unturn','five-unturn', 'six-unturn', 'seven-unturn', 'eight-unturn','one-unturn', 'two-unturn', 'three-unturn', 'four-unturn','five-unturn', 'six-unturn', 'seven-unturn', 'eight-unturn'];

function shuffle(input) {
	for (let i = input.length-1; i > 0; i--){
		let randomIndex = Math.floor(Math.random()*(i+1));
		let valueAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = valueAtIndex;
	}
	return input;
}
shuffle(classes);

//adding random classes to the cards

const cards = document.querySelectorAll ('td');
let i = 0;
for (let element of cards) {
	element.classList.add(classes[i]);
	i++;
}

//adding event listener
const table = document.querySelector ('#grid');
table.addEventListener ('click', turnCard);

