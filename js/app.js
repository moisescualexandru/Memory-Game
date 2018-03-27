// selecting and turning the card

function turnCard(event) {
	if (event.target.tagName == 'TD') { //check if the event is a grid element
		let card = event.target.className;
		let valueOfIndex, ok;
		counter++;
		for (let i = 0; i<classes.length; i++) { //lopp through the classes to see if the card is already turned
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
		if (ok==1) {	// if the first card was already turned and clicked again, it unterns it and resets the counter
			counter=0;
			event.target.classList.remove (card);
			event.target.classList.add (valueOfIndex);
			return;
		}
		else if (ok==2) { //if the card was not turned, it turns the card
			event.target.classList.remove (card);
			event.target.classList.add (card+'-turn');
		}

		if (counter == 1) { //if only one card is turned, getting the className for the matching function
	    	firstCard = card;
		} else if (counter == 2) { //two cards turned, checking if they match and calling the functions
			secondCard = card;
			if (firstCard == secondCard) {
				setTimeout (matchCards,0);
			}
			else {
				setTimeout(unmatchCards,650);
			}
		} 
	}

	else { //if the clicked element is not on the grid, exit function
		return;
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

//two matching cards function

function matchCards () {
    counter = 0;
	let turnedCard = document.querySelectorAll('.'+firstCard+'-turn');
	for (let el of turnedCard) {
		setTimeout (el.classList.add("matched"), 2000);
    }
}

//two unmatching cards function

function unmatchCards () {
	counter = 0;
    let turnedCard1 = document.querySelector("."+firstCard+"-turn"); 
    let turnedCard2 = document.querySelector("."+secondCard+"-turn");
    turnedCard1.classList.add("unmatched"); //adding animation for unmatching cards
    turnedCard2.classList.add("unmatched");
    setTimeout (function (){ 				//returning to the initial mode
	    turnedCard1.classList.remove("unmatched");
	    turnedCard2.classList.remove("unmatched");
		turnedCard1.classList.add(firstCard);
		turnedCard2.classList.add(secondCard);
		turnedCard1.classList.remove(firstCard+"-turn");
		turnedCard2.classList.remove(secondCard+"-turn"); 
	}, 800);
}


//adding random classes to the cards

function addingClasses () {
	const cards = document.querySelectorAll ('td');
	let i = 0;
	for (let element of cards) {
		element.classList.add(classes[i]);
		i++;
	}
}

function removeClasses () {
	const gridCards = document.querySelectorAll ('td');
	for (let elem of gridCards) {
		elem.removeAttribute('class');
	}
}

//start game function

function startGame () {
	shuffle(classes);
	removeClasses();
	addingClasses();
}

//adding event listener

const table = document.querySelector ('#grid');
table.addEventListener ('click', turnCard);
const buttons = document.querySelectorAll('button');
for (let button of buttons) {
	button.addEventListener('click', startGame);
}
let counter = 0, counterFinish = 0;
let firstCard, secondCard;
