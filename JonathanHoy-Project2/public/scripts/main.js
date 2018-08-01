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
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back\"><img src=\"../dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	}

	$('.cards').html(shuffledCardList);

	$('.front').on('click', function () {
		$(this).toggleClass('rotate');
		$(this).next().toggleClass('rotate');
	});

	$('.back').on('click', function () {
		$(this).toggleClass('rotate');
		$(this).prev().toggleClass('rotate');
	});

	// if statement to determine when two cards are flipped, can't flip any more cards?

	// if two flipped cards match, add class 'completed' with some CSS and won't be flipped anymore?

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7O0FBRUE7QUFDQSxRQUFPLE1BQU0sWUFBYixFQUEyQjs7QUFFekI7QUFDQSxnQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsWUFBM0IsQ0FBZDtBQUNBLGtCQUFnQixDQUFoQjs7QUFFQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7O0FBRUQsUUFBTyxLQUFQO0FBQ0QsQ0FqQkQ7O0FBbUJBLEVBQUUsWUFBVzs7QUFFWixLQUFNLFlBQVksQ0FBQyxXQUFELEVBQWMsV0FBZCxFQUEyQixZQUEzQixFQUF5QyxZQUF6QyxFQUF1RCxVQUF2RCxFQUFtRSxVQUFuRSxFQUErRSxTQUEvRSxFQUEwRixTQUExRixDQUFsQjs7QUFFQSxLQUFJLG9CQUFvQixRQUFRLFNBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsMElBQTZILGtCQUFrQixDQUFsQixDQUE3SCx1Q0FBaUwsa0JBQWtCLENBQWxCLENBQWpMO0FBQ0E7O0FBRUQsR0FBRSxRQUFGLEVBQVksSUFBWixDQUFpQixnQkFBakI7O0FBR0EsR0FBRSxRQUFGLEVBQVksRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNsQyxJQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLFFBQXBCO0FBQ0EsSUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFdBQWYsQ0FBMkIsUUFBM0I7QUFDQSxFQUhEOztBQUtBLEdBQUUsT0FBRixFQUFXLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDakMsSUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixRQUFwQjtBQUNBLElBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxXQUFmLENBQTJCLFFBQTNCO0FBQ0EsRUFIRDs7QUFLQTs7QUFFQTs7QUFJQSxDQTdCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIE1hdGNoIEdhbWVcblxuLy8gOCBjYXJkcywgZmFjZSBkb3duLiBVc2VyIGNhbiBmbGlwIHVwIHRvIHR3byBjYXJkcyBhdCBhIHRpbWUgdG8gcmV2ZWFsIGltYWdlIG9uIGZyb250IG9mIGNhcmQuIElmIGltYWdlcyBtYXRjaCwgdGhlIGNhcmRzIHN0YXkgZmFjZSB1cC4gSWYgaW1hZ2VzIGRvbid0IG1hdGNoLCBjYXJkcyBhcmUgZmxpcHBlZCBmYWNlIGRvd24gYW5kIHRoZSB1c2VyIHNlbGVjdHMgdHdvIG5ldyBjYXJkcy4gT2JqZWN0aXZlIGlzIHRvIGZpbmQgYWxsIHBhaXJzIG9mIG1hdGNoaW5nIGNhcmRzLlxuXG5cbi8vIExvZ2ljXG5cbi8vIEFycmF5IG9mIFwiY2FyZHNcIiBpcyBzaHVmZmxlZCBhbmQgdGhlbiBpbnN0ZXJ0ZWQgaW50byB0aGUgRE9NLiBVc2luZyBDU1MgdG8gY3JlYXRlIGZsaXBwYWJsZSBjYXJkcywgdXNlciBjbGlja3Mgb24gdHdvIGNhcmRzIHRvIHJldmVhbCBpbWFnZS5cblxuY29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG5cbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG4gICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4kKGZ1bmN0aW9uICgpe1xuXHRcblx0Y29uc3QgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cdFxuXHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdGxldCBzaHVmZmxlZENhcmRMaXN0ID0gJyc7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2h1ZmZsZWRDYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnRcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFja1wiPjxpbWcgc3JjPVwiLi4vZGV2L2Fzc2V0cy8ke3NodWZmbGVkQ2FyZEFycmF5W2ldfS5wbmdcIiBhbHQ9XCJBIGN1dGUgcGljdHVyZSBvZiAke3NodWZmbGVkQ2FyZEFycmF5W2ldfS5cIj48L2Rpdj48L2Rpdj48L2xpPmA7XG5cdH1cblxuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXG5cblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygncm90YXRlJyk7XG5cdFx0JCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ3JvdGF0ZScpO1xuXHR9KTtcblxuXHQkKCcuYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ3JvdGF0ZScpO1xuXHRcdCQodGhpcykucHJldigpLnRvZ2dsZUNsYXNzKCdyb3RhdGUnKTtcblx0fSk7XG5cblx0Ly8gaWYgc3RhdGVtZW50IHRvIGRldGVybWluZSB3aGVuIHR3byBjYXJkcyBhcmUgZmxpcHBlZCwgY2FuJ3QgZmxpcCBhbnkgbW9yZSBjYXJkcz9cblxuXHQvLyBpZiB0d28gZmxpcHBlZCBjYXJkcyBtYXRjaCwgYWRkIGNsYXNzICdjb21wbGV0ZWQnIHdpdGggc29tZSBDU1MgYW5kIHdvbid0IGJlIGZsaXBwZWQgYW55bW9yZT9cblxuXG5cbn0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==
