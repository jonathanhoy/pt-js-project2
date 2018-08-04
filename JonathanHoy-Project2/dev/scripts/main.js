// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.



$(function (){

	const cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];
	

	// SHUFFLE FUNCTION
	const shuffle = (array) => {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	};

	// SHUFFLING AND PRINTING ARRAY
	let shuffledCardArray = shuffle(cardArray);
	let shuffledCardList = '';
	for (let i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += `<li class="card"><div class="card"><div class="front"></div><div class="back ${shuffledCardArray[i]}"><img src="../dev/assets/${shuffledCardArray[i]}.png" alt="A cute picture of ${shuffledCardArray[i]}."></div></div></li>`;
	}

	$('.cards').html(shuffledCardList);

	console.log(shuffledCardArray);

	// FLIPPING CARDS
	$('.front').on('click', function (){
		$(this).toggleClass('flip');
		$(this).next().toggleClass('flip');
		if ($(this).next().hasClass('bulbasaur')) {
			flippedCards.push('bulbasaur');
		} else if ($(this).next().hasClass('charmander')) {
			flippedCards.push('charmander');
		} else if ($(this).next().hasClass('squirtle')) {
			flippedCards.push('squirtle');
		} else {
			flippedCards.push('pikachu');
		};
		// $(this).next().addClass('disabled');
		let flippedValue = flippedCards[0].toString();
		if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
			$('.back.flip').addClass('disabled');
		// } else if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
		// 	$(this).next().removeClass('disabled');
		};
		console.log(flippedValue);
		compareCards();
		// console.log(flippedCards);
	});

	// MATCHING LOGIC
	const flippedCards = [];

	const compareCards = () => {
		if (flippedCards.length > 2 && flippedCards[0] !== flippedCards[1]) {
			flippedCards.pop();
			flippedCards.pop();
			flippedCards.pop();
			console.log(flippedCards);
			$('.front').removeClass('flip');
			$('.back').removeClass('flip');
		} else if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
			flippedCards.pop();
			flippedCards.pop();
			console.log('Match!');
		};
	};

	// if statement to determine when two cards are flipped, can't flip any more cards?

	// if two flipped cards match, add class 'completed' with some CSS and won't be flipped anymore?



});











