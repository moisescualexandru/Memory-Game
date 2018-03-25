// selecting and turning the card

function turnCard(event) {
	let card = event.target.className;
	let valueOfIndex, ok;
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

