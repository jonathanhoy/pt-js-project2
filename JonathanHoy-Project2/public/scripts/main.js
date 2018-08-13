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

// FLIPPING CARDS (NORMAL MODE)
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

var winCount = [];

var compareCards = function compareCards(array) {
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
		winCount.push('matched');
		console.log(winCount);
		winMessage(array);
	};
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
	});
	winCount = winCount.filter(function (match) {
		if (match !== 'matched') {
			return true;
		};
	});
};

var switchToNormalMode = function switchToNormalMode() {
	$('.normalMode').on('click', function () {
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

// RESET
$('a').on('click', function () {
	$('.count').text("0");
	$('aside').addClass('hidden');
});

// MENU
$('i').on('click', function () {
	$('aside').toggleClass("hidden");
});

// WINNING
var winMessage = function winMessage(array) {
	var tries = parseInt($('.count').text());
	var pairs = array.length / 2;
	console.log(tries);
	console.log(pairs);
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
	}, 10);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM3QixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVosRUFQNkIsQ0FPRztBQUNoQyxDQVJEOztBQVVBO0FBQ0EsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLEtBQUQsRUFBVztBQUMzQixHQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2xDLElBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxJQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsV0FBZixDQUEyQixNQUEzQjtBQUNBLE1BQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsV0FBeEIsQ0FBSixFQUEwQztBQUN6QyxnQkFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ0EsR0FGRCxNQUVPLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsWUFBeEIsQ0FBSixFQUEyQztBQUNqRCxnQkFBYSxJQUFiLENBQWtCLFlBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUMvQyxnQkFBYSxJQUFiLENBQWtCLFVBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUM5QyxnQkFBYSxJQUFiLENBQWtCLFNBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsT0FBeEIsQ0FBSixFQUFzQztBQUM1QyxnQkFBYSxJQUFiLENBQWtCLE9BQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUM5QyxnQkFBYSxJQUFiLENBQWtCLFNBQWxCO0FBQ0E7QUFDRCxlQUFhLEtBQWI7QUFDQSxFQWpCRDtBQWtCQSxDQW5CRDs7QUFxQkE7QUFDQSxJQUFNLGVBQWUsRUFBckI7O0FBRUEsSUFBSSxXQUFXLEVBQWY7O0FBRUEsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUMvQixLQUFJLGFBQWEsTUFBYixLQUF3QixDQUF4QixJQUE2QixhQUFhLENBQWIsTUFBb0IsYUFBYSxDQUFiLENBQXJELEVBQXNFO0FBQ3JFLE1BQU0sU0FBUyxTQUFTLEVBQUUsUUFBRixFQUFZLElBQVosRUFBVCxJQUErQixDQUE5QztBQUNBLElBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsTUFBakI7QUFDQSxlQUFhLEdBQWI7QUFDQSxlQUFhLEdBQWI7QUFDQSxJQUFFLFFBQUYsRUFBWSxHQUFaLENBQWdCLGdCQUFoQixFQUFrQyxNQUFsQztBQUNBLGFBQVcsWUFBVTtBQUNwQixLQUFFLFFBQUYsRUFBWSxXQUFaLENBQXdCLE1BQXhCO0FBQ0EsS0FBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixNQUF2QjtBQUNBLEtBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsZ0JBQWhCLEVBQWtDLE1BQWxDO0FBQ0EsR0FKRCxFQUlFLEdBSkY7QUFLQSxFQVhELE1BV08sSUFBSSxhQUFhLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkIsYUFBYSxDQUFiLE1BQW9CLGFBQWEsQ0FBYixDQUFyRCxFQUFzRTtBQUM1RSxNQUFNLFVBQVMsU0FBUyxFQUFFLFFBQUYsRUFBWSxJQUFaLEVBQVQsSUFBK0IsQ0FBOUM7QUFDQSxJQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLE9BQWpCO0FBQ0EsZUFBYSxHQUFiO0FBQ0EsZUFBYSxHQUFiO0FBQ0EsSUFBRSxZQUFGLEVBQWdCLFFBQWhCLENBQXlCLFNBQXpCO0FBQ0EsSUFBRSxhQUFGLEVBQWlCLFFBQWpCLENBQTBCLFNBQTFCO0FBQ0EsV0FBUyxJQUFULENBQWMsU0FBZDtBQUNBLFVBQVEsR0FBUixDQUFZLFFBQVo7QUFDQSxhQUFXLEtBQVg7QUFDQTtBQUNELENBdkJEOztBQXlCQTtBQUNBLElBQUksbUJBQW1CLFNBQW5CLGdCQUFtQixHQUFNO0FBQzVCLEdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsWUFBVTtBQUNwQyxJQUFFLFFBQUYsRUFBWSxRQUFaLENBQXFCLFVBQXJCO0FBQ0EsTUFBSSxVQUFVLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDM0IsYUFBVSxJQUFWLENBQWUsT0FBZixFQUF3QixPQUF4QixFQUFpQyxTQUFqQyxFQUE0QyxTQUE1QztBQUNBO0FBQ0QsZUFBYSxTQUFiO0FBQ0EsV0FBUyxTQUFUO0FBQ0EsRUFQRDtBQVFBLFlBQVcsU0FBUyxNQUFULENBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3JDLE1BQUksVUFBVSxTQUFkLEVBQXlCO0FBQ3hCLFVBQU8sSUFBUDtBQUNBO0FBQ0QsRUFKVSxDQUFYO0FBS0EsQ0FkRDs7QUFpQkEsSUFBSSxxQkFBcUIsU0FBckIsa0JBQXFCLEdBQU07QUFDOUIsR0FBRSxhQUFGLEVBQWlCLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFlBQVU7QUFDdEMsSUFBRSxRQUFGLEVBQVksV0FBWixDQUF3QixVQUF4QjtBQUNBLE1BQU0sa0JBQWtCLFVBQVUsTUFBVixDQUFpQixVQUFDLE9BQUQsRUFBYTtBQUNyRCxPQUFJLFlBQVksU0FBWixJQUF5QixZQUFZLE9BQXpDLEVBQWtEO0FBQ2pELFdBQU8sSUFBUDtBQUNBO0FBQ0QsR0FKdUIsQ0FBeEI7QUFLQSxlQUFhLGVBQWI7QUFDQSxXQUFTLGVBQVQ7QUFDQSxhQUFXLFNBQVMsTUFBVCxDQUFnQixVQUFDLEtBQUQsRUFBVztBQUNyQyxPQUFJLFVBQVUsU0FBZCxFQUF5QjtBQUN4QixXQUFPLElBQVA7QUFDQTtBQUNGLGNBQVcsZUFBWDtBQUNDLEdBTFUsQ0FBWDtBQU1BLEVBZkQ7QUFnQkEsQ0FqQkQ7O0FBbUJBO0FBQ0EsRUFBRSxHQUFGLEVBQU8sRUFBUCxDQUFVLE9BQVYsRUFBbUIsWUFBVztBQUM3QixHQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLEdBQWpCO0FBQ0EsR0FBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixRQUFwQjtBQUNBLENBSEQ7O0FBS0E7QUFDQSxFQUFFLEdBQUYsRUFBTyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFVO0FBQzVCLEdBQUUsT0FBRixFQUFXLFdBQVgsQ0FBdUIsUUFBdkI7QUFDQSxDQUZEOztBQUlBO0FBQ0EsSUFBSSxhQUFhLFNBQWIsVUFBYSxDQUFDLEtBQUQsRUFBVztBQUMzQixLQUFJLFFBQVEsU0FBUyxFQUFFLFFBQUYsRUFBWSxJQUFaLEVBQVQsQ0FBWjtBQUNBLEtBQUksUUFBUSxNQUFNLE1BQU4sR0FBZSxDQUEzQjtBQUNBLFNBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxTQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsWUFBVyxZQUFVO0FBQ3BCLE1BQUksU0FBUyxNQUFULEtBQXFCLE1BQU0sTUFBTixHQUFlLENBQXhDLEVBQTRDO0FBQzNDLGNBQVcsU0FBUyxNQUFULENBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3JDLFFBQUksVUFBVSxTQUFkLEVBQXlCO0FBQ3hCLFlBQU8sSUFBUDtBQUNBO0FBQ0QsSUFKVSxDQUFYO0FBS0EsT0FBSSxVQUFVLEtBQWQsRUFBcUI7QUFDcEIsMkNBQXFDLEVBQUUsUUFBRixFQUFZLElBQVosRUFBckM7QUFDQSxJQUZELE1BRU87QUFDTiwyQ0FBcUMsRUFBRSxRQUFGLEVBQVksSUFBWixFQUFyQztBQUNBO0FBQ0Q7QUFDRCxFQWJELEVBYUUsRUFiRjtBQWNBLENBbkJEOztBQXFCQTtBQUNBLElBQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNoQixjQUFhLFNBQWI7QUFDQSxVQUFTLFNBQVQ7QUFDQTtBQUNBO0FBQ0EsQ0FMRDs7QUFRQTtBQUNBLEVBQUUsWUFBVztBQUNaO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIENBUkQgTElTVFxuY29uc3QgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cbi8vIFNIVUZGTEUgRlVOQ1RJT05cbmNvbnN0IHNodWZmbGUgPSAoYXJyYXkpID0+IHtcbiAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG4gICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59O1xuXG4vLyBTSFVGRkxJTkcgQU5EIFBSSU5USU5HIEFSUkFZXG5sZXQgc2h1ZmZsZUNhcmRzID0gKGFycmF5KSA9PiB7XG5cdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoYXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cImRldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG59O1xuXG4vLyBGTElQUElORyBDQVJEUyAoTk9STUFMIE1PREUpXG5jb25zdCBjYXJkRmxpcCA9IChhcnJheSkgPT4ge1xuXHQkKCcuZnJvbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0JCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2J1bGJhc2F1cicpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnY2hhcm1hbmRlcicpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnY2hhcm1hbmRlcicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdzcXVpcnRsZScpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3Bpa2FjaHUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdlZXZlZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZWV2ZWUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdkcmF0aW5pJyk7XG5cdFx0fTtcblx0XHRjb21wYXJlQ2FyZHMoYXJyYXkpO1xuXHR9KTtcbn07XG5cbi8vIE1BVENISU5HIExPR0lDXG5jb25zdCBmbGlwcGVkQ2FyZHMgPSBbXTtcblxubGV0IHdpbkNvdW50ID0gW107XG5cbmNvbnN0IGNvbXBhcmVDYXJkcyA9IChhcnJheSkgPT4ge1xuXHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGNvbnN0IG5ld1ZhbCA9IHBhcnNlSW50KCQoJy5jb3VudCcpLnRleHQoKSkgKyAxO1xuXHRcdCQoJy5jb3VudCcpLnRleHQobmV3VmFsKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblx0XHR9LDc1MCk7XG5cdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdGNvbnN0IG5ld1ZhbCA9IHBhcnNlSW50KCQoJy5jb3VudCcpLnRleHQoKSkgKyAxO1xuXHRcdCQoJy5jb3VudCcpLnRleHQobmV3VmFsKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdCQoJy5iYWNrLmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdCQoJy5mcm9udC5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHR3aW5Db3VudC5wdXNoKCdtYXRjaGVkJyk7XG5cdFx0Y29uc29sZS5sb2cod2luQ291bnQpO1xuXHRcdHdpbk1lc3NhZ2UoYXJyYXkpO1xuXHR9O1xufTtcblxuLy8gRElGRklDVUxUWVxubGV0IHN3aXRjaFRvSGFyZE1vZGUgPSAoKSA9PiB7XG5cdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmNhcmRzJykuYWRkQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0aWYgKGNhcmRBcnJheS5sZW5ndGggPT09IDgpIHtcblx0XHRcdGNhcmRBcnJheS5wdXNoKCdlZXZlZScsICdlZXZlZScsICdkcmF0aW5pJywgJ2RyYXRpbmknKTtcblx0XHR9XG5cdFx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdFx0Y2FyZEZsaXAoY2FyZEFycmF5KTtcblx0fSk7XG5cdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHR9KTtcbn07XG5cblxubGV0IHN3aXRjaFRvTm9ybWFsTW9kZSA9ICgpID0+IHtcblx0JCgnLm5vcm1hbE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJy5jYXJkcycpLnJlbW92ZUNsYXNzKCdoYXJkR3JpZCcpO1xuXHRcdGNvbnN0IG5vcm1hbE1vZGVBcnJheSA9IGNhcmRBcnJheS5maWx0ZXIoKHBva2Vtb24pID0+IHtcblx0XHRcdGlmIChwb2tlbW9uICE9PSAnZHJhdGluaScgJiYgcG9rZW1vbiAhPT0gJ2VldmVlJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0c2h1ZmZsZUNhcmRzKG5vcm1hbE1vZGVBcnJheSk7XG5cdFx0Y2FyZEZsaXAobm9ybWFsTW9kZUFycmF5KTtcblx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdGlmIChtYXRjaCAhPT0gJ21hdGNoZWQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR3aW5NZXNzYWdlKG5vcm1hbE1vZGVBcnJheSk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLy8gUkVTRVRcbiQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0JCgnLmNvdW50JykudGV4dChcIjBcIik7XG5cdCQoJ2FzaWRlJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xufSk7XG5cbi8vIE1FTlVcbiQoJ2knKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHQkKCdhc2lkZScpLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xufSk7XG5cbi8vIFdJTk5JTkdcbmxldCB3aW5NZXNzYWdlID0gKGFycmF5KSA9PiB7XG5cdGxldCB0cmllcyA9IHBhcnNlSW50KCQoJy5jb3VudCcpLnRleHQoKSk7XG5cdGxldCBwYWlycyA9IGFycmF5Lmxlbmd0aCAvIDI7XG5cdGNvbnNvbGUubG9nKHRyaWVzKTtcblx0Y29uc29sZS5sb2cocGFpcnMpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYgKHdpbkNvdW50Lmxlbmd0aCA9PT0gKGFycmF5Lmxlbmd0aCAvIDIpKSB7XG5cdFx0XHR3aW5Db3VudCA9IHdpbkNvdW50LmZpbHRlcigobWF0Y2gpID0+IHtcblx0XHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRyaWVzID09PSBwYWlycykge1xuXHRcdFx0XHRhbGVydChgQ29uZ3JhdHVsYXRpb25zISBZb3Ugd29uIGluICR7JCgnLmNvdW50JykudGV4dCgpfSB0cmllcyEgQSBwZXJmZWN0IHJvdW5kISBZb3UgYXJlIHRoZSBiZXN0ISFgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KGBDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24gaW4gJHskKCcuY291bnQnKS50ZXh0KCl9IHRyaWVzISBTZWxlY3QgYSBkaWZmaWN1bHR5IHRvIHBsYXkgYWdhaW4hYCk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0sMTApO1xufTtcblxuLy8gSU5JVFxubGV0IGluaXQgPSAoKSA9PiB7XG5cdHNodWZmbGVDYXJkcyhjYXJkQXJyYXkpO1xuXHRjYXJkRmxpcChjYXJkQXJyYXkpO1xuXHRzd2l0Y2hUb0hhcmRNb2RlKCk7XG5cdHN3aXRjaFRvTm9ybWFsTW9kZSgpO1xufTtcblxuXG4vLyBET0NVTUVOVCBSRUFEWVxuJChmdW5jdGlvbigpIHtcblx0aW5pdCgpO1xufSk7XG5cblxuXG5cblxuIl19
