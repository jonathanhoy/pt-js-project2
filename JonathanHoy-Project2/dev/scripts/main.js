// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.

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


$(function (){
	
	const cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];

	
	let shuffledCardArray = shuffle(cardArray);
	let shuffledCardList = '';
	for (let i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += `<li class="card"><div class="card"><div class="front"></div><div class="back ${shuffledCardArray[i]}"><img src="../dev/assets/${shuffledCardArray[i]}.png" alt="A cute picture of ${shuffledCardArray[i]}."></div></div></li>`;
	}

	$('.cards').html(shuffledCardList);

	console.log(shuffledCardArray);


	$('.front').on('click', function (){
		$(this).toggleClass('flip');
		$(this).next().toggleClass('flip');
		if ($(this).next().hasClass('bulbasaur')) {
			flippedCards.push('bulbasaur');
			compareCards();
		} else if ($(this).next().hasClass('charmander')) {
			flippedCards.push('charmander');
			compareCards();
		} else if ($(this).next().hasClass('squirtle')) {
			flippedCards.push('squirtle');
			compareCards();
		} else {
			flippedCards.push('pikachu');
			compareCards();
		};
		// console.log(flippedCards);
	});

	$('.back').on('click', function (){
		$(this).toggleClass('flip');
		$(this).prev().toggleClass('flip');
	});

	const flippedCards = [];

	const compareCards = () => {
		if (flippedCards.length === 2) {
			if (flippedCards[0] === flippedCards[1]) {
				console.log('match!');
				flippedCards.pop();
				flippedCards.pop();
				console.log(flippedCards);
			};
		};
	};

	// if statement to determine when two cards are flipped, can't flip any more cards?

	// FLIPPED ARRAY. When cards are flipped, the string ${shuffledCardArray[i] is added to a new array. When the length of the array is 2, if statement to see if [0] === [1] meaning match.


	// if two flipped cards match, add class 'completed' with some CSS and won't be flipped anymore?



});











