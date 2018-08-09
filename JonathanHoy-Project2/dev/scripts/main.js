// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.



$(function (){

	// CARD LIST
	let cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];
	

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
		shuffledCardList += `<li class="card"><div class="card"><div class="front"></div><div class="back ${shuffledCardArray[i]}"><img src="dev/assets/${shuffledCardArray[i]}.png" alt="A cute picture of ${shuffledCardArray[i]}."></div></div></li>`;
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards

	// MATCHING LOGIC
	const flippedCards = [];

	const compareCards = () => {
		if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
			const newVal = parseInt($('.count').text()) + 1;
			$('.count').text(newVal);
			flippedCards.pop();
			flippedCards.pop();
			$('.front').css('pointer-events', 'none');
			setTimeout(function(){
				$('.front').removeClass('flip');
				$('.back').removeClass('flip');
				$('.front').css('pointer-events', 'auto');
			},750);
		} else if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
			const newVal = parseInt($('.count').text()) + 1;
			$('.count').text(newVal);
			flippedCards.pop();
			flippedCards.pop();
			$('.back.flip').addClass('matched');
			$('.front.flip').addClass('matched');
		};
	};

	// FLIPPING CARDS (NORMAL MODE)
	let cardFlip = () => {
		$('.front').on('click', function (){
			$(this).toggleClass('flip');
			$(this).next().toggleClass('flip');
			if ($(this).next().hasClass('bulbasaur')) {
				flippedCards.push('bulbasaur');
			} else if ($(this).next().hasClass('charmander')) {
				flippedCards.push('charmander');
			} else if ($(this).next().hasClass('squirtle')) {
				flippedCards.push('squirtle');
			} else if ($(this).next().hasClass('pikachu')) {
				flippedCards.push('pikachu');
			} else if ($(this).next().hasClass('eevee')) {
				flippedCards.push('eevee');
			} else if ($(this).next().hasClass('dratini')) {
				flippedCards.push('dratini');
			};
			compareCards();
		});
	};

	cardFlip();

	// DIFFICULTY
	let playHardMode = () => {
		$('.hardMode').on('click', function(){
			$('aside').addClass('hidden');
			$('.count').text("0");
			$('.cards').toggleClass('hardGrid');
			cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
			let shuffledCardArray = shuffle(cardArray);
			let shuffledCardList = '';
			for (let i = 0; i < shuffledCardArray.length; i++) {
				shuffledCardList += `<li class="card"><div class="card"><div class="front hard"></div><div class="back ${shuffledCardArray[i]}"><img src="dev/assets/${shuffledCardArray[i]}.png" alt="A cute picture of ${shuffledCardArray[i]}."></div></div></li>`;
			};
			$('.cards').html(shuffledCardList);
			console.log(shuffledCardArray);

			$('.front.hard').on('click', function (){
				$(this).toggleClass('flip');
				$(this).next().toggleClass('flip');
				if ($(this).next().hasClass('bulbasaur')) {
					flippedCards.push('bulbasaur');
				} else if ($(this).next().hasClass('charmander')) {
					flippedCards.push('charmander');
				} else if ($(this).next().hasClass('squirtle')) {
					flippedCards.push('squirtle');
				} else if ($(this).next().hasClass('pikachu')) {
					flippedCards.push('pikachu');
				} else if ($(this).next().hasClass('eevee')) {
					flippedCards.push('eevee');
				} else if ($(this).next().hasClass('dratini')) {
					flippedCards.push('dratini');
				};
				compareCards();
			});
		});
	};

	let playNormalMode = () => {
		$('aside').addClass('hidden');
		// location.reload();
	}

	playHardMode();
	playNormalMode();

	// PLAY AGAIN
	$('.playAgain, .normalMode').on('click', function (){
		location.reload();
	});


	// MENU
	$('i').on('click', function(){
		$('aside').toggleClass("hidden");
	});



});











