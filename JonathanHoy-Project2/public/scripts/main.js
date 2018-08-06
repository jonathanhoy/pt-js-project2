(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.


$(function () {

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
	var shuffledCardArray = shuffle(cardArray);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[i] + "\"><img src=\"../dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards

	// FLIPPING CARDS
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
		} else if ($(this).next().hasClass('jigglypuff')) {
			flippedCards.push('jigglypuff');
		} else if ($(this).next().hasClass('eevee')) {
			flippedCards.push('eevee');
		};
		compareCards();
	});

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

	// PLAY AGAIN
	$('button').on('click', function () {
		location.reload();
	});

	// DIFFICULTY
	$('.hardMode').on('click', function () {
		$('.cards').toggleClass('hardGrid');
		cardArray.push('jigglypuff', 'jigglypuff', 'eevee', 'eevee');
		var shuffledCardArray = shuffle(cardArray);
		var shuffledCardList = '';
		for (var _i = 0; _i < shuffledCardArray.length; _i++) {
			shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[_i] + "\"><img src=\"../dev/assets/" + shuffledCardArray[_i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[_i] + ".\"></div></div></li>";
		};
		$('.cards.hardGrid').html(shuffledCardList);
		console.log(shuffledCardArray);
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWjtBQUNBLEtBQUksWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWhCOztBQUdBO0FBQ0EsS0FBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixNQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLE1BQWlDLGNBQWpDO0FBQUEsTUFBaUQsV0FBakQ7QUFDQTtBQUNBLFNBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsaUJBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxtQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG9CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxTQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsU0FBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCxFQWJEOztBQWVBO0FBQ0EsS0FBSSxvQkFBb0IsUUFBUSxTQUFSLENBQXhCO0FBQ0EsS0FBSSxtQkFBbUIsRUFBdkI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksa0JBQWtCLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2xELCtHQUFvRyxrQkFBa0IsQ0FBbEIsQ0FBcEcsb0NBQXFKLGtCQUFrQixDQUFsQixDQUFySix1Q0FBeU0sa0JBQWtCLENBQWxCLENBQXpNO0FBQ0E7QUFDRCxHQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLGdCQUFqQjtBQUNBLFNBQVEsR0FBUixDQUFZLGlCQUFaLEVBN0JZLENBNkJvQjs7QUFFaEM7QUFDQSxHQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2xDLElBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxJQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsV0FBZixDQUEyQixNQUEzQjtBQUNBLE1BQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsV0FBeEIsQ0FBSixFQUEwQztBQUN6QyxnQkFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ0EsR0FGRCxNQUVPLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsWUFBeEIsQ0FBSixFQUEyQztBQUNqRCxnQkFBYSxJQUFiLENBQWtCLFlBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUMvQyxnQkFBYSxJQUFiLENBQWtCLFVBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUM5QyxnQkFBYSxJQUFiLENBQWtCLFNBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsWUFBeEIsQ0FBSixFQUEyQztBQUNqRCxnQkFBYSxJQUFiLENBQWtCLFlBQWxCO0FBQ0EsR0FGTSxNQUVBLElBQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsT0FBeEIsQ0FBSixFQUFzQztBQUM1QyxnQkFBYSxJQUFiLENBQWtCLE9BQWxCO0FBQ0E7QUFDRDtBQUNBLEVBakJEOztBQW1CQTtBQUNBLEtBQU0sZUFBZSxFQUFyQjs7QUFFQSxLQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDMUIsTUFBSSxhQUFhLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkIsYUFBYSxDQUFiLE1BQW9CLGFBQWEsQ0FBYixDQUFyRCxFQUFzRTtBQUNyRSxPQUFNLFNBQVMsU0FBUyxFQUFFLFFBQUYsRUFBWSxJQUFaLEVBQVQsSUFBK0IsQ0FBOUM7QUFDQSxLQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLE1BQWpCO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLGdCQUFhLEdBQWI7QUFDQSxLQUFFLFFBQUYsRUFBWSxHQUFaLENBQWdCLGdCQUFoQixFQUFrQyxNQUFsQztBQUNBLGNBQVcsWUFBVTtBQUNwQixNQUFFLFFBQUYsRUFBWSxXQUFaLENBQXdCLE1BQXhCO0FBQ0EsTUFBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixNQUF2QjtBQUNBLE1BQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsZ0JBQWhCLEVBQWtDLE1BQWxDO0FBQ0EsSUFKRCxFQUlFLEdBSkY7QUFLQSxHQVhELE1BV08sSUFBSSxhQUFhLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkIsYUFBYSxDQUFiLE1BQW9CLGFBQWEsQ0FBYixDQUFyRCxFQUFzRTtBQUM1RSxPQUFNLFVBQVMsU0FBUyxFQUFFLFFBQUYsRUFBWSxJQUFaLEVBQVQsSUFBK0IsQ0FBOUM7QUFDQSxLQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLE9BQWpCO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLGdCQUFhLEdBQWI7QUFDQSxLQUFFLFlBQUYsRUFBZ0IsUUFBaEIsQ0FBeUIsU0FBekI7QUFDQSxLQUFFLGFBQUYsRUFBaUIsUUFBakIsQ0FBMEIsU0FBMUI7QUFDQTtBQUNELEVBcEJEOztBQXNCQTtBQUNBLEdBQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFlBQVc7QUFDbEMsV0FBUyxNQUFUO0FBQ0EsRUFGRDs7QUFJQTtBQUNBLEdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsWUFBVTtBQUNwQyxJQUFFLFFBQUYsRUFBWSxXQUFaLENBQXdCLFVBQXhCO0FBQ0EsWUFBVSxJQUFWLENBQWUsWUFBZixFQUE2QixZQUE3QixFQUEyQyxPQUEzQyxFQUFvRCxPQUFwRDtBQUNBLE1BQUksb0JBQW9CLFFBQVEsU0FBUixDQUF4QjtBQUNBLE1BQUksbUJBQW1CLEVBQXZCO0FBQ0EsT0FBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLGtCQUFrQixNQUF0QyxFQUE4QyxJQUE5QyxFQUFtRDtBQUNsRCxnSEFBb0csa0JBQWtCLEVBQWxCLENBQXBHLG9DQUFxSixrQkFBa0IsRUFBbEIsQ0FBckosdUNBQXlNLGtCQUFrQixFQUFsQixDQUF6TTtBQUNBO0FBQ0QsSUFBRSxpQkFBRixFQUFxQixJQUFyQixDQUEwQixnQkFBMUI7QUFDQSxVQUFRLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLEVBVkQ7QUFZQSxDQTlGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIE1hdGNoIEdhbWVcblxuLy8gOCBjYXJkcywgZmFjZSBkb3duLiBVc2VyIGNhbiBmbGlwIHVwIHRvIHR3byBjYXJkcyBhdCBhIHRpbWUgdG8gcmV2ZWFsIGltYWdlIG9uIGZyb250IG9mIGNhcmQuIElmIGltYWdlcyBtYXRjaCwgdGhlIGNhcmRzIHN0YXkgZmFjZSB1cC4gSWYgaW1hZ2VzIGRvbid0IG1hdGNoLCBjYXJkcyBhcmUgZmxpcHBlZCBmYWNlIGRvd24gYW5kIHRoZSB1c2VyIHNlbGVjdHMgdHdvIG5ldyBjYXJkcy4gT2JqZWN0aXZlIGlzIHRvIGZpbmQgYWxsIHBhaXJzIG9mIG1hdGNoaW5nIGNhcmRzLlxuXG5cbi8vIExvZ2ljXG5cbi8vIEFycmF5IG9mIFwiY2FyZHNcIiBpcyBzaHVmZmxlZCBhbmQgdGhlbiBpbnN0ZXJ0ZWQgaW50byB0aGUgRE9NLiBVc2luZyBDU1MgdG8gY3JlYXRlIGZsaXBwYWJsZSBjYXJkcywgdXNlciBjbGlja3Mgb24gdHdvIGNhcmRzIHRvIHJldmVhbCBpbWFnZS5cblxuXG5cbiQoZnVuY3Rpb24gKCl7XG5cblx0Ly8gQ0FSRCBMSVNUXG5cdGxldCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblx0XG5cblx0Ly8gU0hVRkZMRSBGVU5DVElPTlxuXHRjb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG5cdCAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXHQgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG5cdCAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXHQgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG5cdCAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG5cdCAgICBjdXJyZW50SW5kZXggLT0gMTtcblx0ICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0ICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcblx0ICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG5cdCAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcblx0ICB9XG5cdCAgcmV0dXJuIGFycmF5O1xuXHR9O1xuXG5cdC8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShjYXJkQXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cIi4uL2Rldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG5cblx0Ly8gRkxJUFBJTkcgQ0FSRFNcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnamlnZ2x5cHVmZicpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnamlnZ2x5cHVmZicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2VldmVlJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdlZXZlZScpO1xuXHRcdH07XG5cdFx0Y29tcGFyZUNhcmRzKCk7XG5cdH0pO1xuXG5cdC8vIE1BVENISU5HIExPR0lDXG5cdGNvbnN0IGZsaXBwZWRDYXJkcyA9IFtdO1xuXG5cdGNvbnN0IGNvbXBhcmVDYXJkcyA9ICgpID0+IHtcblx0XHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdFx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnLmZyb250JykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdFx0JCgnLmJhY2snKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblx0XHRcdH0sNzUwKTtcblx0XHR9IGVsc2UgaWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdID09PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRcdGNvbnN0IG5ld1ZhbCA9IHBhcnNlSW50KCQoJy5jb3VudCcpLnRleHQoKSkgKyAxO1xuXHRcdFx0JCgnLmNvdW50JykudGV4dChuZXdWYWwpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0JCgnLmJhY2suZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdFx0XHQkKCcuZnJvbnQuZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBQTEFZIEFHQUlOXG5cdCQoJ2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHR9KTtcblxuXHQvLyBESUZGSUNVTFRZXG5cdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmNhcmRzJykudG9nZ2xlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0Y2FyZEFycmF5LnB1c2goJ2ppZ2dseXB1ZmYnLCAnamlnZ2x5cHVmZicsICdlZXZlZScsICdlZXZlZScpO1xuXHRcdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoY2FyZEFycmF5KTtcblx0XHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2h1ZmZsZWRDYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHNodWZmbGVkQ2FyZExpc3QgKz0gYDxsaSBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJmcm9udFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCIuLi9kZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0XHR9O1xuXHRcdCQoJy5jYXJkcy5oYXJkR3JpZCcpLmh0bWwoc2h1ZmZsZWRDYXJkTGlzdCk7XG5cdFx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpO1xuXHR9KTtcblxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuIl19
