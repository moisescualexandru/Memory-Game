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

	if (counter == 1) {
    	firstCard = card;
	} else if (counter == 2) {
		secondCard = card;
		setTimeout (matchCards,1500);
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

//verifying if the cards match

function matchCards () {
    counter = 0;
    if (firstCard == secondCard ) {
        let turnedCard = document.getElementsByClassName(firstCard);
    } else {
        let turnedCard1 = document.querySelector("."+firstCard+"-turn"); 
        let turnedCard2 = document.querySelector("."+secondCard+"-turn");
		turnedCard1.classList.add(firstCard);
		turnedCard2.classList.add(secondCard);
		turnedCard1.classList.remove(firstCard+"-turn");
		turnedCard2.classList.remove(secondCard+"-turn"); 
    }
}

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
