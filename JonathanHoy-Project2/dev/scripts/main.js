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
const shuffleCards = (array) => {
	let shuffledCardArray = shuffle(array);
	let shuffledCardList = '';
	for (let i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += `<li class="card"><div class="card"><div class="front"></div><div class="back ${shuffledCardArray[i]}"><img src="dev/assets/${shuffledCardArray[i]}.png" alt="A cute picture of ${shuffledCardArray[i]}."></div></div></li>`;
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards
};

// FLIPPING CARDS
const cardFlip = (array) => {
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
		compareCards(array);
	});
};

// MATCHING LOGIC
const flippedCards = [];

const compareCards = (array) => {
	if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
		addToCount();
		flippedCards.pop();
		flippedCards.pop();
		$('.front').css('pointer-events', 'none');
		setTimeout(function(){
			$('.front').removeClass('flip');
			$('.back').removeClass('flip');
			$('.front').css('pointer-events', 'auto');
		},750);
	} else if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
		addToCount();
		flippedCards.pop();
		flippedCards.pop();
		$('.back.flip').addClass('matched');
		$('.front.flip').addClass('matched');
		winCount.push('matched');
		winMessage(array);
	};
};

const addToCount = () => {
	const newVal = parseInt($('.count').text()) + 1;
	$('.count').text(newVal);
}

// WINNING
let winCount = [];

const winMessage = (array) => {
	let tries = parseInt($('.count').text());
	let pairs = array.length / 2;
	setTimeout(function(){
		if (winCount.length === (array.length / 2)) {
			winCount = winCount.filter((match) => {
				if (match !== 'matched') {
					return true;
				};
			});
			if (tries === pairs) {
				alert(`Congratulations! You won in ${$('.count').text()} tries! A perfect round! You are the best!!`);
			} else {
				alert(`Congratulations! You won in ${$('.count').text()} tries! Select a difficulty to play again!`);
			};
		};
	},300);
};

// DIFFICULTY

const difficultyCheck = [];

const switchToHardMode = () => {
	$('.hardMode').on('click', function(){
		difficultyCheck.push('hardMode');
		$('.cards').addClass('hardGrid');
		if (cardArray.length === 8) {
			cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
		}
		shuffleCards(cardArray);
		cardFlip(cardArray);
		winCount = winCount.filter((match) => {
			if (match !== 'matched') {
				return true;
			};
		});
	});
};

const switchToNormalMode = () => {
	$('.normalMode').on('click', function(){
		difficultyCheck.pop();
		$('.cards').removeClass('hardGrid');
		const normalModeArray = cardArray.filter((pokemon) => {
			if (pokemon !== 'dratini' && pokemon !== 'eevee') {
				return true;
			};
		});
		shuffleCards(normalModeArray);
		cardFlip(normalModeArray);
		winCount = winCount.filter((match) => {
			if (match !== 'matched') {
				return true;
			};
		winMessage(normalModeArray);
		});
	});
};

// TIMER
let normalSeconds = 5;
let hardSeconds = 45;

const setNormalTimer = () => {
	let countdown = window.setInterval(function(){
		$('.displayTimer').text(normalSeconds);
		normalSeconds--;
		if (normalSeconds < 0) {
			window.clearInterval(countdown);
			$('.front').removeEventListener('click', cardFlip());
		};
	}, 1000);
};

$('.normalTimer').on('click', function(){
	if (difficultyCheck[0] === 'hardMode') {
		alert('Please select normal difficulty before starting the normal mode timer!');
	} else {
		setNormalTimer();
	};
})

// RESET
$('a').on('click', function (){
	$('.count').text("0");
	$('aside').addClass('hidden');
	$('.displayTimer').text('');

	normalSeconds = 5;
	hardSeconds = 45;
	if (flippedCards.length === 2) {
		flippedCards.pop();
		flippedCards.pop();
	} else if (flippedCards.length === 1) {
		flippedCards.pop();
	};
});

// MENU
$('i').on('click', function(){
	$('aside').toggleClass("hidden");
});

// INIT
const init = () => {
	shuffleCards(cardArray);
	cardFlip(cardArray);
	switchToHardMode();
	switchToNormalMode();
};

// DOCUMENT READY
$(function() {
	init();
});





