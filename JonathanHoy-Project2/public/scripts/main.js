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

var switchToHardMode = function switchToHardMode() {
	$('.hardMode').on('click', function () {
		difficultyCheck.push('hardMode');
		$('.cards').addClass('hardGrid');
		if (cardArray.length === 8) {
			cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
		}
		shuffleCards(cardArray);
		cardFlip(cardArray);
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
		var normalModeArray = cardArray.filter(function (pokemon) {
			if (pokemon !== 'dratini' && pokemon !== 'eevee') {
				return true;
			};
		});
		shuffleCards(normalModeArray);
		cardFlip(normalModeArray);
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
	var normalModeArray = cardArray.filter(function (pokemon) {
		if (pokemon !== 'dratini' && pokemon !== 'eevee') {
			return true;
		};
	});
	shuffleCards(normalModeArray);
	cardFlip(normalModeArray);
	var countdown = window.setInterval(function () {
		$('.displayTimer').text(normalSeconds);
		normalSeconds--;
		$('a').on('click', function () {
			window.clearInterval(countdown);
		});
		if (winVerified === 'confirmed') {
			window.clearInterval(countdown);
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
	if (cardArray.length === 8) {
		cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
	}
	shuffleCards(cardArray);
	cardFlip(cardArray);
	var countdown = window.setInterval(function () {
		$('.displayTimer').text(hardSeconds);
		hardSeconds--;
		$('a').on('click', function () {
			window.clearInterval(countdown);
		});
		if (winVerified === 'confirmed') {
			window.clearInterval(countdown);
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
$('a').on('click', function () {
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
$('i').on('click', function () {
	$('aside').toggleClass("hidden");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUMvQixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVos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bkIsRUFBNEIsWUFBVTtBQUNyQyxLQUFJLGdCQUFnQixDQUFoQixNQUF1QixVQUEzQixFQUF1QztBQUN0QyxRQUFNLG9FQUFOO0FBQ0EsRUFGRCxNQUVPO0FBQ047QUFDQTtBQUNELENBTkQ7O0FBUUE7QUFDQSxFQUFFLEdBQUYsRUFBTyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFXO0FBQzdCLEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsR0FBakI7QUFDQSxHQUFFLFFBQUYsRUFBWSxXQUFaLENBQXdCLFFBQXhCO0FBQ0EsR0FBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixRQUFwQjtBQUNBLEdBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixFQUF4QjtBQUNBLGlCQUFnQixFQUFoQjtBQUNBLGVBQWMsRUFBZDtBQUNBLEtBQUksYUFBYSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzlCLGVBQWEsR0FBYjtBQUNBLGVBQWEsR0FBYjtBQUNBLEVBSEQsTUFHTyxJQUFJLGFBQWEsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUNyQyxlQUFhLEdBQWI7QUFDQTtBQUNELENBYkQ7O0FBZUE7QUFDQSxFQUFFLEdBQUYsRUFBTyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFVO0FBQzVCLEdBQUUsT0FBRixFQUFXLFdBQVgsQ0FBdUIsUUFBdkI7QUFDQSxDQUZEOztBQUlBO0FBQ0EsSUFBTSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2xCLGNBQWEsU0FBYjtBQUNBLFVBQVMsU0FBVDtBQUNBO0FBQ0E7QUFDQSxDQUxEOztBQU9BO0FBQ0EsRUFBRSxZQUFXO0FBQ1o7QUFDQSxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQ0FSRCBMSVNUXG5jb25zdCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblxuLy8gU0hVRkZMRSBGVU5DVElPTlxuY29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG4gIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn07XG5cbi8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcbmNvbnN0IHNodWZmbGVDYXJkcyA9IChhcnJheSkgPT4ge1xuXHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGFycmF5KTtcblx0bGV0IHNodWZmbGVkQ2FyZExpc3QgPSAnJztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdHNodWZmbGVkQ2FyZExpc3QgKz0gYDxsaSBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJmcm9udFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCJkZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0fTtcblx0JCgnLmNhcmRzJykuaHRtbChzaHVmZmxlZENhcmRMaXN0KTtcblx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpOyAvLyB0byBjaGVhdCBhbmQgc2VlIHRoZSBjYXJkc1xufTtcblxuLy8gRkxJUFBJTkcgQ0FSRFNcbmNvbnN0IGNhcmRGbGlwID0gKGFycmF5KSA9PiB7XG5cdCQoJy5mcm9udCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdGlmICghJCgnLmZyb250JykuaGFzQ2xhc3MoJ2ZyZWV6ZScpKSB7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdjaGFybWFuZGVyJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3NxdWlydGxlJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2VldmVlJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2RyYXRpbmknKTtcblx0XHRcdH07XG5cdFx0XHRjb21wYXJlQ2FyZHMoYXJyYXkpO1x0XG5cdFx0fTtcblx0fSk7XG59O1xuXG4vLyBNQVRDSElORyBMT0dJQ1xuY29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cbmNvbnN0IGNvbXBhcmVDYXJkcyA9IChhcnJheSkgPT4ge1xuXHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGFkZFRvQ291bnQoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblx0XHR9LDc1MCk7XG5cdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGFkZFRvQ291bnQoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5iYWNrLmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdCQoJy5mcm9udC5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHR3aW5Db3VudC5wdXNoKCdtYXRjaGVkJyk7XG5cdFx0d2luTWVzc2FnZShhcnJheSk7XG5cdH07XG59O1xuXG5jb25zdCBhZGRUb0NvdW50ID0gKCkgPT4ge1xuXHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0aWYgKCEkKCcuY291bnQnKS5oYXNDbGFzcygnZnJlZXplJykpIHtcblx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdH07XG59XG5cbi8vIFdJTk5JTkdcbmxldCB3aW5Db3VudCA9IFtdO1xubGV0IHdpblZlcmlmaWVkID0gJydcblxuY29uc3Qgd2luTWVzc2FnZSA9IChhcnJheSkgPT4ge1xuXHRsZXQgdHJpZXMgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpO1xuXHRsZXQgcGFpcnMgPSBhcnJheS5sZW5ndGggLyAyO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYgKHdpbkNvdW50Lmxlbmd0aCA9PT0gKGFycmF5Lmxlbmd0aCAvIDIpKSB7XG5cdFx0XHR3aW5WZXJpZmllZCA9ICdjb25maXJtZWQnXG5cdFx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRyaWVzID09PSBwYWlycykge1xuXHRcdFx0XHRhbGVydChgQ29uZ3JhdHVsYXRpb25zISBZb3Ugd29uIGluICR7JCgnLmNvdW50JykudGV4dCgpfSB0cmllcyEgQSBwZXJmZWN0IHJvdW5kISBZb3UgYXJlIHRoZSBiZXN0ISFgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KGBDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24gaW4gJHskKCcuY291bnQnKS50ZXh0KCl9IHRyaWVzISBTZWxlY3QgYSBkaWZmaWN1bHR5IHRvIHBsYXkgYWdhaW4hYCk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0sMzAwKTtcbn07XG5cbi8vIERJRkZJQ1VMVFlcblxuY29uc3QgZGlmZmljdWx0eUNoZWNrID0gW107XG5cbmNvbnN0IHN3aXRjaFRvSGFyZE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0ZGlmZmljdWx0eUNoZWNrLnB1c2goJ2hhcmRNb2RlJyk7XG5cdFx0JCgnLmNhcmRzJykuYWRkQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0aWYgKGNhcmRBcnJheS5sZW5ndGggPT09IDgpIHtcblx0XHRcdGNhcmRBcnJheS5wdXNoKCdlZXZlZScsICdlZXZlZScsICdkcmF0aW5pJywgJ2RyYXRpbmknKTtcblx0XHR9XG5cdFx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdFx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG5jb25zdCBzd2l0Y2hUb05vcm1hbE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5ub3JtYWxNb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRkaWZmaWN1bHR5Q2hlY2sucG9wKCk7XG5cdFx0JCgnLmNhcmRzJykucmVtb3ZlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0Y29uc3Qgbm9ybWFsTW9kZUFycmF5ID0gY2FyZEFycmF5LmZpbHRlcigocG9rZW1vbikgPT4ge1xuXHRcdFx0aWYgKHBva2Vtb24gIT09ICdkcmF0aW5pJyAmJiBwb2tlbW9uICE9PSAnZWV2ZWUnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0XHRzaHVmZmxlQ2FyZHMobm9ybWFsTW9kZUFycmF5KTtcblx0XHRjYXJkRmxpcChub3JtYWxNb2RlQXJyYXkpO1xuXHRcdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9O1xuXHRcdHdpbk1lc3NhZ2Uobm9ybWFsTW9kZUFycmF5KTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vLyBUSU1FUlxubGV0IG5vcm1hbFNlY29uZHMgPSAxNTtcbmxldCBoYXJkU2Vjb25kcyA9IDMwO1xuXG5jb25zdCBzZXROb3JtYWxUaW1lciA9ICgpID0+IHtcblx0Y29uc3Qgbm9ybWFsTW9kZUFycmF5ID0gY2FyZEFycmF5LmZpbHRlcigocG9rZW1vbikgPT4ge1xuXHRcdGlmIChwb2tlbW9uICE9PSAnZHJhdGluaScgJiYgcG9rZW1vbiAhPT0gJ2VldmVlJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0fSk7XG5cdHNodWZmbGVDYXJkcyhub3JtYWxNb2RlQXJyYXkpO1xuXHRjYXJkRmxpcChub3JtYWxNb2RlQXJyYXkpO1xuXHRsZXQgY291bnRkb3duID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmRpc3BsYXlUaW1lcicpLnRleHQobm9ybWFsU2Vjb25kcyk7XG5cdFx0bm9ybWFsU2Vjb25kcy0tO1xuXHRcdCQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoY291bnRkb3duKTtcblx0XHR9KVxuXHRcdGlmICh3aW5WZXJpZmllZCA9PT0gJ2NvbmZpcm1lZCcpIHtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKGNvdW50ZG93bik7XG5cdFx0fTtcblx0XHRpZiAobm9ybWFsU2Vjb25kcyA8IDApIHtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKGNvdW50ZG93bik7XG5cdFx0XHQkKCcuY291bnQsIC5mcm9udCcpLmFkZENsYXNzKCdmcmVlemUnKTtcblx0XHR9O1xuXHR9LCAxMDAwKTtcbn07XG5cbiQoJy5ub3JtYWxUaW1lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmIChkaWZmaWN1bHR5Q2hlY2tbMF0gPT09ICdoYXJkTW9kZScpIHtcblx0XHRhbGVydCgnUGxlYXNlIHNlbGVjdCBub3JtYWwgZGlmZmljdWx0eSBiZWZvcmUgc3RhcnRpbmcgdGhlIG5vcm1hbCBtb2RlIHRpbWVyIScpO1xuXHR9IGVsc2Uge1xuXHRcdHNldE5vcm1hbFRpbWVyKCk7XG5cdH07XG59KVxuXG5jb25zdCBzZXRIYXJkVGltZXIgPSAoKSA9PiB7XG5cdGlmIChjYXJkQXJyYXkubGVuZ3RoID09PSA4KSB7XG5cdFx0Y2FyZEFycmF5LnB1c2goJ2VldmVlJywgJ2VldmVlJywgJ2RyYXRpbmknLCAnZHJhdGluaScpO1xuXHR9XG5cdHNodWZmbGVDYXJkcyhjYXJkQXJyYXkpO1xuXHRjYXJkRmxpcChjYXJkQXJyYXkpO1xuXHRsZXQgY291bnRkb3duID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmRpc3BsYXlUaW1lcicpLnRleHQoaGFyZFNlY29uZHMpO1xuXHRcdGhhcmRTZWNvbmRzLS07XG5cdFx0JCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChjb3VudGRvd24pO1xuXHRcdH0pXG5cdFx0aWYgKHdpblZlcmlmaWVkID09PSAnY29uZmlybWVkJykge1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoY291bnRkb3duKTtcblx0XHR9O1xuXHRcdGlmIChoYXJkU2Vjb25kcyA8IDApIHtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKGNvdW50ZG93bik7XG5cdFx0XHQkKCcuY291bnQsIC5mcm9udCcpLmFkZENsYXNzKCdmcmVlemUnKTtcblx0XHR9O1xuXHR9LCAxMDAwKTtcbn07XG5cbiQoJy5oYXJkVGltZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoZGlmZmljdWx0eUNoZWNrWzBdICE9PSAnaGFyZE1vZGUnKSB7XG5cdFx0YWxlcnQoJ1BsZWFzZSBzZWxlY3QgaGFyZCBkaWZmaWN1bHR5IGJlZm9yZSBzdGFydGluZyB0aGUgaGFyZCBtb2RlIHRpbWVyIScpO1xuXHR9IGVsc2Uge1xuXHRcdHNldEhhcmRUaW1lcigpO1xuXHR9O1xufSlcblxuLy8gUkVTRVRcbiQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0JCgnLmNvdW50JykudGV4dChcIjBcIik7XG5cdCQoJy5jb3VudCcpLnJlbW92ZUNsYXNzKCdmcmVlemUnKTtcblx0JCgnYXNpZGUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cdCQoJy5kaXNwbGF5VGltZXInKS50ZXh0KCcnKTtcblx0bm9ybWFsU2Vjb25kcyA9IDE1O1xuXHRoYXJkU2Vjb25kcyA9IDMwO1xuXHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMikge1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0fTtcbn0pO1xuXG4vLyBNRU5VXG4kKCdpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0JCgnYXNpZGUnKS50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbn0pO1xuXG4vLyBJTklUXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuXHRzaHVmZmxlQ2FyZHMoY2FyZEFycmF5KTtcblx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0c3dpdGNoVG9IYXJkTW9kZSgpO1xuXHRzd2l0Y2hUb05vcm1hbE1vZGUoKTtcbn07XG5cbi8vIERPQ1VNRU5UIFJFQURZXG4kKGZ1bmN0aW9uKCkge1xuXHRpbml0KCk7XG59KTtcblxuXG5cblxuXG4iXX0=
