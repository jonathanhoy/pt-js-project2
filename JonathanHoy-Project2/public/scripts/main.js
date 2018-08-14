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
		$(this).toggleClass('flip');
		$(this).next().toggleClass('flip');
		if ($(this).next().hasClass('bulbasaur') && seconds > 0) {
			flippedCards.push('bulbasaur');
		} else if ($(this).next().hasClass('charmander') && seconds > 0) {
			flippedCards.push('charmander');
		} else if ($(this).next().hasClass('squirtle') && seconds > 0) {
			flippedCards.push('squirtle');
		} else if ($(this).next().hasClass('pikachu') && seconds > 0) {
			flippedCards.push('pikachu');
		} else if ($(this).next().hasClass('eevee') && seconds > 0) {
			flippedCards.push('eevee');
		} else if ($(this).next().hasClass('dratini') && seconds > 0) {
			flippedCards.push('dratini');
		};
		compareCards(array);
	});
};

// MATCHING LOGIC
var flippedCards = [];

var winCount = [];

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
		if (seconds !== 0) {
			addToCount();
		};
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
	$('.count').text(newVal);
};

// WINNING
var winMessage = function winMessage(array) {
	var tries = parseInt($('.count').text());
	var pairs = array.length / 2;
	setTimeout(function () {
		if (winCount.length === array.length / 2) {
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
var switchToHardMode = function switchToHardMode() {
	$('.hardMode').on('click', function () {
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
	$('.normalMode, .normalTimer').on('click', function () {
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

var seconds = 7;

var setTimer = function setTimer() {
	switchToNormalMode();
	$('.normalTimer').on('click', function () {
		var countdown = window.setInterval(function () {
			$('.timer').text(seconds);
			seconds--;
			if (seconds < 0) {
				window.clearInterval(countdown);
				$('.front').removeEventListener('click', cardFlip());
			};
		}, 1000);
		// countdown();
	});
};

// RESET
$('a').on('click', function () {
	$('.count').text("0");
	$('aside').addClass('hidden');
	$('.timer').text("");
	seconds = 7;
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
	setTimer();
};

// DOCUMENT READY
$(function () {
	init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUMvQixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVos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QTVCLEVBQStCO0FBQzlCLGVBQWEsR0FBYjtBQUNBLGVBQWEsR0FBYjtBQUNBLEVBSEQsTUFHTyxJQUFJLGFBQWEsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUNyQyxlQUFhLEdBQWI7QUFDQTtBQUNELENBWEQ7O0FBYUE7QUFDQSxFQUFFLEdBQUYsRUFBTyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFVO0FBQzVCLEdBQUUsT0FBRixFQUFXLFdBQVgsQ0FBdUIsUUFBdkI7QUFDQSxDQUZEOztBQUlBO0FBQ0EsSUFBTSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2xCLGNBQWEsU0FBYjtBQUNBLFVBQVMsU0FBVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBTkQ7O0FBUUE7QUFDQSxFQUFFLFlBQVc7QUFDWjtBQUNBLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBDQVJEIExJU1RcbmNvbnN0IGNhcmRBcnJheSA9IFtcImJ1bGJhc2F1clwiLCBcImJ1bGJhc2F1clwiLCBcImNoYXJtYW5kZXJcIiwgXCJjaGFybWFuZGVyXCIsIFwic3F1aXJ0bGVcIiwgXCJzcXVpcnRsZVwiLCBcInBpa2FjaHVcIiwgXCJwaWthY2h1XCJdO1xuXG4vLyBTSFVGRkxFIEZVTkNUSU9OXG5jb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG4gIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuLy8gU0hVRkZMSU5HIEFORCBQUklOVElORyBBUlJBWVxuY29uc3Qgc2h1ZmZsZUNhcmRzID0gKGFycmF5KSA9PiB7XG5cdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoYXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cImRldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG59O1xuXG4vLyBGTElQUElORyBDQVJEU1xuY29uc3QgY2FyZEZsaXAgPSAoYXJyYXkpID0+IHtcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSAmJiBzZWNvbmRzID4gMCkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSAmJiBzZWNvbmRzID4gMCkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpICYmIHNlY29uZHMgPiAwKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykgJiYgc2Vjb25kcyA+IDApIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSAmJiBzZWNvbmRzID4gMCkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZHJhdGluaScpICYmIHNlY29uZHMgPiAwKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdH07XG5cdFx0Y29tcGFyZUNhcmRzKGFycmF5KTtcblx0fSk7XG59O1xuXG4vLyBNQVRDSElORyBMT0dJQ1xuY29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cbmxldCB3aW5Db3VudCA9IFtdO1xuXG5jb25zdCBjb21wYXJlQ2FyZHMgPSAoYXJyYXkpID0+IHtcblx0aWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdICE9PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRhZGRUb0NvdW50KCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZnJvbnQnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0JCgnLmJhY2snKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0JCgnLmZyb250JykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XG5cdFx0fSw3NTApO1xuXHR9IGVsc2UgaWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdID09PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRpZiAoc2Vjb25kcyAhPT0gMCkge1xuXHRcdFx0YWRkVG9Db3VudCgpO1xuXHRcdH07XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHQkKCcuYmFjay5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHQkKCcuZnJvbnQuZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdFx0d2luQ291bnQucHVzaCgnbWF0Y2hlZCcpO1xuXHRcdHdpbk1lc3NhZ2UoYXJyYXkpO1xuXHR9O1xufTtcblxuY29uc3QgYWRkVG9Db3VudCA9ICgpID0+IHtcblx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdCQoJy5jb3VudCcpLnRleHQobmV3VmFsKTtcbn1cblxuLy8gV0lOTklOR1xuY29uc3Qgd2luTWVzc2FnZSA9IChhcnJheSkgPT4ge1xuXHRsZXQgdHJpZXMgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpO1xuXHRsZXQgcGFpcnMgPSBhcnJheS5sZW5ndGggLyAyO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYgKHdpbkNvdW50Lmxlbmd0aCA9PT0gKGFycmF5Lmxlbmd0aCAvIDIpKSB7XG5cdFx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRyaWVzID09PSBwYWlycykge1xuXHRcdFx0XHRhbGVydChgQ29uZ3JhdHVsYXRpb25zISBZb3Ugd29uIGluICR7JCgnLmNvdW50JykudGV4dCgpfSB0cmllcyEgQSBwZXJmZWN0IHJvdW5kISBZb3UgYXJlIHRoZSBiZXN0ISFgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KGBDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24gaW4gJHskKCcuY291bnQnKS50ZXh0KCl9IHRyaWVzISBTZWxlY3QgYSBkaWZmaWN1bHR5IHRvIHBsYXkgYWdhaW4hYCk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0sMzAwKTtcbn07XG5cbi8vIERJRkZJQ1VMVFlcbmNvbnN0IHN3aXRjaFRvSGFyZE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmNhcmRzJykuYWRkQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0aWYgKGNhcmRBcnJheS5sZW5ndGggPT09IDgpIHtcblx0XHRcdGNhcmRBcnJheS5wdXNoKCdlZXZlZScsICdlZXZlZScsICdkcmF0aW5pJywgJ2RyYXRpbmknKTtcblx0XHR9XG5cdFx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdFx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG5jb25zdCBzd2l0Y2hUb05vcm1hbE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5ub3JtYWxNb2RlLCAubm9ybWFsVGltZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJy5jYXJkcycpLnJlbW92ZUNsYXNzKCdoYXJkR3JpZCcpO1xuXHRcdGNvbnN0IG5vcm1hbE1vZGVBcnJheSA9IGNhcmRBcnJheS5maWx0ZXIoKHBva2Vtb24pID0+IHtcblx0XHRcdGlmIChwb2tlbW9uICE9PSAnZHJhdGluaScgJiYgcG9rZW1vbiAhPT0gJ2VldmVlJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0c2h1ZmZsZUNhcmRzKG5vcm1hbE1vZGVBcnJheSk7XG5cdFx0Y2FyZEZsaXAobm9ybWFsTW9kZUFycmF5KTtcblx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR3aW5NZXNzYWdlKG5vcm1hbE1vZGVBcnJheSk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLy8gVElNRVJcblxubGV0IHNlY29uZHMgPSA3O1xuXG5jb25zdCBzZXRUaW1lciA9ICgpID0+IHtcblx0c3dpdGNoVG9Ob3JtYWxNb2RlKCk7XG5cdCQoJy5ub3JtYWxUaW1lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0bGV0IGNvdW50ZG93biA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0JCgnLnRpbWVyJykudGV4dChzZWNvbmRzKTtcblx0XHRcdHNlY29uZHMtLTtcblx0XHRcdGlmIChzZWNvbmRzIDwgMCkge1xuXHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbChjb3VudGRvd24pO1xuXHRcdFx0XHQkKCcuZnJvbnQnKS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNhcmRGbGlwKCkpO1xuXHRcdFx0fTtcblx0XHR9LCAxMDAwKTtcblx0XHQvLyBjb3VudGRvd24oKTtcblx0fSk7XG59O1xuXG4vLyBSRVNFVFxuJCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHQkKCcuY291bnQnKS50ZXh0KFwiMFwiKTtcblx0JCgnYXNpZGUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cdCQoJy50aW1lcicpLnRleHQoXCJcIik7XG5cdHNlY29uZHMgPSA3O1xuXHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMikge1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0fTtcbn0pO1xuXG4vLyBNRU5VXG4kKCdpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0JCgnYXNpZGUnKS50b2dnbGVDbGFzcyhcImhpZGRlblwiKTtcbn0pO1xuXG4vLyBJTklUXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuXHRzaHVmZmxlQ2FyZHMoY2FyZEFycmF5KTtcblx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0c3dpdGNoVG9IYXJkTW9kZSgpO1xuXHRzd2l0Y2hUb05vcm1hbE1vZGUoKTtcblx0c2V0VGltZXIoKTtcbn07XG5cbi8vIERPQ1VNRU5UIFJFQURZXG4kKGZ1bmN0aW9uKCkge1xuXHRpbml0KCk7XG59KTtcblxuXG5cblxuXG4iXX0=
