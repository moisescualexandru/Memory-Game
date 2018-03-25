// selecting and turning the card

function turnCard(event) {
	let card = event.target.className;
	let valueOfIndex, ok;
	counter++;
	for (let i = 0; i<classes.length; i++){
		let intermediar = classes[i]+'-turn';
		if (intermediar == card) {
			ok=1;
			valueOfIndex = classes[i];
			break;
		}
	 	else if (card == classes[i]){
			ok=2;
			break;
		}
	}
	if (ok==1) {
		event.target.classList.remove (card);
		event.target.classList.add (valueOfIndex);
	}
	else if (ok==2) {
		event.target.classList.remove (card);
		event.target.classList.add (card+'-turn');
	}

//verifying if the cards match

	if (counter == 1) {
		firstCard = card;
	}

	else if (counter == 2) {
		counter = 0;
		secondCard = card;
		if (firstCard == secondCard) {
			counterFinish += 2;
			if (counterFinish == 16) {

			}
			let turnedCards = query.SelectorAll ('.'+firstCard);
			for (let el of tunedCards) {
				el.classList.remove (firstCard);
				el.classList.add (firstCard+'matched');
			}
		}
		else {
			querySelector('.'+firstCard).classList.remove (firstCard);
			querySelector('.'+firstCard).classList.add (firstCard.substring(0,str.indexOf('-'));
			querySelector('.'+secondCard).classList.remove (secondCard);
			querySelector('.'+secondCard).classList.add (secondCard.substring(0,str.indexOf('-'));
		}
	}
}

//randomising the classes

let classes = ['one', 'two', 'three', 'four','five', 'six', 'seven', 'eight','one', 'two', 'three', 'four','five', 'six', 'seven', 'eight'];

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
let counter = 0, counterFinish = 0;
let firstCard, secondCard;
