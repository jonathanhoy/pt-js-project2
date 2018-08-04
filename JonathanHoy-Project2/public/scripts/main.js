(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.


$(function () {

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
	}

	$('.cards').html(shuffledCardList);

	console.log(shuffledCardArray);

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
		} else {
			flippedCards.push('pikachu');
		};
		// $(this).next().addClass('disabled');
		var flippedValue = flippedCards[0].toString();
		if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
			$('.back.flip').addClass('disabled');
			// } else if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
			// 	$(this).next().removeClass('disabled');
		};
		console.log(flippedValue);
		compareCards();
		// console.log(flippedCards);
	});

	// MATCHING LOGIC
	var flippedCards = [];

	var compareCards = function compareCards() {
		if (flippedCards.length > 2 && flippedCards[0] !== flippedCards[1]) {
			flippedCards.pop();
			flippedCards.pop();
			flippedCards.pop();
			console.log(flippedCards);
			$('.front').removeClass('flip');
			$('.back').removeClass('flip');
		} else if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
			flippedCards.pop();
			flippedCards.pop();
			console.log('Match!');
		};
	};

	// if statement to determine when two cards are flipped, can't flip any more cards?

	// if two flipped cards match, add class 'completed' with some CSS and won't be flipped anymore?

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWixLQUFNLFlBQVksQ0FBQyxXQUFELEVBQWMsV0FBZCxFQUEyQixZQUEzQixFQUF5QyxZQUF6QyxFQUF1RCxVQUF2RCxFQUFtRSxVQUFuRSxFQUErRSxTQUEvRSxFQUEwRixTQUExRixDQUFsQjs7QUFHQTtBQUNBLEtBQU0sVUFBVSxTQUFWLE9BQVUsQ0FBQyxLQUFELEVBQVc7QUFDekIsTUFBSSxlQUFlLE1BQU0sTUFBekI7QUFBQSxNQUFpQyxjQUFqQztBQUFBLE1BQWlELFdBQWpEO0FBQ0E7QUFDQSxTQUFPLE1BQU0sWUFBYixFQUEyQjtBQUN6QjtBQUNBLGlCQUFjLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixZQUEzQixDQUFkO0FBQ0EsbUJBQWdCLENBQWhCO0FBQ0E7QUFDQSxvQkFBaUIsTUFBTSxZQUFOLENBQWpCO0FBQ0EsU0FBTSxZQUFOLElBQXNCLE1BQU0sV0FBTixDQUF0QjtBQUNBLFNBQU0sV0FBTixJQUFxQixjQUFyQjtBQUNEO0FBQ0QsU0FBTyxLQUFQO0FBQ0QsRUFiRDs7QUFlQTtBQUNBLEtBQUksb0JBQW9CLFFBQVEsU0FBUixDQUF4QjtBQUNBLEtBQUksbUJBQW1CLEVBQXZCO0FBQ0EsTUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGtCQUFrQixNQUF0QyxFQUE4QyxHQUE5QyxFQUFtRDtBQUNsRCwrR0FBb0csa0JBQWtCLENBQWxCLENBQXBHLG9DQUFxSixrQkFBa0IsQ0FBbEIsQ0FBckosdUNBQXlNLGtCQUFrQixDQUFsQixDQUF6TTtBQUNBOztBQUVELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCOztBQUVBLFNBQVEsR0FBUixDQUFZLGlCQUFaOztBQUVBO0FBQ0EsR0FBRSxRQUFGLEVBQVksRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNsQyxJQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLE1BQXBCO0FBQ0EsSUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFdBQWYsQ0FBMkIsTUFBM0I7QUFDQSxNQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFdBQXhCLENBQUosRUFBMEM7QUFDekMsZ0JBQWEsSUFBYixDQUFrQixXQUFsQjtBQUNBLEdBRkQsTUFFTyxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFlBQXhCLENBQUosRUFBMkM7QUFDakQsZ0JBQWEsSUFBYixDQUFrQixZQUFsQjtBQUNBLEdBRk0sTUFFQSxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFVBQXhCLENBQUosRUFBeUM7QUFDL0MsZ0JBQWEsSUFBYixDQUFrQixVQUFsQjtBQUNBLEdBRk0sTUFFQTtBQUNOLGdCQUFhLElBQWIsQ0FBa0IsU0FBbEI7QUFDQTtBQUNEO0FBQ0EsTUFBSSxlQUFlLGFBQWEsQ0FBYixFQUFnQixRQUFoQixFQUFuQjtBQUNBLE1BQUksYUFBYSxNQUFiLEtBQXdCLENBQXhCLElBQTZCLGFBQWEsQ0FBYixNQUFvQixhQUFhLENBQWIsQ0FBckQsRUFBc0U7QUFDckUsS0FBRSxZQUFGLEVBQWdCLFFBQWhCLENBQXlCLFVBQXpCO0FBQ0Q7QUFDQTtBQUNDO0FBQ0QsVUFBUSxHQUFSLENBQVksWUFBWjtBQUNBO0FBQ0E7QUFDQSxFQXRCRDs7QUF3QkE7QUFDQSxLQUFNLGVBQWUsRUFBckI7O0FBRUEsS0FBTSxlQUFlLFNBQWYsWUFBZSxHQUFNO0FBQzFCLE1BQUksYUFBYSxNQUFiLEdBQXNCLENBQXRCLElBQTJCLGFBQWEsQ0FBYixNQUFvQixhQUFhLENBQWIsQ0FBbkQsRUFBb0U7QUFDbkUsZ0JBQWEsR0FBYjtBQUNBLGdCQUFhLEdBQWI7QUFDQSxnQkFBYSxHQUFiO0FBQ0EsV0FBUSxHQUFSLENBQVksWUFBWjtBQUNBLEtBQUUsUUFBRixFQUFZLFdBQVosQ0FBd0IsTUFBeEI7QUFDQSxLQUFFLE9BQUYsRUFBVyxXQUFYLENBQXVCLE1BQXZCO0FBQ0EsR0FQRCxNQU9PLElBQUksYUFBYSxNQUFiLEtBQXdCLENBQXhCLElBQTZCLGFBQWEsQ0FBYixNQUFvQixhQUFhLENBQWIsQ0FBckQsRUFBc0U7QUFDNUUsZ0JBQWEsR0FBYjtBQUNBLGdCQUFhLEdBQWI7QUFDQSxXQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0E7QUFDRCxFQWJEOztBQWVBOztBQUVBOztBQUlBLENBakZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gTWF0Y2ggR2FtZVxuXG4vLyA4IGNhcmRzLCBmYWNlIGRvd24uIFVzZXIgY2FuIGZsaXAgdXAgdG8gdHdvIGNhcmRzIGF0IGEgdGltZSB0byByZXZlYWwgaW1hZ2Ugb24gZnJvbnQgb2YgY2FyZC4gSWYgaW1hZ2VzIG1hdGNoLCB0aGUgY2FyZHMgc3RheSBmYWNlIHVwLiBJZiBpbWFnZXMgZG9uJ3QgbWF0Y2gsIGNhcmRzIGFyZSBmbGlwcGVkIGZhY2UgZG93biBhbmQgdGhlIHVzZXIgc2VsZWN0cyB0d28gbmV3IGNhcmRzLiBPYmplY3RpdmUgaXMgdG8gZmluZCBhbGwgcGFpcnMgb2YgbWF0Y2hpbmcgY2FyZHMuXG5cblxuLy8gTG9naWNcblxuLy8gQXJyYXkgb2YgXCJjYXJkc1wiIGlzIHNodWZmbGVkIGFuZCB0aGVuIGluc3RlcnRlZCBpbnRvIHRoZSBET00uIFVzaW5nIENTUyB0byBjcmVhdGUgZmxpcHBhYmxlIGNhcmRzLCB1c2VyIGNsaWNrcyBvbiB0d28gY2FyZHMgdG8gcmV2ZWFsIGltYWdlLlxuXG5cblxuJChmdW5jdGlvbiAoKXtcblxuXHRjb25zdCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblx0XG5cblx0Ly8gU0hVRkZMRSBGVU5DVElPTlxuXHRjb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG5cdCAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXHQgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG5cdCAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXHQgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG5cdCAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG5cdCAgICBjdXJyZW50SW5kZXggLT0gMTtcblx0ICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0ICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcblx0ICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG5cdCAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcblx0ICB9XG5cdCAgcmV0dXJuIGFycmF5O1xuXHR9O1xuXG5cdC8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShjYXJkQXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cIi4uL2Rldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9XG5cblx0JCgnLmNhcmRzJykuaHRtbChzaHVmZmxlZENhcmRMaXN0KTtcblxuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7XG5cblx0Ly8gRkxJUFBJTkcgQ0FSRFNcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHR9O1xuXHRcdC8vICQodGhpcykubmV4dCgpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdGxldCBmbGlwcGVkVmFsdWUgPSBmbGlwcGVkQ2FyZHNbMF0udG9TdHJpbmcoKTtcblx0XHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0JCgnLmJhY2suZmxpcCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdC8vIH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdC8vIFx0JCh0aGlzKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0fTtcblx0XHRjb25zb2xlLmxvZyhmbGlwcGVkVmFsdWUpO1xuXHRcdGNvbXBhcmVDYXJkcygpO1xuXHRcdC8vIGNvbnNvbGUubG9nKGZsaXBwZWRDYXJkcyk7XG5cdH0pO1xuXG5cdC8vIE1BVENISU5HIExPR0lDXG5cdGNvbnN0IGZsaXBwZWRDYXJkcyA9IFtdO1xuXG5cdGNvbnN0IGNvbXBhcmVDYXJkcyA9ICgpID0+IHtcblx0XHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA+IDIgJiYgZmxpcHBlZENhcmRzWzBdICE9PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdGNvbnNvbGUubG9nKGZsaXBwZWRDYXJkcyk7XG5cdFx0XHQkKCcuZnJvbnQnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0JCgnLmJhY2snKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0Y29uc29sZS5sb2coJ01hdGNoIScpO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gaWYgc3RhdGVtZW50IHRvIGRldGVybWluZSB3aGVuIHR3byBjYXJkcyBhcmUgZmxpcHBlZCwgY2FuJ3QgZmxpcCBhbnkgbW9yZSBjYXJkcz9cblxuXHQvLyBpZiB0d28gZmxpcHBlZCBjYXJkcyBtYXRjaCwgYWRkIGNsYXNzICdjb21wbGV0ZWQnIHdpdGggc29tZSBDU1MgYW5kIHdvbid0IGJlIGZsaXBwZWQgYW55bW9yZT9cblxuXG5cbn0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==
