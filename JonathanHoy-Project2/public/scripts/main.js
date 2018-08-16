(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// CARD LIST
var cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];

// SHUFFLE FUNCTION
var shuffle = function shuffle(array) {
	var currentIndex = array.length,
	    temporaryValue,
	    randomIndex;
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
var shuffleCards = function shuffleCards(array) {
	var shuffledCardArray = shuffle(array);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[i] + "\"><img src=\"dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards
};

// FLIPPING CARDS
var cardFlip = function cardFlip(array) {
	$('.front').on('click', function () {
		if (!$('.front').hasClass('freeze')) {
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
		};
	});
};

// MATCHING LOGIC
var flippedCards = [];

var compareCards = function compareCards(array) {
	if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
		addToCount();
		flippedCards.pop();
		flippedCards.pop();
		$('.front').css('pointer-events', 'none');
		setTimeout(function () {
			$('.front').removeClass('flip');
			$('.back').removeClass('flip');
			$('.front').css('pointer-events', 'auto');
		}, 750);
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

var addToCount = function addToCount() {
	var newVal = parseInt($('.count').text()) + 1;
	if (!$('.count').hasClass('freeze')) {
		$('.count').text(newVal);
	};
};

// WINNING
var winCount = [];
var winVerified = '';

var winMessage = function winMessage(array) {
	var tries = parseInt($('.count').text());
	var pairs = array.length / 2;
	setTimeout(function () {
		if (winCount.length === array.length / 2) {
			winVerified = 'confirmed';
			winCount = winCount.filter(function (match) {
				if (match !== 'matched') {
					return true;
				};
			});
			if (tries === pairs) {
				alert("Congratulations! You won in " + $('.count').text() + " tries! A perfect round! You are the best!!");
			} else {
				alert("Congratulations! You won in " + $('.count').text() + " tries! Select a difficulty to play again!");
			};
		};
	}, 300);
};

// DIFFICULTY
var difficultyCheck = [];

var setHardMode = function setHardMode() {
	if (cardArray.length === 8) {
		cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
	}
	shuffleCards(cardArray);
	cardFlip(cardArray);
};

var setNormalMode = function setNormalMode() {
	var normalModeArray = cardArray.filter(function (pokemon) {
		if (pokemon !== 'dratini' && pokemon !== 'eevee') {
			return true;
		};
	});
	shuffleCards(normalModeArray);
	cardFlip(normalModeArray);
};

var switchToHardMode = function switchToHardMode() {
	$('.hardMode').on('click', function () {
		difficultyCheck.push('hardMode');
		$('.cards').addClass('hardGrid');
		setHardMode();
		winCount = winCount.filter(function (match) {
			if (match !== 'matched') {
				return true;
			};
		});
	});
};

var switchToNormalMode = function switchToNormalMode() {
	$('.normalMode').on('click', function () {
		difficultyCheck.pop();
		$('.cards').removeClass('hardGrid');
		setNormalMode();
		winCount = winCount.filter(function (match) {
			if (match !== 'matched') {
				return true;
			};
			winMessage(normalModeArray);
		});
	});
};

// TIMER
var normalSeconds = 15;
var hardSeconds = 30;

var setNormalTimer = function setNormalTimer() {
	setNormalMode();
	winCount = winCount.filter(function (match) {
		if (match !== 'matched') {
			return true;
		};
	});
	var countdown = window.setInterval(function () {
		$('.displayTimer').text(normalSeconds);
		normalSeconds--;
		$('button').on('click', function () {
			window.clearInterval(countdown);
		});
		if (winVerified === 'confirmed') {
			window.clearInterval(countdown);
			winMessage(normalModeArray);
		};
		if (normalSeconds < 0) {
			window.clearInterval(countdown);
			$('.count, .front').addClass('freeze');
		};
	}, 1000);
};

$('.normalTimer').on('click', function () {
	if (difficultyCheck[0] === 'hardMode') {
		alert('Please select normal difficulty before starting the normal mode timer!');
	} else {
		setNormalTimer();
	};
});

var setHardTimer = function setHardTimer() {
	setHardMode();
	winCount = winCount.filter(function (match) {
		if (match !== 'matched') {
			return true;
		};
	});
	var countdown = window.setInterval(function () {
		$('.displayTimer').text(hardSeconds);
		hardSeconds--;
		$('button').on('click', function () {
			window.clearInterval(countdown);
		});
		if (winVerified === 'confirmed') {
			window.clearInterval(countdown);
			winMessage(cardArray);
		};
		if (hardSeconds < 0) {
			window.clearInterval(countdown);
			$('.count, .front').addClass('freeze');
		};
	}, 1000);
};

$('.hardTimer').on('click', function () {
	if (difficultyCheck[0] !== 'hardMode') {
		alert('Please select hard difficulty before starting the hard mode timer!');
	} else {
		setHardTimer();
	};
});

// RESET
$('.difficultyButtons button, .timerButton button').on('click', function () {
	$('.count').text("0");
	$('.count').removeClass('freeze');
	$('aside').addClass('hidden');
	$('.displayTimer').text('');
	normalSeconds = 15;
	hardSeconds = 30;
	if (flippedCards.length === 2) {
		flippedCards.pop();
		flippedCards.pop();
	} else if (flippedCards.length === 1) {
		flippedCards.pop();
	};
});

// MENU
$('header i').on('click', function () {
	$('aside').toggleClass("hidden");
});

// INSTRUCTIONS
$('.instructionButton, .instructions i').on('click', function () {
	$('.instructions').toggleClass('hidden');
});

// INIT
var init = function init() {
	shuffleCards(cardArray);
	cardFlip(cardArray);
	switchToHardMode();
	switchToNormalMode();
};

// DOCUMENT READY
$(function () {
	init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUMvQixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVos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dXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQ0FSRCBMSVNUXG5jb25zdCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblxuLy8gU0hVRkZMRSBGVU5DVElPTlxuY29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG4gIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn07XG5cbi8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcbmNvbnN0IHNodWZmbGVDYXJkcyA9IChhcnJheSkgPT4ge1xuXHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGFycmF5KTtcblx0bGV0IHNodWZmbGVkQ2FyZExpc3QgPSAnJztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdHNodWZmbGVkQ2FyZExpc3QgKz0gYDxsaSBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJmcm9udFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCJkZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0fTtcblx0JCgnLmNhcmRzJykuaHRtbChzaHVmZmxlZENhcmRMaXN0KTtcblx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpOyAvLyB0byBjaGVhdCBhbmQgc2VlIHRoZSBjYXJkc1xufTtcblxuLy8gRkxJUFBJTkcgQ0FSRFNcbmNvbnN0IGNhcmRGbGlwID0gKGFycmF5KSA9PiB7XG5cdCQoJy5mcm9udCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdGlmICghJCgnLmZyb250JykuaGFzQ2xhc3MoJ2ZyZWV6ZScpKSB7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdjaGFybWFuZGVyJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3NxdWlydGxlJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2VldmVlJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2RyYXRpbmknKTtcblx0XHRcdH07XG5cdFx0XHRjb21wYXJlQ2FyZHMoYXJyYXkpO1x0XG5cdFx0fTtcblx0fSk7XG59O1xuXG4vLyBNQVRDSElORyBMT0dJQ1xuY29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cbmNvbnN0IGNvbXBhcmVDYXJkcyA9IChhcnJheSkgPT4ge1xuXHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGFkZFRvQ291bnQoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblx0XHR9LDc1MCk7XG5cdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGFkZFRvQ291bnQoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5iYWNrLmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdCQoJy5mcm9udC5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHR3aW5Db3VudC5wdXNoKCdtYXRjaGVkJyk7XG5cdFx0d2luTWVzc2FnZShhcnJheSk7XG5cdH07XG59O1xuXG5jb25zdCBhZGRUb0NvdW50ID0gKCkgPT4ge1xuXHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0aWYgKCEkKCcuY291bnQnKS5oYXNDbGFzcygnZnJlZXplJykpIHtcblx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdH07XG59XG5cbi8vIFdJTk5JTkdcbmxldCB3aW5Db3VudCA9IFtdO1xubGV0IHdpblZlcmlmaWVkID0gJydcblxuY29uc3Qgd2luTWVzc2FnZSA9IChhcnJheSkgPT4ge1xuXHRsZXQgdHJpZXMgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpO1xuXHRsZXQgcGFpcnMgPSBhcnJheS5sZW5ndGggLyAyO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYgKHdpbkNvdW50Lmxlbmd0aCA9PT0gKGFycmF5Lmxlbmd0aCAvIDIpKSB7XG5cdFx0XHR3aW5WZXJpZmllZCA9ICdjb25maXJtZWQnXG5cdFx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRyaWVzID09PSBwYWlycykge1xuXHRcdFx0XHRhbGVydChgQ29uZ3JhdHVsYXRpb25zISBZb3Ugd29uIGluICR7JCgnLmNvdW50JykudGV4dCgpfSB0cmllcyEgQSBwZXJmZWN0IHJvdW5kISBZb3UgYXJlIHRoZSBiZXN0ISFgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KGBDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24gaW4gJHskKCcuY291bnQnKS50ZXh0KCl9IHRyaWVzISBTZWxlY3QgYSBkaWZmaWN1bHR5IHRvIHBsYXkgYWdhaW4hYCk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0sMzAwKTtcbn07XG5cbi8vIERJRkZJQ1VMVFlcbmNvbnN0IGRpZmZpY3VsdHlDaGVjayA9IFtdO1xuXG5jb25zdCBzZXRIYXJkTW9kZSA9ICgpID0+IHtcblx0aWYgKGNhcmRBcnJheS5sZW5ndGggPT09IDgpIHtcblx0XHRjYXJkQXJyYXkucHVzaCgnZWV2ZWUnLCAnZWV2ZWUnLCAnZHJhdGluaScsICdkcmF0aW5pJyk7XG5cdH1cblx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdGNhcmRGbGlwKGNhcmRBcnJheSk7XG59XG5cbmNvbnN0IHNldE5vcm1hbE1vZGUgPSAoKSA9PiB7XG5cdGNvbnN0IG5vcm1hbE1vZGVBcnJheSA9IGNhcmRBcnJheS5maWx0ZXIoKHBva2Vtb24pID0+IHtcblx0XHRpZiAocG9rZW1vbiAhPT0gJ2RyYXRpbmknICYmIHBva2Vtb24gIT09ICdlZXZlZScpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdH0pO1xuXHRzaHVmZmxlQ2FyZHMobm9ybWFsTW9kZUFycmF5KTtcblx0Y2FyZEZsaXAobm9ybWFsTW9kZUFycmF5KTtcbn1cblxuY29uc3Qgc3dpdGNoVG9IYXJkTW9kZSA9ICgpID0+IHtcblx0JCgnLmhhcmRNb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRkaWZmaWN1bHR5Q2hlY2sucHVzaCgnaGFyZE1vZGUnKTtcblx0XHQkKCcuY2FyZHMnKS5hZGRDbGFzcygnaGFyZEdyaWQnKTtcblx0XHRzZXRIYXJkTW9kZSgpO1xuXHRcdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbmNvbnN0IHN3aXRjaFRvTm9ybWFsTW9kZSA9ICgpID0+IHtcblx0JCgnLm5vcm1hbE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdGRpZmZpY3VsdHlDaGVjay5wb3AoKTtcblx0XHQkKCcuY2FyZHMnKS5yZW1vdmVDbGFzcygnaGFyZEdyaWQnKTtcblx0XHRzZXROb3JtYWxNb2RlKCk7XG5cdFx0d2luQ291bnQgPSB3aW5Db3VudC5maWx0ZXIoKG1hdGNoKSA9PiB7XG5cdFx0XHRpZiAobWF0Y2ggIT09ICdtYXRjaGVkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH07XG5cdFx0d2luTWVzc2FnZShub3JtYWxNb2RlQXJyYXkpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8vIFRJTUVSXG5sZXQgbm9ybWFsU2Vjb25kcyA9IDE1O1xubGV0IGhhcmRTZWNvbmRzID0gMzA7XG5cbmNvbnN0IHNldE5vcm1hbFRpbWVyID0gKCkgPT4ge1xuXHRzZXROb3JtYWxNb2RlKCk7XG5cdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHR9KTtcblx0bGV0IGNvdW50ZG93biA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdCQoJy5kaXNwbGF5VGltZXInKS50ZXh0KG5vcm1hbFNlY29uZHMpO1xuXHRcdG5vcm1hbFNlY29uZHMtLTtcblx0XHQkKCdidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoY291bnRkb3duKTtcblx0XHR9KTtcblx0XHRpZiAod2luVmVyaWZpZWQgPT09ICdjb25maXJtZWQnKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChjb3VudGRvd24pO1xuXHRcdFx0d2luTWVzc2FnZShub3JtYWxNb2RlQXJyYXkpO1xuXHRcdH07XG5cdFx0aWYgKG5vcm1hbFNlY29uZHMgPCAwKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChjb3VudGRvd24pO1xuXHRcdFx0JCgnLmNvdW50LCAuZnJvbnQnKS5hZGRDbGFzcygnZnJlZXplJyk7XG5cdFx0fTtcblx0fSwgMTAwMCk7XG59O1xuXG4kKCcubm9ybWFsVGltZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoZGlmZmljdWx0eUNoZWNrWzBdID09PSAnaGFyZE1vZGUnKSB7XG5cdFx0YWxlcnQoJ1BsZWFzZSBzZWxlY3Qgbm9ybWFsIGRpZmZpY3VsdHkgYmVmb3JlIHN0YXJ0aW5nIHRoZSBub3JtYWwgbW9kZSB0aW1lciEnKTtcblx0fSBlbHNlIHtcblx0XHRzZXROb3JtYWxUaW1lcigpO1xuXHR9O1xufSlcblxuY29uc3Qgc2V0SGFyZFRpbWVyID0gKCkgPT4ge1xuXHRzZXRIYXJkTW9kZSgpO1xuXHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRpZiAobWF0Y2ggIT09ICdtYXRjaGVkJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0fSk7XG5cdGxldCBjb3VudGRvd24gPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHQkKCcuZGlzcGxheVRpbWVyJykudGV4dChoYXJkU2Vjb25kcyk7XG5cdFx0aGFyZFNlY29uZHMtLTtcblx0XHQkKCdidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoY291bnRkb3duKTtcblx0XHR9KTtcblx0XHRpZiAod2luVmVyaWZpZWQgPT09ICdjb25maXJtZWQnKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChjb3VudGRvd24pO1xuXHRcdFx0d2luTWVzc2FnZShjYXJkQXJyYXkpO1xuXHRcdH07XG5cdFx0aWYgKGhhcmRTZWNvbmRzIDwgMCkge1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoY291bnRkb3duKTtcblx0XHRcdCQoJy5jb3VudCwgLmZyb250JykuYWRkQ2xhc3MoJ2ZyZWV6ZScpO1xuXHRcdH07XG5cdH0sIDEwMDApO1xufTtcblxuJCgnLmhhcmRUaW1lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmIChkaWZmaWN1bHR5Q2hlY2tbMF0gIT09ICdoYXJkTW9kZScpIHtcblx0XHRhbGVydCgnUGxlYXNlIHNlbGVjdCBoYXJkIGRpZmZpY3VsdHkgYmVmb3JlIHN0YXJ0aW5nIHRoZSBoYXJkIG1vZGUgdGltZXIhJyk7XG5cdH0gZWxzZSB7XG5cdFx0c2V0SGFyZFRpbWVyKCk7XG5cdH07XG59KVxuXG4vLyBSRVNFVFxuJCgnLmRpZmZpY3VsdHlCdXR0b25zIGJ1dHRvbiwgLnRpbWVyQnV0dG9uIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHQkKCcuY291bnQnKS50ZXh0KFwiMFwiKTtcblx0JCgnLmNvdW50JykucmVtb3ZlQ2xhc3MoJ2ZyZWV6ZScpO1xuXHQkKCdhc2lkZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0JCgnLmRpc3BsYXlUaW1lcicpLnRleHQoJycpO1xuXHRub3JtYWxTZWNvbmRzID0gMTU7XG5cdGhhcmRTZWNvbmRzID0gMzA7XG5cdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyKSB7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0fSBlbHNlIGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAxKSB7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHR9O1xufSk7XG5cbi8vIE1FTlVcbiQoJ2hlYWRlciBpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0JCgnYXNpZGUnKS50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbn0pO1xuXG4vLyBJTlNUUlVDVElPTlNcbiQoJy5pbnN0cnVjdGlvbkJ1dHRvbiwgLmluc3RydWN0aW9ucyBpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0JCgnLmluc3RydWN0aW9ucycpLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbn0pO1xuXG4vLyBJTklUXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuXHRzaHVmZmxlQ2FyZHMoY2FyZEFycmF5KTtcblx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0c3dpdGNoVG9IYXJkTW9kZSgpO1xuXHRzd2l0Y2hUb05vcm1hbE1vZGUoKTtcbn07XG5cbi8vIERPQ1VNRU5UIFJFQURZXG4kKGZ1bmN0aW9uKCkge1xuXHRpbml0KCk7XG59KTtcblxuXG5cblxuXG4iXX0=
