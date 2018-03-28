// selecting and turning the card

function turnCard(event) {
	if (event.target.tagName == 'TD') { //check if the event is a grid element
		let card = event.target.className;
		let valueOfIndex, ok;
		counter++;
		movesCounter++;
		document.getElementById('number-of-moves').textContent = movesCounter;
		//changing the number of stars depending on the performance
		if (movesCounter >= 30 && movesCounter < 40) {
			let stars1 = document.querySelectorAll('#third');
			for (let star1 of stars1) {
				star1.setAttribute('src', 'img/star-not.png');
			}
		} else if (movesCounter >= 40) {
			let stars2 = document.querySelectorAll('#second');
			for (let star2 of stars2) {
			star2.setAttribute('src', 'img/star-not.png');
			}
		}
		//lopp through the classes to see if the card is already turned
		for (let i = 0; i<classes.length; i++) { 
			let intermediar = classes[i]+'-turn';
			if (intermediar == card) {
				ok=1;
				valueOfIndex = classes[i];
				break;
			}
		 	else if (card == classes[i]) {
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
		setTimeout (el.classList.add('matched'), 2000);
    }
    counterFinish++;
    if (counterFinish == 8) {
    	// display the pop-up window with the game information
    	seconds.textContent = timerSeconds;
    	minutes.textContent = timerMinutes;
    	clearInterval(countTimer);
    	let popUp = document.getElementById('finish-pop-up');
    	setTimeout(function() {
    		popUp.style.display = 'inline';
    		document.querySelector('.moves').textContent = movesCounter;
    		if (seconds.textContent < 10 && minutes.textContent < 10) {
    			document.querySelector('.time').textContent = '0' + minutes.textContent + ':' + '0' + seconds.textContent;
    			seconds.textContent = '0' + timerSeconds;
    			minutes.textContent = '0' + timerMinutes;
    		}
    		else if (seconds.textContent >= 10 && minutes.textContent < 10) {
    			document.querySelector('.time').textContent = '0' + minutes.textContent + ':' + seconds.textContent;
    			seconds.textContent = timerSeconds;
    			minutes.textContent = '0' + timerMinutes;
    		}
    		else {
    			document.querySelector('.time').textContent = minutes.textContent + ':' + seconds.textContent;
    			seconds.textContent = timerSeconds;
    			minutes.textContent = timerMinutes;
    		}
    	}, 1500);
    	window.onclick = function (event) {
    		popUp.style.display = 'none';
    	}
    }
}

//two unmatching cards function

function unmatchCards () {
	counter = 0;
    let turnedCard1 = document.querySelector('.'+firstCard+'-turn'); 
    let turnedCard2 = document.querySelector('.'+secondCard+'-turn');
    turnedCard1.classList.add('unmatched'); //adding animation for unmatching cards
    turnedCard2.classList.add('unmatched');
    setTimeout (function (){ 				//returning to the initial mode
	    turnedCard1.classList.remove('unmatched');
	    turnedCard2.classList.remove('unmatched');
		turnedCard1.classList.add(firstCard);
		turnedCard2.classList.add(secondCard);
		turnedCard1.classList.remove(firstCard+'-turn');
		turnedCard2.classList.remove(secondCard+'-turn'); 
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

//reset the grid function

function removeClasses () {
	const gridCards = document.querySelectorAll ('td');
	for (let elem of gridCards) {
		elem.removeAttribute('class');
	}
}

//start game function

function startGame () {
	shuffle(classes);
	setTimeout (addingClasses,300);
	timer();
	table.addEventListener ('click', turnCard);
	buttonStart.removeEventListener('click',startGame);
}

//reset button function

function resetGrid () {
	removeClasses();
	counter = 0;
	movesCounter = 0;
	document.getElementById('number-of-moves').textContent = movesCounter;
	firstCard = '';
	secondCard = '';
	let stars = document.querySelectorAll ('img');
	for (let star of stars) {
		star.setAttribute ('src', 'img/star.png');
	}
	clearInterval(countTimer);
	timerSeconds = 0;
	timerMinutes = 0;
	minutes.textContent = '0'+timerMinutes;
	seconds.textContent = '0'+timerSeconds;
	buttonStart.addEventListener('click', startGame);
}

//timer function

function timer() {
	let minutes = document.querySelector('#minutes');
	let seconds = document.querySelector('#seconds');
	timerSeconds = 0;
	timerMinutes = 0;
	countTimer = setInterval (function () {
		timerSeconds++;
		if (timerSeconds < 10) {
			seconds.textContent = '0'+timerSeconds;
		} else {
			seconds.textContent = timerSeconds;
		}
		if(timerSeconds == 60) {
			timerSeconds = 0;
			timerMinutes++;
			if (timerMinutes < 10) {
				minutes.textContent = '0' + timerMinutes;
				seconds.textContent = '0' +timerSeconds;
			} else {
				minutes.textContent = timerMinutes;
			}
		}
	},1000);
}

//adding event listener and declaring the global scope variables

const table = document.querySelector ('#grid');
const buttonStart = document.querySelector('#start');
const buttonReset = document.querySelector('#reset');
buttonStart.addEventListener('click', startGame);
buttonReset.addEventListener('click', resetGrid);
let counter = 0, movesCounter = 0, firstCard, secondCard, timerSeconds, timerMinutes, countTimer, counterFinish = 0;

//display the pop-up for instructions on playing the game
const iPopUp = document.getElementById('instructions-pop-up');
const instructions = document.querySelector ('#instructions');
instructions.addEventListener('click', function () {
	iPopUp.style.display = 'block';
});

window.onclick = function (event) {
	if (event.target == iPopUp) {
		iPopUp.style.display = 'none';
	}
}