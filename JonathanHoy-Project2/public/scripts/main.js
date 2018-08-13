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

// MATCHING LOGIC
var flippedCards = [];

var compareCards = function compareCards() {
	if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
		var newVal = parseInt($('.count').text()) + 1;
		$('.count').text(newVal);
		flippedCards.pop();
		flippedCards.pop();
		$('.front').css('pointer-events', 'none');
		setTimeout(function () {
			$('.front').removeClass('flip');
			$('.back').removeClass('flip');
			$('.front').css('pointer-events', 'auto');
		}, 750);
	} else if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
		var _newVal = parseInt($('.count').text()) + 1;
		$('.count').text(_newVal);
		flippedCards.pop();
		flippedCards.pop();
		$('.back.flip').addClass('matched');
		$('.front.flip').addClass('matched');
	};
};

// FLIPPING CARDS (NORMAL MODE)
var cardFlip = function cardFlip() {
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
		compareCards();
	});
};

// DIFFICULTY
var playHardMode = function playHardMode() {
	$('.hardMode').on('click', function () {
		$('aside').addClass('hidden');
		$('.cards').toggleClass('hardGrid');
		if (cardArray.length === 8) {
			cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
		}
		shuffleCards(cardArray);
		cardFlip();
	});
};

var playNormalMode = function playNormalMode() {
	$('.normalMode').on('click', function () {
		$('aside').addClass('hidden');
		$('.cards').toggleClass('hardGrid');
		var normalModeArray = cardArray.filter(function (name) {
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
$('.playAgain').on('click', function () {
	location.reload();
});

$('a').on('click', function () {
	$('.count').text("0");
});

// MENU
$('i').on('click', function () {
	$('aside').toggleClass("hidden");
});

// INIT
var init = function init() {
	shuffleCards(cardArray);
	cardFlip();
	playHardMode();
	playNormalMode();
};

// DOCUMENT READY
$(function () {
	init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM3QixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVos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bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIENBUkQgTElTVFxuY29uc3QgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cbi8vIFNIVUZGTEUgRlVOQ1RJT05cbmNvbnN0IHNodWZmbGUgPSAoYXJyYXkpID0+IHtcbiAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG4gICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59O1xuXG4vLyBTSFVGRkxJTkcgQU5EIFBSSU5USU5HIEFSUkFZXG5sZXQgc2h1ZmZsZUNhcmRzID0gKGFycmF5KSA9PiB7XG5cdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoYXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cImRldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG59O1xuXG4vLyBNQVRDSElORyBMT0dJQ1xuY29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cbmNvbnN0IGNvbXBhcmVDYXJkcyA9ICgpID0+IHtcblx0aWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdICE9PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZnJvbnQnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0JCgnLmJhY2snKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0JCgnLmZyb250JykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XG5cdFx0fSw3NTApO1xuXHR9IGVsc2UgaWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdID09PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHQkKCcuYmFjay5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHQkKCcuZnJvbnQuZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdH07XG59O1xuXG4vLyBGTElQUElORyBDQVJEUyAoTk9STUFMIE1PREUpXG5jb25zdCBjYXJkRmxpcCA9ICgpID0+IHtcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZHJhdGluaScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdH07XG5cdFx0Y29tcGFyZUNhcmRzKCk7XG5cdH0pO1xufTtcblxuLy8gRElGRklDVUxUWVxubGV0IHBsYXlIYXJkTW9kZSA9ICgpID0+IHtcblx0JCgnLmhhcmRNb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHQkKCdhc2lkZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHQkKCcuY2FyZHMnKS50b2dnbGVDbGFzcygnaGFyZEdyaWQnKTtcblx0XHRpZiAoY2FyZEFycmF5Lmxlbmd0aCA9PT0gOCkge1xuXHRcdFx0Y2FyZEFycmF5LnB1c2goJ2VldmVlJywgJ2VldmVlJywgJ2RyYXRpbmknLCAnZHJhdGluaScpO1xuXHRcdH1cblx0XHRzaHVmZmxlQ2FyZHMoY2FyZEFycmF5KTtcblx0XHRjYXJkRmxpcCgpO1xuXHR9KTtcbn07XG5cbmxldCBwbGF5Tm9ybWFsTW9kZSA9ICgpID0+IHtcblx0JCgnLm5vcm1hbE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJ2FzaWRlJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdCQoJy5jYXJkcycpLnRvZ2dsZUNsYXNzKCdoYXJkR3JpZCcpO1xuXHRcdGNvbnN0IG5vcm1hbE1vZGVBcnJheSA9IGNhcmRBcnJheS5maWx0ZXIoKG5hbWUpID0+IHtcblx0XHRcdGlmIChuYW1lICE9PSAnZHJhdGluaScgJiYgbmFtZSAhPT0gJ2VldmVlJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0Ly8gY29uc29sZS5sb2cobm9ybWFsTW9kZUFycmF5KTtcblx0XHRzaHVmZmxlQ2FyZHMobm9ybWFsTW9kZUFycmF5KTtcblx0XHRjYXJkRmxpcCgpO1xuXHRcdC8vIGNvbnNvbGUubG9nKG5vcm1hbENhcmRBcnJheSk7XG5cdH0pO1xufTtcblxuLy8gUExBWSBBR0FJTiAmIFJFU0VUU1xuJCgnLnBsYXlBZ2FpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRsb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuXG4kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdCQoJy5jb3VudCcpLnRleHQoXCIwXCIpO1xufSlcblxuLy8gTUVOVVxuJCgnaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdCQoJ2FzaWRlJykudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG59KTtcblxuXG4vLyBJTklUXG5sZXQgaW5pdCA9ICgpID0+IHtcblx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdGNhcmRGbGlwKCk7XG5cdHBsYXlIYXJkTW9kZSgpO1xuXHRwbGF5Tm9ybWFsTW9kZSgpO1xufTtcblxuXG4vLyBET0NVTUVOVCBSRUFEWVxuJChmdW5jdGlvbigpIHtcblx0aW5pdCgpO1xufSk7XG5cblxuXG5cblxuIl19
