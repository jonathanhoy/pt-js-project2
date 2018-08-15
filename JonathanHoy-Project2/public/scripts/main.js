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
	$('.count').text(newVal);
};

// WINNING
var winCount = [];

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
var normalSeconds = 5;
var hardSeconds = 45;

var setNormalTimer = function setNormalTimer() {
	var countdown = window.setInterval(function () {
		$('.displayTimer').text(normalSeconds);
		normalSeconds--;
		if (normalSeconds < 0) {
			window.clearInterval(countdown);
			$('.front').removeEventListener('click', cardFlip());
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

// RESET
$('a').on('click', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUMvQixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVos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QUFFLGVBQUYsRUFBbUIsSUFBbkIsQ0FBd0IsRUFBeEI7O0FBRUEsaUJBQWdCLENBQWhCO0FBQ0EsZUFBYyxFQUFkO0FBQ0EsS0FBSSxhQUFhLE1BQWIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDOUIsZUFBYSxHQUFiO0FBQ0EsZUFBYSxHQUFiO0FBQ0EsRUFIRCxNQUdPLElBQUksYUFBYSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQ3JDLGVBQWEsR0FBYjtBQUNBO0FBQ0QsQ0FiRDs7QUFlQTtBQUNBLEVBQUUsR0FBRixFQUFPLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFlBQVU7QUFDNUIsR0FBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixRQUF2QjtBQUNBLENBRkQ7O0FBSUE7QUFDQSxJQUFNLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDbEIsY0FBYSxTQUFiO0FBQ0EsVUFBUyxTQUFUO0FBQ0E7QUFDQTtBQUNBLENBTEQ7O0FBT0E7QUFDQSxFQUFFLFlBQVc7QUFDWjtBQUNBLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBDQVJEIExJU1RcbmNvbnN0IGNhcmRBcnJheSA9IFtcImJ1bGJhc2F1clwiLCBcImJ1bGJhc2F1clwiLCBcImNoYXJtYW5kZXJcIiwgXCJjaGFybWFuZGVyXCIsIFwic3F1aXJ0bGVcIiwgXCJzcXVpcnRsZVwiLCBcInBpa2FjaHVcIiwgXCJwaWthY2h1XCJdO1xuXG4vLyBTSFVGRkxFIEZVTkNUSU9OXG5jb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG4gIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuLy8gU0hVRkZMSU5HIEFORCBQUklOVElORyBBUlJBWVxuY29uc3Qgc2h1ZmZsZUNhcmRzID0gKGFycmF5KSA9PiB7XG5cdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoYXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cImRldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG59O1xuXG4vLyBGTElQUElORyBDQVJEU1xuY29uc3QgY2FyZEZsaXAgPSAoYXJyYXkpID0+IHtcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZHJhdGluaScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdH07XG5cdFx0Y29tcGFyZUNhcmRzKGFycmF5KTtcblx0fSk7XG59O1xuXG4vLyBNQVRDSElORyBMT0dJQ1xuY29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cbmNvbnN0IGNvbXBhcmVDYXJkcyA9IChhcnJheSkgPT4ge1xuXHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGFkZFRvQ291bnQoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblx0XHR9LDc1MCk7XG5cdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGFkZFRvQ291bnQoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5iYWNrLmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdCQoJy5mcm9udC5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHR3aW5Db3VudC5wdXNoKCdtYXRjaGVkJyk7XG5cdFx0d2luTWVzc2FnZShhcnJheSk7XG5cdH07XG59O1xuXG5jb25zdCBhZGRUb0NvdW50ID0gKCkgPT4ge1xuXHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0JCgnLmNvdW50JykudGV4dChuZXdWYWwpO1xufVxuXG4vLyBXSU5OSU5HXG5sZXQgd2luQ291bnQgPSBbXTtcblxuY29uc3Qgd2luTWVzc2FnZSA9IChhcnJheSkgPT4ge1xuXHRsZXQgdHJpZXMgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpO1xuXHRsZXQgcGFpcnMgPSBhcnJheS5sZW5ndGggLyAyO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYgKHdpbkNvdW50Lmxlbmd0aCA9PT0gKGFycmF5Lmxlbmd0aCAvIDIpKSB7XG5cdFx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRyaWVzID09PSBwYWlycykge1xuXHRcdFx0XHRhbGVydChgQ29uZ3JhdHVsYXRpb25zISBZb3Ugd29uIGluICR7JCgnLmNvdW50JykudGV4dCgpfSB0cmllcyEgQSBwZXJmZWN0IHJvdW5kISBZb3UgYXJlIHRoZSBiZXN0ISFgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KGBDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24gaW4gJHskKCcuY291bnQnKS50ZXh0KCl9IHRyaWVzISBTZWxlY3QgYSBkaWZmaWN1bHR5IHRvIHBsYXkgYWdhaW4hYCk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0sMzAwKTtcbn07XG5cbi8vIERJRkZJQ1VMVFlcblxuY29uc3QgZGlmZmljdWx0eUNoZWNrID0gW107XG5cbmNvbnN0IHN3aXRjaFRvSGFyZE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0ZGlmZmljdWx0eUNoZWNrLnB1c2goJ2hhcmRNb2RlJyk7XG5cdFx0JCgnLmNhcmRzJykuYWRkQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0aWYgKGNhcmRBcnJheS5sZW5ndGggPT09IDgpIHtcblx0XHRcdGNhcmRBcnJheS5wdXNoKCdlZXZlZScsICdlZXZlZScsICdkcmF0aW5pJywgJ2RyYXRpbmknKTtcblx0XHR9XG5cdFx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdFx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG5jb25zdCBzd2l0Y2hUb05vcm1hbE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5ub3JtYWxNb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRkaWZmaWN1bHR5Q2hlY2sucG9wKCk7XG5cdFx0JCgnLmNhcmRzJykucmVtb3ZlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0Y29uc3Qgbm9ybWFsTW9kZUFycmF5ID0gY2FyZEFycmF5LmZpbHRlcigocG9rZW1vbikgPT4ge1xuXHRcdFx0aWYgKHBva2Vtb24gIT09ICdkcmF0aW5pJyAmJiBwb2tlbW9uICE9PSAnZWV2ZWUnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0XHRzaHVmZmxlQ2FyZHMobm9ybWFsTW9kZUFycmF5KTtcblx0XHRjYXJkRmxpcChub3JtYWxNb2RlQXJyYXkpO1xuXHRcdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9O1xuXHRcdHdpbk1lc3NhZ2Uobm9ybWFsTW9kZUFycmF5KTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vLyBUSU1FUlxubGV0IG5vcm1hbFNlY29uZHMgPSA1O1xubGV0IGhhcmRTZWNvbmRzID0gNDU7XG5cbmNvbnN0IHNldE5vcm1hbFRpbWVyID0gKCkgPT4ge1xuXHRsZXQgY291bnRkb3duID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmRpc3BsYXlUaW1lcicpLnRleHQobm9ybWFsU2Vjb25kcyk7XG5cdFx0bm9ybWFsU2Vjb25kcy0tO1xuXHRcdGlmIChub3JtYWxTZWNvbmRzIDwgMCkge1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoY291bnRkb3duKTtcblx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FyZEZsaXAoKSk7XG5cdFx0fTtcblx0fSwgMTAwMCk7XG59O1xuXG4kKCcubm9ybWFsVGltZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoZGlmZmljdWx0eUNoZWNrWzBdID09PSAnaGFyZE1vZGUnKSB7XG5cdFx0YWxlcnQoJ1BsZWFzZSBzZWxlY3Qgbm9ybWFsIGRpZmZpY3VsdHkgYmVmb3JlIHN0YXJ0aW5nIHRoZSBub3JtYWwgbW9kZSB0aW1lciEnKTtcblx0fSBlbHNlIHtcblx0XHRzZXROb3JtYWxUaW1lcigpO1xuXHR9O1xufSlcblxuLy8gUkVTRVRcbiQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0JCgnLmNvdW50JykudGV4dChcIjBcIik7XG5cdCQoJ2FzaWRlJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHQkKCcuZGlzcGxheVRpbWVyJykudGV4dCgnJyk7XG5cblx0bm9ybWFsU2Vjb25kcyA9IDU7XG5cdGhhcmRTZWNvbmRzID0gNDU7XG5cdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyKSB7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0fSBlbHNlIGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAxKSB7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHR9O1xufSk7XG5cbi8vIE1FTlVcbiQoJ2knKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHQkKCdhc2lkZScpLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xufSk7XG5cbi8vIElOSVRcbmNvbnN0IGluaXQgPSAoKSA9PiB7XG5cdHNodWZmbGVDYXJkcyhjYXJkQXJyYXkpO1xuXHRjYXJkRmxpcChjYXJkQXJyYXkpO1xuXHRzd2l0Y2hUb0hhcmRNb2RlKCk7XG5cdHN3aXRjaFRvTm9ybWFsTW9kZSgpO1xufTtcblxuLy8gRE9DVU1FTlQgUkVBRFlcbiQoZnVuY3Rpb24oKSB7XG5cdGluaXQoKTtcbn0pO1xuXG5cblxuXG5cbiJdfQ==
