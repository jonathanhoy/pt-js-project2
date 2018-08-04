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
	}

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
		};
		compareCards();
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
			$('.back.flip').addClass('matched');
			console.log('Match!');
		};
	};
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWjtBQUNBLEtBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUdBO0FBQ0EsS0FBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixNQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLE1BQWlDLGNBQWpDO0FBQUEsTUFBaUQsV0FBakQ7QUFDQTtBQUNBLFNBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsaUJBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxtQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG9CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxTQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsU0FBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCxFQWJEOztBQWVBO0FBQ0EsS0FBSSxvQkFBb0IsUUFBUSxTQUFSLENBQXhCO0FBQ0EsS0FBSSxtQkFBbUIsRUFBdkI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksa0JBQWtCLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2xELCtHQUFvRyxrQkFBa0IsQ0FBbEIsQ0FBcEcsb0NBQXFKLGtCQUFrQixDQUFsQixDQUFySix1Q0FBeU0sa0JBQWtCLENBQWxCLENBQXpNO0FBQ0E7O0FBRUQsR0FBRSxRQUFGLEVBQVksSUFBWixDQUFpQixnQkFBakI7O0FBRUEsU0FBUSxHQUFSLENBQVksaUJBQVosRUEvQlksQ0ErQm9COztBQUVoQztBQUNBLEdBQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFlBQVc7QUFDbEMsSUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixNQUFwQjtBQUNBLElBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxXQUFmLENBQTJCLE1BQTNCO0FBQ0EsTUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixXQUF4QixDQUFKLEVBQTBDO0FBQ3pDLGdCQUFhLElBQWIsQ0FBa0IsV0FBbEI7QUFDQSxHQUZELE1BRU8sSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixZQUF4QixDQUFKLEVBQTJDO0FBQ2pELGdCQUFhLElBQWIsQ0FBa0IsWUFBbEI7QUFDQSxHQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixVQUF4QixDQUFKLEVBQXlDO0FBQy9DLGdCQUFhLElBQWIsQ0FBa0IsVUFBbEI7QUFDQSxHQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixTQUF4QixDQUFKLEVBQXdDO0FBQzlDLGdCQUFhLElBQWIsQ0FBa0IsU0FBbEI7QUFDQTtBQUNEO0FBQ0EsRUFiRDs7QUFlQTtBQUNBLEtBQU0sZUFBZSxFQUFyQjs7QUFFQSxLQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDMUIsTUFBSSxhQUFhLE1BQWIsR0FBc0IsQ0FBdEIsSUFBMkIsYUFBYSxDQUFiLE1BQW9CLGFBQWEsQ0FBYixDQUFuRCxFQUFvRTtBQUNuRSxnQkFBYSxHQUFiO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLGdCQUFhLEdBQWI7QUFDQSxXQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsS0FBRSxRQUFGLEVBQVksV0FBWixDQUF3QixNQUF4QjtBQUNBLEtBQUUsT0FBRixFQUFXLFdBQVgsQ0FBdUIsTUFBdkI7QUFDQSxHQVBELE1BT08sSUFBSSxhQUFhLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkIsYUFBYSxDQUFiLE1BQW9CLGFBQWEsQ0FBYixDQUFyRCxFQUFzRTtBQUM1RSxnQkFBYSxHQUFiO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLEtBQUUsWUFBRixFQUFnQixRQUFoQixDQUF5QixTQUF6QjtBQUNBLFdBQVEsR0FBUixDQUFZLFFBQVo7QUFDQTtBQUNELEVBZEQ7QUFnQkEsQ0FwRUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBNYXRjaCBHYW1lXG5cbi8vIDggY2FyZHMsIGZhY2UgZG93bi4gVXNlciBjYW4gZmxpcCB1cCB0byB0d28gY2FyZHMgYXQgYSB0aW1lIHRvIHJldmVhbCBpbWFnZSBvbiBmcm9udCBvZiBjYXJkLiBJZiBpbWFnZXMgbWF0Y2gsIHRoZSBjYXJkcyBzdGF5IGZhY2UgdXAuIElmIGltYWdlcyBkb24ndCBtYXRjaCwgY2FyZHMgYXJlIGZsaXBwZWQgZmFjZSBkb3duIGFuZCB0aGUgdXNlciBzZWxlY3RzIHR3byBuZXcgY2FyZHMuIE9iamVjdGl2ZSBpcyB0byBmaW5kIGFsbCBwYWlycyBvZiBtYXRjaGluZyBjYXJkcy5cblxuXG4vLyBMb2dpY1xuXG4vLyBBcnJheSBvZiBcImNhcmRzXCIgaXMgc2h1ZmZsZWQgYW5kIHRoZW4gaW5zdGVydGVkIGludG8gdGhlIERPTS4gVXNpbmcgQ1NTIHRvIGNyZWF0ZSBmbGlwcGFibGUgY2FyZHMsIHVzZXIgY2xpY2tzIG9uIHR3byBjYXJkcyB0byByZXZlYWwgaW1hZ2UuXG5cblxuXG4kKGZ1bmN0aW9uICgpe1xuXG5cdC8vIENBUkQgTElTVFxuXHRjb25zdCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblx0XG5cblx0Ly8gU0hVRkZMRSBGVU5DVElPTlxuXHRjb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG5cdCAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXHQgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG5cdCAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXHQgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG5cdCAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG5cdCAgICBjdXJyZW50SW5kZXggLT0gMTtcblx0ICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0ICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcblx0ICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG5cdCAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcblx0ICB9XG5cdCAgcmV0dXJuIGFycmF5O1xuXHR9O1xuXG5cdC8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShjYXJkQXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cIi4uL2Rldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9XG5cblx0JCgnLmNhcmRzJykuaHRtbChzaHVmZmxlZENhcmRMaXN0KTtcblxuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG5cblx0Ly8gRkxJUFBJTkcgQ0FSRFNcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fTtcblx0XHRjb21wYXJlQ2FyZHMoKTtcblx0fSk7XG5cblx0Ly8gTUFUQ0hJTkcgTE9HSUNcblx0Y29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cblx0Y29uc3QgY29tcGFyZUNhcmRzID0gKCkgPT4ge1xuXHRcdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID4gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0Y29uc29sZS5sb2coZmxpcHBlZENhcmRzKTtcblx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0fSBlbHNlIGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyICYmIGZsaXBwZWRDYXJkc1swXSA9PT0gZmxpcHBlZENhcmRzWzFdKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHQkKCcuYmFjay5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKCdNYXRjaCEnKTtcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
