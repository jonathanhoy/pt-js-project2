// CARD LIST
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
let shuffleCards = (array) => {
	let shuffledCardArray = shuffle(array);
	let shuffledCardList = '';
	for (let i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += `<li class="card"><div class="card"><div class="front"></div><div class="back ${shuffledCardArray[i]}"><img src="dev/assets/${shuffledCardArray[i]}.png" alt="A cute picture of ${shuffledCardArray[i]}."></div></div></li>`;
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards
};

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
const cardFlip = () => {
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

// DIFFICULTY
let playHardMode = () => {
	$('.hardMode').on('click', function(){
		$('aside').addClass('hidden');
		$('.cards').toggleClass('hardGrid');
		if (cardArray.length === 8) {
			cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
		}
		shuffleCards(cardArray);
		cardFlip();
	});
};

let playNormalMode = () => {
	$('.normalMode').on('click', function(){
		$('aside').addClass('hidden');
		$('.cards').toggleClass('hardGrid');
		const normalModeArray = cardArray.filter((name) => {
			if (name !== 'dratini' && name !== 'eevee') {
				return true;
			};
		});
		// console.log(normalModeArray);
		shuffleCards(normalModeArray);
		cardFlip();
		// console.log(normalCardArray);
	});
};

// PLAY AGAIN & RESETS
$('.playAgain').on('click', function (){
	location.reload();
});

$('a').on('click', function (){
	$('.count').text("0");
})

// MENU
$('i').on('click', function(){
	$('aside').toggleClass("hidden");
});


// INIT
let init = () => {
	shuffleCards(cardArray);
	cardFlip();
	playHardMode();
	playNormalMode();
};


// DOCUMENT READY
$(function() {
	init();
});





