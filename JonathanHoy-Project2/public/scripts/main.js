(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.

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

$(function () {

	var cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];

	var shuffledCardArray = shuffle(cardArray);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[i] + "\"><img src=\"../dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	}

	$('.cards').html(shuffledCardList);

	console.log(shuffledCardArray);

	$('.front').on('click', function () {
		$(this).toggleClass('flip');
		$(this).next().toggleClass('flip');
		if ($(this).next().hasClass('bulbasaur')) {
			flippedCards.push('bulbasaur');
			compareCards();
		} else if ($(this).next().hasClass('charmander')) {
			flippedCards.push('charmander');
			compareCards();
		} else if ($(this).next().hasClass('squirtle')) {
			flippedCards.push('squirtle');
			compareCards();
		} else {
			flippedCards.push('pikachu');
			compareCards();
		};
		// console.log(flippedCards);
	});

	$('.back').on('click', function () {
		$(this).toggleClass('flip');
		$(this).prev().toggleClass('flip');
	});

	var flippedCards = [];

	var compareCards = function compareCards() {
		if (flippedCards.length === 2) {
			if (flippedCards[0] === flippedCards[1]) {
				console.log('match!');
				flippedCards.pop();
				flippedCards.pop();
				console.log(flippedCards);
			};
		};
	};

	// if statement to determine when two cards are flipped, can't flip any more cards?

	// FLIPPED ARRAY. When cards are flipped, the string ${shuffledCardArray[i] is added to a new array. When the length of the array is 2, if statement to see if [0] === [1] meaning match.


	// if two flipped cards match, add class 'completed' with some CSS and won't be flipped anymore?

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7O0FBRUE7QUFDQSxRQUFPLE1BQU0sWUFBYixFQUEyQjs7QUFFekI7QUFDQSxnQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsWUFBM0IsQ0FBZDtBQUNBLGtCQUFnQixDQUFoQjs7QUFFQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7O0FBRUQsUUFBTyxLQUFQO0FBQ0QsQ0FqQkQ7O0FBb0JBLEVBQUUsWUFBVzs7QUFFWixLQUFNLFlBQVksQ0FBQyxXQUFELEVBQWMsV0FBZCxFQUEyQixZQUEzQixFQUF5QyxZQUF6QyxFQUF1RCxVQUF2RCxFQUFtRSxVQUFuRSxFQUErRSxTQUEvRSxFQUEwRixTQUExRixDQUFsQjs7QUFHQSxLQUFJLG9CQUFvQixRQUFRLFNBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxvQ0FBcUosa0JBQWtCLENBQWxCLENBQXJKLHVDQUF5TSxrQkFBa0IsQ0FBbEIsQ0FBek07QUFDQTs7QUFFRCxHQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLGdCQUFqQjs7QUFFQSxTQUFRLEdBQVIsQ0FBWSxpQkFBWjs7QUFHQSxHQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2xDLElBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxJQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsV0FBZixDQUEyQixNQUEzQjtBQUNBLE1BQUksRUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsV0FBeEIsQ0FBSixFQUEwQztBQUN6QyxnQkFBYSxJQUFiLENBQWtCLFdBQWxCO0FBQ0E7QUFDQSxHQUhELE1BR08sSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixZQUF4QixDQUFKLEVBQTJDO0FBQ2pELGdCQUFhLElBQWIsQ0FBa0IsWUFBbEI7QUFDQTtBQUNBLEdBSE0sTUFHQSxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFVBQXhCLENBQUosRUFBeUM7QUFDL0MsZ0JBQWEsSUFBYixDQUFrQixVQUFsQjtBQUNBO0FBQ0EsR0FITSxNQUdBO0FBQ04sZ0JBQWEsSUFBYixDQUFrQixTQUFsQjtBQUNBO0FBQ0E7QUFDRDtBQUNBLEVBakJEOztBQW1CQSxHQUFFLE9BQUYsRUFBVyxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQ2pDLElBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxJQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsV0FBZixDQUEyQixNQUEzQjtBQUNBLEVBSEQ7O0FBS0EsS0FBTSxlQUFlLEVBQXJCOztBQUVBLEtBQU0sZUFBZSxTQUFmLFlBQWUsR0FBTTtBQUMxQixNQUFJLGFBQWEsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUM5QixPQUFJLGFBQWEsQ0FBYixNQUFvQixhQUFhLENBQWIsQ0FBeEIsRUFBeUM7QUFDeEMsWUFBUSxHQUFSLENBQVksUUFBWjtBQUNBLGlCQUFhLEdBQWI7QUFDQSxpQkFBYSxHQUFiO0FBQ0EsWUFBUSxHQUFSLENBQVksWUFBWjtBQUNBO0FBQ0Q7QUFDRCxFQVREOztBQVdBOztBQUVBOzs7QUFHQTs7QUFJQSxDQTlERCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIE1hdGNoIEdhbWVcblxuLy8gOCBjYXJkcywgZmFjZSBkb3duLiBVc2VyIGNhbiBmbGlwIHVwIHRvIHR3byBjYXJkcyBhdCBhIHRpbWUgdG8gcmV2ZWFsIGltYWdlIG9uIGZyb250IG9mIGNhcmQuIElmIGltYWdlcyBtYXRjaCwgdGhlIGNhcmRzIHN0YXkgZmFjZSB1cC4gSWYgaW1hZ2VzIGRvbid0IG1hdGNoLCBjYXJkcyBhcmUgZmxpcHBlZCBmYWNlIGRvd24gYW5kIHRoZSB1c2VyIHNlbGVjdHMgdHdvIG5ldyBjYXJkcy4gT2JqZWN0aXZlIGlzIHRvIGZpbmQgYWxsIHBhaXJzIG9mIG1hdGNoaW5nIGNhcmRzLlxuXG5cbi8vIExvZ2ljXG5cbi8vIEFycmF5IG9mIFwiY2FyZHNcIiBpcyBzaHVmZmxlZCBhbmQgdGhlbiBpbnN0ZXJ0ZWQgaW50byB0aGUgRE9NLiBVc2luZyBDU1MgdG8gY3JlYXRlIGZsaXBwYWJsZSBjYXJkcywgdXNlciBjbGlja3Mgb24gdHdvIGNhcmRzIHRvIHJldmVhbCBpbWFnZS5cblxuY29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG5cbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG4gICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuXG4kKGZ1bmN0aW9uICgpe1xuXHRcblx0Y29uc3QgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cblx0XG5cdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoY2FyZEFycmF5KTtcblx0bGV0IHNodWZmbGVkQ2FyZExpc3QgPSAnJztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdHNodWZmbGVkQ2FyZExpc3QgKz0gYDxsaSBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJmcm9udFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCIuLi9kZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0fVxuXG5cdCQoJy5jYXJkcycpLmh0bWwoc2h1ZmZsZWRDYXJkTGlzdCk7XG5cblx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpO1xuXG5cblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdFx0Y29tcGFyZUNhcmRzKCk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnY2hhcm1hbmRlcicpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnY2hhcm1hbmRlcicpO1xuXHRcdFx0Y29tcGFyZUNhcmRzKCk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnc3F1aXJ0bGUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3NxdWlydGxlJyk7XG5cdFx0XHRjb21wYXJlQ2FyZHMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHRcdGNvbXBhcmVDYXJkcygpO1xuXHRcdH07XG5cdFx0Ly8gY29uc29sZS5sb2coZmxpcHBlZENhcmRzKTtcblx0fSk7XG5cblx0JCgnLmJhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0JCh0aGlzKS5wcmV2KCkudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0fSk7XG5cblx0Y29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cblx0Y29uc3QgY29tcGFyZUNhcmRzID0gKCkgPT4ge1xuXHRcdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRpZiAoZmxpcHBlZENhcmRzWzBdID09PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ21hdGNoIScpO1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZmxpcHBlZENhcmRzKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fTtcblxuXHQvLyBpZiBzdGF0ZW1lbnQgdG8gZGV0ZXJtaW5lIHdoZW4gdHdvIGNhcmRzIGFyZSBmbGlwcGVkLCBjYW4ndCBmbGlwIGFueSBtb3JlIGNhcmRzP1xuXG5cdC8vIEZMSVBQRUQgQVJSQVkuIFdoZW4gY2FyZHMgYXJlIGZsaXBwZWQsIHRoZSBzdHJpbmcgJHtzaHVmZmxlZENhcmRBcnJheVtpXSBpcyBhZGRlZCB0byBhIG5ldyBhcnJheS4gV2hlbiB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheSBpcyAyLCBpZiBzdGF0ZW1lbnQgdG8gc2VlIGlmIFswXSA9PT0gWzFdIG1lYW5pbmcgbWF0Y2guXG5cblxuXHQvLyBpZiB0d28gZmxpcHBlZCBjYXJkcyBtYXRjaCwgYWRkIGNsYXNzICdjb21wbGV0ZWQnIHdpdGggc29tZSBDU1MgYW5kIHdvbid0IGJlIGZsaXBwZWQgYW55bW9yZT9cblxuXG5cbn0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==
